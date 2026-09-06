import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "next-view-transitions";
import { ArrowLeft } from "lucide-react";

import { getProjectBySlug, projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.thesis,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.thesis,
      url: `${siteConfig.url}/work/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.thesis,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const links = [
    project.repo ? { label: "Code", href: project.repo } : null,
    project.demo ? { label: "Demo", href: project.demo } : null,
    project.paper ? { label: "Paper", href: project.paper } : null,
  ].filter((link): link is { label: string; href: string } => Boolean(link));

  return (
    <div className="mx-auto max-w-3xl px-6 pb-16">
      <div className="pt-10">
        <Link
          href="/work"
          className="label inline-flex items-center gap-1.5 transition-colors hover:text-accent"
        >
          <ArrowLeft aria-hidden className="size-3" />
          All work
        </Link>
      </div>

      <article className="animate-rise">
        <header className="border-b border-line-soft pt-8 pb-10">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <p className="label text-accent">{project.category}</p>
            <p className="label">{project.period}</p>
            {project.association ? (
              <p className="label">{project.association}</p>
            ) : null}
          </div>

          <h1 className="mt-5 text-balance text-display font-medium">
            {project.title}
          </h1>
          <p className="mt-5 text-pretty text-lead text-ink-muted">
            {project.thesis}
          </p>

          {project.contributors ? (
            <p className="label mt-6">{project.contributors}</p>
          ) : null}

          {links.length > 0 ? (
            <div className="mt-7 flex flex-wrap gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-lg border border-line px-3 py-1.5 text-sm text-ink-muted transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </header>

        <section className="border-b border-line-soft py-10">
          <h2 className="label">Problem</h2>
          <p className="mt-4 text-pretty leading-[1.75] text-ink-muted">
            {project.problem}
          </p>
        </section>

        <section className="border-b border-line-soft py-10">
          <h2 className="label">Approach</h2>
          <ul className="mt-4 space-y-3">
            {project.approach.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="label shrink-0 pt-1 text-ink-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-pretty leading-[1.75] text-ink-muted">
                  {step}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {project.outcome ? (
          <section className="border-b border-line-soft py-10">
            <h2 className="label">Outcome</h2>
            <p className="mt-4 text-pretty leading-[1.75] text-ink-muted">
              {project.outcome}
            </p>
          </section>
        ) : null}

        <section className="py-10">
          <h2 className="label">Stack</h2>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {project.stack.map((item) => (
              <li key={item} className="font-mono text-sm text-ink-muted">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
