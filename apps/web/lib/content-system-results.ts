// Dated evidence, not live analytics. Sources and refresh instructions are in
// content-system-results.md. Keep citations, impressions, clicks, and sessions distinct.
export const contentSystemResults = {
  reviewedAt: "September 21, 2026",
  reportingEnd: "September 19, 2026",
  citationSource: "Microsoft Copilots and Partners",
  citationPeriod: "September 13–19, 2026",
  analyticsPeriod: "September 14–20, 2026",
  nuclear: {
    name: "Nuclear News Network",
    url: "https://nuclearnewsnetwork.com/",
    domain: "nuclearnewsnetwork.com",
    launch: "July 9, 2026",
    citations: 10222,
    dailyCitations: 436,
    googleImpressions: 30910,
    googleClicks: 293,
    bingImpressions: 14418,
    bingClicks: 428,
    chatgptSessions: 22,
    // Calendar-day averages make these unequal reporting periods comparable.
    googlePeriods: [
      { label: "Jul 9–31", impressions: 1251, days: 23 },
      { label: "Aug 1–31", impressions: 11507, days: 31 },
      { label: "Sep 1–19", impressions: 18152, days: 19 },
    ],
  },
  deai: {
    name: "DeAI News",
    url: "https://deai.org/",
    domain: "deai.org",
    launch: "August 29, 2026",
    citations: 2467,
    dailyCitations: 196,
    googleImpressions: 1489,
    googleClicks: 6,
    bingImpressions: 1124,
    bingClicks: 18,
    chatgptSessions: 10,
  },
} as const;
