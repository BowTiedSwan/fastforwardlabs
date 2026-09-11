import assert from "node:assert/strict";
import test from "node:test";

// Run against a running dev or production server:
// WEB_TEST_URL=http://localhost:3100 node --test tests/services.smoke.mjs
const base = process.env.WEB_TEST_URL || "http://localhost:3100";
const slugs = [
  "ai-audit-advisory",
  "business-automation",
  "ai-training",
  "ai-content-systems",
];

test("each homepage service destination renders a distinct, indexable detail page", async () => {
  const home = await fetch(base).then((response) => response.text());
  const titles = new Set();
  for (const slug of slugs) {
    assert.ok(home.includes(`href="/services/${slug}"`), `Homepage links to ${slug}`);
    const response = await fetch(`${base}/services/${slug}`);
    assert.equal(response.status, 200, `${slug} renders`);
    const html = await response.text();
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title, `${slug} has a title`);
    assert.ok(!titles.has(title), `${slug} has a unique title`);
    titles.add(title);
    assert.match(html, /name="description" content="[^"]+"/);
    assert.match(html, /Ways to work together/);
    assert.match(html, /href="\/#services"/);
  }
});

test("unknown service URLs return an actual 404", async () => {
  const response = await fetch(`${base}/services/nonexistent-service`);
  assert.equal(response.status, 404);
});

test("audit calls lead to the confirmed calendar without exposing a contact email", async () => {
  for (const path of ["/", ...slugs.map((slug) => `/services/${slug}`)]) {
    const html = await fetch(`${base}${path}`).then((response) => response.text());
    assert.ok(html.includes('href="https://cal.com/fast-forward-labs/systems-audit"'), `${path} links to booking`);
    assert.ok(!html.includes("mailto:"), `${path} has no public email link`);
  }
});
