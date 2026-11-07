"use client";

import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { tabFor, type TabId } from "@/lib/tabs";

const PAGE_COPY: Record<TabId, { slogan: string; en: string; ta: string }> = {
  learn: {
    slogan: "Mit jeder Lektion rücken Tamil Nadu und Deutschland näher zusammen.",
    en: "With every lesson, Tamil Nadu and Germany grow closer.",
    ta: "ஒவ்வொரு பாடத்திலும், தமிழ்நாடும் ஜெர்மனியும் இன்னும் நெருக்கமாகின்றன.",
  },
  words: {
    slogan: "Jedes neue Wort baut eine Brücke zwischen Tamil Nadu und Deutschland.",
    en: "Every new word builds a bridge between Tamil Nadu and Germany.",
    ta: "ஒவ்வொரு புதிய சொல்லும் தமிழ்நாட்டுக்கும் ஜெர்மனிக்கும் இடையே ஒரு பாலத்தை உருவாக்குகிறது.",
  },
  exam: {
    slogan: "Jeder Übungsschritt bringt dich deinem Ziel in Deutschland näher.",
    en: "Every practice step brings you closer to your goal in Germany.",
    ta: "ஒவ்வொரு பயிற்சிப் படியும் ஜெர்மனியில் உள்ள உங்கள் இலக்கை நெருங்கச் செய்கிறது.",
  },
  bruecke: {
    slogan: "Sprache und Kultur schlagen eine Brücke zwischen Tamil Nadu und Deutschland.",
    en: "Language and culture build a bridge between Tamil Nadu and Germany.",
    ta: "மொழியும் பண்பாடும் தமிழ்நாட்டுக்கும் ஜெர்மனிக்கும் இடையே ஒரு பாலத்தை அமைக்கின்றன.",
  },
  me: {
    slogan: "Dein Lernweg verbindet Tamil Nadu und Deutschland Schritt für Schritt.",
    en: "Your learning journey connects Tamil Nadu and Germany, one step at a time.",
    ta: "உங்கள் கற்றல் பயணம் ஒவ்வொரு படியாக தமிழ்நாட்டையும் ஜெர்மனியையும் இணைக்கிறது.",
  },
};

export default function SiteFooter() {
  const pathname = usePathname();
  const { slogan, en, ta } = PAGE_COPY[tabFor(pathname)];
  return (
    <footer className="mt-3 border-t-2 border-line bg-white px-4 pb-24 pt-3 text-center lg:mt-8 lg:pb-4">
      <p lang="de" className="mx-auto max-w-2xl font-display text-base font-extrabold leading-snug sm:text-lg">{slogan}</p>
      <p className="mx-auto mt-0.5 max-w-xl text-xs leading-snug text-muted sm:text-sm">
        <span lang="en" className="en-only">{en}</span>
        <span lang="ta" className="ta-only">{ta}</span>
      </p>
      <div className="relative mx-auto mt-2 flex w-full max-w-md items-center justify-between px-1" aria-label="A bridge between India and Germany">
        <span className="absolute left-8 right-8 top-1/2 border-t border-pri/40" aria-hidden="true" />
        <IndiaFlag />
        <span className="relative grid h-9 w-12 place-items-center rounded-full bg-white text-pri">
          <Icon name="bridge" size={38} />
        </span>
        <GermanyFlag />
      </div>
    </footer>
  );
}

function IndiaFlag() {
  return (
    <span role="img" aria-label="Indian flag" className="relative z-10 block aspect-[3/2] w-9 overflow-hidden rounded-[2px] border border-black/10">
      <span className="absolute inset-x-0 top-0 h-1/3 bg-[#ff9933]" />
      <span className="absolute inset-x-0 top-1/3 h-1/3 bg-white" />
      <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[#138808]" />
      <svg viewBox="0 0 24 24" className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2" fill="none" stroke="#000080" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4v16M4 12h16M6.35 6.35l11.3 11.3m0-11.3-11.3 11.3" />
      </svg>
    </span>
  );
}

function GermanyFlag() {
  return (
    <span role="img" aria-label="German flag" className="relative z-10 block aspect-[3/2] w-9 overflow-hidden rounded-[2px] border border-black/10">
      <span className="absolute inset-x-0 top-0 h-1/3 bg-black" />
      <span className="absolute inset-x-0 top-1/3 h-1/3 bg-[#dd0000]" />
      <span className="absolute inset-x-0 bottom-0 h-1/3 bg-[#ffce00]" />
    </span>
  );
}
