import { describe, expect, it } from "vitest";

import {
  buildDocument,
  buildExcerpt,
  sortByPublishedAtDesc,
  toSlug,
} from "./content-utils";

describe("toSlug", () => {
  it("converts executive titles into stable url slugs", () => {
    expect(toSlug("AI Strategy for the C-Suite in 2026")).toBe(
      "ai-strategy-for-the-c-suite-in-2026",
    );
  });
});

describe("buildExcerpt", () => {
  it("returns a trimmed excerpt under the requested character limit", () => {
    const excerpt = buildExcerpt(
      "Fast Forward Labs helps executive teams move from AI curiosity to AI execution with practical systems and sharp operating guidance.",
      88,
    );

    expect(excerpt.length).toBeLessThanOrEqual(88);
    expect(excerpt.endsWith("…")).toBe(true);
  });
});

describe("sortByPublishedAtDesc", () => {
  it("orders newer documents before older ones", () => {
    const documents = [
      buildDocument({ title: "Older", publishedAt: "2026-03-28" }),
      buildDocument({ title: "Newest", publishedAt: "2026-03-31" }),
      buildDocument({ title: "Middle", publishedAt: "2026-03-30" }),
    ];

    expect(sortByPublishedAtDesc(documents).map((document) => document.title)).toEqual([
      "Newest",
      "Middle",
      "Older",
    ]);
  });
});
