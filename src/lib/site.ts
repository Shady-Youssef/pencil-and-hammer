import { env } from "@/lib/env";

const siteUrl = env.siteUrl.replace(/\/$/, "");

export const siteConfig = {
  name: "MBM Designs",
  title: "MBM Designs | Luxury Interior Design Studio",
  description:
    "MBM Designs creates high-end residential, hospitality, and commercial interiors with a refined, editorial aesthetic.",
  url: siteUrl,
  ogImage: `${siteUrl}/api/og`,
  email: "hello@mbmdesigns.com",
  phone: "+1 (555) 234-5678",
  address: {
    street: "123 Design Avenue",
    city: "New York",
    region: "NY",
    postalCode: "10001",
    country: "US",
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
  },
} as const;

export function absoluteUrl(path = "") {
  return `${siteConfig.url}${path}`;
}
