// The weather and time of day behind a skyline. Each module uses a different mood so screens do not look alike.
// Mood names: see lib/landmarks.ts. Styles and animations are in globals.css.
import type { Mood } from "@/lib/landmarks";

const Cloud = ({ top, w, dur, delay = 0, dark }: { top: number; w: number; dur: number; delay?: number; dark?: boolean }) => (
  <div className={`cloud ${dark ? "dark" : ""}`} style={{ top, width: w, animationDuration: `${dur}s`, animationDelay: `${-delay}s` }} aria-hidden="true" />
);

const Sparkle = ({ x, y, d }: { x: string; y: number; d: number }) => (
  <svg className="star" style={{ left: x, top: y, animationDelay: `${d}s` }} width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M6 0L7.4 4.6 12 6 7.4 7.4 6 12 4.6 7.4 0 6 4.6 4.6z" fill="#e0a800" />
  </svg>
);

const Kite = ({ x, y, color, d }: { x: string; y: number; color: string; d: number }) => (
  <svg className="kite" style={{ left: x, top: y, animationDelay: `${d}s` }} width="24" height="58" viewBox="0 0 24 58" aria-hidden="true">
    <path d="M12 0L22 12 12 28 2 12z" fill={color} />
    <path d="M12 0V28M2 12H22" stroke="rgba(0,0,0,.28)" strokeWidth="1" />
    <path d="M12 28q-4 6 0 10t0 10 0 8" stroke="#5f3010" strokeWidth="1.2" fill="none" />
  </svg>
);

const Butterfly = ({ x, y, color, d }: { x: string; y: number; color: string; d: number }) => (
  <div className="butterfly" style={{ left: x, bottom: y, animationDelay: `${d}s` }} aria-hidden="true">
    <svg width="16" height="12" viewBox="0 0 14 10" fill={color}>
      <ellipse cx="4" cy="5" rx="4" ry="4.5" />
      <ellipse cx="10" cy="5" rx="4" ry="4.5" />
    </svg>
  </div>
);

const Lamp = ({ x, string: len, d }: { x: string; string: number; d: number }) => (
  <svg className="lamp" style={{ left: x, animationDelay: `${d}s` }} width="22" height={len + 30} viewBox={`0 0 22 ${len + 30}`} aria-hidden="true">
    <rect x="10.6" y="0" width="0.8" height={len} fill="#5f3010" />
    <path className="flame" d={`M11 ${len - 1}Q15.5 ${len + 4} 11 ${len + 9}Q6.5 ${len + 4} 11 ${len - 1}z`} fill="#ff9d00" />
    <path d={`M3 ${len + 8}H19Q19 ${len + 17} 11 ${len + 17}Q3 ${len + 17} 3 ${len + 8}z`} fill="#8a6500" />
  </svg>
);

const Leaf = ({ x, color, dur, delay }: { x: string; color: string; dur: number; delay: number }) => (
  <div className="leaf" style={{ left: x, animationDuration: `${dur}s`, animationDelay: `${-delay}s` }} aria-hidden="true">
    <svg width="17" height="17" viewBox="0 0 12 12" fill={color}>
      <path d="M6 0C10 3 10 9 6 12 2 9 2 3 6 0z" />
    </svg>
  </div>
);

const Bird = ({ x, y }: { x: number; y: number }) => (
  <svg style={{ position: "absolute", left: x, top: y }} width="16" height="8" viewBox="0 0 16 8" aria-hidden="true">
    <path d="M1 6Q4 0 8 5Q12 0 15 6" fill="none" stroke="var(--tab-accd)" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

function Bridge() {
  // A far, faint arch bridge: the "Brücke" in Brücke.
  const y = (t: number) => 70 - 160 * t * (1 - t);
  const hangers = [60, 100, 140, 180, 220, 260, 300, 340];
  return (
    <svg className="abs" style={{ left: 0, right: 0, bottom: 28, width: "100%", height: 70, opacity: 0.28 }} viewBox="0 0 400 80" preserveAspectRatio="none" aria-hidden="true">
      <path d="M-10 70Q200 -10 410 70" fill="none" stroke="var(--tab-accd)" strokeWidth="5" vectorEffect="non-scaling-stroke" />
      <path d="M0 64H400" stroke="var(--tab-accd)" strokeWidth="4" vectorEffect="non-scaling-stroke" />
      {hangers.map((x) => (
        <path key={x} d={`M${x} 64V${y((x + 10) / 420) + 2}`} stroke="var(--tab-accd)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}


const Balloon = ({ x, y, w, color, dur, delay }: { x: string; y: number; w: number; color: string; dur: number; delay: number }) => (
  <svg
    className="balloon"
    style={{ left: x, top: y, animationDuration: `${dur}s`, animationDelay: `${-delay}s` }}
    width={w}
    height={(w * 44) / 30}
    viewBox="0 0 30 44"
    aria-hidden="true"
  >
    <path d="M15 0C25 0 30 8 30 15C30 24 21 30 17 34H13C9 30 0 24 0 15C0 8 5 0 15 0z" fill={color} />
    <path d="M15 0C11 6 10 14 13 34H17C20 14 19 6 15 0z" fill="#fff" opacity="0.75" />
    <path d="M13 34L12 37M17 34L18 37" stroke="#5f3010" strokeWidth="0.8" />
    <rect x="11.5" y="37" width="7" height="5" fill="#5f3010" />
  </svg>
);

const Flake = ({ x, s, dur, delay }: { x: string; s: number; dur: number; delay: number }) => (
  <div className="flake" style={{ left: x, width: s, height: s, animationDuration: `${dur}s`, animationDelay: `${-delay}s` }} aria-hidden="true" />
);

const Lantern = ({ x, dur, delay }: { x: string; dur: number; delay: number }) => (
  <div className="lantern" style={{ left: x, animationDuration: `${dur}s`, animationDelay: `${-delay}s` }} aria-hidden="true" />
);

const PENNANTS = ["#d00000", "#ffce00", "#0f6b64", "#e8470f", "#ffffff", "#8a6500"];
function Bunting() {
  // flags hang along a gentle curve from one side to the other
  const xs = Array.from({ length: 13 }, (_, i) => 4 + i * 7.7);
  return (
    <>
      <svg className="abs" style={{ left: 0, right: 0, top: 0, width: "100%", height: 36 }} viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 2Q50 30 100 2" fill="none" stroke="var(--tab-accd)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      {xs.map((x, i) => (
        <div
          key={i}
          className="pennant"
          style={{ left: `${x}%`, top: 2 + 24 * Math.sin((Math.PI * x) / 100) * 0.95, borderTopColor: PENNANTS[i % PENNANTS.length], animationDelay: `${(i % 4) * 0.25}s` }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}

function Rainbow() {
  const colors = ["#d64545", "#f08a24", "#ffce00", "#4caf50", "#4a90d9"];
  return (
    <svg className="abs rainbow" style={{ left: "16%", width: "68%", bottom: 26, height: "78%" }} viewBox="0 0 200 100" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      {colors.map((c, i) => (
        <path key={c} d={`M${10 + i * 7} 100A${90 - i * 7} ${90 - i * 7} 0 0 1 ${190 - i * 7} 100`} fill="none" stroke={c} strokeWidth="6" />
      ))}
    </svg>
  );
}

/** Things behind the buildings (sun, moon, clouds, lamps...). */
export function SceneBack({ mood }: { mood: Mood }) {
  switch (mood) {
    case "dawn": // arrival: a low sun and a plane coming in
      return (
        <>
          <div className="abs sun-low" style={{ left: "40%", bottom: 8 }} aria-hidden="true" />
          <div className="plane" style={{ top: 34 }} aria-hidden="true">
            <i />
            <svg viewBox="0 0 44 16"><path d="M2 8L14 6H26L32 1H36L33 6H40L43 8 40 10H33L36 15H32L26 10H14z" /></svg>
          </div>
          <Cloud top={78} w={48} dur={46} delay={14} />
        </>
      );
    case "noon": // friends: high sun with rays, kites, butterflies and the German flag
      return (
        <>
          <svg className="abs rays" style={{ left: "30%", top: 8 }} width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="13" fill="#ffc93c" />
            {Array.from({ length: 8 }, (_, i) => (
              <path key={i} d="M32 4V12" stroke="#ffb300" strokeWidth="3.5" strokeLinecap="round" transform={`rotate(${i * 45} 32 32)`} />
            ))}
          </svg>
          <Kite x="50%" y={10} color="#ffce00" d={0} />
          <Kite x="57%" y={52} color="#d00000" d={0.8} />
          <Kite x="20%" y={12} color="#ffffff" d={1.6} />
          <Butterfly x="38%" y={36} color="#e8470f" d={0} />
          <Butterfly x="47%" y={44} color="#8a6500" d={2.2} />
          <div className="flag" aria-hidden="true"><i /><b /><b /><b /></div>
        </>
      );
    case "evening": // words: a moon, twinkling stars and hanging oil lamps
      return (
        <>
          <svg className="abs" style={{ right: "26%", top: 16 }} width="46" height="46" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#ffd966" />
          </svg>
          <Sparkle x="20%" y={22} d={0} />
          <Sparkle x="38%" y={62} d={0.7} />
          <Sparkle x="64%" y={30} d={1.3} />
          <Sparkle x="82%" y={70} d={1.9} />
          <Sparkle x="8%" y={64} d={2.3} />
          <Lamp x="12%" string={10} d={0} />
          <Lamp x="48%" string={26} d={1.2} />
          <Lamp x="70%" string={14} d={2.1} />
        </>
      );
    case "rain": // exam: monsoon over Chennai and drizzle over Berlin
      return (
        <>
          <Cloud top={14} w={86} dur={50} dark />
          <Cloud top={40} w={70} dur={64} delay={22} dark />
          <Cloud top={8} w={60} dur={58} delay={36} dark />
        </>
      );
    case "sunset": // Brücke: a red sun, birds going home, and a bridge between the two countries
      return (
        <>
          <div className="abs sun-low red" style={{ left: "17%", bottom: -6 }} aria-hidden="true" />
          <Bridge />
          <div className="vbirds" style={{ top: 30 }} aria-hidden="true">
            <Bird x={0} y={0} /><Bird x={-14} y={9} /><Bird x={14} y={9} /><Bird x={-28} y={18} /><Bird x={28} y={18} />
          </div>
          <Cloud top={62} w={64} dur={60} delay={25} />
        </>
      );
    case "snow": // a winter flat visit: soft clouds and a pale sun
      return (
        <>
          <div className="abs" style={{ right: "30%", top: 16, width: 34, height: 34, borderRadius: "50%", background: "#fff3c4", boxShadow: "0 0 0 8px rgba(255,243,196,.5)" }} aria-hidden="true" />
          <Cloud top={20} w={92} dur={60} dark />
          <Cloud top={52} w={64} dur={70} delay={30} dark />
        </>
      );
    case "balloons": // a bright morning with hot-air balloons
      return (
        <>
          <svg className="abs rays" style={{ left: "44%", top: 8 }} width="56" height="56" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="13" fill="#ffc93c" />
            {Array.from({ length: 8 }, (_, i) => (
              <path key={i} d="M32 4V12" stroke="#ffb300" strokeWidth="3.5" strokeLinecap="round" transform={`rotate(${i * 45} 32 32)`} />
            ))}
          </svg>
          <Balloon x="18%" y={16} w={30} color="#d64545" dur={9} delay={0} />
          <Balloon x="62%" y={44} w={22} color="#ffce00" dur={11} delay={3} />
          <Balloon x="76%" y={22} w={26} color="#0f6b64" dur={10} delay={6} />
        </>
      );
    case "festival": // Pongal in Berlin: bunting, floating lanterns, sparkles
      return (
        <>
          <Bunting />
          <Lantern x="14%" dur={9} delay={0} />
          <Lantern x="34%" dur={11} delay={4} />
          <Lantern x="60%" dur={10} delay={2} />
          <Lantern x="84%" dur={12} delay={7} />
          <Sparkle x="26%" y={58} d={0} />
          <Sparkle x="50%" y={74} d={0.9} />
          <Sparkle x="72%" y={50} d={1.7} />
        </>
      );
    case "steam": // Idli for all: a warm sky with rising steam puffs
      return (
        <>
          <div className="abs" style={{ right: "14%", top: 14, width: 32, height: 32, borderRadius: "50%", background: "#ffd98a", boxShadow: "0 0 0 8px rgba(255,217,138,.4)" }} aria-hidden="true" />
          {[18, 36, 54, 72].map((x, i) => (
            <span key={x} className="puff" style={{ left: `${x}%`, animationDelay: `${i * 0.9}s` }} aria-hidden="true" />
          ))}
          <Cloud top={30} w={60} dur={55} delay={8} />
        </>
      );
    case "confetti": // Kolam: colour dots drifting down
      return (
        <>
          <div className="abs" style={{ left: "10%", top: 14, width: 32, height: 32, borderRadius: "50%", background: "#ffc93c", boxShadow: "0 0 0 8px rgba(255,201,60,.3)" }} aria-hidden="true" />
          {["#d64545", "#ffce00", "#0f6b64", "#f08a24", "#4a90d9", "#e0457b", "#4caf50", "#d64545"].map((c, i) => (
            <span key={i} className="conf" style={{ left: `${8 + i * 11}%`, background: c, animationDelay: `${(i * 0.7) % 4}s`, animationDuration: `${5 + (i % 3)}s` }} aria-hidden="true" />
          ))}
        </>
      );
    case "fireworks": // Deepavali: a night sky with bursts
      return (
        <>
          <div className="abs" style={{ inset: 0, background: "linear-gradient(#26264a,#4a3a6a 80%)", opacity: 0.55 }} aria-hidden="true" />
          {[[22, 20], [50, 34], [76, 18]].map(([x, y], i) => (
            <span key={x} className="burst" style={{ left: `${x}%`, top: y, animationDelay: `${i * 1.2}s` }} aria-hidden="true" />
          ))}
          <Sparkle x="12%" y={60} d={0.4} />
          <Sparkle x="88%" y={52} d={1.4} />
        </>
      );
    case "night": // an evening out: a big moon and many twinkling stars
      return (
        <>
          <div className="abs" style={{ inset: 0, background: "linear-gradient(#1f2a55,#4a4a7a 85%)", opacity: 0.6 }} aria-hidden="true" />
          <div className="abs" style={{ right: "16%", top: 12, width: 38, height: 38, borderRadius: "50%", background: "#fff3c4", boxShadow: "0 0 0 10px rgba(255,243,196,.25)" }} aria-hidden="true" />
          {[[8, 14], [20, 40], [34, 18], [46, 52], [58, 24], [70, 60], [82, 38], [92, 16]].map(([x, y], i) => (
            <Sparkle key={i} x={`${x}%`} y={y} d={(i * 0.45) % 3} />
          ))}
        </>
      );
    case "petals": // spring: a soft sun and a few clouds, petals fall in front
      return (
        <>
          <div className="abs" style={{ left: "62%", top: 14, width: 34, height: 34, borderRadius: "50%", background: "#ffd873", boxShadow: "0 0 0 8px rgba(255,216,115,.35)" }} aria-hidden="true" />
          <Cloud top={24} w={70} dur={50} />
          <Cloud top={56} w={52} dur={62} delay={20} />
        </>
      );
    case "breeze": // a windy day: fast clouds and flying birds
      return (
        <>
          <div className="abs" style={{ left: "12%", top: 16, width: 32, height: 32, borderRadius: "50%", background: "#ffc93c", boxShadow: "0 0 0 8px rgba(255,201,60,.28)" }} aria-hidden="true" />
          <Cloud top={18} w={86} dur={18} />
          <Cloud top={44} w={60} dur={24} delay={6} />
          <Cloud top={66} w={74} dur={20} delay={11} />
          <div className="vbirds" style={{ top: 34 }} aria-hidden="true">
            <Bird x={0} y={0} /><Bird x={-14} y={9} /><Bird x={14} y={9} />
          </div>
        </>
      );
    case "rainbow": // after the rain: a rainbow and a clear sky
      return (
        <>
          <Rainbow />
          <div className="abs" style={{ left: "8%", top: 14, width: 30, height: 30, borderRadius: "50%", background: "#ffc93c", boxShadow: "0 0 0 8px rgba(255,201,60,.28)" }} aria-hidden="true" />
          <Cloud top={40} w={56} dur={52} delay={12} />
        </>
      );
    case "autumn": // Me: a small sun and falling leaves
      return (
        <>
          <div className="abs" style={{ left: "36%", top: 18, width: 34, height: 34, borderRadius: "50%", background: "#ffc93c", boxShadow: "0 0 0 8px rgba(255,201,60,.28)" }} aria-hidden="true" />
          <Cloud top={50} w={52} dur={48} delay={10} />
        </>
      );
  }
}

/** Things in front of the buildings (rain, falling leaves). */
export function SceneFront({ mood }: { mood: Mood }) {
  if (mood === "rain") return <div className="rain" aria-hidden="true" />;
  if (mood === "snow")
    return (
      <>
        {[4, 11, 18, 26, 33, 41, 48, 56, 63, 71, 78, 86, 93].map((x, i) => (
          <Flake key={x} x={`${x}%`} s={5 + (i % 3) * 2} dur={6 + (i % 5)} delay={(i * 1.3) % 7} />
        ))}
      </>
    );
  if (mood === "petals")
    return (
      <>
        {["6%", "20%", "34%", "48%", "62%", "76%", "90%"].map((x, i) => (
          <Leaf key={x} x={x} color={["#f4a6b8", "#f7c1cf", "#ee8fa8"][i % 3]} dur={8 + (i % 4)} delay={(i * 1.7) % 8} />
        ))}
      </>
    );
  if (mood === "autumn")
    return (
      <>
        <Leaf x="8%" color="#c2540a" dur={9} delay={0} />
        <Leaf x="22%" color="#d98a1f" dur={12} delay={5} />
        <Leaf x="38%" color="#8f3d05" dur={10} delay={2} />
        <Leaf x="54%" color="#e0a02a" dur={13} delay={7} />
        <Leaf x="68%" color="#c2540a" dur={9.5} delay={3} />
        <Leaf x="84%" color="#a8470a" dur={11} delay={8} />
      </>
    );
  return null;
}
