import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { trackProps } from "@/lib/analytics";
import { contentSystemResults } from "@/lib/content-system-results";

const { nuclear, deai, reviewedAt, reportingEnd, citationSource, citationPeriod } = contentSystemResults;
const compact = (value: number) => `${(value / 1000).toFixed(1)}k`;
const number = (value: number) => value.toLocaleString("en-US");
const nuclearSearchImpressions = nuclear.googleImpressions + nuclear.bingImpressions;
const deaiSearchImpressions = deai.googleImpressions + deai.bingImpressions;
const proofLink = "inline-flex min-h-11 items-center gap-3 border-b border-white/40 text-sm font-medium text-white transition-colors hover:text-orange-300 focus-visible:outline-orange-300";

export function ContentSystemProof() {
  const placement = "home_proof";

  return (
    <section id="content-results" aria-labelledby="content-results-heading" className="proof-panel p-6 sm:p-9 lg:p-12">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <p className="eyebrow">Built and proven in our own publications</p>
          <h2 id="content-results-heading" className="section-heading text-white">From launch to industry reference.<br /><span className="text-orange-300">In just over three months.</span></h2>
          <p className="max-w-xl text-base leading-8 text-white/80">You want to be found when people research your sector—and cited when AI answers their questions. That’s what we build content systems to achieve.</p>
          <p className="max-w-xl text-sm leading-7 text-white/70">We launched {nuclear.name} on {nuclear.launch}. By {reportingEnd}, our publication had earned {compact(nuclear.citations)} AI citations and {compact(nuclearSearchImpressions)} Google + Bing search impressions, with one editor running the operation. In Bing, it is the third organic result for “nuclear energy news”.</p>
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            <a className={proofLink} href={nuclear.url} target="_blank" rel="noopener noreferrer" {...trackProps("publication", placement, "nuclear-news-network")}>Visit {nuclear.name} <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" /><span className="sr-only"> (opens in a new tab)</span></a>
            <Link className={proofLink} href="/services/ai-content-systems" {...trackProps("service", placement, "ai-content-systems")}>Explore AI content systems <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" /></Link>
          </div>
        </div>

        <div className="flex flex-col border border-white/20 p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/65"><span>{nuclear.name}</span><span className="text-orange-300">Launch / Jul 09</span></div>
          <div className="flex-1">
            <dl className="py-7">
              <dt className="text-sm text-white/75">Total AI citations</dt>
              <dd className="mt-2 text-[clamp(4rem,8vw,7rem)] leading-none font-medium tracking-[-0.065em] text-orange-300 tabular-nums">{compact(nuclear.citations)}</dd>
            </dl>
            <dl className="grid grid-cols-2 gap-5 border-t border-white/20 pt-6">
              <div><dt className="text-xs leading-5 text-white/65">AI citations / day<br />{nuclear.dailyCitationsLabel}</dt><dd className="mt-2 text-3xl font-medium tracking-tight tabular-nums">{number(nuclear.dailyCitations)}</dd></div>
              <div><dt className="text-xs leading-5 text-white/65">Google + Bing impressions</dt><dd className="mt-2 text-3xl font-medium tracking-tight tabular-nums">{compact(nuclearSearchImpressions)}</dd></div>
            </dl>
          </div>
          <p className="mt-6 text-xs leading-5 text-white/65">AI citations: {citationSource}.<br />{compact(nuclear.googleImpressions)} Google + {compact(nuclear.bingImpressions)} Bing search impressions.<br />Plus {compact(nuclear.googleGenAiImpressions)} Google Generative AI impressions (3 months).<br />Daily average: {citationPeriod}.</p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 border-t border-white/20 pt-8 lg:mt-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow mb-3">A second sector. Early traction.</p>
          <h3 className="text-xl font-medium tracking-tight"><a href={deai.url} target="_blank" rel="noopener noreferrer" className={`${proofLink} text-xl`} {...trackProps("publication", placement, "deai")}>{deai.name} <ArrowUpRight aria-hidden="true" className="size-4" /><span className="sr-only"> (opens in a new tab)</span></a></h3>
          <p className="mt-2 max-w-lg text-sm leading-7 text-white/70">{deai.domain} · Launched {deai.launch}. A publication covering open models, private inference, and decentralized AI, with {compact(deai.citations)} AI citations by {reportingEnd}.</p>
        </div>
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          <div><dt className="text-xs leading-5 text-white/65">Total AI citations</dt><dd className="mt-2 text-3xl font-medium tracking-tight text-orange-300 tabular-nums">{compact(deai.citations)}</dd></div>
          <div><dt className="text-xs leading-5 text-white/65">AI citations / day<br />{deai.dailyCitationsLabel}</dt><dd className="mt-2 text-3xl font-medium tracking-tight tabular-nums">{number(deai.dailyCitations)}</dd></div>
          <div><dt className="text-xs leading-5 text-white/65">Google + Bing impressions</dt><dd className="mt-2 text-3xl font-medium tracking-tight tabular-nums">{compact(deaiSearchImpressions)}</dd></div>
        </dl>
      </div>

      <details className="mt-8 border-t border-white/20 pt-2 text-xs leading-6 text-white/65">
        <summary className="cursor-pointer py-3 focus-visible:outline-orange-300">Sources & measurement · Snapshot reviewed {reviewedAt}</summary>
        <p>AI citations come from Bing Webmaster Tools’ AI Performance report for {citationSource}. The daily figures are rounded averages: {number(nuclear.dailyCitations)} for {nuclear.name} for {citationPeriod} and {number(deai.dailyCitations)} for {deai.name} (six days, October 12–17, 2026). A citation is an appearance as a source in an AI answer, not a site visit. Total citations are dashboard values and may be rounded.</p>
        <p className="mt-2">Search totals were checked through the Search Console MCP from each publication’s launch through {reportingEnd}. {nuclear.name}: {number(nuclear.googleImpressions)} Google + {number(nuclear.bingImpressions)} Bing = {number(nuclearSearchImpressions)} impressions. {deai.name}: {number(deai.googleImpressions)} Google + {number(deai.bingImpressions)} Bing = {number(deaiSearchImpressions)} impressions. Google totals are counted through the latest settled data; recent search data can be revised as reporting completes. Combined impressions count search appearances, not unique people.</p>
      </details>
    </section>
  );
}
