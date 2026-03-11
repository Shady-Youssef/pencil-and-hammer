import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Access Provisioning",
  description: "MBM Designs account access is provisioned internally by administrators.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: absoluteUrl("/admin"),
  },
};

export default function Page() {
  redirect("/admin?message=Account%20access%20is%20issued%20by%20administrators.");
}
