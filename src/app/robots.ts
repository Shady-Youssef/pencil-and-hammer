import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site";
import { getSiteSettings } from "@/lib/site/server";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/dashboard", "/login", "/signup"],
    },
    sitemap: absoluteUrl("/sitemap.xml", settings.siteUrl),
  };
}
