/**
 * Geography behind the globe visualisation.
 *
 * Coordinates are [longitude, latitude] in degrees, matching GeoJSON order.
 * Everything here is derived from the roles in `experience.ts`; the globe is a
 * view onto that record, not a separate set of claims.
 */

export type LocationId = "singapore" | "cambridge" | "london";

export type GlobeLocation = {
  id: LocationId;
  name: string;
  region: string;
  /** [longitude, latitude] */
  coordinates: [number, number];
  /** True for the origin node that every arc departs from. */
  home?: boolean;
  roles: { org: string; mode: string }[];
};

export const locations: GlobeLocation[] = [
  {
    id: "singapore",
    name: "Singapore",
    region: "Home base",
    coordinates: [103.8, 1.35],
    home: true,
    roles: [
      { org: "NTU", mode: "On-site" },
      { org: "InterSystems", mode: "On-site" },
      { org: "NTU CCDS", mode: "On-site" },
      { org: "NTU SC3DP", mode: "Hybrid" },
      { org: "SEAQR / SeaSwarm", mode: "On-site" },
      { org: "Tagit", mode: "On-site" },
      { org: "BioMetallica", mode: "On-site" },
      { org: "Ministry of Home Affairs", mode: "On-site" },
    ],
  },
  {
    id: "cambridge",
    name: "Cambridge, MA",
    region: "United States",
    coordinates: [-71.1, 42.37],
    roles: [{ org: "MIT Julia Lab", mode: "Remote and on-site" }],
  },
  {
    id: "london",
    name: "London",
    region: "United Kingdom",
    coordinates: [-0.12, 51.5],
    roles: [{ org: "General Learning (YC F24)", mode: "Remote" }],
  },
];

export type ConnectionStyle = "solid" | "dashed" | "mixed";

export type Connection = {
  id: string;
  from: LocationId;
  to: LocationId;
  /**
   * `solid` for on-site and hybrid work, `dashed` for remote, and `mixed` for
   * the MIT role, which was both. `mixed` renders a solid arc overlaid with a
   * dashed one so the duality is legible rather than averaged away.
   */
  style: ConnectionStyle;
  label: string;
};

export const connections: Connection[] = [
  {
    id: "sg-cambridge",
    from: "singapore",
    to: "cambridge",
    style: "mixed",
    label: "MIT Julia Lab, remote and on-site",
  },
  {
    id: "sg-london",
    from: "singapore",
    to: "london",
    style: "dashed",
    label: "General Learning (YC F24), remote",
  },
];

export function getLocation(id: LocationId): GlobeLocation {
  const found = locations.find((location) => location.id === id);
  if (!found) throw new Error(`Unknown globe location: ${id}`);
  return found;
}

/** Total roles plotted, used in the caption so the number cannot drift. */
export const plottedRoleCount = locations.reduce(
  (total, location) => total + location.roles.length,
  0,
);
