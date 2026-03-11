"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import AuthStatusMessage from "@/components/auth/AuthStatusMessage";
import { useAuth } from "@/components/auth/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function getResetRedirect() {
  if (typeof window === "undefined") {
    return "/auth/callback?next=/reset-password";
  }

  return new URL("/auth/callback?next=/reset-password", window.location.origin).toString();
}

type ForgotPasswordFormProps = {
  message?: string;
  error?: string;
};

export default function ForgotPasswordForm({
  message,
  error,
}: ForgotPasswordFormProps) {
  const { client } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: getResetRedirect(),
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Password reset link sent.");
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <AuthStatusMessage message={message} error={error} />
      <div className="space-y-2">
        <label className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Account email
        </label>
        <Input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@studio.com"
        />
      </div>
      <Button
        type="submit"
        className="h-11 w-full bg-gradient-gold text-charcoal hover:opacity-95"
        disabled={loading}
      >
        {loading ? <Loader2 className="animate-spin" /> : null}
        Send reset link
      </Button>
      <p className="font-body text-xs text-muted-foreground">
        Return to{" "}
        <Link href="/admin" className="text-accent transition-colors hover:text-gold-dark">
          sign in
        </Link>
        .
      </p>
    </form>
  );
}
