import { notFound } from "next/navigation";
import ConversationPractice from "@/components/ConversationPractice";
import ScreenTop from "@/components/ScreenTop";
import { scenarioById, scenarios } from "@/content/conversations";

export function generateStaticParams() {
  return scenarios.map((s) => ({ id: s.id }));
}

export default async function ScenarioPage({ params }: PageProps<"/conversation/[id]">) {
  const { id } = await params;
  const scenario = scenarioById(id);
  if (!scenario) notFound();
  return (
    <main className="mx-auto w-full max-w-md pb-10 lg:max-w-xl">
      <ScreenTop tab="exam" ids={scenario.landmarks} mood="noon" kicker={`${scenario.level} · ${scenario.sub}`} title={scenario.title} height={110} />
      <div className="px-4 pt-4">
        <ConversationPractice key={scenario.id} scenario={scenario} />
      </div>
    </main>
  );
}
