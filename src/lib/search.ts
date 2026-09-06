import { experience } from "@/lib/data/experience";
import { projects } from "@/lib/data/projects";
import { getAllPosts } from "@/lib/writing";
import { navItems } from "@/lib/site";

export type SearchEntry = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  group: "Pages" | "Work" | "Experience" | "Writing";
  keywords: string;
};

/**
 * Built on the server at build time and handed to the command palette as a
 * plain array, so the client never imports the content modules themselves.
 */
export function buildSearchIndex(): SearchEntry[] {
  const pages: SearchEntry[] = [
    { href: "/", label: "Home" },
    ...navItems.map((item) => ({ href: item.href, label: item.label })),
    { href: "/resume", label: "Résumé" },
  ].map((page) => ({
    id: `page:${page.href}`,
    title: page.label,
    subtitle: page.href,
    href: page.href,
    group: "Pages" as const,
    keywords: `${page.label} ${page.href}`,
  }));

  const work: SearchEntry[] = projects.map((project) => ({
    id: `work:${project.slug}`,
    title: project.title,
    subtitle: `${project.category} · ${project.period}`,
    href: `/work/${project.slug}`,
    group: "Work",
    keywords: `${project.title} ${project.thesis} ${project.stack.join(" ")} ${project.category}`,
  }));

  const roles: SearchEntry[] = experience.map((role) => ({
    id: `role:${role.slug}`,
    title: role.company,
    subtitle: `${role.role} · ${role.period}`,
    href: "/experience",
    group: "Experience",
    keywords: `${role.company} ${role.role} ${role.tags.join(" ")}`,
  }));

  const writing: SearchEntry[] = getAllPosts().map((post) => ({
    id: `post:${post.slug}`,
    title: post.title,
    subtitle: post.description,
    href: `/writing/${post.slug}`,
    group: "Writing",
    keywords: `${post.title} ${post.description} ${post.tags.join(" ")}`,
  }));

  return [...pages, ...work, ...roles, ...writing];
}
