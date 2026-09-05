"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

const ALL = "All";

export function ProjectGrid({
  projects,
  tags,
}: {
  projects: Project[];
  tags: string[];
}) {
  const [activeTag, setActiveTag] = React.useState<string>(ALL);
  const shouldReduceMotion = useReducedMotion();

  const filtered = React.useMemo(
    () =>
      activeTag === ALL
        ? projects
        : projects.filter((project) => project.tags.includes(activeTag)),
    [projects, activeTag],
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by tag"
        className="mb-8 flex flex-wrap gap-2"
      >
        {[ALL, ...tags].map((tag) => {
          const active = tag === activeTag;

          return (
            <button
              key={tag}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveTag(tag)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition-colors",
                active
                  ? "border-primary/50 bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 16, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.98 }
              }
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No projects tagged <Badge variant="outline">{activeTag}</Badge> yet.
        </p>
      ) : null}
    </div>
  );
}
