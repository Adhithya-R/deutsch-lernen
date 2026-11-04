import { createClient } from "@/lib/supabase/server";

/**
 * Who is logged in, WITHOUT a round trip to Supabase. getClaims() verifies the login token locally
 * (it only calls Supabase when the token needs refreshing). The database itself still enforces
 * who may read and write what (row-level security), so this is safe to use for pages and actions.
 */
export async function getSession() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  return {
    supabase,
    userId: (claims?.sub as string | undefined) ?? null,
    email: claims?.email as string | undefined,
  };
}
