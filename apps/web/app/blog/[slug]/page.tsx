import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { getBlogPost, getBlogPosts } from "@fastforwardlabs/content";

import { mdxComponents } from "@/components/mdx-components";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: BlogPageProps,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage(props: BlogPageProps) {
  const { slug } = await props.params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12 md:gap-10 md:px-10 md:py-16">
      <header className="space-y-4 border-b border-line pb-8 sm:space-y-5">
        <div className="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted">
          <span>{post.publishedAt}</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="text-[clamp(2.2rem,11vw,5rem)] leading-[0.95] font-semibold tracking-[-0.06em] sm:leading-[0.92]">
          {post.title}
        </h1>
        <p className="max-w-3xl text-base leading-7 text-muted sm:text-lg sm:leading-8">{post.description}</p>
      </header>

      <div className="prose-shell">
        <MDXRemote
          source={post.body}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>
    </article>
  );
}
