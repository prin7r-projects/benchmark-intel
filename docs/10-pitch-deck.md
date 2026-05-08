# 10 — Pitch deck (10 slides as Markdown)

## Slide 1 — Cover
**Triad** — the standing record of who is fastest, cheapest, and most correct in AI.

`benchmark-intel.prin7r.com` · 2026-05-08 · founder@prin7r.com

## Slide 2 — The problem
- AI engineers maintain private spreadsheets to compare LLMs, agents, and harnesses across vendor blogs, lmsys, ArtificialAnalysis, HELM, and SWE-bench. ~6h/week of senior engineer time. Defensible? No.
- Vendor leaderboards cherry-pick. Single-benchmark sites are siloed. HELM is rigorous but stale. The harness layer is not measured anywhere public.
- Eval leads, applied scientists, and diligence analysts need one trusted view. They don't have one.

## Slide 3 — The product
- A three-layer benchmark intelligence service. LLMs (Layer 1), Agents (Layer 2), Harnesses (Layer 3).
- A continuously updated cross-source scoreboard. Every cell footnotes the upstream source row and the retrieval timestamp.
- A weekly digest published Mondays 09:00 GMT. Three sections: LLM movements, Agent movements, Harness shifts. Each item is a single-sentence delta with a citation.
- On-demand custom slices ("best harness for Sonnet 4.6 on long-context coding") delivered as PDF + CSV with a 24h SLA.

## Slide 4 — Why us, why now
- The harness layer is brand new — it didn't exist as a product category 12 months ago. Claude Code, Codex CLI, and Cursor agent shipped in 2025. The harness market is now bigger than the academic-benchmark market and grows weekly.
- No incumbent owns the cross-source aggregator slot.
- We have a paid-from-day-one motion (NOWPayments crypto rails) that bypasses corporate procurement for the engineering-individual buyer.

## Slide 5 — Audience
- **Primary**: Mira, Eval Lead at a 60-person applied-AI startup. Subscribes to Reader at $29/mo on personal card. Renews monthly.
- **Secondary**: Felix, Diligence Analyst at a $400M AI fund. Pays $199/mo for Custom-slices. Quotes Triad in IC memos.
- **Tertiary**: Asha, Eval Lead at a F500 bank. Pays $1,499/mo Enterprise via wire transfer. Defends vendor selection in regulated review.

## Slide 6 — Business model
| Tier | Price | Audience | Channel |
|---|---|---|---|
| Reader | $29/mo | Mira | Self-serve, NOWPayments crypto |
| Custom-slices | $199/mo | Felix + small teams | Self-serve, NOWPayments crypto |
| Enterprise | $1,499/mo | Asha, F500 procurement | Sales-led, wire / USDT direct |

12-month run-rate target ~$550k ARR. 18-month run-rate target ~$1.0M ARR.

## Slide 7 — Methodology and credibility
- We never accept benchmark sponsorship. Funded by subscription only. Published policy.
- We aggregate; we do not run our own benchmarks. (May change in a later wave; will be flagged.)
- We pin a `source_version` on every ingested row. When an upstream changes its scoring rubric, we re-ingest and surface a "methodology bumped" footnote on every affected row for 30 days.
- Cross-source aggregation: every score is normalised into the canonical `{model_id, harness_id, benchmark_id, score, score_kind, n, ci, source_url, retrieved_at}` schema. The aggregator publishes a layer-aware percentile rank.

## Slide 8 — Traction and goals
- Wave 2 batch 1: landing live, methodology in draft, three-tier pricing, NOWPayments wired.
- Month 1: ~12k unique visitors, ~100 Reader subs, ~6 Custom-slices subs.
- Month 3: ~50k unique visitors, ~500 Reader subs, ~30 Custom-slices subs, 2 Enterprise pilots.
- Month 12: ~$550k ARR; 8 podcast appearances; 4 HN front-page hits; methodology library at 12 essays.

## Slide 9 — Team and operating principles
- Founder + Chief of Design + Chief of Opportunities (Prin7r org). Engineering capacity via the Prin7r build pipeline.
- Operating principles: (1) every revenue source tied to a named payer + invoice id + tx hash; (2) every published number footnotes its source; (3) zero vendor compensation.
- Build pace: a digest every Monday, a methodology essay every quarter, a cross-source check on demand, a 60-day retrospective every quarter.

## Slide 10 — Ask and CTAs
- **Subscribe**: Reader $29/mo at `benchmark-intel.prin7r.com/#pricing`.
- **Pilot Enterprise**: email `founder@prin7r.com` with org name, target board cadence, and three sample slice questions; we'll reply with a single-tenant pilot URL inside 48h.
- **Comp the analyst tier**: if you write at SemiAnalysis, Stratechery, or run a research desk at a fund — reach out for a 2-week comp.
- **Subscribe to the digest**: `benchmark-intel.prin7r.com/#digest`.
