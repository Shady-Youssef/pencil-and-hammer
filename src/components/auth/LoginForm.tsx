"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import AuthStatusMessage from "@/components/auth/AuthStatusMessage";
import { useAuth } from "@/components/auth/auth-context";
import { useSiteSettings } from "@/components/site/site-settings-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type LoginFormProps = {
  nextPath?: string;
  message?: string;
  error?: string;
};

export default function LoginForm({
  nextPath = "/admin",
  message,
  error,
}: LoginFormProps) {
  const router = useRouter();
  const { client } = useAuth();
  const { settings } = useSiteSettings();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const next = nextPath as Route;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(`Welcome back to ${settings.siteName}.`);
    router.push(next);
    router.refresh();
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <AuthStatusMessage message={message} error={error} />
      <div className="space-y-2">
        <label className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Email
        </label>
        <Input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@pencilandhammer.com"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <label className="font-body text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="font-body text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:text-gold-dark"
          >
            Forgot password
          </Link>
        </div>
        <Input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <Button
        type="submit"
        className="h-11 w-full bg-gradient-gold text-charcoal hover:opacity-95"
        disabled={loading}
      >
        {loading ? <Loader2 className="animate-spin" /> : null}
        Sign in
      </Button>
      <p className="font-body text-xs leading-relaxed text-muted-foreground">
        Access is provisioned internally by Pencil And Hammer administrators.
      </p>
    </form>
  );
}
