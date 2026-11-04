// Reads German text aloud using the device's built-in voices (Web Speech API).
// Browsers load voices late, and drop speech if cancel() is called right before speak(),
// so we wait for voices, pick a German one explicitly, and report what happened.

export type SpeakResult = "ok" | "unsupported" | "no-german-voice";

function supported() {
  return typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

function pickGerman(voices: SpeechSynthesisVoice[]) {
  const norm = (v: SpeechSynthesisVoice) => v.lang.toLowerCase().replace("_", "-");
  const de = voices.filter((v) => norm(v).startsWith("de"));
  // Prefer Germany over Austria/Switzerland, and local voices (work offline) over network ones.
  return (
    de.find((v) => norm(v) === "de-de" && v.localService) ??
    de.find((v) => norm(v) === "de-de") ??
    de[0]
  );
}

function waitForVoices(): Promise<SpeechSynthesisVoice[]> {
  const synth = window.speechSynthesis;
  const now = synth.getVoices();
  if (now.length) return Promise.resolve(now);
  return new Promise((resolve) => {
    const finish = () => resolve(synth.getVoices());
    synth.addEventListener("voiceschanged", finish, { once: true });
    setTimeout(finish, 1500);
  });
}

/** Call once on page load so voices are ready before the first tap. */
export function warmUpVoices() {
  if (supported()) window.speechSynthesis.getVoices();
}

export async function speak(text: string): Promise<SpeakResult> {
  if (!supported()) return "unsupported";
  try {
    const synth = window.speechSynthesis;
    const voice = pickGerman(await waitForVoices());
    if (!voice) return "no-german-voice";

    if (synth.speaking || synth.pending) {
      synth.cancel();
      await new Promise((r) => setTimeout(r, 60)); // let the cancel finish, or Chrome drops the next utterance
    }
    const u = new SpeechSynthesisUtterance(text);
    u.voice = voice;
    u.lang = voice.lang;
    u.rate = 0.9;
    synth.resume(); // Chrome can be left paused after a previous cancel
    synth.speak(u);
    return "ok";
  } catch {
    return "unsupported";
  }
}

export const NO_VOICE_MESSAGE =
  "No German voice was found on this device. On Windows: Settings > Time & language > Language & region > add German, then restart the browser. On a phone, try Chrome or Safari.";
