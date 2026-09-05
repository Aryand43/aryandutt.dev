# aryandutt.dev

Personal portfolio site for **Aryan Dutt** — Data Science & AI at NTU Singapore.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer
Motion, and MDX. Dark-mode first, fully static, deployed on Vercel.

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (also type-checks and lints) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit`, no build output |

---

## Project structure

```
content/blog/            MDX blog posts (one file per post)
src/app/                 App Router routes
  layout.tsx             Root layout, fonts, theme provider, metadata
  page.tsx               Home — hero, highlights, recent roles, featured work
  about/                 Bio, skills, education, honors, certifications
  experience/            Full reverse-chronological timeline
  projects/              Filterable project grid
  blog/                  Post index
  blog/[slug]/           Individual post (statically generated)
  contact/               Email + LinkedIn
  sitemap.ts robots.ts   Generated from site config and post list
src/components/
  ui/                    shadcn/ui primitives (button, card, badge, separator)
  motion/                Reveal + Stagger — Framer Motion wrappers
  hero.tsx timeline.tsx project-card.tsx project-grid.tsx post-card.tsx
  site-header.tsx site-footer.tsx theme-toggle.tsx mdx-content.tsx
src/lib/
  site.ts                Name, URL, email, socials, nav — edit this first
  blog.ts                Reads and parses MDX from content/blog
  data/experience.ts     Work history + education
  data/profile.ts        Skills, languages, certifications, honors, highlights
  data/projects.ts       Project entries
```

---

## Editing content

All content lives in typed data files — no component edits needed.

### Site identity

`src/lib/site.ts` holds name, email, LinkedIn, GitHub, and the canonical URL.
The GitHub URL is a **placeholder** (`github.com/aryandutt`) — update or remove it.

### Experience

`src/lib/data/experience.ts`. Entries are rendered in array order, so keep the
array reverse-chronological. `start` / `end` are ISO months for future sorting;
`period` is the string that actually renders.

### Projects

`src/lib/data/projects.ts`. Entries here were derived from the work history —
each one is real, but the `repo`, `demo`, and `paper` link fields are
intentionally **left empty** rather than pointing at URLs that may not exist.
Add them as they become available:

```ts
{
  slug: "transaction-anomaly-detection",
  title: "Transaction Anomaly Detection",
  // ...
  repo: "https://github.com/aryandutt/...",   // renders a "Code" link
  paper: "https://arxiv.org/abs/...",         // renders a "Paper" link
}
```

`featured: true` promotes a project onto the home page. Filter tags are derived
automatically from every project's `tags`.

### Blog posts

Drop a `.mdx` file into `content/blog/`. The filename becomes the URL slug.

```mdx
---
title: "Post title"
description: "One-line summary for the index page and social cards."
date: "2026-08-14"
tags: ["Julia", "Research"]
draft: false
---

Body copy. GitHub-flavoured markdown, tables, and fenced code all work.
```

- `draft: true` hides a post in production but keeps it visible in `npm run dev`.
- Posts sort by `date`, newest first.
- Reading time is computed from word count — don't set it manually.
- Syntax highlighting is handled by `rehype-pretty-code` (Shiki) at build time,
  so there is no highlighting JS in the client bundle.

---

## Design notes

- **Dark-mode first.** `defaultTheme="dark"` with system detection and a manual
  toggle. Both palettes are defined as HSL CSS variables in
  `src/app/globals.css`; the light theme is deliberately quiet.
- **Motion is subtle and accessible.** `Reveal` and `Stagger` wrap Framer Motion
  and both check `useReducedMotion()`, so animations collapse to a short fade
  when the OS asks for reduced motion. `globals.css` also cuts transition
  durations under `prefers-reduced-motion`.
- **No-JS fallback.** Framer Motion serialises its initial hidden styles into the
  SSR HTML, which would leave content invisible if JS never runs. A `<noscript>`
  block in `layout.tsx` forces those elements to their resting state.
- **Accessibility.** Skip-to-content link, `aria-current` on active nav,
  labelled icon buttons, visible focus rings, and semantic landmarks throughout.

---

## Deploying to Vercel

### Dashboard

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project**, import the repo.
3. Framework preset is detected as **Next.js** — the defaults are correct.
4. Set the environment variable below, then **Deploy**.

### CLI

```bash
npm i -g vercel
vercel
vercel --prod
```

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical origin used for metadata, Open Graph URLs, `sitemap.xml`, and `robots.txt`. Defaults to `https://aryandutt.dev`. Set it to the real production domain. |

### Custom domain

Add the domain under **Project → Settings → Domains**, point DNS at Vercel, then
set `NEXT_PUBLIC_SITE_URL` to match so canonical URLs and the sitemap agree.

### `vercel.json`

Pins the framework and install command, sets the deploy region to `sin1`
(Singapore — closest to the audience), and adds baseline security headers
(`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`,
`Permissions-Policy`). Adjust `regions` if the audience shifts.

---

## Notes and known gaps

- **No OG image.** Social cards use text metadata only. Add an
  `opengraph-image.tsx` under `src/app/` if you want generated preview images.
- **No analytics.** `@vercel/analytics` drops in with one component in the root
  layout if wanted.
- **No résumé PDF.** If you add one, put it in `public/` and link it from the
  contact page.
- **GitHub link is a placeholder** — see `src/lib/site.ts`.

## License

Content and design © Aryan Dutt. Code available for reference.
