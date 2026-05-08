# 04 — Pain points (root-cause)

What follows is a root-cause-style failure analysis of the alternatives that AI engineers, eval leads, and diligence analysts currently use. The structure is: who they currently consult, what specifically goes wrong, and what Triad does instead.

## P1 — Vendor leaderboards cherry-pick

**Used today:** OpenAI's release post, Anthropic's release post, Google's release post, Meta's release post.
**What goes wrong:** Each vendor publishes the benchmarks on which they win. The "headline number" is a worst-case pick across all the benchmarks the user actually cares about.
- *Specific failure (2026-04, GPT-5-mini release):* the vendor blog claimed parity with Sonnet 4.6 on "agent tasks" but cited only one harness (their own SDK). Cross-source numbers showed parity collapsed inside Claude Code.
- *Why the user reads it anyway:* it's a Tuesday and the release just dropped.

**Triad fix.** A vendor blog row is treated as a *source*, not a *result*. We require independent third-party verification on at least one benchmark before the row is allowed onto the cross-source scoreboard.

## P2 — Single-benchmark sites are siloed

**Used today:** SWE-bench leaderboard, GAIA leaderboard, lmsys arena, ArtificialAnalysis, HELM.
**What goes wrong:** Each one shows one slice. The user has to maintain a private cross-source spreadsheet to make sense of them collectively. The fields don't line up: SWE-bench reports `pass@1 patch correctness`, lmsys reports `Elo`, ArtificialAnalysis reports `quality + speed + price`. Stitching them costs hours per week.
- *Specific failure (2026-03):* an eval lead spent ~6 hours building a Sonnet-4.6-vs-GPT-5-mini comparison; her CTO's first question was "what about Cursor's harness layer?", which she hadn't covered.

**Triad fix.** Cross-source normalisation. Every score lands in the canonical `{model_id, harness_id, benchmark_id, score, score_kind, n, ci, source_url, retrieved_at}` row, and the cross-source aggregator publishes a layer-aware percentile rank on each.

## P3 — Stale and slow

**Used today:** HELM, academic papers, conference talks.
**What goes wrong:** Stanford HELM is rigorous but cycles every 4–8 weeks. Papers are stale by the time they appear. By the time a user reads the analysis, two new model releases have shipped.
- *Specific failure (2026-04):* a fund analyst quoted a 6-week-old HELM number in an IC memo; the model in question had been deprecated mid-cycle. The IC memo was sent back for re-citation.

**Triad fix.** Hourly ingestion of fast sources (ArtificialAnalysis API), 6-hourly for medium sources (SWE-bench, lmsys), weekly digest cadence for the editorial layer. Footnotes on each cell record `retrieved_at`. The user can see when each number was last verified.

## P4 — No harness layer

**Used today:** every public benchmark site.
**What goes wrong:** Public benchmark sites publish results for `model + benchmark` pairs. Practitioners care about `model + benchmark + harness`. The same Sonnet 4.6 inside Claude Code performs differently than inside plain SDK or inside Cursor.
- *Specific failure (2026-04):* an applied-AI startup picked Cursor as their default harness based on a Twitter thread. Subsequent internal benchmarking showed Claude Code scored 11 points higher on their own task suite. ~2 weeks of engineer time was wasted.

**Triad fix.** Layer 3 of the product is the harness layer — comparing the same model+benchmark across different scaffolds (Aider, Claude Code, Cursor, Codex CLI, plain SDK, custom). This layer does not exist on any other public site as of Wave 2.

## P5 — Methodology drift inside the source

**Used today:** various leaderboards.
**What goes wrong:** Some leaderboards quietly change their methodology mid-cycle (different test split, different scoring rubric). The user is consuming data that's no longer comparable to last week's.
- *Specific failure (2026-02):* a popular agent leaderboard re-ran the test set with a new judge model; numbers shifted up by ~10 points across the board overnight, with no flag on the dashboard. Users reading the rank thought their model had improved; it had not.

**Triad fix.** We pin a `source_version` on every ingested row. When the source's version bumps, we re-ingest the entire history of that source and we surface a "methodology bumped" footnote on every affected row for 30 days.

## P6 — No defensible audit trail

**Used today:** screenshots from Twitter, charts in vendor decks, anything cited in board reviews.
**What goes wrong:** Eval leads, founders, and diligence analysts need to defend a claim three months later in a board review or IC memo. They have screenshots; they don't have receipts.
- *Specific failure (recurring):* board member asks "where does this number come from?", the founder shrugs, the slide is removed.

**Triad fix.** Every published number on Triad has a footnote chip → links to the source row. Every digest is archived with a permanent URL. Every custom slice is delivered as a PDF with footnotes. The artefact is defensible.

## P7 — Subscription pricing assumes one persona

**Used today:** academic-grade reports cost $thousands; vendor reports are free but biased; Twitter is free but unsourced.
**What goes wrong:** No-one prices a $29/mo digest for the eval-lead persona. The market jumps from "free + biased" to "$5k research report + biased differently". Mid-market eval leads are stuck running their own spreadsheets.

**Triad fix.** Three-tier pricing (`Reader $29/mo` / `Custom-slices $199/mo` / `Enterprise $1,499/mo`) with NOWPayments crypto rails so individual practitioners can subscribe without a corporate procurement loop.

## What we're explicitly *not* fixing

- We do not publish a single composite "best AI" score. We publish three layers with separate ranks. A user who wants the single number will not be served — they should look elsewhere.
- We do not run our own benchmarks. We aggregate published benchmarks. (A future wave may change this; until then, our credibility comes from sourcing, not from running compute.)
- We do not score safety. Safety benchmarks are out of scope until methodology in the field stabilises.
