// The weekly class quiz: everybody gets the same 10 words in the same week.
// Pure functions so they can be tested.

/** ISO week id such as "2026-w45" (weeks start on Monday). Uses UTC so the server and tests agree. */
export function weekId(date: Date): string {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum); // Thursday of this week decides the year
  const year = d.getUTCFullYear();
  const week = Math.ceil(((d.getTime() - Date.UTC(year, 0, 1)) / 86_400_000 + 1) / 7);
  return `${year}-w${String(week).padStart(2, "0")}`;
}

function seedFrom(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The same `n` items for the same week, in the same order. */
export function pickForWeek<T extends { id: string }>(week: string, items: T[], n = 10): T[] {
  const rand = rng(seedFrom(week));
  const pool = [...items].sort((a, b) => (a.id < b.id ? -1 : 1));
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(n, pool.length));
}

/** A shuffle that gives the same order for the same week, so every classmate sees the same options. */
export function seededShuffle(week: string) {
  const rand = rng(seedFrom(`${week}:options`));
  return <U,>(a: U[]): U[] => {
    const r = [...a];
    for (let i = r.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [r[i], r[j]] = [r[j], r[i]];
    }
    return r;
  };
}
