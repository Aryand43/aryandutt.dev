import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "next-view-transitions";
import { ArrowLeft } from "lucide-react";

import { Mdx } from "@/components/mdx";
import { getAllPosts, getPostBySlug } from "@/lib/writing";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: "Note not found" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `${siteConfig.url}/writing/${post.slug}`,
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

export default async function NotePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 pb-16">
      <div className="pt-10">
        <Link
          href="/writing"
          className="label inline-flex items-center gap-1.5 transition-colors hover:text-accent"
        >
          <ArrowLeft aria-hidden className="size-3" />
          All writing
        </Link>
      </div>

      <article className="animate-rise">
        <header className="border-b border-line-soft pt-8 pb-9">
          <div className="flex flex-wrap items-baseline gap-x-4">
            <p className="label">{post.tags.join(" · ")}</p>
            <p className="label ml-auto">
              {formatDate(post.date)} · {post.readingTime} min read
            </p>
          </div>
          <h1 className="mt-5 text-balance text-display font-medium">
            {post.title}
          </h1>
          <p className="mt-5 text-pretty text-lead leading-relaxed text-ink-muted">
            {post.description}
          </p>
        </header>

        <Mdx source={post.content} />
      </article>

      <footer className="mt-14 border-t border-line-soft pt-8">
        <p className="text-sm text-ink-faint">
          Written by {siteConfig.name}. Questions or corrections:{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-ink-muted transition-colors hover:text-accent"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
