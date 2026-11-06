# Backup guide (for the app owner)

Your data lives in **Supabase**, not in Vercel or GitHub. The code is safe on GitHub; the learners' progress is only in the database.

## What each learner can do
Me → **Download my progress** saves one JSON file with their chapters, flashcards, quiz scores, XP and writing drafts.

## What you should do (about 10 minutes, once a month, and before big changes)
1. Open the Supabase dashboard → your project → **Table Editor**.
2. For each table (`profiles`, `lesson_progress`, `flashcard_state`, `daily_activity`, `quiz_results`, `writing_drafts`): open it → **Export** → **Export table as CSV**. Keep the files in a private folder.
3. Do the same after the class starts the real exam preparation, so a mistake cannot cost everyone their progress.

## Do not
- Do not share the Supabase **secret / service_role key** or the **database password**, and do not put them in the code.
- The app deliberately has no "export everybody" button, because that would need the secret key inside the website.

## Free plan notes
- A free Supabase project can **pause after about a week without activity**. Open the dashboard and click **Restore / Unpause**. Data is kept.
- Free projects do not include guaranteed daily backups. Paid plans do (Database → Backups). The monthly CSV export above is your safety net.

## Restoring
To restore, import a CSV back into its table (Table Editor → Insert → Import data from CSV). Ask for help the first time.
