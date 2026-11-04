// Animated skyline pairing a Tamil Nadu landmark with a German one. Which landmarks come from
// content/landmarks.json by id; the look is pure SVG + CSS (see globals.css). Colours follow the active tab.
import type { ReactNode } from "react";
import { drawingFor } from "@/components/landmarks";
import SkyInfo from "@/components/SkyInfo";
import { landmark, type Landmark } from "@/lib/landmarks";

export default function Skyline({ ids, height = 150, children }: { ids: string[]; height?: number; children?: ReactNode }) {
  const k = Math.min(1, (height - 44) / 130);
  const items = ids.slice(0, 3).map(landmark).filter((l): l is Landmark => !!l);

  return (
    <div className="sky" style={{ height }}>
      <div className="sun" aria-hidden="true" />
      <div className="cloud" style={{ top: 30, width: 56, animationDuration: "38s" }} aria-hidden="true" />
      <div className="cloud" style={{ top: 74, width: 44, animationDuration: "52s", animationDelay: "-20s" }} aria-hidden="true" />
      <svg className="bird" style={{ top: 50, animationDuration: "26s" }} viewBox="0 0 16 8" aria-hidden="true"><path d="M1 6Q4 0 8 5Q12 0 15 6" /></svg>
      <svg className="bird" style={{ top: 84, animationDuration: "34s", animationDelay: "-12s" }} viewBox="0 0 16 8" aria-hidden="true"><path d="M1 6Q4 0 8 5Q12 0 15 6" /></svg>

      {items.map((l, i) => {
        const { w, C } = drawingFor(l.id, `${l.type} ${l.name}`);
        const last = i === items.length - 1 && items.length > 1;
        const middle = items.length === 3 && i === 1;
        // narrow towers sit further in, so they do not hide behind the flag
        const pos = middle ? { left: "38%" } : last ? { right: w < 50 ? "16%" : "2%" } : { left: "4%" };
        return (
          <div key={l.id} className={`lm ${middle ? "far" : ""}`} style={{ width: Math.round(w * k), ...pos }} aria-hidden="true">
            <C />
          </div>
        );
      })}

      <div className="flag" aria-hidden="true"><i /><b /><b /><b /></div>
      <div className="ground" aria-hidden="true" />
      <div className="flagline" aria-hidden="true" />
      <SkyInfo items={items} />
      {children}
    </div>
  );
}
