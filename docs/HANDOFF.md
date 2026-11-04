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

## Code map
- `src/content/lessons.ts`: lessons (bilingual) with `tables`, `points` (examples), `exercises` (multiple choice if `options`, else typed answer). Add a lesson by adding an object. Also holds the case-article tables.
- `src/content/vocab.ts`: 47 flashcard words in 6 decks. Card `id`s are stable; never rename ones users studied.
- `src/content/menu.ts`: the whole navigation. Items with `href` are live; items marked `soon` show a "Soon" badge. Switch an item on by giving it an `href`.
- `src/lib/srs.ts`: spaced repetition (SM-2 style), pure functions, tested.
- `src/app/actions.ts`: server actions: signup (checks `INVITE_CODE`), login, logout, `saveProgress`, `reviewCard`.
- `src/components/`: `SiteNav` (header + dropdown/mobile menu), `AuthLinks`, `AuthForm`, `Quiz`, `DataTable`, `CaseTable`, `FlashcardReview`, `ProgressButton`.
- Routes: `/`, `/lessons/[slug]`, `/flashcards[?deck=id]`, `/cheatsheets/cases`, `/login`, `/signup`.
- `supabase/migrations/`: SQL run by hand in Supabase SQL Editor. `001_init.sql` (profiles, lesson_progress, trigger). `002_flashcards.sql` (flashcard_state). **Check that 002 has been run in Supabase**; flashcards cannot save without it.
- `docs/design/`: design mockups (see below).

## Done and live
- Sign-up with invite code, login, logout (Supabase Auth; "Confirm email" is OFF in Supabase on purpose, no email-confirm flow exists).
- 7 A1 lessons: pronouns, sein/haben, regular verbs, sentence order, questions, negation, possessives. Each has tables, examples (DE/EN/TA) and quizzes (quiz scores are not saved).
- Progress saving, "Continue" button on home.
- Flashcards with spaced repetition and browser German text-to-speech (`de-DE`). Written and built, **not yet tested end-to-end on the live site**.
- Header with logo and 6-section menu (Lernen, Spickzettel, Wortschatz, Prüfung, Üben, Gruppe) with sub-menus; many sub-items are "Soon".
- Cases cheat sheet page. Logo in `public/logo.webp`, favicon `src/app/icon.png`.

## Current decision in progress: UI redesign (nothing implemented yet)
Owner feedback: the logo is fine, but the current theme (green) does not suit the app. They want a **neat, clean, mostly warm-coloured** UI like Google / Microsoft / Meta / Oracle products, and **not** "AI-looking" (no emoji icons, gradients, glow).

Three mockups were made (images in `docs/design/*.webp`; each direction has a home page and a lesson page):
- **A · Sunrise** (Material style): top bar with tabs, tonal peach/butter cards, orange `#D9600B`, DM Sans.
- **B · Fluent Warm** (Microsoft style): left sidebar, breadcrumb bar, "On this page" panel, flat cards, burnt orange `#C8400A` on warm grey `#F6F2EC`, Inter.
- **C · Redwood** (Oracle style): top bar, sand hero, hairlines, rust `#B5421C`, IBM Plex Sans.

**Update: most users (the friends) will use PHONES.** So the design must be mobile-first. New recommendation: **A's friendly tonal cards + a bottom tab bar** (Home, Lessons, Cards, Exam, More), with thumb-sized buttons (min 48px). A phone mockup is in `docs/design/mobile-A.webp` (Home, Lesson, Flashcard, More menu). On laptops, B's layout (sidebar) can be the wide-screen version. Phones are the priority; test at 390px width.

Earlier recommendation (before the phone-first note): **B** (sidebar scales to many sections and turns into a slide-out on phones); A as second choice. **Owner has not made the final choice yet (waiting on their reply to the phone mockup).**
Open questions for the owner: which direction (or mix); make a warm (cream/rust) version of the logo, or keep the green one as a small mark; dark mode now or later; phone mockup before building.
Build plan after choosing: (1) design tokens in `globals.css`, (2) shared components, (3) nav + home, (4) lesson, flashcards, login, cheat sheets restyled, (5) phone layout tested at 390px. Push after each step. Use simple line SVG icons only.

## Next features (suggested order)
1. Apply the chosen design.
2. Exam section (A1 Start Deutsch 1, A2): formats, tips, email/message writing guide with checklist and autosaved drafts, mock tests.
3. Story-based vocabulary exercises.
4. A2 lessons (Perfekt, Dativ, modal verbs, subordinate clauses, …) and more A1 (articles/plural, Akkusativ, modal verbs, separable verbs, numbers/time, imperative).
5. Save quiz scores, group leaderboard, shared word lists, PWA/offline cheat sheets.

## Rules and caveats
- **Do not copy Goethe exam papers** (copyrighted). Use the free official sample tests only to learn format and difficulty, then write original questions/stories.
- The Tamil text is AI-written and **needs proofreading by a Tamil speaker**; fix wording when told. (Neuter was changed to "நடுப்பால்"; avoid "அலி".)
- Use the owner's **personal** GitHub/Vercel/Supabase accounts. Their office laptop uses a company npm registry that needs company credentials (E401), so do not depend on it. The owner cannot use the work Claude account at home and has no paid personal Claude plan, so keep content easy to edit by hand (data files).
- Commit as the owner's personal identity; never commit secrets.
- Known small issue: unknown `/lessons/xyz` shows a not-found page but returns HTTP 200.

## Two-computer workflow
`git pull` before starting, `git add -A && git commit -m "..." && git push` before leaving. Local setup is in `README.md` (Node 22+, `npm install`, copy `.env.example` to `.env.local`, `npm run dev`).
