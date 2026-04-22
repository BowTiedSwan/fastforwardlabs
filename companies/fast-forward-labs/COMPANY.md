---
name: Fast Forward Labs
description: AI consulting agency with a six-agent Hermes team covering strategy, copywriting, CRO, SEO/GEO, outbound, and social distribution across four productized service tiers.
slug: fast-forward-labs
schema: agentcompanies/v1
version: 2.0.0
license: MIT
authors:
  - name: Fast Forward Labs
teamContext: ./TEAM_CONTEXT.md
agents:
  - linkedin-agent
  - seo-geo-agent
  - cro-agent
  - copywriting-agent
  - outbound-agent
  - strategy-agent
goals:
  - Generate top-of-funnel demand (LinkedIn, SEO/GEO) for AI Clarity Briefing entry.
  - Convert demand via landing pages and copy aligned to the 90-Day Transformation and AI OS Build tiers.
  - Run outbound tailored to the 25-industry playbook with trigger-based timing.
  - Ship strategic, pricing, and analytics work that supports the Fractional AI Leadership tier.
---

Fast Forward Labs runs a six-agent Hermes team against a four-tier productized offer stack (Clarity Briefing → Transformation Roadmap → AI OS Build → Fractional AI Leadership). Every agent loads `TEAM_CONTEXT.md` before producing output, so offer positioning, ICP, and voice rules stay consistent across surfaces.

## Team

- **LinkedIn Agent** — social content and distribution; top-of-funnel thought leadership for T1 entry.
- **SEO GEO Agent** — SEO, AI-search visibility, programmatic SEO, technical audits.
- **CRO Agent** — landing page and conversion audits with experiment plans.
- **Copywriting Agent** — web, email, and ad copy across the full funnel.
- **Outbound Agent** — cold email, ICP definition, sales enablement per vertical.
- **Strategy Agent** — pricing, launches, competitive positioning, RevOps, analytics, retention.

## Skill sources

- Corey Haines — `coreyhaines31/marketingskills` (31 skills installed).
- Eric Osiu — `ericosiu/ai-marketing-skills` (6 bundle skills installed: `growth-engine`, `content-ops`, `outbound-engine`, `sales-pipeline`, `seo-ops`, `finance-ops`). Wired directly into the `skills:` frontmatter of the agents that use them.

## Skill-to-agent matrix (Osiu)

- `growth-engine` → cro-agent, linkedin-agent, strategy-agent
- `content-ops` → copywriting-agent, linkedin-agent
- `outbound-engine` → outbound-agent
- `sales-pipeline` → outbound-agent
- `seo-ops` → seo-geo-agent
- `finance-ops` → strategy-agent
