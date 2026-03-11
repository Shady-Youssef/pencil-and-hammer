import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { env } from "@/lib/env";

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const nextResponse = NextResponse.redirect(
    new URL("/admin?message=You have been signed out.", requestUrl.origin),
  );

  const supabase = createServerClient(env.supabaseUrl, env.supabasePublishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          nextResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  await supabase.auth.signOut();

  return nextResponse;
}
