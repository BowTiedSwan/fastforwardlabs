// Dated evidence snapshot, not live analytics. Provenance and update instructions:
// content-system-results.md. Keep dashboard citations separate from search impressions.
export const contentSystemResults = {
  reviewedAt: "September 14, 2026",
  citationSource: "Bing Webmaster Tools · Microsoft Copilots and Partners",
  nuclear: {
    name: "Nuclear News Network",
    url: "https://nuclearnewsnetwork.com/",
    launch: "July 9, 2026",
    citations: "7.2k",
    recentDailyCitations: "~500",
    googleImpressions: "25.3k",
    googleClicks: 238,
    bingImpressions: "11.3k",
    bingClicks: 350,
    // GSC date-dimension rows, July 9–September 12, 2026, inclusive.
    // Unequal periods are normalized by calendar days in the chart.
    googlePeriods: [
      { label: "Jul 9–31", impressions: 1251, days: 23 },
      { label: "Aug 1–31", impressions: 11507, days: 31 },
      { label: "Sep 1–12", impressions: 12553, days: 12 },
    ],
  },
  deai: {
    name: "DeAI.org",
    url: "https://deai.org/",
    launch: "August 29, 2026",
    citations: "1.1k+",
    recentDailyCitations: "~100",
  },
} as const;
