# 07 — Sales strategy

## Motion: PLG with a sales-led Enterprise tier

- **Reader ($29/mo) + Custom-slices ($199/mo)** — pure self-serve, NOWPayments crypto checkout, no sales conversation, no procurement loop.
- **Enterprise ($1,499/mo)** — sales-led, named-payer invoice (USDT direct or wire), single-tenant scoreboard URL, custom report cadence.

This split is deliberate. The Mira persona buys with personal/team card on the spot; the Asha persona requires invoice + procurement. We do not force one motion to serve both.

## Pricing tiers

### Reader — $29/mo (NOWPayments)
- Weekly digest in inbox (Mondays 09:00 GMT).
- Read-only access to the cross-source scoreboard.
- Digest archive going back 12 months.
- Footnote-level provenance on every score.
- Cancel any time, no auto-renewal trap.

### Custom-slices — $199/mo (NOWPayments)
- Everything in Reader.
- Up to 4 custom-slice requests per month, 24h SLA, delivered as PDF + CSV.
- API access to the canonical scoreboard table (read-only).
- A named contact at Triad who reads your Slack/email thread.
- Invite-three-teammates seats on the reader app.

### Enterprise — $1,499/mo (named-payer invoice)
- Everything in Custom-slices.
- Single-tenant scoreboard URL (`<your-org>.benchmark-intel.prin7r.com`).
- Custom report cadence (weekly / monthly / quarterly board pack).
- Methodology audit pack: every cell footnoted to source row, signed digest archive, defensible against legal/risk review.
- Quarterly methodology review call.
- Wire transfer or USDT direct invoice (treasury-friendly).

## Pricing logic

- Reader is priced *under* the cost of replacing it with a private spreadsheet. A senior eval lead's hourly rate × ~6h/week is ~$1.5k/month. Reader is 2% of that.
- Custom-slices is priced *under* the cost of running a single benchmark internally (compute + engineer time = $1–5k per slice typically). 4 slices/month at $199/mo is ~10% of the build-it-yourself cost.
- Enterprise is priced *under* the cost of a $25k/year independent research subscription. $1,499/mo is ~70% of that, and Triad arrives weekly instead of annually.

## Objection handling

| Objection | Response |
|---|---|
| "Why should I trust your numbers?" | Every number footnotes the upstream source row + retrieval timestamp. Methodology page is published. We never accept benchmark sponsorship — see methodology page. |
| "Why not just use ArtificialAnalysis?" | ArtificialAnalysis covers Layer 1 only. We add Layer 2 (Agents) and Layer 3 (Harnesses) and we cross-source against multiple upstreams. We cite ArtificialAnalysis when their data feeds a row. |
| "Why not just use HELM?" | HELM is rigorous but cycles every 4–8 weeks. We surface deltas hourly. |
| "I can build this in a spreadsheet." | You can. 6h/week of senior engineer time. Reader is 2% of the cost of doing that internally. |
| "Crypto-only checkout is weird." | Reader and Custom-slices accept USDT/USDC via NOWPayments hosted invoice, which converts to a credit-card on-ramp at the merchant level. Enterprise accepts wire. We do not currently support direct credit-card checkout because of merchant-of-record constraints. |
| "How do I get a refund?" | Cancel any time. Pro-rated refund on Reader and Custom-slices for unused days within the same billing month. Enterprise refund per signed contract. |
| "What's your conflict-of-interest policy?" | We accept zero compensation from any model lab, agent vendor, harness vendor, or benchmark organisation. Funded by subscription only. Published on the methodology page. |
| "How is this different from a vendor leaderboard?" | A vendor leaderboard is paid for by the vendor whose product appears. We are not. We treat vendor blogs as *sources*, not as *results*, and we require independent verification on at least one benchmark before a row is allowed onto the cross-source scoreboard. |

## Funnel and metrics

- **Top of funnel**: 50k unique visitors/year by month 12 (organic Twitter + HN + cross-promo + podcast).
- **Reader conversion**: 1.5% of unique visitors → 750 Reader subs at $29/mo = $260k ARR baseline.
- **Custom-slices conversion**: 8% of Reader → ~60 Custom-slices subs at $199/mo = $143k ARR.
- **Enterprise conversion**: 2 closed/quarter at $1,499/mo = $144k ARR.
- **Total run-rate target by month 18**: ~$550k ARR.
- **Churn**: Reader < 4%/mo, Custom-slices < 2%/mo, Enterprise < 1 logo/year.

## Operating principles

- Never sponsor a leaderboard. Never accept vendor compensation. Funded by subscription only. Published policy.
- Every revenue source is tied to a named payer, invoice id, product, USD amount, token, chain, payment window, refund policy, tx hash on receipt.
- We do not over-promise the slice SLA. Custom-slices is 24h. We measure actual delivery and report it on the methodology page.
- We do not run our own benchmarks — that would create a conflict and double our cost. We aggregate and normalise. (May change in a later wave; will be flagged on the methodology page if so.)
