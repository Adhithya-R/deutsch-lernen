# Handoff: where the project stands

## Goal
A mobile-friendly web app for about 20 friends studying German A1/A2 (Goethe Institute, weekend classes). They revise on weekdays together. The owner moves to Germany next year. Content is in **English and Tamil**.

Planned features:
- A1 and A2 lessons: verbs, pronouns, sentence order, cases, possessives, and so on
- Cheat-code tables: Nominativ / Akkusativ / Dativ, pronouns, possessives
- Many exercises, including story-based vocabulary
- Exam preparation for Goethe A1 and A2: email writing (structure, tips), question formats
- Saved progress, with "continue where you left off"

## Stack and why
| Part | Choice | Notes |
|---|---|---|
| App | Next.js 16 (App Router) + TypeScript + Tailwind | Installable on phones later (PWA) |
| Login and database | Supabase (Postgres + Auth) | Row-level security: each user only sees their own rows |
| Hosting | Vercel | Redeploys on every push to `main` |
| Code | GitHub `Adhithya-R/deutsch-lernen` | Source of truth |

**Next.js 16 differs from older versions.** Read `AGENTS.md` and `node_modules/next/dist/docs/` before writing code. For example: `middleware` is now `proxy.ts`, `cookies()` must be awaited, and pages reading cookies need `<Suspense>`. `dynamicParams` is not allowed with the current config.

## How things work
- Lessons and exercises are plain data in `src/content/lessons.ts` (bilingual). Add a lesson by adding an object to the `lessons` array. The page `src/app/lessons/[slug]/page.tsx` renders it.
- Exercise types: multiple choice (has `options`) or typed answer (no `options`). See `src/components/Quiz.tsx`. Scores are not saved yet.
- Login: `src/app/actions.ts` (signup with `INVITE_CODE` check, login, logout, saveProgress) and `src/components/AuthForm.tsx`. `src/proxy.ts` refreshes the session.
- Database: `supabase/migrations/001_init.sql` creates `profiles` and `lesson_progress` with security rules. It was run once in the Supabase SQL Editor. New migrations are run the same way.
- In Supabase, **Confirm email is turned off** (there is no email confirmation flow yet).

## Done
- Live app on Vercel, with env vars set
- Sign-up (invite code), login, logout
- Seven A1 lessons: pronouns, sein/haben, regular verbs, sentence order, questions, negation, possessives
- Case cheat-sheet tables on the home page
- Progress saving and the Continue button

## Next (suggested order)
1. Vocabulary flashcards with spaced repetition (SM-2 or FSRS) and German text-to-speech (`de-DE`)
2. Story-based vocabulary exercises
3. A1 exam section: formats, tips, email/message writing guide with a checklist and autosaved drafts
4. A2 lessons (Perfekt, modal verbs, separable verbs, Dativ prepositions, and so on) and the A2 exam section
5. Saving quiz scores, group leaderboard, shared word lists
6. PWA install and offline cheat sheets

## Rules agreed with the owner
- **Do not copy Goethe exam papers.** They are copyrighted. Use the free official sample tests only to learn the format and difficulty, then write original questions and stories in the same style.
- The Tamil text was written by an AI and **needs proofreading by a Tamil speaker**. Fix wording when told.
- Keep the project on the owner's personal accounts (GitHub, Vercel, Supabase). The owner's office laptop has a company npm registry that needs company credentials, so avoid depending on it.
- Never commit secrets. The `.env*` files are ignored. Only the Supabase URL and publishable key are meant to be public.

## Known issues
- An unknown lesson address shows a not-found page with a 200 status instead of 404.
