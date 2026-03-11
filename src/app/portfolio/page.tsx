import type { Metadata } from "next";

import PortfolioPage from "@/views/Portfolio";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse a curated portfolio of MBM Designs interiors across residential, commercial, and hospitality spaces.",
  alternates: {
    canonical: absoluteUrl("/portfolio"),
  },
};

export default function Page() {
  return <PortfolioPage />;
}
