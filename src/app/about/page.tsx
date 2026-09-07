import type { Metadata } from "next";

import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import {
  certifications,
  honors,
  languages,
  organizations,
  recommendations,
  skillGroups,
  topSkills,
} from "@/lib/data/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aryan Dutt, Data Science and AI undergraduate at NTU Singapore, with research at the MIT Julia Lab and NTU CCDS.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-16">
      <PageIntro
        index="07"
        title="About"
      />

      <Reveal>
        <section className="mt-12 max-w-xl space-y-5 text-pretty leading-[1.75] text-ink-muted">
          <p>
            I am reading Data Science and Artificial Intelligence at NTU
            Singapore with a minor in Mathematics. The through line in my work is
            scientific computing under real constraints.
          </p>
          <p>
            At the MIT Julia Lab I worked with Dr. Chris Rackauckas on scientific
            machine learning, the part of the field where numerical solvers and
            learned models have to agree with each other. At NTU CCDS I moved up
            the stack to LLM safety alignment, co-authoring a paper with Prof.
            Anupam Chattopadhyay on how alignment holds up under pressure.
          </p>
          <p>
            Alongside the research I have shipped production software: anomaly
            detection over banking transactions at Tagit, bioreactor telemetry at
            BioMetallica, curriculum data pipelines at a YC F24 startup in London,
            and low latency data platform work at InterSystems.
          </p>
          <p>
            Before university I served two years of National Service with
            Singapore&apos;s Ministry of Home Affairs in ProCom, working on
            critical infrastructure protection. It taught me more about
            operational discipline than any codebase has.
          </p>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-20 border-t border-line-soft pt-12">
          <h2 className="label">
            Skills
          </h2>
          <p className="mt-6 text-sm text-ink-muted">
            Top skills: {topSkills.join(", ")}.
          </p>
          <dl className="mt-8 space-y-6">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="flex flex-col gap-1 sm:flex-row sm:gap-8"
              >
                <dt className="w-48 shrink-0 text-sm font-medium">
                  {group.title}
                </dt>
                <dd className="text-sm text-ink-muted">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Reveal>

      <Reveal>
        <section
          id="honors"
          className="mt-16 scroll-mt-24 border-t border-line-soft pt-12"
        >
          <h2 className="label">
            Honors and awards
          </h2>
          <ul className="mt-8 divide-y divide-line-soft">
            {honors.map((honor) => (
              <li key={honor.name} className="py-5">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <p className="text-sm font-medium">{honor.name}</p>
                  <p className="shrink-0 font-mono text-xs text-ink-faint">
                    {honor.date}
                  </p>
                </div>
                {honor.issuer ? (
                  <p className="mt-1 text-sm text-ink-muted">{honor.issuer}</p>
                ) : null}
                {honor.association ? (
                  <p className="mt-0.5 text-sm text-ink-faint">
                    {honor.association}
                  </p>
                ) : null}
                {honor.detail ? (
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-faint">
                    {honor.detail}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section
          id="organizations"
          className="mt-16 scroll-mt-24 border-t border-line-soft pt-12"
        >
          <h2 className="label">
            Organizations
          </h2>
          <ul className="mt-8 divide-y divide-line-soft">
            {organizations.map((org) => (
              <li key={org.name} className="py-5">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <p className="text-sm font-medium">{org.name}</p>
                  <p className="shrink-0 font-mono text-xs text-ink-faint">
                    {org.period}
                  </p>
                </div>
                <p className="mt-1 text-sm text-ink-muted">{org.role}</p>
                <p className="mt-0.5 text-sm text-ink-faint">{org.association}</p>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-16 border-t border-line-soft pt-12">
          <h2 className="label">
            Certifications
          </h2>
          <ul className="mt-8 divide-y divide-line-soft">
            {certifications.map((cert) => (
              <li
                key={cert.name}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div>
                  <p className="text-sm font-medium">{cert.name}</p>
                  <p className="mt-0.5 text-sm text-ink-muted">{cert.issuer}</p>
                </div>
                <p className="shrink-0 font-mono text-xs text-ink-faint">
                  {cert.date}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section
          id="recommendations"
          className="mt-16 scroll-mt-24 border-t border-line-soft pt-12"
        >
          <h2 className="label">
            Recommendations
          </h2>
          <ul className="mt-8 space-y-8">
            {recommendations.map((rec) => (
              <li key={rec.name}>
                <figure>
                  <blockquote className="border-l border-line-soft pl-5 text-pretty text-sm leading-[1.75] text-ink-muted">
                    {rec.quote}
                  </blockquote>
                  <figcaption className="mt-3 pl-5">
                    <span className="text-sm font-medium">{rec.name}</span>
                    <span className="mt-0.5 block text-sm text-ink-faint">
                      {rec.title}
                    </span>
                    <span className="mt-0.5 block font-mono text-xs text-ink-faint">
                      {rec.relationship}, {rec.date}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-16 border-t border-line-soft pt-12">
          <h2 className="label">
            Languages
          </h2>
          <ul className="mt-8 divide-y divide-line-soft">
            {languages.map((language) => (
              <li
                key={language.name}
                className="flex items-baseline justify-between gap-6 py-4"
              >
                <p className="text-sm font-medium">{language.name}</p>
                <p className="text-sm text-ink-faint">{language.level}</p>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>
    </div>
  );
}
