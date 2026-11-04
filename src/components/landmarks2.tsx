// More hand-drawn landmark silhouettes (see landmarks.tsx for the first set). Ids match content/landmarks.json.
import type { ComponentType } from "react";
import { Arch, Columns, Dome, Pediment, Row, Svg } from "./landmark-parts";

/** A tiered gopuram, used for several Dravidian temple towers. */
function Gopuram({ tiers, w, door = true }: { tiers: number; w: number; door?: boolean }) {
  const base = 150;
  return (
    <Svg vb="0 0 120 160">
      <rect x={60 - w / 2 - 6} y={base - 22} width={w + 12} height={22} />
      {door && <Arch x={54} y={base - 18} w={12} h={18} />}
      {Array.from({ length: tiers }, (_, i) => {
        const tw = w - i * ((w - 20) / tiers);
        const y = base - 22 - (i + 1) * (92 / tiers);
        const h = 92 / tiers;
        return (
          <g key={i}>
            <rect x={60 - tw / 2} y={y} width={tw} height={h} />
            <rect x={60 - tw / 2 - 2.5} y={y} width={tw + 5} height={2.6} />
            {tw > 36 && <Row x={60 - tw / 2 + 6} y={y + 4} n={Math.floor((tw - 8) / 13)} gap={13} w={5} h={h - 6} />}
          </g>
        );
      })}
      <path d="M44 38A16 12 0 0 1 76 38z" />
      <rect x="59" y="14" width="2" height="12" />
      <circle cx="60" cy="13" r="2.5" />
    </Svg>
  );
}

const Kapaleeshwarar = () => <Gopuram tiers={7} w={84} />; // TN016
const MadhurTower = () => <Gopuram tiers={5} w={70} />; // TN025

// TN005 Madras High Court: red Indo-Saracenic with a tall central tower
function HighCourt() {
  return (
    <Svg vb="0 0 170 110">
      <rect x="2" y="100" width="166" height="10" />
      <rect x="6" y="62" width="158" height="38" />
      <rect x="6" y="58" width="158" height="5" />
      <rect x="68" y="30" width="34" height="70" />
      <Dome cx={85} y={30} r={18} />
      {[14, 150].map((x) => <g key={x}><rect x={x - 6} y="44" width="14" height="18" /><Dome cx={x + 1} y={44} r={7} lantern={false} /></g>)}
      {[34, 120].map((x) => <g key={x}><rect x={x - 5} y="48" width="10" height="14" /><Dome cx={x} y={48} r={5.5} lantern={false} /></g>)}
      <Row x={14} y={68} n={6} gap={9.5} w={5} h={11} />
      <Row x={108} y={68} n={6} gap={9.5} w={5} h={11} />
      <Row x={74} y={38} n={4} gap={7} w={4} h={10} />
      <Arch x={77} y={80} w={16} h={20} />
      <Row x={14} y={84} n={5} gap={11} w={5} h={11} />
      <Row x={108} y={84} n={5} gap={11} w={5} h={11} />
    </Svg>
  );
}

// TN007 Vivekananda Rock Memorial: a domed hall on a rock in the sea
function VivekanandaRock() {
  return (
    <Svg vb="0 0 140 100">
      <path d="M0 100V86Q18 70 40 76Q56 56 80 62Q104 52 122 74Q134 76 140 86V100z" />
      <rect x="44" y="52" width="52" height="24" />
      <rect x="40" y="76" width="60" height="4" />
      <Columns x={48} y={54} n={6} gap={8} h={22} />
      <Dome cx={70} y={52} r={16} />
      <path d="M96 76h28v-12l-14-10l-14 10z" />
      <Arch x={104} y={64} w={8} h={12} />
      <path className="lit" d="M0 96q10-4 20 0t20 0t20 0t20 0t20 0t20 0t20 0" fill="none" />
    </Svg>
  );
}

// TN010 St. George's Cathedral: classical portico and a tall spire
function StGeorges() {
  return (
    <Svg vb="0 0 110 150">
      <rect x="4" y="136" width="102" height="14" />
      <rect x="14" y="94" width="82" height="42" />
      <Pediment x={26} y={94} w={58} h={18} />
      <Columns x={30} y={96} n={5} gap={11} w={4} h={40} />
      <rect x="40" y="46" width="30" height="48" />
      <rect x="36" y="44" width="38" height="4" />
      <Row x={46} y={56} n={2} gap={12} w={6} h={16} />
      <path d="M44 44L55 6L66 44z" />
      <rect x="54" y="0" width="2" height="8" />
      <Arch x={50} y={118} w={10} h={18} />
    </Svg>
  );
}

// TN012 Ripon Building: white town hall with a clock tower and columns
function RiponBuilding() {
  return (
    <Svg vb="0 0 160 110">
      <rect x="2" y="100" width="156" height="10" />
      <rect x="8" y="62" width="144" height="38" />
      <rect x="6" y="58" width="148" height="5" />
      <Columns x={14} y={64} n={14} gap={9.5} w={4} h={36} />
      <rect x="62" y="30" width="36" height="32" />
      <Pediment x={62} y={30} w={36} h={12} />
      <rect x="68" y="6" width="24" height="26" />
      <circle className="lit" cx="80" cy="18" r="6" />
      <path d="M66 6L80 -4L94 6z" />
      <Arch x={74} y={84} w={12} h={16} />
    </Svg>
  );
}

// TN013 Anna Centenary Library: tall glass blocks, stepped
function AnnaLibrary() {
  return (
    <Svg vb="0 0 120 130">
      <rect x="2" y="120" width="116" height="10" />
      <rect x="8" y="50" width="48" height="70" />
      <rect x="56" y="22" width="36" height="98" />
      <rect x="92" y="70" width="22" height="50" />
      {Array.from({ length: 9 }, (_, i) => <rect key={i} className="lit" x="60" y={28 + i * 10} width="28" height="5" />)}
      {Array.from({ length: 6 }, (_, i) => <rect key={i} className="lit" x="12" y={56 + i * 10} width="40" height="5" />)}
      <path d="M8 50L32 36L56 50z" />
      <Arch x={20} y={104} w={14} h={16} />
    </Svg>
  );
}

// TN014 Kalaignar Centenary Library: white modern block with a glass front and a round tower
function KalaignarLibrary() {
  return (
    <Svg vb="0 0 140 110">
      <rect x="2" y="100" width="136" height="10" />
      <rect x="10" y="50" width="86" height="50" />
      <rect x="6" y="46" width="94" height="5" />
      <path className="lit" d="M20 100V60L56 54L90 60V100z" />
      <rect x="100" y="28" width="30" height="72" />
      <ellipse cx="115" cy="28" rx="15" ry="5" />
      {Array.from({ length: 6 }, (_, i) => <rect key={i} className="lit" x="104" y={38 + i * 10} width="22" height="4" />)}
      <Columns x={22} y={60} n={6} gap={13} w={3} h={40} />
    </Svg>
  );
}

// TN015 NIT Trichy clock tower: slim tower with a clock
function NitClock() {
  return (
    <Svg vb="0 0 50 150">
      <rect x="6" y="136" width="38" height="14" />
      <rect x="12" y="60" width="26" height="76" />
      <rect x="9" y="56" width="32" height="6" />
      <rect x="14" y="30" width="22" height="26" />
      <circle className="lit" cx="25" cy="42" r="7" />
      <path d="M12 30L25 6L38 30z" />
      <rect x="24" y="-2" width="2" height="10" />
      <Row x={17} y={72} n={2} gap={10} w={5} h={14} />
      <Row x={17} y={100} n={2} gap={10} w={5} h={14} />
    </Svg>
  );
}

// TN019 Government Museum Chennai: red colonial building with a dome and verandah arches
function GovtMuseum() {
  return (
    <Svg vb="0 0 160 110">
      <rect x="2" y="100" width="156" height="10" />
      <rect x="8" y="56" width="144" height="44" />
      <rect x="6" y="52" width="148" height="5" />
      <rect x="62" y="34" width="36" height="22" />
      <Dome cx={80} y={34} r={14} />
      <Row x={14} y={64} n={7} gap={9} w={6} h={12} />
      <Row x={100} y={64} n={5} gap={9} w={6} h={12} />
      <Row x={14} y={82} n={7} gap={9} w={6} h={14} />
      <Row x={100} y={82} n={5} gap={9} w={6} h={14} />
      <Row x={68} y={40} n={3} gap={9} w={5} h={12} />
      <Arch x={74} y={78} w={12} h={22} />
    </Svg>
  );
}

// TN020 Rajaji Hall: Greek Revival columns under a pediment
function RajajiHall() {
  return (
    <Svg vb="0 0 150 110">
      <rect x="2" y="100" width="146" height="10" />
      <rect x="10" y="62" width="130" height="38" />
      <Pediment x={30} y={62} w={90} h={22} />
      <Columns x={34} y={64} n={8} gap={11} w={5} h={36} />
      <Dome cx={75} y={40} r={0.1} lantern={false} />
      <rect x="55" y="36" width="40" height="8" />
      <path d="M55 36A20 14 0 0 1 95 36z" />
      <Arch x={68} y={80} w={14} h={20} />
    </Svg>
  );
}

// TN021 Basilica of Our Lady of Good Health, Velankanni: white Gothic Revival with spires
function Basilica() {
  return (
    <Svg vb="0 0 140 150">
      <rect x="4" y="138" width="132" height="12" />
      <rect x="14" y="76" width="112" height="62" />
      <rect x="54" y="44" width="32" height="32" />
      <Dome cx={70} y={44} r={14} />
      {[18, 106].map((x) => (
        <g key={x}>
          <rect x={x} y="52" width="16" height="30" />
          <path d={`M${x - 2} 52L${x + 8} 10L${x + 18} 52z`} />
          <rect x={x + 7} y="0" width="2" height="12" />
        </g>
      ))}
      <circle className="lit" cx="70" cy="92" r="8" />
      <Arch x={62} y={112} w={16} h={26} />
      <Arch x={24} y={108} w={8} h={20} />
      <Arch x={108} y={108} w={8} h={20} />
      <Row x={22} y={60} n={1} gap={0} w={5} h={14} />
      <Row x={110} y={60} n={1} gap={0} w={5} h={14} />
    </Svg>
  );
}

// TN022 Vivekananda House: two-storey colonial house by the sea, with an arcade
function VivekanandaHouse() {
  return (
    <Svg vb="0 0 150 110">
      <rect x="2" y="100" width="146" height="10" />
      <rect x="12" y="46" width="126" height="54" />
      <rect x="8" y="42" width="134" height="6" />
      <Pediment x={56} y={42} w={38} h={14} />
      <Row x={20} y={52} n={9} gap={13} w={7} h={16} />
      <Row x={20} y={76} n={9} gap={13} w={7} h={20} />
      <rect x="12" y="72" width="126" height="3" />
    </Svg>
  );
}

// TN023 Senate House: Indo-Saracenic with a central dome and domed corner towers
function SenateHouse() {
  return (
    <Svg vb="0 0 170 110">
      <rect x="2" y="100" width="166" height="10" />
      <rect x="10" y="60" width="150" height="40" />
      <rect x="62" y="40" width="46" height="22" />
      <Dome cx={85} y={40} r={22} />
      {[10, 138].map((x) => (
        <g key={x}>
          <rect x={x} y="34" width="22" height="30" />
          <Dome cx={x + 11} y={34} r={10} />
        </g>
      ))}
      <Row x={36} y={68} n={4} gap={8} w={5} h={12} />
      <Row x={110} y={68} n={4} gap={8} w={5} h={12} />
      <Row x={36} y={84} n={4} gap={8} w={5} h={12} />
      <Row x={110} y={84} n={4} gap={8} w={5} h={12} />
      <Arch x={77} y={76} w={16} h={24} />
    </Svg>
  );
}

// TN024 Thousand Lights Mosque: a big dome, two minarets
function ThousandLights() {
  return (
    <Svg vb="0 0 140 130">
      <rect x="2" y="120" width="136" height="10" />
      <rect x="30" y="74" width="80" height="46" />
      <Dome cx={70} y={74} r={30} />
      {[12, 116].map((x) => (
        <g key={x}>
          <rect x={x} y="40" width="12" height="80" />
          <rect x={x - 2} y="62" width="16" height="3" />
          <path d={`M${x} 40A6 12 0 0 1 ${x + 12} 40z`} />
          <rect x={x + 5.2} y="18" width="1.6" height="10" />
        </g>
      ))}
      <Arch x={58} y={90} w={24} h={30} />
      <Row x={36} y={88} n={2} gap={12} w={6} h={16} />
      <Row x={92} y={88} n={2} gap={12} w={6} h={16} />
    </Svg>
  );
}

/* ---------- Germany ---------- */

// DE006 Elbphilharmonie: a wavy glass roof on a brick warehouse
function Elbphilharmonie() {
  return (
    <Svg vb="0 0 170 100">
      <rect x="2" y="90" width="166" height="10" />
      <rect x="6" y="52" width="158" height="38" />
      {Array.from({ length: 12 }, (_, i) => <rect key={i} className="lit" x={14 + i * 12.5} y={62} width={5} height={20} />)}
      <path d="M6 52L6 40Q30 12 56 26Q82 4 112 22Q140 8 164 38V52z" />
      <path className="lit" d="M14 48Q32 28 56 36Q82 16 110 32Q136 20 156 44" fill="none" />
    </Svg>
  );
}

// DE008 Heidelberg Castle: a ruined castle with towers on a hill
function HeidelbergCastle() {
  return (
    <Svg vb="0 0 160 110">
      <path d="M0 110V92Q40 80 80 86Q120 78 160 92V110z" />
      <rect x="14" y="52" width="40" height="40" />
      <path d="M14 52h6v-6h6v6h6v-6h6v6h6v-6h6v6z" />
      <rect x="62" y="40" width="30" height="52" />
      <path d="M60 40L77 14L94 40z" />
      <rect x="100" y="58" width="46" height="34" />
      <path d="M100 58h8v-6h8v6h8v-6h8v6h8v-6h6v6z" />
      <Row x={20} y={60} n={3} gap={11} w={5} h={12} />
      <Row x={106} y={66} n={3} gap={13} w={5} h={12} />
      <Arch x={70} y={52} w={14} h={22} />
      <rect x="40" y="34" width="14" height="22" />
      <path d="M40 34h4v-4h6v4h4z" />
    </Svg>
  );
}

// DE009 Frauenkirche Dresden: a great bell-shaped stone dome
function Frauenkirche() {
  return (
    <Svg vb="0 0 130 150">
      <rect x="6" y="138" width="118" height="12" />
      <rect x="20" y="86" width="90" height="52" />
      <rect x="38" y="62" width="54" height="26" />
      <path d="M36 66Q36 20 65 20Q94 20 94 66z" />
      <rect x="58" y="6" width="14" height="18" />
      <path d="M58 6L65 -4L72 6z" />
      {[8, 108].map((x) => (
        <g key={x}>
          <rect x={x} y="68" width="14" height="70" />
          <path d={`M${x - 1} 68Q${x + 7} 52 ${x + 15} 68z`} />
        </g>
      ))}
      <Row x={28} y={96} n={5} gap={16} w={7} h={22} />
      <Arch x={58} y={116} w={14} h={22} />
    </Svg>
  );
}

// DE011 Sanssouci Palace: a low palace on vineyard terraces
function Sanssouci() {
  return (
    <Svg vb="0 0 170 110">
      <path d="M0 110V100H170V110z" />
      {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={20 + i * 2} y={72 + i * 4} width={130 - i * 4} height={4} />)}
      <rect x="22" y="48" width="126" height="24" />
      <rect x="18" y="44" width="134" height="5" />
      <path d="M62 48A23 26 0 0 1 108 48z" />
      <path d="M62 48L62 72H108V48z" />
      <path d="M70 30A15 12 0 0 1 100 30z" />
      <Row x={30} y={54} n={4} gap={8} w={5} h={14} />
      <Row x={112} y={54} n={4} gap={8} w={5} h={14} />
      <Row x={68} y={54} n={4} gap={9} w={5} h={14} />
    </Svg>
  );
}

// DE012 Olympiastadion Berlin: a stone ring of arches and the bell tower
function Olympiastadion() {
  return (
    <Svg vb="0 0 170 120">
      <rect x="2" y="110" width="166" height="10" />
      <rect x="6" y="68" width="120" height="42" />
      <rect x="4" y="64" width="124" height="5" />
      <Row x={12} y={76} n={11} gap={10.5} w={6} h={26} />
      <rect x="138" y="14" width="18" height="96" />
      <rect x="136" y="10" width="22" height="6" />
      <rect x="140" y="2" width="14" height="10" />
      <Row x={142} y={30} n={1} gap={0} w={6} h={16} />
      <Row x={142} y={66} n={1} gap={0} w={6} h={16} />
      <rect x="126" y="86" width="12" height="24" />
    </Svg>
  );
}

// DE013 Nymphenburg Palace: long baroque palace with a centre block and pavilions
function Nymphenburg() {
  return (
    <Svg vb="0 0 190 100">
      <rect x="2" y="90" width="186" height="10" />
      <rect x="10" y="58" width="170" height="32" />
      <rect x="62" y="38" width="66" height="52" />
      <Pediment x={70} y={38} w={50} h={14} />
      <Columns x={74} y={40} n={5} gap={10} w={3} h={50} />
      {[4, 150].map((x) => (
        <g key={x}>
          <rect x={x} y="44" width="36" height="46" />
          <path d={`M${x - 2} 44L${x + 18} 28L${x + 38} 44z`} />
        </g>
      ))}
      <Row x={46} y={66} n={2} gap={8} w={4} h={14} />
      <Row x={136} y={66} n={2} gap={8} w={4} h={14} />
      <Arch x={89} y={68} w={12} h={22} />
    </Svg>
  );
}

// DE014 Ulm Minster: the world's tallest church spire
function UlmMinster() {
  return (
    <Svg vb="0 0 90 190">
      <rect x="2" y="176" width="86" height="14" />
      <rect x="10" y="128" width="70" height="48" />
      <rect x="26" y="64" width="38" height="66" />
      <path d="M26 64L45 4L64 64z" />
      <path d="M32 64L45 20L58 64z" className="lit" />
      <rect x="44" y="-6" width="2" height="12" />
      {[14, 66].map((x) => <g key={x}><rect x={x} y="100" width="10" height="28" /><path d={`M${x - 1} 100L${x + 5} 80L${x + 11} 100z`} /></g>)}
      <Row x={32} y={78} n={2} gap={14} w={6} h={22} />
      <Arch x={37} y={148} w={16} h={28} />
      <Row x={16} y={138} n={1} gap={0} w={6} h={20} />
      <Row x={68} y={138} n={1} gap={0} w={6} h={20} />
    </Svg>
  );
}

// DE015 St. Michael's Church (the "Michel"), Hamburg: a copper tower with a clock
function Michel() {
  return (
    <Svg vb="0 0 110 160">
      <rect x="4" y="148" width="102" height="12" />
      <rect x="14" y="108" width="82" height="40" />
      <path d="M12 108L55 90L98 108z" />
      <rect x="34" y="60" width="42" height="48" />
      <rect x="32" y="56" width="46" height="5" />
      <circle className="lit" cx="55" cy="76" r="8" />
      <rect x="40" y="30" width="30" height="28" />
      <Row x={46} y={36} n={2} gap={10} w={5} h={16} />
      <path d="M38 30Q38 6 55 6Q72 6 72 30z" />
      <rect x="54" y="-4" width="2" height="12" />
      <Row x={20} y={116} n={4} gap={16} w={6} h={24} />
      <Arch x={48} y={124} w={14} h={24} />
    </Svg>
  );
}

// DE016 Residenz Munich: a long Renaissance palace with stepped gables
function Residenz() {
  return (
    <Svg vb="0 0 180 100">
      <rect x="2" y="90" width="176" height="10" />
      <rect x="8" y="52" width="164" height="38" />
      {[30, 90, 150].map((x) => (
        <path key={x} d={`M${x - 22} 52V44h6v-8h6v-8h8v-8h4v8h8v8h6v8h6v8z`} />
      ))}
      <Row x={16} y={60} n={14} gap={11} w={6} h={14} />
      <Row x={16} y={78} n={14} gap={11} w={6} h={12} />
      <Arch x={84} y={66} w={12} h={24} />
    </Svg>
  );
}

// DE020 Zwinger Palace, Dresden: gallery with curved pavilions and a crown top
function Zwinger() {
  return (
    <Svg vb="0 0 180 110">
      <rect x="2" y="100" width="176" height="10" />
      <rect x="8" y="72" width="164" height="28" />
      <Row x={14} y={78} n={14} gap={11.5} w={6} h={20} />
      <rect x="8" y="68" width="164" height="5" />
      {[10, 138].map((x) => (
        <g key={x}>
          <rect x={x} y="48" width="32" height="52" />
          <path d={`M${x} 48Q${x + 16} 26 ${x + 32} 48z`} />
          <Arch x={x + 11} y={64} w={10} h={22} />
        </g>
      ))}
      <rect x="70" y="40" width="40" height="32" />
      <path d="M68 40Q90 8 112 40z" />
      <rect x="86" y="0" width="8" height="12" />
      <circle cx="90" cy="-2" r="4" />
      <Arch x={82} y={50} w={16} h={22} />
    </Svg>
  );
}

// DE021 Linderhof Palace: a small rococo palace with a fountain
function Linderhof() {
  return (
    <Svg vb="0 0 140 110">
      <rect x="2" y="100" width="136" height="10" />
      <rect x="22" y="52" width="96" height="48" />
      <path d="M18 52L70 24L122 52z" />
      <path d="M46 52A24 20 0 0 1 94 52z" />
      <rect x="46" y="52" width="48" height="48" />
      <Columns x={50} y={54} n={4} gap={13} w={3} h={46} />
      <Row x={28} y={62} n={3} gap={9} w={5} h={16} />
      <Row x={96} y={62} n={3} gap={9} w={5} h={16} />
      <Arch x={64} y={72} w={12} h={28} />
      <path d="M70 100Q64 80 56 72M70 100Q76 80 84 72" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="69" y="12" width="2" height="12" />
    </Svg>
  );
}

// DE022 Schwerin Castle: a fairy-tale castle with many turrets and a golden dome
function SchwerinCastle() {
  return (
    <Svg vb="0 0 160 130">
      <path className="lit" d="M0 124q10-4 20 0t20 0t20 0t20 0t20 0t20 0t20 0t20 0V130H0z" />
      <rect x="16" y="64" width="128" height="58" />
      <rect x="62" y="40" width="36" height="26" />
      <path d="M58 40Q58 14 80 14Q102 14 102 40z" />
      <rect x="79" y="0" width="2" height="16" />
      {[18, 132].map((x) => (
        <g key={x}>
          <rect x={x} y="38" width="14" height="28" />
          <path d={`M${x - 1} 38Q${x + 7} 8 ${x + 15} 38z`} />
        </g>
      ))}
      {[44, 110].map((x) => (
        <g key={x}>
          <rect x={x} y="48" width="10" height="18" />
          <path d={`M${x - 1} 48Q${x + 5} 26 ${x + 11} 48z`} />
        </g>
      ))}
      <Row x={24} y={74} n={9} gap={13} w={6} h={16} />
      <Arch x={72} y={92} w={16} h={30} />
    </Svg>
  );
}

// DE023 Bamberg Cathedral: four towers and rounded Romanesque arches
function BambergCathedral() {
  return (
    <Svg vb="0 0 170 130">
      <rect x="2" y="120" width="166" height="10" />
      <rect x="40" y="76" width="90" height="44" />
      <path d="M38 76L85 56L132 76z" />
      {[8, 46, 106, 144].map((x, i) => {
        const h = i === 1 || i === 2 ? 76 : 70;
        return (
          <g key={x}>
            <rect x={x} y={120 - h} width="18" height={h} />
            <path d={`M${x - 1} ${120 - h}L${x + 9} ${120 - h - 26}L${x + 19} ${120 - h}z`} />
            <Arch x={x + 5} y={120 - h + 10} w={8} h={18} />
          </g>
        );
      })}
      <Row x={52} y={86} n={6} gap={12} w={6} h={18} />
      <Arch x={77} y={96} w={16} h={24} />
    </Svg>
  );
}

// DE024 Aachen Cathedral: an octagonal dome with a Gothic choir and a western tower
function AachenCathedral() {
  return (
    <Svg vb="0 0 160 130">
      <rect x="2" y="120" width="156" height="10" />
      <rect x="40" y="78" width="50" height="42" />
      <rect x="44" y="50" width="42" height="30" />
      <path d="M42 52L65 28L88 52z" />
      <rect x="64" y="14" width="2" height="16" />
      <rect x="10" y="48" width="26" height="72" />
      <path d="M8 48L23 8L38 48z" />
      <rect x="90" y="70" width="56" height="50" />
      <path d="M90 70L118 54L146 70z" />
      {[96, 108, 120, 132].map((x) => <Arch key={x} x={x} y={80} w={6} h={28} />)}
      <Row x={48} y={86} n={3} gap={14} w={6} h={20} />
      <Row x={50} y={56} n={3} gap={12} w={5} h={16} />
      <Arch x={17} y={96} w={12} h={24} />
    </Svg>
  );
}

export const MORE: Record<string, { w: number; C: ComponentType }> = {
  TN005: { w: 150, C: HighCourt },
  TN007: { w: 128, C: VivekanandaRock },
  TN010: { w: 92, C: StGeorges },
  TN012: { w: 140, C: RiponBuilding },
  TN013: { w: 96, C: AnnaLibrary },
  TN014: { w: 120, C: KalaignarLibrary },
  TN015: { w: 36, C: NitClock },
  TN016: { w: 92, C: Kapaleeshwarar },
  TN019: { w: 140, C: GovtMuseum },
  TN020: { w: 130, C: RajajiHall },
  TN021: { w: 112, C: Basilica },
  TN022: { w: 130, C: VivekanandaHouse },
  TN023: { w: 146, C: SenateHouse },
  TN024: { w: 112, C: ThousandLights },
  TN025: { w: 84, C: MadhurTower },
  DE006: { w: 150, C: Elbphilharmonie },
  DE008: { w: 140, C: HeidelbergCastle },
  DE009: { w: 108, C: Frauenkirche },
  DE011: { w: 150, C: Sanssouci },
  DE012: { w: 146, C: Olympiastadion },
  DE013: { w: 160, C: Nymphenburg },
  DE014: { w: 62, C: UlmMinster },
  DE015: { w: 86, C: Michel },
  DE016: { w: 156, C: Residenz },
  DE020: { w: 150, C: Zwinger },
  DE021: { w: 120, C: Linderhof },
  DE022: { w: 140, C: SchwerinCastle },
  DE023: { w: 148, C: BambergCathedral },
  DE024: { w: 138, C: AachenCathedral },
};
