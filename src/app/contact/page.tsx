import type { Metadata } from "next";
import { Mail } from "lucide-react";

import { CopyEmail } from "@/components/copy-email";
import { PageIntro } from "@/components/page-intro";
import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact Aryan Dutt at ${siteConfig.email} or on LinkedIn. Open to research collaborations, internships, and quantitative engineering problems.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-16">
      <PageIntro
        index="05"
        title="Contact"
      />

      <div className="mt-12 grid gap-px border border-line-soft bg-line-soft sm:grid-cols-2">
        <section className="bg-base p-8">
          <h2 className="label">Email</h2>
          <p className="mt-4 break-all font-mono text-sm text-accent">
            {siteConfig.email}
          </p>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-muted">
            Best for anything substantive. Include context and I will reply
            properly rather than quickly.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <ButtonLink href={`mailto:${siteConfig.email}`} variant="primary">
              <Mail aria-hidden />
              Send email
            </ButtonLink>
            <CopyEmail email={siteConfig.email} />
          </div>
        </section>

        <section className="bg-base p-8">
          <h2 className="label">LinkedIn</h2>
          <p className="mt-4 break-all font-mono text-sm text-accent">
            linkedin.com/in/aryan-dutt-
          </p>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-muted">
            Professional introductions, role enquiries, and the full record of
            certifications and recommendations.
          </p>
          <div className="mt-6">
            <ButtonLink href={siteConfig.links.linkedin} external>
              Open profile
            </ButtonLink>
          </div>
        </section>
      </div>

      <dl className="mt-10 grid gap-px border border-line-soft bg-line-soft sm:grid-cols-3">
        <div className="bg-base p-6">
          <dt className="label">Based in</dt>
          <dd className="mt-2 text-sm">{siteConfig.location}, SGT (UTC+8)</dd>
        </div>
        <div className="bg-base p-6">
          <dt className="label">Coordinates</dt>
          <dd className="mt-2 font-mono text-sm text-ink-muted">
            {siteConfig.coordinates}
          </dd>
        </div>
        <div className="bg-base p-6">
          <dt className="label">Status</dt>
          <dd className="mt-2 text-sm">
            Available for research and engineering opportunities
          </dd>
        </div>
      </dl>
    </div>
  );
}
