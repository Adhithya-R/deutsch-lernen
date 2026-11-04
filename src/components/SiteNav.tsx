"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { TABS, tabFor } from "@/lib/tabs";

// Top bar: brand and account. On laptops it also carries the five section links.
export default function SiteNav({ auth }: { auth: ReactNode }) {
  const current = tabFor(usePathname());
  return (
    <header className="sticky top-0 z-30 border-b-2 border-line bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-4 lg:h-16 lg:gap-8 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image src="/logo.webp" alt="" width={36} height={36} className="rounded-[9px]" priority />
          <span className="whitespace-nowrap font-display text-xl font-extrabold tracking-tight">
            <span lang="ta">மொழி</span>-Brücke
          </span>
        </Link>

        <nav aria-label="Sections" className="hidden flex-1 items-center gap-1 lg:flex">
          {TABS.map((t) => (
            <Link
              key={t.id}
              href={t.href}
              aria-current={t.id === current ? "page" : undefined}
              className={`rounded-xl px-4 py-2 text-[15px] font-extrabold ${
                t.id === current ? "bg-pill text-pri" : "text-muted hover:bg-sand"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto">{auth}</div>
      </div>
    </header>
  );
}
