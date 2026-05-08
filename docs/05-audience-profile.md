# 05 — Audience profile

## ICP — Ideal Customer Profile

A 30–500 person company building AI-powered software, where:

- Someone in the team is on the hook for "which model and harness should we be using?" — usually titled eval lead, applied scientist, ML engineer, head of AI, or a staff engineer with AI scope.
- The team uses at least two LLM vendors.
- The team uses at least one agentic coding scaffold (Claude Code, Cursor, Codex CLI, Aider, or a custom one).
- The decision needs to be defended quarterly (board, IC memo, customer SLA, or internal review).

ACV expectation: `Reader $29/mo` for individuals, `Custom-slices $199/mo` for small teams, `Enterprise $1,499/mo` for orgs.

## Persona 1 — Mira, Eval Lead

- **Role.** Eval lead at a 60-person applied-AI startup; reports to head of AI.
- **Day.** Runs internal evals on every new model release; maintains a private comparison spreadsheet; presents quarterly to the board.
- **Goals.**
  - Stop hand-rolling the comparison.
  - Have one shareable link to defend "which model + harness should we use this week".
  - Build a defensible eval narrative across quarters.
- **Pains.**
  - Vendor pages cherry-pick.
  - Single-benchmark sites are siloed.
  - Stanford HELM is rigorous but stale.
  - Twitter is fast but unsourced.
  - The harness layer is invisible on every public site.
- **Channels she lives in.** HN front page, lmsys/SWE-bench Twitter, Latent Space podcast, internal Slack, monthly Bloomberg-style PDF, Stratechery, SemiAnalysis.
- **Voice cues.** Technical, dry, asks "what's the source?" before "what's the answer?". Uses lowercase in Slack. Hates "10×" copy.
- **Buying authority.** Personal card / corporate card up to $200/mo. Above that requires a procurement form. **NOWPayments crypto path lets her bypass procurement for the Reader and Custom-slices tiers.**
- **Time-to-decide.** Minutes to subscribe to Reader, hours to subscribe to Custom-slices, weeks for Enterprise.
- **Triad value to her.** Replaces ~6h of weekly spreadsheet work with a $29 link. Custom slices are cheaper than re-running benchmarks internally.

## Persona 2 — Felix, Diligence Analyst

- **Role.** Investor at a $400M AI-focused fund; pricing diligence on labs and agent products.
- **Day.** Reads sell-side reports, vendor decks, and Twitter; ships an IC memo every 1–2 weeks.
- **Goals.**
  - Defend a fund position with citations.
  - Spot the moment a model release shifts the price-performance frontier.
  - Quote a single shared scoreboard in IC memos.
- **Pains.**
  - Sell-side reports are slow and biased.
  - Vendor decks omit the harness layer.
  - "Leaderboard" sites change methodology silently.
  - One-off custom research costs $5k+.
- **Channels he lives in.** SemiAnalysis, Stratechery, his own Notion, broker calls, LinkedIn DMs.
- **Voice cues.** Sceptical, asks "compared to what?" — wants a delta, not an absolute.
- **Buying authority.** Fund expense up to $5k without committee approval.
- **Time-to-decide.** Hours for Custom-slices, weeks for Enterprise.
- **Triad value to him.** A footnoted slice he can paste into an IC memo. A digest that surfaces the moment a competitor's claim diverges from cross-source numbers.

## Persona 3 (secondary) — Asha, Internal Eval at a Fortune-500

- **Role.** Eval lead at a 5,000-person bank's AI Centre of Excellence; procuring an LLM vendor.
- **Day.** Runs RFP cycles, defends choices to legal + risk + compliance, attends quarterly vendor reviews.
- **Goals.**
  - Defend a vendor selection against three internal stakeholders (legal, risk, IT).
  - Show year-over-year trend of the chosen vendor versus the field.
  - Have a permanent archive of who-was-best-when.
- **Pains.**
  - Vendor pitch decks are unciteable in regulated review.
  - Annual independent reports cost $25k+ and arrive 6 months late.
  - Risk team requires reproducible methodology.
- **Buying authority.** Fits Enterprise tier ($1,499/mo). Requires invoice + procurement. **Bank treasury cannot pay in crypto** — Enterprise tier MUST support stablecoin direct invoice via Triad's named-payer process or wire transfer; documented in `07-sales-strategy.md`.
- **Triad value to her.** Permanent archive + reproducible methodology footnotes + named-payer invoice = defensible procurement choice.

## Anti-personas

- Hype-cycle media looking for a "best LLM" headline.
- Procurement teams looking for vendor logos and stars.
- Casual leaderboard tourists.
- Researchers running their own ablation studies (we aggregate; we do not run; this is a different product).

## Distribution channels (where they read)

| Channel | Persona | How we show up |
|---|---|---|
| HN front page | Mira | Triad digest items get organic shares; our methodology page is HN-friendly |
| lmsys / SWE-bench Twitter | Mira | We tag the upstream when we cite their numbers in the digest |
| Latent Space podcast | Mira | We pitch the host with one-pagers when the digest covers a movement that matters |
| SemiAnalysis | Felix | We comp Felix-tier subscribers a free 2-week trial |
| Stratechery | Felix | Same |
| Bank-side AI conferences | Asha | Enterprise sales motion, not Wave 2 batch 1 |
