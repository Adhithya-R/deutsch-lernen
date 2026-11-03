import type { CaseRow } from "@/content/lessons";

export default function CaseTable({ title, rows }: { title: string; rows: CaseRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full text-left text-sm">
        <caption className="bg-slate-50 p-2 text-left font-semibold">{title}</caption>
        <thead className="bg-slate-100">
          <tr>
            <th className="p-2">Gender</th>
            <th className="p-2">Nominativ</th>
            <th className="p-2">Akkusativ</th>
            <th className="p-2">Dativ</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.gender} className="border-t border-slate-200">
              <td className="p-2">{r.gender}</td>
              <td className="p-2 font-medium">{r.nom}</td>
              <td className="p-2 font-medium text-red-600">{r.akk}</td>
              <td className="p-2 font-medium text-blue-600">{r.dat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
