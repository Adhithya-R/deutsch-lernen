"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import NavPending from "@/components/NavPending";
import { TABS, tabFor } from "@/lib/tabs";

// Bottom navigation on phones. On laptops the same five links sit in the top bar.
export default function TabBar() {
  const current = tabFor(usePathname());
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t-2 border-line bg-white px-1 pt-1.5 lg:hidden"
      style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}
    >
      {TABS.map((t) => {
        const on = t.id === current;
        return (
          <Link
            key={t.id}
            href={t.href}
            aria-current={on ? "page" : undefined}
            className={`relative flex flex-col items-center gap-0.5 py-1 text-[11.5px] font-extrabold ${on ? "text-ink" : "text-muted"}`}
          >
            <span className={`grid h-9 w-14 place-items-center rounded-xl ${on ? "bg-pill text-pri ring-2 ring-pri" : ""}`}>
              <Icon name={t.icon} size={22} />
            </span>
            {t.label}
            <NavPending />
          </Link>
        );
      })}
    </nav>
  );
}
