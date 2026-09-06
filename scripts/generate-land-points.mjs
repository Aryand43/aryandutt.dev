/**
 * Precomputes the globe's land point cloud at build time.
 *
 * Sampling a sphere and running point-in-polygon against every land ring is far
 * too slow to do in the browser, so it happens here once and ships as a compact
 * quantised array. Run with `npm run globe:land` after changing SAMPLES.
 *
 * Output: src/components/globe/land-points.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

import { feature } from "topojson-client";

const require = createRequire(import.meta.url);
const topo = JSON.parse(
  readFileSync(require.resolve("world-atlas/land-110m.json"), "utf8"),
);

const land = feature(topo, topo.objects.land);

/** Flatten every polygon into a list of linear rings. */
const rings = [];
for (const geom of land.features) {
  const polygons =
    geom.geometry.type === "Polygon"
      ? [geom.geometry.coordinates]
      : geom.geometry.coordinates;

  for (const polygon of polygons) {
    for (const ring of polygon) rings.push(ring);
  }
}

/** Bounding boxes make the common rejection case cheap. */
const boxes = rings.map((ring) => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const [x, y] of ring) {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  return [minX, minY, maxX, maxY];
});

/** Standard ray-casting test. */
function inRing(lng, lat, ring) {
  let inside = false;

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];

    if (yi > lat !== yj > lat) {
      const x = ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
      if (lng < x) inside = !inside;
    }
  }

  return inside;
}

function isLand(lng, lat) {
  for (let i = 0; i < rings.length; i += 1) {
    const box = boxes[i];
    if (lng < box[0] || lng > box[2] || lat < box[1] || lat > box[3]) continue;
    if (inRing(lng, lat, rings[i])) return true;
  }
  return false;
}

/** Fibonacci lattice: uniform density, no polar clustering. */
const SAMPLES = 42000;
const golden = Math.PI * (3 - Math.sqrt(5));
const points = [];

for (let i = 0; i < SAMPLES; i += 1) {
  const y = 1 - (i / (SAMPLES - 1)) * 2;
  const ring = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = golden * i;

  const lat = Math.asin(y) * (180 / Math.PI);
  const lng =
    Math.atan2(Math.sin(theta) * ring, Math.cos(theta) * ring) * (180 / Math.PI);

  if (isLand(lng, lat)) {
    // Quantise to 0.01 degrees: far finer than the dots are drawn.
    points.push(Math.round(lng * 100), Math.round(lat * 100));
  }
}

const file = `// GENERATED FILE. Do not edit by hand.
// Regenerate with: npm run globe:land
//
// Land sample points as [longitude, latitude] pairs quantised to 1/100 degree,
// derived from world-atlas land-110m. Sampled ${SAMPLES} points on a Fibonacci
// lattice; ${points.length / 2} fell on land.

export const LAND_SAMPLE_COUNT = ${points.length / 2};

/** Flat [lng, lat, lng, lat, ...] in hundredths of a degree. */
export const LAND_POINTS = new Int16Array([${points.join(",")}]);
`;

writeFileSync("src/components/globe/land-points.ts", file);

console.log(
  `land points: ${points.length / 2} of ${SAMPLES} samples (${(
    ((points.length / 2) / SAMPLES) *
    100
  ).toFixed(1)}% land)`,
);
