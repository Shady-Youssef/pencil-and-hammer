import { env } from "@/lib/env";

export const siteSettingsRecordId = 1;
export const siteAssetsBucket = "site-assets";
export const aboutStatIcons = ["award", "users", "clock", "globe", "sparkles", "home"] as const;
export const homeServiceIcons = ["paintbrush", "ruler", "lightbulb", "sofa"] as const;

export type AboutStatIcon = (typeof aboutStatIcons)[number];
export type HomeServiceIcon = (typeof homeServiceIcons)[number];

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

export type HomeStoryMetric = {
  id: string;
  value: string;
  label: string;
};

export type HomeServiceHighlight = {
  id: string;
  label: string;
  text: string;
};

export type HomeService = {
  id: string;
  icon: HomeServiceIcon;
  title: string;
  description: string;
  note: string;
  deliverables: string[];
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
  lightBackgroundHex: string;
  lightForegroundHex: string;
  lightSurfaceHex: string;
  lightMutedHex: string;
  lightBorderHex: string;
  lightAccentHex: string;
  darkBackgroundHex: string;
  darkForegroundHex: string;
  darkSurfaceHex: string;
  darkMutedHex: string;
  darkBorderHex: string;
  darkAccentHex: string;
  aboutHeroTitle: string;
  aboutHeroSubtitle: string;
  aboutHeroImageUrl: string;
  aboutHeroImageStoragePath: string | null;
  homeHeroEyebrow: string;
  homeHeroTitleLineOne: string;
  homeHeroTitleLineTwo: string;
  homeHeroBody: string;
  homeHeroImageUrl: string;
  homeHeroImageStoragePath: string | null;
  homeHeroImageAlt: string;
  homeHeroPrimaryCtaLabel: string;
  homeHeroPrimaryCtaHref: string;
  homeHeroSecondaryCtaLabel: string;
  homeHeroSecondaryCtaHref: string;
  homeHeroScrollLabel: string;
  homeStoryEyebrow: string;
  homeStoryTitle: string;
  homeStoryParagraphs: AboutStoryParagraph[];
  homeStoryImageUrl: string;
  homeStoryImageStoragePath: string | null;
  homeStoryImageAlt: string;
  homeStoryMetrics: HomeStoryMetric[];
  homeStoryPrimaryCtaLabel: string;
  homeStoryPrimaryCtaHref: string;
  homeStorySecondaryCtaLabel: string;
  homeStorySecondaryCtaHref: string;
  homeServicesEyebrow: string;
  homeServicesTitle: string;
  homeServicesBody: string;
  homeServicesHighlights: HomeServiceHighlight[];
  homeServices: HomeService[];
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
  light_background_hex: string | null;
  light_foreground_hex: string | null;
  light_surface_hex: string | null;
  light_muted_hex: string | null;
  light_border_hex: string | null;
  light_accent_hex: string | null;
  dark_background_hex: string | null;
  dark_foreground_hex: string | null;
  dark_surface_hex: string | null;
  dark_muted_hex: string | null;
  dark_border_hex: string | null;
  dark_accent_hex: string | null;
  about_hero_title: string | null;
  about_hero_subtitle: string | null;
  about_hero_image_url: string | null;
  about_hero_image_storage_path: string | null;
  home_hero_eyebrow: string | null;
  home_hero_title_line_one: string | null;
  home_hero_title_line_two: string | null;
  home_hero_body: string | null;
  home_hero_image_url: string | null;
  home_hero_image_storage_path: string | null;
  home_hero_image_alt: string | null;
  home_hero_primary_cta_label: string | null;
  home_hero_primary_cta_href: string | null;
  home_hero_secondary_cta_label: string | null;
  home_hero_secondary_cta_href: string | null;
  home_hero_scroll_label: string | null;
  home_story_eyebrow: string | null;
  home_story_title: string | null;
  home_story_paragraphs: unknown;
  home_story_image_url: string | null;
  home_story_image_storage_path: string | null;
  home_story_image_alt: string | null;
  home_story_metrics: unknown;
  home_story_primary_cta_label: string | null;
  home_story_primary_cta_href: string | null;
  home_story_secondary_cta_label: string | null;
  home_story_secondary_cta_href: string | null;
  home_services_eyebrow: string | null;
  home_services_title: string | null;
  home_services_body: string | null;
  home_services_highlights: unknown;
  home_services: unknown;
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
  light_background_hex,
  light_foreground_hex,
  light_surface_hex,
  light_muted_hex,
  light_border_hex,
  light_accent_hex,
  dark_background_hex,
  dark_foreground_hex,
  dark_surface_hex,
  dark_muted_hex,
  dark_border_hex,
  dark_accent_hex,
  about_hero_title,
  about_hero_subtitle,
  about_hero_image_url,
  about_hero_image_storage_path,
  home_hero_eyebrow,
  home_hero_title_line_one,
  home_hero_title_line_two,
  home_hero_body,
  home_hero_image_url,
  home_hero_image_storage_path,
  home_hero_image_alt,
  home_hero_primary_cta_label,
  home_hero_primary_cta_href,
  home_hero_secondary_cta_label,
  home_hero_secondary_cta_href,
  home_hero_scroll_label,
  home_story_eyebrow,
  home_story_title,
  home_story_paragraphs,
  home_story_image_url,
  home_story_image_storage_path,
  home_story_image_alt,
  home_story_metrics,
  home_story_primary_cta_label,
  home_story_primary_cta_href,
  home_story_secondary_cta_label,
  home_story_secondary_cta_href,
  home_services_eyebrow,
  home_services_title,
  home_services_body,
  home_services_highlights,
  home_services,
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

function normalizeHexColor(value: string | null | undefined, fallback: string) {
  const candidate = value?.trim();

  if (!candidate) {
    return fallback;
  }

  const normalized = candidate.startsWith("#") ? candidate : `#${candidate}`;

  if (!/^#[0-9a-fA-F]{6}$/.test(normalized)) {
    return fallback;
  }

  return normalized.toLowerCase();
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  return `#${[r, g, b]
    .map((channel) => Math.max(0, Math.min(255, Math.round(channel))).toString(16).padStart(2, "0"))
    .join("")}`;
}

function mixHexColors(fromHex: string, toHex: string, weight: number) {
  const from = hexToRgb(fromHex);
  const to = hexToRgb(toHex);

  return rgbToHex({
    r: from.r + (to.r - from.r) * weight,
    g: from.g + (to.g - from.g) * weight,
    b: from.b + (to.b - from.b) * weight,
  });
}

function getContrastHex(backgroundHex: string) {
  const { r, g, b } = hexToRgb(backgroundHex);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  return luminance > 0.56 ? "#0f0f0f" : "#f5f5f5";
}

export function hexToHslChannels(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  const lightness = (max + min) / 2;

  let hue = 0;
  let saturation = 0;

  if (delta !== 0) {
    saturation = delta / (1 - Math.abs(2 * lightness - 1));

    switch (max) {
      case red:
        hue = ((green - blue) / delta) % 6;
        break;
      case green:
        hue = (blue - red) / delta + 2;
        break;
      default:
        hue = (red - green) / delta + 4;
        break;
    }
  }

  const normalizedHue = Math.round((hue * 60 + 360) % 360);
  const normalizedSaturation = Math.round(saturation * 1000) / 10;
  const normalizedLightness = Math.round(lightness * 1000) / 10;

  return `${normalizedHue} ${normalizedSaturation}% ${normalizedLightness}%`;
}

export function getThemeCssVariables(
  settings: Pick<
    SiteSettings,
    | "lightBackgroundHex"
    | "lightForegroundHex"
    | "lightSurfaceHex"
    | "lightMutedHex"
    | "lightBorderHex"
    | "lightAccentHex"
    | "darkBackgroundHex"
    | "darkForegroundHex"
    | "darkSurfaceHex"
    | "darkMutedHex"
    | "darkBorderHex"
    | "darkAccentHex"
  >,
) {
  const lightMutedForeground = mixHexColors(settings.lightForegroundHex, settings.lightBackgroundHex, 0.56);
  const darkMutedForeground = mixHexColors(settings.darkForegroundHex, settings.darkBackgroundHex, 0.58);
  const lightAccentForeground = getContrastHex(settings.lightAccentHex);
  const darkAccentForeground = getContrastHex(settings.darkAccentHex);

  return {
    "--theme-light-background": hexToHslChannels(settings.lightBackgroundHex),
    "--theme-light-foreground": hexToHslChannels(settings.lightForegroundHex),
    "--theme-light-surface": hexToHslChannels(settings.lightSurfaceHex),
    "--theme-light-muted": hexToHslChannels(settings.lightMutedHex),
    "--theme-light-border": hexToHslChannels(settings.lightBorderHex),
    "--theme-light-accent": hexToHslChannels(settings.lightAccentHex),
    "--theme-light-muted-foreground": hexToHslChannels(lightMutedForeground),
    "--theme-light-accent-foreground": hexToHslChannels(lightAccentForeground),
    "--theme-dark-background": hexToHslChannels(settings.darkBackgroundHex),
    "--theme-dark-foreground": hexToHslChannels(settings.darkForegroundHex),
    "--theme-dark-surface": hexToHslChannels(settings.darkSurfaceHex),
    "--theme-dark-muted": hexToHslChannels(settings.darkMutedHex),
    "--theme-dark-border": hexToHslChannels(settings.darkBorderHex),
    "--theme-dark-accent": hexToHslChannels(settings.darkAccentHex),
    "--theme-dark-muted-foreground": hexToHslChannels(darkMutedForeground),
    "--theme-dark-accent-foreground": hexToHslChannels(darkAccentForeground),
  } satisfies Record<string, string>;
}

export function getEffectiveFaviconUrl({
  faviconUrl,
  faviconStoragePath,
  logoUrl,
  logoStoragePath,
}: Pick<SiteSettings, "faviconUrl" | "faviconStoragePath" | "logoUrl" | "logoStoragePath">) {
  const normalizedFaviconUrl = faviconUrl?.trim() || defaultSiteSettings.faviconUrl;
  const usesSameUploadedAsset =
    (faviconStoragePath && logoStoragePath && faviconStoragePath === logoStoragePath) ||
    normalizedFaviconUrl === logoUrl;

  if (usesSameUploadedAsset) {
    return defaultSiteSettings.faviconUrl;
  }

  return normalizedFaviconUrl;
}

function isAboutStatIcon(value: string): value is AboutStatIcon {
  return aboutStatIcons.includes(value as AboutStatIcon);
}

function isHomeServiceIcon(value: string): value is HomeServiceIcon {
  return homeServiceIcons.includes(value as HomeServiceIcon);
}

export const defaultAboutStats: AboutStat[] = [
  {
    id: "projects-completed",
    icon: "award",
    title: "84",
    description: "Projects Delivered",
  },
  {
    id: "team-members",
    icon: "users",
    title: "11",
    description: "Design + Site Specialists",
  },
  {
    id: "years-experience",
    icon: "clock",
    title: "9",
    description: "Cities Across MENA",
  },
  {
    id: "countries-served",
    icon: "globe",
    title: "96%",
    description: "Repeat And Referral Work",
  },
];

export const defaultAboutStoryParagraphs: AboutStoryParagraph[] = [
  {
    id: "about-story-1",
    body:
      "Pencil And Hammer was built as a design-build practice for clients who need clarity from the first brief to the final handover. We combine concept design, technical coordination, procurement guidance, and on-site execution into one disciplined workflow.",
  },
  {
    id: "about-story-2",
    body:
      "Our work is intentionally balanced: strong ideas on paper, practical decisions in the field, and interiors that perform long after launch. The result is a calmer process for clients and spaces that feel resolved rather than decorated.",
  },
];

export const defaultHomeStoryParagraphs: AboutStoryParagraph[] = [
  {
    id: "home-story-1",
    body:
      "Pencil And Hammer was built for clients who want one team thinking clearly from concept through delivery. We connect atmosphere, planning, technical coordination, and procurement into one disciplined process.",
  },
  {
    id: "home-story-2",
    body:
      "That structure creates interiors that feel calm and resolved because the design ambition and the practical site decisions are developed together, not patched in later.",
  },
];

export const defaultHomeStoryMetrics: HomeStoryMetric[] = [
  {
    id: "home-story-metric-1",
    value: "84",
    label: "Projects Delivered",
  },
  {
    id: "home-story-metric-2",
    value: "11",
    label: "Design + Site Specialists",
  },
  {
    id: "home-story-metric-3",
    value: "96%",
    label: "Repeat And Referral Work",
  },
];

export const defaultHomeServiceHighlights: HomeServiceHighlight[] = [
  {
    id: "home-services-highlight-1",
    label: "Working Model",
    text: "Design decisions are handled in sequence, so planning, mood, detailing, and procurement reinforce one another.",
  },
  {
    id: "home-services-highlight-2",
    label: "Project Result",
    text: "The final interior feels more resolved because the practical logic is addressed early rather than patched in later.",
  },
];

export const defaultHomeServices: HomeService[] = [
  {
    id: "home-service-1",
    icon: "paintbrush",
    title: "Interior Design",
    description:
      "Concept direction, material thinking, and spatial language shaped for real project conditions.",
    note: "From concept boards to coordinated design intent.",
    deliverables: ["Concept narrative", "Material direction", "Visual language"],
  },
  {
    id: "home-service-2",
    icon: "ruler",
    title: "Space Planning",
    description:
      "Layouts are resolved for movement, visibility, furniture logic, and everyday use.",
    note: "Flow, zoning, and operational clarity.",
    deliverables: ["Room adjacencies", "Furniture layouts", "Circulation planning"],
  },
  {
    id: "home-service-3",
    icon: "lightbulb",
    title: "Lighting Strategy",
    description:
      "Layered lighting schemes that define mood while supporting technical and functional needs.",
    note: "Ambient, accent, and task lighting in one system.",
    deliverables: ["Fixture direction", "Layered scenes", "Mood and function"],
  },
  {
    id: "home-service-4",
    icon: "sofa",
    title: "Furniture + Styling",
    description:
      "Curated selections, custom pieces, and finishing layers that complete the atmosphere.",
    note: "Procurement-minded recommendations with a cohesive final read.",
    deliverables: ["Furniture curation", "Custom pieces", "Final styling"],
  },
];

function createStoryParagraphFallbacks(
  prefix: string,
  defaults: AboutStoryParagraph[],
  primary?: string | null,
  secondary?: string | null,
) {
  const paragraphs = [primary?.trim(), secondary?.trim()]
    .filter((entry): entry is string => Boolean(entry))
    .map((body, index) => ({
      id: `${prefix}-${index + 1}`,
      body,
    }));

  return paragraphs.length ? paragraphs : defaults;
}

function normalizeStoryParagraphs(
  value: unknown,
  defaults: AboutStoryParagraph[],
  prefix: string,
  primary?: string | null,
  secondary?: string | null,
) {
  if (!Array.isArray(value)) {
    return createStoryParagraphFallbacks(prefix, defaults, primary, secondary);
  }

  const paragraphs = value
    .map((entry, index) => {
      if (typeof entry === "string") {
        const body = entry.trim();

        if (!body) {
          return null;
        }

        return {
          id: `${prefix}-${index + 1}`,
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
            : `${prefix}-${index + 1}`,
        body,
      };
    })
    .filter((entry): entry is AboutStoryParagraph => Boolean(entry));

  return paragraphs;
}

function normalizeAboutStoryParagraphs(
  value: unknown,
  primary?: string | null,
  secondary?: string | null,
) {
  return normalizeStoryParagraphs(
    value,
    defaultAboutStoryParagraphs,
    "about-story",
    primary,
    secondary,
  );
}

function normalizeHomeStoryParagraphs(value: unknown) {
  return normalizeStoryParagraphs(
    value,
    defaultHomeStoryParagraphs,
    "home-story",
  );
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

function normalizeHomeStoryMetrics(value: unknown) {
  if (!Array.isArray(value)) {
    return defaultHomeStoryMetrics;
  }

  return value
    .map((entry, index) => {
      if (!entry || typeof entry !== "object") {
        return null;
      }

      const candidate = entry as Partial<HomeStoryMetric>;
      const rawCandidate = entry as Record<string, unknown>;
      const legacyValue =
        typeof rawCandidate.title === "string" ? rawCandidate.title.trim() : "";
      const legacyLabel =
        typeof rawCandidate.description === "string" ? rawCandidate.description.trim() : "";
      const valueText =
        typeof candidate.value === "string" ? candidate.value.trim() : legacyValue;
      const labelText =
        typeof candidate.label === "string" ? candidate.label.trim() : legacyLabel;

      if (!valueText && !labelText) {
        return null;
      }

      return {
        id:
          typeof candidate.id === "string" && candidate.id.trim()
            ? candidate.id.trim()
            : `home-story-metric-${index + 1}`,
        value: valueText || defaultHomeStoryMetrics[index % defaultHomeStoryMetrics.length]?.value || "",
        label: labelText || defaultHomeStoryMetrics[index % defaultHomeStoryMetrics.length]?.label || "",
      };
    })
    .filter((entry): entry is HomeStoryMetric => Boolean(entry));
}

function normalizeHomeServiceHighlights(value: unknown) {
  if (!Array.isArray(value)) {
    return defaultHomeServiceHighlights;
  }

  const highlights = value
    .map((entry, index) => {
      if (!entry || typeof entry !== "object") {
        return null;
      }

      const candidate = entry as Partial<HomeServiceHighlight>;
      const label = typeof candidate.label === "string" ? candidate.label.trim() : "";
      const text = typeof candidate.text === "string" ? candidate.text.trim() : "";

      if (!label && !text) {
        return null;
      }

      return {
        id:
          typeof candidate.id === "string" && candidate.id.trim()
            ? candidate.id.trim()
            : `home-services-highlight-${index + 1}`,
        label: label || defaultHomeServiceHighlights[index % defaultHomeServiceHighlights.length]?.label || "",
        text: text || defaultHomeServiceHighlights[index % defaultHomeServiceHighlights.length]?.text || "",
      };
    })
    .filter((entry): entry is HomeServiceHighlight => Boolean(entry));

  return highlights;
}

function normalizeHomeServices(value: unknown) {
  if (!Array.isArray(value)) {
    return defaultHomeServices;
  }

  const services = value
    .map((entry, index) => {
      if (!entry || typeof entry !== "object") {
        return null;
      }

      const candidate = entry as Partial<HomeService>;
      const rawCandidate = entry as Record<string, unknown>;
      const icon =
        typeof candidate.icon === "string" && isHomeServiceIcon(candidate.icon)
          ? candidate.icon
          : defaultHomeServices[index % defaultHomeServices.length]?.icon ?? "paintbrush";
      const deliverables = Array.isArray(rawCandidate.deliverables)
        ? rawCandidate.deliverables
            .map((item) => (typeof item === "string" ? item.trim() : ""))
            .filter(Boolean)
        : [];
      const title = typeof candidate.title === "string" ? candidate.title.trim() : "";
      const description = typeof candidate.description === "string" ? candidate.description.trim() : "";
      const note = typeof candidate.note === "string" ? candidate.note.trim() : "";

      if (!title && !description && !note && deliverables.length === 0) {
        return null;
      }

      return {
        id:
          typeof candidate.id === "string" && candidate.id.trim()
            ? candidate.id.trim()
            : `home-service-${index + 1}`,
        icon,
        title: title || defaultHomeServices[index % defaultHomeServices.length]?.title || "",
        description:
          description || defaultHomeServices[index % defaultHomeServices.length]?.description || "",
        note: note || defaultHomeServices[index % defaultHomeServices.length]?.note || "",
        deliverables:
          deliverables.length > 0
            ? deliverables
            : defaultHomeServices[index % defaultHomeServices.length]?.deliverables || [],
      };
    })
    .filter((entry): entry is HomeService => Boolean(entry));

  return services;
}

export const defaultSiteSettings: SiteSettings = {
  id: siteSettingsRecordId,
  updatedAt: null,
  siteName: "Pencil And Hammer",
  siteTitle: "Pencil And Hammer | Design-Build Studio",
  siteDescription:
    "Pencil And Hammer is a design-build company delivering residential, hospitality, retail, and workplace interiors with strategic planning and a clean material point of view.",
  siteUrl: normalizeSiteUrl(env.siteUrl),
  contactEmail: "hello@pencilandhammer.com",
  contactPhone: "+1 (555) 481-2400",
  addressLine1: "47 Mercer Street",
  addressLine2: "",
  addressCity: "Brooklyn",
  addressRegion: "NY",
  addressPostalCode: "11201",
  addressCountry: "US",
  instagramUrl: "https://instagram.com",
  facebookUrl: "https://facebook.com",
  linkedinUrl: "https://linkedin.com",
  seoKeywords: [
    "design build company",
    "interior architecture studio",
    "residential interiors",
    "hospitality fit out",
    "commercial interiors",
    "workplace design",
  ],
  ogTitle: "Pencil And Hammer | Strategy, Design, Delivery",
  ogDescription:
    "A design-build company translating sharp concepts into built interiors for homes, hospitality, retail, and workplaces.",
  ogKicker: "Design-Build Company",
  ogTagline: "Strategy. Design. Delivery.",
  logoUrl: "/pencil-and-hammer-mark.svg",
  logoStoragePath: null,
  faviconUrl: "/pencil-and-hammer-favicon.png",
  faviconStoragePath: null,
  lightBackgroundHex: "#f5f5f5",
  lightForegroundHex: "#141414",
  lightSurfaceHex: "#ffffff",
  lightMutedHex: "#ebebeb",
  lightBorderHex: "#d9d9d9",
  lightAccentHex: "#2f2f2f",
  darkBackgroundHex: "#090909",
  darkForegroundHex: "#f3f3f3",
  darkSurfaceHex: "#171717",
  darkMutedHex: "#232323",
  darkBorderHex: "#2f2f2f",
  darkAccentHex: "#d7d7d7",
  aboutHeroTitle: "Built from strategy, not styling.",
  aboutHeroSubtitle: "One team for concept design, coordination, and site delivery.",
  aboutHeroImageUrl: "",
  aboutHeroImageStoragePath: null,
  homeHeroEyebrow: "Interior Design Studio",
  homeHeroTitleLineOne: "Crafting Spaces",
  homeHeroTitleLineTwo: "That Inspire",
  homeHeroBody:
    "Pencil And Hammer shapes residential, hospitality, and workplace interiors with a disciplined design-build process that keeps concept, coordination, and delivery aligned from the first conversation.",
  homeHeroImageUrl: "",
  homeHeroImageStoragePath: null,
  homeHeroImageAlt: "Pencil And Hammer studio team at work",
  homeHeroPrimaryCtaLabel: "View Our Work",
  homeHeroPrimaryCtaHref: "/portfolio",
  homeHeroSecondaryCtaLabel: "Get In Touch",
  homeHeroSecondaryCtaHref: "/contact",
  homeHeroScrollLabel: "Scroll",
  homeStoryEyebrow: "Our Story",
  homeStoryTitle: "A studio shaped around design clarity, site rigor, and calm execution.",
  homeStoryParagraphs: defaultHomeStoryParagraphs,
  homeStoryImageUrl: "",
  homeStoryImageStoragePath: null,
  homeStoryImageAlt: "Pencil And Hammer studio story image",
  homeStoryMetrics: defaultHomeStoryMetrics,
  homeStoryPrimaryCtaLabel: "Explore The Studio",
  homeStoryPrimaryCtaHref: "/about",
  homeStorySecondaryCtaLabel: "Start A Conversation",
  homeStorySecondaryCtaHref: "/contact",
  homeServicesEyebrow: "What We Handle",
  homeServicesTitle: "A clearer structure for concept, planning, lighting, and finish.",
  homeServicesBody:
    "Every project is developed as one connected interior system. Layout, materials, lighting, and furnishing are resolved together so the final result feels calm, coherent, and commercially sound.",
  homeServicesHighlights: defaultHomeServiceHighlights,
  homeServices: defaultHomeServices,
  aboutStoryTitle: "How Pencil And Hammer Works",
  aboutStoryParagraphs: defaultAboutStoryParagraphs,
  aboutPortraitUrl: "",
  aboutPortraitStoragePath: null,
  aboutPortraitAlt: "Pencil And Hammer team portrait",
  aboutStats: defaultAboutStats,
  aboutPhilosophyTitle: "What We Believe",
  aboutPhilosophyQuote:
    '"Good spaces are drawn with restraint, coordinated with rigor, and delivered with enough care to feel inevitable once they exist."',
  aboutPhilosophyAttribution: "Pencil And Hammer Studio",
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
    lightBackgroundHex: normalizeHexColor(
      row?.light_background_hex,
      defaultSiteSettings.lightBackgroundHex,
    ),
    lightForegroundHex: normalizeHexColor(
      row?.light_foreground_hex,
      defaultSiteSettings.lightForegroundHex,
    ),
    lightSurfaceHex: normalizeHexColor(
      row?.light_surface_hex,
      defaultSiteSettings.lightSurfaceHex,
    ),
    lightMutedHex: normalizeHexColor(
      row?.light_muted_hex,
      defaultSiteSettings.lightMutedHex,
    ),
    lightBorderHex: normalizeHexColor(
      row?.light_border_hex,
      defaultSiteSettings.lightBorderHex,
    ),
    lightAccentHex: normalizeHexColor(
      row?.light_accent_hex,
      defaultSiteSettings.lightAccentHex,
    ),
    darkBackgroundHex: normalizeHexColor(
      row?.dark_background_hex,
      defaultSiteSettings.darkBackgroundHex,
    ),
    darkForegroundHex: normalizeHexColor(
      row?.dark_foreground_hex,
      defaultSiteSettings.darkForegroundHex,
    ),
    darkSurfaceHex: normalizeHexColor(
      row?.dark_surface_hex,
      defaultSiteSettings.darkSurfaceHex,
    ),
    darkMutedHex: normalizeHexColor(
      row?.dark_muted_hex,
      defaultSiteSettings.darkMutedHex,
    ),
    darkBorderHex: normalizeHexColor(
      row?.dark_border_hex,
      defaultSiteSettings.darkBorderHex,
    ),
    darkAccentHex: normalizeHexColor(
      row?.dark_accent_hex,
      defaultSiteSettings.darkAccentHex,
    ),
    aboutHeroTitle:
      row?.about_hero_title?.trim() || defaultSiteSettings.aboutHeroTitle,
    aboutHeroSubtitle:
      row?.about_hero_subtitle?.trim() || defaultSiteSettings.aboutHeroSubtitle,
    aboutHeroImageUrl: row?.about_hero_image_url?.trim() || "",
    aboutHeroImageStoragePath: row?.about_hero_image_storage_path ?? null,
    homeHeroEyebrow:
      row?.home_hero_eyebrow?.trim() || defaultSiteSettings.homeHeroEyebrow,
    homeHeroTitleLineOne:
      row?.home_hero_title_line_one?.trim() || defaultSiteSettings.homeHeroTitleLineOne,
    homeHeroTitleLineTwo:
      row?.home_hero_title_line_two?.trim() || defaultSiteSettings.homeHeroTitleLineTwo,
    homeHeroBody:
      row?.home_hero_body?.trim() || defaultSiteSettings.homeHeroBody,
    homeHeroImageUrl: row?.home_hero_image_url?.trim() || "",
    homeHeroImageStoragePath: row?.home_hero_image_storage_path ?? null,
    homeHeroImageAlt:
      row?.home_hero_image_alt?.trim() || defaultSiteSettings.homeHeroImageAlt,
    homeHeroPrimaryCtaLabel:
      row?.home_hero_primary_cta_label?.trim() || defaultSiteSettings.homeHeroPrimaryCtaLabel,
    homeHeroPrimaryCtaHref:
      row?.home_hero_primary_cta_href?.trim() || defaultSiteSettings.homeHeroPrimaryCtaHref,
    homeHeroSecondaryCtaLabel:
      row?.home_hero_secondary_cta_label?.trim() ||
      defaultSiteSettings.homeHeroSecondaryCtaLabel,
    homeHeroSecondaryCtaHref:
      row?.home_hero_secondary_cta_href?.trim() ||
      defaultSiteSettings.homeHeroSecondaryCtaHref,
    homeHeroScrollLabel:
      row?.home_hero_scroll_label?.trim() || defaultSiteSettings.homeHeroScrollLabel,
    homeStoryEyebrow:
      row?.home_story_eyebrow?.trim() || defaultSiteSettings.homeStoryEyebrow,
    homeStoryTitle:
      row?.home_story_title?.trim() || defaultSiteSettings.homeStoryTitle,
    homeStoryParagraphs: normalizeHomeStoryParagraphs(row?.home_story_paragraphs),
    homeStoryImageUrl: row?.home_story_image_url?.trim() || "",
    homeStoryImageStoragePath: row?.home_story_image_storage_path ?? null,
    homeStoryImageAlt:
      row?.home_story_image_alt?.trim() || defaultSiteSettings.homeStoryImageAlt,
    homeStoryMetrics: normalizeHomeStoryMetrics(row?.home_story_metrics),
    homeStoryPrimaryCtaLabel:
      row?.home_story_primary_cta_label?.trim() ||
      defaultSiteSettings.homeStoryPrimaryCtaLabel,
    homeStoryPrimaryCtaHref:
      row?.home_story_primary_cta_href?.trim() ||
      defaultSiteSettings.homeStoryPrimaryCtaHref,
    homeStorySecondaryCtaLabel:
      row?.home_story_secondary_cta_label?.trim() ||
      defaultSiteSettings.homeStorySecondaryCtaLabel,
    homeStorySecondaryCtaHref:
      row?.home_story_secondary_cta_href?.trim() ||
      defaultSiteSettings.homeStorySecondaryCtaHref,
    homeServicesEyebrow:
      row?.home_services_eyebrow?.trim() || defaultSiteSettings.homeServicesEyebrow,
    homeServicesTitle:
      row?.home_services_title?.trim() || defaultSiteSettings.homeServicesTitle,
    homeServicesBody:
      row?.home_services_body?.trim() || defaultSiteSettings.homeServicesBody,
    homeServicesHighlights: normalizeHomeServiceHighlights(row?.home_services_highlights),
    homeServices: normalizeHomeServices(row?.home_services),
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
