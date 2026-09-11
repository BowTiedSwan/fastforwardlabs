This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Services and inquiries

The homepage and `/services/[slug]` share their offer definitions in `lib/services.ts`.
Audit-call CTAs use the confirmed Cal.com URL in `lib/site.ts`.
Other service CTAs open `/contact?service=<slug>` with the relevant service selected.

`/api/inquiries` sends notifications through the Resend HTTP API. Configure these
**server-only** environment variables (never prefix them with `NEXT_PUBLIC_`):

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | A Resend key with email-sending permission |
| `INQUIRY_FROM_EMAIL` | A sender accepted by the Resend account |
| `INQUIRY_TO_EMAIL` | Private recipient inbox |
| `INQUIRY_FORM_SECRET` | Random secret of at least 32 characters for form signatures |

Use a verified-domain sender for general production mail. Resend's onboarding
sender can deliver only to the account's permitted test recipient; this site sends
only an internal notification, with the visitor in `reply_to`, not `to`.
Missing configuration and provider failures produce an error, never a false
success. Keep credentials in the deployment settings or an ignored local env file.

### Invisible spam protection

- A visually hidden, non-tabbable honeypot (excluded from assistive technology).
- HMAC-signed form tokens bound to an HttpOnly, SameSite cookie, valid for one hour.
- A two-second minimum form age (the UI accommodates rapid autofill).
- Same-origin POST enforcement, bounded request bodies, and server validation.
- Resend idempotency keys to avoid duplicate notifications on retries.
- **Vercel WAF:** `Service inquiry rate limit`, path equals `/api/inquiries`,
  method equals `POST`, fixed window of **5 requests per IP per 600 seconds**,
  default 429 response. Published in the existing `fastforwardlabs-web` project.

The WAF rule is deployment configuration, not an in-memory counter; keep it when
redeploying. It counts per Vercel region and does not apply to local development or
another host. Hobby includes one rate-limiting rule and 1M allowed requests as of
September 11, 2026. Do not silently replace an existing firewall rule elsewhere.
These measures raise the cost of spam; sophisticated browser bots can still pass
them. Free invisible Cloudflare Turnstile is an optional next layer, not enabled.
It requires separate site/secret keys and its privacy-policy disclosure.

### Checks

From the repository root: `pnpm test`, `pnpm lint`, `pnpm build`.
For route smoke tests against a running server:

```bash
WEB_TEST_URL=http://localhost:3100 node --test apps/web/tests/services.smoke.mjs
```

The API tests mock only the external mail provider; they exercise the real request
handler, cookie/token verification, validation, error handling, and private routing.
Never use real provider credentials in automated tests.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
