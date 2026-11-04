// The class. Every person in the stories is one of these classmates (plus unnamed roles such as the
// officer or the seller). The gender decides the voice (Thorsten = m, Kerstin = f) and the German
// forms used for that person. These are the app's ASSUMPTIONS from the names: please correct any here.
//   Kavi is left without a gender on purpose: Kavi never speaks and is never called "he" or "she".

export type Gender = "m" | "f";
export type Person = { name: string; initial: string; gender: Gender | null };

const p = (name: string, gender: Gender | null): Person => ({ name, initial: name[0], gender });

export const CLASSMATES: Person[] = [
  p("Adhi", "m"),
  p("Poovai", "f"),
  p("Thanisha", "f"),
  p("Mrithula", "f"),
  p("Akshay", "m"),
  p("Ruby", "f"),
  p("Sudharsan", "m"),
  p("Sudha", "f"),
  p("Ram", "m"),
  p("Dhinesh", "m"),
  p("Kavi", null),
  p("Risha", "f"),
  p("Rithika", "f"),
  p("Sadhana", "f"),
  p("Shylash", "m"),
  p("Yuvan", "m"),
  p("Arvind", "m"),
  p("Sanjay", "m"),
  p("Kavitha", "f"),
  p("Medwin", "m"),
  p("Nethra", "f"),
];

export const NAMES = CLASSMATES.map((c) => c.name);

/** A classmate who speaks in a story. Speaking needs a gender, so Kavi cannot be chosen. */
export function speaker(name: string): { name: string; initial: string; gender: Gender } {
  const c = CLASSMATES.find((x) => x.name === name);
  if (!c || !c.gender) throw new Error(`${name} cannot speak: unknown or no gender set`);
  return { name: c.name, initial: c.initial, gender: c.gender };
}

/** An unnamed role, such as the officer or the seller. */
export const role = (name: string, initial: string, gender: Gender) => ({ name, initial, gender });
