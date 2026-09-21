# Content systems: evidence behind the copy

Snapshot reviewed **September 21, 2026**. Shared data in
`content-system-results.ts` feeds `ContentSystemProof` on `/` and
`/services/ai-content-systems`. This results section was adapted from the existing
`feat/content-systems-results` version into main at the user's request.

## Publication identity

- **Nuclear News Network** — https://nuclearnewsnetwork.com/; launched July 9, 2026.
- **DeAI News** — https://deai.org/; launched August 29, 2026. Public site title:
  “DeAI News — open models, private inference & provider trackers.”
- Launch dates and one-editor operation are existing operator-provided facts.

## Search metrics — Search Console MCP

Queried Google properties with `analytics_query`, `engine: google`,
`dimensions: []`, and explicit inclusive launch-to-September-19 windows.
Queried Bing with **full property URLs**, `analytics_compare`, `engine: bing`,
`mode: period_over_period`. Only its `period1` absolute totals are used; the
automatically selected comparison periods have unequal lengths.

| Site | Window (2026) | Google impressions | Google clicks | Bing impressions | Bing clicks | Combined impressions |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| nuclearnewsnetwork.com | Jul 9–Sep 19 | 30,910 | 293 | 14,418 | 428 | 45,328 |
| deai.org | Aug 29–Sep 19 | 1,489 | 6 | 1,124 | 18 | 2,613 |

Google property IDs: `sc-domain:nuclearnewsnetwork.com`, `sc-domain:deai.org`.
Bing URLs: `https://nuclearnewsnetwork.com/`, `https://deai.org/`.
The user also confirmed NNN's dashboard values of **30.9k Google**, **14.4k Bing**,
and **10.2k AI citations**. The combined headline is **45.3k**, calculated from
the unrounded API counts. Impressions are appearances, not deduplicated visitors.

Do not use Bing `analytics_query` as a site-total report: it returned historical
query rows despite date/dimension/row-limit arguments. These were not summed.
Recent Google data may still be revised.

### Google-only growth chart

Checked using `analytics_query` with `dimensions: ["date"]` and `rowLimit: 100`.
Rows extend through September 19. Periods sum to 30,910 impressions.

| Period (2026) | Impressions | Calendar days | Rounded daily average |
| --- | ---: | ---: | ---: |
| Jul 9–31 | 1,251 | 23 | 54 |
| Aug 1–31 | 11,507 | 31 | 371 |
| Sep 1–19 | 18,152 | 19 | 955 |

## Official AI citations — connected Chrome, Bing AI Performance

The MCP does not expose official AI citation totals. After user-approved Chrome
connection, searched the website picker by full domains and inspected:

- https://www.bing.com/webmasters/aiperformance?siteUrl=https://nuclearnewsnetwork.com/
- https://www.bing.com/webmasters/aiperformance?siteUrl=https://deai.org/

Source label: **Microsoft Copilots and Partners**. The selected 3M report spans
June 21–September 20; the last available daily rows end **September 19**.
Exact totals were summed from the chart's accessible daily table, not the sampled
grounding-query table. They reconcile to the dashboard's 10.2K and 2.5K labels.

| Site | Exact citations | Display | Sep 13–19 daily citations | Daily average |
| --- | ---: | ---: | --- | ---: |
| Nuclear News Network | 10,222 | 10.2k | 281, 447, 426, 585, 561, 548, 204 | 436 |
| DeAI News | 2,467 | 2.5k | 131, 183, 260, 227, 285, 147, 137 | 196 (rounded from 195.7143) |

These replace approximate recent levels (~500/~100) with dated seven-day averages.
No ChatGPT-wide, Google AI, unique-reader, or conversion claim is inferred from
these citations. The previous September 14 #4 Bing spot-check is not presented
as a current rank in this refreshed section.

## Google Analytics — properties searched by name

The MCP's `analytics_advanced` returned “No GA4 accounts found. Run setup.”
Used the user-authorized connected Chrome session instead, without changing
account or measurement settings. Searched the GA4 universal picker by
**Nuclear News Network** and **DeAI**, then matched:

| Property name | Property ID | Account |
| --- | --- | --- |
| Nuclear News Network Site | 499945014 | Nuclear News Network |
| DEAI.org | 551676632 | Morpheus AI |

The Home “Sessions by Session source / medium” card, **Last 7 days**, covers
**September 14–20, 2026**. `chatgpt.com / ai-assistant` reports **22 sessions**
for Nuclear News Network and **10 sessions** for DeAI. These are attributed
visits, not citation counts or all AI-assistant traffic. Other Home cards use
different windows (e.g. NNN's AI Assistant channel card uses 28 days); do not mix
them into this seven-day comparison.

## Refresh procedure

1. Query both search properties using explicit inclusive dates; inspect daily
   Google rows to confirm coverage and recalculate chart periods.
2. Match Bing sites by full domain. Read AI Performance totals and daily rows;
   use a stated common seven-day window for averages.
3. Match GA4 properties by name and confirm each card's dates and attribution
   dimension. Never label sessions as citations.
4. Update the shared data and evidence notes together. Headline sums, chart
   labels, and formatted counts are derived from numeric data in the component.
