import type { IconName } from "@/components/Icon";

export type TabId = "learn" | "words" | "exam" | "bruecke" | "me";

export const TABS: { id: TabId; label: string; href: string; icon: IconName }[] = [
  { id: "learn", label: "Learn", href: "/", icon: "book" },
  { id: "words", label: "Words", href: "/flashcards", icon: "cards" },
  { id: "exam", label: "Exam", href: "/exam", icon: "grad" },
  { id: "bruecke", label: "Brücke", href: "/bruecke", icon: "bridge" },
  { id: "me", label: "Me", href: "/me", icon: "user" },
];

/** Which colour world a page belongs to. */
export function tabFor(pathname: string): TabId {
  if (pathname.startsWith("/flashcards")) return "words";
  if (pathname.startsWith("/exam")) return "exam";
  if (pathname.startsWith("/bruecke")) return "bruecke";
  if (["/me", "/login", "/signup"].some((p) => pathname.startsWith(p))) return "me";
  return "learn";
}
