// Weekly leagues, like Duolingo: the XP you earn this week decides your league. Every Monday it starts again.

export const LEAGUES = [
  { id: "bronze", name: "Bronze", from: 0, color: "#b9733b" },
  { id: "silver", name: "Silver", from: 50, color: "#8f9aa8" },
  { id: "gold", name: "Gold", from: 150, color: "#d9a300" },
  { id: "diamond", name: "Diamond", from: 300, color: "#3aa7d8" },
] as const;

export type League = (typeof LEAGUES)[number];

export function leagueOf(weeklyXp: number): League {
  const xp = Number.isFinite(weeklyXp) ? weeklyXp : 0;
  return [...LEAGUES].reverse().find((l) => xp >= l.from) ?? LEAGUES[0];
}

/** The next league and how much XP is still missing, or null in the top league. */
export function nextLeague(weeklyXp: number): { league: League; missing: number } | null {
  const i = LEAGUES.findIndex((l) => l.id === leagueOf(weeklyXp).id);
  const next = LEAGUES[i + 1];
  return next ? { league: next, missing: next.from - Math.max(0, Math.floor(weeklyXp || 0)) } : null;
}

export type Place = { name: string; xp: number };

/** Ranks with ties: two people with the same XP share a place. */
export function podium(rows: Place[], size = 3): { place: number; name: string; xp: number }[] {
  const sorted = [...rows].filter((r) => r.xp > 0).sort((a, b) => b.xp - a.xp);
  let place = 0;
  let last = -1;
  return sorted
    .map((r, i) => {
      if (r.xp !== last) place = i + 1;
      last = r.xp;
      return { place, name: r.name, xp: r.xp };
    })
    .filter((r) => r.place <= size);
}
