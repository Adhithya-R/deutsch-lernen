// The shape of a learner's progress download. Pure, so it can be tested.

export type ExportRows = {
  profile: Record<string, unknown> | null;
  lessons: Record<string, unknown>[];
  flashcards: Record<string, unknown>[];
  activity: Record<string, unknown>[];
  quizzes: Record<string, unknown>[];
  drafts: Record<string, unknown>[];
};

export function buildExport(email: string | undefined, rows: ExportRows, now = new Date()) {
  const xp = rows.activity.reduce((sum, r) => sum + (Number(r.xp) || 0), 0);
  return {
    app: "மொழி-Brücke",
    format: 1,
    exportedAt: now.toISOString(),
    account: { email: email ?? null, name: (rows.profile?.display_name as string) || null, level: (rows.profile?.level as string) || null },
    summary: {
      totalXp: xp,
      activeDays: rows.activity.filter((r) => Number(r.xp) > 0).length,
      wordsStarted: rows.flashcards.length,
      lessonsAndChapters: rows.lessons.length,
      quizResults: rows.quizzes.length,
      writingDrafts: rows.drafts.length,
    },
    lessonProgress: rows.lessons,
    flashcards: rows.flashcards,
    dailyXp: rows.activity,
    quizResults: rows.quizzes,
    writingDrafts: rows.drafts,
  };
}

export const exportFileName = (now = new Date()) => `moli-bruecke-progress-${now.toISOString().slice(0, 10)}.json`;
