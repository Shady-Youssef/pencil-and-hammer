"use client";

import { createContext, useContext } from "react";

import {
  defaultSiteSettings,
  type SiteSettings,
} from "@/lib/site";

export type SiteSettingsContextValue = {
  settings: SiteSettings;
  setSettings: (settings: SiteSettings) => void;
};

export const SiteSettingsContext =
  createContext<SiteSettingsContextValue | null>(null);

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);

  if (!context) {
    return {
      settings: defaultSiteSettings,
      setSettings: () => undefined,
    };
  }

  return context;
}
