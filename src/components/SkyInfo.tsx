"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import type { Landmark } from "@/lib/landmarks";

// A small "i" button on a skyline that opens facts about the landmarks shown.
export default function SkyInfo({ items }: { items: Landmark[] }) {
  const [open, setOpen] = useState(false);
  if (!items.length) return null;
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="About the landmarks in this picture"
        className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-pri-dark"
      >
        <Icon name="info" size={20} />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 mx-auto flex max-w-md items-end bg-ink/45" onClick={() => setOpen(false)}>
          <div className="sheet-up max-h-[80dvh] w-full overflow-y-auto rounded-t-[28px] bg-white p-5 pb-8" role="dialog" aria-label="Landmarks" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-extrabold">In this picture</h2>
            <ul className="mt-3 flex flex-col gap-3">
              {items.map((l) => (
                <li key={l.id} className="rounded-2xl bg-pill p-3.5">
                  <p className="font-extrabold">{l.name}</p>
                  <p className="text-sm text-muted">
                    {l.city}, {l.country === "India" ? l.state : l.state === l.city ? "Germany" : `${l.state}, Germany`}
                  </p>
                  <p className="mt-1 text-sm">{l.description}</p>
                  <p className="mt-2 flex flex-wrap gap-1.5 text-xs font-extrabold">
                    <span className="rounded-md bg-white px-2 py-0.5">{l.type}</span>
                    <span className="rounded-md bg-white px-2 py-0.5">{l.architectural_style}</span>
                    <span className="rounded-md bg-white px-2 py-0.5">Built about {l.year_built}</span>
                    {l.unesco && <span className="rounded-md bg-ok-bg px-2 py-0.5 text-ok">UNESCO World Heritage</span>}
                  </p>
                </li>
              ))}
            </ul>
            <button onClick={() => setOpen(false)} className="btn3d mt-4">Got it</button>
          </div>
        </div>
      )}
    </>
  );
}
