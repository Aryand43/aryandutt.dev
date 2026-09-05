import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Post } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group border-b border-border/70 py-8 first:pt-0">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime} min read</span>
          {post.draft ? (
            <Badge variant="outline" className="font-mono text-[10px]">
              Draft
            </Badge>
          ) : null}
        </div>

        <h2 className="mt-3 text-balance text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
          {post.title}
        </h2>

        <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          {post.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-primary">
          Read post
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </article>
  );
}
