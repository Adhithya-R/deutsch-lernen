import type { Table } from "@/content/lessons";
import { isTamilColumn, Mixed } from "@/lib/tamil";

export default function DataTable({ table }: { table: Table }) {
  const ta = table.headers.map(isTamilColumn);
  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-line bg-white">
      <table className="w-full min-w-[20rem] text-left text-[14.5px]">
        <caption className="border-b-2 border-line bg-sand-2 px-4 py-2.5 text-left text-sm font-extrabold">
          <Mixed text={table.title} />
        </caption>
        <thead>
          <tr className="text-[12px] text-muted">
            {table.headers.map((h, j) => (
              <th key={h} className={`px-4 py-2 font-extrabold ${ta[j] ? "ta-only" : ""}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((r, i) => (
            <tr key={i} className="border-t border-sand">
              {r.map((c, j) => (
                <td
                  key={j}
                  lang={ta[j] ? "ta" : undefined}
                  className={`px-4 py-2.5 ${ta[j] ? "ta-only" : ""} ${j === 0 ? "font-extrabold" : ""} ${j === 1 && table.headers[1] === "Ending" ? "font-extrabold text-pri" : ""}`}
                >
                  <Mixed text={c} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
