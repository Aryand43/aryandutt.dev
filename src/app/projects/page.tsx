import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { ProjectGrid } from "@/components/project-grid";
import { Section } from "@/components/section";
import { projects, projectTags } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects by Aryan Dutt — LLM safety evaluation, scientific ML in Julia, transaction anomaly detection, IoT telemetry, and data pipelines.",
};

export default function ProjectsPage() {
  return (
    <div className="container">
      <PageHeader
        eyebrow="Projects"
        title="Things I've built and researched."
        description="Research systems, ML pipelines, and the tooling around them. Filter by the stack or the problem domain."
      />

      <Section
        title="All projects"
        eyebrow={`${projects.length} entries`}
        className="pb-24"
      >
        <ProjectGrid projects={projects} tags={projectTags} />
      </Section>
    </div>
  );
}
