import type { Metadata } from "next";

import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { education, experience } from "@/lib/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Research and engineering roles across NTU, MIT Julia Lab, InterSystems, YC backed startups, and Singapore's Ministry of Home Affairs.",
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24">
      <PageIntro
        title="Experience"
        description="Ten roles across research labs, startups, and enterprise data platforms, in reverse chronological order."
      />

      <ol className="mt-12 space-y-10">
        {experience.map((role) => (
          <li key={role.slug}>
            <Reveal>
              <article className="border-l border-line pl-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="font-medium tracking-tight">{role.role}</h2>
                  <p className="font-mono text-xs text-subtle">{role.period}</p>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {role.company}, {role.location}
                </p>
                <p className="mt-0.5 font-mono text-xs text-subtle">
                  {role.engagement}
                </p>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">
                  {role.summary}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="text-sm leading-relaxed text-subtle"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                  {role.tags.map((tag) => (
                    <li key={tag} className="font-mono text-xs text-subtle">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal>
        <section className="mt-20 border-t border-line/80 pt-12">
          <h2 className="font-mono text-xs tracking-widest text-subtle uppercase">
            Education
          </h2>
          <ul className="mt-8 divide-y divide-line/60">
            {education.map((item) => (
              <li
                key={item.school}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div>
                  <p className="text-sm font-medium">{item.school}</p>
                  <p className="mt-0.5 text-sm text-muted">{item.credential}</p>
                  {item.detail ? (
                    <p className="mt-0.5 text-sm text-subtle">{item.detail}</p>
                  ) : null}
                  {item.coursework ? (
                    <p className="mt-2 max-w-lg text-pretty text-sm leading-relaxed text-subtle">
                      Selected coursework: {item.coursework.join(", ")}.
                    </p>
                  ) : null}
                </div>
                <p className="shrink-0 font-mono text-xs text-subtle">
                  {item.period}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>
    </div>
  );
}
