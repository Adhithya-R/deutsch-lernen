"use client";

import Icon from "@/components/Icon";
import { useSpeak } from "@/components/useSpeak";

export default function SpeakButton({ text, label = "Listen" }: { text: string; label?: string }) {
  const { say, note } = useSpeak();
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={() => say(text)}
        aria-label={`${label}: ${text}`}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-pri hover:bg-pill"
      >
        <Icon name="volume" size={20} />
      </button>
      {note && (
        <span role="alert" className="fixed inset-x-4 bottom-24 z-50 rounded-2xl bg-ink p-4 text-sm text-white shadow-xl lg:bottom-6 lg:left-auto lg:max-w-sm">
          {note}
        </span>
      )}
    </span>
  );
}
