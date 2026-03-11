import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admin Access",
  description:
    "Private MBM Designs admin workspace.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: absoluteUrl("/admin"),
  },
};

export default async function Page() {
  redirect("/admin");
}
