import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
  readingTime: number;
};

function parseFrontmatter(data: Record<string, unknown>): PostFrontmatter {
  const title = typeof data.title === "string" ? data.title : "Untitled";
  const description =
    typeof data.description === "string" ? data.description : "";
  const date =
    typeof data.date === "string"
      ? data.date
      : data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10);
  const tags = Array.isArray(data.tags)
    ? data.tags.filter((tag): tag is string => typeof tag === "string")
    : [];

  return { title, description, date, tags, draft: data.draft === true };
}

/** ~200 wpm, rounded up, minimum one minute. */
function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/u).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/u, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);

      return {
        ...parseFrontmatter(data),
        slug,
        content,
        readingTime: estimateReadingTime(content),
      } satisfies Post;
    })
    .filter((post) => !post.draft || process.env.NODE_ENV === "development");

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getPostTags(): string[] {
  return Array.from(new Set(getAllPosts().flatMap((post) => post.tags))).sort(
    (a, b) => a.localeCompare(b),
  );
}
