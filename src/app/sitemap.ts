import type { MetadataRoute } from "next";

import { getPublishedProjects } from "@/lib/projects/server";
import { absoluteUrl } from "@/lib/site";
import { getSiteSettings } from "@/lib/site/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, settings] = await Promise.all([
    getPublishedProjects(),
    getSiteSettings(),
  ]);

  return [
    {
      url: absoluteUrl("/", settings.siteUrl),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/about", settings.siteUrl),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/portfolio", settings.siteUrl),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/contact", settings.siteUrl),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...projects.map((project) => ({
      url: absoluteUrl(`/portfolio/${project.slug}`, settings.siteUrl),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
