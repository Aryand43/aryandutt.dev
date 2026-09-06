# aryandutt.dev

Personal site for **Aryan Dutt**, Data Science & AI at NTU Singapore.

Next.js 16 (App Router), TypeScript in strict mode, Tailwind CSS v4, MDX.
Dark-only, statically generated, deployed on Vercel.

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build, type checked |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config) |
| `npm run typecheck` | `tsc --noEmit` |

Node 20 or newer is required by Next 16.

---

## Routes

| Route | Rendering | Purpose |
| --- | --- | --- |
| `/` | Static | Status bar, hero, signal panel, selected work, experience, writing, contact |
| `/work` | Static | Full project list with category filter |
| `/work/[slug]` | SSG | Case study: problem, approach, outcome, stack |
| `/experience` | Static | Complete timeline plus education |
| `/research` | Static | Research interests, appointments, publications, related projects |
| `/writing` | Static | MDX index with featured note |
| `/writing/[slug]` | SSG | Individual note |
| `/about` | Static | Bio, skills, honors, organizations, certifications, recommendations, languages |
| `/contact` | Static | Email, LinkedIn, copy-to-clipboard |
| `/resume` | Static | Résumé download, or a placeholder when no PDF is present |
| `/sitemap.xml`, `/robots.txt` | Static | Generated from site data |
| `/opengraph-image`, `/icon` | Static | Generated at build time via `next/og` |

`/blog`, `/blog/:slug`, and `/projects` issue permanent redirects to `/writing`,
`/writing/:slug`, and `/work`.

---

## Architecture

### Rendering

Every route is prerendered to static HTML. There are no server-side data
dependencies and no API routes, so the whole site can be served from a CDN.

### Client JavaScript

Six components opt into the client, and nothing else does:

| Component | Why it needs the client |
| --- | --- |
| `command-menu` | `⌘K` / `Ctrl+K` key listener and trigger button |
| `command-palette` | Search dialog, keyboard navigation, focus management |
| `project-filter` | Category filtering on `/work` |
| `copy-email` | Clipboard write on `/contact` |
| `scroll-progress` | Fallback only, where CSS scroll-driven animations are unsupported |
| `globe` | Capability detection, hover tooltip, and the lazily loaded WebGL scene |

The palette is loaded with `next/dynamic`, so its code (roughly 1.6 KB gzipped)
downloads only when someone opens it. Everything above the fold is server
rendered. Adding all of this, the globe included, cost about 5 KB gzipped over the fully
static version it replaced; Three.js itself is lazy and excluded from that.

### Motion

- **Entrances** use CSS keyframes (`animate-rise`, `animate-fade`), so
  above-the-fold content paints without waiting for hydration.
- **Scroll reveals** use CSS scroll-driven animations (`animation-timeline: view()`).
  They animate `transform` only, never `opacity`. This is deliberate: a
  scroll-driven animation does not always complete for elements near the end of
  the document, and gating opacity on one leaves content permanently invisible.
  Translating an always-opaque element degrades to "slightly offset" instead.
- Everything collapses under `prefers-reduced-motion: reduce`.

### Design tokens

Tailwind v4 is CSS-first, so there is no `tailwind.config.ts`. Tokens live in
the `@theme` block at the top of `src/app/globals.css`:

- **Palette.** Graphite surfaces (`base`, `raise`, `sunken`), warm off-white
  type (`ink`, `ink-muted`, `ink-faint`), hairline borders (`line`, `line-soft`),
  and a single electric cyan `accent`. The accent is load-bearing: links, focus
  rings, active state, and the availability dot. It is never decorative.
- **Type.** A fluid editorial scale (`text-hero`, `text-display`, `text-title`,
  `text-lead`, `text-meta`) built on `clamp()`, so sizing is continuous rather
  than stepped at breakpoints.
- **Metadata.** The `label` utility renders monospace, uppercase, letter-spaced
  text used for section indices (`01 / SELECTED WORK`), dates, and categories.

---

## Content

All content is typed data. No component edits are needed to update the site.

| File | Holds |
| --- | --- |
| `src/lib/site.ts` | Name, email, LinkedIn, positioning copy, signal panel, affiliations, résumé flag |
| `src/lib/data/projects.ts` | Projects, including problem/approach/outcome and category |
| `src/lib/data/experience.ts` | Roles and education |
| `src/lib/data/profile.ts` | Skills, honors, organizations, certifications, recommendations, languages |
| `content/writing/*.mdx` | Notes |

### Projects

Ordered by career signal rather than chronology. `featured: true` promotes a
project to the homepage. `category` drives the `/work` filter and must be one of
`Research`, `Systems`, `Quant`, or `ML`.

The `repo`, `demo`, and `paper` fields are optional and currently unset. Link
rows only render when a URL exists, so no placeholder or invented links appear.

### Writing

```mdx
---
title: "Note title"
description: "One line summary for the index and social cards."
date: "2026-08-14"
tags: ["Julia", "Research"]
draft: false
---
```

Frontmatter is validated with Zod at build time. A malformed note fails the
build with the filename and the specific problem, rather than rendering as
"Untitled". `draft: true` hides a note in production while keeping it visible in
`npm run dev`. Reading time is computed from word count. Code is highlighted at
build time by Shiki, so no highlighting JavaScript reaches the browser.

### Résumé

`siteConfig.resume.available` is `false`, so `/resume` renders a placeholder with
a request-a-copy action instead of a broken download. To enable the real thing,
add `public/aryan-dutt-resume.pdf` and set `available: true`.

---

## The globe

The homepage hero carries an interactive 3D visualisation of where the work has
happened: Singapore as home base, with arcs out to Cambridge, Massachusetts and
London. It is meant to read as an engineering dashboard, not decoration, so
there are no political borders, no labels on the sphere, and no colour beyond
the site accent.

### How the continents are drawn

No texture is fetched and no map image ships. Landmasses are a dot matrix:

1. `scripts/generate-land-points.mjs` reads `world-atlas/land-110m` at build
   time, samples 42,000 points on a Fibonacci lattice, and runs a
   bounding-box-accelerated point-in-polygon test against every land ring.
2. The 12,071 points that land on land are quantised to hundredths of a degree
   and written to `land-points.ts` as an `Int16Array`.
3. At runtime the scene converts those integers to sphere positions once inside
   a `useMemo`, then draws them as a single `THREE.Points` cloud.

The point-in-polygon work is far too slow for the browser, which is why it
happens once at build time. `world-atlas` and `topojson-client` are
**devDependencies**: they never reach the client.

Legibility comes from three layers rather than colour. A lit `meshStandardMaterial`
ocean sphere gives a soft terminator so the shape reads as a sphere, the land
dots sit above it in warm off-white as the brightest thing on the globe, and a
larger back-side sphere with additive blending supplies the rim glow. Latitude
rings stay faint so they read as structure, not cartography.

Regenerate after changing `SAMPLES` or swapping in `land-50m` for more detail:

```bash
npm run globe:land
```

### Files

| File | Role |
| --- | --- |
| `src/lib/data/locations.ts` | Cities, roles per city, and the connections between them |
| `src/components/globe/projection.ts` | Pure lat/long maths, **no Three.js import** |
| `src/components/globe/geo.ts` | Three.js vectors and great-circle arcs |
| `src/components/globe/land-points.ts` | Generated. Continent dot positions, do not edit |
| `scripts/generate-land-points.mjs` | Regenerates the above with `npm run globe:land` |
| `src/components/globe/globe-scene.tsx` | The WebGL scene (client only, lazily imported) |
| `src/components/globe/globe-fallback.tsx` | Static SVG projection of the same data |
| `src/components/globe/index.tsx` | Capability detection, tooltip, accessible text |

### How it degrades

Three tiers, decided once after first paint so nothing blocks the hero:

1. **Full 3D** on desktop with WebGL and more than four CPU cores.
2. **Static SVG** on viewports under 900px, on devices reporting four cores or
   fewer, and wherever WebGL is unavailable. This is a real projection of the
   same nodes and arcs, not a placeholder image, so the information survives.
   It deliberately omits the continents: pulling the land data into the initial
   bundle would cost every visitor roughly 56 KB gzipped for a decorative gain.
3. **Text** in the `sr-only` block: every city and every role, always present in
   the server HTML. Hover is an enhancement, never the only route to content.

Under `prefers-reduced-motion: reduce` the 3D scene still renders but nothing
moves: no auto-rotation, no node pulsing, no travelling dots.

### Performance

Three.js and the land data never enter the initial bundle. The scene is behind
`next/dynamic` with `ssr: false`, so the homepage ships **178 KB gzipped**,
about 3 KB more than before the globe existed. The globe chunk, which carries
Three.js, the scene, and the continent data together, is roughly 294 KB gzipped
and downloads only when the full tier is selected.

This is why `projection.ts` exists separately from `geo.ts`. The SVG fallback
loads everywhere, and when it imported the Three-dependent module the initial
payload jumped to 276 KB. Keeping the shared maths Three-free brought it back.
**If you add a helper used by the fallback, put it in `projection.ts`.**

Other measures: `dpr` capped at 2, geometry and point positions built inside
`useMemo`, per-frame work done through refs rather than state, and pulses
sharing one curve instance per arc.

### Tuning

| What | Where |
| --- | --- |
| Node positions | `coordinates: [longitude, latitude]` in `locations.ts` |
| Line style | `style` on a connection: `solid`, `dashed`, or `mixed` (draws both) |
| Dash spacing | `dashSize` / `gapSize` on the dashed `<Line>` in `globe-scene.tsx` |
| Rotation speed | `delta * 0.055` in the `Globe` component's `useFrame` |
| Pulse speed | `clock.elapsedTime * 0.12` in `Pulse` |
| Arc height | `lift` in `buildArc` (`geo.ts`) |
| Land dot size | `size` on the `pointsMaterial` in `LandPoints` |
| Land dot density | `SAMPLES` in `scripts/generate-land-points.mjs`, then rerun it |
| Ocean and land colour | `COLOR.ocean` and `COLOR.land` in `globe-scene.tsx` |
| Rim glow | `opacity` on the `Atmosphere` mesh |
| Colours | The `COLOR` map in `globe-scene.tsx`, which mirrors the CSS tokens |

Adding a city means adding it to `locations`, then adding a connection
referencing its id. Both the 3D scene and the SVG fallback read the same arrays,
so neither needs editing.

---

## SEO and accessibility

- Unique title, description, and canonical URL per route.
- JSON-LD `Person` and `WebSite` schemas in the root layout.
- Open Graph and Twitter card metadata; the card image is generated at build
  time by `next/og` and matches the site's visual system.
- `sitemap.xml` and `robots.txt` generated from the same data as the nav.
- Semantic landmarks, a single `h1` per page, labelled sections, and a
  skip-to-content link.
- Every interactive element is reachable and operable by keyboard. The command
  palette traps focus, closes on `Escape`, and restores focus on close. The
  mobile menu is a native `<details>` element, so navigation works without JS.
- No interaction depends on hover alone; the project card accent marker responds
  to `:focus-visible` as well as `:hover`.
- One consistent `:focus-visible` ring across the site.

---

## Deploying to Vercel

1. Push to GitHub.
2. In Vercel choose **Add New → Project** and import the repository. Next.js is
   detected automatically; the defaults are correct.
3. Add the environment variable below under **Settings → Environment Variables**.
4. Deploy.

From the CLI instead:

```bash
npx vercel --prod
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical origin for metadata, Open Graph URLs, JSON-LD, `sitemap.xml`, and `robots.txt`. Defaults to `https://aryandutt.dev`. |

Set it to the real production origin with no trailing slash, for example
`https://aryandutt.dev`. Canonical URLs and the sitemap will otherwise disagree
with the deployed domain.

To attach a custom domain, add it under **Settings → Domains**, point DNS at
Vercel, then update `NEXT_PUBLIC_SITE_URL` to match and redeploy.

`vercel.json` pins the framework, sets the deploy region to `sin1` (Singapore,
closest to the audience), and applies baseline security headers.

---

## Known gaps

- **The LLM safety paper has no citation.** `/research` states this openly
  rather than implying a publication that cannot be linked.
- **No project links.** No public repository, demo, or paper URLs were available.
- **No `next/image` usage.** The repository contains no image assets, so there is
  nothing to render. The generated OG image and favicon cover social and tab
  presentation.
- **No résumé PDF.** See above.
- **The two MDX notes are placeholders** and are not written by Aryan. Review or
  replace them before publishing.

## License

Content and design © Aryan Dutt. Code available for reference.
