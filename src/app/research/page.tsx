import type { Metadata } from "next";

import { PageIntro } from "@/components/page-intro";
import { ButtonLink } from "@/components/ui/button-link";
import { experience } from "@/lib/data/experience";
import { projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research profile: scientific machine learning at the MIT Julia Lab, LLM safety alignment at NTU CCDS, and additive manufacturing research at NTU SC3DP.",
  alternates: { canonical: "/research" },
};

const INTERESTS = [
  {
    area: "Scientific machine learning",
    detail:
      "Numerical solvers and learned models in the same system, where the analysis tradition sets the standard for what counts as correct.",
  },
  {
    area: "LLM safety and evaluation",
    detail:
      "Evaluation design for failures that are fluent rather than loud, grouped by prompt family instead of collapsed into a single refusal rate.",
  },
  {
    area: "Low-latency systems",
    detail:
      "Treating tail latency as a distribution to be measured rather than an average to be reported.",
  },
];

export default function ResearchPage() {
  const researchRoles = experience.filter((role) => role.kind === "research");
  const researchProjects = projects.filter(
    (project) => project.category === "Research" || project.category === "ML",
  );

  return (
    <div className="mx-auto max-w-5xl px-6 pb-16">
      <PageIntro
        index="03"
        title="Research"
        description="Four research positions across scientific machine learning, LLM safety alignment, and additive manufacturing."
      />

      <section className="reveal pt-14">
        <h2 className="label border-b border-line-soft pb-4">Interests</h2>
        <dl className="mt-2">
          {INTERESTS.map((interest) => (
            <div
              key={interest.area}
              className="grid gap-x-8 gap-y-2 border-b border-line-soft py-7 lg:grid-cols-[16rem_1fr]"
            >
              <dt className="font-medium">{interest.area}</dt>
              <dd className="max-w-2xl text-pretty leading-relaxed text-ink-muted">
                {interest.detail}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="reveal pt-16">
        <h2 className="label border-b border-line-soft pb-4">Appointments</h2>
        <ul className="mt-2">
          {researchRoles.map((role) => (
            <li
              key={role.slug}
              className="grid gap-x-8 gap-y-2 border-b border-line-soft py-7 lg:grid-cols-[10rem_1fr]"
            >
              <p className="label lg:pt-1">{role.period}</p>
              <div>
                <p className="font-medium">{role.company}</p>
                <p className="mt-1 text-sm text-ink-muted">{role.role}</p>
                <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-ink-faint">
                  {role.summary}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="reveal pt-16">
        <h2 className="label border-b border-line-soft pb-4">Publications</h2>
        <div className="py-10">
          <p className="max-w-2xl text-pretty leading-relaxed text-ink-muted">
            A paper on LLM safety alignment was produced with Prof. Anupam
            Chattopadhyay at NTU CCDS between August 2025 and May 2026. Title,
            venue, and a link will be listed here once they are confirmed.
          </p>
          <p className="label mt-5">Citation pending confirmation</p>
        </div>
      </section>

      <section className="reveal pt-8">
        <h2 className="label border-b border-line-soft pb-4">
          Research-adjacent projects
        </h2>
        <ul className="mt-2">
          {researchProjects.map((project) => (
            <li
              key={project.slug}
              className="border-b border-line-soft py-6"
            >
              <a
                href={`/work/${project.slug}`}
                className="text-title font-medium transition-colors hover:text-accent"
              >
                {project.title}
              </a>
              <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-ink-muted">
                {project.thesis}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="reveal pt-12">
        <ButtonLink href={`mailto:${siteConfig.email}`} variant="primary">
          Discuss a collaboration
        </ButtonLink>
      </div>
    </div>
  );
}
