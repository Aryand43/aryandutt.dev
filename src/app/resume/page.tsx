import type { Metadata } from "next";
import { Download, Mail } from "lucide-react";

import { PageIntro } from "@/components/page-intro";
import { ButtonLink } from "@/components/ui/button-link";
import { education, experience } from "@/lib/data/experience";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé and career summary for ${siteConfig.name}, Data Science and AI undergraduate at NTU Singapore.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  const { available, path } = siteConfig.resume;

  return (
    <div className="mx-auto max-w-3xl px-6 pb-16">
      <PageIntro
        index="06"
        title="Résumé"
        description="A one-page summary of roles, education, and focus areas."
      />

      <section className="mt-12">
        {available ? (
          <div className="flex flex-wrap gap-2.5">
            <ButtonLink href={path} variant="primary" download>
              <Download aria-hidden />
              Download PDF
            </ButtonLink>
            <ButtonLink href={path} external>
              View in browser
            </ButtonLink>
          </div>
        ) : (
          /* Deliberate placeholder: better than linking a PDF that is not there. */
          <div className="rounded-lg border border-line-soft px-8 py-10">
            <p className="label">PDF not yet published</p>
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-ink-muted">
              The downloadable résumé is being finalised. The summary below is
              current, and the full record is on the experience page. For a copy
              in the meantime, email me and I will send one directly.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <ButtonLink href={`mailto:${siteConfig.email}`} variant="primary">
                <Mail aria-hidden />
                Request a copy
              </ButtonLink>
              <ButtonLink href="/experience">Full timeline</ButtonLink>
            </div>
          </div>
        )}
      </section>

      <section className="mt-14">
        <h2 className="label border-b border-line-soft pb-4">Roles</h2>
        <ul className="mt-2">
          {experience.map((role) => (
            <li
              key={role.slug}
              className="grid gap-x-6 gap-y-1 border-b border-line-soft py-4 sm:grid-cols-[1fr_auto]"
            >
              <div>
                <p className="text-sm font-medium">{role.company}</p>
                <p className="mt-0.5 text-sm text-ink-muted">{role.role}</p>
              </div>
              <p className="label sm:text-right">{role.period}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="label border-b border-line-soft pb-4">Education</h2>
        <ul className="mt-2">
          {education.map((item) => (
            <li
              key={item.school}
              className="grid gap-x-6 gap-y-1 border-b border-line-soft py-4 sm:grid-cols-[1fr_auto]"
            >
              <div>
                <p className="text-sm font-medium">{item.school}</p>
                <p className="mt-0.5 text-sm text-ink-muted">
                  {item.credential}
                </p>
              </div>
              <p className="label sm:text-right">{item.period}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
