// Reads German text aloud with the browser's built-in voice. Silent if none is available.
export function speak(text: string) {
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    u.rate = 0.9;
    synth.speak(u);
  } catch {
    // Audio is optional.
  }
}
