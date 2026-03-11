import type { Metadata } from "next";

import AboutPage from "@/views/About";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the MBM Designs team and learn how the studio approaches timeless, luxurious interior design.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
};

export default function Page() {
  return <AboutPage />;
}
