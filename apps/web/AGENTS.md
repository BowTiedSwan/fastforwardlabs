# apps/web — agent workspace

Fast Forward Labs marketing/services site: Next.js 16 (App Router) + React 19 + Tailwind v4 inside the pnpm monorepo `fastforwardlabs`. Offers and CTAs are code-defined (no headless CMS): services in `lib/services.ts`, audit-call URL in `lib/site.ts`. Blog/strategy MDX lives in the sibling workspace package `@fastforwardlabs/content` (`packages/content`), loaded via `next-mdx-remote`. Inquiries POST to `/api/inquiries` (Resend HTTP API, server-only env).

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Read first — pointers, not copies

- `README.md` — inquiry pipeline, required server-only env vars, spam-protection layers, WAF rule, test commands. Authoritative for `/api/inquiries` behavior.
- `lib/services.ts` — single source of truth for service definitions; homepage and `/services/[slug]` both render from it.
- `lib/site.ts` — confirmed Cal.com audit URL. Do not change without a confirmed URL.
- `lib/inquiries.server.ts` — HMAC token create/verify (cookie-bound, 1h). Server-only.
- `../packages/content/src/index.ts` — MDX content loader used by `app/blog` and `app/strategy`.
- `REPO_MAP.md` — GENERATED file→purpose map (`pnpm repo-map`). Never hand-edit.

## Commands (exact — run from repo root unless noted)

```bash
pnpm dev                    # next dev (root script filters to web)
pnpm build                  # next build
pnpm lint                   # eslint
pnpm test                   # @fastforwardlabs/content tests + apps/web/tests/inquiries.test.ts
pnpm --filter web dev       # equivalent, explicit form
WEB_TEST_URL=http://localhost:3100 node --test apps/web/tests/services.smoke.mjs   # route smoke tests vs running server
```

## Invariants (hard — enforced by tests and README contract)

- Resend env vars (`RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, `INQUIRY_TO_EMAIL`, `INQUIRY_FORM_SECRET`) are **server-only** — never prefix with `NEXT_PUBLIC_`.
- Missing config or provider failure must produce an error response, never a false success.
- Anti-spam layers stay: honeypot, HMAC token + HttpOnly SameSite cookie (1h), 2s minimum form age, same-origin POST, 16KB body cap, Resend idempotency keys.
- The Vercel WAF rule (`Service inquiry rate limit`, 5 req/IP/600s on POST `/api/inquiries`) is deployment config — never silently replace or drop it when redeploying.
- Tests mock only the external mail provider; they exercise the real handler, token verification, validation, and routing. Never use real provider credentials in tests.
- One hero/offer definition per page: edit `lib/services.ts`, never duplicate copy into page files.

## Never do

- Never invent components; reuse `components/` (ui/button.tsx is the only shadcn-style primitive).
- Never commit real credentials or put secrets in client components.
- Minimal sufficient change; keep `components/content-system-proof.tsx` copy aligned with `lib/services.ts` claims.
- Doc conflicts: `README.md` wins over stale comments in code.
