import type { Table } from "@/content/lessons";

export default function DataTable({ table }: { table: Table }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full text-left text-sm">
        <caption className="bg-slate-50 p-2 text-left font-semibold">{table.title}</caption>
        <thead className="bg-slate-100">
          <tr>
            {table.headers.map((h) => (
              <th key={h} className="p-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((r, i) => (
            <tr key={i} className="border-t border-slate-200">
              {r.map((c, j) => (
                <td key={j} className={`p-2 ${j === 0 ? "font-medium" : ""}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
