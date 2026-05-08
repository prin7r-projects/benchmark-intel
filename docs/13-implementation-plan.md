# 13 — Implementation Plan

> **Hand-off ready.** This plan is for the Phase 2 implementation agent picking up Triad after Wave 2's marketing landing has shipped. You will find: (a) the deployed landing at `https://benchmark-intel.prin7r.com` with NOWPayments hosted-invoice checkout wired and verified; (b) brand identity / audience / architecture in `/docs/01..10-*.md`; (c) the user-story contract in `/docs/11-user-stories-and-scenarios.md` with 12 stories spanning three layers (LLMs / Agents / Harnesses) and three tiers (Reader / Custom-slices / Enterprise); (d) the technical spec in `/docs/12-technical-specification.md` covering the fan-in → normalise → store → fan-out pipeline. Wave 3 brings the data plane online: ingestion lanes, normaliser, aggregator, scoreboard app, and slice API. Read docs 11 + 12 before any phase. The hardest part of this build is provenance — every cell on the scoreboard must trace back to a source row via `provenance_hash`. Don't skip §1.3 in doc 12.

---

## 1. Phase breakdown

7 phases. Each has a verifiable Definition of Done.

| Phase | Goal | Effort |
|---|---|---|
| **0 — Scaffolding** | App + API + workers monorepo wired; landing untouched | S — 2-4h |
| **1 — Core domain (3 ingestion lanes + normaliser)** | Raw → canonical pipeline functioning for L1/L2/L3 | XL — 5-8d |
| **2 — UX surfaces (scoreboard + audit drawer + filters)** | Public scoreboard reads canonical store; footnote drawer cites source | L — 3-5d |
| **3 — Payments + Notion + onboarding** | Reader / Custom-slices / Enterprise checkout end-to-end | M — 2-3d |
| **4 — Production hardening** | Idempotency, rate limits, alerts, runbooks, CSP | M — 1-2d |
| **5 — Launch ops (digest + slice + alerts)** | Monday digest reliable; slice API live; delta alerts ship | L — 3-4d |
| **6 — Post-launch experiments (multi-tenant + harness lens + methodology bumps)** | Enterprise tenant URL; harness comparison view | M — 1-2d |

---

### Phase 0 — Scaffolding

**Goal.** A fresh clone produces all four service skeletons (`apps/landing`, `apps/app`, `apps/api`, `workers/*`) building locally, with the production landing untouched.

**Tasks.**
1. Verify Wave 2 state: clone repo, confirm `pnpm -F landing build` works, `https://benchmark-intel.prin7r.com` returns 200.
2. Read `/docs/12-technical-specification.md` §1 (services + ports) and §1.2 (three ingestion lanes).
3. Add `apps/app/` Next.js 15 + Auth.js + Drizzle. Magic-link auth.
4. Add `apps/api/` Bun + Hono per doc 12 §1.1 (port `:3010`).
5. Add `workers/{ingest-llm,ingest-agent,ingest-harness,normaliser,aggregator,digest,slice}/` skeletons. Each is a Bun project with a `pnpm dev` and `pnpm build`.
6. Add `docker-compose.yml` services for each, with Traefik labels for `landing`, `app`, `api` only (workers are internal).
7. Add Postgres 17 + Redis 7 services to compose. Persist via volumes.
8. Add `.env.example` listing every variable from doc 12 (NOWPAYMENTS_API_KEY, NOWPAYMENTS_IPN_SECRET, ADMIN_API_KEY, DATABASE_URL, REDIS_URL, ARTIFICIALANALYSIS_TOKEN?, etc.).

**Dependencies.** None.

**Effort.** S — 30-50 tool-uses, 2-4h.

**DoD.**
- [ ] `pnpm install` clean.
- [ ] `pnpm -F landing build` produces standalone (production unchanged).
- [ ] `pnpm -F app dev` starts Next.js on `:3001`.
- [ ] `pnpm -F api dev` starts Bun + Hono on `:3010`.
- [ ] Each `workers/*` package has a working `pnpm dev` (no-op stub OK).
- [ ] `docker compose up postgres redis` brings DB + cache online; `docker compose ps` shows them healthy.
- [ ] Production `https://benchmark-intel.prin7r.com` still returns 200.

**Hand-off context.**
- The landing is untouched in Phase 0. Don't touch its Dockerfile or compose entry.
- `apps/app` and `apps/api` get separate Traefik routers (`app.benchmark-intel.prin7r.com`, `api.benchmark-intel.prin7r.com`). The Phase 3 deploy adds the DNS records (covered by wildcard, just Traefik labels).
- Workers run in the same Docker network but expose no ports. They write to Postgres + Redis directly.

---

### Phase 1 — Core domain (3 ingestion lanes + normaliser)

**Goal.** The L1 / L2 / L3 ingestion lanes pull from real public sources, store `raw_runs` rows, and the normaliser emits `canonical_scores` rows ready for the aggregator. This is the bulk of Wave 3 effort.

**Tasks.**
1. Implement Drizzle schema per doc 12 §2 (raw_runs, canonical_scores, models, benchmarks, harnesses, dispute_flags, methodology_bumps, provenance_chain).
2. **Lane 1 (LLM):** worker `ingest-llm` pulls hourly from ArtificialAnalysis API + chatbot-arena (every 6h) + HuggingFace Open LLM Leaderboard (every 6h) + HELM (weekly). Stanford HELM is HTML-scraped (no public JSON); pin the page version.
3. **Lane 2 (Agent):** worker `ingest-agent` pulls SWE-bench + GAIA + AgentBench + terminal-bench + OSWorld + WebArena + MLE-Bench. Each source has its own scraper / client.
4. **Lane 3 (Harness):** worker `ingest-harness` joins SWE-bench's harness column with the Aider / Claude Code / Cursor / Codex CLI / Cline / plain-SDK GitHub repos.
5. Vendor blog manual lane: a markdown file `data/manual-runs/2026-MM-DD-vendor.md` is parseable by the normaliser. Vendor blog rows are NEVER auto-published.
6. Normaliser worker: takes `raw_runs` events from Redis pub/sub, applies the 5-step pipeline (identify → score-kind → confidence → version → provenance hash), emits `canonical_scores`.
7. Identity table (`models`) hand-curated initially. Missing identities go into a `model_review_queue`.
8. Methodology-version pinning: when a source's `source_version` changes, re-ingest history + emit `methodology_bumped` event.
9. Provenance hash: `sha256(source_url + retrieved_at + source_version + raw_payload_hash)`. Stored on every `canonical_scores` row.

**Dependencies.** Phase 0.

**Effort.** XL — 400-700 tool-uses, 5-8 days.

**DoD.**
- [ ] L1 ingest runs hourly; raw rows for 5+ models appear within 1h.
- [ ] L2 ingest runs at 6h cadence; SWE-bench rows for top-10 agents appear within 6h.
- [ ] L3 ingest joins harness column from SWE-bench with at least 5 harness repos.
- [ ] Normaliser produces `canonical_scores` rows with valid `provenance_hash` for 100% of `raw_runs` (no orphans).
- [ ] Methodology bump simulated: change a `source_version`, verify re-ingest + `methodology_bumped` event emitted.
- [ ] Vendor blog row from a manual file appears in `canonical_scores` only after explicit `pnpm -F normaliser publish-manual <file>` run.

**Hand-off context.**
- Sources may rate-limit you. ArtificialAnalysis caps free tier at 100 req/day; budget calls. Use ETag if available.
- Stanford HELM HTML is brittle — pin the page version, store in `raw_runs`. If the structure changes, fall back to last good version + queue manual review.
- Identity matching is the highest-friction part. Build a `model_review_queue` UI in `apps/app` (Phase 2) for a human to triage unmatched vendor strings.
- Provenance hash MUST be stable across re-ingests. Don't include `retrieved_at` if the source hasn't changed (re-derive from raw_payload_hash).

---

### Phase 2 — UX surfaces (scoreboard + audit drawer + filters)

**Goal.** The public scoreboard reads from `canonical_scores`, supports layer + benchmark + harness filters, and the footnote-chip drawer cites the full provenance chain.

**Tasks.**
1. Public scoreboard at `app.benchmark-intel.prin7r.com/scoreboard` (or root of `apps/app`). Server-rendered table with sticky header + virtualized rows for 100+ models.
2. Filters: layer (LLM/Agent/Harness), benchmark family, harness, time-window (7d / 30d / 90d).
3. Footnote chip on every cell. Click → drawer slides in with provenance chain (source URL, retrieval timestamp, source version, normalisation rule applied, provenance hash).
4. Methodology-bump banner — when a row has an active `methodology_bumped` event, show inline call-out for 30 days.
5. Public unauthenticated preview: shows top 20 rows; "subscribe to see full table" CTA.
6. Mobile view: 320 / 768 / 1440 widths pass content audit. Filter UI collapses to a sheet on mobile.
7. Auth.js magic-link for Reader+ tier. Session cookie httpOnly secure samesite=lax.

**Dependencies.** Phase 1 (canonical store).

**Effort.** L — 200-400 tool-uses, 3-5 days.

**DoD.**
- [ ] Scoreboard renders 100+ rows in <2s p95 on desktop with no layout shift.
- [ ] Layer + benchmark filters update the table in <300ms.
- [ ] Audit drawer shows full provenance chain for every cell, including provenance_hash visible to the user.
- [ ] Methodology-bump banner renders when a row has the active event.
- [ ] Unauthenticated preview limits to 20 rows + visible CTA.
- [ ] Mobile audit passes at 320 / 768 / 1440.
- [ ] Lighthouse a11y >= 95 on scoreboard page.

**Hand-off context.**
- Use TanStack Table for the scoreboard — virtualized rows are a hard requirement (100+ rows).
- Audit drawer should match the brand voice: Bloomberg page > vendor page. JetBrains Mono for hash + version. Restrained.
- Don't load full provenance for every cell upfront; lazy-fetch on drawer open via `GET /v1/provenance/:hash`.

---

### Phase 3 — Payments + Notion + onboarding

**Goal.** Reader $29/mo / Custom-slices $199/mo / Enterprise $1,499/mo flows end-to-end. Magic-link onboarding email delivered. Notion `Triad Subscriptions` data source synced.

**Tasks.**
1. Persist subscriptions in DB on `POST /api/checkout/nowpayments`. Each subscription has `tier`, `customerId`, `nowpaymentsInvoiceId`, `validUntil`.
2. Webhook handler: idempotent on `(orderId, paymentStatus)`. On `finished`, mark sub `active`, issue API key (Custom-slices+), send onboarding email.
3. Recurring billing: NOWPayments doesn't support recurring; Triad uses month-by-month invoice email cadence (Postmark template "Your next month's invoice is ready"). Customer clicks → fresh hosted invoice.
4. Enterprise: `POST /api/admin/invoices` with `tier=enterprise`. Concierge-issued. Returns hosted invoice URL.
5. Magic-link onboarding email post-payment: dashboard link + API key (if applicable).
6. API key minted via `crypto.randomBytes(32)` base64; hashed in DB; surfaced once to customer.
7. Notion sync: paid subscriptions → Notion data source `Triad Subscriptions` (`NOTION_SUBS_DSID`).

**Dependencies.** Phase 1, Phase 2.

**Effort.** M — 100-180 tool-uses, 2-3 days.

**DoD.**
- [ ] Reader $29 purchase end-to-end: NOWPayments unpaid invoice → simulated paid IPN → subscription active → magic-link email.
- [ ] Custom-slices $199 purchase mints an API key. Key works on `GET /v1/slice` within 1 min.
- [ ] Enterprise via `POST /api/admin/invoices` returns hosted invoice URL within 1.5s p95.
- [ ] Notion `Triad Subscriptions` row appears for every paid subscription.
- [ ] Month-2 invoice email goes out at `validUntil - 7d` cron.

**Hand-off context.**
- NOWPayments lacks recurring billing — work around by emailing fresh invoices each cycle.
- API keys hashed in DB; never logged.
- `PRIN7R_NOTION_TOKEN` in `/Users/keer/.nth-kir-keys.env`; loaded via `NOTION_TOKEN` env at container start.

---

### Phase 4 — Production hardening

**Goal.** System survives traffic spikes, forged IPN, source-of-truth API outages, scraper failures.

**Tasks.**
1. Idempotency on `/api/checkout/nowpayments` keyed by `(customerEmail, tier, hour)`.
2. Traefik rate limits per doc 12 §7 (assume same model: `/api/checkout/*` 30 req/min/IP, `/api/webhooks/*` 600 req/min total, `/v1/slice` 60 req/min/key).
3. Forged-IPN tests in `apps/api/__tests__/webhooks.test.ts`.
4. Admin-key rotation runbook at `/docs/runbooks/rotate-admin-key.md`.
5. Slack alerts: webhook sig failures, ingestion lane failures (lane down for >2 cycles), digest run failures, daily revenue anomalies.
6. PII scrub in stdout logs.
7. CSP headers on landing + scoreboard.
8. Scraper resilience: each ingestion lane wraps in try/catch with exponential backoff; on persistent failure, lane pauses + alerts.
9. Dispute flag: when inter-source variance > threshold for a `(model_id, benchmark_id, harness_id)` triple, set `dispute_flag: true` and surface in audit drawer.

**Dependencies.** Phase 3.

**Effort.** M — 80-120 tool-uses, 1-2 days.

**DoD.**
- [ ] Idempotency: same body 5x produces ONE invoice + ONE subscription.
- [ ] Forged IPN with bad sig returns 401, no subscription activated.
- [ ] Slack `#alerts-triad` receives test messages from each alert path.
- [ ] CSP header present on every landing + scoreboard response.
- [ ] PII scrub regex tested with real-shaped payload.
- [ ] Scraper failure simulation: a lane down for 2 cycles triggers Slack alert + auto-pauses lane.
- [ ] Dispute flag visible in audit drawer for a seeded high-variance cell.

**Hand-off context.**
- Traefik rate limits at the edge, not in app code.
- Per-API-key rate limit at the API service: 60 req/min/key for `/v1/slice` (Custom-slices tier). Enterprise gets 600 req/min/key.
- Webhook test suite uses Vitest + Supertest. Don't hit live NOWPayments.

---

### Phase 5 — Launch ops (digest + slice + alerts)

**Goal.** Monday digest delivered reliably; slice API serves Custom-slices+ customers; delta alerts (S10) ship for Custom-slices+.

**Tasks.**
1. Worker `digest`: runs every Monday 09:00 GMT. Builds MJML template, computes weekly deltas per layer / benchmark, sends Postmark template to Reader+ subscribers.
2. Slice API: `GET /v1/slice?layer=...&model=...&benchmark=...&since=...&format=json|csv|pdf`. PDF rendered via `worker-slice` (headless Chromium → PDF). PDF + CSV uploaded to S3-compatible storage (storage-contabo MinIO).
3. Slice request form (UI in `apps/app`): free-text request → enqueues a `slice` worker job → emails customer when ready.
4. Delta alerts: customer configures `(layer, benchmark, threshold_percentile_points)` → cron evaluates at every aggregator run → fires email/webhook on threshold breach.
5. Account self-service: cancel + pro-rate (S12 in doc 11). `POST /api/account/cancel` computes pro-rated refund via NOWPayments admin path.
6. Audit log surfaced in `apps/app`: every API key call logged with `(timestamp, key_hash, endpoint, status)`. Visible to the customer for their own key.

**Dependencies.** Phase 1, Phase 3, Phase 4.

**Effort.** L — 200-300 tool-uses, 3-4 days.

**DoD.**
- [ ] Monday digest delivered to a test inbox at 09:00 GMT with current week's deltas.
- [ ] `GET /v1/slice` with valid API key returns JSON in <2s p95; CSV in <2s; PDF (queued) in <60s.
- [ ] Slice request form → email delivery within 24h (manual ack initially; full async in Wave 4).
- [ ] Delta alert fires when a seeded cell crosses threshold.
- [ ] Cancel flow refunds pro-rated amount; subscription marked `cancelled`.
- [ ] Audit log visible in customer dashboard.

**Hand-off context.**
- Headless Chromium for PDF: use Playwright in `worker-slice`. Pre-install Chromium in the worker image.
- Slice format: PDF must look "Bloomberg-like" — JetBrains Mono numbers, restrained layout, footnote chain visible.
- Delta alert webhook: HMAC-signed by `ALERT_WEBHOOK_SECRET` so customer can verify.

---

### Phase 6 — Post-launch experiments (multi-tenant + harness lens + methodology bumps)

**Goal.** Enterprise multi-tenant URL (`<my-org>.benchmark-intel.prin7r.com`). Harness comparison view. Methodology-bump notification flow.

**Tasks.**
1. Multi-tenant: each Enterprise customer gets a subdomain (`<slug>.benchmark-intel.prin7r.com`). Wildcard cert from Traefik (already covered by `*.prin7r.com`). Tenant-scoped scoreboard with custom branding (logo + colors).
2. Harness lens: a dedicated view `app.benchmark-intel.prin7r.com/harness/:harnessId` showing all `(model, benchmark, score)` rows for that harness. Comparable across harnesses via the cross-source z-score.
3. Methodology-bump notifications: when a `methodology_bumped` event fires, all subscribers with alerts on the affected rows receive an email + the digest call-out.
4. Public `/changelog` page: methodology bumps, new sources added, dispute resolutions.

**Dependencies.** All prior.

**Effort.** M — 80-120 tool-uses, 1-2 days.

**DoD.**
- [ ] Enterprise tenant `acme.benchmark-intel.prin7r.com` resolves and shows the Acme-branded scoreboard.
- [ ] Harness lens at `/harness/aider` shows all `(model, benchmark)` rows for Aider.
- [ ] Methodology-bump notification email sent to alert subscribers within 1h of event.
- [ ] `/changelog` page lists last 30 days of bumps + new sources.

**Hand-off context.**
- Wildcard cert is already in place (`*.prin7r.com`). Traefik routes by Host header.
- Tenant branding: logo + primary color stored in `tenants` table; rendered via CSS variable injection.
- Don't break the public scoreboard with experiment-gated UI.

---

## 2. Cross-cutting concerns

| Concern | First addressed | Notes |
|---|---|---|
| Accessibility | Phase 2 | Lighthouse a11y >= 95 each phase; focus-visible on filters + drawer |
| i18n | NOT in scope through Wave 4. English-only |
| Mobile | Phase 2 | Responsive scoreboard; native apps NOT in scope |
| Telemetry | Phase 4 | Stdout JSON logs; Loki Wave 4+ |
| GDPR / DSAR | Phase 4 | Email-only PII; runbook in `/docs/runbooks/gdpr-dsar.md` |
| SOC 2 | Out of scope through Wave 5 |

---

## 3. Risk register

| # | Risk | Owner | Mitigation |
|---|---|---|---|
| R1 | Source rate-limits / scraper bans (HELM, lmsys) | Phase 1 | Cache aggressively (ETag); throttle to half of doc'd cap; rotate user-agent string |
| R2 | Identity-matching error (wrong model_id) leaks into canonical_scores | Phase 1 | Hand-curated identity table; review queue for unknown vendor strings; prov hash makes errors auditable |
| R3 | Inter-source variance creates dispute flags faster than ops can triage | Phase 4 | Auto-flag + surface in drawer; weekly Concierge review |
| R4 | NOWPayments outage during launch | Phase 3 | Plisio + Reown wired Wave 4; concierge fallback to direct USDT invoice |
| R5 | Enterprise tenant branding fails to load on mobile | Phase 6 | CSS-variable injection + fallback to default brand at all viewports |
| R6 | PDF slice queue saturates during digest week | Phase 5 | Separate queue concurrency for slice (4 concurrent) vs digest (1); rate-limit per-key |

---

## 4. References

- Doc 11 — `/docs/11-user-stories-and-scenarios.md` — drives all 12 stories + scenarios.
- Doc 12 — `/docs/12-technical-specification.md` — schemas, fan-in/fan-out, normalisation pipeline, performance budgets.
- Doc 02 — `/docs/02-architecture.md` — higher-level system framing.
- DESIGN.md — `/DESIGN.md` — Bloomberg-page visual contract.
- Wave 2 build report — `/Users/keer/projects/prin7r/wave2-reports/benchmark-intel.md` (when created) — production state.
- Payments prototypes — `/Users/keer/projects/prin7r/payments-prototypes/` — NOWPayments + Plisio + Reown reference impl.
