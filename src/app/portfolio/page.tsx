import type { Metadata } from "next";

import PortfolioPage from "@/views/Portfolio";
import { getPublishedProjects } from "@/lib/projects/server";
import { absoluteUrl } from "@/lib/site";
import { getSiteSettings } from "@/lib/site/server";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: "Portfolio",
    description: `Browse a curated portfolio of ${settings.siteName} interiors across residential, commercial, and hospitality spaces.`,
    alternates: {
      canonical: absoluteUrl("/portfolio", settings.siteUrl),
    },
  };
}

export default async function Page() {
  const projects = await getPublishedProjects();

  return <PortfolioPage projects={projects} />;
}
