# Frontend Production Pricing Estimate

## Scope

This document estimates production pricing for frontend delivery in companies, using the current `nexus-based-imobiliaria-app` codebase as the concrete reference object.

Reference size already measured in this repository:

- `163345` useful characters
- `2513.00` normalized useful lines at `65` chars
- `~82 academic laudas` under the `2000 chars/lauda` convention

## Important Caveat

This is an estimation model, not a market quote.

The ranges below are meant for:

- budget framing
- internal pricing discussions
- commercial pre-scoping

They are not a substitute for a formal proposal with scope, revision limits, QA depth, SLA, analytics, accessibility, CMS boundary, and deployment obligations.

## External Market Anchor

As a broad international benchmark, TechRadar's 2025 guide says:

- custom-coded websites often land around `$5,000` to `$30,000+`
- freelancers on marketplaces such as Upwork/Fiverr often appear around `$20` to `$80` per hour

Source:

- TechRadar, "How much does it cost to build a website?"  
  https://www.techradar.com/news/how-much-does-it-cost-to-build-a-website

## How This Estimate Was Derived

For Brazil-oriented company delivery, I am treating the external benchmark only as an anchor and then applying a local production interpretation for this project profile:

- visually rich frontend
- multiple routes
- custom runtime instead of page builder
- dashboard/backoffice area
- CMS-like data persistence workflow
- moderate product complexity
- no full backend platform included

The result is a pragmatic pricing ladder for Brazil-based delivery teams.

## Recommended Production Bands

The first version of this estimate leaned too much toward company-process pricing.

For the Brazilian market, a more realistic framing is to separate:

- lean execution pricing
- boutique structured delivery
- heavier corporate delivery

## Lean Local-Market Reading

If the project is treated as a small business website delivery with:

- existing visual direction
- no dedicated product discovery
- limited QA
- no backend platform build
- direct approval with the client
- low governance overhead

then the commercial perception can be much lower.

For this reading, a plausible range is:

- `~R$ 3.280` as the base estimate at `R$ 40/lauda`
- `R$ 3.500` to `R$ 5.000` as a practical quoted band for the website

Using `~82 laudas`:

- `R$ 40,00` per lauda at `~R$ 3.280`
- `R$ 42,68` per lauda at `R$ 3.500`
- `R$ 60,98` per lauda at `R$ 5.000`

If you impose a soft ceiling of `R$ 200/lauda`, then this project would cap near:

- `~R$ 16.400`

That is a much better fit for a local-market execution lens than the original corporate-heavy ladder.

### 1. Senior freelancer or small two-person cell

Typical use:

- implementation-heavy job
- limited discovery
- lighter QA
- direct founder/client communication

Estimated project range for a codebase like this under a more structured custom-build reading:

- `R$ 12.000` to `R$ 30.000`

Per academic lauda at `~82 laudas`:

- `R$ 146` to `R$ 366` per lauda

### 2. Small boutique agency

Typical use:

- design alignment
- structured revisions
- stronger QA
- PM overhead
- delivery responsibility as a company

Estimated project range:

- `R$ 20.000` to `R$ 45.000`

Per academic lauda:

- `R$ 244` to `R$ 549` per lauda

### 3. Established agency or consultancy

Typical use:

- stronger process
- more stakeholders
- formal approvals
- accessibility and analytics requirements
- deployment coordination
- change management overhead

Estimated project range:

- `R$ 35.000` to `R$ 80.000`

Per academic lauda:

- `R$ 427` to `R$ 976` per lauda

## Practical Headline Number

If you need one commercial shorthand for this repo as a frontend production artifact:

- local-market lean price: `~R$ 3.280` to `R$ 5.000`
- structured freelancer price: `~R$ 15.000`
- balanced agency price: `~R$ 30.000`
- enterprise-facing delivery price: `~R$ 60.000`

Converted to lauda:

- `~R$ 40` to `R$ 61/lauda`
- `~R$ 183/lauda`
- `~R$ 366/lauda`
- `~R$ 732/lauda`

## Suggested Hourly Interpretation

These are not sourced market medians; they are production planning heuristics consistent with the ranges above.

Suggested working bands:

- execution-focused freelancer: `R$ 50` to `R$ 100` per hour
- senior freelancer: `R$ 90` to `R$ 180` per hour
- boutique agency effective rate: `R$ 140` to `R$ 260` per hour
- established consultancy effective rate: `R$ 220` to `R$ 380` per hour

## What Is Included In These Estimates

- frontend architecture and implementation
- responsive behavior
- state wiring
- dashboard UI
- CMS integration on the frontend side
- browser QA and revision time
- deployment-oriented packaging of the frontend

## What Is Usually Excluded

- brand strategy
- copywriting
- custom illustration and photo production
- backend platform implementation
- CRM integration project
- legal/privacy review
- paid media setup
- long-term maintenance retainers

## Risk Multipliers

The price tends to move upward when the project adds:

- many approval layers
- strong accessibility requirements
- localization and content operations
- deep analytics tagging
- authentication and role complexity
- test automation and CI requirements
- a stricter editing workflow for CMS data

## How To Use Lauda Pricing Safely

Price per lauda is useful for rough communication, but it should not be the only pricing model.

Use it only for:

- rough portfolio valuation
- comparing projects of similar architectural depth
- sanity-checking a proposal

Do not use it as the sole metric when:

- the design system is immature
- the product has unusual interaction complexity
- the CMS or backend contract is still moving
- compliance or accessibility scope is heavy

## Recommended Internal Positioning

For this specific repository, a defensible commercial framing is:

- `~R$ 3.280` to `R$ 5.000` if sold as lean website execution around `R$ 40` to `R$ 61` por lauda
- `~R$ 8.000` to `R$ 20.000` if sold as custom frontend with stronger implementation ownership
- `~R$ 20.000+` only when process, QA, governance, and agency overhead become part of the sale
