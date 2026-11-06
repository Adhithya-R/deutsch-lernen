# Accounts, password reset and problem reports (for the app owner)

## One-time Supabase settings
1. **Authentication → URL Configuration**
   - **Site URL:** `https://deutsch-lernen-mu.vercel.app`
   - **Redirect URLs:** add `https://deutsch-lernen-mu.vercel.app/**`
   Without these the "Forgot password?" link cannot bring people back to the app.
2. **SQL:** run the new parts of `supabase/setup.sql` (the `feedback` table and the `delete_my_account` function). The whole file is safe to run again.

## Email limit (important)
Supabase's built-in email sender allows only a few emails per hour for the whole project. That is fine for testing but too low for a class that all forgets passwords at once. Before many people use it, set up your own mail sender:
**Authentication → Emails → SMTP Settings** (a free sender such as Resend or a Gmail app password works).
Until then, you can reset someone's password yourself: **Authentication → Users →** the user's menu **→ Send password recovery**, or set a new password there.

## Reading problem reports
Supabase → **Table Editor → feedback**. Each row has the message, the page and the user id (matches **Authentication → Users**).

## Deleting accounts
Learners delete their own account under Me → Account settings. That calls the `delete_my_account` SQL function, which removes the user and, through `on delete cascade`, all their data. Their old problem reports stay but are no longer linked to a person.
