# REPO_MAP — fastforwardlabs/apps/web

> GENERATED 2026-09-11 by `pnpm repo-map`. Do not hand-edit.
> Contracts: `README.md` (inquiry pipeline + env), `lib/services.ts` (offers), `lib/site.ts` (Cal.com URL).

## Top level

| Entry | Purpose |
|---|---|
| `AGENTS.md` / `CLAUDE.md` | Agent router (lean) / Claude entry importing it. |
| `README.md` | Inquiry pipeline, server-only env vars, spam protection, WAF rule, checks. |
| `app/` | Next.js App Router pages + one API route (8 page routes). |
| `components/` | Site chrome, inquiry form/CTAs, MDX map, GA. |
| `lib/` | Services data, inquiry server logic, site constants, utils. |
| `tests/` | Vitest API tests + node smoke tests. |
| `public/` | Static assets. |
| `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json` | Build/lint/TS config. |

## App routes (pages)

- `api/* (see below)`
- `blog/[slug]/`
- `blog/`
- `contact/`
- `(root)`
- `services/[slug]/`
- `strategy/[slug]/`
- `strategy/`

## lib/

- `analytics.ts`
- `ga4-mp.ts`
- `inquiries.server.ts`
- `inquiry-options.ts`
- `services.ts`
- `site.ts`
- `utils.ts`

## components/

- `analytics-beacons.tsx`
- `audit-cta.tsx`
- `content-system-proof.tsx`
- `google-analytics.tsx`
- `inquiry-cta.tsx`
- `inquiry-form.tsx`
- `mdx-components.tsx`
- `site-footer.tsx`
- `site-header.tsx`
- `ui`

## tests/

- `analytics.test.ts`
- `inquiries.test.ts`
- `services.smoke.mjs`

## Sibling workspace packages (repo root)

- `packages/content` (`@fastforwardlabs/content`) — MDX corpora: blog (2), strategy (2), linkedin-ideas (73), seo-geo (30); loader in `src/index.ts`.
- `packages/agents` — agent tooling (not consumed by web).
- `companies/fast-forward-labs/agents/*` — marketing agent definitions (copywriting, SEO/GEO, CRO, LinkedIn, outbound, strategy).
