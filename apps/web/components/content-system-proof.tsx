import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { trackProps } from "@/lib/analytics";
import { contentSystemResults } from "@/lib/content-system-results";

const { nuclear, deai, reviewedAt, reportingEnd, citationSource, citationPeriod, analyticsPeriod } = contentSystemResults;
const compact = (value: number) => `${(value / 1000).toFixed(1)}k`;
const number = (value: number) => value.toLocaleString("en-US");
const nuclearSearchImpressions = nuclear.googleImpressions + nuclear.bingImpressions;
const deaiSearchImpressions = deai.googleImpressions + deai.bingImpressions;
const maxDailyImpressions = Math.max(...nuclear.googlePeriods.map((period) => period.impressions / period.days));
const proofLink = "inline-flex min-h-11 items-center gap-3 border-b border-white/40 text-sm font-medium text-white transition-colors hover:text-orange-300 focus-visible:outline-orange-300";

export function ContentSystemProof({ detail = false }: { detail?: boolean }) {
  const placement = detail ? "service_proof" : "home_proof";

  return (
    <section id="content-results" aria-labelledby="content-results-heading" className="proof-panel p-6 sm:p-9 lg:p-12">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <p className="eyebrow">Built and proven in our own publications</p>
          <h2 id="content-results-heading" className="section-heading text-white">From launch to a source AI cites.<br /><span className="text-orange-300">In just over two months.</span></h2>
          <p className="max-w-xl text-base leading-8 text-white/80">You want to be found when people research your sector—and cited when AI answers their questions. That’s what we build content systems to achieve.</p>
          <p className="max-w-xl text-sm leading-7 text-white/70">We launched {nuclear.name} on {nuclear.launch}. By {reportingEnd}, our publication had earned {compact(nuclear.citations)} AI citations and {compact(nuclearSearchImpressions)} Google + Bing search impressions, with one editor running the operation.</p>
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            <a className={proofLink} href={nuclear.url} target="_blank" rel="noopener noreferrer" {...trackProps("publication", placement, "nuclear-news-network")}>Visit {nuclear.name} <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" /><span className="sr-only"> (opens in a new tab)</span></a>
            {!detail ? <Link className={proofLink} href="/services/ai-content-systems" {...trackProps("service", placement, "ai-content-systems")}>Explore AI content systems <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" /></Link> : null}
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
              <div><dt className="text-xs leading-5 text-white/65">AI citations / day<br />7-day average</dt><dd className="mt-2 text-3xl font-medium tracking-tight tabular-nums">{number(nuclear.dailyCitations)}</dd></div>
              <div><dt className="text-xs leading-5 text-white/65">Google + Bing impressions</dt><dd className="mt-2 text-3xl font-medium tracking-tight tabular-nums">{compact(nuclearSearchImpressions)}</dd></div>
            </dl>
          </div>
          <p className="mt-6 text-xs leading-5 text-white/65">AI citations: {citationSource}.<br />{compact(nuclear.googleImpressions)} Google + {compact(nuclear.bingImpressions)} Bing search impressions.<br />Daily average: {citationPeriod}.</p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 border-t border-white/20 pt-8 lg:mt-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow mb-3">A second sector. Early traction.</p>
          <h3 className="text-xl font-medium tracking-tight"><a href={deai.url} target="_blank" rel="noopener noreferrer" className={`${proofLink} text-xl`} {...trackProps("publication", placement, "deai")}>{deai.name} <ArrowUpRight aria-hidden="true" className="size-4" /><span className="sr-only"> (opens in a new tab)</span></a></h3>
          <p className="mt-2 max-w-lg text-sm leading-7 text-white/70">{deai.domain} · Launched {deai.launch}. A publication covering open models, private inference, and decentralized AI, with {number(deai.citations)} AI citations by {reportingEnd}.</p>
        </div>
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          <div><dt className="text-xs leading-5 text-white/65">Total AI citations</dt><dd className="mt-2 text-3xl font-medium tracking-tight text-orange-300 tabular-nums">{compact(deai.citations)}</dd></div>
          <div><dt className="text-xs leading-5 text-white/65">AI citations / day<br />7-day average</dt><dd className="mt-2 text-3xl font-medium tracking-tight tabular-nums">{number(deai.dailyCitations)}</dd></div>
          <div><dt className="text-xs leading-5 text-white/65">Google + Bing impressions</dt><dd className="mt-2 text-3xl font-medium tracking-tight tabular-nums">{compact(deaiSearchImpressions)}</dd></div>
        </dl>
      </div>

      {detail ? <div className="mt-10 grid gap-10 border-t border-white/20 pt-8 lg:grid-cols-2 lg:gap-16">
        <figure aria-labelledby="search-growth-caption" className="min-w-0">
          <figcaption id="search-growth-caption"><p className="eyebrow mb-3">Organic search / {nuclear.name}</p><h3 className="text-2xl font-medium tracking-tight">Search visibility is building, too.</h3><p className="mt-3 text-sm leading-7 text-white/70">Average daily Google impressions grew from {Math.round(nuclear.googlePeriods[0].impressions / nuclear.googlePeriods[0].days)} in July to {number(Math.round(nuclear.googlePeriods[2].impressions / nuclear.googlePeriods[2].days))} in September.</p></figcaption>
          <ol className="mt-6 space-y-5" aria-label="Average Google impressions per day by reporting period">
            {nuclear.googlePeriods.map((period) => {
              const average = period.impressions / period.days;
              return <li key={period.label}>
                <div className="mb-2 flex justify-between gap-4 text-sm"><span className="text-white/75">{period.label}</span><span className="font-mono tabular-nums">{number(Math.round(average))}<span className="sr-only"> impressions per day</span></span></div>
                <div aria-hidden="true" className="h-3 bg-white/10"><div className="h-full bg-orange-300" style={{ width: `${(average / maxDailyImpressions) * 100}%` }} /></div>
              </li>;
            })}
          </ol>
          <p className="mt-5 text-xs leading-6 text-white/65">Google Search Console · July 9–September 19, 2026.<br />{number(nuclear.googleImpressions)} impressions · {number(nuclear.googleClicks)} clicks. Bars use daily averages to compare periods of different lengths.</p>
        </figure>
        <div>
          <p className="eyebrow mb-3">Search visibility & reader traffic</p>
          <h3 className="text-2xl font-medium tracking-tight">From being found to being read.</h3>
          <p className="mt-4 text-sm leading-7 text-white/75">Bing Search Performance reports {number(nuclear.bingImpressions)} impressions and {number(nuclear.bingClicks)} clicks for {nuclear.domain} since launch. For {deai.domain}, Google and Bing report {number(deaiSearchImpressions)} impressions and {number(deai.googleClicks + deai.bingClicks)} clicks combined.</p>
          <dl className="mt-6 grid grid-cols-2 gap-6 border-t border-white/20 pt-6">
            {[nuclear, deai].map((publication) => <div key={publication.domain}><dt className="text-xs leading-5 text-white/65">{publication.name}<br />ChatGPT sessions</dt><dd className="mt-2 text-3xl font-medium tracking-tight text-orange-300 tabular-nums">{publication.chatgptSessions}</dd></div>)}
          </dl>
          <p className="mt-4 text-xs leading-6 text-white/65">Google Analytics · {analyticsPeriod}. Sessions attributed to chatgpt.com / ai-assistant. These are visits, separate from Bing’s AI citation counts.</p>
        </div>
      </div> : null}

      <details className="mt-8 border-t border-white/20 pt-2 text-xs leading-6 text-white/65">
        <summary className="cursor-pointer py-3 focus-visible:outline-orange-300">Sources & measurement · Snapshot reviewed {reviewedAt}</summary>
        <p>AI citations come from Bing Webmaster Tools’ AI Performance report for {citationSource}. The daily figures are rounded averages for {citationPeriod}: {number(nuclear.dailyCitations)} for {nuclear.name} and {number(deai.dailyCitations)} for {deai.name}. A citation is an appearance as a source in an AI answer, not a site visit.</p>
        <p className="mt-2">Search totals were checked through the Search Console MCP from each publication’s launch through {reportingEnd}. {nuclear.name}: {number(nuclear.googleImpressions)} Google + {number(nuclear.bingImpressions)} Bing = {number(nuclearSearchImpressions)} impressions. {deai.name}: {number(deai.googleImpressions)} Google + {number(deai.bingImpressions)} Bing = {number(deaiSearchImpressions)} impressions. Combined impressions count search appearances, not unique people. Recent search data can be revised as reporting completes.</p>
        <p className="mt-2">Google Analytics properties were matched by name: Nuclear News Network Site and DEAI.org. ChatGPT session figures cover {analyticsPeriod}. These are dated results from our publications, not a forecast for every sector.</p>
      </details>
    </section>
  );
}
