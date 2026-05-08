/**
 * [TRIAD_FOOTER] Colophon — methodology link, contact, repo, and the same
 * three-stripe brand monogram from the masthead. Hairline rules separate
 * groups.
 */

export function Footer() {
  return (
    <footer style={{ background: "var(--paper-2)", borderTop: "1px solid var(--ink)" }}>
      <div className="mx-auto max-w-prose px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <svg width="34" height="22" viewBox="0 0 34 22" aria-hidden="true">
                <rect x="0" y="0" width="34" height="4" fill="#14171C" />
                <rect x="0" y="9" width="34" height="4" fill="#F2C744" />
                <rect x="0" y="18" width="34" height="4" fill="#14171C" />
              </svg>
              <span style={{ fontFamily: '"IBM Plex Serif", serif', fontWeight: 600, fontSize: 22, letterSpacing: "-0.012em" }}>
                Triad
              </span>
            </div>
            <p
              style={{
                marginTop: 14,
                fontSize: 13.5,
                color: "var(--muted)",
                lineHeight: 1.55,
                fontFamily: '"IBM Plex Sans", sans-serif'
              }}
            >
              Cross-source benchmark intelligence for AI engineers. Three layers: LLMs, Agents, Harnesses. Footnoted, audited, published weekly.
            </p>
          </div>

          <div>
            <span className="kicker">Read</span>
            <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0", display: "grid", gap: 8 }}>
              <li><a href="#scoreboard" style={{ color: "var(--ink)" }}>Scoreboard</a></li>
              <li><a href="#methodology" style={{ color: "var(--ink)" }}>Methodology</a></li>
              <li><a href="#digest" style={{ color: "var(--ink)" }}>Digest preview</a></li>
              <li><a href="#sources" style={{ color: "var(--ink)" }}>Sources</a></li>
              <li><a href="#faq" style={{ color: "var(--ink)" }}>FAQ</a></li>
            </ul>
          </div>

          <div>
            <span className="kicker">Subscribe</span>
            <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0", display: "grid", gap: 8 }}>
              <li><a href="#pricing" style={{ color: "var(--ink)" }}>Reader · $29 / mo</a></li>
              <li><a href="#pricing" style={{ color: "var(--ink)" }}>Custom-slices · $199 / mo</a></li>
              <li><a href="mailto:founder@prin7r.com?subject=Triad%20Enterprise%20pilot" style={{ color: "var(--ink)" }}>Enterprise · $1,499 / mo</a></li>
              <li><a href="#pricing" style={{ color: "var(--ink)" }}>NOWPayments invoices</a></li>
            </ul>
          </div>

          <div>
            <span className="kicker">Colophon</span>
            <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0", display: "grid", gap: 8 }}>
              <li><a href="https://github.com/prin7r-projects/benchmark-intel" style={{ color: "var(--ink)" }}>github.com/prin7r-projects/benchmark-intel</a></li>
              <li><a href="mailto:founder@prin7r.com" style={{ color: "var(--ink)" }}>founder@prin7r.com</a></li>
              <li><span style={{ color: "var(--muted)" }}>No vendor sponsorship · subscription-funded</span></li>
              <li><span style={{ color: "var(--muted)" }}>Set in IBM Plex · MIT license · 2026</span></li>
            </ul>
          </div>
        </div>

        <div
          style={{
            marginTop: 32,
            paddingTop: 16,
            borderTop: "1px solid var(--rule)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 11,
            color: "var(--muted)",
            letterSpacing: "0.06em"
          }}
        >
          <span>© 2026 Triad / Prin7r. Standing record · cross-source · footnoted.</span>
          <span>v0.1.0 · benchmark-intel.prin7r.com</span>
        </div>
      </div>
    </footer>
  );
}
