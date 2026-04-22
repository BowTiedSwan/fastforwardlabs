import Link from "next/link";

import { ArrowRight, Dot } from "lucide-react";

import { Button } from "@/components/ui/button";

const operatingPrinciples = [
  "Executive AI strategy without hype cycles or platform sprawl.",
  "GEO and AI-search visibility built into the content system from day one.",
  "Practical operating models that help leadership teams move from testing to execution.",
];

const offers = [
  {
    label: "AI strategy",
    title: "Executive operating models for AI adoption",
    description:
      "Map where AI should create leverage first, define decision rules, and align teams before tooling entropy compounds.",
  },
  {
    label: "GEO systems",
    title: "Search and answer-engine visibility for expert firms",
    description:
      "Build citable content, strategic topic coverage, and demand capture around executive-intent AI searches.",
  },
  {
    label: "Leadership enablement",
    title: "Positioning, messaging, and outreach tuned for C-suite buyers",
    description:
      "Unify the landing surface, thought leadership, paid search, and outreach around high-value executive demand.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-8 sm:px-6 sm:py-10 md:gap-20 md:px-10 md:py-14">
      <section className="grid gap-6 border border-line bg-panel p-5 backdrop-blur-sm sm:p-6 md:grid-cols-[1.6fr_0.9fr] md:gap-8 md:p-10">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-muted sm:text-xs sm:tracking-[0.28em]">
            <span>Fast Forward Labs</span>
            <Dot className="size-3" />
            <span>AI consulting systems</span>
          </div>

          <div className="max-w-4xl space-y-5 sm:space-y-6">
            <h1 className="max-w-4xl text-[clamp(2.75rem,12vw,7rem)] leading-[0.92] font-semibold tracking-[-0.06em] text-foreground sm:leading-[0.9]">
              Industrial-grade AI strategy for executive teams that need results.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8 md:text-xl">
              We help leadership teams move from AI curiosity to AI execution with
              sharper strategy, citable content systems, and market-facing demand
              capture built for 2026 search behavior.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/strategy">
                View strategy surface
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/blog">Read the research-driven blog</Link>
            </Button>
          </div>
        </div>

        <aside className="flex flex-col justify-between gap-6 border border-line bg-background/80 p-5 md:gap-8">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">
              Why this market now
            </p>
            <p className="text-sm leading-7 text-muted">
              Executive AI demand is accelerating, but most leadership teams still
              lack a system for implementation, ROI, and market visibility.
            </p>
          </div>

          <div className="space-y-4 border-t border-line pt-6">
            {operatingPrinciples.map((principle) => (
              <div key={principle} className="space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                  Signal
                </span>
                <p className="text-sm leading-7 text-foreground/78">{principle}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-5 sm:gap-6 md:grid-cols-3">
        {offers.map((offer) => (
          <article key={offer.title} className="flex flex-col gap-4 border border-line p-5 sm:gap-5 sm:p-6">
            <div className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
              {offer.label}
            </div>
            <h2 className="text-xl leading-tight font-semibold tracking-[-0.04em] sm:text-2xl">
              {offer.title}
            </h2>
            <p className="text-sm leading-7 text-muted">{offer.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 border-t border-line pt-8 sm:pt-10 md:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-muted">
            Built around the executive AI gap
          </p>
          <h2 className="text-3xl leading-tight font-semibold tracking-[-0.05em] sm:text-4xl">
            The problem is rarely access to AI tools. It is leadership alignment.
          </h2>
        </div>
        <div className="space-y-5 text-sm leading-7 text-muted sm:space-y-6 sm:text-base sm:leading-8">
          <p>
            Search demand has already shifted from “what is AI” to “how do we use
            AI in the business without creating internal chaos.” That changes what
            an AI consulting firm needs to ship: clearer executive education,
            sharper operating systems, and citable content built for both search
            engines and answer engines.
          </p>
          <p>
            Fast Forward Labs is structured to support that exact shift. This
            monorepo holds the landing surface, blog, strategy docs, and daily
            content generation workflows in one place so positioning and execution
            stay synchronized.
          </p>
        </div>
      </section>
    </div>
  );
}
