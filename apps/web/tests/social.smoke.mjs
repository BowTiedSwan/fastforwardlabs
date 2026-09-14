import assert from "node:assert/strict";
import test from "node:test";

// Run against `next start`: development mode intentionally uses localhost
// for file-based image metadata instead of the production metadataBase.
const base = process.env.WEB_TEST_URL || "http://localhost:3100";

test("homepage shares a generated 1200×630 PNG with large-image social metadata", async () => {
  const html = await fetch(base).then((response) => response.text());
  const ogImage = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  assert.ok(ogImage, "Homepage exposes its share image to crawlers");
  const imageUrl = new URL(ogImage.replaceAll("&amp;", "&"));
  assert.equal(imageUrl.protocol, "https:", "Share URL is absolute and public");
  assert.match(imageUrl.pathname, /^\/opengraph-image/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /name="twitter:image" content="https:\/\//);
  assert.match(html, /property="og:image:alt" content="Fast Forward Labs/);

  // Exercise this server's image endpoint, not the production hostname.
  const response = await fetch(new URL(imageUrl.pathname + imageUrl.search, base));
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /image\/png/);
  const png = Buffer.from(await response.arrayBuffer());
  assert.deepEqual(png.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  assert.ok(png.length < 5 * 1024 * 1024, "Within social image size limits");
});
