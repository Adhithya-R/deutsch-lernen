import type { CaseRow } from "@/content/lessons";
import { Mixed } from "@/lib/tamil";

export default function CaseTable({ title, rows }: { title: string; rows: CaseRow[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-line bg-white">
      <table className="w-full min-w-[22rem] text-left text-[14.5px]">
        <caption className="border-b-2 border-line bg-sand-2 px-4 py-2.5 text-left text-sm font-extrabold">{title}</caption>
        <thead>
          <tr className="text-[12px] text-muted">
            <th className="px-4 py-2 font-extrabold">Gender</th>
            <th className="px-4 py-2 font-extrabold">Nominativ</th>
            <th className="px-4 py-2 font-extrabold text-pri">Akkusativ</th>
            <th className="px-4 py-2 font-extrabold text-teal">Dativ</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.gender} className="border-t border-sand">
              <td className="px-4 py-2.5"><Mixed text={r.gender} /></td>
              <td className="px-4 py-2.5 font-extrabold">{r.nom}</td>
              <td className="px-4 py-2.5 font-extrabold text-pri">{r.akk}</td>
              <td className="px-4 py-2.5 font-extrabold text-teal">{r.dat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
