import { ArrowUpRight, FileText, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/lib/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group flex h-full flex-col transition-colors duration-300 hover:border-primary/40">
      <CardHeader className="pb-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <p className="font-mono text-xs text-muted-foreground">
            {project.year}
          </p>
          {project.featured ? (
            <Badge className="font-mono text-[10px]">Featured</Badge>
          ) : null}
        </div>
        <CardTitle className="text-lg">{project.title}</CardTitle>
        <CardDescription className="text-pretty leading-relaxed">
          {project.blurb}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between gap-5">
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>

          {project.repo || project.demo || project.paper ? (
            <div className="flex flex-wrap items-center gap-4 border-t border-border/70 pt-4">
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Github className="size-3.5" />
                  Code
                </a>
              ) : null}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowUpRight className="size-3.5" />
                  Demo
                </a>
              ) : null}
              {project.paper ? (
                <a
                  href={project.paper}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <FileText className="size-3.5" />
                  Paper
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
