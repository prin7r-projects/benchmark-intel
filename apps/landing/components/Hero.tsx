/**
 * [TRIAD_HERO] Display headline + sub-deck + dual CTA.
 * The headline is intentionally long; cinnabar `signal` highlighter on three
 * key adjectives; secondary CTA points at the in-page scoreboard anchor.
 */

import { trackingStats } from "@/lib/data";

export function Hero() {
  return (
    <section className="grain section">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-14 md:py-20">
        <span className="kicker">VOL. 18 · METHODOLOGY-FIRST · CROSS-SOURCE</span>
        <span className="eyebrow-rule" aria-hidden="true" />
        <h1
          style={{
            fontFamily: '"IBM Plex Serif", serif',
            fontWeight: 600,
            fontSize: "clamp(40px, 7vw, 88px)",
            lineHeight: 0.98,
            letterSpacing: "-0.022em",
            margin: 0
          }}
        >
          The standing record of who is{" "}
          <span style={{ background: "var(--signal)", padding: "0 6px" }}>fastest</span>
          ,{" "}
          <span style={{ background: "var(--signal)", padding: "0 6px" }}>cheapest</span>
          , and{" "}
          <span style={{ background: "var(--signal)", padding: "0 6px" }}>most correct</span>{" "}
          in AI.
        </h1>
        <p
          style={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: 19,
            lineHeight: 1.5,
            color: "var(--graphite)",
            maxWidth: 720,
            marginTop: 28
          }}
        >
          Triad is a three-layer benchmark intelligence service. We track every meaningful LLM,
          every meaningful agent, and the harness each one runs inside. Every score traces to a
          published source row. The cross-source aggregate is published weekly and audited
          continuously.
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <a href="#digest" className="btn">
            Read this week&apos;s digest
            <span aria-hidden="true" style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 12 }}>→</span>
          </a>
          <a href="#scoreboard" className="btn-ghost">
            View the scoreboard
          </a>
          <span className="kicker" style={{ marginLeft: 4 }}>
            {trackingStats.llms} LLMs · {trackingStats.agents} agents · {trackingStats.harnesses} harnesses · {trackingStats.sources} sources
          </span>
        </div>
      </div>
    </section>
  );
}
