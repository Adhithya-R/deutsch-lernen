// Plays German audio. Order of attempts:
//   1. a recorded clip from /audio (works on every device; made by scripts/make-audio.py)
//   2. the device's own German voice (Web Speech), if the phrase has no clip
// Returns what happened so the screen can explain a failure instead of staying silent.
import { audioKey } from "@/lib/audio-key";

export type SpeakResult = "ok" | "unsupported" | "no-german-voice";

let manifest: Set<string> | null = null;
let current: HTMLAudioElement | null = null;

function speechSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

function pickGerman(voices: SpeechSynthesisVoice[]) {
  const norm = (v: SpeechSynthesisVoice) => v.lang.toLowerCase().replace("_", "-");
  const de = voices.filter((v) => norm(v).startsWith("de"));
  return de.find((v) => norm(v) === "de-de" && v.localService) ?? de.find((v) => norm(v) === "de-de") ?? de[0];
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

/** Call once on page load: learns which clips exist and gets device voices ready. */
export function warmUpVoices() {
  if (speechSupported()) window.speechSynthesis.getVoices();
  if (manifest === null && typeof window !== "undefined") {
    fetch("/audio/manifest.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((keys: string[]) => (manifest = new Set(keys)))
      .catch(() => {});
  }
}

// Must start playing synchronously inside the tap, or iPhones refuse to play it.
function playClip(text: string): Promise<boolean> {
  const key = audioKey(text);
  if (!key || (manifest && !manifest.has(key))) return Promise.resolve(false);
  try {
    current?.pause();
    const audio = new Audio(`/audio/${key}.mp3`);
    current = audio;
    return audio.play().then(
      () => true,
      () => false,
    );
  } catch {
    return Promise.resolve(false);
  }
}

async function deviceVoice(text: string): Promise<SpeakResult> {
  if (!speechSupported()) return "unsupported";
  try {
    const synth = window.speechSynthesis;
    const voice = pickGerman(await waitForVoices());
    if (!voice) return "no-german-voice";
    if (synth.speaking || synth.pending) {
      synth.cancel();
      await new Promise((r) => setTimeout(r, 60)); // Chrome drops the next utterance if it starts too soon after cancel
    }
    const u = new SpeechSynthesisUtterance(text);
    u.voice = voice;
    u.lang = voice.lang;
    u.rate = 0.9;
    synth.resume();
    synth.speak(u);
    return "ok";
  } catch {
    return "unsupported";
  }
}

export async function speak(text: string): Promise<SpeakResult> {
  if (await playClip(text)) return "ok";
  return deviceVoice(text);
}

export const NO_VOICE_MESSAGE =
  "Could not play this audio. This phrase has no recording and your device has no German voice. On Windows: Settings > Time & language > Language & region > add German, then restart the browser.";
