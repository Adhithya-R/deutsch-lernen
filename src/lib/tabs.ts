import type { IconName } from "@/components/Icon";

export type TabId = "learn" | "grammar" | "words" | "exam" | "bruecke" | "me";
export type MainTabId = Exclude<TabId, "bruecke">;

export const TABS: { id: MainTabId; label: string; href: string; icon: IconName }[] = [
  { id: "learn", label: "Home", href: "/", icon: "home" },
  { id: "grammar", label: "Grammar", href: "/grammar", icon: "pencil" },
  { id: "words", label: "Words", href: "/flashcards", icon: "cards" },
  { id: "exam", label: "Exam", href: "/exam", icon: "grad" },
  { id: "me", label: "Me", href: "/me", icon: "user" },
];

/** Which colour world a page belongs to. */
export function tabFor(pathname: string): TabId {
  if (pathname.startsWith("/flashcards")) return "words";
  if (pathname.startsWith("/exam") || pathname.startsWith("/speaking") || pathname.startsWith("/conversation")) return "exam";
  if (pathname.startsWith("/bruecke")) return "bruecke";
  if (pathname.startsWith("/grammar") || pathname.startsWith("/cheatsheets")) return "grammar";
  if (["/me", "/login", "/signup", "/group", "/progress", "/privacy", "/feedback"].some((p) => pathname.startsWith(p))) return "me";
  return "learn";
}

/** The main navigation groups Brücke under Grammar while retaining its own page theme. */
export function mainTabFor(pathname: string): MainTabId {
  return tabFor(pathname) === "bruecke" ? "grammar" : tabFor(pathname) as MainTabId;
}

