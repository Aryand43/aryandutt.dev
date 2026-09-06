import * as THREE from "three";

import { GLOBE_RADIUS, latLngToXYZ } from "./projection";

export { GLOBE_RADIUS };

/** Longitude/latitude in degrees to a point on a sphere of the given radius. */
export function latLngToVector3(
  longitude: number,
  latitude: number,
  radius = GLOBE_RADIUS,
): THREE.Vector3 {
  const { x, y, z } = latLngToXYZ(longitude, latitude, radius);
  return new THREE.Vector3(x, y, z);
}

/**
 * A great-circle arc lifted off the surface.
 *
 * The apex height scales with angular distance, so short hops stay low and
 * long hauls bow outward. Points are sampled along a slerp between the two
 * surface positions rather than a straight interpolation, which would cut
 * through the sphere.
 */
export function buildArc(
  start: THREE.Vector3,
  end: THREE.Vector3,
  segments = 64,
): THREE.Vector3[] {
  const angle = start.angleTo(end);
  const lift = 0.18 + (angle / Math.PI) * 0.42;
  const points: THREE.Vector3[] = [];

  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const point = new THREE.Vector3().copy(start).lerp(end, t);

    // Renormalise onto the sphere, then raise by a sine profile so the arc
    // leaves and meets the surface tangentially.
    point.normalize().multiplyScalar(GLOBE_RADIUS + Math.sin(t * Math.PI) * lift);
    points.push(point);
  }

  return points;
}
