"use client";

import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";

const PAGE_LINES: Record<string, string> = {
  "/exam": "Mit jedem Wort dem Ziel ein Stück näher.",
  "/bruecke": "Zwei Kulturen. Eine gemeinsame Sprache.",
  "/me": "Dein Weg. Dein Tempo. Dein nächster Schritt.",
  "/flashcards": "Wort für Wort wächst die Verbindung.",
};

export default function SiteFooter() {
  const pathname = usePathname();
  const pageLine = Object.entries(PAGE_LINES).find(([path]) => pathname.startsWith(path))?.[1];
  return (
    <footer className="mt-4 border-t-2 border-line bg-white px-4 pb-28 pt-6 text-center lg:mt-12 lg:pb-8">
      <Icon name="bridge" size={26} className="mx-auto text-pri" />
      <p className="mt-2 font-display text-lg font-extrabold leading-snug">Von Chennai nach Berlin, Schritt für Schritt.</p>
      {pageLine && <p className="mt-1 text-sm text-muted">{pageLine}</p>}
    </footer>
  );
}
