// Simple spaced repetition (SM-2 style). Pure functions, no I/O.

export type Grade = 0 | 1 | 2 | 3; // 0 Again, 1 Hard, 2 Good, 3 Easy

export type CardState = {
  ease: number; // 1.3 or more
  intervalDays: number;
  repetitions: number;
};

export const NEW_CARD: CardState = { ease: 2.5, intervalDays: 0, repetitions: 0 };

const DAY_MS = 24 * 60 * 60 * 1000;
const AGAIN_DELAY_MS = 10 * 60 * 1000;

export function review(state: CardState, grade: Grade, now: Date): CardState & { dueAt: Date } {
  if (grade === 0) {
    return {
      ease: Math.max(1.3, state.ease - 0.2),
      intervalDays: 0,
      repetitions: 0,
      dueAt: new Date(now.getTime() + AGAIN_DELAY_MS),
    };
  }

  let ease = state.ease;
  let interval: number;
  if (state.repetitions === 0) {
    interval = grade === 3 ? 3 : 1;
  } else if (grade === 1) {
    interval = Math.max(1, Math.round(state.intervalDays * 1.2));
  } else if (grade === 2) {
    interval = Math.max(state.intervalDays + 1, Math.round(state.intervalDays * ease));
  } else {
    interval = Math.max(state.intervalDays + 2, Math.round(state.intervalDays * ease * 1.3));
  }
  if (grade === 1) ease = Math.max(1.3, ease - 0.15);
  if (grade === 3) ease = ease + 0.15;

  return {
    ease,
    intervalDays: interval,
    repetitions: state.repetitions + 1,
    dueAt: new Date(now.getTime() + interval * DAY_MS),
  };
}
