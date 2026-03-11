"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { SiteSettings } from "@/lib/site";

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

  useEffect(() => {
    if (!settings.faviconUrl) {
      return;
    }

    upsertLink("icon", settings.faviconUrl);
    upsertLink("shortcut icon", settings.faviconUrl);
    upsertLink("apple-touch-icon", settings.faviconUrl);
  }, [settings.faviconUrl]);

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
