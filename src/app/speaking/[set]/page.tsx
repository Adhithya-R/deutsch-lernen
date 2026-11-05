import { notFound } from "next/navigation";
import ScreenTop from "@/components/ScreenTop";
import SpeakingPractice from "@/components/SpeakingPractice";
import { setById, speakSets } from "@/content/speaking";

export function generateStaticParams() {
  return speakSets.map((s) => ({ set: s.id }));
}

export default async function SpeakingSetPage({ params }: PageProps<"/speaking/[set]">) {
  const { set: id } = await params;
  const set = setById(id);
  if (!set) notFound();
  return (
    <main className="mx-auto w-full max-w-md pb-8 lg:max-w-xl">
      <ScreenTop tab="exam" ids={["TN002", "DE001"]} mood="noon" kicker={set.sub} title={set.title} height={110} />
      <div className="px-4 pt-4">
        <SpeakingPractice key={set.id} setId={set.id} items={set.items} />
      </div>
    </main>
  );
}
