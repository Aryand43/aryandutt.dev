"use client";

import * as React from "react";

import { ProjectCard } from "@/components/project-card";
import type { Project, ProjectCategory } from "@/lib/data/projects";

const ALL = "All" as const;
type Filter = typeof ALL | ProjectCategory;

export function ProjectFilter({
  projects,
  categories,
}: {
  projects: Project[];
  categories: ProjectCategory[];
}) {
  const [filter, setFilter] = React.useState<Filter>(ALL);

  const visible = React.useMemo(
    () =>
      filter === ALL
        ? projects
        : projects.filter((project) => project.category === filter),
    [projects, filter],
  );

  const options: Filter[] = [ALL, ...categories];

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2 border-b border-line-soft pb-6"
      >
        {options.map((option) => {
          const active = option === filter;

          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(option)}
              className={`label rounded-lg border px-3 py-1.5 transition-colors ${
                active
                  ? "border-accent/50 bg-accent/10 text-accent"
                  : "border-line-soft text-ink-faint hover:border-line hover:text-ink"
              }`}
            >
              {option}
            </button>
          );
        })}
        <p
          aria-live="polite"
          className="label ml-auto self-center text-ink-faint"
        >
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-sm text-ink-faint">
          Nothing tagged {filter} yet.
        </p>
      ) : (
        <div>
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
