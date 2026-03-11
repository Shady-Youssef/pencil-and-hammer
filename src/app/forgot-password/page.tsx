import type { Metadata } from "next";
import Link from "next/link";

import AuthShell from "@/components/auth/AuthShell";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Request a password reset email for your MBM Designs account.",
  alternates: {
    canonical: absoluteUrl("/forgot-password"),
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
      badge="Password Recovery"
      title="Reset your password"
      description="Enter the account email associated with your MBM Designs access and we will send a secure reset link."
      footer={
        <p className="font-body text-sm text-muted-foreground">
          Remembered it?{" "}
          <Link href="/admin" className="text-accent transition-colors hover:text-gold-dark">
            Back to sign in
          </Link>
          .
        </p>
      }
    >
      <ForgotPasswordForm
        message={getParam(params.message)}
        error={getParam(params.error)}
      />
    </AuthShell>
  );
}
