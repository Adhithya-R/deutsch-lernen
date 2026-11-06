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
- **Exam** (`/exam`): A1 and A2 practice (`content/exam.ts`, all original, none copied from Goethe): reading and listening (marked in the browser, listening plays recorded 2-voice clips), writing (A1 form + messages; A2 note + emails) with a coach that checks greeting, closing and length and keeps drafts in localStorage, speaking cards with model answers, a timed mini mock test, and the Email coach (`/exam/email-coach`). Routes `/exam/[level]` and `/exam/[level]/[skill]` (reading, listening, writing, speaking, mock). The exam formats/times shown are approximate; the owner should compare them with the official Modelltest.
- **Brücke** (`/bruecke`): Tamil Nadu next to Germany culture pairs (`content/culture.ts`).
- **Me** (`/me`): account, **Language help** switch, Study group (`/group`: weekly XP ranking and a 100-XP weekly challenge), links to Cheat sheets & grammar (`/cheatsheets`, `/cheatsheets/cases`, `/lessons/[slug]` = 21 grammar lessons (13 A1, 8 A2; `content/lessons.ts`); `/lessons` redirects to `/cheatsheets`).

**Landmarks (skylines):** the owner's catalogue of 50 places (25 Tamil Nadu `TN001`-`TN025`, 25 Germany `DE001`-`DE025`) is `src/content/landmarks.json`; do not change its fields. A skyline is `<Skyline ids={[...]}/>`: first id on the left, last on the right, a middle one faded. **Every module must use its own pair so screens do not repeat**: tabs are set in `SKY_IDS` (`lib/landmarks.ts`), each story chapter has `landmarks: [TN, DE]` in `content/chapters.ts`. A small "i" button on each skyline opens facts from the JSON. **Moods (weather and time of day):** each skyline also has a `mood` so screens do not share the same sun/birds/clouds: `dawn` (plane + low sun), `noon` (rayed sun, kites, butterflies, German flag), `evening` (moon, sparkles, hanging oil lamps), `rain` (monsoon/drizzle), `sunset` (red sun, birds, faint bridge), `autumn` (falling leaves). Defined in `components/SkyScenes.tsx` (+ CSS in `globals.css`); tabs use `SKY_MOOD` (`lib/landmarks.ts`), chapters carry `mood` in `content/chapters.ts`. Moods: dawn, noon, evening, rain, sunset, autumn, snow (falling flakes), balloons (hot-air balloons), festival (bunting + lanterns), rainbow. Used: Ankunft TN002+DE010 dawn, Neue Freunde TN003+DE001 noon, Die Wohnung TN009+DE007 snow, Auf dem Markt TN018+DE019 balloons, Pongal in Berlin TN008+DE005 festival, Words TN004+DE025 evening, Exam TN006+DE002 rain, Brücke TN001+DE004+DE003 sunset, Me TN011+DE018 autumn, Study group TN017+DE017 rainbow. Drawn so far: TN001-004, TN006, TN008, TN009, TN011, TN017, TN018, DE001-005, DE007, DE010, DE017-019, DE025. **Give every new chapter/module its own landmark pair AND its own mood** (new moods can be added in SkyScenes). Each building's name is shown as a label on the ground strip (`labelName` in `lib/landmarks.ts` shortens long names; the "i" button shows the full facts). The catalogue spells some names without accents ("Romer", "Lubeck"); ask the owner before correcting.

**Draw gradually**: only places used so far have a drawing (registered in `DRAWINGS` in `components/landmarks.tsx`: TN001-004, TN006, TN008, TN009, TN011, TN017, TN018, DE001-005, DE007, DE010, DE017-019, DE025); every other id automatically gets a simple placeholder shape chosen by its building type, so any id can be used straight away. When building a new module, pick unused ids and draw them (Arch helper, viewBox, register width). Already used: Learn/Ankunft TN002+DE010, Neue Freunde TN003+DE001, Words TN004+DE025, Exam TN006+DE002, Brücke TN001+DE004+DE003, Me TN011+DE018. Some catalogue entries look approximate (e.g. TN025 "Madhur Temple Tower", several year_built values); show them as given and ask the owner before correcting.

**Audio:** every German phrase in the app is a recorded clip (two free voices: Thorsten, male, and Kerstin, female; story lines use the speaker's voice, exam conversations use both) `public/audio/<key>.mp3` (key from `lib/audio-key.ts`; list in `public/audio/manifest.json`), so it plays on any device. `lib/speak.ts` plays the clip first and only falls back to the device voice when a phrase has no clip. **After adding or changing German text, regenerate clips**: `node --experimental-strip-types scripts/audio-texts.mts` then `scripts/make-audio.py <thorsten.onnx> <kerstin.onnx>` (needs Python, `pip install piper-tts`, ffmpeg and the two voices from github.com/rhasspy/piper release v0.0.2; instructions at the top of the script; existing clips are kept, and a clip is re-made when its speaker changes). Run `node --experimental-strip-types scripts/check-content.mts` after editing lessons, chapters, vocabulary or exam content: it checks answers, word keys, landmark ids, sample answers and more. The script fixes a Piper quirk that would make "ich" sound like "ik". The clips were checked for length and loudness but not listened to; the owner should confirm they sound right.

**Language rule:** the UI is English only. Tamil is shown only as *help* (word meanings, translations, tips) and always carries the class `ta-only`. The Me tab switch ("English only" / "English + தமிழ்") sets `<html data-lang>` (saved in localStorage, applied before paint by a script in `layout.tsx`); CSS hides `.ta-only` when `data-lang="en"`. Do not put Tamil in headings, labels or menus. `src/lib/tamil.tsx` hides Tamil columns/segments in tables automatically.

**Colour rule:** tokens in `globals.css`: `--tab-*` variables per `data-tab` (set by `ThemeShell` from the URL via `lib/tabs.ts`); Tailwind `pri`, `pri-dark`, `pill` follow the active tab. Buttons: `.btn3d` (chunky). Icons: only `Icon.tsx` (no emoji). Fonts: Baloo Thambi 2 (headings), Nunito (body), Noto Sans Tamil.

## Code map
- Content (plain data, easy to edit): `content/people.ts` (the 22 classmates and their gender; Kaviarasan confirmed male, **Yogesh assumed male: confirm**; `speaker()`, `role()`), `content/chapters.ts` (20 story chapters: 1-8 A1, 9-16 A2, 17 A1 bonus, 18-20 A2; speaker code `a` is the learner character: Adhi in chapters 1, 2, 3, 5, 17 and a different classmate in the others; classmates also play the officer, doctor, seller etc. (`speaker(name, "role")`), and the check enforces every classmate speaks at least 3 lines and nobody more than 12%; every speaker has a gender that picks the voice), `content/lessons.ts` (24 grammar lessons incl. Konjunktiv II, Passiv, relative clauses), `content/cheatsheets.ts` (built from lesson tables), `content/vocab.ts` (269 cards in 27 decks; each deck has its own landmark pair and mood), `content/pics.ts` (animated emoji picture per card), `content/bruecke.ts` (10 culture topics with sections, German words with audio, quiz), `content/exam.ts` (original A1/A2 practice).
- Server actions (`app/actions.ts`): signup (invite code), login, logout, `reviewCard` (grade 0/1/2), `submitChapter`, `saveQuiz` (lesson, exam, mock, culture), `saveDraft`, `checkSetup`. All return `SaveResult` and the UI shows errors with `SaveNote`; nothing fails silently.
- Login check is `lib/supabase/session.ts` (`getClaims()`, no network call) and `proxy.ts` skips audio and images, which made navigation faster.
- Study logic: `lib/deck-quiz.ts` (questions, typed answer check, grade from attempts; tested by `scripts/test-deck-quiz.mts`), `lib/srs.ts`, `lib/speak.ts` (recorded clips first, device voice fallback, `preload`).
- Pages: `/` Home (path of stories, Grammar, Cheat sheets tiles), `/grammar`, `/lessons/[slug]`, `/cheatsheets[/slug]`, `/flashcards` (deck grid), `/flashcards/[deck]` (learn then test; `due` = repeat session), `/exam/...` (incl. `/exam/a1|a2/full`: staged full practice exam, timers per part via `components/FullMock.tsx`, saved as mock `<level>-full`), `/bruecke[/topic]`, `/conversation[/id]` (partner speaks in the right gender voice, you pick the reply that fits; 19 talks in `content/conversations.ts`, every partner is a classmate playing a role; saved as quiz kind `talk`), `/speaking[/set]` (speaking practice with the browser's speech recognition, de-DE; Chrome/Edge/Android only; scoring in `lib/speech-match.ts`, tested), `/progress` (overall level like Duolingo: XP builds levels, level L starts at 25·L·(L-1) XP, titles Neuling → Meister in `lib/level.ts`; streak, stats, last 7 days, personal daily goal 10/20/40 kept in the browser, "Practise again" from low quiz scores in `lib/weak.ts`), `/me` (account, language, study group, cheat sheets; **no developer tools shown to learners**). Owner-only pages that are not linked anywhere: `/setup-check` (tests the database setup) and `/me/export` (JSON download of your own progress). Owner backup steps are in `docs/BACKUP.md`, `/group` (this week's league Bronze/Silver/Gold/Diamond by weekly XP in `lib/league.ts`, last week's podium from the SQL function `last_week_leaderboard` (needs the updated `supabase/setup.sql`; the page works without it), weekly XP ranking + 100-XP challenge) and `/group/weekly` (10 words, same for the whole class each ISO week, `lib/weekly.ts`, saved as quiz kind `weekly`, XP flows into the leaderboard). Back / Home / Next at the bottom of pages (`PageNav`); focused screens (stories, flashcard study) have their own Back and Home buttons.
- Skyline: `components/landmarks.tsx` + `landmarks2.tsx` + `landmark-parts.tsx` now draw all 50 places. `SkyScenes.tsx` has moods incl. steam, confetti, fireworks.
- Database: **run `supabase/setup.sql` once** in the Supabase SQL editor (idempotent; older `migrations/` are history). Open `/setup-check` while logged in (an unlinked owner page) to see what is missing.
- Checks to run before pushing: `npx tsc --noEmit`, `npx eslint src scripts`, `node --experimental-strip-types scripts/check-content.mts`, `node --experimental-strip-types scripts/test-deck-quiz.mts`, `npx next build`.

## Done and live
- Login, saving of chapters, lessons, flashcards, quizzes, exam practice, writing drafts, XP and streak, all restored on login.
- Stories use all 21 classmates (Kavi is only mentioned: gender unknown). **Genders in `people.ts` are assumptions: ask the owner to confirm.** Voices: only two usable voices (Thorsten m, Kerstin f), so classmates of the same gender share a voice.
- Flashcards: learn each word with picture, sound, Tamil help; then a test (choose meaning, listen and choose, type); wrong words come back; first try = full XP.
- Emoji rule: the owner dislikes AI-looking icons in the UI chrome, so chrome uses `Icon.tsx` only. Emoji are allowed only as the small animated *vocabulary pictures* (`Pic`).

## Next (suggested order)
1. Owner testing and feedback (audio on phones, logged-in flows, Tamil wording, German content, exam formats, assumed genders).
2. A2 story chapters (Beim Arzt, Die Arbeit), each with its own landmark pair and mood.
3. Daily goal; shared word lists; reminders; more exam tasks and decks.
4. Vercel Function Region is set to Mumbai (`bom1`) in `vercel.json` to match the Supabase project (ap-south-1). Keep them in the same region. JWT signing keys are ECC (P-256), so login checks are local.

## Rules and caveats
- **Do not copy Goethe exam papers** (copyrighted). Use the free official sample tests only to learn format and difficulty, then write original questions/stories.
- The Tamil text is AI-written and **needs proofreading by a Tamil speaker**; fix wording when told. (Neuter was changed to "நடுப்பால்"; avoid "அலி".)
- Use the owner's **personal** GitHub/Vercel/Supabase accounts. Their office laptop uses a company npm registry that needs company credentials (E401), so do not depend on it. The owner cannot use the work Claude account at home and has no paid personal Claude plan, so keep content easy to edit by hand (data files).
- Commit as the owner's personal identity; never commit secrets.
- Known small issue: unknown `/lessons/xyz` shows a not-found page but returns HTTP 200.

## Two-computer workflow
`git pull` before starting, `git add -A && git commit -m "..." && git push` before leaving. Local setup is in `README.md` (Node 22+, `npm install`, copy `.env.example` to `.env.local`, `npm run dev`).
