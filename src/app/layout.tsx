import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";

import Providers from "@/app/providers";
import { absoluteUrl, getEffectiveFaviconUrl } from "@/lib/site";
import { getSiteSettings } from "@/lib/site/server";

import "../index.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const faviconUrl = getEffectiveFaviconUrl(settings);
  const ogVersion = settings.updatedAt
    ? encodeURIComponent(settings.updatedAt)
    : "default";
  const ogImageUrl = absoluteUrl(`/api/og?v=${ogVersion}`, settings.siteUrl);

  return {
    metadataBase: new URL(settings.siteUrl),
    title: {
      default: settings.siteTitle,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.siteDescription,
    keywords: settings.seoKeywords,
    alternates: {
      canonical: absoluteUrl("/", settings.siteUrl),
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: settings.siteUrl,
      siteName: settings.siteName,
      title: settings.ogTitle,
      description: settings.ogDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${settings.siteName} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.ogTitle,
      description: settings.ogDescription,
      images: [ogImageUrl],
    },
    icons: {
      icon: [{ url: faviconUrl }],
      shortcut: [{ url: faviconUrl }],
      apple: [{ url: faviconUrl }],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const siteSettings = await getSiteSettings();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-boot" strategy="beforeInteractive">
          {`(() => {
            const storageKey = "pencil-hammer-theme";
            const root = document.documentElement;
            const storedTheme = localStorage.getItem(storageKey);
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            const theme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : systemTheme;
            root.classList.remove("light", "dark");
            root.classList.add(theme);
            root.style.colorScheme = theme;
          })();`}
        </Script>
        <Providers initialSiteSettings={siteSettings}>{children}</Providers>
      </body>
    </html>
  );
}
