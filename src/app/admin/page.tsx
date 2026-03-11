import type { Metadata } from "next";

import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";
import { getAdminProjects } from "@/lib/projects/server";
import { absoluteUrl } from "@/lib/site";
import { getSiteSettingsResult } from "@/lib/site/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import DashboardPage from "@/views/Dashboard";

export const metadata: Metadata = {
  title: "Admin Access",
  description: "Sign in to the private MBM Designs admin workspace.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: absoluteUrl("/admin"),
  },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(value: string | string[] | undefined, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const supabase = await createSupabaseServerClient();
  const [{ projects, error }, { settings, error: siteSettingsError }] =
    await Promise.all([getAdminProjects(), getSiteSettingsResult()]);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <DashboardPage
        userEmail={user.email ?? ""}
        userName={user.user_metadata.full_name ?? user.email ?? "Studio User"}
        projects={projects}
        projectsError={error}
        siteSettings={settings}
        siteSettingsError={siteSettingsError}
      />
    );
  }

  return (
    <AuthShell
      badge="Admin Access"
      title="Sign in"
      description="Use your administrator or CSM credentials to enter the private MBM Designs workspace."
      footer={
        <p className="font-body text-sm text-muted-foreground">
          Only internal MBM Designs administrators can issue access. Contact the
          studio team if your account has not been provisioned.
        </p>
      }
    >
      <LoginForm
        nextPath={getParam(params.next, "/admin")}
        message={getParam(params.message)}
        error={getParam(params.error)}
      />
    </AuthShell>
  );
}
