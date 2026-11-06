// The class. Every person in the stories is one of these classmates (plus unnamed roles such as the
// officer or the seller). The gender decides the voice (Thorsten = m, Kerstin = f) and the German
// forms used for that person. These are the app's ASSUMPTIONS from the names: please correct any here.
//   Confirmed by the owner: Kaviarasan is male. Yogesh was added later: his gender is still an assumption (male), please confirm.

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
  p("Kaviarasan", "m"),
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
  p("Yogesh", "m"),
];

export const NAMES = CLASSMATES.map((c) => c.name);

/** A classmate who speaks in a story or talk. `as` is the part they play, such as "doctor". */
export function speaker(name: string, as?: string): { name: string; initial: string; gender: Gender; as?: string } {
  const c = CLASSMATES.find((x) => x.name === name);
  if (!c || !c.gender) throw new Error(`${name} cannot speak: unknown or no gender set`);
  return { name: c.name, initial: c.initial, gender: c.gender, ...(as ? { as } : {}) };
}

/** An unnamed role, such as the officer or the seller. */
export const role = (name: string, initial: string, gender: Gender) => ({ name, initial, gender });
