/**
 * [TRIAD_FAQ] Accordion built on native <details>/<summary>. No JS.
 */

import { faqs } from "@/lib/data";

export function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12">
          <div>
            <span className="kicker">FIG. 06 · FAQ · METHODOLOGY-FIRST</span>
            <h2
              style={{
                fontFamily: '"IBM Plex Serif", serif',
                fontWeight: 600,
                fontSize: 38,
                lineHeight: 1.05,
                letterSpacing: "-0.014em",
                marginTop: 8
              }}
            >
              Common questions about sources, refunds, and audits.
            </h2>
            <p style={{ marginTop: 18, color: "var(--graphite)", lineHeight: 1.55 }}>
              If your question isn&apos;t here, the methodology page covers everything in long form, or email{" "}
              <a href="mailto:founder@prin7r.com" style={{ color: "var(--cinnabar)" }}>
                founder@prin7r.com
              </a>
              .
            </p>
          </div>
          <div>
            {faqs.map((f) => (
              <details className="faq" key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
