import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { Section } from "@/components/section";
import { Timeline } from "@/components/timeline";
import { experience } from "@/lib/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Research and engineering roles across NTU, MIT Julia Lab, InterSystems, YC-backed startups, and Singapore's Ministry of Home Affairs.",
};

export default function ExperiencePage() {
  const research = experience.filter((item) => item.kind === "research");
  const engineering = experience.filter((item) => item.kind === "engineering");

  return (
    <div className="container">
      <PageHeader
        eyebrow="Experience"
        title="Ten roles, from research labs to production systems."
        description={`${research.length} research positions and ${engineering.length} engineering roles across Singapore, Cambridge, and London — plus two years of National Service.`}
      />

      <Section
        title="Timeline"
        eyebrow="2022 – present"
        description="Reverse chronological."
        className="pb-24"
      >
        <Timeline items={experience} />
      </Section>
    </div>
  );
}
