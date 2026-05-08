/**
 * [TRIAD_COVERAGE] Three-column "what we cover" block.
 * Each column = one of LLMs / Agents / Harnesses with examples and a
 * signal-yellow accent on the column heading.
 */

import { coverageItems } from "@/lib/data";

export function CoverageTriad() {
  return (
    <section id="coverage" className="section grain">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-14 md:py-16">
        <span className="kicker">FIG. 02 · WHAT WE COVER · THE THREE LAYERS</span>
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
          We measure each layer separately, because the same model in two scaffolds is two different products.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {coverageItems.map((item) => (
            <article className="triad-col" key={item.layer}>
              <span className="layer-num">{item.num}</span>
              <h3>
                <span className="accent">{item.layer}</span>
              </h3>
              <p style={{ fontSize: 14.5, color: "var(--graphite)", lineHeight: 1.55 }}>
                {item.description}
              </p>
              <ul>
                {item.examples.map((ex, i) => (
                  <li key={`${item.layer}-${i}`}>{ex}</li>
                ))}
              </ul>
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 14,
                  borderTop: "1px solid var(--rule)",
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--cinnabar)"
                }}
              >
                {item.signalText}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
