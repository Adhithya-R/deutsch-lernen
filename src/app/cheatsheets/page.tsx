import Link from "next/link";
import Icon from "@/components/Icon";
import ScreenTop from "@/components/ScreenTop";
import { sheets } from "@/content/cheatsheets";

export const metadata = { title: "Cheat sheets · மொழி-Brücke" };

const row = "flex items-center gap-3 rounded-2xl border-2 border-line bg-white p-4 shadow-[0_3px_0_var(--color-line)] hover:border-pri";

export default function CheatSheetsPage() {
  return (
    <main className="mx-auto w-full max-w-md lg:max-w-xl">
      <ScreenTop tab="learn" ids={["TN012", "DE020"]} mood="sunset" kicker="Quick tables" title="Cheat sheets" />
      <div className="flex flex-col gap-2.5 px-4 pt-3">
        <p className="text-muted">The tables you need, on one page each. Use them while you practise.</p>
        <Link href="/cheatsheets/cases" className={row}>
          <Icon name="table" size={22} className="shrink-0 text-pri" />
          <span className="min-w-0 flex-1">
            <span className="block font-extrabold">Cases</span>
            <span className="block text-sm text-muted">Nominativ, Akkusativ, Dativ, prepositions and verbs</span>
          </span>
          <Icon name="chev" size={20} className="text-muted" />
        </Link>
        {sheets.map((s) => (
          <Link key={s.slug} href={`/cheatsheets/${s.slug}`} className={row}>
            <Icon name="table" size={22} className="shrink-0 text-pri" />
            <span className="min-w-0 flex-1">
              <span className="block font-extrabold">{s.title}</span>
              <span className="block text-sm text-muted">{s.desc}</span>
            </span>
            <Icon name="chev" size={20} className="text-muted" />
          </Link>
        ))}
      </div>
    </main>
  );
}
