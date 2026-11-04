"use client";

import { useCallback, useEffect, useState } from "react";
import { NO_VOICE_MESSAGE, speak, warmUpVoices } from "@/lib/speak";

// Returns a speak() that also sets a visible message when the device cannot play German audio.
export function useSpeak() {
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    warmUpVoices();
  }, []);

  const say = useCallback(async (text: string) => {
    const result = await speak(text);
    setNote(
      result === "ok" ? null : result === "unsupported" ? "This browser cannot play spoken audio." : NO_VOICE_MESSAGE,
    );
  }, []);

  return { say, note };
}
