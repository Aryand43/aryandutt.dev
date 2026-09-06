/**
 * Pure geometry, deliberately free of any Three.js import.
 *
 * The static fallback renders on every device, so it must not drag the WebGL
 * dependency into the initial bundle. Keeping the maths here lets both the
 * SVG fallback and the 3D scene share one definition of where a city sits.
 */
export const GLOBE_RADIUS = 1;

export type Vec3 = { x: number; y: number; z: number };

/** Longitude/latitude in degrees to a point on a sphere. */
export function latLngToXYZ(
  longitude: number,
  latitude: number,
  radius = GLOBE_RADIUS,
): Vec3 {
  const phi = (90 - latitude) * (Math.PI / 180);
  const theta = (longitude + 180) * (Math.PI / 180);

  return {
    x: -radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
}

/** Resting orientation of the 3D scene, so the fallback matches it. */
export const ROTATION = { x: 0.32, y: -1.15 } as const;
