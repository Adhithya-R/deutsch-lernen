// Checks for the account forms. Pure functions, so they can be tested and used on both server and browser.

export const MIN_PASSWORD = 8;
export const MAX_PASSWORD = 72; // longer passwords are cut off by the login system

export const cleanName = (s: string) => s.replace(/\s+/g, " ").trim();

export function checkName(raw: string): string | null {
  const n = cleanName(raw);
  if (n.length < 2) return "Enter your name (at least 2 letters).";
  if (n.length > 40) return "The name can have at most 40 characters.";
  if (/[<>]/.test(n)) return "The name cannot contain < or >.";
  return null;
}

export function checkEmail(raw: string): string | null {
  const e = raw.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) && e.length <= 254 ? null : "Enter a valid email address.";
}

export function checkNewPassword(password: string, confirm: string): string | null {
  if (password.length < MIN_PASSWORD) return `The password needs at least ${MIN_PASSWORD} characters.`;
  if (password.length > MAX_PASSWORD) return `The password can have at most ${MAX_PASSWORD} characters.`;
  if (password !== confirm) return "The two passwords are not the same.";
  if (/^\s|\s$/.test(password)) return "The password cannot start or end with a space.";
  return null;
}

export function checkFeedback(raw: string): string | null {
  const m = raw.trim();
  if (m.length < 5) return "Please write a little more (at least 5 characters).";
  if (m.length > 1000) return "Please keep it under 1000 characters.";
  return null;
}

/** Only paths inside this site are allowed after a login link, so the link cannot send people elsewhere. */
export function safeNext(next: string | null | undefined, fallback = "/"): string {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.includes("\\") || /[\u0000-\u001f]/.test(next)) return fallback;
  return next;
}

export const DELETE_WORD = "DELETE";
export const confirmsDelete = (typed: string) => typed.trim().toUpperCase() === DELETE_WORD;
