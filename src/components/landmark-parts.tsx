import type { ReactNode } from "react";

/** A lit arched window or door. */
export const Arch = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => (
  <path className="lit" d={`M${x} ${y + h}v${-(h - w / 2)}a${w / 2} ${w / 2} 0 0 1 ${w} 0v${h - w / 2}z`} />
);

export const Svg = ({ vb, children }: { vb: string; children: ReactNode }) => (
  <svg viewBox={vb} aria-hidden="true">{children}</svg>
);

/** A row of arched windows. */
export const Row = ({ x, y, n, gap, w, h }: { x: number; y: number; n: number; gap: number; w: number; h: number }) => (
  <>
    {Array.from({ length: n }, (_, i) => (
      <Arch key={i} x={x + i * gap} y={y} w={w} h={h} />
    ))}
  </>
);

/** A dome on a drum: centre x, base y, radius. */
export const Dome = ({ cx, y, r, lantern = true }: { cx: number; y: number; r: number; lantern?: boolean }) => (
  <>
    <path d={`M${cx - r} ${y}A${r} ${r * 1.05} 0 0 1 ${cx + r} ${y}z`} />
    {lantern && (
      <>
        <rect x={cx - r * 0.18} y={y - r * 1.3} width={r * 0.36} height={r * 0.3} />
        <rect x={cx - 0.9} y={y - r * 1.3 - 6} width={1.8} height={6} />
      </>
    )}
  </>
);

/** A row of columns. */
export const Columns = ({ x, y, n, gap, w = 3, h }: { x: number; y: number; n: number; gap: number; w?: number; h: number }) => (
  <>
    {Array.from({ length: n }, (_, i) => (
      <rect key={i} x={x + i * gap} y={y} width={w} height={h} />
    ))}
  </>
);

/** A triangular pediment above `x..x+w`, base at y. */
export const Pediment = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => (
  <polygon points={`${x - 2},${y} ${x + w / 2},${y - h} ${x + w + 2},${y}`} />
);
