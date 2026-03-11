import Link from "next/link";
import type { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AuthShellProps = {
  badge: string;
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
};

export default function AuthShell({
  badge,
  title,
  description,
  footer,
  children,
}: AuthShellProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(211,166,75,0.08),transparent_32%),linear-gradient(180deg,#090705_0%,#110c07_48%,#0b0907_100%)] px-6 py-28 text-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <section className="max-w-2xl">
          <p className="mb-5 font-body text-xs uppercase tracking-[0.35em] text-gold-light">
            {badge}
          </p>
          <h1 className="font-display text-5xl font-light leading-tight text-cream md:text-6xl">
            Private access for
            <span className="text-gradient-gold"> MBM Designs</span>
          </h1>
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-warm-gray">
            Use your studio account to access the dashboard, client workflow,
            and project communication in one place.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 font-body text-sm text-warm-gray">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Supabase Auth
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Secure cookie sessions
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Password recovery
            </span>
          </div>
          <Link
            href="/"
            className="mt-10 inline-flex font-body text-sm tracking-[0.22em] uppercase text-cream/70 transition-colors hover:text-gold-light"
          >
            Back to website
          </Link>
        </section>

        <Card className="border-white/10 bg-background/90 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <CardHeader className="space-y-3">
            <CardTitle className="font-display text-3xl font-light">
              {title}
            </CardTitle>
            <CardDescription className="font-body text-sm leading-relaxed">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {children}
            <div className="border-t border-border/70 pt-5">{footer}</div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
