/**
 * [TRIAD_SPARKLINE] Pure SVG sparkline, no JS, no library.
 * Used inside scoreboard rows. Plots up to 12 points, draws an axis dash,
 * and marks the latest point with a cinnabar dot.
 */

type Props = { values: number[]; ariaLabel?: string };

export function Sparkline({ values, ariaLabel }: Props) {
  if (values.length === 0) return null;
  const w = 88;
  const h = 28;
  const pad = 2;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1, max - min);
  const stepX = (w - pad * 2) / Math.max(1, values.length - 1);
  const points = values.map((v, i) => {
    const x = pad + i * stepX;
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return [x, y] as const;
  });
  const path = points
    .map(([x, y], i) => (i === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : `L ${x.toFixed(1)} ${y.toFixed(1)}`))
    .join(" ");
  const last = points[points.length - 1];
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} role="img" aria-label={ariaLabel ?? "trend sparkline"}>
      <line className="axis" x1={0} y1={h - pad} x2={w} y2={h - pad} />
      <path d={path} />
      <circle className="pt-end" cx={last[0]} cy={last[1]} r="2" />
    </svg>
  );
}
