# DESIGN.md — Triad / Benchmark-Intel

This document is the canonical design + style guide for `benchmark-intel.prin7r.com` and any future surfaces under the same brand. It is owned by the Chief of Design and is kept in sync with the deployed implementation.

## 1. Product and audience

**Product.** Triad is a three-layer benchmark intelligence service for the AI engineering market. It continuously ingests benchmark results across LLMs, Agents, and Harnesses, normalises them across sources, and publishes a single cross-source scoreboard, a weekly digest, and on-demand custom slices.

**Primary audience.** AI engineers and research staff at frontier labs, applied-AI startups, and AI-augmented engineering teams. Job titles: ML engineer, applied scientist, eval lead, head of AI, staff engineer with AI scope. They evaluate model and harness choices weekly and need a single source of truth that does not require running every benchmark themselves.

**Secondary audience.** Internal eval teams at non-AI-native companies (banks, telcos, government) procuring an AI vendor; technical investors and analysts pricing diligence on model labs and agent products.

**Anti-audience.** Hype-cycle media, leaderboard tourists who want a single "best LLM" answer, and procurement teams looking for a marketing-grade comparison chart with logos and stars.

## 2. Visual positioning

Triad is positioned as a **research journal printed on milky stone** — not a dashboard, not a leaderboard. The visual system is lifted from the Anthropic reference (a printed methods journal where word-level underlines replace color emphasis, and the only chromatic warmth is the page itself), with the canvas hex swapped from Anthropic ivory `#faf9f5` to milky `#FAFAF8` per the no-beige rule. The reference shelf is *Stanford HELM* / *AAAI papers index* / *Anthropic research* / a Bloomberg Terminal print-out — never *ArtificialAnalysis* or any vendor leaderboard. Things we deliberately avoid:

- Dashboard purple, animated number-counter heroes, gradient mesh backgrounds.
- Leaderboard medals, gold/silver/bronze badges, vendor logos arranged as social-proof.
- Beige/cream backgrounds (no-beige rule), color-emphasized headlines (use word-level underlines instead per Anthropic).
- Marketing-style trust marks ("trusted by"), testimonial walls, generic SaaS hero illustrations.

What we do instead:

- Lead with a real-looking three-layer scoreboard rendered in print-style monospace, hairline rules, and paper offsets.
- Footnote everything; treat numbers like citations.
- **Word-level underline emphasis** on headline keywords (`<u>` style 3px underline at 6px offset, slate-dark color) — borrowed directly from Anthropic's signature mechanic. Never color-emphasize headline words.
- **Dark editorial feature cards** (`.feature-dark`: slate-dark `#141413` background, 24px radius, paper text, IBM Plex Serif display at 91px) interrupt the milky page rhythm — strict alternation per Anthropic's surface alternation system.
- Use colour sparingly — signal-yellow as a measurement highlight inside the scoreboard, cinnabar as the alert/delta colour, clay (Anthropic terracotta) reserved for one CTA per section. One accent per section maximum.
- Use IBM Plex Serif (display + editorial body) as the Anthropic Serif analog, IBM Plex Sans (UI text) as the Anthropic Sans analog, and IBM Plex Mono for measurements/metadata labels.
- Asymmetric `0 0 8px 8px` radius CTA (flat top, rounded bottom only) for the single primary nav CTA per Anthropic.

## 3. ShadCN baseline and local component policy

Default base: shadcn/ui (open-source primitives, Tailwind + Radix). For Wave 2 batch 1 the marketing landing was hand-authored with Tailwind utility classes and a small set of locally-vendored components in `apps/landing/components/ui/` so the build is deterministic without running the registry CLI. Each component header tagged `// [TRIAD_*]` so a reviewer can see which patch is project-owned.

Documented exceptions:

- The hero scoreboard is a hand-built component, not a shadcn primitive — it is the brand artefact and intentionally non-standard.
- The "digest" preview is a hand-built mock email, also non-standard for the same reason.
- All buttons / pricing tier cards / FAQ accordions follow shadcn Tailwind conventions but are not pulled from the registry.

When the dashboard surface is built (Wave 3+), standard shadcn primitives (Table, DropdownMenu, Dialog, Tabs, Sheet) will be added via `pnpm dlx shadcn@latest add <component>` and the source moved into the project tree.

## 4. Color tokens

The palette is a 14-token system: 10 Anthropic-derived neutrals (canvas swapped to milky `#FAFAF8`) plus 4 Triad semantic accents (signal, cinnabar, tide) and the Anthropic clay accent reserve. Mirrored in `tailwind.config.ts` and `app/globals.css`.

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#FAFAF8` | Page base — milky white (was Anthropic ivory `#faf9f5`; swapped per no-beige rule). |
| `--paper-2` | `#F0EEE6` | Nav / elevated light surface — section highlight, secondary cards. |
| `--paper-3` | `#E8E6DC` | Ivory-dark — body text on dark cards, dividers, subtle borders. |
| `--oat` | `#E3DACC` | Tertiary surface — release-card backgrounds, callout sections. |
| `--cloud-light` | `#D1CFC5` | Dividers, hairline borders, inactive states. |
| `--cloud-medium` | `#B0AEA5` | Disabled / muted borders. |
| `--cloud-dark` | `#87867F` | Secondary text, meta labels, timestamps. |
| `--slate-light` | `#5E5D59` | Tertiary text, captions, footer secondary. |
| `--slate-medium` | `#3D3D3A` | Mid-dark borders, focus rings on light surfaces. |
| `--slate-dark` | `#141413` | Primary text, dark feature card surface — near-black ink (the Anthropic foreground+background dual-purpose color). |
| `--ink` | `#14171C` | Tabular numerics ink (kept from Triad — slightly cooler than slate-dark for the scoreboard contrast). |
| `--graphite` | `#2A2D33` | Secondary body type for scoreboard rows. |
| `--rule` | `#B0AEA5` | Paper rule color — aligned with cloud-medium. |
| `--muted` | `#87867F` | Footnote/meta — aligned with cloud-dark. |
| `--signal` | `#F2C744` | Measurement highlight — yellow highlighter on key numbers in scoreboard. |
| `--cinnabar` | `#C13A2A` | Alert / delta colour, focus outline, hover state. |
| `--tide` | `#2D5C5A` | Quiet editorial accent for labels and tags. |
| `--clay` | `#D97757` | Anthropic-reserved warm terracotta — accent CTA, one per section maximum. |

Forbidden: pure black (`#000`), pure white (`#FFF`), beige/cream canvas, saturated blues, neon greens, dashboard-purple, brand colours from any prior Wave 2 projects.

## 5. Typography

Pair (Anthropic-aligned three-family system): **IBM Plex Serif** (display + editorial — analog to Anthropic Serif) + **IBM Plex Sans** (UI text — analog to Anthropic Sans) + **IBM Plex Mono** (measurements, kickers, tags — analog to Anthropic Mono). All loaded from Google Fonts via the `IBM+Plex+*` request in `app/globals.css`.

| Role | Family | Weight | Source |
|---|---|---|---|
| Display & feature-card headlines | **IBM Plex Serif** | 400 / 600 / 700 | Google Fonts |
| Section heading + UI body | **IBM Plex Sans** | 400 / 500 / 600 | Google Fonts |
| Numerics, kickers, metadata | **IBM Plex Mono** | 400 / 500 / 600 | Google Fonts |

Why IBM Plex Serif as Anthropic Serif analog: at 91px the serif at display scale on dark feature cards reads as a printed broadsheet masthead — the closest open-source match for the Anthropic Serif voice. Used at weight 400/600 on dark feature cards exclusively (per Anthropic rule: never use serif at large size on light surfaces).

Scale (in `tailwind.config.ts`):

| Token | Size | Line-height | Letter-spacing | Use |
|---|---|---|---|---|
| `display`   | 64-91px clamp | 1.1  | -0.022em | Dark feature card headline only |
| `h1`        | 40-61px clamp | 1.1  | -0.02em (Anthropic -1.22px) | Hero headline (Plex Sans 700, with word-level underlines on key terms) |
| `h2`        | 48px          | 1.05 | -0.014em | Section openers |
| `h3`        | 24px          | 1.3  | -0.005em | Column headings, methodology step titles |
| `body`      | 16px          | 1.55 | -0.003em | Running text |
| Small       | 14-15px       | 1.5  | normal | Secondary copy, FAQ answers |
| Kicker      | 10.5px mono   | 1.4  | 0.18em uppercase | Eyebrow labels |
| Tag         | 9.5px mono    | 1.4  | 0.22em uppercase | Tier numbers, layer tags |

Numbers use tabular-nums (`font-feature-settings: "tnum"`) so columns line up.

**Word-level underline emphasis (Anthropic mechanic):** key headline nouns ("standing record", "cross-source", "verified") receive a 3px text-decoration underline at 6px offset, color `--slate-dark`. This replaces the conventional approach of color emphasis. The `.emph-underline` class in `globals.css` is the standard way to mark emphasis on display headlines and h1 — never change the color or weight of headline keywords.

## 6. Spacing, radius, shadows, and borders

- **Radius**: zero everywhere except focus rings (full pill on the live-chip dot only). The brand reads as "print" — corners are square. `border-radius: 0` is the default; `2px` is reserved for the live-chip dot.
- **Borders**: hairlines only. `1px solid var(--rule)` for paper rules, `1px solid var(--ink)` for the masthead and the hero scoreboard. No `2px` borders except the featured pricing tier.
- **Shadows**: none in Wave 2 batch 1. Elevation is signalled by colour (paper vs paper-2) and offset (the featured tier shifts up by 8px), not by drop-shadows.
- **Spacing scale**: 4 / 8 / 12 / 14 / 18 / 22 / 28 / 36 / 56 / 80 / 112. Section vertical padding lives at 80–112px on desktop, 56–72px on mobile.

## 7. Layout system and responsive rules

- Container: max-width `1200px` (`max-w-prose` token) for body grids; `880px` (`max-w-narrow`) for editorial copy.
- Grid: 12-col implicit grid via Tailwind utilities; the hero scoreboard uses a custom 7-column CSS grid (`grid-template-columns: 56px 1.4fr 96px 96px 96px 80px 110px`) that collapses to 5 columns under 880px.
- Breakpoints used: 320px / 720px / 880px / 1024px / 1440px (mobile / tablet / scoreboard-collapse / laptop / desktop).
- Mobile rule: at 720px and below, sparkline columns hide; at 880px the last two scoreboard columns hide; at 1024px and below pricing tiers stack vertically.
- All copy must remain readable at 320px wide with no horizontal scroll. Tested.

## 8. Component catalog

Vendored under `apps/landing/components/`:

- `Header.tsx` — masthead stripe + nav + live-chip with model count.
- `Footer.tsx` — license / methodology / contact / colophon block.
- `Hero.tsx` — display headline + sub-deck + dual CTA + live-chip.
- `Scoreboard.tsx` — three-layer benchmark table; inline sparklines per row.
- `CoverageTriad.tsx` — three-column "what we cover" (LLMs / Agents / Harnesses).
- `Methodology.tsx` — five numbered methodology steps with footnotes.
- `Sources.tsx` — table of sources with freshness.
- `DigestPreview.tsx` — faux email mockup of the weekly digest.
- `Pricing.tsx` — three-tier pricing with NOWPayments CTAs.
- `FAQ.tsx` — six accordion items.
- `Sparkline.tsx` — pure SVG sparkline, no JS.
- `BuyButton.tsx` — client component that POSTs to `/api/checkout/nowpayments` and redirects.

Inline SVG only — no third-party icon library is loaded. The brand glyph is a hand-drawn 3-stripe ink monogram defined inline in `Header.tsx` and `Footer.tsx`.

## 9. Landing page structure

In order, top to bottom:

1. **Masthead** (1px ink stripe + nav).
2. **Hero**: display headline ("The standing record of who is fastest, cheapest, and most correct in AI"), sub-deck, dual CTA (Read this week's digest / View the scoreboard), live-chip with model count.
3. **Tracking strip**: black ticker showing covered counts (LLMs N · Agents N · Harnesses N · Sources N · Updated daily).
4. **Hero artefact**: the three-layer scoreboard with 9 rows (3 LLMs + 3 Agents + 3 Harnesses), sparkline column, signal-cell column, footnote chips.
5. **Coverage triad**: three columns explaining LLMs / Agents / Harnesses with what each covers.
6. **Methodology**: five numbered steps explaining ingestion, normalisation, grounding, verification, publication. Footnotes block beneath.
7. **Sources**: methodology source table — official benchmarks we ingest.
8. **Digest preview**: faux email mockup of the weekly digest.
9. **Pricing**: three tiers (Reader / Custom-slices / Enterprise) with NOWPayments crypto CTAs.
10. **FAQ**: six questions covering normalisation, refunds, sourcing, methodology audits.
11. **Footer**: colophon, methodology link, contact, repo link.

## 10. Imagery and generated asset rules

No photography. No generated AI imagery in Wave 2 batch 1. All visual interest comes from:

- The scoreboard table itself.
- Sparklines (inline SVG generated from the row data).
- The 3-stripe brand monogram (inline SVG).
- The signal-yellow highlighter behind specific phrases ("standing record", "cross-source").
- Print-style hairline rules and paper grain noise (low-amplitude SVG `feTurbulence`).

If the GPT-Image-2 entitlement becomes available later, the priority artwork would be:
1. A printed-instrument-panel mosaic for the FAQ section (off-screen background plate).
2. A loose ink-sketch of three overlapping triangles representing the three layers (replaces the inline SVG monogram).

Generated assets save to `apps/landing/public/generated/` with a sibling `<filename>.prompt.txt`.

## 11. Motion and interaction rules

- The only motion in Wave 2 is the `.live-dot` pulse on the live-chip (2.2s ease-in-out infinite, opacity 1→0.35).
- `prefers-reduced-motion` disables the pulse.
- Hover states are 80ms linear colour transitions only — no scale, no translate, no rotate.
- Focus-visible: 2px cinnabar outline at 2px offset.
- Buttons use a single `.btn` / `.btn-ghost` style — no animated gradients.
- `<details>` accordions for FAQ — no JS for interactive bits beyond the BuyButton.

## 12. Accessibility and quality gates

- Skip-link to `#main` at the top of every page.
- Focus-visible: 2px cinnabar outline, 2px offset, on every interactive element.
- All interactive elements reachable by Tab in document order: skip → live-chip link → primary CTA → secondary CTA → nav links → in-page anchor links → buy buttons → FAQ summaries → footer links.
- All `<img>` and `<svg>` have meaningful labels: `alt=""` for decorative, `aria-label` / `<title>` for informative.
- Colour contrast: ink-on-paper = 13.4:1, graphite-on-paper = 10.6:1, muted-on-paper = 5.0:1, cinnabar-on-paper = 4.8:1 — all AAA for normal text except muted, which clears AA at body size.
- No motion at the hero, no auto-playing video, no carousels.
- All copy is real (no `Lorem ipsum`, no `TODO` strings).
- Keyboard-only navigation tested at 1440 / 1024 / 768 / 390 / 320px.

## 13. Screenshots and verification artifacts

Production renders (deployed to `https://benchmark-intel.prin7r.com`):

- Desktop (1440×900): `docs/screenshots/landing-desktop.png`
- Mobile (390×844): `docs/screenshots/landing-mobile.png`

Both files are committed to the repo and embedded in the README and in this DESIGN.md. They are re-captured whenever the landing changes. Captures done with headless Chromium against the deployed URL, full-page.

## 14. External references and library sources

- Stanford HELM — methodology framing and leaderboard typography reference.
- IBM Plex type system — typography pair.
- IBM Carbon Design System — colour mood reference (graphite + accent).
- ArtificialAnalysis, lmsys.org chatbot-arena, SWE-bench, GAIA, AgentBench, terminal-bench, OSWorld — content sources for the scoreboard rows and methodology.
- shadcn/ui — primitive baseline and Tailwind conventions.
- Refero Styles (`https://styles.refero.design/`) — DESIGN.md reference gallery.

## 15. Changelog

- 2026-05-08 — v0.1.0 — initial DESIGN.md + landing page + NOWPayments wiring + first deploy of `benchmark-intel.prin7r.com`. Brand identity finalised: Triad / IBM Plex / paper-ink-signal-cinnabar.
- 2026-05-08 — Wave 2 design refresh — anthropic with milky-canvas adaptation. Lifted full Anthropic palette (10 ivory/slate neutrals plus clay terracotta accent reserve) with the canvas hex swapped from `#faf9f5` to `#FAFAF8` per the no-beige rule. Token count grew from 9 → 18 (10 Anthropic neutrals + 4 Triad accents + clay reserve + 3 backward-compat ink tokens). Typography re-anchored on the Anthropic three-family system (IBM Plex Serif as Anthropic Serif analog for dark-card display, IBM Plex Sans as Anthropic Sans for body+UI, IBM Plex Mono as Anthropic Mono for metadata). New components added in `globals.css`: `.emph-underline` (3px word-level underline emphasis — Anthropic's primary emphasis mechanic, replacing color highlights on headline keywords), `.feature-dark` (24px-radius near-black editorial card with Plex-Serif 91px display per Anthropic surface alternation system), `.btn-asymmetric` (the Anthropic 0/0/8/8 flat-top rounded-bottom CTA reserved for the single primary nav button). Display scale rebalanced to Anthropic 91px / line-height 1.1; h1 to 61px / line-height 1.1 / -0.02em tracking. Brand essence (research journal on milky stone) re-anchored in §2.
