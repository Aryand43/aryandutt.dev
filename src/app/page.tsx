import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Hero } from "@/components/hero";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAllPosts } from "@/lib/blog";
import { experience } from "@/lib/data/experience";
import { highlights } from "@/lib/data/profile";
import { projects } from "@/lib/data/projects";

export default function HomePage() {
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 4);
  const recentRoles = experience.slice(0, 4);
  const recentPosts = getAllPosts().slice(0, 2);

  return (
    <>
      <Hero />

      <div className="container">
        <Section
          eyebrow="Highlights"
          title="Where the work has happened"
          description="Research labs, YC-backed startups, and enterprise data platforms — across Singapore, Cambridge, and London."
        >
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((highlight) => (
              <StaggerItem key={highlight.label}>
                <Card className="h-full transition-colors duration-300 hover:border-primary/40">
                  <CardContent className="p-6">
                    <p className="font-mono text-2xl font-semibold tracking-tight text-primary">
                      {highlight.value}
                    </p>
                    <p className="mt-2 text-sm font-medium">{highlight.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {highlight.detail}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        <Section
          eyebrow="Recent roles"
          title="Most recent experience"
          description="A snapshot of the last four positions. The full timeline goes back to 2022."
        >
          <Stagger as="ul" className="divide-y divide-border/70 border-y border-border/70">
            {recentRoles.map((role) => (
              <StaggerItem as="li" key={role.slug}>
                <Link
                  href="/experience"
                  className="group flex flex-col gap-1 py-5 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <div>
                    <p className="font-medium transition-colors group-hover:text-primary">
                      {role.company}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {role.role}
                    </p>
                  </div>
                  <p className="shrink-0 font-mono text-xs text-muted-foreground">
                    {role.period}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-8">
            <Button asChild variant="outline">
              <Link href="/experience">
                Full timeline
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </Section>

        <Section
          eyebrow="Selected work"
          title="Featured projects"
          description="Research systems, ML pipelines, and the tooling built around them."
        >
          <Stagger className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-8">
            <Button asChild variant="outline">
              <Link href="/projects">
                All projects
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </Section>

        {recentPosts.length > 0 ? (
          <Section
            eyebrow="Writing"
            title="From the blog"
            description="Notes on the research and systems work I spend my time on."
          >
            <div className="border-t border-border/70 pt-8">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            <Reveal delay={0.1} className="mt-8">
              <Button asChild variant="outline">
                <Link href="/blog">
                  All posts
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Reveal>
          </Section>
        ) : null}

        <Section
          eyebrow="Contact"
          title="Let's talk"
          description="I'm open to research collaborations, internships, and interesting problems in ML and systems."
          className="border-t border-border/70"
        >
          <Reveal>
            <Button asChild size="lg">
              <Link href="/contact">
                Get in touch
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </Section>
      </div>
    </>
  );
}
