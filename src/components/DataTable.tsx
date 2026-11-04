import type { Table } from "@/content/lessons";

export default function DataTable({ table }: { table: Table }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white">
      <table className="w-full min-w-[20rem] text-left text-[14px]">
        <caption className="border-b border-line bg-sand-2 px-4 py-2.5 text-left text-sm font-semibold">{table.title}</caption>
        <thead>
          <tr className="text-[12px] text-muted">
            {table.headers.map((h) => (
              <th key={h} className="px-4 py-2 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((r, i) => (
            <tr key={i} className="border-t border-sand">
              {r.map((c, j) => (
                <td key={j} className={`px-4 py-2.5 ${j === 0 ? "font-semibold" : ""} ${j === 1 && table.headers[1] === "Ending" ? "font-semibold text-pri" : ""}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
