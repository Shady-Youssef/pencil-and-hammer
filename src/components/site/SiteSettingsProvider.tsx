"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  getEffectiveFaviconUrl,
  getThemeCssVariables,
  type SiteSettings,
} from "@/lib/site";

import { SiteSettingsContext } from "@/components/site/site-settings-context";

function upsertLink(rel: string, href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }

  link.href = href;
}

export default function SiteSettingsProvider({
  initialSettings,
  children,
}: {
  initialSettings: SiteSettings;
  children: ReactNode;
}) {
  const [settings, setSettings] = useState(initialSettings);
  const faviconUrl = getEffectiveFaviconUrl(settings);

  useEffect(() => {
    if (!faviconUrl) {
      return;
    }

    upsertLink("icon", faviconUrl);
    upsertLink("shortcut icon", faviconUrl);
    upsertLink("apple-touch-icon", faviconUrl);
  }, [faviconUrl]);

  useEffect(() => {
    const root = document.documentElement;
    const cssVariables = getThemeCssVariables(settings);

    Object.entries(cssVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [settings]);

  const value = useMemo(
    () => ({
      settings,
      setSettings,
    }),
    [settings],
  );

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}
