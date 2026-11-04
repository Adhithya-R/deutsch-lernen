#!/usr/bin/env python3
"""Generates the German audio clips used by the app (public/audio/<key>.mp3).

Why: browsers only speak German if the device has a German voice installed, and many laptops do
not. Recorded clips play everywhere. The voice is "Thorsten" (free, public domain) run through Piper.

Usage (one-off, on any computer with Python and ffmpeg):
  python3 -m venv venv && ./venv/bin/pip install piper-tts
  # download voice-de-thorsten-low.tar.gz from github.com/rhasspy/piper/releases/tag/v0.0.2 and unpack it
  node --experimental-strip-types scripts/audio-texts.mts            # writes scripts/audio-texts.json
  ./venv/bin/python scripts/make-audio.py path/to/de-thorsten-low.onnx

Existing clips are skipped, so you can run it again after adding new texts.
"""
import json
import os
import subprocess
import sys
import unicodedata
import wave

import numpy as np
from piper import PiperVoice

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model = sys.argv[1]
voice = PiperVoice.load(model, config_path=model + ".json")
items = json.load(open(os.path.join(root, "scripts", "audio-texts.json"), encoding="utf-8"))
out_dir = os.path.join(root, "public", "audio")
os.makedirs(out_dir, exist_ok=True)


def synth(text: str) -> np.ndarray:
    """Like voice.synthesize, but joins the decomposed 'c' + cedilla into 'ç' first.
    Without this the voice drops the soft ch-sound (ich, Mädchen) and says a hard k instead."""
    chunks = []
    for sentence in voice.phonemize(text):
        phonemes = list(unicodedata.normalize("NFC", "".join(sentence)))
        ids = voice.phonemes_to_ids(phonemes)
        audio = voice.phoneme_ids_to_audio(ids)
        chunks.append(np.asarray(audio).reshape(-1))
        chunks.append(np.zeros(int(voice.config.sample_rate * 0.12), dtype=chunks[-1].dtype))  # short pause
    return np.concatenate(chunks)


made = skipped = 0
for it in items:
    mp3 = os.path.join(out_dir, it["key"] + ".mp3")
    if os.path.exists(mp3):
        skipped += 1
        continue
    samples = synth(it["text"])
    if samples.dtype != np.int16:
        peak = float(np.max(np.abs(samples))) or 1.0
        samples = (np.clip(samples / peak * 0.9, -1, 1) * 32767).astype(np.int16)  # even loudness per clip
    wav = mp3[:-4] + ".wav"
    with wave.open(wav, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(voice.config.sample_rate)
        w.writeframes(samples.tobytes())
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav, "-ac", "1", "-b:a", "40k", mp3], check=True)
    os.remove(wav)
    made += 1

keys = sorted(f[:-4] for f in os.listdir(out_dir) if f.endswith(".mp3"))
json.dump(keys, open(os.path.join(out_dir, "manifest.json"), "w"))
print(f"made {made}, kept {skipped}, total {len(keys)} clips")
