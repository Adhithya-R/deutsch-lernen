"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function AppSplash() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.appSplash !== "show") return;

    const timeout = window.setTimeout(() => {
      delete root.dataset.appSplash;
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="app-splash" role="status" aria-label="Mozhi-Brücke is loading">
      <Image src="/icon.png" alt="Mozhi-Brücke" width={512} height={512} priority />
    </div>
  );
}
