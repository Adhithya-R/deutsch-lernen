import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Keeps the Supabase login session fresh on every request.
export async function proxy(request: NextRequest) {
  // Visitors who are not logged in have no Supabase cookie: nothing to refresh, so answer at once.
  if (!request.cookies.getAll().some((c) => c.name.startsWith("sb-"))) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (list) => {
          list.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );

  await supabase.auth.getClaims(); // checks the token locally and refreshes it when needed
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|audio/|favicon.ico|.*\\.(?:png|webp|jpg|jpeg|svg|mp3|json|txt|ico)$).*)"],
};
