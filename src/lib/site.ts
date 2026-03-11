import { env } from "@/lib/env";

export const siteSettingsRecordId = 1;
export const siteAssetsBucket = "site-assets";

export type SiteSettings = {
  id: number;
  updatedAt: string | null;
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  contactEmail: string;
  contactPhone: string;
  addressLine1: string;
  addressLine2: string;
  addressCity: string;
  addressRegion: string;
  addressPostalCode: string;
  addressCountry: string;
  instagramUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  seoKeywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogKicker: string;
  ogTagline: string;
  logoUrl: string;
  logoStoragePath: string | null;
  faviconUrl: string;
  faviconStoragePath: string | null;
};

export type SiteSettingsRow = {
  id: number;
  updated_at: string | null;
  site_name: string | null;
  site_title: string | null;
  site_description: string | null;
  site_url: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  address_city: string | null;
  address_region: string | null;
  address_postal_code: string | null;
  address_country: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  linkedin_url: string | null;
  seo_keywords: string[] | null;
  og_title: string | null;
  og_description: string | null;
  og_kicker: string | null;
  og_tagline: string | null;
  logo_url: string | null;
  logo_storage_path: string | null;
  favicon_url: string | null;
  favicon_storage_path: string | null;
};

export const siteSettingsSelect = `
  id,
  updated_at,
  site_name,
  site_title,
  site_description,
  site_url,
  contact_email,
  contact_phone,
  address_line_1,
  address_line_2,
  address_city,
  address_region,
  address_postal_code,
  address_country,
  instagram_url,
  facebook_url,
  linkedin_url,
  seo_keywords,
  og_title,
  og_description,
  og_kicker,
  og_tagline,
  logo_url,
  logo_storage_path,
  favicon_url,
  favicon_storage_path
`;

function normalizeSiteUrl(value?: string | null) {
  const hostedCandidate = env.siteUrl;

  try {
    const hostedUrl = new URL(hostedCandidate);
    const hostedHost = hostedUrl.hostname.toLowerCase();
    const isHostedLocal =
      hostedHost === "localhost" ||
      hostedHost === "127.0.0.1" ||
      hostedHost === "0.0.0.0";

    if (process.env.VERCEL === "1" && !isHostedLocal) {
      return hostedUrl.toString().replace(/\/$/, "");
    }
  } catch {
    // Fall through to the stored/local candidate resolution below.
  }

  const candidate = value?.trim() || env.siteUrl;

  try {
    const normalizedCandidate = new URL(candidate);
    const normalizedEnvUrl = new URL(env.siteUrl);
    const candidateHost = normalizedCandidate.hostname.toLowerCase();
    const envHost = normalizedEnvUrl.hostname.toLowerCase();
    const isCandidateLocalhost =
      candidateHost === "localhost" ||
      candidateHost === "127.0.0.1" ||
      candidateHost === "0.0.0.0";
    const isEnvLocalhost =
      envHost === "localhost" ||
      envHost === "127.0.0.1" ||
      envHost === "0.0.0.0";

    if (isCandidateLocalhost && !isEnvLocalhost) {
      return normalizedEnvUrl.toString().replace(/\/$/, "");
    }

    return normalizedCandidate.toString().replace(/\/$/, "");
  } catch {
    return env.siteUrl.replace(/\/$/, "");
  }
}

function normalizeBrandAssetUrl(
  value: string | null | undefined,
  fallback: string,
  legacyPaths: string[],
) {
  const candidate = value?.trim();

  if (!candidate) {
    return fallback;
  }

  if (legacyPaths.includes(candidate)) {
    return fallback;
  }

  return candidate;
}

export const defaultSiteSettings: SiteSettings = {
  id: siteSettingsRecordId,
  updatedAt: null,
  siteName: "MBM Designs",
  siteTitle: "MBM Designs | Luxury Interior Design Studio",
  siteDescription:
    "MBM Designs creates high-end residential, hospitality, and commercial interiors with a refined, editorial aesthetic.",
  siteUrl: normalizeSiteUrl(env.siteUrl),
  contactEmail: "hello@mbmdesigns.com",
  contactPhone: "+1 (555) 234-5678",
  addressLine1: "123 Design Avenue",
  addressLine2: "",
  addressCity: "New York",
  addressRegion: "NY",
  addressPostalCode: "10001",
  addressCountry: "US",
  instagramUrl: "https://instagram.com",
  facebookUrl: "https://facebook.com",
  linkedinUrl: "https://linkedin.com",
  seoKeywords: [
    "luxury interior design",
    "interior design studio",
    "residential interior designer",
    "hospitality design",
    "commercial interiors",
    "New York interior design",
  ],
  ogTitle: "MBM Designs | Editorial Luxury Interiors",
  ogDescription:
    "High-end residential, hospitality, and commercial interior design with warmth, precision, and a refined editorial point of view.",
  ogKicker: "Interior Design Studio",
  ogTagline: "Luxury. Warmth. Precision.",
  logoUrl: "/MBM-logo.png",
  logoStoragePath: null,
  faviconUrl: "/MBM-logo.png",
  faviconStoragePath: null,
};

export function normalizeSiteSettings(row?: SiteSettingsRow | null): SiteSettings {
  return {
    id: row?.id ?? defaultSiteSettings.id,
    updatedAt: row?.updated_at ?? defaultSiteSettings.updatedAt,
    siteName: row?.site_name?.trim() || defaultSiteSettings.siteName,
    siteTitle: row?.site_title?.trim() || defaultSiteSettings.siteTitle,
    siteDescription:
      row?.site_description?.trim() || defaultSiteSettings.siteDescription,
    siteUrl: normalizeSiteUrl(row?.site_url),
    contactEmail:
      row?.contact_email?.trim() || defaultSiteSettings.contactEmail,
    contactPhone:
      row?.contact_phone?.trim() || defaultSiteSettings.contactPhone,
    addressLine1:
      row?.address_line_1?.trim() || defaultSiteSettings.addressLine1,
    addressLine2: row?.address_line_2?.trim() || "",
    addressCity:
      row?.address_city?.trim() || defaultSiteSettings.addressCity,
    addressRegion:
      row?.address_region?.trim() || defaultSiteSettings.addressRegion,
    addressPostalCode:
      row?.address_postal_code?.trim() ||
      defaultSiteSettings.addressPostalCode,
    addressCountry:
      row?.address_country?.trim() || defaultSiteSettings.addressCountry,
    instagramUrl:
      row?.instagram_url?.trim() || defaultSiteSettings.instagramUrl,
    facebookUrl:
      row?.facebook_url?.trim() || defaultSiteSettings.facebookUrl,
    linkedinUrl:
      row?.linkedin_url?.trim() || defaultSiteSettings.linkedinUrl,
    seoKeywords:
      row?.seo_keywords?.filter(Boolean) ?? defaultSiteSettings.seoKeywords,
    ogTitle: row?.og_title?.trim() || defaultSiteSettings.ogTitle,
    ogDescription:
      row?.og_description?.trim() || defaultSiteSettings.ogDescription,
    ogKicker: row?.og_kicker?.trim() || defaultSiteSettings.ogKicker,
    ogTagline: row?.og_tagline?.trim() || defaultSiteSettings.ogTagline,
    logoUrl: normalizeBrandAssetUrl(row?.logo_url, defaultSiteSettings.logoUrl, [
      "/MBM-logo.webp",
      "/MBM-logo.svg",
      "/icon.svg",
    ]),
    logoStoragePath: row?.logo_storage_path ?? null,
    faviconUrl: normalizeBrandAssetUrl(
      row?.favicon_url,
      defaultSiteSettings.faviconUrl,
      ["/icon.svg", "/MBM-logo.webp", "/MBM-logo.svg"],
    ),
    faviconStoragePath: row?.favicon_storage_path ?? null,
  };
}

export function absoluteUrl(path = "", baseUrl = defaultSiteSettings.siteUrl) {
  return `${baseUrl.replace(/\/$/, "")}${path}`;
}

export function splitKeywords(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function joinKeywords(keywords: string[]) {
  return keywords.join(", ");
}

export function getAddressLines(settings: SiteSettings) {
  const lines = [settings.addressLine1];

  if (settings.addressLine2) {
    lines.push(settings.addressLine2);
  }

  lines.push(
    [settings.addressCity, settings.addressRegion, settings.addressPostalCode]
      .filter(Boolean)
      .join(", "),
  );

  return lines.filter(Boolean);
}

export function sanitizeFileName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
