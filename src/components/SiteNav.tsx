"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { isLive, menu, type MenuItem } from "@/content/menu";

function Entry({ item, onNavigate }: { item: MenuItem; onNavigate: () => void }) {
  const base = "block rounded-lg px-3 py-1.5 text-sm leading-snug";
  if (isLive(item)) {
    return (
      <Link href={item.href!} onClick={onNavigate} className={`${base} hover:bg-sand`}>
        <span className="block font-medium">{item.en}</span>
        <span lang="ta" className="block text-xs text-muted">{item.ta}</span>
      </Link>
    );
  }
  return (
    <span aria-disabled="true" className={`${base} cursor-default opacity-55`}>
      <span className="block">
        {item.en}{" "}
        <em className="ml-1 rounded bg-butter px-1.5 py-0.5 text-[10px] font-bold not-italic text-butter-ink">Soon</em>
      </span>
      <span lang="ta" className="block text-xs text-muted">{item.ta}</span>
    </span>
  );
}

// Top bar. On phones it shows only the brand and account; navigation is the bottom tab bar.
// On laptops it also shows the section menus with drop-downs.
export default function SiteNav({ auth }: { auth: ReactNode }) {
  const [open, setOpen] = useState<string | null>(null);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (bar.current && !bar.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header ref={bar} className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 lg:h-16 lg:gap-6 lg:px-8">
        <Link href="/" onClick={() => setOpen(null)} className="flex shrink-0 items-center gap-2.5">
          <Image src="/logo.webp" alt="" width={36} height={36} className="rounded-[9px]" priority />
          <span className="whitespace-nowrap text-lg font-bold tracking-tight">
            <span lang="ta">மொழி</span>-Brücke
          </span>
        </Link>

        <nav aria-label="Sections" className="ml-2 hidden h-full flex-1 items-stretch lg:flex">
          {menu.map((s, idx) => {
            const cols = s.groups.length >= 3 ? "w-[46rem] grid-cols-3" : s.groups.length === 2 ? "w-[34rem] grid-cols-2" : "w-[20rem]";
            return (
              <div
                key={s.id}
                className="relative flex"
                onMouseEnter={() => setOpen(s.id)}
                onMouseLeave={() => setOpen((o) => (o === s.id ? null : o))}
              >
                <button
                  aria-expanded={open === s.id}
                  aria-haspopup="true"
                  onClick={() => setOpen(open === s.id ? null : s.id)}
                  className={`border-b-[3px] px-3.5 text-sm font-medium ${
                    open === s.id ? "border-pri text-pri" : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {s.de}
                  <span lang="ta" className="block text-[11px] font-normal leading-none opacity-80">{s.ta}</span>
                </button>
                {open === s.id && (
                  <div className={`absolute top-full z-50 pt-0 ${idx >= 3 ? "right-0" : "left-0"}`}>
                    <div
                      className={`grid max-h-[75vh] gap-4 overflow-y-auto rounded-2xl border border-line bg-white p-4 shadow-xl ${cols}`}
                    >
                      {s.groups.map((g) => (
                        <div key={g.heading}>
                          <p className="mb-1 border-b border-line pb-1 text-[11px] font-bold uppercase tracking-wider text-pri">
                            {g.heading}
                          </p>
                          {g.items.map((i) => (
                            <Entry key={i.en + i.ta} item={i} onNavigate={() => setOpen(null)} />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="ml-auto">{auth}</div>
      </div>
    </header>
  );
}
