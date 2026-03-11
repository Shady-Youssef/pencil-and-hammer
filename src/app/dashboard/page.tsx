import type { Metadata } from "next";

import DashboardPage from "@/views/Dashboard";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Preview the MBM Designs studio dashboard interface for projects, analytics, and client activity.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: absoluteUrl("/dashboard"),
  },
};

export default function Page() {
  return <DashboardPage />;
}
