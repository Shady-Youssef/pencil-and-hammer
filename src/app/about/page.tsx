import type { Metadata } from "next";

import AboutPage from "@/views/About";
import { absoluteUrl } from "@/lib/site";
import { getSiteSettings } from "@/lib/site/server";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: "About",
    description:
      "Learn how Pencil And Hammer combines concept design, technical coordination, and execution into one design-build workflow.",
    alternates: {
      canonical: absoluteUrl("/about", settings.siteUrl),
    },
  };
}

export default function Page() {
  return <AboutPage />;
}
