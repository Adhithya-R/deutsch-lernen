import Link from "next/link";
import Icon from "@/components/Icon";
import PageNav from "@/components/PageNav";
import ScreenTop from "@/components/ScreenTop";
import { scenarios } from "@/content/conversations";

export const metadata = { title: "Conversation practice · மொழி-Brücke" };

export default function ConversationPage() {
  return (
    <main className="mx-auto w-full max-w-md lg:max-w-xl">
      <ScreenTop tab="exam" ids={["TN004", "DE005"]} mood="noon" kicker="Talk like in real life" title="Conversation" />
      <div className="px-4 pb-6 pt-3">
        <p className="text-muted">A partner speaks. You choose the reply that fits. Everything is spoken aloud, so listen carefully.</p>
        <ul className="mt-4 grid gap-3">
          {scenarios.map((s) => (
            <li key={s.id}>
              <Link href={`/conversation/${s.id}`} className="flex items-center gap-3 rounded-2xl border-2 border-line bg-white p-4 shadow-[0_3px_0_var(--color-line)] active:translate-y-0.5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-pill font-display text-sm font-extrabold text-pri-dark">{s.level}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-extrabold leading-tight">{s.title}</span>
                  <span className="block text-sm text-muted">{s.sub} · {s.turns.length} turns</span>
                </span>
                <Icon name="chev" size={20} className="text-muted" />
              </Link>
            </li>
          ))}
        </ul>
        <PageNav back={{ href: "/exam", label: "Exam" }} next={{ href: "/speaking", label: "Speaking" }} />
      </div>
    </main>
  );
}
