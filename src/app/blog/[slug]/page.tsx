import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "next-view-transitions";

import { Mdx } from "@/components/mdx";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${post.slug}`,
      authors: [siteConfig.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 pb-24">
      <div className="pt-12 pb-10">
        <Link
          href="/blog"
          className="font-mono text-xs text-subtle transition-colors hover:text-accent"
        >
          Back to blog
        </Link>
      </div>

      <article className="animate-rise">
        <header className="border-b border-line/80 pb-8">
          <h1 className="text-title text-balance font-medium">{post.title}</h1>
          <p className="mt-4 text-pretty text-lead leading-relaxed text-muted">
            {post.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-4 font-mono text-xs text-subtle">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingTime} min read</span>
          </div>
        </header>

        <Mdx source={post.content} />
      </article>

      <footer className="mt-16 border-t border-line/80 pt-8">
        <p className="text-sm text-subtle">
          Written by {siteConfig.name}. Questions or corrections:{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-muted transition-colors hover:text-accent"
          >
            email me
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
