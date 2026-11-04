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
Duolingo-style, story-based, phone first. Five tabs, each with its own light warm colour world and an animated skyline of Tamil Nadu and German landmarks (Meenakshi gopuram, Brihadeeswarar vimana, Brandenburg Gate, Cologne Cathedral, Berlin TV tower; pure SVG + CSS in `Skyline.tsx`, animations in `globals.css`, off with reduced-motion):
- **Learn** (`/`): a path of story chapters ("Priya's Reise": Priya from Madurai moves to Germany). Each chapter = story (`/learn/[slug]`, tap underlined words for meanings, culture note) then a **chapter check** (`/learn/[slug]/check`). Pass mark (2 of 3) unlocks the next chapter. Chapters 3-5 are shown locked as "soon".
- **Words** (`/flashcards[?deck=id]`): spaced-repetition flashcards.
- **Exam** (`/exam`): coming-soon cards (A1 Start Deutsch 1, A2, Email coach).
- **Brücke** (`/bruecke`): Tamil Nadu next to Germany culture pairs (`content/culture.ts`).
- **Me** (`/me`): account, **Language help** switch, links to Cheat sheets & grammar (`/cheatsheets`, `/cheatsheets/cases`, `/lessons/[slug]` = the 7 grammar lessons; `/lessons` redirects to `/cheatsheets`).

**Language rule:** the UI is English only. Tamil is shown only as *help* (word meanings, translations, tips) and always carries the class `ta-only`. The Me tab switch ("English only" / "English + தமிழ்") sets `<html data-lang>` (saved in localStorage, applied before paint by a script in `layout.tsx`); CSS hides `.ta-only` when `data-lang="en"`. Do not put Tamil in headings, labels or menus. `src/lib/tamil.tsx` hides Tamil columns/segments in tables automatically.

**Colour rule:** tokens in `globals.css`: `--tab-*` variables per `data-tab` (set by `ThemeShell` from the URL via `lib/tabs.ts`); Tailwind `pri`, `pri-dark`, `pill` follow the active tab. Buttons: `.btn3d` (chunky). Icons: only `Icon.tsx` (no emoji). Fonts: Baloo Thambi 2 (headings), Nunito (body), Noto Sans Tamil.

## Code map
- Content (plain data, easy to edit): `content/chapters.ts` (story chapters, words, culture notes, checks, pass mark; `markChapter` marks answers), `content/lessons.ts` (7 grammar lessons + case tables), `content/vocab.ts` (47 flashcard words), `content/culture.ts`, `content/menu.ts` (older plan list, partly unused).
- Server actions (`app/actions.ts`): signup (checks `INVITE_CODE`), login, logout, `saveProgress`, `reviewCard`, `submitChapter` (re-marks the answers on the server and stores `chapter-<slug>` in `lesson_progress`, so a pass cannot be faked from the browser).
- `lib/progress.ts` (which chapters are done / unlocked), `lib/srs.ts` (SM-2 style scheduling, tested), `lib/speak.ts` + `components/useSpeak.ts` (German text-to-speech: waits for voices, picks a German one, shows a message when the device has none), `lib/tabs.ts`.
- Components: `ThemeShell`, `SiteNav` (top bar), `TabBar` (bottom tabs on phones), `Skyline`, `ScreenTop`, `LearnHome`, `Story`, `ChapterCheck`, `Locked`, `FlashcardReview`, `Quiz`, `DataTable`, `CaseTable`, `Rows`, `LangToggle`, `Icon`, `SpeakButton`, `AuthForm`, `AuthLinks`.
- `supabase/migrations/`: SQL run by hand in the Supabase SQL Editor. `001_init.sql` (profiles, lesson_progress, trigger), `002_flashcards.sql` (flashcard_state). **Check that 002 has been run**; flashcards cannot save without it.
- `docs/design/`: old mockups (history).

## Done and live
- Sign-up with invite code, login, logout ("Confirm email" is OFF in Supabase on purpose).
- Story chapters 1 (Ankunft) and 2 (Neue Freunde) with checks and unlocking; 7 grammar lessons with quizzes (scores not saved); flashcards; Brücke; Me with language switch; animated skylines per tab.
- Audio fix (voice selection). **Not verified on a real device yet** (cannot hear sound in the build environment). If it stays silent, the reliable fix is pre-recorded German audio files.

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
