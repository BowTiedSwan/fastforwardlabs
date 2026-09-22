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

test("main CTAs book intro calls and audit bookings stay on the audit service page", async () => {
  for (const path of ["/", "/contact", ...slugs.map((slug) => `/services/${slug}`)]) {
    const html = await fetch(`${base}${path}`).then((response) => response.text());
    const links = [...html.matchAll(/href="([^"]+)"/g)].map((match) => new URL(match[1].replaceAll("&amp;", "&"), base));
    const introLinks = links.filter((url) => url.origin === "https://cal.com" && url.pathname === "/fast-forward-labs/15min");
    const auditLinks = links.filter((url) => url.origin === "https://cal.com" && url.pathname === "/fast-forward-labs/systems-audit");
    assert.equal(introLinks.length, path === "/" ? 3 : path === "/contact" ? 2 : 1, `${path} has intro-call CTAs`);
    assert.equal(auditLinks.length, path === "/services/ai-audit-advisory" ? 2 : 0, `${path} has the right audit booking links`);
    for (const url of introLinks) assert.equal(url.searchParams.get("utm_campaign"), "intro_call");
    for (const url of auditLinks) assert.equal(url.searchParams.get("utm_campaign"), "audit_call");
    assert.match(html, /Book an intro call/);
    assert.ok(!html.includes("mailto:"), `${path} has no public email link`);
  }
});

test("content-system proof links readers directly to both publications", async () => {
  for (const path of ["/", "/services/ai-content-systems"]) {
    const html = await fetch(`${base}${path}`).then((response) => response.text());
    for (const publication of ["https://nuclearnewsnetwork.com/", "https://deai.org/"]) {
      assert.ok(html.includes(`href="${publication}"`), `${path} links to ${publication}`);
    }
  }
});

test("content-system proof leads with total Nuclear News Network citations", async () => {
  const html = await fetch(`${base}/services/ai-content-systems`).then((response) => response.text());
  const totalLabel = html.indexOf("Total AI citations");
  const dailyLabel = html.indexOf("AI citations / day · 7-day average");
  assert.ok(totalLabel >= 0, "total citation label is present");
  assert.ok(dailyLabel >= 0, "daily citation label is present");
  assert.ok(totalLabel < dailyLabel, "total citations appear before the daily average");
  assert.match(html.slice(totalLabel, dailyLabel), />10\.2k</);
  assert.match(html.slice(dailyLabel), />436</);
});
