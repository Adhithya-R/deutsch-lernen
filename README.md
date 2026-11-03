# Deutsch A1/A2

A web app to learn German A1/A2 in **Tamil and English**, for a study group preparing for the Goethe exams and a move to Germany.

- Live app: https://deutsch-lernen-mu.vercel.app/
- Code: https://github.com/Adhithya-R/deutsch-lernen
- Read `docs/HANDOFF.md` first. It has the goals, decisions and what to do next.

## Set up on a new computer

1. Install **Node.js 22 or newer** (https://nodejs.org) and **Git**. VS Code is optional but recommended.
2. Clone and install:

   ```bash
   git clone https://github.com/Adhithya-R/deutsch-lernen.git
   cd deutsch-lernen
   npm install
   ```

3. Copy `.env.example` to `.env.local` and fill in the values (see below). `.env.local` is never committed.
4. Start the app and open http://localhost:3000:

   ```bash
   npm run dev
   ```

## Environment variables

| Name | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API (Project URL) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase → Project Settings → API Keys (Publishable key) |
| `INVITE_CODE` | The secret word friends type to sign up. You choose it. |

The same three are set in Vercel under Settings → Environment Variables. Never commit the Supabase `secret` / `service_role` key or the database password.

## Daily workflow (two computers)

```bash
git pull            # before you start: get the latest from the other computer
# ... make changes ...
git add -A
git commit -m "Describe what you changed"
git push            # Vercel redeploys the live site automatically
```

Always `git pull` before starting and `git push` before leaving, so the two computers never drift apart.

## Scripts

- `npm run dev`: run locally
- `npm run build`: production build (run before pushing bigger changes)
- `npm run lint`: check code style
