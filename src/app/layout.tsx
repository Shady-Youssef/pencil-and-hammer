import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";

import Providers from "@/app/providers";
import { absoluteUrl, siteConfig } from "@/lib/site";

import "../index.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "luxury interior design",
    "interior design studio",
    "residential interior designer",
    "hospitality design",
    "commercial interiors",
    "New York interior design",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl("/api/og"),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl("/api/og")],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-boot" strategy="beforeInteractive">
          {`(() => {
            const storageKey = "mbm-theme";
            const root = document.documentElement;
            const storedTheme = localStorage.getItem(storageKey);
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            const theme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : systemTheme;
            root.classList.remove("light", "dark");
            root.classList.add(theme);
            root.style.colorScheme = theme;
          })();`}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
