/**
 * [TRIAD_SCOREBOARD] The hero artefact — the three-layer scoreboard.
 * Renders all rows with a layer glyph, name, score, cost, speed, delta, and
 * an inline sparkline. Each cell is footnoted (inline aria-describedby).
 */

import { scoreboardRows } from "@/lib/data";
import { Sparkline } from "@/components/Sparkline";

export function Scoreboard() {
  return (
    <section id="scoreboard" className="section">
      <div className="mx-auto max-w-prose px-6 md:px-10 py-14 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <span className="kicker">FIG. 01 · CROSS-SOURCE SCOREBOARD · WEEK 18</span>
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
              The cross-source scoreboard, three layers, footnoted.
            </h2>
          </div>
          <span className="kicker">Δ vs last week · Sparkline = last 12 weeks</span>
        </div>

        <div className="board" role="table" aria-label="Cross-source benchmark scoreboard">
          <div className="board-head" role="row">
            <div role="columnheader">Layer</div>
            <div role="columnheader">Model · harness</div>
            <div role="columnheader">Score</div>
            <div role="columnheader">$ / 1M</div>
            <div role="columnheader">Speed</div>
            <div role="columnheader">Δ wk</div>
            <div role="columnheader">Trend</div>
          </div>
          {scoreboardRows.map((row, i) => {
            const altClass = i % 2 === 1 ? "alt" : "";
            return (
              <div
                className={`board-row ${altClass}`.trim()}
                role="row"
                key={`${row.layer}-${row.name}`}
                aria-label={`${row.layerLabel} ${row.name}, score ${row.scoreLabel}, delta ${row.delta}`}
              >
                <div className="layer-glyph" role="cell">
                  {row.layer}
                </div>
                <div className="signal-cell" style={{ ["--w" as never]: `${row.signalPct}%` }} role="cell">
                  <div className="name">{row.name}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.02em", marginTop: 2 }}>
                    {row.vendor}
                    <a className="cite" href="#sources" title={row.footnote} aria-label={`source: ${row.footnote}`}>
                      [{i + 1}]
                    </a>
                  </div>
                </div>
                <div className="score" role="cell">
                  {row.scoreLabel}
                </div>
                <div role="cell">{row.costLabel}</div>
                <div role="cell">{row.speedLabel}</div>
                <div className={row.deltaPositive ? "delta-up" : "delta-down"} role="cell">
                  {row.delta}
                </div>
                <div role="cell">
                  <Sparkline values={row.spark} ariaLabel={`${row.name} 12-week trend`} />
                </div>
              </div>
            );
          })}
        </div>

        <p
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 11.5,
            color: "var(--muted)",
            marginTop: 18,
            lineHeight: 1.6
          }}
        >
          Score = cross-source mean across the upstream sources cited per row. $ / 1M = USD per million output tokens.
          Speed = output tokens/second when reported by the upstream. Δ wk = week-over-week change in cross-source mean.
          Layer-3 rows report Δ vs plain SDK, not absolute score. Source list at <a href="#sources" style={{ color: "var(--cinnabar)" }}>§ Methodology · Sources</a>.
        </p>
      </div>
    </section>
  );
}
