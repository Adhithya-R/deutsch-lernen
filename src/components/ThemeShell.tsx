"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import TabBar from "@/components/TabBar";
import { tabFor } from "@/lib/tabs";

// Sets the colour world for the current tab and hosts the page chrome.
export default function ThemeShell({ header, footer, children }: { header: ReactNode; footer: ReactNode; children: ReactNode }) {
  const pathname = usePathname();
  const focus = pathname.startsWith("/learn/") || pathname.startsWith("/flashcards/") || pathname.startsWith("/speaking/") || pathname.startsWith("/conversation/"); // story and chapter check hide the chrome
  return (
    <div data-tab={tabFor(pathname)} className="flex min-h-dvh flex-col" style={{ background: "var(--tab-bg)" }}>
      {!focus && header}
      <div className={`flex-1 ${focus ? "" : "pb-28 lg:pb-0"}`}>{children}</div>
      {!focus && footer}
      {!focus && <TabBar />}
    </div>
  );
}
