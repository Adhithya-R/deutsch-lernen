// Animated skyline pairing a Tamil Nadu landmark with a German one, with the building names on the ground.
// Which landmarks come from content/landmarks.json by id; the weather is a `mood` (see SkyScenes.tsx).
import type { ReactNode } from "react";
import { drawingFor } from "@/components/landmarks";
import { BridgeScene, SceneBack, SceneFront } from "@/components/SkyScenes";
import SkyInfo from "@/components/SkyInfo";
import { labelName, landmark, type Landmark, type Mood } from "@/lib/landmarks";

export default function Skyline({ ids, mood, height = 150, children }: { ids: string[]; mood: Mood; height?: number; children?: ReactNode }) {
  const k = Math.min(1, (height - 50) / 130);
  const items = ids.slice(0, 3).map(landmark).filter((l): l is Landmark => !!l);

  return (
    <div className="sky" style={{ height }}>
      <SceneBack mood={mood} />
      <BridgeScene mood={mood} />

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

      <SceneFront mood={mood} />
      <div className="ground" aria-hidden="true" />
      <div className="flagline" aria-hidden="true" />

      {items.map((l, i) => {
        const last = i === items.length - 1 && items.length > 1;
        const middle = items.length === 3 && i === 1;
        const crowded = items.length === 3;
        const pos = middle ? { left: "36%", maxWidth: "30%" } : last ? { right: "2%", maxWidth: crowded ? "32%" : "46%" } : { left: "2%", maxWidth: crowded ? "34%" : "46%" };
        return (
          <span key={l.id} className="lm-label" style={pos} title={`${l.name}, ${l.city}`}>
            {labelName(l, crowded)}
          </span>
        );
      })}

      <SkyInfo items={items} />
      {children}
    </div>
  );
}
