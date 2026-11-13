"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getTheme = (): Theme => document.documentElement.dataset.theme === "dark" ? "dark" : "light";

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);

  function choose(next: Theme) {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Keep this choice for the current page if browser storage is unavailable.
    }
  }

  const button = (value: Theme) => `rounded-xl px-3 py-3 text-[15px] font-extrabold ${theme === value ? "bg-pri text-white" : "text-muted"}`;

  return (
    <div className="grid grid-cols-2 gap-1 rounded-2xl bg-white p-1 shadow-[0_3px_0_var(--color-line)]" role="group" aria-label="Appearance">
      <button className={button("light")} aria-pressed={theme === "light"} onClick={() => choose("light")}>Light</button>
      <button className={button("dark")} aria-pressed={theme === "dark"} onClick={() => choose("dark")}>Dark</button>
    </div>
  );
}
