import { ArrowRight, FileText, Mail } from "lucide-react";

import { Globe } from "@/components/globe";

import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { SignalPanel } from "@/components/signal-panel";
import { TimelinePreview } from "@/components/timeline";
import { ButtonLink } from "@/components/ui/button-link";
import { experience } from "@/lib/data/experience";
import { featuredProjects } from "@/lib/data/projects";
import { getAllPosts } from "@/lib/writing";
import { affiliations, siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

const PREVIEW_ROLES = [
  "mit-julia-lab",
  "intersystems",
  "ntu-ccds",
  "tagit",
  "general-learning",
  "mha-singapore",
];

export default function HomePage() {
  const roles = PREVIEW_ROLES.map((slug) =>
    experience.find((role) => role.slug === slug),
  ).filter((role): role is NonNullable<typeof role> => Boolean(role));

  const posts = getAllPosts();
  const [featuredPost, ...restPosts] = posts;

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* ---------------------------------------------- Hero */}
      <section className="relative pt-16 pb-14 sm:pt-20">
        <div
          aria-hidden
          className="grid-field pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[32rem] [mask-image:radial-gradient(70%_55%_at_35%_0%,black,transparent)]"
        />

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10">
          {/* Copy column. Deliberately sparse: name, one sentence, three actions. */}
          <div className="relative z-10">
            <p className="label animate-fade">{siteConfig.role}</p>

            <h1 className="animate-rise mt-4 text-balance text-hero font-medium">
              {siteConfig.name}
            </h1>

            <p
              className="animate-rise mt-6 max-w-lg text-pretty text-lead text-ink-muted"
              style={{ animationDelay: "70ms" }}
            >
              {siteConfig.summary}
            </p>

            <div
              className="animate-rise mt-9 flex flex-wrap gap-2.5"
              style={{ animationDelay: "130ms" }}
            >
              <ButtonLink href="/work" variant="primary">
                Selected work
                <ArrowRight aria-hidden />
              </ButtonLink>
              <ButtonLink href="/resume">
                <FileText aria-hidden />
                Résumé
              </ButtonLink>
              <ButtonLink href={`mailto:${siteConfig.email}`} variant="ghost">
                <Mail aria-hidden />
                Contact
              </ButtonLink>
            </div>
          </div>

          {/* Globe. Decorative framing, informative content, never a blocker. */}
          <div
            className="animate-fade relative mx-auto w-full max-w-sm lg:max-w-none"
            style={{ animationDelay: "240ms" }}
          >
            <Globe />
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 lg:justify-start">
              <span className="label flex items-center gap-2">
                <span aria-hidden className="h-px w-5 bg-accent" />
                On-site and hybrid
              </span>
              <span className="label flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-px w-5 bg-[repeating-linear-gradient(90deg,var(--color-accent)_0_3px,transparent_3px_6px)]"
                />
                Remote
              </span>
            </div>
          </div>
        </div>

        {/* Credibility strip. Every entry is supported by the record. */}
        <div
          className="animate-fade mt-14 border-t border-line-soft pt-5"
          style={{ animationDelay: "300ms" }}
        >
          <h2 className="sr-only">Affiliations</h2>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {affiliations.map((name) => (
              <li key={name} className="label text-ink-muted">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------- Signal panel */}
      <section aria-labelledby="signal-heading" className="py-6">
        <h2 id="signal-heading" className="sr-only">
          Profile at a glance
        </h2>
        <SignalPanel />
      </section>

      {/* ---------------------------------------------- Selected work */}
      <section aria-labelledby="work-heading" className="reveal pt-16">
        <div id="work-heading">
          <SectionHeader
            index="01"
            title="Selected work"
            action={{ href: "/work", label: "All projects" }}
          />
        </div>
        <div className="mt-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------- Experience */}
      <section aria-labelledby="experience-heading" className="reveal pt-20">
        <div id="experience-heading">
          <SectionHeader
            index="02"
            title="Experience"
            action={{ href: "/experience", label: "Full timeline" }}
          />
        </div>
        <div className="mt-2">
          <TimelinePreview items={roles} />
        </div>
      </section>

      {/* ---------------------------------------------- Research and writing */}
      <section aria-labelledby="writing-heading" className="reveal pt-20">
        <div id="writing-heading">
          <SectionHeader
            index="03"
            title="Research notes"
            action={{ href: "/writing", label: "All writing" }}
          />
        </div>

        {featuredPost ? (
          <div className="mt-2">
            <article className="border-b border-line-soft py-7">
              <div className="flex flex-wrap items-baseline gap-x-4">
                <p className="label text-accent">Featured</p>
                <p className="label ml-auto">
                  {formatDate(featuredPost.date)} · {featuredPost.readingTime} min
                </p>
              </div>
              <h3 className="mt-3 text-title font-medium text-balance">
                <a
                  href={`/writing/${featuredPost.slug}`}
                  className="transition-colors hover:text-accent"
                >
                  {featuredPost.title}
                </a>
              </h3>
              <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-ink-muted">
                {featuredPost.description}
              </p>
            </article>
            {restPosts.slice(0, 2).map((post) => (
              <article
                key={post.slug}
                className="flex flex-wrap items-baseline gap-x-4 border-b border-line-soft py-4"
              >
                <a
                  href={`/writing/${post.slug}`}
                  className="text-sm text-ink transition-colors hover:text-accent"
                >
                  {post.title}
                </a>
                <p className="label ml-auto">{formatDate(post.date)}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-2 border-b border-line-soft py-12">
            <p className="max-w-xl text-pretty leading-relaxed text-ink-muted">
              Research notes are in progress. Writing will cover scientific
              machine learning, LLM safety evaluation, anomaly detection, and
              quantitative systems.
            </p>
            <p className="label mt-4">Nothing published yet</p>
          </div>
        )}
      </section>

      {/* ---------------------------------------------- Contact */}
      <section aria-labelledby="contact-heading" className="reveal pt-20 pb-8">
        <div id="contact-heading">
          <SectionHeader index="04" title="Contact" />
        </div>
        <div className="py-10">
          <p className="max-w-2xl text-balance text-display font-medium">
            Building something difficult?
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <ButtonLink href={`mailto:${siteConfig.email}`} variant="primary">
              <Mail aria-hidden />
              {siteConfig.email}
            </ButtonLink>
            <ButtonLink href={siteConfig.links.linkedin} external>
              LinkedIn
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
