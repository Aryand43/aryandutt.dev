import type { MetadataRoute } from "next";

import { projects } from "@/lib/data/projects";
import { getAllPosts } from "@/lib/writing";
import { navItems, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: siteConfig.url, lastModified: now, changeFrequency: "monthly" as const, priority: 1 },
    ...navItems.map((item) => ({
      url: `${siteConfig.url}${item.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${siteConfig.url}/resume`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
    ...projects.map((project) => ({
      url: `${siteConfig.url}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...getAllPosts().map((post) => ({
      url: `${siteConfig.url}/writing/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
