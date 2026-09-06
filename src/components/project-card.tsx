import { Link } from "next-view-transitions";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/lib/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block border-b border-line-soft px-1 py-7 transition-colors hover:bg-raise/40"
    >
      {/* Accent marker slides in on hover and on keyboard focus. */}
      <span
        aria-hidden
        className="absolute left-0 top-7 h-0 w-px bg-accent transition-all duration-300 group-hover:h-[calc(100%-3.5rem)] group-focus-visible:h-[calc(100%-3.5rem)]"
      />

      <div className="pl-4">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className="label">{project.category}</p>
          <p className="label ml-auto">{project.period}</p>
        </div>

        <h3 className="mt-3 flex items-start gap-2 text-title font-medium text-ink">
          <span className="text-balance">{project.title}</span>
          <ArrowUpRight
            aria-hidden
            className="mt-1.5 size-4 shrink-0 text-ink-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </h3>

        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-ink-muted">
          {project.thesis}
        </p>

        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
          {project.stack.map((item) => (
            <li key={item} className="label text-ink-faint">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
