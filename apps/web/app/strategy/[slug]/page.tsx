import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { getStrategyDocument, getStrategyDocuments } from "@fastforwardlabs/content";

import { mdxComponents } from "@/components/mdx-components";

type StrategyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const documents = await getStrategyDocuments();

  return documents.map((document) => ({ slug: document.slug }));
}

export async function generateMetadata(
  props: StrategyPageProps,
): Promise<Metadata> {
  const { slug } = await props.params;
  const document = await getStrategyDocument(slug);

  if (!document) {
    return {};
  }

  return {
    title: document.title,
    description: document.description,
  };
}

export default async function StrategyDocumentPage(props: StrategyPageProps) {
  const { slug } = await props.params;
  const document = await getStrategyDocument(slug);

  if (!document) {
    notFound();
  }

  return (
    <article className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12 md:gap-10 md:px-10 md:py-16">
      <header className="space-y-4 border-b border-line pb-8 sm:space-y-5">
        <div className="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted">
          <span>{document.publishedAt}</span>
          <span>{document.readingTime}</span>
        </div>
        <h1 className="text-[clamp(2.1rem,10vw,4.5rem)] leading-[0.96] font-semibold tracking-[-0.06em] sm:leading-[0.94]">
          {document.title}
        </h1>
        <p className="max-w-3xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {document.description}
        </p>
      </header>

      <div className="prose-shell">
        <MDXRemote
          source={document.body}
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
