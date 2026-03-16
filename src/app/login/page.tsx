import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admin Access",
  description: "Private Pencil And Hammer admin sign-in.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: absoluteUrl("/admin"),
  },
};

export default function Page() {
  redirect("/admin");
}
