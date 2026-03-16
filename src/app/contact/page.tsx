import type { Metadata } from "next";

import ContactPage from "@/views/Contact";
import { absoluteUrl } from "@/lib/site";
import { getSiteSettings } from "@/lib/site/server";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: "Contact",
    description: `Contact ${settings.siteName} to discuss residential, hospitality, retail, or workplace design-build projects.`,
    alternates: {
      canonical: absoluteUrl("/contact", settings.siteUrl),
    },
  };
}

export default function Page() {
  return <ContactPage />;
}
