import type { Metadata } from "next";

import AboutPage from "@/views/About";
import { absoluteUrl } from "@/lib/site";
import { getSiteSettings } from "@/lib/site/server";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: "About",
    description:
      "Learn how the studio approaches timeless, luxurious interior design with a refined editorial point of view.",
    alternates: {
      canonical: absoluteUrl("/about", settings.siteUrl),
    },
  };
}

export default function Page() {
  return <AboutPage />;
}
