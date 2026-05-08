/**
 * [TRIAD_DATA] Canonical static dataset for the public scoreboard preview.
 * Wave 2 batch 1 ships with a representative snapshot of the cross-source
 * scoreboard. Wave 3 will replace this with a live aggregator query.
 */

export type ScoreboardRow = {
  layer: "L1" | "L2" | "L3";
  layerLabel: "LLM" | "Agent" | "Harness";
  name: string;
  vendor: string;
  scoreLabel: string;
  costLabel: string;
  speedLabel: string;
  signalPct: number; // 0-100, drives the inline highlighter cell
  delta: string; // e.g. "+0.8" or "-1.2"
  deltaPositive: boolean;
  spark: number[]; // 12 weekly points
  footnote: string;
};

export const scoreboardRows: ScoreboardRow[] = [
  {
    layer: "L1",
    layerLabel: "LLM",
    name: "Claude Sonnet 4.6",
    vendor: "Anthropic",
    scoreLabel: "76.4",
    costLabel: "$3.0",
    speedLabel: "112 t/s",
    signalPct: 86,
    delta: "+1.4",
    deltaPositive: true,
    spark: [62, 63, 65, 64, 66, 68, 69, 71, 72, 74, 75, 76],
    footnote: "ArtificialAnalysis 2026-05-07 + lmsys arena week 18 + SWE-bench Verified 2026-05-05 (cross-source mean)."
  },
  {
    layer: "L1",
    layerLabel: "LLM",
    name: "GPT-5 mini",
    vendor: "OpenAI",
    scoreLabel: "73.1",
    costLabel: "$1.8",
    speedLabel: "138 t/s",
    signalPct: 81,
    delta: "+0.6",
    deltaPositive: true,
    spark: [58, 60, 61, 62, 63, 65, 66, 68, 70, 71, 72, 73],
    footnote: "ArtificialAnalysis 2026-05-07 + lmsys arena week 18 + HELM 2026-04 (cross-source mean)."
  },
  {
    layer: "L1",
    layerLabel: "LLM",
    name: "Gemini 2.5 Pro",
    vendor: "Google",
    scoreLabel: "71.8",
    costLabel: "$1.5",
    speedLabel: "164 t/s",
    signalPct: 79,
    delta: "−0.3",
    deltaPositive: false,
    spark: [62, 64, 66, 68, 69, 71, 72, 73, 73, 72, 72, 71],
    footnote: "ArtificialAnalysis 2026-05-07 + lmsys arena week 18 (cross-source mean)."
  },
  {
    layer: "L2",
    layerLabel: "Agent",
    name: "Sonnet 4.6 + Claude Code",
    vendor: "Anthropic / Claude Code",
    scoreLabel: "62.1",
    costLabel: "$3.0",
    speedLabel: "—",
    signalPct: 88,
    delta: "+2.1",
    deltaPositive: true,
    spark: [42, 44, 46, 48, 51, 53, 55, 57, 58, 60, 61, 62],
    footnote: "SWE-bench Verified 2026-05-05 + terminal-bench 2026-05-04 + AgentBench v3 2026-04-30 (cross-source mean)."
  },
  {
    layer: "L2",
    layerLabel: "Agent",
    name: "GPT-5 mini + Codex CLI",
    vendor: "OpenAI / Codex",
    scoreLabel: "58.6",
    costLabel: "$1.8",
    speedLabel: "—",
    signalPct: 82,
    delta: "+1.4",
    deltaPositive: true,
    spark: [40, 42, 43, 45, 47, 49, 51, 53, 54, 56, 57, 58],
    footnote: "SWE-bench Verified 2026-05-05 + terminal-bench 2026-05-04 + GAIA 2026-04 (cross-source mean)."
  },
  {
    layer: "L2",
    layerLabel: "Agent",
    name: "Sonnet 4.6 + Cursor agent",
    vendor: "Anthropic / Cursor",
    scoreLabel: "57.4",
    costLabel: "$3.0",
    speedLabel: "—",
    signalPct: 80,
    delta: "+0.9",
    deltaPositive: true,
    spark: [42, 43, 44, 46, 48, 50, 52, 54, 55, 56, 57, 57],
    footnote: "SWE-bench Verified 2026-05-05 + OSWorld 2026-04-28 (cross-source mean)."
  },
  {
    layer: "L3",
    layerLabel: "Harness",
    name: "Claude Code (Sonnet 4.6)",
    vendor: "Anthropic",
    scoreLabel: "Δ +14.0",
    costLabel: "$0",
    speedLabel: "—",
    signalPct: 92,
    delta: "+1.6",
    deltaPositive: true,
    spark: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 13, 14],
    footnote: "Layer-3 delta = (Sonnet 4.6 + Claude Code) − (Sonnet 4.6 + plain SDK) on SWE-bench Verified 2026-05-05."
  },
  {
    layer: "L3",
    layerLabel: "Harness",
    name: "Codex CLI (GPT-5 mini)",
    vendor: "OpenAI",
    scoreLabel: "Δ +10.6",
    costLabel: "$0",
    speedLabel: "—",
    signalPct: 84,
    delta: "+1.0",
    deltaPositive: true,
    spark: [3, 4, 5, 6, 7, 7, 8, 9, 9, 10, 10, 10],
    footnote: "Layer-3 delta = (GPT-5 mini + Codex CLI) − (GPT-5 mini + plain SDK) on SWE-bench Verified 2026-05-05."
  },
  {
    layer: "L3",
    layerLabel: "Harness",
    name: "Cursor (Sonnet 4.6)",
    vendor: "Cursor",
    scoreLabel: "Δ +8.7",
    costLabel: "$0",
    speedLabel: "—",
    signalPct: 78,
    delta: "+0.4",
    deltaPositive: true,
    spark: [4, 4, 5, 5, 6, 7, 7, 7, 8, 8, 8, 8],
    footnote: "Layer-3 delta = (Sonnet 4.6 + Cursor) − (Sonnet 4.6 + plain SDK) on SWE-bench Verified 2026-05-05."
  }
];

export type Source = {
  tag: string;
  name: string;
  detail: string;
  freshness: string;
};

export const sources: Source[] = [
  { tag: "AA", name: "ArtificialAnalysis", detail: "Quality, speed, and price index for frontier LLMs.", freshness: "Hourly" },
  { tag: "ARENA", name: "lmsys / chatbot-arena", detail: "Pairwise human preference Elo across LLMs.", freshness: "6h" },
  { tag: "HELM", name: "Stanford HELM", detail: "Holistic evaluation across multiple academic suites.", freshness: "Weekly" },
  { tag: "SWE", name: "SWE-bench (Verified + Lite)", detail: "Real-world software engineering tasks; pass-at-1 patch correctness.", freshness: "6h" },
  { tag: "AGB", name: "AgentBench v3", detail: "Multi-environment agent benchmark across 8 environments.", freshness: "Daily" },
  { tag: "GAIA", name: "GAIA", detail: "General AI Assistant evaluation; question answering with browsing.", freshness: "Daily" },
  { tag: "TBN", name: "terminal-bench", detail: "Terminal-style task completion across coding agents.", freshness: "Daily" },
  { tag: "OSW", name: "OSWorld", detail: "Real-OS desktop tasks; agent operates a screen.", freshness: "Daily" },
  { tag: "VEND", name: "Vendor blogs / paper PDFs", detail: "Manual ingest; never published as cross-source rows without independent verification.", freshness: "On detection" }
];

export type FaqItem = { q: string; a: string };

export const faqs: FaqItem[] = [
  {
    q: "How is this different from ArtificialAnalysis?",
    a: "ArtificialAnalysis covers Layer 1 (LLMs) extremely well. Triad covers Layer 1 plus Layer 2 (Agents) and Layer 3 (Harnesses), and we cross-source against multiple upstreams including ArtificialAnalysis itself. We cite them when their data feeds a row."
  },
  {
    q: "How is this different from Stanford HELM?",
    a: "HELM is rigorous but cycles every 4–8 weeks. We surface deltas hourly. We use HELM as one of our weekly sources rather than as the only source."
  },
  {
    q: "Where do you get the numbers?",
    a: "We aggregate from a fixed list of upstreams: lmsys arena, ArtificialAnalysis, HELM, SWE-bench, AgentBench, GAIA, terminal-bench, OSWorld, plus vendor blogs and paper PDFs. The methodology page lists every source. Every cell on the scoreboard footnotes the upstream row and the retrieval timestamp."
  },
  {
    q: "What happens when a source changes its methodology?",
    a: "We pin a source_version on every ingested row. When an upstream bumps its methodology, we re-ingest the affected history and surface a 'methodology bumped' footnote on every cell affected for 30 days."
  },
  {
    q: "Do you run your own benchmarks?",
    a: "Not in Wave 2. We aggregate published benchmarks. If we ever decide to run our own — to fill a gap — we will publish the methodology and the conflict-of-interest implications first."
  },
  {
    q: "What is your conflict-of-interest policy?",
    a: "We accept zero compensation from any model lab, agent vendor, harness vendor, or benchmark organisation. Funded by subscription only. Published as a permanent page on the site."
  },
  {
    q: "How do I cancel?",
    a: "Reader and Custom-slices: cancel any time, pro-rated refund on unused days within the same billing month. Enterprise: per signed contract."
  },
  {
    q: "Why is checkout crypto-only on the landing?",
    a: "NOWPayments hosted invoice converts at the merchant level — readers can pay with USDT, USDC, or with a credit card on the NOWPayments hosted page. Enterprise tier accepts wire transfer or USDT direct invoice via founder@prin7r.com."
  }
];

export type Tier = {
  num: string;
  name: string;
  blurb: string;
  price: string;
  cycle: string;
  features: string[];
  cta: string;
  badge?: string;
  tierKey: "reader" | "slices" | "enterprise";
  amount: number;
};

export const tiers: Tier[] = [
  {
    num: "01",
    tierKey: "reader",
    name: "Reader",
    blurb: "The weekly digest, the cross-source scoreboard, and the archive. For the eval lead replacing a private spreadsheet.",
    price: "$29",
    cycle: "/ month",
    amount: 29,
    features: [
      "Weekly digest, Mondays 09:00 GMT",
      "Read-only access to the three-layer scoreboard",
      "12-month digest archive",
      "Footnote-level provenance on every score",
      "Cancel any time, pro-rated refund on unused days"
    ],
    cta: "Start Reader — $29 / month"
  },
  {
    num: "02",
    tierKey: "slices",
    name: "Custom-slices",
    blurb: "Everything in Reader, plus four custom-slice requests per month delivered as PDF + CSV with a 24h SLA.",
    price: "$199",
    cycle: "/ month",
    amount: 199,
    features: [
      "Everything in Reader",
      "Up to 4 custom-slice requests per month",
      "24h SLA on every slice",
      "Read-only API access to the scoreboard table",
      "Named contact who reads your Slack thread",
      "Three teammate seats included"
    ],
    cta: "Start Custom-slices — $199 / month",
    badge: "Most engineers start here"
  },
  {
    num: "03",
    tierKey: "enterprise",
    name: "Enterprise",
    blurb: "Single-tenant scoreboard URL, custom report cadence, named-payer invoice, methodology audit pack. Wire or USDT direct.",
    price: "$1,499",
    cycle: "/ month",
    amount: 1499,
    features: [
      "Everything in Custom-slices",
      "Single-tenant scoreboard URL on your subdomain",
      "Custom report cadence (weekly / monthly / quarterly)",
      "Methodology audit pack — defensible against legal/risk review",
      "Quarterly methodology review call",
      "Wire transfer or USDT direct invoice"
    ],
    cta: "Talk to founder — Enterprise pilot"
  }
];

export type CoverageItem = {
  num: string;
  layer: "LLMs" | "Agents" | "Harnesses";
  description: string;
  examples: string[];
  signalText: string;
};

export const coverageItems: CoverageItem[] = [
  {
    num: "Layer 01",
    layer: "LLMs",
    description: "Frontier and open-weights language models, scored across quality, speed, and price.",
    examples: [
      "Anthropic — Claude Sonnet 4.6, Claude Opus 4.5",
      "OpenAI — GPT-5, GPT-5 mini, GPT-4.1",
      "Google — Gemini 2.5 Pro, Gemini 2.5 Flash",
      "Meta — Llama 4 405B, Llama 4 70B",
      "xAI — Grok 4 Heavy",
      "DeepSeek — V3, R2",
      "Mistral / Qwen / open-weights"
    ],
    signalText: "47 models tracked across 11 vendors"
  },
  {
    num: "Layer 02",
    layer: "Agents",
    description: "Agent benchmarks across coding, browsing, OS, and tool-use tasks. Includes product-mode agents.",
    examples: [
      "SWE-bench Verified + Lite",
      "AgentBench v3 — 8 environments",
      "GAIA — browsing + tool-use QA",
      "terminal-bench — coding-task harnesses",
      "OSWorld — real-OS desktop tasks",
      "Product-mode agents — Claude Code, Codex CLI, Cursor agent, Aider, Devin-class"
    ],
    signalText: "22 agents across 6 benchmark suites"
  },
  {
    num: "Layer 03",
    layer: "Harnesses",
    description: "Same model, same benchmark, different scaffold. The layer no public site measures.",
    examples: [
      "Aider — git-aware coding scaffold",
      "Claude Code — Anthropic's CLI agent",
      "Cursor agent — IDE-embedded scaffold",
      "Codex CLI — OpenAI's CLI agent",
      "Plain SDK — vanilla provider client",
      "Custom — your own internal scaffold (Enterprise)"
    ],
    signalText: "9 harnesses, scored as Δ vs plain SDK"
  }
];

export const trackingStats = {
  llms: 47,
  agents: 22,
  harnesses: 9,
  sources: 11
};

export type DigestRow = {
  label: string;
  text: string;
  delta: string;
};

export const digestRows: DigestRow[] = [
  {
    label: "LLM · Layer 1",
    text: "Sonnet 4.6 widens its cross-source lead over GPT-5 mini to 3.3 points on the quality index, driven by a +1.4 movement on lmsys week 18 and a +0.9 on SWE-bench Verified.",
    delta: "+1.4"
  },
  {
    label: "Agent · Layer 2",
    text: "Sonnet 4.6 + Claude Code is now 14 points ahead of GPT-5 mini + Codex CLI on SWE-bench Verified, but the gap closes to 3 points when both are run inside plain SDK.",
    delta: "+2.1"
  },
  {
    label: "Harness · Layer 3",
    text: "Cursor's harness gain over plain SDK on Sonnet 4.6 is now 8.7 points; smaller than Claude Code's +14.0 and Codex CLI's +10.6 — the gap is widening, not narrowing.",
    delta: "+0.4"
  },
  {
    label: "Methodology",
    text: "AgentBench v3 bumped its task split this week. We have re-ingested the affected history; rows show a 'methodology bumped' footnote for the next 30 days.",
    delta: "Note"
  }
];
