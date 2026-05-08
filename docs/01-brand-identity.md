# 01 — Brand identity

## Brand essence
**"Standing record."** Triad is the standing record of who is fastest, cheapest, and most correct in AI — across LLMs, Agents, and Harnesses.

## Brand pyramid

- **Essence (1 word)**: standing record.
- **Personality (3 traits)**: empirical, plain-spoken, footnoted.
- **Values (3)**: independence (no vendor sponsorship), reproducibility (every number traces to a source row), restraint (we publish what we can verify, no more).
- **Attributes (5)**: cross-source, normalised, audited, weekly-cadence, footnoted.

## Positioning statement
For AI engineers and research staff who need one trusted view of what is fastest, cheapest, and most correct in AI, **Triad is a benchmark intelligence service** that publishes a continuously updated cross-source scoreboard across LLMs, Agents, and Harnesses, **unlike** vendor leaderboards or single-benchmark dashboards **because** every number is traced to its underlying benchmark, normalised across sources, and footnoted on the page.

## Audience

### Primary persona — Mira, Eval Lead
- Role: eval lead at a 60-person applied-AI startup; reports to head of AI.
- Goals: stop running a private comparison spreadsheet every Monday; have one shareable link for "which model and harness should we be using this week"; defend the choice with sourced numbers in a quarterly board review.
- Frustrations: every benchmark site she trusts only covers one layer (LLMs *or* agents *or* harnesses); ArtificialAnalysis is fast but vendor-friendly; HELM is rigorous but stale; vendor pages cherry-pick.
- Channels: HN front page, lmsys/SWE-bench Twitter accounts, Latent Space podcast, internal Slack, monthly Bloomberg-style PDF her CTO forwards.
- Voice cues: technical, dry, asks "what's the source?" before asking "what's the answer?"

### Secondary persona — Felix, Diligence Analyst
- Role: investor at a $400M AI-focused fund; pricing diligence on labs and agent products.
- Goals: defend a fund position with citations; spot the moment a model release shifts the price-performance frontier; quote a single shared scoreboard in IC memos.
- Frustrations: sell-side reports are slow; "leaderboard" sites change methodology silently; vendor pitch decks omit the harness layer entirely.
- Channels: SemiAnalysis, Stratechery, his own Notion, broker calls, LinkedIn DMs.
- Voice cues: sceptical, asks "compared to what?" — wants a delta, not an absolute.

### Anti-persona
Hype-cycle media, leaderboard tourists who want a single "best LLM" answer, procurement teams looking for a marketing-grade comparison chart with vendor logos.

## Voice and tone

**Do:**
1. Lead with numbers, then explain.
2. Footnote every claim. If we cannot footnote it, we do not publish it.
3. Use the editorial first person plural ("we publish", "we measure"); never "I".

**Don't:**
1. Use marketing intensifiers ("game-changing", "10×", "next-generation").
2. Compare with logos. Vendor names appear as cell contents, never as social proof.
3. Imply causation without a controlled benchmark to back it.

**Sample sentence:** "Sonnet 4.6 is now 14 points ahead of GPT-5 mini on SWE-bench Verified, but the gap closes to 3 points when both are run inside Claude Code instead of plain SDK."

## Visual system

**Palette (5 + 4 utilities):**

| Token | Hex | Role |
|---|---|---|
| paper | `#F5F2EA` | page background |
| paper-2 | `#ECE7DA` | alt rows, surface-2 |
| ink | `#14171C` | type, masthead |
| graphite | `#2A2D33` | secondary type |
| rule | `#B7B0A0` | hairlines |
| muted | `#6E6A60` | metadata |
| signal | `#F2C744` | measurement highlight |
| cinnabar | `#C13A2A` | alert / delta |
| tide | `#2D5C5A` | reserved editorial accent |

**Typography:** IBM Plex Serif (display + editorial) + IBM Plex Sans (UI body) + IBM Plex Mono (measurements, kickers, tags). Tabular numerals across all numeric columns.

**Logo concept:** three stacked ink stripes representing the three layers (LLMs / Agents / Harnesses). The middle stripe is signal-yellow. The wordmark `TRIAD` sits to the right in IBM Plex Serif Medium with a tight kerning pass.

```
   ━━━━━━━━━━━━━━━━━━━
   ━━━━━━━━━━━━━━━━━━━   T R I A D
   ━━━━━━━━━━━━━━━━━━━
```

Inline SVG sketch (used in the masthead and footer):

```svg
<svg width="34" height="22" viewBox="0 0 34 22" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="0" y="0"  width="34" height="4" fill="#14171C"/>
  <rect x="0" y="9"  width="34" height="4" fill="#F2C744"/>
  <rect x="0" y="18" width="34" height="4" fill="#14171C"/>
</svg>
```

**Spacing scale:** 4 / 8 / 12 / 14 / 18 / 22 / 28 / 36 / 56 / 80 / 112.

**Radius scale:** 0 everywhere; only the live-dot is round (full pill).

**Motion principles:** restrained. Hover states are 80ms linear colour swaps. The only ambient motion is a 2.2s pulse on the live-chip dot, suppressed under `prefers-reduced-motion`.

**Forbidden:**
- Dashboard-purple gradients, glowing pills, animated number counters.
- Vendor logos as decoration.
- Drop shadows, glassmorphism, neon underlines.
- Reusing palettes from prior Wave 2 brands (Render, Cited, Cold Iron, Dispatch, Cadence, Frontline, Brassmark, Triangulate).

## Brand checklist (what makes a Triad asset look like Triad)

- [x] Paper background, never white.
- [x] Ink type, never pure black.
- [x] One yellow highlight per page maximum.
- [x] One cinnabar element per page minimum (the live dot, the delta column, or the focus ring).
- [x] Hairline rules under every group of rows.
- [x] Footnote chips on every claim.
- [x] Tabular monospace on every measurement.
- [x] Square corners. Print-grade margins.
