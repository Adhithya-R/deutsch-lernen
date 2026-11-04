import Skyline, { type SkyTab } from "@/components/Skyline";

// The animated skyline plus the page title, used at the top of every tab.
export default function ScreenTop({ tab, kicker, title, height = 140 }: { tab: SkyTab; kicker: string; title: string; height?: number }) {
  return (
    <>
      <Skyline tab={tab} height={height} />
      <div className="px-4 pt-4">
        <p className="text-[13px] font-extrabold uppercase tracking-wider text-pri">{kicker}</p>
        <h1 className="text-3xl font-extrabold">{title}</h1>
      </div>
    </>
  );
}
