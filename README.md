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

Five components opt into the client, and nothing else does:

| Component | Why it needs the client |
| --- | --- |
| `command-menu` | `⌘K` / `Ctrl+K` key listener and trigger button |
| `command-palette` | Search dialog, keyboard navigation, focus management |
| `project-filter` | Category filtering on `/work` |
| `copy-email` | Clipboard write on `/contact` |
| `scroll-progress` | Fallback only, where CSS scroll-driven animations are unsupported |

The palette is loaded with `next/dynamic`, so its code (roughly 1.6 KB gzipped)
downloads only when someone opens it. Everything above the fold is server
rendered. Adding all of this cost about 3 KB gzipped over the fully static
version it replaced.

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
