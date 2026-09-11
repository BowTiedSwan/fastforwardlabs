// REPO_MAP generator for fastforwardlabs/apps/web. Run: pnpm repo-map
// Output apps/web/REPO_MAP.md is GENERATED — never hand-edit.
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const web = join(root, "apps/web");
const stamp = new Date().toISOString().slice(0, 10);

function list(dir, base = root) {
  try {
    return readdirSync(join(base, dir)).filter((f) => !f.startsWith(".")).sort();
  } catch {
    return [];
  }
}
function countMdx(dir, base = root) {
  try {
    return readdirSync(join(base, dir)).filter((f) => f.endsWith(".mdx") || f.endsWith(".md")).length;
  } catch {
    return 0;
  }
}

const appRoutes = [];
try {
  const walk = (d, prefix = "") => {
    for (const f of readdirSync(join(web, d))) {
      const full = join(web, d, f);
      if (statSync(full).isDirectory()) {
        if (f === "api") appRoutes.push("api/* (see below)");
        else walk(join(d, f), `${prefix}${f}/`);
      } else if (/^page\.tsx?$/.test(f)) appRoutes.push(prefix || "(root)");
    }
  };
  walk("app");
} catch {}

const out = `# REPO_MAP — fastforwardlabs/apps/web

> GENERATED ${stamp} by \`pnpm repo-map\`. Do not hand-edit.
> Contracts: \`README.md\` (inquiry pipeline + env), \`lib/services.ts\` (offers), \`lib/site.ts\` (Cal.com URL).

## Top level

| Entry | Purpose |
|---|---|
| \`AGENTS.md\` / \`CLAUDE.md\` | Agent router (lean) / Claude entry importing it. |
| \`README.md\` | Inquiry pipeline, server-only env vars, spam protection, WAF rule, checks. |
| \`app/\` | Next.js App Router pages + one API route (${appRoutes.length} page routes). |
| \`components/\` | Site chrome, inquiry form/CTAs, MDX map, GA. |
| \`lib/\` | Services data, inquiry server logic, site constants, utils. |
| \`tests/\` | Vitest API tests + node smoke tests. |
| \`public/\` | Static assets. |
| \`next.config.ts\`, \`postcss.config.mjs\`, \`eslint.config.mjs\`, \`tsconfig.json\` | Build/lint/TS config. |

## App routes (pages)

${appRoutes.map((r) => `- \`${r}\``).join("\n")}

## lib/

${list("lib", web).map((f) => `- \`${f}\``).join("\n")}

## components/

${list("components", web).map((f) => `- \`${f}\``).join("\n")}

## tests/

${list("tests", web).map((f) => `- \`${f}\``).join("\n")}

## Sibling workspace packages (repo root)

- \`packages/content\` (\`@fastforwardlabs/content\`) — MDX corpora: blog (${countMdx("blog", join(root, "packages/content"))}), strategy (${countMdx("strategy", join(root, "packages/content"))}), linkedin-ideas (${countMdx("linkedin-ideas", join(root, "packages/content"))}), seo-geo (${countMdx("seo-geo", join(root, "packages/content"))}); loader in \`src/index.ts\`.
- \`packages/agents\` — agent tooling (not consumed by web).
- \`companies/fast-forward-labs/agents/*\` — marketing agent definitions (copywriting, SEO/GEO, CRO, LinkedIn, outbound, strategy).
`;
await (await import("node:fs/promises")).writeFile(join(web, "REPO_MAP.md"), out);
console.log(`wrote apps/web/REPO_MAP.md (${stamp})`);
