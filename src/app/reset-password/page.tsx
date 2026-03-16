import type { Metadata } from "next";
import Link from "next/link";

import AuthShell from "@/components/auth/AuthShell";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Update Password",
  description: "Set a new password for your Pencil And Hammer account.",
  alternates: {
    canonical: absoluteUrl("/reset-password"),
  },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(value: string | string[] | undefined) {
  return typeof value === "string" ? value : "";
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <AuthShell
      badge="Secure Reset"
      title="Choose a new password"
      description="Set a fresh password for your Pencil And Hammer account after following the secure recovery link."
      footer={
        <p className="font-body text-sm text-muted-foreground">
          Need to start over?{" "}
          <Link href="/forgot-password" className="text-accent transition-colors hover:text-gold-dark">
            Send another reset email
          </Link>
          .
        </p>
      }
    >
      <ResetPasswordForm
        message={getParam(params.message)}
        error={getParam(params.error)}
      />
    </AuthShell>
  );
}
