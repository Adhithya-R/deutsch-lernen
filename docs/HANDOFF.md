# Handoff: project context (read this first)

Last updated: 2026-11-04. This file replaces the chat history. A new chat or session should read this, `README.md` and `AGENTS.md`, then continue.

## What this is
**மொழி-Brücke** ("Mozhi-Brücke", language bridge): a mobile-friendly web app for about 20 friends learning German A1/A2 at the Goethe Institute (weekend classes) who revise together on weekdays. The owner moves to Germany next year. All content is bilingual: **English + Tamil**.

Wanted features: A1/A2 lessons (verbs, pronouns, sentence order), cheat-code tables (cases, pronouns, possessives), many exercises incl. story-based vocabulary, Goethe A1/A2 exam preparation (email writing: order, tips; original questions modelled on the free official sample tests), saved progress with "continue where you left off", study-group features.

## Where everything lives
| Thing | Where |
|---|---|
| Code (source of truth) | https://github.com/Adhithya-R/deutsch-lernen, branch `main` |
| Live site | https://deutsch-lernen-mu.vercel.app/ (Vercel, project `deutsch-lernen`, auto-deploys on push to `main`) |
| Database and login | Supabase project `deutsch-lernen`, URL `https://psymkxiubdpmomnxporq.supabase.co` |
| Secrets | Never in git. `.env*` is ignored; `.env.example` shows the names. |

Env vars (set in Vercel and in local `.env.local`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (both public by design), `INVITE_CODE` (secret word needed to sign up). Never commit the Supabase `secret`/`service_role` key or the DB password.

## Stack
Next.js **16.4** (App Router, TypeScript, Tailwind v4) + Supabase (Postgres + Auth, row-level security) + Vercel.

**Next.js 16 differs from older versions. Read `AGENTS.md` and `node_modules/next/dist/docs/` before writing code.** Facts already learned:
- `middleware` is now `src/proxy.ts` (exports `proxy`).
- `cookies()` must be awaited. Any page/component that reads cookies or `searchParams` must sit inside `<Suspense>` (cache components are on).
- `export const dynamicParams` is not allowed with this config.
- `PageProps<"/route">` / `LayoutProps<"/">` are global type helpers.

## Product shape (redesigned 2026-11-04, approved by the owner)
Duolingo-style, story-based, phone first. Five tabs, each with its own light warm colour world and an animated skyline of Tamil Nadu and German landmarks (pure SVG + CSS in `Skyline.tsx`; animations in `globals.css`, off with reduced-motion):
- **Learn** (`/`): a path of story chapters ("Priya's Reise": Priya from Madurai moves to Germany). Each chapter = story (`/learn/[slug]`, tap underlined words for meanings, culture note) then a **chapter check** (`/learn/[slug]/check`). Pass mark (2 of 3) unlocks the next chapter. Chapters 3-5 are shown locked as "soon".
- **Words** (`/flashcards[?deck=id]`): spaced-repetition flashcards.
- **Exam** (`/exam`): coming-soon cards (A1 Start Deutsch 1, A2, Email coach).
- **Brücke** (`/bruecke`): Tamil Nadu next to Germany culture pairs (`content/culture.ts`).
- **Me** (`/me`): account, **Language help** switch, links to Cheat sheets & grammar (`/cheatsheets`, `/cheatsheets/cases`, `/lessons/[slug]` = the 7 grammar lessons; `/lessons` redirects to `/cheatsheets`).

**Landmarks (skylines):** the owner's catalogue of 50 places (25 Tamil Nadu `TN001`-`TN025`, 25 Germany `DE001`-`DE025`) is `src/content/landmarks.json`; do not change its fields. A skyline is `<Skyline ids={[...]}/>`: first id on the left, last on the right, a middle one faded. **Every module must use its own pair so screens do not repeat**: tabs are set in `SKY_IDS` (`lib/landmarks.ts`), each story chapter has `landmarks: [TN, DE]` in `content/chapters.ts`. A small "i" button on each skyline opens facts from the JSON. **Draw gradually**: only places used so far have a drawing (registered in `DRAWINGS` in `components/landmarks.tsx`: TN001-004, TN006, TN011, DE001-004, DE010, DE018, DE025); every other id automatically gets a simple placeholder shape chosen by its building type, so any id can be used straight away. When building a new module, pick unused ids and draw them (Arch helper, viewBox, register width). Already used: Learn/Ankunft TN002+DE010, Neue Freunde TN003+DE001, Words TN004+DE025, Exam TN006+DE002, Brücke TN001+DE004+DE003, Me TN011+DE018. Some catalogue entries look approximate (e.g. TN025 "Madhur Temple Tower", several year_built values); show them as given and ask the owner before correcting.

**Audio:** every German phrase in the app is a recorded clip `public/audio/<key>.mp3` (key from `lib/audio-key.ts`; list in `public/audio/manifest.json`), so it plays on any device. `lib/speak.ts` plays the clip first and only falls back to the device voice when a phrase has no clip. **After adding or changing German text, regenerate clips**: `node --experimental-strip-types scripts/audio-texts.mts` then `scripts/make-audio.py` (needs Python, `pip install piper-tts`, ffmpeg and the free Thorsten voice from github.com/rhasspy/piper release v0.0.2; instructions at the top of the script; existing clips are kept). The script fixes a Piper quirk that would make "ich" sound like "ik". The clips were checked for length and loudness but not listened to; the owner should confirm they sound right.

**Language rule:** the UI is English only. Tamil is shown only as *help* (word meanings, translations, tips) and always carries the class `ta-only`. The Me tab switch ("English only" / "English + தமிழ்") sets `<html data-lang>` (saved in localStorage, applied before paint by a script in `layout.tsx`); CSS hides `.ta-only` when `data-lang="en"`. Do not put Tamil in headings, labels or menus. `src/lib/tamil.tsx` hides Tamil columns/segments in tables automatically.

**Colour rule:** tokens in `globals.css`: `--tab-*` variables per `data-tab` (set by `ThemeShell` from the URL via `lib/tabs.ts`); Tailwind `pri`, `pri-dark`, `pill` follow the active tab. Buttons: `.btn3d` (chunky). Icons: only `Icon.tsx` (no emoji). Fonts: Baloo Thambi 2 (headings), Nunito (body), Noto Sans Tamil.

## Code map
- Content (plain data, easy to edit): `content/chapters.ts` (story chapters, words, culture notes, checks, pass mark; `markChapter` marks answers), `content/lessons.ts` (7 grammar lessons + case tables), `content/vocab.ts` (47 flashcard words), `content/culture.ts`, `content/menu.ts` (older plan list, partly unused).
- Server actions (`app/actions.ts`): signup (checks `INVITE_CODE`), login, logout, `saveProgress`, `reviewCard`, `submitChapter` (re-marks the answers on the server and stores `chapter-<slug>` in `lesson_progress`, so a pass cannot be faked from the browser).
- `lib/progress.ts` (which chapters are done / unlocked), `lib/srs.ts` (SM-2 style scheduling, tested), `lib/speak.ts` + `components/useSpeak.ts` (plays recorded clips, falls back to a device voice, shows a message when neither works), `lib/tabs.ts`.
- Components: `ThemeShell`, `SiteNav` (top bar), `TabBar` (bottom tabs on phones), `Skyline`, `ScreenTop`, `LearnHome`, `Story`, `ChapterCheck`, `Locked`, `FlashcardReview`, `Quiz`, `DataTable`, `CaseTable`, `Rows`, `LangToggle`, `Icon`, `SpeakButton`, `AuthForm`, `AuthLinks`.
- `supabase/migrations/`: SQL run by hand in the Supabase SQL Editor. `001_init.sql` (profiles, lesson_progress, trigger), `002_flashcards.sql` (flashcard_state). **Check that 002 has been run**; flashcards cannot save without it.
- `docs/design/`: old mockups (history).

## Done and live
- Sign-up with invite code, login, logout ("Confirm email" is OFF in Supabase on purpose).
- Story chapters 1 (Ankunft) and 2 (Neue Freunde) with checks and unlocking; 7 grammar lessons with quizzes (scores not saved); flashcards; Brücke; Me with language switch; animated skylines per tab.
- Recorded German audio for all current phrases (see Audio). Not yet confirmed by ear on a real phone.

## Next (suggested order)
1. Verify audio and the whole logged-in flow on a real phone; fix what the owner reports.
2. Streak and XP (needs a new table: activity per day), then a daily goal.
3. Chapters 3-5 (Die Wohnung, Auf dem Markt, Pongal in Berlin) and more A1 topics inside the story path; then A2 chapters.
4. Exam section (A1/A2 formats, email-writing coach with autosaved drafts, original mock tests).
5. Story-based vocabulary exercises, listening, speaking practice; group leaderboard and shared word lists.
6. Optional: pre-recorded audio, dark mode, a warm version of the logo, PWA/offline.

## Rules and caveats
- **Do not copy Goethe exam papers** (copyrighted). Use the free official sample tests only to learn format and difficulty, then write original questions/stories.
- The Tamil text is AI-written and **needs proofreading by a Tamil speaker**; fix wording when told. (Neuter was changed to "நடுப்பால்"; avoid "அலி".)
- Use the owner's **personal** GitHub/Vercel/Supabase accounts. Their office laptop uses a company npm registry that needs company credentials (E401), so do not depend on it. The owner cannot use the work Claude account at home and has no paid personal Claude plan, so keep content easy to edit by hand (data files).
- Commit as the owner's personal identity; never commit secrets.
- Known small issue: unknown `/lessons/xyz` shows a not-found page but returns HTTP 200.

## Two-computer workflow
`git pull` before starting, `git add -A && git commit -m "..." && git push` before leaving. Local setup is in `README.md` (Node 22+, `npm install`, copy `.env.example` to `.env.local`, `npm run dev`).
