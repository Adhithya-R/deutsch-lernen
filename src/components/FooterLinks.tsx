"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** The small line at the bottom of every page: notice, report a problem, privacy. */
export default function FooterLinks() {
  const path = usePathname();
  return (
    <footer className="mt-4 border-t-2 border-line bg-white px-4 pb-28 pt-5 text-center text-xs text-muted lg:mt-12 lg:pb-5">
      <p>
        <span lang="ta">மொழி</span>-Brücke · Practice material written for this class. Not official Goethe-Institut papers.
      </p>
      <p className="mt-1.5 flex flex-wrap justify-center gap-x-4 gap-y-1 font-extrabold">
        <Link href={`/feedback?from=${encodeURIComponent(path)}`} className="text-pri underline">Report a problem</Link>
        <Link href="/privacy" className="text-pri underline">Privacy</Link>
      </p>
    </footer>
  );
}
