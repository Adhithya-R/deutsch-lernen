"use client";

import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";
import { tabFor } from "@/lib/tabs";

const PAGE_SLOGANS = {
  learn: "Every lesson brings Tamil Nadu a little closer to Germany.",
  words: "Every new word builds a stronger bridge between Tamil Nadu and Germany.",
  exam: "Prepare with confidence for your next step between Tamil Nadu and Germany.",
  bruecke: "Tamil Nadu and Germany meet here through language and culture.",
  me: "Your progress is the bridge connecting Tamil Nadu and Germany.",
};

export default function SiteFooter() {
  const pathname = usePathname();
  const slogan = PAGE_SLOGANS[tabFor(pathname)];
  return (
    <footer className="mt-4 border-t-2 border-line bg-white px-4 pb-28 pt-6 text-center lg:mt-12 lg:pb-8">
      <Icon name="bridge" size={26} className="mx-auto text-pri" />
      <p className="mt-2 font-display text-lg font-extrabold leading-snug">{slogan}</p>
    </footer>
  );
}
