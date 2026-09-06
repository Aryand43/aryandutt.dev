import type { Metadata } from "next";

import { PageIntro } from "@/components/page-intro";
import { ProjectFilter } from "@/components/project-filter";
import { projectCategories, projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected engineering and research projects: low-latency market infrastructure, scientific machine learning, federated training, model compression, and quantitative systems.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-16">
      <PageIntro
        index="01"
        title="Work"
        description="Projects ordered by signal, not chronology. Each entry states the problem, the technical approach, and the outcome where one is documented."
      />
      <div className="mt-10">
        <ProjectFilter projects={projects} categories={projectCategories} />
      </div>
    </div>
  );
}
