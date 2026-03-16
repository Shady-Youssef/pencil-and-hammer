import type { Metadata } from "next";

import HomePage from "@/views/Index";
import { getFeaturedProjects } from "@/lib/projects/server";
import { absoluteUrl } from "@/lib/site";
import { getSiteSettings } from "@/lib/site/server";
import { getPublishedTestimonials } from "@/lib/testimonials/server";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: settings.siteName,
    description: settings.siteDescription,
    alternates: {
      canonical: absoluteUrl("/", settings.siteUrl),
    },
  };
}

export default async function Page() {
  const [featuredProjects, testimonials, settings] = await Promise.all([
    getFeaturedProjects(),
    getPublishedTestimonials(),
    getSiteSettings(),
  ]);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: settings.siteName,
    description: settings.siteDescription,
    url: settings.siteUrl,
    email: settings.contactEmail,
    telephone: settings.contactPhone,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.addressLine1,
      addressLocality: settings.addressCity,
      addressRegion: settings.addressRegion,
      postalCode: settings.addressPostalCode,
      addressCountry: settings.addressCountry,
    },
    areaServed: settings.addressCity,
    sameAs: [
      settings.instagramUrl,
      settings.facebookUrl,
      settings.linkedinUrl,
    ].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePage featuredProjects={featuredProjects} testimonials={testimonials} />
    </>
  );
}
