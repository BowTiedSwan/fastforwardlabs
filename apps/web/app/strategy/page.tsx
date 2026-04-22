import type { Metadata } from "next";
import Link from "next/link";

import { getStrategyDocuments } from "@fastforwardlabs/content";

export const metadata: Metadata = {
  title: "Strategy",
  description:
    "Strategy documents for paid search, executive outreach, and AI-market positioning.",
};

export default async function StrategyIndexPage() {
  const documents = await getStrategyDocuments();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12 md:gap-10 md:px-10 md:py-16">
      <header className="space-y-4 border-b border-line pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">
          Strategy
        </p>
        <h1 className="text-4xl leading-[0.95] font-semibold tracking-[-0.05em] sm:text-5xl sm:leading-none">
          Paid search and outreach strategy, stored in the same delivery system.
        </h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {documents.map((document) => (
          <article key={document.slug} className="flex h-full flex-col gap-4 border border-line p-5 sm:p-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {document.publishedAt}
            </p>
            <h2 className="text-xl leading-tight font-semibold tracking-[-0.04em] sm:text-2xl">
              <Link href={document.href}>{document.title}</Link>
            </h2>
            <p className="text-sm leading-7 text-muted sm:text-base sm:leading-8">{document.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
