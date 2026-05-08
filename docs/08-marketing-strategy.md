# 08 — Marketing strategy

## Positioning

> Triad is the standing record of who is fastest, cheapest, and most correct in AI — across LLMs, Agents, and Harnesses.

We sit between vendor leaderboards (fast, biased) and academic reports (rigorous, stale). We give engineers a continuously updated, footnoted, cross-source scoreboard with three layers and a weekly digest.

## Messaging hierarchy

1. **One-liner.** "The standing record of who is fastest, cheapest, and most correct in AI."
2. **Sub-deck.** "We track every meaningful LLM, every meaningful agent, and the harness each one runs inside. Every score traces to a published source row. The cross-source aggregate is published weekly and audited continuously."
3. **Three pillars.**
   - *Cross-source* — we ingest from a dozen upstreams; every cell footnotes the source row and retrieval time.
   - *Three layers* — LLMs, Agents, and Harnesses are tracked separately because the same model in two scaffolds is two different products.
   - *Footnoted* — every claim has a citation. If we can't cite it, we don't publish it.
4. **Proof.** Methodology page; published source list; conflict-of-interest policy; archived digest history.
5. **Call to action.** Read this week's digest, or subscribe at $29/mo (Reader), $199/mo (Custom-slices), $1,499/mo (Enterprise).

## Content pillars

### Pillar 1 — The weekly digest
Cadence: Mondays 09:00 GMT.
Format: 800–1,200 words, three sections (LLM movements, Agent movements, Harness shifts), each item ≤2 sentences with a footnote and a delta.
Asset: a permalinked digest archive page that doubles as a board-deck citation source.

### Pillar 2 — Cross-source checks
Cadence: ad-hoc, ~2/month.
Trigger: a vendor blog claim diverges from our cross-source value by more than 5 percentile points.
Format: a 600-word post that walks the delta with footnotes.
Asset: each check ends up on Twitter and HN.

### Pillar 3 — Methodology essays
Cadence: ~1/quarter.
Format: 1,500–2,500 words, deep methodology. Examples: "How we normalise across HELM, lmsys, ArtificialAnalysis, and SWE-bench"; "Why we track the harness layer separately"; "What our 'methodology bumped' footnote means."
Asset: published in a `/methodology/` directory; shared on HN; pinned on the homepage masthead for two weeks after publication.

### Pillar 4 — Retrospectives
Cadence: ~1/quarter.
Format: 60-day retrospective on a model or agent release. "What we said the day Sonnet 4.6 shipped vs what cross-source numbers say 60 days later."
Asset: each retrospective is a paying-customer pull-through; we comp the analyst tier on retrospective publication days.

## Copy guidelines

- Lead with numbers, then explain.
- Footnote everything with `<sup>1</sup>`-style chips.
- Use the editorial first-person plural ("we publish", "we measure") — never "I", never "you should".
- No marketing intensifiers. No `10×`, no `game-changing`, no `next-generation`.
- Vendor names appear as cell contents, never as social proof. We do not write "Anthropic-trusted" or "as used at OpenAI".

## Sample copy (canonical reference for the landing page)

### Hero (display)
> The standing record of who is fastest, cheapest, and most correct in AI.

### Hero (sub-deck)
> Triad is a three-layer benchmark intelligence service. We track every meaningful LLM, every meaningful agent, and the harness each one runs inside. Every score traces to a published source row. The cross-source aggregate is published weekly and audited continuously.

### CTAs
- Primary: "Read this week's digest"
- Secondary: "View the scoreboard"

### Tracking strip
> TRACKING / 47 LLMs / 22 AGENTS / 9 HARNESSES / 11 SOURCES / UPDATED HOURLY

### Coverage triad
- *Layer 1 — LLMs*: Anthropic, OpenAI, Google, Meta, xAI, DeepSeek, Mistral, Qwen, open-weights, niche fine-tunes.
- *Layer 2 — Agents*: SWE-bench, GAIA, AgentBench, terminal-bench, OSWorld, plus product-mode agents (Claude Code, Codex CLI, Cursor agent, Aider, Devin-class).
- *Layer 3 — Harnesses*: same agent + same model across different scaffolds. Aider vs. Claude Code vs. Cursor vs. plain SDK vs. custom.

### Methodology (1-line)
> "We ingest, we normalise, we ground, we verify, we publish. Every cell footnotes the source row. We never accept benchmark sponsorship."

### FAQ themes
- How is this different from ArtificialAnalysis?
- How is this different from HELM?
- Where do you get the numbers?
- What happens when a source changes its methodology?
- Do you run your own benchmarks?
- How do I cancel?

## SEO strategy

- Target queries: "cross-source LLM benchmark", "agent benchmark comparison", "Claude Code vs Cursor benchmark", "SWE-bench leaderboard cross-source", "lmsys arena vs HELM".
- We do not target generic "best LLM" queries. Audience does not convert from those.
- Each methodology essay is the SEO surface; the homepage is anchored on brand.

## Launch sequence (excerpt — full plan in `09-go-to-market.md`)

- Week 0 (today): publish landing.
- Week 1: first weekly digest goes out; tweet thread; soft submit to a small AI newsletter.
- Week 2: methodology essay #1 ("How we normalise"); HN submission.
- Week 3: cross-source check #1 (against the most recent vendor release).
- Week 4: 60-day retrospective.
