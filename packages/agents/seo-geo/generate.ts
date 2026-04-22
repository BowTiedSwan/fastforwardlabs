import { generateMarkdownFile } from "../shared/generator";

const fallbackBody = `# Daily SEO and GEO ideas

## SEO ideas

1. AI strategy for executives: where leadership teams should start.
2. How to measure AI ROI without creating reporting theater.
3. C-suite AI implementation: the operating model most firms skip.
4. Generative AI for executives: what matters beyond experimentation.

## GEO ideas

1. GEO for B2B consulting firms selling to executive buyers.
2. How AI answer engines evaluate trust signals in executive content.
3. The modular content structure that improves AI citation potential.
4. Why executive AI content must connect SEO, LinkedIn, and paid search.

## Priority recommendation

Ship the ROI-focused executive article first. It aligns with the strongest buyer pressure in the research: leadership teams need a practical way to justify AI spend and move from experimentation to accountable execution.
`;

const outputPath = await generateMarkdownFile({
  title: "Daily SEO and GEO draft directions",
  description:
    "Daily draft themes for search and AI-answer-engine visibility.",
  tags: ["seo-geo", "content-ideas"],
  destinationDirectory: "packages/content/seo-geo",
  promptPath: "seo-geo/prompt.md",
  fallbackBody,
});

console.log(`Wrote SEO/GEO draft file to ${outputPath}`);
