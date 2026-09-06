import type { Metadata } from "next";
import { Link } from "next-view-transitions";

import { PageIntro } from "@/components/page-intro";
import { getAllPosts } from "@/lib/writing";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Research notes on scientific machine learning, LLM safety evaluation, anomaly detection, and quantitative systems.",
  alternates: { canonical: "/writing" },
};

const TOPICS = [
  "Scientific machine learning",
  "LLM safety evaluation",
  "Anomaly detection",
  "Quantitative systems",
];

export default function WritingPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="mx-auto max-w-5xl px-6 pb-16">
      <PageIntro
        index="04"
        title="Writing"
        description="Research notes on the systems and problems I spend my time inside."
      />

      {posts.length === 0 ? (
        <section className="mt-14 border border-line-soft rounded-lg px-8 py-14">
          <p className="label">Nothing published yet</p>
          <p className="mt-5 max-w-xl text-pretty text-lead leading-relaxed text-ink-muted">
            Notes are in progress. Planned coverage:
          </p>
          <ul className="mt-6 grid gap-x-10 gap-y-2 sm:grid-cols-2">
            {TOPICS.map((topic) => (
              <li
                key={topic}
                className="flex items-baseline gap-3 border-b border-line-soft py-2.5"
              >
                <span aria-hidden className="size-1 rounded-full bg-accent" />
                <span className="text-sm text-ink-muted">{topic}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <div className="mt-10">
          {featured ? (
            <article className="reveal border-b border-line-soft py-8">
              <div className="flex flex-wrap items-baseline gap-x-4">
                <p className="label text-accent">Featured</p>
                <p className="label ml-auto">
                  {formatDate(featured.date)} · {featured.readingTime} min read
                </p>
              </div>
              <h2 className="mt-4 max-w-2xl text-balance text-display font-medium">
                <Link
                  href={`/writing/${featured.slug}`}
                  className="transition-colors hover:text-accent"
                >
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-4 max-w-2xl text-pretty text-lead leading-relaxed text-ink-muted">
                {featured.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
                {featured.tags.map((tag) => (
                  <li key={tag} className="label">
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ) : null}

          {rest.map((post) => (
            <article
              key={post.slug}
              className="reveal border-b border-line-soft py-7"
            >
              <div className="flex flex-wrap items-baseline gap-x-4">
                <p className="label">{post.tags.join(" · ")}</p>
                <p className="label ml-auto">
                  {formatDate(post.date)} · {post.readingTime} min read
                </p>
              </div>
              <h2 className="mt-3 max-w-2xl text-balance text-title font-medium">
                <Link
                  href={`/writing/${post.slug}`}
                  className="transition-colors hover:text-accent"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-ink-muted">
                {post.description}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
