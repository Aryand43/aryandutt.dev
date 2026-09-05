import type { Metadata } from "next";
import { Link } from "next-view-transitions";

import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on scientific machine learning, LLM safety, and building systems that have to be fast.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24">
      <PageIntro
        title="Blog"
        description="Notes on the research and systems work I spend my time on."
      />

      {posts.length === 0 ? (
        <p className="mt-12 text-muted">Nothing published yet.</p>
      ) : (
        <ul className="mt-12 divide-y divide-line/60">
          {posts.map((post) => (
            <li key={post.slug}>
              <Reveal>
                <Link href={`/blog/${post.slug}`} className="group block py-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="font-medium tracking-tight transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>
                    <time
                      dateTime={post.date}
                      className="shrink-0 font-mono text-xs text-subtle"
                    >
                      {formatDate(post.date)}
                    </time>
                  </div>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                    {post.description}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
