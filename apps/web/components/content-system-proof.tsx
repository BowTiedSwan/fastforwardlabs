import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { trackProps } from "@/lib/analytics";

const pipeline = ["Source intake", "Research & triage", "Draft & review", "Publish & measure"];

export function ContentSystemProof({ detail = false }: { detail?: boolean }) {
  return (
    <section className="proof-panel grid gap-10 p-6 sm:p-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:p-12">
      <div className="flex flex-col items-start gap-6">
        <p className="eyebrow text-white/60">Built and run in our own business</p>
        <h2 className="section-heading text-white">The system behind<br />Nuclear News Network.</h2>
        <p className="max-w-xl text-base leading-8 text-white/70">Our own publication runs on an agent-powered pipeline with one editor. It connects source ingestion, research, drafting, and publishing with search metadata and structured data products.</p>
        <p className="max-w-xl text-sm leading-7 text-white/60">That includes reactor and industry trackers, plus JSON/CSV APIs. It’s a working example of the content systems we build.</p>
        {!detail ? <Link className="inline-flex min-h-11 items-center gap-3 border-b border-white/40 text-sm font-medium text-white transition-colors hover:text-orange-300" href="/services/ai-content-systems" {...trackProps("service", "home_proof", "ai-content-systems")}>Explore AI content systems <ArrowUpRight aria-hidden="true" className="size-4" /></Link> : <p className="text-sm leading-7 text-white/70">For a publisher, the opportunity is a connected editorial operation. For a B2B team, it’s a repeatable way to turn expertise into owned content. For an energy communicator, it’s a system built around complex, fast-moving sources.</p>}
      </div>
      <div className="border border-white/20 p-5 sm:p-7">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/20 pb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60"><span>Inside the workflow</span><span className="text-orange-300">NNN / 01</span></div>
        <ol>
          {pipeline.map((step, index) => <li key={step} className="flex items-center gap-5 border-b border-white/10 py-4"><span className="font-mono text-xs text-orange-300">0{index + 1}</span><span className="text-lg text-white/90">{step}</span></li>)}
        </ol>
        <p className="mt-6 font-mono text-[11px] uppercase leading-6 tracking-[0.16em] text-white/60">Human editorial judgment.<br />Connected production behind it.</p>
      </div>
    </section>
  );
}
