import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { env } from "@/lib/env";

function getSafeRedirectPath(next: string | null) {
  if (!next || !next.startsWith("/")) {
    return "/admin";
  }

  return next;
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = getSafeRedirectPath(requestUrl.searchParams.get("next"));
  const errorDescription = requestUrl.searchParams.get("error_description");
  const cookiesToSet: Array<{
    name: string;
    value: string;
    options?: Parameters<NextResponse["cookies"]["set"]>[2];
  }> = [];

  if (errorDescription) {
    return NextResponse.redirect(
      new URL(`/admin?error=${encodeURIComponent(errorDescription)}`, requestUrl.origin),
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/admin?error=Missing authentication code.", requestUrl.origin),
    );
  }

  const supabase = createServerClient(env.supabaseUrl, env.supabasePublishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(nextCookies) {
        cookiesToSet.push(...nextCookies);
      },
    },
  });
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL(`/admin?error=${encodeURIComponent(error.message)}`, requestUrl.origin),
    );
  }

  const response = NextResponse.redirect(new URL(next, requestUrl.origin));

  cookiesToSet.forEach(({ name, value, options }) => {
    response.cookies.set(name, value, options);
  });

  return response;
}
