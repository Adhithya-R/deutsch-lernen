import type { CaseRow } from "@/content/lessons";

export default function CaseTable({ title, rows }: { title: string; rows: CaseRow[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white">
      <table className="w-full min-w-[22rem] text-left text-[14px]">
        <caption className="border-b border-line bg-sand-2 px-4 py-2.5 text-left text-sm font-semibold">{title}</caption>
        <thead>
          <tr className="text-[12px] text-muted">
            <th className="px-4 py-2 font-semibold">Gender</th>
            <th className="px-4 py-2 font-semibold">Nominativ</th>
            <th className="px-4 py-2 font-semibold text-pri">Akkusativ</th>
            <th className="px-4 py-2 font-semibold text-teal">Dativ</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.gender} className="border-t border-sand">
              <td className="px-4 py-2.5">{r.gender}</td>
              <td className="px-4 py-2.5 font-semibold">{r.nom}</td>
              <td className="px-4 py-2.5 font-semibold text-pri">{r.akk}</td>
              <td className="px-4 py-2.5 font-semibold text-teal">{r.dat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
