# 11 — User stories and scenarios

This document is the canonical input contract for Triad's frontend and backend implementation. It is the most important of the implementation-handoff trio (11/12/13). Anything not covered here is not in scope for Wave 3 batch 1.

The product surface area is three-layered (LLMs / Agents / Harnesses) and three-tiered (Reader / Custom-slices / Enterprise). Every story below maps to at least one of those layers and one of those tiers.

## 1. Personas summary

We have five personas. The first two are doc 05's primary and secondary; the remaining three are new in this doc to cover scenarios that the implementation agent must support but doc 05 only sketched.

### P1 — Mira, Eval Lead (primary; deep dive in `05-audience-profile.md` §1)
Eval lead at a 60-person applied-AI startup. Subscribes to Reader at $29/mo on personal card. Reads the digest every Monday. Asks a custom slice every 2-3 weeks. Voice cue: "what's the source?" before "what's the answer?"

### P2 — Felix, Diligence Analyst (secondary; deep dive in `05-audience-profile.md` §2)
Investor at a $400M AI-focused fund. Subscribes to Custom-slices at $199/mo on fund expense. Pulls one diligence-grade slice per active deal (~2/month). Voice cue: "compared to what?"

### P3 — Asha, Internal Eval at a F500 (tertiary; deep dive in `05-audience-profile.md` §3)
Eval lead at a 5,000-person bank's AI Centre of Excellence. Enterprise tier ($1,499/mo) on wire/USDT direct invoice. Defends vendor selection in legal/risk/compliance review. Voice cue: "is this defensible to the regulator?"

### P4 — Sam, AI Startup Founder (new in this doc)
Solo founder of a 4-person AI agent startup, ~$200k seed. Subscribes to Custom-slices at $199/mo on personal card. Pulls a slice the day before every investor update or sales pitch ("our agent on every benchmark vs. the field"). Voice cue: "where do we sit on the percentile?" Buys with personal card so procurement is a non-issue.

### P5 — Priya, Agency CTO (new in this doc)
CTO of a 12-person AI implementation agency that builds custom agents for mid-market clients. Subscribes to Custom-slices at $199/mo on company card. Pulls 2-3 slices per active client engagement to defend the harness + model recommendation in client-facing decks. Voice cue: "I need this to read like a Bloomberg page, not a vendor page."

All five personas share three traits: (a) need a citation, not just an answer; (b) operate in environments where the choice will be questioned by someone senior; (c) treat the harness layer as load-bearing for their decision.

## 2. Primary user stories

Format: `As a <persona>, I want to <action>, so that <outcome>`. Each story is tagged with the layer(s) and tier(s) it touches, plus a story id for cross-reference from doc 12 and 13.

### S1 — Read this week's digest
**As Mira (Reader)**, I want to receive Monday's digest in my inbox by 09:00 GMT and click through any item to its source row, **so that I have a defensible weekly summary of what changed in LLMs, Agents, and Harnesses without spending 6 hours rebuilding my spreadsheet.**
*Layers: 1, 2, 3.* *Tiers: Reader+.* *Surface: email + digest archive page.*

### S2 — Browse the live cross-source scoreboard
**As Mira (Reader)**, I want to open the public scoreboard page and see the current cross-source rank for every tracked LLM, agent, and harness, with a footnote chip linking to the source row for each cell, **so that I can answer "what's best right now" mid-week without waiting for the next digest.**
*Layers: 1, 2, 3.* *Tiers: Reader+ (public preview for unauthenticated visitors with a 24h-stale notice).* *Surface: scoreboard page.*

### S3 — Filter the scoreboard to one layer
**As Felix (Custom-slices)**, I want to filter the scoreboard to a single layer (e.g. "Agents only") and a single benchmark family (e.g. "SWE-bench Verified"), **so that I can ground a single sentence in an IC memo with the corresponding cross-source rank.**
*Layers: any single layer.* *Tiers: Reader+ (public).* *Surface: scoreboard page (filter UI).*

### S4 — Request a custom slice
**As Sam (Custom-slices)**, I want to submit a free-text request like "our agent OpenLoop across every coding benchmark, last 90 days, all harnesses", **so that I get a PDF + CSV back within 24h with footnoted cross-source numbers I can paste into an investor update.**
*Layers: 1, 2, 3.* *Tiers: Custom-slices+.* *Surface: slice request form + email delivery.*

### S5 — Run an on-demand custom-slice query (self-serve API)
**As Priya (Custom-slices)**, I want to call `GET /v1/slice?layer=harness&model=sonnet-4.6&benchmark=swe-bench-verified&since=90d` with my API key, **so that my client-facing deck-builder script can refresh the numbers automatically before each Friday client review.**
*Layers: any.* *Tiers: Custom-slices+.* *Surface: REST API.*

### S6 — Subscribe via crypto without procurement
**As Mira (Reader)**, I want to pay $29/mo via NOWPayments (USDT, USDC, or BTC) without a corporate procurement form, **so that I can subscribe on the spot when my CTO asks "where's the source?" in the team standup.**
*Tiers: Reader, Custom-slices.* *Surface: pricing page → NOWPayments hosted invoice → confirmation email + entitlement upsert.*

### S7 — Compare a model across all harnesses
**As Sam (Custom-slices)**, I want to see "Sonnet 4.6 across Aider / Claude Code / Cursor / Codex CLI / plain SDK" on a single chart with a delta column, **so that I can pick the harness that gives the best price-performance for my use case before committing engineering time.**
*Layer: 3 (harness).* *Tiers: Reader+ for read; Custom-slices+ for downloadable artefact.* *Surface: scoreboard page (harness lens) + slice export.*

### S8 — Subscribe Enterprise with wire transfer
**As Asha (Enterprise)**, I want to receive a named-payer invoice (USDT direct or wire) and a single-tenant scoreboard URL `<my-org>.benchmark-intel.prin7r.com`, **so that my treasury can pay through standard procurement and my board pack cites a stable, branded URL each quarter.**
*Tiers: Enterprise.* *Surface: ops-issued invoice + tenant provisioning.*

### S9 — Audit a footnote chain
**As Asha (Enterprise)**, I want to click any score on the scoreboard and see the full provenance chain — source, retrieval timestamp, source version, normalisation rule applied — **so that I can answer compliance's "where did this number come from?" without leaving the page.**
*Layers: 1, 2, 3.* *Tiers: Reader+.* *Surface: footnote-chip drawer / modal.*

### S10 — Set a delta alert
**As Felix (Custom-slices)**, I want to set an alert "ping me when any model on Layer 1 moves more than 5 percentile points on cross-source", **so that I can catch a price-performance frontier shift the day it happens, not in the following Monday's digest.**
*Layers: any.* *Tiers: Custom-slices+.* *Surface: alert config UI + email/webhook delivery. Wave 3.*

### S11 — Get a methodology-bumped notification
**As Mira (Reader)**, I want a footnote on every affected row that says "methodology bumped 2026-04-12" for 30 days when an upstream changes its scoring rubric, **so that I don't unknowingly compare last week's number to this week's.**
*Layers: 1, 2, 3.* *Tiers: Reader+.* *Surface: scoreboard footnote chip + digest call-out + email if subscriber has alerts on.*

### S12 — Cancel and pro-rate
**As Mira (Reader)**, I want to cancel my subscription from a self-serve page and receive a pro-rated refund for unused days within the same billing month, **so that I don't have to email anyone or wait for support to close the account.**
*Tiers: Reader, Custom-slices.* *Surface: account settings page.*

## 3. Main scenarios (happy paths)

Each scenario is a narrative walkthrough. Frontend and backend touch-points are listed at the bottom. Story ids reference the list in §2.

### Scenario A — LLM benchmark scoreboard read (Mira, anonymous → Reader)
*Covers stories S2, S6, S1.*

**Trigger.** Mira sees a tweet linking to "this week's Triad digest — gpt-5-mini surpasses Sonnet 4.6 on terminal-bench." She clicks.

**Steps.**
1. **User does:** lands on `benchmark-intel.prin7r.com`. **System shows:** the public scoreboard page with the current cross-source rank, a 24h-stale watermark, the live-chip with model count, and a "subscribe to read this week's digest" CTA above the fold.
2. **User does:** scans the LLM rows; hovers cell `Sonnet-4.6 / SWE-bench Verified`. **System shows:** footnote chip pop-out — source: SWE-bench leaderboard; retrieved 2026-05-08T08:00Z; source_version `2026.05.07`.
3. **User does:** clicks "subscribe Reader $29/mo". **System shows:** NOWPayments hosted invoice page (in a new tab) with USDT default + chain dropdown.
4. **User does:** pays in USDT-TRC20 via her wallet. **System shows:** "Payment received" confirmation page on Triad after redirect.
5. **System (backend):** receives IPN webhook → verifies HMAC-SHA512 signature → upserts order row → grants `entitlement: reader` for the email used in the invoice → fires confirmation email with the digest archive link.
6. **User does:** opens her email; clicks the digest archive link. **System shows:** the full digest page (not the public preview) with all sections expanded and the "forward this to a colleague" link.

**Success criteria.**
- Order row exists with status `confirmed`, NOWPayments tx id, USD amount, token, chain, paid-at timestamp.
- `entitlements` table has `(user_email, reader, valid_through)` row.
- Digest archive page renders the latest digest in full to Mira's email link signed token.
- Mira's email arrives within 60s of the IPN webhook.

**Frontend touch-points.**
- `apps/landing/app/page.tsx` — hero + scoreboard preview + pricing.
- `apps/landing/app/api/checkout/nowpayments/route.ts` — invoice creation.
- `apps/app/scoreboard/` — full authenticated scoreboard (Wave 3).
- `apps/app/digest/<id>/` — digest archive page (Wave 3).
- `apps/app/account/` — entitlement + cancel UI (Wave 3).

**Backend touch-points.**
- `POST /api/checkout/nowpayments` (landing).
- `POST /api/webhooks/nowpayments` (HMAC-SHA512 verify, idempotent upsert keyed on order id).
- `orders` + `entitlements` tables.
- Postmark email send (transactional template `digest-welcome`).

### Scenario B — Agent benchmark drill-down (Sam, Custom-slices)
*Covers stories S3, S7, S5.*

**Trigger.** Sam, founder of OpenLoop (an agentic coding startup), is preparing the deck for next week's investor update. He needs the line "OpenLoop is in the top X% of agents on SWE-bench Verified across N harnesses" with a citation.

**Steps.**
1. **User does:** logs into `app.benchmark-intel.prin7r.com` (magic-link auth). **System shows:** the authenticated scoreboard with all rows, layer filter chips at the top, search bar.
2. **User does:** clicks the "Agents" layer chip + types `swe-bench-verified` in the benchmark filter. **System shows:** the agent leaderboard for SWE-bench Verified — rows sorted by cross-source percentile, a "harness" column visible because the layer is Agent (each agent runs on a specific scaffold).
3. **User does:** clicks "compare across harnesses" on the OpenLoop row. **System shows:** a panel with OpenLoop's score on every harness it has been run on (Aider / Claude Code / Cursor / plain SDK / custom), with a delta column vs. the median agent.
4. **User does:** clicks "export this slice (PDF + CSV)". **System shows:** a slice-id with status `queued`, ETA 24h banner.
5. **System (backend):** queues a slice job → renders PDF (with footnotes + delta column + percentile chart) → uploads to object store → emails Sam the signed URL (24h expiry).
6. **User does:** receives email; downloads PDF + CSV; pastes the chart into the investor deck.

**Success criteria.**
- Slice request row exists with `params`, `requested_by`, `delivered_at`, `pdf_url`, `csv_url`.
- PDF includes every cell footnoted to source row.
- CSV is parseable by pandas/duckdb without manual cleanup.
- 24h SLA met (delivered_at - requested_at < 24h) — a counter on the methodology page tracks the actual delivered SLA.

**Frontend touch-points.**
- `apps/app/scoreboard/agents/` (Wave 3) — agent layer filter + harness sub-pivot.
- `apps/app/slice/<id>/` (Wave 3) — slice status + download.
- `apps/app/slice/request/` (Wave 3) — slice request form (free-text + structured filters).

**Backend touch-points.**
- `POST /v1/slice` — slice job creation.
- `GET /v1/slice/:id` — slice status.
- `slice_jobs` table (status: queued / running / done / failed).
- Object store (R2 or local volume) for PDFs and CSVs.
- PDF renderer (headless Chromium against an MJML-style template).

### Scenario C — Harness benchmark direct comparison (Priya, Custom-slices via API)
*Covers stories S5, S7, S3.*

**Trigger.** Priya is preparing a Friday client review at her agency. The client wants to know whether to switch their internal coding harness from Cursor to Claude Code for their default Sonnet-4.6 deployment. Priya's deck-builder script runs at 16:00 Thursday and refreshes every chart on the deck.

**Steps.**
1. **System (backend):** Priya's script calls `GET /v1/slice?layer=harness&model=sonnet-4.6&benchmark=swe-bench-verified&since=90d` with header `Authorization: Bearer <priya_api_key>`.
2. **System:** auth middleware verifies key against `api_keys` table; rate limiter checks against the `custom-slices` plan limit (60 req/min).
3. **System:** query engine translates the parameters into a parameterised SQL against `canonical_scores` joined with `runs`, `harnesses`, `models`, `benchmarks`. Returns JSON with the rows + per-row footnote URLs + the cross-source aggregate value.
4. **System:** response envelope includes `meta.methodology_bumped_recent: false`, `meta.last_ingested_at: 2026-05-08T15:30Z`, `meta.cell_count: 14`, `meta.normalisation_version: v1.3.0`.
5. **User does:** Priya's script ingests the JSON; renders a sparkline-with-delta chart per harness; embeds it in the deck slide titled "Harness selection — Sonnet 4.6 / SWE-bench Verified, 90d cross-source."
6. **User does:** Priya delivers the deck to the client at 09:00 Friday. The delta is unambiguous (Claude Code +9 percentile points vs. Cursor) and the slide footnotes the API call timestamp + the methodology version.

**Success criteria.**
- API call returns 200 with valid JSON; latency p95 < 2s for slices touching <10k canonical rows.
- API key is recorded against the request (audit log entry: `(api_key_id, endpoint, params_hash, ts, response_size, status)`).
- Rate-limit headers are present (`X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`).
- A test re-running the same call produces the same `meta.normalisation_version` for the same `since` window.

**Frontend touch-points.** None for this scenario; this is API-only.

**Backend touch-points.**
- `GET /v1/slice` — query endpoint.
- `api_keys` table.
- Rate limiter (`Redis` / `in-memory` for MVP).
- Query engine (DuckDB-WASM at MVP; Postgres + read-replica at Wave 4).
- Audit log (`api_audit` table).

### Scenario D — Methodology audit (Asha, Enterprise)
*Covers stories S9, S11, S8.*

**Trigger.** Asha's regulatory compliance team has flagged a row in her last quarterly board pack with the comment "we need to see how this number was derived" before the board meeting on Thursday.

**Steps.**
1. **User does:** opens `<asha-org>.benchmark-intel.prin7r.com` (single-tenant Enterprise URL); logs in via SSO (SAML).
2. **User does:** navigates to the scoreboard archive; selects the Q1-2026 snapshot. **System shows:** the scoreboard exactly as it was at 2026-03-31T23:59Z, frozen.
3. **User does:** clicks the cell `gpt-5-mini / HELM v0.4.2 / accuracy`. **System shows:** the audit drawer with the full provenance chain:
   - Source: HELM v0.4.2.
   - Source url: `https://crfm.stanford.edu/helm/...` (resolves to a Wayback Machine archive captured on 2026-03-29).
   - Retrieved: 2026-03-30T04:00Z.
   - Source version at retrieval: `2026.03.28`.
   - Normalisation rule applied: `helm-mean-of-runs-v1.3.0` (link to rule definition).
   - Methodology bumped: 2026-02-12 (with diff link).
4. **User does:** copies the provenance hash and pastes it into the compliance ticket. **System shows:** a permanent `provenance:hash:...` URL she can quote in the regulator's response.
5. **System (backend):** logs the audit drawer access (`audit_log: (user_id, tenant, cell_id, ts, ip)`); ensures the snapshot endpoint is read-only (no possibility of post-hoc score change, enforced by snapshot table immutability).
6. **User does:** answers the compliance ticket within 30 minutes; the board meeting proceeds on schedule.

**Success criteria.**
- Snapshot endpoint returns identical bytes for the same `(snapshot_id, cell_id)` request 6 months later.
- Audit drawer renders the full chain in <500ms.
- Wayback Machine archive link is live (we proactively trigger Wayback captures on every source ingest).

**Frontend touch-points.**
- `<tenant>.benchmark-intel.prin7r.com/scoreboard/snapshot/:id` (Wave 3).
- Audit drawer component.

**Backend touch-points.**
- `GET /v1/snapshot/:id/cell/:cell_id` — provenance chain endpoint.
- `snapshots` table (immutable; insert-only).
- `audit_log` table.
- Wayback Machine trigger worker (post-ingest hook).
- SAML SSO middleware.

### Scenario E — Custom-slice query path (Felix, Custom-slices, free-text request)
*Covers stories S4, S3, S11.*

**Trigger.** Felix is pricing diligence on Lattice (a hypothetical agent startup that claims "leading on long-context coding"). He needs a one-off slice the day before the IC meeting.

**Steps.**
1. **User does:** logs into `app.benchmark-intel.prin7r.com`; navigates to "Request a slice".
2. **User does:** types the free-text request: "Lattice across all coding benchmarks, all harnesses, last 90 days, with a delta column vs. the next-best agent."
3. **System shows:** parsed structured form (auto-suggested) — `agent: lattice`, `benchmarks: [swe-bench-verified, swe-bench-lite, ...]`, `harnesses: all`, `since: 90d`, `delta_against: next_best_agent`. The user can correct the parse.
4. **User does:** confirms; submits. **System shows:** slice id `sl_2026_05_08_001`, ETA 18h.
5. **System (backend):** runs the slice as scenario B; the parser is a thin LLM call (gpt-5-mini) that emits a structured filter JSON; if confidence is low, the request goes to a human reviewer queue (ops Slack channel) for clarification before execution.
6. **System:** delivers PDF + CSV by email; Felix receives at 06:30 next morning.
7. **User does:** quotes the delta in the IC memo; cites the slice id + Triad URL as the source. The IC memo passes.

**Success criteria.**
- Free-text → structured filter parse is correct on first try ≥85% of the time (measured by ops-reviewer override rate).
- When parse confidence is low, the human reviewer responds within 4 working hours.
- Delivered SLA p95 < 24h (target: 18h median).
- Slice artefact contains a methodology block at the foot describing exactly which sources were combined.

**Frontend touch-points.**
- `apps/app/slice/request/` (Wave 3) — free-text input + parsed form.
- `apps/app/slice/<id>/` (Wave 3) — slice status.

**Backend touch-points.**
- `POST /v1/slice` (free-text path; calls the parser LLM).
- `slice_parser` worker (gpt-5-mini-backed; logs every parse with input/output for QA).
- `slice_review_queue` (Slack notification + ops dashboard).
- All of scenario B's touch-points after parse-success.

## 4. Edge case scenarios

### EC1 — Benchmark source disagreement
**Trigger.** ArtificialAnalysis says Sonnet-4.6 is at 76% on a coding-quality composite; HELM v0.4.2 says 71%; lmsys arena Elo translates to ~74%. Cross-source aggregation must produce a single normalised value per cell, but the spread is wide enough to be reported.

**Behaviour.**
- The aggregator computes the cross-source value as the median of normalised z-scores, plus a confidence interval based on per-source weight.
- When the inter-source spread exceeds a threshold (variance > 0.15 in normalised score), the cell renders with a *cinnabar* dashed underline + a "sources disagree" footnote chip.
- The footnote drawer shows each source's number side-by-side and links to each source row.
- The digest call-out includes a "this week's source disagreements" sub-section if any rows tripped the threshold.

**Frontend.** Footnote chip variant `variant="dispute"`. Drawer shows side-by-side source rows.

**Backend.** Aggregator emits `dispute_flag: true` + `dispute_sources: ["aa", "helm", "lmsys"]` + `dispute_spread: 0.18` on the canonical row.

### EC2 — New-model just-released gap
**Trigger.** A vendor (e.g. Anthropic) ships Sonnet-5.0 at 14:00 GMT on a Thursday. ArtificialAnalysis catches up within ~6 hours; SWE-bench leaderboard within ~48h; HELM within ~4 weeks. For the first 24h there is exactly one source with a number.

**Behaviour.**
- The model row appears on the scoreboard within 1h of detection (vendor blog ingest), but the cell renders with a "single-source" badge + a *muted* `?` chip in the cross-source rank column.
- The methodology footnote chip on the cell explicitly says "first verification at <ts>; cross-source rank withheld until ≥2 independent sources are available."
- When the second source ingests, the rank is computed and the `?` is replaced; the cell flashes a *signal-yellow* highlight for 24h to signal "newly cross-sourced."
- The model is *not* eligible for the weekly digest's "movement" call-outs until cross-source state is reached.
- The digest can still mention a "single-source first look" sub-section, explicitly labelled.

**Frontend.** `single-source` badge variant on the cell. Yellow highlight on first cross-source confirmation.

**Backend.** Canonical row carries `cross_source_state: pending | verified | disputed`. Aggregator skips `pending` rows for percentile rank.

### EC3 — Harness-comparison apples vs. oranges
**Trigger.** The same agent (e.g. Cline) is run on Claude Code with Sonnet-4.6 and on Cursor with GPT-5-mini. A naive comparison shows Cline-on-Claude-Code beating Cline-on-Cursor by 18 percentile points — but the underlying model is different.

**Behaviour.**
- The harness comparison panel locks the *model* dimension by default. To compare across harnesses, the same model must be the row constraint (e.g. "Cline + Sonnet-4.6 across all harnesses").
- If the user constructs a query that varies both model AND harness simultaneously, the result is rendered with a *muted* warning banner: "you are varying model and harness simultaneously; the delta is not attributable to harness alone."
- The slice export PDF includes a methodology box explaining which dimensions are locked vs. varied.
- The API rejects with `400 confounded_dimensions` if a slice request varies both `model` and `harness` without an explicit `?allow_confounded=true` flag (which then forces the warning banner into the artefact).

**Frontend.** Comparison panel auto-locks model when "compare across harnesses" is clicked. Warning banner on confounded queries.

**Backend.** Slice query validator enforces dimension-locking; returns explicit error when violated.

### EC4 — Citation staleness
**Trigger.** A scoreboard cell's `retrieved_at` is older than the cell's source's expected refresh interval (e.g. ArtificialAnalysis cell hasn't been re-ingested in >6h, vs. the hourly cadence). The number is technically still the latest published, but the user should know it's stale.

**Behaviour.**
- Each cell carries a `freshness_state` derived from `(retrieved_at, source_expected_refresh_interval)`: `fresh | stale | very_stale | source_offline`.
- `fresh` renders normally.
- `stale` (1× to 3× expected interval) renders with a *muted* clock icon next to the value; tooltip shows "last updated <Nh> ago; expected hourly."
- `very_stale` (>3× expected interval) renders the cell *greyed out* with the value still visible but de-emphasised; the cross-source aggregate may exclude this source for that cell.
- `source_offline` (>24h or explicit ingest worker error) renders the cell with a `—` and a footnote linking to the source-status dashboard.
- The Sources page on the public landing shows per-source `freshness_state` (already present in the design — the methodology source table).

**Frontend.** Cell renders pick up `freshness_state` and apply the correct class.

**Backend.** `freshness_state` recomputed at query time (or cached for 60s) from `(now() - retrieved_at, source.expected_interval)`.

### EC5 — Billing edge: failed crypto payment partial state
**Trigger.** A user starts a NOWPayments invoice but the crypto payment goes underpaid (less than the invoice amount due to gas fluctuations or wrong-amount transfer).

**Behaviour.**
- NOWPayments IPN sends `payment_status: partially_paid` with `pay_amount` < `price_amount` and `outcome_amount`. Triad does *not* grant entitlement.
- The user receives an email "your payment was received as partial; please send the remaining $X to the same invoice address within 12 hours" with the top-up amount and the invoice expiry.
- The order row stays in `partially_paid` state until either: (a) the top-up arrives → state advances to `confirmed` → entitlement granted; or (b) the invoice expires → state moves to `expired` → no entitlement.
- The user can also email `founder@prin7r.com` with the tx hash and request a manual confirmation; ops can override the order state with a documented audit trail.

**Frontend.** Confirmation page handles `partially_paid` with a clear "send remaining $X" message.

**Backend.** IPN handler discriminates on `payment_status`. State machine: `created → waiting → confirming → confirmed | partially_paid → confirmed | expired | failed`.

### EC6 — Concurrency / scale: Monday morning digest send
**Trigger.** ~500-2000 Reader subscribers all open the digest within a 30-minute window on Monday 09:00-09:30 GMT. The digest archive page is heavy (full scoreboard snapshot rendered).

**Behaviour.**
- Digest pages are statically generated at digest-publish time (Sunday night build) into the object store; the Monday request is a CDN fetch, not a DB query.
- The footnote-chip drawer is the only dynamic surface; it hits a small Postgres read-replica.
- Email send is fanned out via Postmark batches (250/min); a small Postmark queue worker spreads sends over 20 minutes to keep open-rate inboxing healthy.
- Authenticated scoreboard requests fall back to a paper-coloured "loading state" card if Postgres p95 exceeds 800ms (graceful degradation).

**Frontend.** Digest archive page is static; loading-state card has same dimensions as the live one (no layout shift).

**Backend.** Static-build worker. Email batcher. p95 latency monitor.

## 5. Anti-scenarios (out of scope by design)

### AS1 — We do not run our own benchmarks
We aggregate published benchmarks from third parties. We do not provision compute, run model inference, or score outputs ourselves. If a user requests "a new benchmark Triad runs internally", we decline and explain the conflict-of-interest reason on the methodology page.

**Why.** Running our own benchmarks would (a) double our cost and (b) create a conflict of interest (we'd be both the ranker and a runner). Our credibility is sourcing-based.

**What we do instead.** We aggregate, normalise, footnote, and publish.

### AS2 — We do not game scores
We never accept compensation from any model lab, agent vendor, harness vendor, or benchmark organisation. We never adjust the cross-source aggregate to favour or disfavour any vendor. Every weighting decision is documented on the methodology page and any change is announced 30 days in advance.

**Why.** Our entire moat is independence. If the audience has any reason to suspect the rank is manipulated, the product dies.

**What we do instead.** We publish the full normalisation rule set + change log; we welcome reproducibility audits from external research teams.

### AS3 — We do not predict closed-source upcoming releases
We do not publish expected release dates, expected scores, or any other forward-looking statements about closed-source products that have not yet been released. We do not maintain a "what's coming" page.

**Why.** Predictions are the opposite of a standing record. The product brand is empirical evidence of what *did* happen, not speculation about what *might*.

**What we do instead.** We publish the moment a real number is available from an independent source; we do not pre-announce.

### AS4 — We do not publish a single composite "best AI" score
We publish three layers (LLMs / Agents / Harnesses) with separate ranks. We never collapse these into one score.

**Why.** Doing so would require a vendor-comparable graphic, which our brand explicitly forbids. The user who wants a single number is not our user.

**What we do instead.** We surface layer-specific ranks and let the reader weight them.

### AS5 — We do not provide vendor-comparable graphics with logos
We never publish charts that arrange vendor logos as social proof. Vendor names appear as cell contents (with a small monospace label like `anthropic/sonnet-4.6`); they never appear as logos in marketing material.

**Why.** Logo charts read as paid promotion, even when they aren't. Our audience punishes that signal.

**What we do instead.** Cells. Footnotes. Cross-source numbers.

---

## Hand-off notes for the Wave 3 implementation agent

- Stories S1, S2, S6 are the absolute Wave 3 batch 1 minimum (Reader read + subscribe). Everything else is sequenced in `13-implementation-plan.md`.
- The harness layer (stories S5, S7) is the brand differentiator; it is *not* optional. Even a thin v1 (3 harnesses x 5 benchmarks x 3 models) ships in Wave 3 batch 1.
- All scenarios assume the canonical row schema in `12-technical-specification.md` §2. Any deviation is a doc-12 update first, code change second.
- Anti-scenario AS3 is a hard product rule. Implementation agent must reject any task that asks Triad to display predictive content.
