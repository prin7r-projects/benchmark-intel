/**
 * [TRIAD_METHOD] Five-step methodology section + sources table + footnotes.
 * Numbered steps mimic a printed methods journal; cinnabar step numbers,
 * serif headings, sans body. Followed by source list anchor #sources.
 */

import { sources } from "@/lib/data";

const steps = [
  {
    num: "Step 01 · Ingest",
    title: "We pull from a fixed list of upstream sources on a per-source cadence.",
    body:
      "Hourly for ArtificialAnalysis. Six-hourly for lmsys arena and SWE-bench. Daily for AgentBench, GAIA, terminal-bench, OSWorld. Weekly for HELM. Vendor blogs and paper PDFs are ingested manually on detection. Every fetch is logged with the source URL, the response hash, and the retrieval timestamp."
  },
  {
    num: "Step 02 · Normalise",
    title: "We cast every raw row into the canonical Triad schema.",
    body:
      "Canonical row: { model_id, harness_id, benchmark_id, score, score_kind, n, ci, source_url, retrieved_at }. Score kinds are not mixed across rows — pass-at-1 patch correctness, Elo, and quality-index points are stored separately. The aggregator reads the canonical table; the upstream is never consumed directly by a public surface."
  },
  {
    num: "Step 03 · Ground",
    title: "We pin a source_version on every row.",
    body:
      "When an upstream changes its scoring rubric, we re-ingest the affected history and surface a 'methodology bumped' footnote on every cell affected for 30 days. We never silently restate a previous week's number; if it changes, the change is footnoted."
  },
  {
    num: "Step 04 · Verify",
    title: "We require independent verification before a vendor-quoted row appears.",
    body:
      "Vendor blog posts are treated as sources, not as results. A vendor claim must be matched on at least one independent benchmark before it is allowed onto the cross-source scoreboard. The methodology page lists the verification rule and every cell links to the row that satisfied it."
  },
  {
    num: "Step 05 · Publish",
    title: "We publish weekly with a permanent archive.",
    body:
      "The digest goes out Mondays 09:00 GMT. Every digest item is a single-sentence delta with a citation. Custom-slice subscribers can request on-demand cuts of the canonical table; turnaround is 24h. Every published number, in every channel, footnotes its upstream row and the retrieval timestamp."
  }
];

export function Methodology() {
  return (
    <section id="methodology" className="section">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-14 md:py-16">
        <span className="kicker">FIG. 03 · METHODOLOGY · CROSS-SOURCE NORMALISATION</span>
        <h2
          style={{
            fontFamily: '"IBM Plex Serif", serif',
            fontWeight: 600,
            fontSize: 38,
            lineHeight: 1.05,
            letterSpacing: "-0.014em",
            marginTop: 8,
            maxWidth: 780
          }}
        >
          We ingest, we normalise, we ground, we verify, we publish.
        </h2>
        <p style={{ marginTop: 18, color: "var(--graphite)", maxWidth: "70ch", lineHeight: 1.55 }}>
          Every cell on the scoreboard footnotes the upstream row and the retrieval timestamp. We never accept benchmark sponsorship — funded by subscription only.
        </p>

        <div className="mt-10">
          {steps.map((s) => (
            <div className="method-step" key={s.num}>
              <div className="step-num">{s.num}</div>
              <div>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <h3
          id="sources"
          style={{
            fontFamily: '"IBM Plex Serif", serif',
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.005em",
            marginTop: 56,
            marginBottom: 14
          }}
        >
          Methodology · Sources
        </h3>
        <div>
          {sources.map((s) => (
            <div className="src-row" key={s.tag}>
              <div className="src-tag">{s.tag}</div>
              <div className="src-name">{s.name}</div>
              <div className="src-detail">{s.detail}</div>
              <div className="src-fresh">{s.freshness}</div>
            </div>
          ))}
        </div>

        <ol className="footnotes" aria-label="footnotes">
          <li>1. Cross-source mean: arithmetic mean of normalised score values across the upstream sources cited per row.</li>
          <li>2. Δ vs plain SDK (Layer 3): the harness gain on SWE-bench Verified, computed as (model + harness) − (model + plain SDK).</li>
          <li>3. We pin a source_version on every ingested row; methodology bumps surface a 30-day footnote on affected cells.</li>
          <li>4. Triad accepts zero compensation from any model lab, agent vendor, harness vendor, or benchmark organisation. Funded by subscription only.</li>
        </ol>
      </div>
    </section>
  );
}
