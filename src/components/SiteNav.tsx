"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { isLive, menu, type MenuItem } from "@/content/menu";

function Entry({ item, onNavigate, dark }: { item: MenuItem; onNavigate: () => void; dark?: boolean }) {
  const base = "block rounded px-2 py-1 text-sm leading-snug";
  if (isLive(item)) {
    return (
      <Link
        href={item.href!}
        onClick={onNavigate}
        className={`${base} ${dark ? "hover:bg-white/10" : "hover:bg-brand-100"}`}
      >
        <span className="block">{item.en}</span>
        <span lang="ta" className="block text-xs opacity-70">{item.ta}</span>
      </Link>
    );
  }
  return (
    <span aria-disabled="true" className={`${base} cursor-default opacity-50`}>
      <span className="block">
        {item.en} <em className="ml-1 rounded bg-gold/80 px-1 text-[10px] font-semibold not-italic text-brand-950">Soon</em>
      </span>
      <span lang="ta" className="block text-xs">{item.ta}</span>
    </span>
  );
}

export default function SiteNav({ auth }: { auth: ReactNode }) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (bar.current && !bar.current.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const close = () => {
    setOpen(null);
    setMobile(false);
  };

  return (
    <header ref={bar} className="sticky top-0 z-40 border-b-4 border-gold bg-brand-800 text-cream shadow">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4">
        <Link href="/" onClick={close} className="flex shrink-0 items-center gap-2">
          <Image src="/logo.webp" alt="" width={40} height={40} className="rounded-lg" priority />
          <span className="whitespace-nowrap text-base font-bold leading-none sm:text-lg">
            <span lang="ta">மொழி</span>-Brücke
          </span>
        </Link>

        <nav aria-label="Main" className="ml-4 hidden flex-1 items-center gap-1 lg:flex">
          {menu.map((s, idx) => {
            const wide = s.groups.length >= 3;
            return (
              <div
                key={s.id}
                className="relative"
                onMouseEnter={() => setOpen(s.id)}
                onMouseLeave={() => setOpen((o) => (o === s.id ? null : o))}
              >
                <button
                  aria-expanded={open === s.id}
                  aria-haspopup="true"
                  onClick={() => setOpen(open === s.id ? null : s.id)}
                  className={`rounded px-3 py-1 text-left hover:bg-white/10 ${open === s.id ? "bg-white/10" : ""}`}
                >
                  <span className="block text-sm font-semibold leading-tight">{s.de} ▾</span>
                  <span lang="ta" className="block text-[11px] leading-tight opacity-75">{s.ta}</span>
                </button>
                {open === s.id && (
                  <div
                    className={`absolute top-full z-50 pt-1 ${idx >= 3 ? "right-0" : "left-0"}`}
                  >
                    <div
                      className={`grid max-h-[75vh] gap-4 overflow-y-auto rounded-lg border border-brand-700 bg-cream p-4 text-brand-950 shadow-xl ${
                        wide ? "w-[46rem] grid-cols-3" : s.groups.length === 2 ? "w-[34rem] grid-cols-2" : "w-[20rem]"
                      }`}
                    >
                      {s.groups.map((g) => (
                        <div key={g.heading}>
                          <p className="mb-1 border-b-2 border-gold pb-1 text-xs font-bold uppercase tracking-wide text-brand-700">
                            {g.heading}
                          </p>
                          {g.items.map((i) => (
                            <Entry key={i.en + i.ta} item={i} onNavigate={close} />
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

        <div className="ml-auto flex items-center gap-2">
          {auth}
          <button
            aria-label="Menu"
            aria-expanded={mobile}
            onClick={() => setMobile(!mobile)}
            className="rounded border border-cream/40 px-2.5 py-1.5 text-lg leading-none lg:hidden"
          >
            {mobile ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {mobile && (
        <nav aria-label="Main mobile" className="max-h-[80vh] overflow-y-auto border-t border-white/20 bg-brand-900 px-4 pb-4 lg:hidden">
          {menu.map((s) => (
            <details key={s.id} className="border-b border-white/10 py-1">
              <summary className="cursor-pointer py-2 font-semibold">
                {s.de} <span lang="ta" className="text-sm font-normal opacity-75">· {s.ta}</span>
              </summary>
              {s.groups.map((g) => (
                <div key={g.heading} className="mb-2 pl-2">
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-gold">{g.heading}</p>
                  {g.items.map((i) => (
                    <Entry key={i.en + i.ta} item={i} onNavigate={close} dark />
                  ))}
                </div>
              ))}
            </details>
          ))}
        </nav>
      )}
    </header>
  );
}
