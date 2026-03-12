import { env } from "@/lib/env";

export const siteSettingsRecordId = 1;
export const siteAssetsBucket = "site-assets";
export const aboutStatIcons = ["award", "users", "clock", "globe", "sparkles", "home"] as const;

export type AboutStatIcon = (typeof aboutStatIcons)[number];

export type AboutStoryParagraph = {
  id: string;
  body: string;
};

export type AboutStat = {
  id: string;
  icon: AboutStatIcon;
  title: string;
  description: string;
};

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
  aboutHeroTitle: string;
  aboutHeroSubtitle: string;
  aboutHeroImageUrl: string;
  aboutHeroImageStoragePath: string | null;
  aboutStoryTitle: string;
  aboutStoryParagraphs: AboutStoryParagraph[];
  aboutPortraitUrl: string;
  aboutPortraitStoragePath: string | null;
  aboutPortraitAlt: string;
  aboutStats: AboutStat[];
  aboutPhilosophyTitle: string;
  aboutPhilosophyQuote: string;
  aboutPhilosophyAttribution: string;
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
  about_hero_title: string | null;
  about_hero_subtitle: string | null;
  about_hero_image_url: string | null;
  about_hero_image_storage_path: string | null;
  about_story_title: string | null;
  about_story_paragraphs: unknown;
  about_story_body_primary: string | null;
  about_story_body_secondary: string | null;
  about_portrait_url: string | null;
  about_portrait_storage_path: string | null;
  about_portrait_alt: string | null;
  about_stats: unknown;
  about_philosophy_title: string | null;
  about_philosophy_quote: string | null;
  about_philosophy_attribution: string | null;
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
  favicon_storage_path,
  about_hero_title,
  about_hero_subtitle,
  about_hero_image_url,
  about_hero_image_storage_path,
  about_story_title,
  about_story_paragraphs,
  about_story_body_primary,
  about_story_body_secondary,
  about_portrait_url,
  about_portrait_storage_path,
  about_portrait_alt,
  about_stats,
  about_philosophy_title,
  about_philosophy_quote,
  about_philosophy_attribution
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

function isAboutStatIcon(value: string): value is AboutStatIcon {
  return aboutStatIcons.includes(value as AboutStatIcon);
}

export const defaultAboutStats: AboutStat[] = [
  {
    id: "projects-completed",
    icon: "award",
    title: "150+",
    description: "Projects Completed",
  },
  {
    id: "team-members",
    icon: "users",
    title: "12",
    description: "Team Members",
  },
  {
    id: "years-experience",
    icon: "clock",
    title: "15",
    description: "Years Experience",
  },
  {
    id: "countries-served",
    icon: "globe",
    title: "8",
    description: "Countries Served",
  },
];

export const defaultAboutStoryParagraphs: AboutStoryParagraph[] = [
  {
    id: "about-story-1",
    body:
      "Founded in 2010, MBM Designs has grown from a boutique studio into one of New York's most sought-after interior design firms. We believe that exceptional design is born from the intersection of artistry, innovation, and deep understanding of how people live.",
  },
  {
    id: "about-story-2",
    body:
      "Every project we undertake is a collaborative journey. We listen, we dream, and we create spaces that are not only visually stunning but deeply personal - environments that enhance your daily life and stand the test of time.",
  },
];

function createStoryParagraphFallbacks(
  primary?: string | null,
  secondary?: string | null,
) {
  const paragraphs = [primary?.trim(), secondary?.trim()]
    .filter((entry): entry is string => Boolean(entry))
    .map((body, index) => ({
      id: `about-story-${index + 1}`,
      body,
    }));

  return paragraphs.length ? paragraphs : defaultAboutStoryParagraphs;
}

function normalizeAboutStoryParagraphs(
  value: unknown,
  primary?: string | null,
  secondary?: string | null,
) {
  if (!Array.isArray(value)) {
    return createStoryParagraphFallbacks(primary, secondary);
  }

  const paragraphs = value
    .map((entry, index) => {
      if (typeof entry === "string") {
        const body = entry.trim();

        if (!body) {
          return null;
        }

        return {
          id: `about-story-${index + 1}`,
          body,
        };
      }

      if (!entry || typeof entry !== "object") {
        return null;
      }

      const candidate = entry as Partial<AboutStoryParagraph>;
      const body = typeof candidate.body === "string" ? candidate.body.trim() : "";

      if (!body) {
        return null;
      }

      return {
        id:
          typeof candidate.id === "string" && candidate.id.trim()
            ? candidate.id.trim()
            : `about-story-${index + 1}`,
        body,
      };
    })
    .filter((entry): entry is AboutStoryParagraph => Boolean(entry));

  return paragraphs;
}

function normalizeAboutStats(value: unknown) {
  if (!Array.isArray(value)) {
    return defaultAboutStats;
  }

  const stats = value
    .map((entry, index) => {
      if (!entry || typeof entry !== "object") {
        return null;
      }

      const candidate = entry as Partial<AboutStat>;
      const rawCandidate = entry as Record<string, unknown>;
      const icon = typeof candidate.icon === "string" && isAboutStatIcon(candidate.icon)
        ? candidate.icon
        : defaultAboutStats[index % defaultAboutStats.length]?.icon ?? "award";
      const legacyValue =
        typeof rawCandidate.value === "string" ? rawCandidate.value.trim() : "";
      const legacyLabel =
        typeof rawCandidate.label === "string" ? rawCandidate.label.trim() : "";
      const titleText =
        typeof candidate.title === "string" ? candidate.title.trim() : legacyValue;
      const descriptionText =
        typeof candidate.description === "string"
          ? candidate.description.trim()
          : legacyLabel;

      if (!titleText && !descriptionText) {
        return null;
      }

      return {
        id:
          typeof candidate.id === "string" && candidate.id.trim()
            ? candidate.id.trim()
            : `about-stat-${index + 1}`,
        icon,
        title: titleText || defaultAboutStats[index % defaultAboutStats.length]?.title || "",
        description:
          descriptionText ||
          defaultAboutStats[index % defaultAboutStats.length]?.description ||
          "",
      };
    })
    .filter((entry): entry is AboutStat => Boolean(entry));

  return stats;
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
  aboutHeroTitle: "About Us",
  aboutHeroSubtitle: "The story behind the spaces",
  aboutHeroImageUrl: "",
  aboutHeroImageStoragePath: null,
  aboutStoryTitle: "Our Story",
  aboutStoryParagraphs: defaultAboutStoryParagraphs,
  aboutPortraitUrl: "",
  aboutPortraitStoragePath: null,
  aboutPortraitAlt: "MBM Designs portrait",
  aboutStats: defaultAboutStats,
  aboutPhilosophyTitle: "Our Philosophy",
  aboutPhilosophyQuote:
    '"Great design is not about following trends - it\'s about creating timeless spaces that resonate with the soul of those who inhabit them."',
  aboutPhilosophyAttribution: "Maria Bello, Founder",
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
    aboutHeroTitle:
      row?.about_hero_title?.trim() || defaultSiteSettings.aboutHeroTitle,
    aboutHeroSubtitle:
      row?.about_hero_subtitle?.trim() || defaultSiteSettings.aboutHeroSubtitle,
    aboutHeroImageUrl: row?.about_hero_image_url?.trim() || "",
    aboutHeroImageStoragePath: row?.about_hero_image_storage_path ?? null,
    aboutStoryTitle:
      row?.about_story_title?.trim() || defaultSiteSettings.aboutStoryTitle,
    aboutStoryParagraphs: normalizeAboutStoryParagraphs(
      row?.about_story_paragraphs,
      row?.about_story_body_primary,
      row?.about_story_body_secondary,
    ),
    aboutPortraitUrl: row?.about_portrait_url?.trim() || "",
    aboutPortraitStoragePath: row?.about_portrait_storage_path ?? null,
    aboutPortraitAlt:
      row?.about_portrait_alt?.trim() || defaultSiteSettings.aboutPortraitAlt,
    aboutStats: normalizeAboutStats(row?.about_stats),
    aboutPhilosophyTitle:
      row?.about_philosophy_title?.trim() ||
      defaultSiteSettings.aboutPhilosophyTitle,
    aboutPhilosophyQuote:
      row?.about_philosophy_quote?.trim() ||
      defaultSiteSettings.aboutPhilosophyQuote,
    aboutPhilosophyAttribution:
      row?.about_philosophy_attribution?.trim() ||
      defaultSiteSettings.aboutPhilosophyAttribution,
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
