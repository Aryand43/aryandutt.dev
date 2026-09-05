# aryandutt.dev

Personal site for **Aryan Dutt**, Data Science and AI at NTU Singapore.

Next.js 16 (App Router), TypeScript, Tailwind v4, MDX. Dark only, monochrome,
fully static, zero client components.

## Quick start

```bash
npm install
npm run dev
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build, type checked |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint flat config |
| `npm run typecheck` | `tsc --noEmit` |

## Structure

```
content/blog/          MDX posts, one file per post
src/app/
  page.tsx             Home: hero, selected work, experience, contact
  work/                All projects
  experience/          Full timeline and education
  about/               Bio, skills, honors, certifications, languages
  blog/  blog/[slug]/  Post index and post pages
  opengraph-image.tsx  Social card, generated at build time
  sitemap.ts robots.ts
src/components/        Header, footer, page intro, Reveal, MDX renderer
src/lib/
  site.ts              Identity, nav, links. Edit this first.
  blog.ts              MDX loading with Zod validated frontmatter
  data/                experience.ts, profile.ts, projects.ts
```

## Editing content

All copy lives in typed data files. No component edits needed.

- **Projects**: `src/lib/data/projects.ts`. `selected: true` promotes a project
  to the home page, which shows exactly three. The `repo`, `demo`, and `paper`
  fields are optional and currently unset, so no link row renders.
- **Experience**: `src/lib/data/experience.ts`, kept in reverse chronological
  order. `featured: true` surfaces a role in the compact home page list.
- **Skills, honors, certifications**: `src/lib/data/profile.ts`.

### Blog posts

Add a `.mdx` file to `content/blog/`. The filename becomes the slug.

```mdx
---
title: "Post title"
description: "One line summary for the index and social cards."
date: "2026-08-14"
tags: ["Julia", "Research"]
draft: false
---
```

Frontmatter is validated by Zod at build time. A malformed post fails the build
with the file named and the problem spelled out, rather than rendering as
"Untitled". Posts sort newest first, `draft: true` hides a post in production
but keeps it visible in `npm run dev`, and reading time is computed from word
count.

## Design system

Tokens live in an `@theme` block at the top of `src/app/globals.css`. Tailwind
v4 is CSS first, so there is no `tailwind.config.ts`.

- **Monochrome plus one accent.** Greyscale surfaces with a single accent
  reserved for links, focus rings, and hover states. Nothing else is coloured.
- **Fluid typography.** `--text-display`, `--text-title`, and `--text-lead` use
  `clamp()`, so type scales continuously with the viewport instead of jumping at
  breakpoints.
- **One border weight, one radius.** Every surface is a 1px `--color-line`
  border at `rounded-lg`.
- **Layout.** A single 48rem measure, generous vertical rhythm, typography led.

## Performance and accessibility

- **Zero client components.** There is no `"use client"` anywhere in `src`.
  Every page is prerendered static HTML.
- **CSS only animation.** Above-the-fold entrances use the `animate-rise`
  keyframe. Scroll entrances use CSS scroll-driven animations
  (`animation-timeline: view()`). Browsers without support render the content
  normally, which is the correct fallback. Everything collapses under
  `prefers-reduced-motion`.
- **Keyboard navigation.** Skip to content link, one consistent
  `:focus-visible` treatment, and a mobile menu built on native `<details>` so
  it works without JS.
- **View transitions** via `next-view-transitions` for cross-page navigation.

## Deploying to Vercel

1. Push to GitHub.
2. In Vercel, **Add New, Project**, import the repo. Next.js is detected.
3. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
4. Deploy.

Or from the CLI:

```bash
npx vercel --prod
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical origin for metadata, Open Graph URLs, `sitemap.xml`, and `robots.txt`. Defaults to `https://aryandutt.dev`. |

`vercel.json` pins the framework, sets the region to `sin1`, and adds baseline
security headers.

## Known gaps

- **No `next/image` usage.** There are no image assets in the repo, so nothing
  to render. Add a portrait to `public/` and it can go in the hero.
- **shadcn/ui is configured but unused.** `components.json` is set up for
  Tailwind v4, so `npx shadcn@latest add button` works when a primitive is
  actually needed. The current design is typography led and needs none.
- **No résumé PDF or analytics.**

## License

Content and design © Aryan Dutt. Code available for reference.
