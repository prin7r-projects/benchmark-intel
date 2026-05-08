# 09 — Go-to-market (90-day plan)

## Pre-launch (today)

- Landing live at `benchmark-intel.prin7r.com` with the three-layer scoreboard, methodology section, digest preview, three-tier pricing with NOWPayments CTAs, and FAQ.
- Methodology page in draft (linked but not yet pinned).
- Source ingestion stubbed — the scoreboard rows shown publicly are the most recently published cross-source state.
- Three-tier NOWPayments invoices live; webhook verifying HMAC-SHA512.

## Week 1 — soft launch

- *Mon.* First weekly digest goes out to the founder's network (~120 hand-picked contacts: AI engineers, eval leads, an analyst friend at SemiAnalysis, two podcast hosts).
- *Tue.* Twitter thread: "Triad is now publishing. Here's what's in the first digest."
- *Wed.* DM 30 hand-picked Mira-persona contacts asking for feedback. Goal: 6 reactions, 2 unsolicited shares.
- *Thu.* First cross-source check published if a candidate movement exists; otherwise hold for week 2.
- *Fri.* Internal retro: what worked, what didn't.

KPIs: 800 unique visitors, 12 Reader subs, 1 Custom-slices sub, 0 Enterprise (expected).

## Week 2 — methodology essay #1

- *Mon.* Digest #2 (now with feedback adjustments).
- *Tue.* Publish methodology essay #1: "How we normalise across HELM, lmsys, ArtificialAnalysis, and SWE-bench."
- *Wed.* Submit essay to HN at 09:00 ET. Submission title: a calm specific statement, not a headline.
- *Thu.* Engage in the HN comments. Answer methodology questions inline. Update the essay with corrections if any.
- *Fri.* Weekly retro + decide on essay #2 topic.

KPIs: 4k unique visitors, +30 Reader subs, +2 Custom-slices subs.

## Week 3 — cross-source check + first podcast

- *Mon.* Digest #3.
- *Wed.* First podcast guest spot (Latent Space pitch already in motion). Topic: "the harness layer no-one is measuring."
- *Thu.* Cross-source check #1 against the most recent vendor blog claim.
- *Fri.* Weekly retro.

KPIs: 6k unique visitors, +50 Reader, +3 Custom-slices.

## Week 4 — first 60-day retrospective

- *Mon.* Digest #4.
- *Wed.* Publish first 60-day retrospective.
- *Fri.* End-of-month review with hand-picked Custom-slices subscribers (4 of them on a 30-min call).

KPIs (cumulative, end of month 1): ~12k unique visitors, ~100 Reader, ~6 Custom-slices, 0–1 Enterprise lead in pipeline.

## Month 2 — push the methodology library

- Goal: 4 methodology essays live by end of month 2; pinned masthead rotates weekly.
- Goal: digest cadence stable at Mondays 09:00 GMT, with a "methodology bumped" footnote in any week where an upstream changes.
- Goal: 2 podcast appearances + 2 newsletter cross-promos.
- Outbound to Enterprise: 30 cold contacts, 2 meetings, 0 closed (expected).

KPIs (end of month 2): ~25k unique visitors, ~250 Reader, ~16 Custom-slices, 1 Enterprise demo.

## Month 3 — Enterprise rollout

- Enterprise pilot launched: single-tenant scoreboard URL + custom report cadence + named contact.
- Goal: 2 Enterprise pilots signed by end of month 3 at $1,499/mo.
- Goal: 4 podcast appearances cumulative; 4 newsletter cross-promos cumulative.
- Goal: HN front page hit at least once with a methodology essay.

KPIs (end of month 3): ~50k unique visitors, ~500 Reader, ~30 Custom-slices, 2 Enterprise.

## Channels and lever budget

| Lever | Month 1 | Month 2 | Month 3 |
|---|---|---|---|
| Digest publishing | 4 | 4 | 4 |
| Methodology essays | 1 | 2 | 1 |
| Cross-source checks | 1 | 2 | 2 |
| 60-day retrospectives | 1 | 1 | 1 |
| Podcast guest spots | 1 | 2 | 1 |
| Newsletter cross-promos | 0 | 2 | 2 |
| HN submissions | 1 | 2 | 1 |
| Enterprise outbound contacts | 0 | 30 | 50 |

## Launch checklist (gating ship)

- [ ] DESIGN.md at root with all 15 sections.
- [ ] All 10 docs published.
- [ ] Landing rendering correctly at desktop (1440×900) and mobile (390×844).
- [ ] NOWPayments invoice path tested end-to-end (unpaid invoice creation OK).
- [ ] IPN webhook signature verification implemented.
- [ ] Methodology page draft linked from footer.
- [ ] Source list table on the landing matches the methodology page.
- [ ] No `Lorem ipsum`, no `TODO`, no placeholder copy.
- [ ] `curl -sI https://benchmark-intel.prin7r.com` returns HTTP/2 200.
- [ ] Notion opportunity updated with build artefacts and stage moved to Qualified.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| First digest is dismissed as another leaderboard | Methodology essay #1 published in week 2 establishes credibility; cross-source check in week 3 demonstrates the unique value |
| Vendor pushback on a cross-source check | We publish the underlying source rows; we accept errata; we never name-shame. Tone is empirical. |
| Source changes API silently | Per-source re-ingestion catches most; the "methodology bumped" footnote and a manual review queue catch the rest |
| Enterprise sales motion stalls | Reader + Custom-slices alone hit ~$400k ARR baseline; Enterprise is upside |
| Crypto-only checkout suppresses corporate sign-ups | Enterprise tier accepts wire; documented; stablecoin direct invoice as alternative |
