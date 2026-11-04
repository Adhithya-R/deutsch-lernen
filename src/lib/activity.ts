// Streak and XP helpers. Days are plain "YYYY-MM-DD" strings in the learner's own time zone.

/** Today's date in the browser's time zone, e.g. "2026-11-05". Call only in the browser. */
export const localDay = () => new Intl.DateTimeFormat("en-CA").format(new Date());

const DAY = 86_400_000;
const ms = (day: string) => Date.parse(`${day}T00:00:00Z`);
const fmt = (t: number) => new Date(t).toISOString().slice(0, 10);

/** A day sent by the browser is accepted only if it is within a day of the server's date (time zones). */
export function plausibleDay(day: string, now = Date.now()) {
  return /^\d{4}-\d{2}-\d{2}$/.test(day) && Math.abs(ms(day) - ms(fmt(now))) <= DAY;
}

/**
 * Consecutive days with activity, counted back from the latest active day.
 * The streak survives until the end of the day after your last activity.
 * `serverToday` is the server's UTC date; learners in other time zones can be a day ahead or behind, so
 * the latest day only has to be within one day of it.
 */
export function streakOf(days: string[], serverToday: string) {
  if (!days.length) return 0;
  const set = new Set(days);
  const latest = Math.max(...days.map(ms));
  if (latest < ms(serverToday) - DAY) return 0;
  let n = 0;
  for (let t = latest; set.has(fmt(t)); t -= DAY) n++;
  return n;
}
