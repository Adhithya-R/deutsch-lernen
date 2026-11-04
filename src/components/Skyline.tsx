// Hand-drawn landmark silhouettes pairing Tamil Nadu with Germany. Pure SVG + CSS (see globals.css).
import type { ReactNode } from "react";

const Arch = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => (
  <path className="lit" d={`M${x} ${y + h}v${-(h - w / 2)}a${w / 2} ${w / 2} 0 0 1 ${w} 0v${h - w / 2}z`} />
);

// Meenakshi-style temple gateway, Madurai
function Gopuram() {
  const tiers = [[14, 104, 92, 20], [20, 86, 80, 18], [26, 70, 68, 16], [32, 56, 56, 14], [38, 44, 44, 12], [43, 34, 34, 10]];
  return (
    <svg viewBox="0 0 120 150" aria-hidden="true">
      <rect x="8" y="124" width="104" height="26" />
      <Arch x={52} y={136} w={16} h={14} />
      {tiers.map(([x, y, w, h]) => (
        <g key={y}>
          <rect x={x} y={y} width={w} height={h} />
          <rect x={x - 3} y={y} width={w + 6} height={3} />
          {Array.from({ length: Math.floor(w / 15) }, (_, i) => (
            <Arch key={i} x={x + (w / (Math.floor(w / 15) + 1)) * (i + 1) - 2.5} y={y + h - 11} w={5} h={8} />
          ))}
        </g>
      ))}
      <rect x="40" y="20" width="40" height="14" rx="7" />
      <circle cx="46" cy="17" r="3" />
      <circle cx="60" cy="13" r="3.5" />
      <circle cx="74" cy="17" r="3" />
      <rect x="59" y="4" width="2" height="8" />
    </svg>
  );
}

// Brihadeeswarar-style stepped tower, Thanjavur
function Vimana() {
  return (
    <svg viewBox="0 0 120 160" aria-hidden="true">
      <rect x="10" y="148" width="100" height="12" />
      {Array.from({ length: 12 }, (_, i) => {
        const w = 96 - i * 6.2;
        const x = (120 - w) / 2;
        const y = 148 - (i + 1) * 9;
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={9} />
            <rect x={x - 2} y={y} width={w + 4} height={2.5} />
            {i % 2 === 0 && w > 40 && (
              <>
                <Arch x={60 - w / 4 - 2} y={y + 1.5} w={4} h={6} />
                <Arch x={60 + w / 4 - 2} y={y + 1.5} w={4} h={6} />
              </>
            )}
          </g>
        );
      })}
      <rect x="48" y="30" width="24" height="12" />
      <ellipse cx="60" cy="27" rx="15" ry="13" />
      <rect x="59" y="3" width="2" height="12" />
      <circle cx="60" cy="4" r="3" />
    </svg>
  );
}

// Brandenburg Gate, Berlin
function Gate() {
  return (
    <svg viewBox="0 0 160 108" aria-hidden="true">
      <rect x="6" y="96" width="148" height="8" />
      <rect x="12" y="38" width="136" height="10" />
      <rect x="22" y="26" width="116" height="12" />
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={22 + i * 24} y={48} width={8} height={48} />
      ))}
      <rect x="62" y="20" width="36" height="6" />
      <rect x="70" y="14" width="20" height="7" rx="2" />
      {Array.from({ length: 4 }, (_, i) => (
        <g key={i}>
          <rect x={62 + i * 9} y={11} width={6} height={9} rx={3} />
          <circle cx={65 + i * 9} cy={10} r={2.6} />
        </g>
      ))}
      <rect x="78.5" y="2" width="3" height="12" />
      <path d="M80 3l-8 7h16z" />
    </svg>
  );
}

// Cologne Cathedral
function Dom() {
  return (
    <svg viewBox="0 0 160 150" aria-hidden="true">
      <rect x="26" y="140" width="108" height="10" />
      <rect x="64" y="92" width="32" height="48" />
      <Arch x={72} y={104} w={16} h={30} />
      {[36, 96].map((x) => (
        <g key={x}>
          <rect x={x} y={60} width={28} height={80} />
          <path d={`M${x} 60L${x + 14} 2L${x + 28} 60z`} />
          {Array.from({ length: 5 }, (_, k) => {
            const y = 60 - (k + 1) * 9.5;
            return <path key={k} d={`M${x + 12.5} ${y}l-6-3 6-3z M${x + 15.5} ${y}l6-3-6-3z`} />;
          })}
          {[0, 1, 2].map((k) => (
            <Arch key={k} x={x + 11} y={70 + k * 20} w={6} h={13} />
          ))}
        </g>
      ))}
    </svg>
  );
}

// Berlin television tower
function Tower() {
  return (
    <svg viewBox="0 0 40 160" aria-hidden="true">
      <polygon points="16.5,160 23.5,160 21.2,84 18.8,84" />
      <circle cx="20" cy="72" r="11" />
      <rect x="9" y="70" width="22" height="3" className="lit" />
      <polygon points="19.1,62 20.9,62 20.4,16 19.6,16" />
      <rect x="19.6" y="2" width="0.9" height="16" />
    </svg>
  );
}

const PARTS = { gopuram: Gopuram, vimana: Vimana, gate: Gate, dom: Dom, tower: Tower };
type Part = keyof typeof PARTS;
type Place = { g: Part; left?: string; right?: string; w: number; far?: boolean };

export type SkyTab = "learn" | "words" | "exam" | "bruecke" | "me";

const SCENES: Record<SkyTab, Place[]> = {
  learn: [{ g: "gopuram", left: "4%", w: 104 }, { g: "vimana", left: "40%", w: 62, far: true }, { g: "gate", right: "2%", w: 150 }],
  words: [{ g: "vimana", left: "6%", w: 92 }, { g: "tower", left: "46%", w: 34 }, { g: "gopuram", right: "6%", w: 70, far: true }],
  exam: [{ g: "gopuram", left: "5%", w: 100 }, { g: "dom", right: "4%", w: 128 }],
  bruecke: [{ g: "vimana", left: "3%", w: 84 }, { g: "gate", left: "34%", w: 116 }, { g: "dom", right: "2%", w: 100, far: true }],
  me: [{ g: "gopuram", left: "6%", w: 92 }, { g: "tower", left: "46%", w: 30 }, { g: "gate", right: "4%", w: 104, far: true }],
};

export default function Skyline({ tab, height = 150, children }: { tab: SkyTab; height?: number; children?: ReactNode }) {
  const k = Math.min(1, (height - 44) / 130);
  return (
    <div className="sky" style={{ height }} aria-hidden={children ? undefined : true}>
      <div className="sun" />
      <div className="cloud" style={{ top: 30, width: 56, animationDuration: "38s" }} />
      <div className="cloud" style={{ top: 74, width: 44, animationDuration: "52s", animationDelay: "-20s" }} />
      <svg className="bird" style={{ top: 50, animationDuration: "26s" }} viewBox="0 0 16 8"><path d="M1 6Q4 0 8 5Q12 0 15 6" /></svg>
      <svg className="bird" style={{ top: 84, animationDuration: "34s", animationDelay: "-12s" }} viewBox="0 0 16 8"><path d="M1 6Q4 0 8 5Q12 0 15 6" /></svg>
      {SCENES[tab].map((p, i) => {
        const Comp = PARTS[p.g];
        return (
          <div key={i} className={`lm ${p.far ? "far" : ""}`} style={{ width: Math.round(p.w * k), left: p.left, right: p.right }}>
            <Comp />
          </div>
        );
      })}
      <div className="flag"><i /><b /><b /><b /></div>
      <div className="ground" />
      <div className="flagline" />
      {children}
    </div>
  );
}
