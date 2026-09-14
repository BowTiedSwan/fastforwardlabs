# Content systems: evidence behind the copy

Snapshot reviewed **September 14, 2026**. These are dated results from Fast Forward
Labs' own publications, not live counters or client guarantees. Display values are
in `content-system-results.ts`; the shared `ContentSystemProof` renders on the
homepage and the AI Content Systems service page.

## Launch dates and publication links

Provided by the publication operator:

- Nuclear News Network: July 9, 2026; https://nuclearnewsnetwork.com/
- DeAI.org: August 29, 2026; https://deai.org/

## Google Search Console — checked via the search-console MCP

Used `analytics_query` with `engine: google`, first with `dimensions: ["date"]`,
then with `dimensions: []` for property totals. Requested through September 14;
the latest available daily rows ended September 12. The totals below use that
same endpoint date explicitly.

| Property | Inclusive window | Impressions | Clicks | Average position |
| --- | --- | ---: | ---: | ---: |
| `sc-domain:nuclearnewsnetwork.com` | July 9–September 12, 2026 | 25,311 | 238 | 19.1399 |
| `sc-domain:deai.org` | August 29–September 12, 2026 | 971 | 1 | 42.4871 |

NNN's chart uses calendar-day averages, not raw totals for unequal periods:

| Period | Impressions | Days | Displayed daily average |
| --- | ---: | ---: | ---: |
| July 9–31 | 1,251 | 23 | 54 |
| August 1–31 | 11,507 | 31 | 371 |
| September 1–12 | 12,553 | 12 | 1,046 |

The three impression totals sum to **25,311** over **66 days**. Bar widths use
unrounded daily averages relative to the largest average; labels round to whole
impressions. There are no estimated daily data points or simulated trend lines.

## Bing search — dashboard totals and API query evidence

- User-supplied NNN Search Performance screenshot (3M, All): **350 clicks**,
  **11.3k impressions**, **3.1% CTR**. These are rounded dashboard totals, not
  totals reconstructed from query rows.
- Queried `https://nuclearnewsnetwork.com/` and `https://deai.org/` using the MCP
  with `engine: bing` over their launch windows. Despite requesting a date
  dimension, the tool returned query-level records, not daily site aggregates.
  Do not sum these records and call them whole-site totals.
- NNN's latest `nuclear news` record: `Date: /Date(1789084800000)/`
  (September 11, 2026), `AvgImpressionPosition: 6`, `Impressions: 147`,
  `Clicks: 3`. Earlier records also show page-one positions (including 8).
- **#4 for “nuclear news”** is the operator's September 14 reported Bing
  spot-check, not an independently reproduced result or the API average.
  The page explicitly distinguishes the spot-check from the #6 period average.

## AI citations — user-supplied Bing AI Performance screenshots

The dashboard names its source **Microsoft Copilots and Partners**.

| Publication | Dashboard total | Approximate recent daily level |
| --- | ---: | ---: |
| Nuclear News Network | 7.2k | ~500 |
| DeAI.org | 1.1k (operator reports over 1.1k) | ~100 |

Totals are rounded screenshot values. Daily figures are the operator's recent
observations, supported directionally by the graphs; they are **not** calculated
averages over the entire launch window. The exact screenshot export date and
averaging window were not supplied. Use “by mid-September,” “recent,” and the
review date, rather than claiming a precise end date or a 7-day average.

The connected MCP exposes search analytics and heuristic conversational-query
insights, **not these official AI Performance citation totals**. We did not use
heuristic search queries as a proxy for citations. Citations, cited pages,
impressions, and clicks are different measures; do not combine them into reach,
visitors, leads, or revenue. No ChatGPT-wide or Google AI citation claim is made.

## Industry context

Read September 14, 2026:
https://ahrefs.com/blog/how-long-does-it-take-to-rank/

- In a sample of 2M new URLs with non-empty English content, **6.11%** reached
  Google's top 10 within one year.
- In a separate sample of 1.3M US keywords, **72.9%** of top-10 pages were more
  than three years old.
- The article also reports 1.74% for a different, unfiltered 1M-URL sample. We
  use the more relevant English-content sample, not the smaller headline rate.
- Of the pages that did rank, 40.82% did so within one month: the research does
  not establish a mandatory waiting period or prove these sites rank faster
  than all others.

This is broad Google page-level research, not a new-news-site cohort, a Bing
benchmark, or a GEO citation benchmark. No defensible apples-to-apples time-to-
rank or AI-citation percentile was established. The page presents the study as
context in an expandable note, rather than claiming a performance multiplier.

## Updating the snapshot

1. Re-query both Google properties with explicit dates and retain the last
   available reporting date. Recalculate chart totals and day counts.
2. Get new Bing Search and AI Performance exports/screenshots from the operator.
   Specify a daily averaging window if reporting an actual average.
3. Update the shared data, captions, date/source notes, and FAQ together.
4. Keep ranking spot-checks separate from period averages. Update or remove old
   ranking claims when their supporting evidence changes.
