"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import AuthStatusMessage from "@/components/auth/AuthStatusMessage";
import { useAuth } from "@/components/auth/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ResetPasswordFormProps = {
  message?: string;
  error?: string;
};

export default function ResetPasswordForm({
  message,
  error,
}: ResetPasswordFormProps) {
  const router = useRouter();
  const { client, user, loading } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    const { error } = await client.auth.updateUser({
      password,
    });

    setSubmitting(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Password updated.");
    router.push("/admin");
    router.refresh();
  };

  if (!loading && !user) {
    return (
      <div className="space-y-4">
        <AuthStatusMessage
          fallbackMessage="Open the password recovery link from your email to continue."
          message={message}
          error={error}
        />
        <p className="font-body text-sm text-muted-foreground">
          If the link expired, request a new reset email.
        </p>
        <Button asChild className="h-11 w-full bg-gradient-gold text-charcoal hover:opacity-95">
          <Link href="/forgot-password">Request another reset link</Link>
        </Button>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <AuthStatusMessage message={message} error={error} />
      <div className="space-y-2">
        <label className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground">
          New password
        </label>
        <Input
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Minimum 8 characters"
        />
      </div>
      <div className="space-y-2">
        <label className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Confirm password
        </label>
        <Input
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Repeat password"
        />
      </div>
      <Button
        type="submit"
        className="h-11 w-full bg-gradient-gold text-charcoal hover:opacity-95"
        disabled={submitting || loading}
      >
        {submitting ? <Loader2 className="animate-spin" /> : null}
        Update password
      </Button>
    </form>
  );
}
