"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon, { type IconName } from "@/components/Icon";

const TABS: { label: string; href: string; icon: IconName; match: (p: string) => boolean }[] = [
  { label: "Home", href: "/", icon: "home", match: (p) => p === "/" },
  { label: "Lessons", href: "/lessons", icon: "book", match: (p) => p.startsWith("/lessons") },
  { label: "Cards", href: "/flashcards", icon: "cards", match: (p) => p.startsWith("/flashcards") },
  { label: "Exam", href: "/exam", icon: "grad", match: (p) => p.startsWith("/exam") },
  {
    label: "More",
    href: "/more",
    icon: "menu",
    match: (p) => ["/more", "/cheatsheets", "/login", "/signup"].some((x) => p.startsWith(x)),
  },
];

// Bottom navigation for phones. Hidden on large screens, where the top menu is used.
export default function TabBar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-line bg-white px-1 pt-2 lg:hidden"
      style={{ paddingBottom: "max(10px, env(safe-area-inset-bottom))" }}
    >
      {TABS.map((t) => {
        const on = t.match(pathname);
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={on ? "page" : undefined}
            className={`flex flex-col items-center gap-1 text-[11.5px] ${on ? "font-bold text-ink" : "font-medium text-muted"}`}
          >
            <span className={`grid h-8 w-16 place-items-center rounded-full ${on ? "bg-pill text-pri" : ""}`}>
              <Icon name={t.icon} size={22} />
            </span>
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
