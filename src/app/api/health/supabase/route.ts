import { NextResponse } from "next/server";

import { env } from "@/lib/env";

export async function GET() {
  const response = await fetch(`${env.supabaseUrl}/auth/v1/settings`, {
    headers: {
      apikey: env.supabasePublishableKey,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json(
      {
        connected: false,
        projectId: env.supabaseProjectId,
        status: response.status,
      },
      { status: 500 },
    );
  }

  const settings = await response.json();

  return NextResponse.json({
    connected: true,
    projectId: env.supabaseProjectId,
    siteUrl: env.siteUrl,
    disableSignup: settings.disable_signup ?? null,
    external: settings.external ?? {},
  });
}
