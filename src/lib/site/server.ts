import { createClient } from "@supabase/supabase-js";
import { unstable_noStore as noStore } from "next/cache";

import { env } from "@/lib/env";
import {
  defaultSiteSettings,
  normalizeSiteSettings,
  siteSettingsRecordId,
  siteSettingsSelect,
  type SiteSettings,
  type SiteSettingsRow,
} from "@/lib/site";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const publicSupabaseClient = createClient(
  env.supabaseUrl,
  env.supabasePublishableKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

export async function getSiteSettingsResult(): Promise<{
  settings: SiteSettings;
  error: string | null;
}> {
  noStore();

  try {
    const serverClient = await createSupabaseServerClient();
    const {
      data: { user },
    } = await serverClient.auth.getUser();

    if (user) {
      const { data, error } = await serverClient
        .from("site_settings")
        .select(siteSettingsSelect)
        .eq("id", siteSettingsRecordId)
        .maybeSingle();

      if (!error) {
        return {
          settings: normalizeSiteSettings(data as SiteSettingsRow | null),
          error: null,
        };
      }
    }

    const { data, error } = await publicSupabaseClient
      .from("site_settings")
      .select(siteSettingsSelect)
      .eq("id", siteSettingsRecordId)
      .maybeSingle();

    if (error) {
      return {
        settings: defaultSiteSettings,
        error: error.message,
      };
    }

    return {
      settings: normalizeSiteSettings(data as SiteSettingsRow | null),
      error: null,
    };
  } catch (error) {
    return {
      settings: defaultSiteSettings,
      error:
        error instanceof Error
          ? error.message
          : "Unable to load site settings.",
    };
  }
}

export async function getSiteSettings() {
  const { settings } = await getSiteSettingsResult();
  return settings;
}
