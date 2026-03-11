import type { Metadata } from "next";

import ContactPage from "@/views/Contact";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} to book a consultation for residential, hospitality, or commercial interior design projects.`,
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
};

export default function Page() {
  return <ContactPage />;
}
