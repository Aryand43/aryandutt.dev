import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { PostCard } from "@/components/post-card";
import { Section } from "@/components/section";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on scientific machine learning, LLM safety, and building systems that have to be fast.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container">
      <PageHeader
        eyebrow="Blog"
        title="Writing."
        description="Notes on the research and systems work I spend my time on — scientific ML, LLM safety, and the engineering around both."
      />

      <Section
        title="All posts"
        eyebrow={`${posts.length} ${posts.length === 1 ? "post" : "posts"}`}
        className="pb-24"
      >
        {posts.length === 0 ? (
          <p className="text-muted-foreground">Nothing published yet — soon.</p>
        ) : (
          <div className="border-t border-border/70">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
