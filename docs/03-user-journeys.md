# 03 — User journeys

We track three primary journeys: discovery, first value, and recurring use. A fourth journey for the diligence analyst persona is included as a bonus because their ACV is materially higher.

## Journey 1 — Discovery (Mira, Eval Lead)

1. **Trigger.** Mira sees a tweet from an AI-engineering account she follows that links to "this week's Triad digest — gpt-5-mini surpasses Sonnet 4.6 on terminal-bench."
2. **Click.** Lands on `benchmark-intel.prin7r.com`. Reads the headline, immediately scans the three-layer scoreboard.
3. **Recognises pattern.** Sees rows split into LLM / Agent / Harness sections, sees footnote chips next to every score, sees the live-chip showing model count. Says: "ok, this is rigorous."
4. **Reads methodology.** Scrolls past coverage triad → reads numbered methodology section → sees source table with named upstreams (HELM, SWE-bench, AgentBench, terminal-bench, OSWorld, lmsys, ArtificialAnalysis).
5. **Subscribes.** Clicks "Read this week's digest". Lands on the digest sample preview. Sees the email mockup. Clicks the digest tier ($29/mo). Hits NOWPayments hosted invoice. Pays in USDT.
6. **Confirmation.** NOWPayments redirects back. We email her the digest archive link. She is now a Reader subscriber.

**Time to value:** under 6 minutes from first click to first digest read.

## Journey 2 — First value (Mira, second visit)

1. **Trigger.** Monday morning. Mira opens the latest digest in her inbox. Headline: "Sonnet 4.6 + Claude Code is 14 points ahead of GPT-5 mini + Cursor on SWE-bench Verified."
2. **Reads digest.** Three sections: LLM movements, Agent movements, Harness shifts. Each item is a single sentence with a footnote and a delta number.
3. **Wants more.** Clicks "View the cross-source slice" on the SWE-bench item.
4. **Custom slice (paid).** Lands on `app.benchmark-intel.prin7r.com/slice/swe-bench` (Wave 3). For Wave 2 batch 1, this is a "request a custom slice" form that sends to ops with an SLA.
5. **Acts on the data.** Mira posts the slice to her internal #ai-eval Slack with the comment "we should switch our coding harness to Claude Code this sprint." Her CTO replies "+1, the source citations make this defensible."

**Outcome:** the digest plus one custom slice has paid for itself the first week. Mira renews monthly without churn.

## Journey 3 — Recurring use (paying Reader, month 2+)

1. **Mondays.** Mira opens the digest, skims the deltas, forwards the most relevant one to a Slack channel.
2. **Mid-week.** Internal question: "what's the best harness for long-context Sonnet?" Mira asks the Triad slice form. Receives an answer + citations within 24h SLA.
3. **End of quarter.** Mira pulls the digest archive into a board-deck slide. The same scoreboard layout reads as quarterly evidence. She doesn't have to recreate the visual.
4. **Re-onboarding.** A new eval engineer joins her team. Mira shares the digest archive link as required reading. New engineer is up-to-speed on the eval landscape inside one afternoon.

**Renewal logic.** Reader retention is high because (a) the digest replaces a recurring private spreadsheet, (b) the citations make each digest a defensible artefact for board reviews, (c) the custom slices are cheaper than the cost of running each benchmark internally.

## Journey 4 — Diligence (Felix, Analyst)

1. **Trigger.** Felix is pricing diligence on an agent startup that claims to be "the leading agent on SWE-bench Verified."
2. **Lands on Triad.** Searches `benchmark-intel.prin7r.com` for the startup name.
3. **Custom slice.** Pays $499 for a one-off "agent X across all benchmarks, all harnesses, last 90 days" slice.
4. **Receives slice.** PDF with cross-source numbers, footnotes, and a chart showing the agent's percentile rank versus the field. Includes a delta showing where the vendor's marketing number diverges from the cross-source value.
5. **Drops slice into IC memo.** Memo passes IC. Felix renews.

## Anti-journey (we will not optimise for)

- Marketing person looking for a press-friendly "this LLM beats this LLM" graphic. We do not publish vendor-comparable graphics; we publish cross-source numbers.
- Procurement person looking for a single composite "best AI" score. We deliberately do not publish a single composite; the page shows three layers with separate ranks.
