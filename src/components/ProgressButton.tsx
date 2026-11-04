"use client";

import { useTransition } from "react";
import { saveProgress } from "@/app/actions";
import Icon from "@/components/Icon";

export default function ProgressButton({ slug, completed }: { slug: string; completed: boolean }) {
  const [pending, start] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => start(() => saveProgress(slug, completed ? "in_progress" : "completed", 0))}
      className={`inline-flex h-12 items-center gap-2 rounded-full px-6 font-semibold disabled:opacity-50 ${
        completed ? "bg-ok-bg text-ok" : "bg-pri text-white hover:bg-pri-dark"
      }`}
    >
      {completed && <Icon name="checkc" size={20} />}
      {completed ? "Completed (tap to undo)" : "Mark as completed"}
    </button>
  );
}
