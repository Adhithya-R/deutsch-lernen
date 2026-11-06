// Overall level, like Duolingo: XP builds up levels. Level L starts at 25 * L * (L - 1) XP:
// level 2 at 50 XP, level 3 at 150, level 4 at 300, level 5 at 500 ... each level needs 50 more than the last.

export const startOfLevel = (level: number) => 25 * level * (level - 1);

export const TITLES = [
  { upTo: 2, de: "Neuling", en: "Newcomer" },
  { upTo: 4, de: "Entdecker", en: "Explorer" },
  { upTo: 7, de: "Lerner", en: "Learner" },
  { upTo: 10, de: "Könner", en: "Skilled" },
  { upTo: 15, de: "Profi", en: "Pro" },
  { upTo: Infinity, de: "Meister", en: "Master" },
];

export type LevelInfo = {
  level: number;
  title: { de: string; en: string };
  xp: number;
  into: number; // XP earned inside this level
  needed: number; // XP this level needs in total
  pct: number; // 0-100 progress to the next level
  toNext: number;
};

export function levelOf(xp: number): LevelInfo {
  const total = Math.max(0, Math.floor(Number.isFinite(xp) ? xp : 0));
  let level = 1;
  while (startOfLevel(level + 1) <= total) level++;
  const from = startOfLevel(level);
  const to = startOfLevel(level + 1);
  const into = total - from;
  const needed = to - from;
  const title = TITLES.find((t) => level <= t.upTo)!;
  return { level, title: { de: title.de, en: title.en }, xp: total, into, needed, pct: Math.round((into / needed) * 100), toNext: to - total };
}

export const GOALS = [10, 20, 40] as const;
export const DEFAULT_GOAL = 20;
export const isGoal = (n: number) => (GOALS as readonly number[]).includes(n);
