import data from "@/content/landmarks.json";
import type { TabId } from "@/lib/tabs";

export type Landmark = {
  id: string;
  name: string;
  country: string;
  state: string;
  city: string;
  type: string;
  architectural_style: string;
  unesco: boolean;
  year_built: number;
  description: string;
};

/** Weather / time of day behind a skyline. Every module should use a different one. */
export type Mood = "dawn" | "noon" | "evening" | "rain" | "sunset" | "autumn" | "snow" | "balloons" | "festival" | "rainbow";

export const LANDMARKS = data as Landmark[];
export const landmark = (id: string) => LANDMARKS.find((l) => l.id === id);

/**
 * Which landmarks each tab shows. Every module gets its own pair so screens do not repeat.
 * Add new ids here (and a drawing in components/landmarks.tsx) as modules are built.
 * Story chapters carry their own pair in content/chapters.ts.
 */
export const SKY_IDS: Record<TabId, string[]> = {
  learn: ["TN001", "DE004"],
  words: ["TN004", "DE025"],
  exam: ["TN006", "DE002"],
  bruecke: ["TN001", "DE004", "DE003"],
  me: ["TN011", "DE018"],
};

export const SKY_MOOD: Record<TabId, Mood> = {
  learn: "noon",
  words: "evening",
  exam: "rain",
  bruecke: "sunset",
  me: "autumn",
};

// Shorter names for the labels on a skyline (the full name is in the "i" sheet).
const SHORT: Record<string, string> = {
  TN011: "Chennai Central",
  TN021: "Velankanni Basilica",
  TN012: "Ripon Building",
  DE019: "New Town Hall",
  DE015: "St. Michael's",
};
export function labelName(l: Landmark, crowded: boolean) {
  if (SHORT[l.id]) return SHORT[l.id];
  const n = l.name;
  return crowded && n.length > 18 ? n.replace(/\s+(Temple|Castle|Palace|Building|Cathedral)$/, "") : n;
}
