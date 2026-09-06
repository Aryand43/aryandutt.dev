"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";

import {
  connections,
  getLocation,
  locations,
  type GlobeLocation,
} from "@/lib/data/locations";
import { GLOBE_RADIUS, buildArc, latLngToVector3 } from "./geo";
import { LAND_POINTS } from "./land-points";

/* Palette mirrors the site tokens. Kept as literals because WebGL materials
   cannot read CSS custom properties. */
const COLOR = {
  /** Ocean: a touch lighter than the page so the sphere reads as a body. */
  ocean: "#1b2027",
  /** Land dots: warm off-white, the brightest thing on the sphere. */
  land: "#c8cdd4",
  graticule: "#2b2f36",
  accent: "#5cc8f0",
  node: "#a9e6fb",
} as const;

const ARC_SEGMENTS = 64;

type SceneProps = {
  animate: boolean;
  onHover: (location: GlobeLocation | null) => void;
  activeId: string | null;
};

/** Rotation pauses while the pointer is over the canvas. A node moving away
 *  from the cursor as you reach for it is the fastest way to make an
 *  interactive globe feel broken. */
const PausedContext = React.createContext<React.RefObject<boolean> | null>(null);

/**
 * Continents, drawn as a dot matrix.
 *
 * Positions are precomputed at build time (see scripts/generate-land-points.mjs)
 * and shipped as quantised integers, so the browser only converts degrees to
 * vectors once. No texture is fetched and no political borders are drawn: the
 * landmass silhouette alone carries the recognition.
 */
function LandPoints() {
  const geometry = React.useMemo(() => {
    const count = LAND_POINTS.length / 2;
    const positions = new Float32Array(count * 3);
    const radius = GLOBE_RADIUS * 1.003;

    for (let i = 0; i < count; i += 1) {
      const longitude = LAND_POINTS[i * 2]! / 100;
      const latitude = LAND_POINTS[i * 2 + 1]! / 100;

      const phi = (90 - latitude) * (Math.PI / 180);
      const theta = (longitude + 180) * (Math.PI / 180);
      const sinPhi = Math.sin(phi);

      positions[i * 3] = -radius * sinPhi * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * sinPhi * Math.sin(theta);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  React.useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.0092}
        color={COLOR.land}
        sizeAttenuation
        transparent
        opacity={0.92}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Rim light. A slightly larger sphere rendered from the inside with additive
 * blending, so the accent only accumulates where the surface turns away from
 * the camera. That gives the soft edge glow without a custom shader.
 */
function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS * 1.055, 64, 64]} />
      <meshBasicMaterial
        color={COLOR.accent}
        side={THREE.BackSide}
        transparent
        opacity={0.085}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * The ocean sphere. Still writes depth, so points and arcs on the far side stay
 * hidden, but it is now lit rather than flat: a single directional light gives
 * the terminator that makes the shape read as a globe instead of a disc.
 */
function Ocean() {
  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS * 0.997, 64, 64]} />
      <meshStandardMaterial
        color={COLOR.ocean}
        roughness={0.92}
        metalness={0.05}
      />
    </mesh>
  );
}

/** Faint latitude rings. Structure without cartography. */
function Graticule() {
  const rings = React.useMemo(
    () =>
      [-60, -30, 0, 30, 60].map((latitude) => {
        const phi = (90 - latitude) * (Math.PI / 180);
        return {
          latitude,
          radius: Math.sin(phi) * GLOBE_RADIUS * 1.003,
          y: Math.cos(phi) * GLOBE_RADIUS * 1.003,
        };
      }),
    [],
  );

  return (
    <>
      {rings.map((ring) => (
        <mesh
          key={ring.latitude}
          position={[0, ring.y, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[ring.radius - 0.0016, ring.radius, 128]} />
          <meshBasicMaterial
            color={COLOR.graticule}
            side={THREE.DoubleSide}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </>
  );
}

function LocationNode({
  location,
  active,
  animate,
  onHover,
}: {
  location: GlobeLocation;
  active: boolean;
  animate: boolean;
  onHover: (location: GlobeLocation | null) => void;
}) {
  const haloRef = React.useRef<THREE.Mesh>(null);

  const position = React.useMemo(
    () =>
      latLngToVector3(
        location.coordinates[0],
        location.coordinates[1],
        GLOBE_RADIUS * 1.01,
      ),
    [location.coordinates],
  );

  useFrame(({ clock }) => {
    const halo = haloRef.current;
    if (!halo) return;

    if (!animate) {
      halo.scale.setScalar(active ? 1.6 : 1.2);
      return;
    }

    // Home base breathes slightly faster to read as the origin.
    const speed = location.home ? 1.6 : 1.1;
    const pulse = 1.25 + Math.sin(clock.elapsedTime * speed) * 0.22;
    halo.scale.setScalar(active ? pulse * 1.35 : pulse);
  });

  return (
    <group
      position={position}
      onPointerOver={(event) => {
        event.stopPropagation();
        onHover(location);
      }}
      onPointerOut={() => onHover(null)}
    >
      {/* Generous invisible hit area: the visible dot is far too small to hit. */}
      <mesh visible={false}>
        <sphereGeometry args={[0.11, 8, 8]} />
      </mesh>

      <mesh ref={haloRef}>
        <sphereGeometry args={[location.home ? 0.026 : 0.021, 16, 16]} />
        <meshBasicMaterial
          color={COLOR.accent}
          transparent
          opacity={active ? 0.4 : 0.22}
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[location.home ? 0.013 : 0.0105, 16, 16]} />
        <meshBasicMaterial color={active ? "#ffffff" : COLOR.node} />
      </mesh>
    </group>
  );
}

/** A single dot travelling the arc, used to imply direction of work. */
function Pulse({ curve, offset }: { curve: THREE.CatmullRomCurve3; offset: number }) {
  const ref = React.useRef<THREE.Mesh>(null);
  const target = React.useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.elapsedTime * 0.12 + offset) % 1;
    curve.getPointAt(t, target);
    ref.current.position.copy(target);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.0085, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
    </mesh>
  );
}

function Arc({
  from,
  to,
  style,
  animate,
  dimmed,
}: {
  from: [number, number];
  to: [number, number];
  style: "solid" | "dashed" | "mixed";
  animate: boolean;
  dimmed: boolean;
}) {
  const points = React.useMemo(() => {
    const start = latLngToVector3(from[0], from[1]);
    const end = latLngToVector3(to[0], to[1]);
    return buildArc(start, end, ARC_SEGMENTS);
  }, [from, to]);

  const curve = React.useMemo(
    () => new THREE.CatmullRomCurve3(points),
    [points],
  );

  const opacity = dimmed ? 0.28 : 0.75;

  return (
    <group>
      {/* `mixed` draws both: a solid arc for the on-site half of the role and a
          dashed overlay for the remote half. */}
      {(style === "solid" || style === "mixed") && (
        <Line
          points={points}
          color={COLOR.accent}
          lineWidth={1.1}
          transparent
          opacity={style === "mixed" ? opacity * 0.55 : opacity}
        />
      )}

      {(style === "dashed" || style === "mixed") && (
        <Line
          points={points}
          color={COLOR.accent}
          lineWidth={1.4}
          dashed
          dashSize={0.035}
          gapSize={0.03}
          transparent
          opacity={opacity}
        />
      )}

      {animate ? (
        <>
          <Pulse curve={curve} offset={0} />
          <Pulse curve={curve} offset={0.5} />
        </>
      ) : null}
    </group>
  );
}

function Globe({ animate, onHover, activeId }: SceneProps) {
  const group = React.useRef<THREE.Group>(null);
  const paused = React.useContext(PausedContext);

  useFrame((_, delta) => {
    if (!animate || !group.current || paused?.current) return;
    group.current.rotation.y += delta * 0.055;
  });

  return (
    <group ref={group} rotation={[0.32, -1.15, 0.12]}>
      <Ocean />
      <LandPoints />
      <Graticule />
      <Atmosphere />

      {connections.map((connection) => (
        <Arc
          key={connection.id}
          from={getLocation(connection.from).coordinates}
          to={getLocation(connection.to).coordinates}
          style={connection.style}
          animate={animate}
          dimmed={
            activeId !== null &&
            activeId !== connection.from &&
            activeId !== connection.to
          }
        />
      ))}

      {locations.map((location) => (
        <LocationNode
          key={location.id}
          location={location}
          active={activeId === location.id}
          animate={animate}
          onHover={onHover}
        />
      ))}
    </group>
  );
}

export default function GlobeScene({
  animate,
  onHover,
  activeId,
}: SceneProps) {
  const paused = React.useRef(false);

  return (
    <Canvas
      onPointerEnter={() => {
        paused.current = true;
      }}
      onPointerLeave={() => {
        paused.current = false;
        onHover(null);
      }}
      camera={{ position: [0, 0, 3.1], fov: 38 }}
      // Cap DPR: past 2x the extra pixels cost far more than they show.
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 2, 4]} intensity={1.5} />
      <PausedContext.Provider value={paused}>
        <Globe animate={animate} onHover={onHover} activeId={activeId} />
      </PausedContext.Provider>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}
