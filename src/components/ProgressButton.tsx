"use client";

import { useTransition } from "react";
import { saveProgress } from "@/app/actions";

export default function ProgressButton({ slug, completed }: { slug: string; completed: boolean }) {
  const [pending, start] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => start(() => saveProgress(slug, completed ? "in_progress" : "completed", 0))}
      className="mt-3 rounded border border-slate-300 px-3 py-1 text-sm disabled:opacity-50"
    >
      {completed ? "✓ Completed (tap to undo)" : "Mark as completed"}
    </button>
  );
}
