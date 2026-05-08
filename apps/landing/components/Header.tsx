/**
 * [TRIAD_HEADER] Masthead — ink stripe, brand monogram, nav, live-chip.
 * The brand monogram is three inline rectangles (ink/yellow/ink); identical
 * shape used in the footer colophon for visual continuity.
 */

import { trackingStats } from "@/lib/data";

export function Header() {
  return (
    <header>
      <div className="masthead-stripe" />
      <div className="mx-auto max-w-prose px-6 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-b border-[var(--rule)]">
          <a href="#main" className="flex items-center gap-3 text-[var(--ink)] no-underline">
            <svg width="34" height="22" viewBox="0 0 34 22" aria-hidden="true">
              <rect x="0" y="0" width="34" height="4" fill="#14171C" />
              <rect x="0" y="9" width="34" height="4" fill="#F2C744" />
              <rect x="0" y="18" width="34" height="4" fill="#14171C" />
            </svg>
            <span style={{ fontFamily: '"IBM Plex Serif", serif', fontWeight: 600, fontSize: 22, letterSpacing: "-0.012em" }}>
              Triad
            </span>
            <span className="kicker hidden sm:inline">Benchmark Intelligence</span>
          </a>
          <nav aria-label="primary" className="flex items-center gap-5 text-[14px] text-[var(--graphite)]">
            <a href="#scoreboard" className="hover:text-[var(--cinnabar)] no-underline">Scoreboard</a>
            <a href="#methodology" className="hover:text-[var(--cinnabar)] no-underline">Methodology</a>
            <a href="#digest" className="hover:text-[var(--cinnabar)] no-underline">Digest</a>
            <a href="#pricing" className="hover:text-[var(--cinnabar)] no-underline">Pricing</a>
            <a href="#faq" className="hover:text-[var(--cinnabar)] no-underline hidden md:inline">FAQ</a>
            <a href="#pricing" className="btn-ghost hidden md:inline-flex">Subscribe</a>
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-[var(--rule)]">
          <div className="flex items-center gap-3">
            <span className="live-chip">
              <span className="live-dot" aria-hidden="true" />
              Tracking · {trackingStats.llms} LLMs · {trackingStats.agents} agents · {trackingStats.harnesses} harnesses
            </span>
          </div>
          <span className="kicker">
            Issue 18 · Updated {new Date().getUTCFullYear()}-{String(new Date().getUTCMonth() + 1).padStart(2, "0")}-{String(new Date().getUTCDate()).padStart(2, "0")} · GMT
          </span>
        </div>
      </div>
    </header>
  );
}
