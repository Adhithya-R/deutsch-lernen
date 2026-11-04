"use client";

import { useSyncExternalStore } from "react";

type Mode = "en" | "both";

// The page setting lives on <html data-lang>; this watches it so the buttons always match.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang"] });
  return () => observer.disconnect();
}
const getMode = (): Mode => (document.documentElement.dataset.lang === "en" ? "en" : "both");

// Switches Tamil help on or off. The choice is remembered in this browser.
export default function LangToggle() {
  const mode = useSyncExternalStore(subscribe, getMode, () => "both" as Mode);

  function choose(m: Mode) {
    document.documentElement.dataset.lang = m;
    try {
      localStorage.setItem("lang", m);
    } catch {
      // Private browsing: the choice still applies until the page is closed.
    }
  }

  const btn = (m: Mode) =>
    `rounded-xl px-3 py-3 text-[15px] font-extrabold ${mode === m ? "bg-pri text-white" : "text-muted"}`;

  return (
    <div className="grid grid-cols-2 gap-1 rounded-2xl bg-white p-1 shadow-[0_3px_0_var(--color-line)]" role="group" aria-label="Language help">
      <button className={btn("en")} aria-pressed={mode === "en"} onClick={() => choose("en")}>English only</button>
      <button className={btn("both")} aria-pressed={mode === "both"} onClick={() => choose("both")}>English + <span lang="ta">தமிழ்</span></button>
    </div>
  );
}
