# Fast Forward Labs Monorepo Plan

## Goal
Create a greenfield monorepo for Fast Forward Labs with:
- a Next.js 16 landing site using Tailwind and shadcn-style components
- an in-repo blog/content system
- daily scheduled generators for SEO/GEO content and LinkedIn ideas
- strategy/content sections for ads/keywords and LinkedIn outreach

## Source Material
- User-provided market research is stored at `.sisyphus/research/executive-ai-market-research.md`.
- Starter editorial and strategy content must derive from that file.

## Scope Boundaries
- Do not add a database, auth, admin panel, or hosted CMS.
- Keep content in the repo as Markdown/MDX.
- Use one web app only.
- Use animation libraries only if they create clear value for the industrial/minimal brand.

## Planned Structure
```txt
apps/
  web/
packages/
  content/
    blog/
    strategy/
      ads-keywords/
      linkedin-outreach/
    linkedin-ideas/
    seo-geo/
  agents/
    shared/
.github/workflows/
```

## Implementation Order
1. Bootstrap pnpm workspace and base monorepo files.
   - QA: run `pnpm install` successfully at repo root.
2. Create `apps/web` with Next.js 16, Tailwind, TypeScript, and shadcn-compatible setup.
   - QA: run `pnpm --filter web build` successfully.
3. Build the landing page with an industrial/minimal visual system.
   - QA: run the web app and confirm the homepage renders the Fast Forward Labs hero, services/value sections, and CTA.
4. Implement file-based content loading for blog and strategy sections from `packages/content`.
   - QA: load `/blog`, one blog detail route, and strategy routes successfully in the browser.
5. Seed starter content using the user-provided executive AI research at `.sisyphus/research/executive-ai-market-research.md`.
   - QA: confirm starter markdown files exist in the expected content directories and render on-site.
6. Add daily generator scripts under `packages/agents` for:
   - SEO/GEO content output
   - LinkedIn daily ideas output
   - QA: execute each generator locally in dry-run or local mode and confirm markdown output paths.
7. Add GitHub Actions schedules for both generators.
   - QA: validate workflow YAML and confirm cron plus command paths are correct.
8. Verify diagnostics, build, and manual app behavior.
   - QA: run diagnostics on changed files, build the site, and manually check the homepage plus content routes.

## Binary Acceptance Criteria
- Workspace installs successfully with pnpm.
- `apps/web` builds and runs on Next.js 16.
- Landing page exists and reflects an industrial/minimal style.
- Blog index and blog post routes render content stored in the repo.
- Strategy pages for ads/keywords and LinkedIn outreach render content stored in the repo.
- Two daily scheduled workflows exist for SEO/GEO generation and LinkedIn idea generation.
- No extra infra beyond the requested monorepo, site, content, and generators is introduced.

## Locked Decisions
- Use pnpm workspaces without Turborepo or Nx.
- Use native Next.js MDX/file-based content rather than a hosted or git-backed CMS.
- Render strategy content as file-based static routes within the main web app.
