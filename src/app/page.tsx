import { Link } from "next-view-transitions";

import { Reveal } from "@/components/reveal";
import { experience } from "@/lib/data/experience";
import { selectedProjects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const featuredRoles = experience.filter((role) => role.featured);

  return (
    <div className="mx-auto max-w-3xl px-6">
      {/* Hero. CSS entrance only, so nothing above the fold waits on JS. */}
      <section className="pt-24 pb-28 sm:pt-32 sm:pb-36">
        <h1 className="animate-rise text-display text-balance font-medium">
          {siteConfig.name}
        </h1>
        <p
          className="animate-rise mt-6 max-w-xl text-lead text-pretty text-muted"
          style={{ animationDelay: "80ms" }}
        >
          {siteConfig.positioning}. I work on scientific machine learning, LLM
          safety alignment, and low latency data systems.
        </p>
        <p
          className="animate-rise mt-4 font-mono text-sm text-subtle"
          style={{ animationDelay: "140ms" }}
        >
          {siteConfig.location}
        </p>
        <div
          className="animate-rise mt-10 flex flex-wrap gap-3"
          style={{ animationDelay: "200ms" }}
        >
          <Link
            href="/work"
            className="rounded-lg border border-line bg-surface px-4 py-2 text-sm transition-colors hover:border-accent/50"
          >
            Selected work
          </Link>
          <a
            href={`mailto:${siteConfig.email}`}
            className="rounded-lg border border-transparent px-4 py-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            Get in touch
          </a>
        </div>
      </section>

      {/* Selected work: three high signal projects. */}
      <Reveal>
        <section className="border-t border-line/80 py-16">
          <div className="flex items-baseline justify-between">
            <h2 className="font-mono text-xs tracking-widest text-subtle uppercase">
              Selected work
            </h2>
            <Link
              href="/work"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              All projects
            </Link>
          </div>

          <ul className="mt-8 space-y-px">
            {selectedProjects.map((project) => (
              <li key={project.slug}>
                <article className="rounded-lg border border-transparent px-4 py-5 transition-colors hover:border-line hover:bg-surface/60">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-medium tracking-tight">{project.title}</h3>
                    <p className="shrink-0 font-mono text-xs text-subtle">
                      {project.period}
                    </p>
                  </div>
                  {project.association ? (
                    <p className="mt-1 font-mono text-xs text-subtle">
                      {project.association}
                    </p>
                  ) : null}
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">
                    {project.blurb}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      {/* Compact experience. The full timeline lives on its own page. */}
      <Reveal>
        <section className="border-t border-line/80 py-16">
          <div className="flex items-baseline justify-between">
            <h2 className="font-mono text-xs tracking-widest text-subtle uppercase">
              Experience
            </h2>
            <Link
              href="/experience"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              Full timeline
            </Link>
          </div>

          <ul className="mt-8 divide-y divide-line/60">
            {featuredRoles.map((role) => (
              <li
                key={role.slug}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div>
                  <p className="text-sm font-medium">{role.company}</p>
                  <p className="mt-0.5 text-sm text-muted">{role.role}</p>
                </div>
                <p className="shrink-0 font-mono text-xs text-subtle">
                  {role.period}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      {/* Compact contact. */}
      <Reveal>
        <section className="border-t border-line/80 py-16">
          <h2 className="font-mono text-xs tracking-widest text-subtle uppercase">
            Contact
          </h2>
          <p className="mt-6 max-w-lg text-pretty leading-relaxed text-muted">
            Open to research collaborations, internships, and conversations about
            scientific ML, LLM safety, or low latency systems.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm transition-colors hover:text-accent"
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
