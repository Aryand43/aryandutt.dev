import type { Metadata } from "next";

import { PageIntro } from "@/components/page-intro";
import { education, experience } from "@/lib/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Complete record: research and engineering roles across NTU, the MIT Julia Lab, InterSystems, YC-backed startups, and Singapore's Ministry of Home Affairs.",
  alternates: { canonical: "/experience" },
};

const KIND_LABEL = {
  research: "Research",
  engineering: "Engineering",
  service: "Service",
} as const;

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-16">
      <PageIntro
        index="02"
        title="Experience"
        description="Ten roles across research labs, startups, and enterprise data platforms, in reverse chronological order."
      />

      <ol className="mt-10">
        {experience.map((role) => (
          <li
            key={role.slug}
            className="reveal grid gap-x-8 gap-y-3 border-b border-line-soft py-8 lg:grid-cols-[10rem_1fr]"
          >
            <div className="lg:pt-1">
              <p className="label">{KIND_LABEL[role.kind]}</p>
              <p className="label mt-1.5 text-ink-muted">{role.period}</p>
            </div>

            <div>
              <h2 className="text-title font-medium">{role.role}</h2>
              <p className="mt-1 text-sm text-ink-muted">
                {role.company} · {role.location}
              </p>
              <p className="label mt-1">{role.engagement}</p>

              <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-ink-muted">
                {role.summary}
              </p>

              <ul className="mt-4 space-y-2">
                {role.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="max-w-2xl text-pretty text-sm leading-relaxed text-ink-faint"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
                {role.tags.map((tag) => (
                  <li key={tag} className="label">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <section className="reveal pt-16">
        <h2 className="label border-b border-line-soft pb-4">Education</h2>
        <ul className="mt-2">
          {education.map((item) => (
            <li
              key={item.school}
              className="grid gap-x-8 gap-y-2 border-b border-line-soft py-7 lg:grid-cols-[10rem_1fr]"
            >
              <p className="label lg:pt-1">{item.period}</p>
              <div>
                <p className="font-medium">{item.school}</p>
                <p className="mt-1 text-sm text-ink-muted">{item.credential}</p>
                {item.detail ? (
                  <p className="mt-1 text-sm text-ink-faint">{item.detail}</p>
                ) : null}
                {item.coursework ? (
                  <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-ink-faint">
                    <span className="label">Selected coursework</span>{" "}
                    {item.coursework.join(", ")}.
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
