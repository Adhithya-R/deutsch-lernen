// Hand-drawn landmark silhouettes, keyed by the id in content/landmarks.json.
// Drawn so far: only the places current screens use. Everything else falls back to a simple shape
// by building type (see `kindOf`), so any of the 50 ids can already appear on a screen.
// To draw a new one: add a component below and register it in DRAWINGS with its preferred width.
import type { ComponentType } from "react";

import { Arch, Svg } from "./landmark-parts";
import { MORE } from "./landmarks2";

/** Stepped gable outline (Staffelgiebel) as an SVG path. */
function gable(x: number, w: number, yb: number, hWall: number, hGable: number, n: number) {
  const yw = yb - hWall;
  const sh = hGable / n;
  const dx = w / (2 * n);
  const y = (i: number) => yw - i * sh;
  let d = `M${x} ${yb}V${yw}`;
  for (let i = 1; i <= n; i++) {
    d += `V${y(i)}`;
    if (i < n) d += `H${x + i * dx}`;
  }
  d += `H${x + w - (n - 1) * dx}`;
  for (let i = n - 1; i >= 1; i--) d += `V${y(i)}H${x + w - (i - 1) * dx}`;
  return d + `V${yb}z`;
}

/* ---------- Tamil Nadu ---------- */

// TN001 Brihadeeswarar Temple, Thanjavur: stepped Chola tower
function Brihadeeswarar() {
  return (
    <Svg vb="0 0 120 160">
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
    </Svg>
  );
}

// TN002 Meenakshi Amman Temple, Madurai: tiered gopuram
function Meenakshi() {
  const tiers = [[14, 104, 92, 20], [20, 86, 80, 18], [26, 70, 68, 16], [32, 56, 56, 14], [38, 44, 44, 12], [43, 34, 34, 10]];
  return (
    <Svg vb="0 0 120 150">
      <rect x="8" y="124" width="104" height="26" />
      <Arch x={52} y={136} w={16} h={14} />
      {tiers.map(([x, y, w, h]) => {
        const n = Math.floor(w / 15);
        return (
          <g key={y}>
            <rect x={x} y={y} width={w} height={h} />
            <rect x={x - 3} y={y} width={w + 6} height={3} />
            {Array.from({ length: n }, (_, i) => (
              <Arch key={i} x={x + (w / (n + 1)) * (i + 1) - 2.5} y={y + h - 11} w={5} h={8} />
            ))}
          </g>
        );
      })}
      <rect x="40" y="20" width="40" height="14" rx="7" />
      <circle cx="46" cy="17" r="3" />
      <circle cx="60" cy="13" r="3.5" />
      <circle cx="74" cy="17" r="3" />
      <rect x="59" y="4" width="2" height="8" />
    </Svg>
  );
}

// TN003 Shore Temple, Mahabalipuram: two stepped towers by the sea
function ShoreTemple() {
  const tower = (cx: number, widths: number[], th: number, base: number) =>
    widths.map((w, i) => {
      const y = base - (i + 1) * th;
      return (
        <g key={`${cx}-${i}`}>
          <rect x={cx - w / 2} y={y} width={w} height={th} />
          <rect x={cx - w / 2 - 2} y={y} width={w + 4} height={2.5} />
          {w >= 20 && <Arch x={cx - 2.5} y={y + 3} w={5} h={7} />}
        </g>
      );
    });
  return (
    <Svg vb="0 0 150 110">
      <rect x="4" y="96" width="142" height="14" />
      <rect x="10" y="80" width="130" height="16" />
      {tower(60, [60, 50, 40, 30, 20], 12, 80)}
      <ellipse cx="60" cy="18" rx="7" ry="6" />
      <circle cx="60" cy="9" r="2.5" />
      {tower(108, [36, 28, 20, 12], 11, 80)}
      <ellipse cx="108" cy="34" rx="5" ry="4" />
      <circle cx="108" cy="28" r="2" />
      <Arch x={20} y={84} w={6} h={11} />
      <Arch x={38} y={84} w={6} h={11} />
      <Arch x={124} y={84} w={6} h={11} />
    </Svg>
  );
}

// TN004 St. Thomas Cathedral Basilica, Chennai: Neo-Gothic nave and spire
function StThomasBasilica() {
  return (
    <Svg vb="0 0 130 150">
      <rect x="8" y="140" width="114" height="10" />
      <rect x="22" y="82" width="86" height="58" />
      <polygon points="18,84 65,65 112,84" />
      <rect x="50" y="48" width="30" height="72" />
      <polygon points="46,50 84,50 65,8" />
      <rect x="63" y="0" width="4" height="10" />
      <path d="M57 5H73M65 -1V11" stroke="var(--tab-accd)" strokeWidth="2" />
      {[30, 46, 84, 100].map((x) => <Arch key={x} x={x} y={93} w={9} h={23} />)}
      <Arch x={59} y={72} w={12} h={30} />
      <rect x="27" y="83" width="4" height="57" />
      <rect x="99" y="83" width="4" height="57" />
    </Svg>
  );
}

// TN006 Fort St. George, Chennai: walls, gatehouse and the flagstaff
function FortStGeorge() {
  return (
    <Svg vb="0 0 150 120">
      <rect x="0" y="96" width="150" height="24" />
      {Array.from({ length: 15 }, (_, i) => (
        <rect key={i} x={i * 10 + 2} y={90} width={6} height={7} />
      ))}
      <rect x="34" y="52" width="70" height="44" />
      <rect x="30" y="46" width="78" height="8" />
      <rect x="52" y="34" width="34" height="14" />
      {[40, 53, 66, 79, 92].map((x) => (
        <g key={x}>
          <Arch x={x} y={60} w={6} h={11} />
          <Arch x={x} y={76} w={6} h={11} />
        </g>
      ))}
      <rect x="6" y="70" width="16" height="26" />
      <polygon points="4,70 24,70 14,52" />
      <rect x="122" y="10" width="2.5" height="86" />
      <rect x="124.5" y="12" width="18" height="10" />
    </Svg>
  );
}

// TN011 Chennai Central Railway Station: red-brick Gothic Revival with a clock tower
function ChennaiCentral() {
  return (
    <Svg vb="0 0 160 120">
      <rect x="0" y="108" width="160" height="12" />
      <rect x="6" y="64" width="148" height="8" />
      <rect x="10" y="70" width="140" height="38" />
      {Array.from({ length: 9 }, (_, i) => (
        <Arch key={i} x={18 + i * 15} y={80} w={7} h={15} />
      ))}
      <rect x="68" y="22" width="24" height="48" />
      <polygon points="64,22 96,22 80,4" />
      <rect x="79" y="0" width="2" height="6" />
      <circle cx="80" cy="40" r="7" className="lit" />
      {[10, 134].map((x) => (
        <g key={x}>
          <rect x={x} y={40} width={16} height={30} />
          <polygon points={`${x - 2},40 ${x + 18},40 ${x + 8},22`} />
          <Arch x={x + 5.5} y={48} w={5} h={9} />
        </g>
      ))}
    </Svg>
  );
}

/* ---------- Germany ---------- */

// DE001 Brandenburg Gate, Berlin
function BrandenburgGate() {
  return (
    <Svg vb="0 0 160 108">
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
    </Svg>
  );
}

// DE002 Reichstag, Berlin: columned front, corner towers, glass dome
function Reichstag() {
  return (
    <Svg vb="0 0 160 120">
      <rect x="4" y="108" width="152" height="8" />
      <rect x="6" y="58" width="148" height="7" />
      <rect x="10" y="64" width="140" height="44" />
      <polygon points="46,58 114,58 80,40" />
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={50 + i * 12} y={64} width={5} height={44} />
      ))}
      {[8, 134].map((x) => (
        <g key={x}>
          <rect x={x} y={30} width={18} height={34} />
          <ellipse cx={x + 9} cy={30} rx={9} ry={7} />
          <Arch x={x + 6} y={40} w={6} h={12} />
        </g>
      ))}
      {[16, 28, 124, 136].map((x) => (
        <Arch key={x} x={x} y={76} w={6} h={14} />
      ))}
      <rect x="62" y="30" width="36" height="10" />
      <path d="M62 30A18 20 0 0 1 98 30z" />
      <rect x="77" y="4" width="6" height="8" />
    </Svg>
  );
}

// DE003 Cologne Cathedral
function CologneCathedral() {
  return (
    <Svg vb="0 0 160 150">
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
    </Svg>
  );
}

// DE004 Neuschwanstein Castle, Bavaria: white towers on a rock
function Neuschwanstein() {
  return (
    <Svg vb="0 0 150 130">
      <polygon points="0,130 8,100 30,104 52,92 100,96 128,102 150,130" />
      <rect x="42" y="62" width="70" height="36" />
      <polygon points="42,62 112,62 98,46 56,46" />
      <polygon points="58,46 72,46 65,30" />
      <polygon points="82,46 96,46 89,30" />
      <rect x="26" y="46" width="20" height="54" />
      <rect x="24" y="44" width="24" height="3" />
      <polygon points="24,44 48,44 36,6" />
      <rect x="108" y="54" width="16" height="46" />
      <polygon points="106,54 126,54 116,26" />
      {[50, 62, 74, 86, 98].map((x) => (
        <Arch key={x} x={x} y={70} w={5} h={10} />
      ))}
      <Arch x={33.5} y={58} w={5} h={9} />
      <Arch x={33.5} y={76} w={5} h={9} />
      <Arch x={113.5} y={64} w={5} h={9} />
    </Svg>
  );
}

// DE010 Römer, Frankfurt: stepped gables
function Roemer() {
  const win = (x: number, w: number, rows: number[], n: number) =>
    rows.flatMap((y) =>
      Array.from({ length: n }, (_, i) => <Arch key={`${x}-${y}-${i}`} x={x + (w / (n + 1)) * (i + 1) - 2.5} y={y} w={5} h={8} />),
    );
  return (
    <Svg vb="0 0 150 120">
      <rect x="6" y="108" width="138" height="6" />
      <path d={gable(14, 34, 108, 42, 26, 3)} />
      <path d={gable(48, 54, 108, 50, 36, 4)} />
      <path d={gable(102, 36, 108, 40, 24, 3)} />
      {win(14, 34, [80, 64], 2)}
      {win(48, 54, [84, 68, 52], 3)}
      {win(102, 36, [80, 64], 2)}
      <rect x="74" y="12" width="2" height="14" />
    </Svg>
  );
}

// DE018 Holstentor, Lübeck: two round brick towers and a gate
function Holstentor() {
  return (
    <Svg vb="0 0 150 100">
      <rect x="4" y="92" width="142" height="8" />
      {[10, 100].map((x) => (
        <g key={x}>
          <rect x={x} y={38} width={40} height={54} />
          <polygon points={`${x - 4},38 ${x + 44},38 ${x + 20},6`} />
          <rect x={x} y={52} width={40} height={3} />
          <Arch x={x + 17.5} y={60} w={5} h={9} />
          <Arch x={x + 17.5} y={76} w={5} h={9} />
        </g>
      ))}
      <rect x="48" y="46" width="54" height="46" />
      <polygon points="46,46 104,46 75,22" />
      <Arch x={66} y={66} w={18} h={26} />
      <Arch x={56} y={54} w={5} h={8} />
      <Arch x={89} y={54} w={5} h={8} />
    </Svg>
  );
}

// DE025 Berlin TV Tower
function TvTower() {
  return (
    <Svg vb="0 0 40 160">
      <polygon points="16.5,160 23.5,160 21.2,84 18.8,84" />
      <circle cx="20" cy="72" r="11" />
      <rect x="9" y="70" width="22" height="3" className="lit" />
      <polygon points="19.1,62 20.9,62 20.4,16 19.6,16" />
      <rect x="19.6" y="2" width="0.9" height="16" />
    </Svg>
  );
}


// TN009 Chettinad Palace, Karaikudi: a mansion with a pillared verandah
function ChettinadPalace() {
  return (
    <Svg vb="0 0 160 100">
      <rect x="4" y="90" width="152" height="10" />
      <rect x="8" y="58" width="38" height="32" />
      <rect x="114" y="58" width="38" height="32" />
      <polygon points="4,58 50,58 42,46 12,46" />
      <polygon points="110,58 156,58 148,46 118,46" />
      <rect x="46" y="44" width="68" height="46" />
      <polygon points="42,44 118,44 104,28 56,28" />
      <polygon points="64,28 96,28 80,14" />
      <circle cx="80" cy="11" r="2.5" />
      <rect x="79" y="2" width="2" height="6" />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x={50 + i * 9.5} y={56} width={4} height={34} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <Arch key={i} x={54 + i * 9.5 + 0.7} y={66} w={4} h={11} />
      ))}
      {[18, 30, 124, 136].map((x) => (
        <Arch key={x} x={x} y={64} w={6} h={13} />
      ))}
    </Svg>
  );
}

// DE007 Charlottenburg Palace, Berlin: long baroque palace with a domed centre
function CharlottenburgPalace() {
  return (
    <Svg vb="0 0 180 110">
      <rect x="2" y="100" width="176" height="10" />
      <rect x="2" y="58" width="176" height="7" />
      <rect x="6" y="64" width="168" height="36" />
      <rect x="62" y="48" width="56" height="52" />
      <rect x="74" y="30" width="32" height="20" />
      <path d="M72 30A18 24 0 0 1 108 30z" />
      <rect x="87" y="0" width="6" height="9" />
      {[14, 26, 38, 50, 130, 142, 154, 166].map((x) => (
        <g key={x}>
          <Arch x={x} y={70} w={6} h={10} />
          <Arch x={x} y={85} w={6} h={10} />
        </g>
      ))}
      {[68, 80, 92, 104].map((x) => (
        <g key={x}>
          <Arch x={x} y={58} w={6} h={12} />
          <Arch x={x} y={80} w={6} h={14} />
        </g>
      ))}
    </Svg>
  );
}

// TN018 Thirumalai Nayakkar Mahal, Madurai: huge columns and arches
function NayakkarMahal() {
  return (
    <Svg vb="0 0 160 110">
      <rect x="2" y="100" width="156" height="10" />
      <rect x="10" y="36" width="140" height="64" />
      <rect x="6" y="30" width="148" height="8" />
      {Array.from({ length: 5 }, (_, i) => (
        <Arch key={i} x={26 + i * 24} y={58} w={12} h={42} />
      ))}
      {[24, 80, 136].map((x) => (
        <g key={x}>
          <rect x={x - 8} y={24} width={16} height={8} />
          <ellipse cx={x} cy={22} rx={9} ry={8} />
        </g>
      ))}
      <rect x="64" y="14" width="32" height="12" />
      <ellipse cx="80" cy="14" rx="16" ry="12" />
      <rect x="79" y="0" width="2" height="6" />
    </Svg>
  );
}

// DE019 New Town Hall, Munich: neo-Gothic with a tall clock tower
function NewTownHall() {
  return (
    <Svg vb="0 0 160 130">
      <rect x="2" y="120" width="156" height="10" />
      <rect x="6" y="54" width="148" height="7" />
      <rect x="10" y="60" width="140" height="60" />
      {Array.from({ length: 10 }, (_, i) => (
        <polygon key={i} points={`${10 + i * 14},54 ${18 + i * 14},54 ${14 + i * 14},38`} />
      ))}
      <rect x="66" y="34" width="28" height="86" />
      <polygon points="64,34 96,34 80,0" />
      <circle cx="80" cy="50" r="6" className="lit" />
      <Arch x={77} y={68} w={6} h={14} />
      <Arch x={77} y={92} w={6} h={14} />
      {[14, 132].map((x) => (
        <g key={x}>
          <rect x={x} y={40} width={14} height={20} />
          <polygon points={`${x - 2},40 ${x + 16},40 ${x + 7},22`} />
        </g>
      ))}
      {[20, 34, 48, 104, 118, 132].map((x) => (
        <g key={x}>
          <Arch x={x} y={68} w={6} h={12} />
          <Arch x={x} y={92} w={6} h={12} />
        </g>
      ))}
      <Arch x={71} y={104} w={18} h={16} />
    </Svg>
  );
}

// TN008 Ramanathaswamy Temple, Rameswaram: two gopurams and the long pillared corridor
function RamanathaswamyTemple() {
  const gopuram = (cx: number) =>
    [44, 38, 32, 26, 20].map((w, i) => {
      const y = 100 - (i + 1) * 12;
      return (
        <g key={`${cx}-${i}`}>
          <rect x={cx - w / 2} y={y} width={w} height={12} />
          <rect x={cx - w / 2 - 2} y={y} width={w + 4} height={2.5} />
          {w >= 26 && <Arch x={cx - 2.5} y={y + 3} w={5} h={8} />}
        </g>
      );
    });
  return (
    <Svg vb="0 0 180 110">
      <rect x="2" y="100" width="176" height="10" />
      {gopuram(26)}
      <ellipse cx="26" cy="36" rx="9" ry="7" />
      <rect x="25" y="22" width="2" height="8" />
      {gopuram(154)}
      <ellipse cx="154" cy="36" rx="9" ry="7" />
      <rect x="153" y="22" width="2" height="8" />
      <rect x="40" y="64" width="100" height="7" />
      <rect x="44" y="70" width="92" height="30" />
      {Array.from({ length: 15 }, (_, i) => (
        <rect key={i} x={48 + i * 5.8} y={74} width={2.4} height={26} className="lit" />
      ))}
      <rect x="80" y="58" width="20" height="7" />
      <ellipse cx="90" cy="58" rx="12" ry="9" />
    </Svg>
  );
}

// DE005 Berlin Cathedral: a great dome with four corner towers
function BerlinCathedral() {
  return (
    <Svg vb="0 0 150 120">
      <rect x="4" y="108" width="142" height="10" />
      <rect x="40" y="100" width="70" height="8" />
      <rect x="10" y="64" width="130" height="7" />
      <rect x="14" y="70" width="122" height="38" />
      <rect x="52" y="44" width="46" height="22" />
      {Array.from({ length: 6 }, (_, i) => (
        <Arch key={i} x={56 + i * 7.2} y={49} w={4} h={13} />
      ))}
      <path d="M50 44A25 30 0 0 1 100 44z" />
      <rect x="70" y="4" width="10" height="10" />
      <rect x="74" y="0" width="2" height="5" />
      {[14, 116].map((x) => (
        <g key={x}>
          <rect x={x} y={46} width={20} height={20} />
          <ellipse cx={x + 10} cy={46} rx={10} ry={9} />
        </g>
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <Arch key={i} x={26 + i * 14} y={80} w={6} h={18} />
      ))}
    </Svg>
  );
}

// TN017 Rockfort Temple, Tiruchirappalli: a temple on top of an ancient rock
function RockfortTemple() {
  return (
    <Svg vb="0 0 140 130">
      <rect x="0" y="122" width="140" height="8" />
      <polygon points="6,122 18,84 34,70 52,56 72,40 98,34 112,52 124,80 134,122" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={24 + i * 8} y={108 - i * 9} width={5} height={2.5} className="lit" />
      ))}
      <rect x="82" y="20" width="26" height="14" />
      <rect x="86" y="12" width="18" height="8" />
      <rect x="90" y="6" width="10" height="6" />
      <circle cx="95" cy="4" r="2.5" />
      <rect x="108" y="26" width="12" height="8" />
    </Svg>
  );
}

// DE017 Wartburg Castle, Eisenach: a hall and keep above the hill
function Wartburg() {
  return (
    <Svg vb="0 0 160 120">
      <rect x="0" y="112" width="160" height="8" />
      <polygon points="0,120 14,96 40,82 80,76 120,80 146,94 160,120" />
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={30 + i * 10} y={72} width={6} height={7} />
      ))}
      <rect x="30" y="78" width="100" height="20" />
      <rect x="44" y="46" width="62" height="34" />
      <polygon points="40,46 110,46 96,30 54,30" />
      <polygon points="62,30 74,30 68,20" />
      <polygon points="84,30 96,30 90,20" />
      <rect x="108" y="34" width="18" height="46" />
      <polygon points="106,34 128,34 117,8" />
      {[50, 62, 74, 86, 98].map((x) => (
        <Arch key={x} x={x} y={54} w={5} h={9} />
      ))}
      <Arch x={114.5} y={46} w={5} h={9} />
    </Svg>
  );
}

/* ---------- Placeholders by building type, for places not drawn yet ---------- */

function PlaceholderTemple() {
  return (
    <Svg vb="0 0 120 130">
      <rect x="10" y="118" width="100" height="12" />
      {Array.from({ length: 6 }, (_, i) => {
        const w = 88 - i * 13;
        const y = 118 - (i + 1) * 13;
        return (
          <g key={i}>
            <rect x={(120 - w) / 2} y={y} width={w} height={13} />
            <rect x={(120 - w) / 2 - 2} y={y} width={w + 4} height={2.5} />
            {i < 4 && <Arch x={57.5} y={y + 3} w={5} h={7} />}
          </g>
        );
      })}
      <rect x="57" y="26" width="6" height="14" />
      <circle cx="60" cy="24" r="4" />
    </Svg>
  );
}
function PlaceholderChurch() {
  return (
    <Svg vb="0 0 140 130">
      <rect x="10" y="118" width="120" height="12" />
      <rect x="30" y="76" width="80" height="42" />
      {[34, 86].map((x) => (
        <g key={x}>
          <rect x={x} y={52} width={20} height={66} />
          <polygon points={`${x - 2},52 ${x + 22},52 ${x + 10},6`} />
          <Arch x={x + 7} y={62} w={6} h={12} />
        </g>
      ))}
      <Arch x={64} y={92} w={12} h={26} />
    </Svg>
  );
}
function PlaceholderCastle() {
  return (
    <Svg vb="0 0 150 120">
      <rect x="0" y="108" width="150" height="12" />
      <rect x="30" y="64" width="90" height="44" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={30 + i * 12} y={58} width={7} height={7} />
      ))}
      {[14, 108].map((x) => (
        <g key={x}>
          <rect x={x} y={40} width={28} height={68} />
          <polygon points={`${x - 3},40 ${x + 31},40 ${x + 14},10`} />
          <Arch x={x + 11} y={54} w={6} h={11} />
        </g>
      ))}
      <Arch x={68} y={84} w={14} h={24} />
    </Svg>
  );
}
function PlaceholderTower() {
  return (
    <Svg vb="0 0 40 160">
      <rect x="12" y="40" width="16" height="120" />
      <polygon points="10,40 30,40 20,6" />
      <Arch x={17.5} y={60} w={5} h={9} />
      <Arch x={17.5} y={90} w={5} h={9} />
    </Svg>
  );
}
function PlaceholderGate() {
  return (
    <Svg vb="0 0 150 110">
      <rect x="4" y="100" width="142" height="10" />
      {[16, 106].map((x) => (
        <g key={x}>
          <rect x={x} y={34} width={28} height={66} />
          <polygon points={`${x - 3},34 ${x + 31},34 ${x + 14},10`} />
          <Arch x={x + 11} y={50} w={6} h={11} />
        </g>
      ))}
      <rect x="44" y="40" width="62" height="60" />
      <Arch x={63} y={62} w={24} h={38} />
    </Svg>
  );
}
function PlaceholderHall() {
  return (
    <Svg vb="0 0 150 110">
      <rect x="6" y="98" width="138" height="8" />
      <rect x="12" y="52" width="126" height="8" />
      <rect x="18" y="60" width="114" height="38" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={26 + i * 14} y={60} width={6} height={38} className="lit" />
      ))}
      <path d="M52 52A23 24 0 0 1 98 52z" />
      <rect x="73" y="18" width="4" height="12" />
    </Svg>
  );
}

type Kind = "temple" | "church" | "castle" | "tower" | "gate" | "hall";
const PLACEHOLDERS: Record<Kind, { w: number; C: ComponentType }> = {
  temple: { w: 96, C: PlaceholderTemple },
  church: { w: 104, C: PlaceholderChurch },
  castle: { w: 118, C: PlaceholderCastle },
  tower: { w: 34, C: PlaceholderTower },
  gate: { w: 112, C: PlaceholderGate },
  hall: { w: 120, C: PlaceholderHall },
};

/** Picks a placeholder shape from the building type and name in the catalogue. */
export function kindOf(type: string): Kind {
  const t = type.toLowerCase();
  if (t.includes("temple")) return "temple";
  if (/(cathedral|church|basilica)/.test(t)) return "church";
  if (/(castle|fort|palace)/.test(t)) return "castle";
  if (/(tower|clock)/.test(t)) return "tower";
  if (/(gate|monument|memorial)/.test(t)) return "gate";
  return "hall";
}

/** Landmarks that have their own drawing. `w` is the preferred width at full size. */
export const DRAWINGS: Record<string, { w: number; C: ComponentType }> = {
  TN001: { w: 92, C: Brihadeeswarar },
  TN002: { w: 104, C: Meenakshi },
  TN003: { w: 124, C: ShoreTemple },
  TN004: { w: 108, C: StThomasBasilica },
  TN006: { w: 124, C: FortStGeorge },
  TN011: { w: 132, C: ChennaiCentral },
  DE001: { w: 150, C: BrandenburgGate },
  DE002: { w: 134, C: Reichstag },
  DE003: { w: 128, C: CologneCathedral },
  DE004: { w: 124, C: Neuschwanstein },
  DE010: { w: 126, C: Roemer },
  DE018: { w: 118, C: Holstentor },
  DE025: { w: 34, C: TvTower },
  TN008: { w: 150, C: RamanathaswamyTemple },
  TN009: { w: 124, C: ChettinadPalace },
  TN017: { w: 108, C: RockfortTemple },
  TN018: { w: 130, C: NayakkarMahal },
  DE005: { w: 118, C: BerlinCathedral },
  DE007: { w: 150, C: CharlottenburgPalace },
  DE017: { w: 124, C: Wartburg },
  DE019: { w: 120, C: NewTownHall },
  ...MORE,
};

export const drawingFor = (id: string, type: string) => DRAWINGS[id] ?? PLACEHOLDERS[kindOf(type)];
export const isDrawn = (id: string) => id in DRAWINGS;
