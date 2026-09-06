import { ROTATION, latLngToXYZ } from "./projection";
import { connections, getLocation, locations } from "@/lib/data/locations";

const SIZE = 320;
const R = 128;
const CX = SIZE / 2;
const CY = SIZE / 2;

/** Same orientation as the 3D scene's resting rotation, so the two agree. */
const ROT_Y = ROTATION.y;
const ROT_X = ROTATION.x;

/**
 * Static, dependency-free projection of the same data. Rendered on mobile, on
 * low-power devices, and wherever WebGL is unavailable. It is a real
 * visualisation rather than a placeholder image, so the fallback still carries
 * the information.
 */
/**
 * Fixed precision on every emitted number.
 *
 * Node and browser engines can serialise the same double to strings that differ
 * in the final digit, which React reports as a hydration mismatch. Formatting
 * to two decimals makes the markup byte-identical on both sides.
 */
const n = (value: number) => value.toFixed(2);

function project(longitude: number, latitude: number) {
  const v = latLngToXYZ(longitude, latitude, 1);

  const x1 = v.x * Math.cos(ROT_Y) + v.z * Math.sin(ROT_Y);
  const z1 = -v.x * Math.sin(ROT_Y) + v.z * Math.cos(ROT_Y);
  const y2 = v.y * Math.cos(ROT_X) - z1 * Math.sin(ROT_X);
  const z2 = v.y * Math.sin(ROT_X) + z1 * Math.cos(ROT_X);

  return { x: CX + x1 * R, y: CY - y2 * R, front: z2 > 0 };
}

export function GlobeFallback() {
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="h-full w-full"
      role="img"
      aria-label="Simplified globe showing Singapore connected to Cambridge, Massachusetts and London."
    >
      <circle
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke="var(--color-line)"
        strokeWidth="1"
      />

      {[-60, -30, 0, 30, 60].map((lat) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const ry = Math.abs(Math.sin(phi) * R * Math.sin(ROT_X)) || 1;
        return (
          <ellipse
            key={lat}
            cx={CX}
            cy={n(CY - Math.cos(phi) * R * Math.cos(ROT_X))}
            rx={n(Math.sin(phi) * R)}
            ry={n(ry)}
            fill="none"
            stroke="var(--color-line-soft)"
            strokeWidth="0.75"
          />
        );
      })}

      {connections.map((connection) => {
        const a = project(...getLocation(connection.from).coordinates);
        const b = project(...getLocation(connection.to).coordinates);
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        // Bow the arc away from the globe centre.
        const dx = mx - CX;
        const dy = my - CY;
        const len = Math.hypot(dx, dy) || 1;
        const cx = mx + (dx / len) * 46;
        const cy = my + (dy / len) * 46;

        return (
          <path
            key={connection.id}
            d={`M ${n(a.x)} ${n(a.y)} Q ${n(cx)} ${n(cy)} ${n(b.x)} ${n(b.y)}`}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.1"
            strokeOpacity="0.75"
            strokeDasharray={connection.style === "solid" ? undefined : "4 3"}
          />
        );
      })}

      {locations.map((location) => {
        const p = project(...location.coordinates);
        return (
          <g key={location.id}>
            <circle
              cx={n(p.x)}
              cy={n(p.y)}
              r={location.home ? 7 : 6}
              fill="var(--color-accent)"
              fillOpacity="0.22"
            />
            <circle
              cx={n(p.x)}
              cy={n(p.y)}
              r={location.home ? 3 : 2.5}
              fill="var(--color-accent)"
            />
          </g>
        );
      })}
    </svg>
  );
}
