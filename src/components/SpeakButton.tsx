"use client";

import Icon from "@/components/Icon";
import { speak } from "@/lib/speak";

export default function SpeakButton({ text, label = "Listen" }: { text: string; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => speak(text)}
      aria-label={`${label}: ${text}`}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-pri hover:bg-pill"
    >
      <Icon name="volume" size={20} />
    </button>
  );
}
