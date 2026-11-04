import Skyline from "@/components/Skyline";
import { SKY_IDS, SKY_MOOD, type Mood } from "@/lib/landmarks";
import type { TabId } from "@/lib/tabs";

// The animated skyline plus the page title, used at the top of every tab.
export default function ScreenTop({ tab, kicker, title, height = 140, ids, mood }: { tab: TabId; kicker: string; title: string; height?: number; ids?: string[]; mood?: Mood }) {
  return (
    <>
      <Skyline ids={ids ?? SKY_IDS[tab]} mood={mood ?? SKY_MOOD[tab]} height={height} />
      <div className="px-4 pt-4">
        <p className="text-[13px] font-extrabold uppercase tracking-wider text-pri">{kicker}</p>
        <h1 className="text-3xl font-extrabold">{title}</h1>
      </div>
    </>
  );
}
