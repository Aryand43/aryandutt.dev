import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { z } from "zod";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Frontmatter is validated at build time. A malformed post fails the build
 * with the offending file named, rather than rendering as "Untitled".
 */
const frontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.iso.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export type Post = Frontmatter & {
  slug: string;
  content: string;
  readingTime: number;
};

/** Roughly 200 words per minute, rounded up, floor of one minute. */
function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/u).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function readPost(file: string): Post {
  const slug = file.replace(/\.mdx$/u, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);

  const parsed = frontmatterSchema.safeParse({
    ...data,
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date,
  });

  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in content/blog/${file}:\n${z.prettifyError(parsed.error)}`,
    );
  }

  return {
    ...parsed.data,
    slug,
    content,
    readingTime: estimateReadingTime(content),
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(readPost)
    .filter((post) => !post.draft || process.env.NODE_ENV === "development")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
