/**
 * [TRIAD_DIGEST] Faux email mockup of the weekly digest.
 * Prints a "From / To / Subject" head plus three digest items, each with a
 * label, body, and delta column. Pure HTML/CSS, no images, no JS.
 */

import { digestRows } from "@/lib/data";

export function DigestPreview() {
  return (
    <section id="digest" className="section">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-14 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <span className="kicker">FIG. 04 · WEEKLY DIGEST · MONDAYS 09:00 GMT</span>
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
              The digest is the weekly delta. One sentence per item, every claim footnoted.
            </h2>
          </div>
          <a href="#pricing" className="btn-ghost">Subscribe — $29 / month</a>
        </div>

        <div className="digest grain">
          <div className="digest-head">
            <span className="from">FROM · TRIAD &lt;digest@benchmark-intel.prin7r.com&gt;</span>
            <span className="from">ISSUE 18 · WK 18 · 2026</span>
          </div>
          <div className="digest-body">
            <div className="digest-subject">
              Sonnet 4.6 widens its lead, but only inside Claude Code — three layer-aware deltas this week.
            </div>
            {digestRows.map((row) => (
              <div className="digest-row" key={row.label}>
                <div className="lab">{row.label}</div>
                <div
                  className="text"
                  dangerouslySetInnerHTML={{
                    __html: row.text.replace(/(\d+ points|\d+\.\d+ points|\d+ point|\+\d+\.?\d*|\−\d+\.?\d*|\-\d+\.?\d*)/g, "<b>$1</b>")
                  }}
                />
                <div className="delta">{row.delta}</div>
              </div>
            ))}
            <div
              style={{
                marginTop: 22,
                paddingTop: 18,
                borderTop: "1px solid var(--rule)",
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 11,
                color: "var(--muted)",
                letterSpacing: "0.04em"
              }}
            >
              Permalink: benchmark-intel.prin7r.com/archive/wk18 · Sources cited inline · No vendor sponsorship.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
