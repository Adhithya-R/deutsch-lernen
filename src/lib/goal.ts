"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_GOAL, isGoal } from "@/lib/level";

// The personal daily goal is kept on this device (no database change needed).
const KEY = "dailyGoal";
const EVENT = "goal-changed";

function read(): number {
  try {
    const n = Number(localStorage.getItem(KEY));
    return isGoal(n) ? n : DEFAULT_GOAL;
  } catch {
    return DEFAULT_GOAL;
  }
}

const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};

export const useDailyGoal = () => useSyncExternalStore(subscribe, read, () => DEFAULT_GOAL);

export function setDailyGoal(n: number) {
  if (!isGoal(n)) return;
  try {
    localStorage.setItem(KEY, String(n));
  } catch {
    /* a private window may refuse storage: the goal then stays at the default */
  }
  window.dispatchEvent(new Event(EVENT));
}
