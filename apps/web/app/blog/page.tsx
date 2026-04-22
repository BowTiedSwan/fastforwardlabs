import type { Metadata } from "next";
import Link from "next/link";

import { getBlogPosts } from "@fastforwardlabs/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Research-driven writing on executive AI strategy, GEO, and AI market execution.",
};

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12 md:gap-10 md:px-10 md:py-16">
      <header className="space-y-4 border-b border-line pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">
          Blog
        </p>
        <h1 className="text-4xl leading-[0.95] font-semibold tracking-[-0.05em] sm:text-5xl sm:leading-none">
          Research-backed writing for AI-focused executive demand.
        </h1>
      </header>

      <div className="grid gap-6">
        {posts.map((post) => (
          <article key={post.slug} className="grid gap-4 border border-line p-5 sm:p-6 md:grid-cols-[180px_1fr]">
            <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.2em] text-muted md:block md:space-y-1">
              <p>{post.publishedAt}</p>
              <p>{post.readingTime}</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl leading-tight font-semibold tracking-[-0.04em] sm:text-2xl">
                <Link href={post.href}>{post.title}</Link>
              </h2>
              <p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">{post.description}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="border border-line px-2 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
