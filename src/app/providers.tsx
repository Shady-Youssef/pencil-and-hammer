"use client";

import type { ReactNode } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import AuthProvider from "@/components/auth/AuthProvider";
import SiteSettingsProvider from "@/components/site/SiteSettingsProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import CursorGlow from "@/components/CursorGlow";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import type { SiteSettings } from "@/lib/site";

export default function Providers({
  children,
  initialSiteSettings,
}: {
  children: ReactNode;
  initialSiteSettings: SiteSettings;
}) {
  return (
    <ThemeProvider>
      <SiteSettingsProvider initialSettings={initialSiteSettings}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <CursorGlow />
            <ScrollToTopButton />
            <SmoothScroll>{children}</SmoothScroll>
          </TooltipProvider>
        </AuthProvider>
      </SiteSettingsProvider>
    </ThemeProvider>
  );
}
