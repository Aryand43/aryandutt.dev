import type { Metadata } from "next";

import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects by Aryan Dutt: LLM safety evaluation, scientific ML in Julia, transaction anomaly detection, IoT telemetry, and data pipelines.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24">
      <PageIntro
        title="Work"
        description="Research systems, ML pipelines, and the tooling built around them."
      />

      <ul className="mt-12 space-y-3">
        {projects.map((project) => (
          <li key={project.slug}>
            <Reveal>
              <article className="rounded-lg border border-line/70 p-6 transition-colors hover:border-line">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <h2 className="font-medium tracking-tight">{project.title}</h2>
                  <p className="shrink-0 font-mono text-xs text-subtle">
                    {project.period}
                  </p>
                </div>
                {project.association || project.contributors ? (
                  <p className="mt-1 font-mono text-xs text-subtle">
                    {[project.association, project.contributors]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                ) : null}
                <p className="mt-4 text-pretty text-sm leading-relaxed text-muted">
                  {project.blurb}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {project.details.map((detail) => (
                    <li
                      key={detail}
                      className="text-pretty text-sm leading-relaxed text-subtle"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
                  {project.tags.map((tag) => (
                    <li key={tag} className="font-mono text-xs text-subtle">
                      {tag}
                    </li>
                  ))}
                </ul>
                {project.repo || project.demo || project.paper ? (
                  <div className="mt-5 flex flex-wrap gap-6 border-t border-line/60 pt-4">
                    {project.repo ? (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm text-muted transition-colors hover:text-accent"
                      >
                        Code
                      </a>
                    ) : null}
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm text-muted transition-colors hover:text-accent"
                      >
                        Demo
                      </a>
                    ) : null}
                    {project.paper ? (
                      <a
                        href={project.paper}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm text-muted transition-colors hover:text-accent"
                      >
                        Paper
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
