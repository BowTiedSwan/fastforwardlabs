# Content systems: evidence behind the copy

Snapshot reviewed **October 20, 2026**. Shared data in
`content-system-results.ts` feeds `ContentSystemProof` on `/` and
`/services/ai-content-systems`.

## Publication identity

- **Nuclear News Network** — https://nuclearnewsnetwork.com/; launched July 9, 2026.
- **DeAI News** — https://deai.org/; launched August 29, 2026. Public site title:
  “DeAI News — open models, private inference & provider trackers.”
- Launch dates and one-editor operation are existing operator-provided facts.

## Search metrics — Search Console MCP

Queried Google properties with `analytics_query`, `engine: google`,
`dimensions: []`, and explicit inclusive launch-to-reporting-end windows.
Queried Bing with **full property URLs**, `analytics_compare`, `engine: bing`,
`mode: period_over_period`. Only its `period1` absolute totals are used; the
automatically selected comparison periods have unequal lengths.

| Site | Window (2026) | Google impressions | Google clicks | Bing impressions | Bing clicks | Combined impressions |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| nuclearnewsnetwork.com | Jul 9–Oct 17 | 47,353 | 580 | 32,855 | 1,105 | 80,208 |
| deai.org | Aug 29–Oct 18 | 4,365 | 22 | 6,184 | 94 | 10,549 |

Google property IDs: `sc-domain:nuclearnewsnetwork.com`, `sc-domain:deai.org`.
Bing URLs: `https://nuclearnewsnetwork.com/`, `https://deai.org/`.

Reporting dates: the store's `reportingEnd` is **October 18, 2026**, but Google
totals are counted through **October 17**, the latest settled data at review —
an aggregate query ending Oct 18 returned identical figures, and single-day
Oct 18 rows were not yet reported. The user's Search Console screenshot for NNN
(47.4K impressions / 580 clicks, showing Oct 18) matches the settled totals.
DeAI's Google screenshot (4.53K / 23, a 3-month Jul 20–Oct 18 window) includes
~6 pre-launch days (166 impressions, 1 click); the store keeps the
consistent since-launch figure of **4,365 / 22**.

The combined headlines are **80.2k** and **10.5k**, calculated from unrounded
API counts. Impressions are appearances, not deduplicated visitors.

Do not use Bing `analytics_query` as a site-total report: it returned historical
query rows despite date/dimension/row-limit arguments. These were not summed.
Recent Google data may still be revised.

## Google Generative AI impressions — dashboard value

The user's Search Console screenshot shows the **Generative AI** report for
nuclearnewsnetwork.com at **4.44K impressions** over the 3-month window. Stored
as `googleGenAiImpressions: 4440`; treated as a dashboard value (see
`search-console_genai_query_insights`, which only exposes per-query heuristic
rows, not the official report total).

## Official AI citations — user dashboard (Bing AI Performance)

The MCP does not expose AI citation totals. This refresh uses values the user
read from the dashboards:

- https://www.bing.com/webmasters/aiperformance?siteUrl=https://nuclearnewsnetwork.com/
- https://www.bing.com/webmasters/aiperformance?siteUrl=https://deai.org/

Source label: **Microsoft Copilots and Partners**. Totals are the dashboards'
rounded values (**25.6K**, **10.1K**); no exact daily-table sum was available
this round, unlike the September snapshot. The dashboards also report average
cited pages of 25 (NNN) and 15 (DeAI); not currently shown on the site.

Nuclear News Network's headline **Total AI citations** combines the Bing
figure (25.6K) with the Google Generative AI count (4.44K) = **30.0K**, per the
user's October 20, 2026 direction (Google screenshot shows the Gen AI report at
4.44K; treated as Google's AI citation figure and included in the total). DeAI's
total remains the Bing dashboard value only, as no Google Gen AI figure was
provided for it.

| Site | Stored citations | Display | Oct 12–18 daily citations | Daily average |
| --- | ---: | ---: | --- | ---: |
| Nuclear News Network | 25,600 | 10.2k → 25.6k | 780, 853, 857, 659, 739, 415, 322 | 661 (from 660.714) |
| DeAI News | 10,100 | 2.5k → 10.1k | 326, 298, 296, 470, 380, 341 (6 days, Oct 12–17) | 352 (from 351.833) |

The daily averages are labeled per publication (7-day vs 6-day) because the
DeAI dashboard supplied only six days this round. A citation is an appearance
as a source in an AI answer, not a site visit. No ChatGPT-wide, Google AI,
unique-reader, or conversion claim is inferred from these citations.

## Google Analytics — ChatGPT sessions (no longer shown)

The September 14–20 ChatGPT-session figures (22 NNN, 10 DeAI, properties
Nuclear News Network Site 499945014 and DEAI.org 551676632) were **removed from
the proof on October 20, 2026** at the user's request, together with the
"Search visibility & reader traffic" detail block. Do not re-add them without a
fresh dated measurement.

## Refresh procedure

1. Query both search properties using explicit inclusive dates; check that the
   latest daily rows settle before agreeing a `reportingEnd`.
2. Read AI Performance totals and daily rows from the Bing dashboards; prefer
   exact daily-table sums to rounded dashboard values when available, and
   state the averaging window per publication.
3. Update the shared data and evidence notes together. Headline sums and
   formatted counts are derived from numeric data in the component.
4. Keep `lib/services.ts`'s "How quickly can we see results?" answer aligned
   with the store's numbers.
