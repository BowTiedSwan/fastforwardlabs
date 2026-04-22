import test from "node:test";
import assert from "node:assert/strict";

import {
  extractPlainText,
  formatAiAlphaContext,
  getTitleFromProperties,
} from "./ai-alpha";

test("getTitleFromProperties returns the Notion title text", () => {
  const title = getTitleFromProperties({
    Title: {
      title: [
        {
          plain_text: "AI Alpha - 2026-03-31",
        },
      ],
    },
  });

  assert.equal(title, "AI Alpha - 2026-03-31");
});

test("extractPlainText joins supported block text in order", () => {
  const text = extractPlainText([
    {
      type: "heading_1",
      heading_1: { rich_text: [{ plain_text: "Top Stories" }] },
    },
    {
      type: "paragraph",
      paragraph: { rich_text: [{ plain_text: "Claude and Gemini launches led the day." }] },
    },
    {
      type: "bulleted_list_item",
      bulleted_list_item: { rich_text: [{ plain_text: "Cursor shipping changes" }] },
    },
  ]);

  assert.equal(text, "Top Stories\n\nClaude and Gemini launches led the day.\n\nCursor shipping changes");
});

test("formatAiAlphaContext includes title, date, url, and trimmed article body", () => {
  const context = formatAiAlphaContext({
    title: "AI Alpha - 2026-03-31",
    publishedAt: "2026-03-31",
    url: "https://notion.so/ai-alpha-latest",
    body: "A".repeat(900),
  });

  assert.match(context, /Latest AI Alpha article/);
  assert.match(context, /AI Alpha - 2026-03-31/);
  assert.match(context, /https:\/\/notion.so\/ai-alpha-latest/);
  assert.ok(context.length < 1300);
});
