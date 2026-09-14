import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { trackProps } from "@/lib/analytics";
import { contentSystemResults } from "@/lib/content-system-results";

const { nuclear, deai, reviewedAt, citationSource } = contentSystemResults;
const maxDailyImpressions = Math.max(...nuclear.googlePeriods.map((period) => period.impressions / period.days));
const proofLink = "inline-flex min-h-11 items-center gap-3 border-b border-white/40 text-sm font-medium text-white transition-colors hover:text-orange-300 focus-visible:outline-orange-300";

export function ContentSystemProof({ detail = false }: { detail?: boolean }) {
  const placement = detail ? "service_proof" : "home_proof";

  return (
    <section id="content-results" aria-labelledby="content-results-heading" className="proof-panel p-6 sm:p-9 lg:p-12">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <p className="eyebrow">Built and proven in our own publications</p>
          <h2 id="content-results-heading" className="section-heading text-white">From launch to a source AI cites.<br /><span className="text-orange-300">In two months.</span></h2>
          <p className="max-w-xl text-base leading-8 text-white/80">You want to be found when people research your sector—and cited when AI answers their questions. That’s what we build content systems to achieve.</p>
          <p className="max-w-xl text-sm leading-7 text-white/70">We launched Nuclear News Network on {nuclear.launch}. By mid-September, our publication had earned {nuclear.citations} AI citations and {nuclear.googleImpressions} Google search impressions, with one editor running the operation.</p>
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            <a className={proofLink} href={nuclear.url} target="_blank" rel="noopener noreferrer" {...trackProps("publication", placement, "nuclear-news-network")}>Visit Nuclear News Network <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" /><span className="sr-only"> (opens in a new tab)</span></a>
            {!detail ? <Link className={proofLink} href="/services/ai-content-systems" {...trackProps("service", placement, "ai-content-systems")}>See what we can build for you <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" /></Link> : null}
          </div>
        </div>

        <div className="flex flex-col border border-white/20 p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/65"><span>Nuclear News Network</span><span className="text-orange-300">Launch / Jul 09</span></div>
          <div className="flex-1">
            <dl className="py-7">
              <dt className="text-sm text-white/75">Recent daily AI citations</dt>
              <dd className="mt-2 text-[clamp(4rem,8vw,7rem)] leading-none font-medium tracking-[-0.065em] text-orange-300 tabular-nums">{nuclear.recentDailyCitations}</dd>
            </dl>
            <dl className="grid grid-cols-2 gap-5 border-t border-white/20 pt-6">
              <div><dt className="text-xs leading-5 text-white/65">Total AI citations</dt><dd className="mt-2 text-3xl font-medium tracking-tight tabular-nums">{nuclear.citations}</dd></div>
              <div><dt className="text-xs leading-5 text-white/65">Google impressions</dt><dd className="mt-2 text-3xl font-medium tracking-tight tabular-nums">{nuclear.googleImpressions}</dd></div>
            </dl>
          </div>
          <p className="mt-6 text-xs leading-5 text-white/65">AI citations: Microsoft Copilots and Partners.<br />Search impressions: Google Search Console.</p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 border-t border-white/20 pt-8 sm:grid-cols-[1fr_auto] sm:items-center lg:mt-12">
        <div>
          <p className="eyebrow mb-3">A second sector. Early traction.</p>
          <h3 className="text-xl font-medium tracking-tight"><a href={deai.url} target="_blank" rel="noopener noreferrer" className={`${proofLink} text-xl`} {...trackProps("publication", placement, "deai")}>{deai.name} <ArrowUpRight aria-hidden="true" className="size-4" /><span className="sr-only"> (opens in a new tab)</span></a></h3>
          <p className="mt-2 max-w-lg text-sm leading-7 text-white/70">Launched {deai.launch}. A publication covering decentralized AI, earning AI citations in its first two weeks.</p>
        </div>
        <dl className="grid grid-cols-2 gap-8 sm:gap-10">
          <div><dt className="text-xs leading-5 text-white/65">Total AI citations</dt><dd className="mt-2 text-4xl font-medium tracking-tight text-orange-300 tabular-nums">{deai.citations}</dd></div>
          <div><dt className="text-xs leading-5 text-white/65">Recent citations / day</dt><dd className="mt-2 text-4xl font-medium tracking-tight tabular-nums">{deai.recentDailyCitations}</dd></div>
        </dl>
      </div>

      {detail ? <div className="mt-10 grid gap-10 border-t border-white/20 pt-8 lg:grid-cols-2 lg:gap-16">
        <figure aria-labelledby="search-growth-caption" className="min-w-0">
          <figcaption id="search-growth-caption"><p className="eyebrow mb-3">Organic search / Nuclear News Network</p><h3 className="text-2xl font-medium tracking-tight">Search visibility is building, too.</h3><p className="mt-3 text-sm leading-7 text-white/70">Average daily Google impressions grew from 54 in July to 1,046 in September.</p></figcaption>
          <ol className="mt-6 space-y-5" aria-label="Average Google impressions per day by reporting period">
            {nuclear.googlePeriods.map((period) => {
              const average = period.impressions / period.days;
              return <li key={period.label}>
                <div className="mb-2 flex justify-between gap-4 text-sm"><span className="text-white/75">{period.label}</span><span className="font-mono tabular-nums">{Math.round(average).toLocaleString("en-US")}<span className="sr-only"> impressions per day</span></span></div>
                <div aria-hidden="true" className="h-3 bg-white/10"><div className="h-full bg-orange-300" style={{ width: `${(average / maxDailyImpressions) * 100}%` }} /></div>
              </li>;
            })}
          </ol>
          <p className="mt-5 text-xs leading-6 text-white/65">Google Search Console · July 9–September 12, 2026.<br />25,311 impressions · {nuclear.googleClicks} clicks. Bars use daily averages to compare periods of different lengths.</p>
        </figure>
        <div>
          <p className="eyebrow mb-3">Getting found in a competitive sector</p>
          <h3 className="text-2xl font-medium tracking-tight">Page-one presence for “nuclear news.”</h3>
          <p className="mt-4 text-sm leading-7 text-white/75">By mid-September, Nuclear News Network had reached #4 in a Bing spot-check for “nuclear news”—putting a new publication on the first page for its core industry search.</p>
          <p className="mt-3 text-sm leading-7 text-white/75">The Bing Search Performance dashboard also reports {nuclear.bingImpressions} impressions and {nuclear.bingClicks} clicks since launch.</p>
          <details className="mt-6 border-t border-white/20 pt-2">
            <summary className="cursor-pointer py-4 text-sm font-medium text-white/90 focus-visible:outline-orange-300">How does that compare with broader SEO research?</summary>
            <p className="text-sm leading-7 text-white/70">Ahrefs found that just 6.11% of new, non-empty English-language pages in its study reached Google’s top 10 within a year. Among top-10 pages in a separate sample, 72.9% were over three years old.</p>
            <p className="mt-3 text-xs leading-6 text-white/65">Ahrefs studied Google pages broadly, not new publications, Bing rankings, or AI citations. These figures provide wider search context, rather than a like-for-like launch benchmark.</p>
            <a href="https://ahrefs.com/blog/how-long-does-it-take-to-rank/" target="_blank" rel="noopener noreferrer" className={`${proofLink} mt-3`}>Read the Ahrefs ranking study <ArrowUpRight aria-hidden="true" className="size-4" /><span className="sr-only"> (opens in a new tab)</span></a>
          </details>
        </div>
      </div> : null}

      <details className="mt-8 border-t border-white/20 pt-2 text-xs leading-6 text-white/65">
        <summary className="cursor-pointer py-3 focus-visible:outline-orange-300">Sources & measurement · Snapshot reviewed {reviewedAt}</summary>
        <p>AI totals come from {citationSource} dashboard snapshots. Daily citation figures are approximate recent levels, not averages over the whole period. A citation is an appearance as a source in an AI answer, not a site visit.</p>
        <p className="mt-2">Google figures were checked through the Search Console API and cover July 9–September 12, 2026; reporting lags the review date. Bing search totals come from its Search Performance dashboard. The #4 Bing result is an operator-reported spot-check; the API average is #6 for the reporting period dated September 11. Rankings vary by date and location. These are results from our publications, not a forecast for every sector.</p>
      </details>
    </section>
  );
}
