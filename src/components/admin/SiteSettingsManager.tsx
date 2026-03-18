"use client";

import Image from "next/image";
import { ArrowDown, ArrowUp, Loader2, Plus, Save, Trash2, Upload } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";

import { useAuth } from "@/components/auth/auth-context";
import { useSiteSettings } from "@/components/site/site-settings-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  aboutStatIcons,
  homeServiceIcons,
  isVideoAssetUrl,
  joinKeywords,
  normalizeSiteSettings,
  sanitizeFileName,
  siteAssetsBucket,
  siteSettingsRecordId,
  siteSettingsSelect,
  type AboutStat,
  type AboutStatIcon,
  type AboutStoryParagraph,
  type HomeService,
  type HomeServiceHighlight,
  type HomeServiceIcon,
  type HomeStoryMetric,
  type SiteSettings,
  type SiteSettingsRow,
} from "@/lib/site";

type SiteSettingsManagerProps = {
  initialSettings: SiteSettings;
  initialError: string | null;
};

type SiteSettingsDraft = {
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
  seoKeywords: string;
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
  homeHeroVideoUrl: string;
  homeHeroVideoStoragePath: string | null;
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
  aboutMissionVisionEyebrow: string;
  aboutMissionVisionTitle: string;
  aboutMissionVisionBody: string;
  aboutMissionTitle: string;
  aboutMissionBody: string;
  aboutVisionTitle: string;
  aboutVisionBody: string;
  aboutPortraitUrl: string;
  aboutPortraitStoragePath: string | null;
  aboutPortraitAlt: string;
  aboutStats: AboutStat[];
  aboutPhilosophyTitle: string;
  aboutPhilosophyQuote: string;
  aboutPhilosophyAttribution: string;
};

type SettingsTab = "branding" | "contact" | "home" | "about";
type AssetKind =
  | "logo"
  | "favicon"
  | "aboutHero"
  | "aboutPortrait"
  | "homeStory"
  | "homeHero"
  | "homeHeroVideo";

const aboutIconOptions: Array<{ value: AboutStatIcon; label: string }> = [
  { value: "award", label: "Award" },
  { value: "users", label: "Users" },
  { value: "clock", label: "Clock" },
  { value: "globe", label: "Globe" },
  { value: "sparkles", label: "Sparkles" },
  { value: "home", label: "Home" },
];

const homeServiceIconOptions: Array<{ value: HomeServiceIcon; label: string }> = [
  { value: "paintbrush", label: "Paintbrush" },
  { value: "ruler", label: "Ruler" },
  { value: "lightbulb", label: "Lightbulb" },
  { value: "sofa", label: "Sofa" },
];

const paletteSections = [
  {
    title: "Light Theme",
    description: "Used across the website when light mode is active.",
    fields: [
      { key: "lightBackgroundHex", label: "Background" },
      { key: "lightForegroundHex", label: "Foreground" },
      { key: "lightSurfaceHex", label: "Surface" },
      { key: "lightMutedHex", label: "Muted" },
      { key: "lightBorderHex", label: "Border" },
      { key: "lightAccentHex", label: "Accent" },
    ],
  },
  {
    title: "Dark Theme",
    description: "Used across the website when dark mode is active.",
    fields: [
      { key: "darkBackgroundHex", label: "Background" },
      { key: "darkForegroundHex", label: "Foreground" },
      { key: "darkSurfaceHex", label: "Surface" },
      { key: "darkMutedHex", label: "Muted" },
      { key: "darkBorderHex", label: "Border" },
      { key: "darkAccentHex", label: "Accent" },
    ],
  },
] as const satisfies Array<{
  title: string;
  description: string;
  fields: Array<{ key: keyof SiteSettingsDraft; label: string }>;
}>;

function createDraft(settings: SiteSettings): SiteSettingsDraft {
  return {
    siteName: settings.siteName,
    siteTitle: settings.siteTitle,
    siteDescription: settings.siteDescription,
    siteUrl: settings.siteUrl,
    contactEmail: settings.contactEmail,
    contactPhone: settings.contactPhone,
    addressLine1: settings.addressLine1,
    addressLine2: settings.addressLine2,
    addressCity: settings.addressCity,
    addressRegion: settings.addressRegion,
    addressPostalCode: settings.addressPostalCode,
    addressCountry: settings.addressCountry,
    instagramUrl: settings.instagramUrl,
    facebookUrl: settings.facebookUrl,
    linkedinUrl: settings.linkedinUrl,
    seoKeywords: joinKeywords(settings.seoKeywords),
    ogTitle: settings.ogTitle,
    ogDescription: settings.ogDescription,
    ogKicker: settings.ogKicker,
    ogTagline: settings.ogTagline,
    logoUrl: settings.logoUrl,
    logoStoragePath: settings.logoStoragePath,
    faviconUrl: settings.faviconUrl,
    faviconStoragePath: settings.faviconStoragePath,
    lightBackgroundHex: settings.lightBackgroundHex,
    lightForegroundHex: settings.lightForegroundHex,
    lightSurfaceHex: settings.lightSurfaceHex,
    lightMutedHex: settings.lightMutedHex,
    lightBorderHex: settings.lightBorderHex,
    lightAccentHex: settings.lightAccentHex,
    darkBackgroundHex: settings.darkBackgroundHex,
    darkForegroundHex: settings.darkForegroundHex,
    darkSurfaceHex: settings.darkSurfaceHex,
    darkMutedHex: settings.darkMutedHex,
    darkBorderHex: settings.darkBorderHex,
    darkAccentHex: settings.darkAccentHex,
    aboutHeroTitle: settings.aboutHeroTitle,
    aboutHeroSubtitle: settings.aboutHeroSubtitle,
    aboutHeroImageUrl: settings.aboutHeroImageUrl,
    aboutHeroImageStoragePath: settings.aboutHeroImageStoragePath,
    homeHeroEyebrow: settings.homeHeroEyebrow,
    homeHeroTitleLineOne: settings.homeHeroTitleLineOne,
    homeHeroTitleLineTwo: settings.homeHeroTitleLineTwo,
    homeHeroBody: settings.homeHeroBody,
    homeHeroVideoUrl: settings.homeHeroVideoUrl,
    homeHeroVideoStoragePath: settings.homeHeroVideoStoragePath,
    homeHeroImageUrl: settings.homeHeroImageUrl,
    homeHeroImageStoragePath: settings.homeHeroImageStoragePath,
    homeHeroImageAlt: settings.homeHeroImageAlt,
    homeHeroPrimaryCtaLabel: settings.homeHeroPrimaryCtaLabel,
    homeHeroPrimaryCtaHref: settings.homeHeroPrimaryCtaHref,
    homeHeroSecondaryCtaLabel: settings.homeHeroSecondaryCtaLabel,
    homeHeroSecondaryCtaHref: settings.homeHeroSecondaryCtaHref,
    homeHeroScrollLabel: settings.homeHeroScrollLabel,
    homeStoryEyebrow: settings.homeStoryEyebrow,
    homeStoryTitle: settings.homeStoryTitle,
    homeStoryParagraphs: settings.homeStoryParagraphs.map((paragraph) => ({ ...paragraph })),
    homeStoryImageUrl: settings.homeStoryImageUrl,
    homeStoryImageStoragePath: settings.homeStoryImageStoragePath,
    homeStoryImageAlt: settings.homeStoryImageAlt,
    homeStoryMetrics: settings.homeStoryMetrics.map((metric) => ({ ...metric })),
    homeStoryPrimaryCtaLabel: settings.homeStoryPrimaryCtaLabel,
    homeStoryPrimaryCtaHref: settings.homeStoryPrimaryCtaHref,
    homeStorySecondaryCtaLabel: settings.homeStorySecondaryCtaLabel,
    homeStorySecondaryCtaHref: settings.homeStorySecondaryCtaHref,
    homeServicesEyebrow: settings.homeServicesEyebrow,
    homeServicesTitle: settings.homeServicesTitle,
    homeServicesBody: settings.homeServicesBody,
    homeServicesHighlights: settings.homeServicesHighlights.map((highlight) => ({ ...highlight })),
    homeServices: settings.homeServices.map((service) => ({ ...service, deliverables: [...service.deliverables] })),
    aboutStoryTitle: settings.aboutStoryTitle,
    aboutStoryParagraphs: settings.aboutStoryParagraphs.map((paragraph) => ({ ...paragraph })),
    aboutMissionVisionEyebrow: settings.aboutMissionVisionEyebrow,
    aboutMissionVisionTitle: settings.aboutMissionVisionTitle,
    aboutMissionVisionBody: settings.aboutMissionVisionBody,
    aboutMissionTitle: settings.aboutMissionTitle,
    aboutMissionBody: settings.aboutMissionBody,
    aboutVisionTitle: settings.aboutVisionTitle,
    aboutVisionBody: settings.aboutVisionBody,
    aboutPortraitUrl: settings.aboutPortraitUrl,
    aboutPortraitStoragePath: settings.aboutPortraitStoragePath,
    aboutPortraitAlt: settings.aboutPortraitAlt,
    aboutStats: settings.aboutStats.map((stat) => ({ ...stat })),
    aboutPhilosophyTitle: settings.aboutPhilosophyTitle,
    aboutPhilosophyQuote: settings.aboutPhilosophyQuote,
    aboutPhilosophyAttribution: settings.aboutPhilosophyAttribution,
  };
}

function parseKeywords(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function createStatId() {
  return `about-stat-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createStoryParagraphId(prefix = "about-story") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createHomeStoryMetricId() {
  return `home-story-metric-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createHomeServiceHighlightId() {
  return `home-services-highlight-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createHomeServiceId() {
  return `home-service-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Unable to read the uploaded file."));
    };

    reader.onerror = () => {
      reject(new Error("Unable to read the uploaded file."));
    };

    reader.readAsDataURL(file);
  });
}

export default function SiteSettingsManager({
  initialSettings,
  initialError,
}: SiteSettingsManagerProps) {
  const { client } = useAuth();
  const { setSettings } = useSiteSettings();
  const [draft, setDraft] = useState(() => createDraft(initialSettings));
  const [activeTab, setActiveTab] = useState<SettingsTab>("branding");
  const [errorMessage, setErrorMessage] = useState(initialError);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingAsset, setUploadingAsset] = useState<AssetKind | null>(null);
  const [savedAssetPaths, setSavedAssetPaths] = useState({
    logo: initialSettings.logoStoragePath,
    favicon: initialSettings.faviconStoragePath,
    aboutHero: initialSettings.aboutHeroImageStoragePath,
    homeHero: initialSettings.homeHeroImageStoragePath,
    homeHeroVideo: initialSettings.homeHeroVideoStoragePath,
    homeStory: initialSettings.homeStoryImageStoragePath,
    aboutPortrait: initialSettings.aboutPortraitStoragePath,
  });

  function updateDraft<K extends keyof SiteSettingsDraft>(
    key: K,
    value: SiteSettingsDraft[K],
  ) {
    setDraft((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function setAssetFields(kind: AssetKind, url: string, storagePath: string | null) {
    setDraft((current) => {
      if (kind === "logo") {
        return { ...current, logoUrl: url, logoStoragePath: storagePath };
      }

      if (kind === "favicon") {
        return { ...current, faviconUrl: url, faviconStoragePath: storagePath };
      }

      if (kind === "aboutHero") {
        return {
          ...current,
          aboutHeroImageUrl: url,
          aboutHeroImageStoragePath: storagePath,
        };
      }

      if (kind === "homeHero") {
        return {
          ...current,
          homeHeroImageUrl: url,
          homeHeroImageStoragePath: storagePath,
        };
      }

      if (kind === "homeHeroVideo") {
        return {
          ...current,
          homeHeroVideoUrl: url,
          homeHeroVideoStoragePath: storagePath,
        };
      }

      if (kind === "homeStory") {
        return {
          ...current,
          homeStoryImageUrl: url,
          homeStoryImageStoragePath: storagePath,
        };
      }

      return {
        ...current,
        aboutPortraitUrl: url,
        aboutPortraitStoragePath: storagePath,
      };
    });
  }

  function getAssetLabel(kind: AssetKind) {
    switch (kind) {
      case "logo":
        return "App logo";
      case "favicon":
        return "App favicon";
      case "aboutHero":
        return "About hero image";
      case "homeHero":
        return "Home hero image";
      case "homeHeroVideo":
        return "Home hero video";
      case "homeStory":
        return "Home Our Story image";
      default:
        return "Portrait image";
    }
  }

  async function handleAssetUpload(
    event: ChangeEvent<HTMLInputElement>,
    kind: AssetKind,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadingAsset(kind);

    try {
      const group =
        kind === "logo" || kind === "favicon"
          ? "branding"
          : kind === "homeStory" || kind === "homeHero" || kind === "homeHeroVideo"
            ? "home"
            : "about";
      const path = `${group}/${kind}-${Date.now()}-${sanitizeFileName(file.name)}`;
      const { error } = await client.storage
        .from(siteAssetsBucket)
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        if (error.message.toLowerCase().includes("bucket not found")) {
          if (kind === "homeHeroVideo") {
            throw new Error(
              "The site-assets bucket is missing. Create it before uploading hero videos.",
            );
          }

          const inlineAsset = await readFileAsDataUrl(file);
          setAssetFields(kind, inlineAsset, null);

          toast.success(`${getAssetLabel(kind)} uploaded with inline fallback storage.`);
          return;
        }

        throw error;
      }

      const {
        data: { publicUrl },
      } = client.storage.from(siteAssetsBucket).getPublicUrl(path);

      setAssetFields(kind, publicUrl, path);

      if (kind === "aboutPortrait" && !draft.aboutPortraitAlt.trim()) {
        updateDraft(
          "aboutPortraitAlt",
          file.name.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ").trim(),
        );
      }

      if (kind === "homeStory" && !draft.homeStoryImageAlt.trim()) {
        updateDraft(
          "homeStoryImageAlt",
          file.name.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ").trim(),
        );
      }

      if (kind === "homeHero" && !draft.homeHeroImageAlt.trim()) {
        updateDraft(
          "homeHeroImageAlt",
          file.name.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ").trim(),
        );
      }

      toast.success(`${getAssetLabel(kind)} uploaded.`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : `Unable to upload ${kind}.`,
      );
    } finally {
      setUploadingAsset(null);
      event.target.value = "";
    }
  }

  function updateAboutStat(index: number, key: keyof AboutStat, value: string) {
    setDraft((current) => ({
      ...current,
      aboutStats: current.aboutStats.map((stat, statIndex) =>
        statIndex === index ? { ...stat, [key]: value } : stat,
      ),
    }));
  }

  function moveAboutStat(index: number, direction: -1 | 1) {
    setDraft((current) => {
      const nextIndex = index + direction;

      if (nextIndex < 0 || nextIndex >= current.aboutStats.length) {
        return current;
      }

      const aboutStats = [...current.aboutStats];
      const [moved] = aboutStats.splice(index, 1);
      aboutStats.splice(nextIndex, 0, moved);

      return {
        ...current,
        aboutStats,
      };
    });
  }

  function addAboutStat() {
    setDraft((current) => ({
      ...current,
      aboutStats: [
        ...current.aboutStats,
        {
          id: createStatId(),
          icon: aboutStatIcons[0],
          title: "",
          description: "",
        },
      ],
    }));
  }

  function removeAboutStat(index: number) {
    setDraft((current) => ({
      ...current,
      aboutStats: current.aboutStats.filter((_, statIndex) => statIndex !== index),
    }));
  }

  function updateHomeStoryMetric(index: number, key: keyof HomeStoryMetric, value: string) {
    setDraft((current) => ({
      ...current,
      homeStoryMetrics: current.homeStoryMetrics.map((metric, metricIndex) =>
        metricIndex === index ? { ...metric, [key]: value } : metric,
      ),
    }));
  }

  function moveHomeStoryMetric(index: number, direction: -1 | 1) {
    setDraft((current) => {
      const nextIndex = index + direction;

      if (nextIndex < 0 || nextIndex >= current.homeStoryMetrics.length) {
        return current;
      }

      const homeStoryMetrics = [...current.homeStoryMetrics];
      const [moved] = homeStoryMetrics.splice(index, 1);
      homeStoryMetrics.splice(nextIndex, 0, moved);

      return {
        ...current,
        homeStoryMetrics,
      };
    });
  }

  function addHomeStoryMetric() {
    setDraft((current) => ({
      ...current,
      homeStoryMetrics: [
        ...current.homeStoryMetrics,
        {
          id: createHomeStoryMetricId(),
          value: "",
          label: "",
        },
      ],
    }));
  }

  function removeHomeStoryMetric(index: number) {
    setDraft((current) => ({
      ...current,
      homeStoryMetrics: current.homeStoryMetrics.filter(
        (_, metricIndex) => metricIndex !== index,
      ),
    }));
  }

  function updateHomeStoryParagraph(index: number, value: string) {
    setDraft((current) => ({
      ...current,
      homeStoryParagraphs: current.homeStoryParagraphs.map((paragraph, paragraphIndex) =>
        paragraphIndex === index ? { ...paragraph, body: value } : paragraph,
      ),
    }));
  }

  function moveHomeStoryParagraph(index: number, direction: -1 | 1) {
    setDraft((current) => {
      const nextIndex = index + direction;

      if (nextIndex < 0 || nextIndex >= current.homeStoryParagraphs.length) {
        return current;
      }

      const homeStoryParagraphs = [...current.homeStoryParagraphs];
      const [moved] = homeStoryParagraphs.splice(index, 1);
      homeStoryParagraphs.splice(nextIndex, 0, moved);

      return {
        ...current,
        homeStoryParagraphs,
      };
    });
  }

  function addHomeStoryParagraph() {
    setDraft((current) => ({
      ...current,
      homeStoryParagraphs: [
        ...current.homeStoryParagraphs,
        {
          id: createStoryParagraphId("home-story"),
          body: "",
        },
      ],
    }));
  }

  function removeHomeStoryParagraph(index: number) {
    setDraft((current) => ({
      ...current,
      homeStoryParagraphs: current.homeStoryParagraphs.filter(
        (_, paragraphIndex) => paragraphIndex !== index,
      ),
    }));
  }

  function updateHomeServiceHighlight(index: number, key: keyof HomeServiceHighlight, value: string) {
    setDraft((current) => ({
      ...current,
      homeServicesHighlights: current.homeServicesHighlights.map((highlight, highlightIndex) =>
        highlightIndex === index ? { ...highlight, [key]: value } : highlight,
      ),
    }));
  }

  function moveHomeServiceHighlight(index: number, direction: -1 | 1) {
    setDraft((current) => {
      const nextIndex = index + direction;

      if (nextIndex < 0 || nextIndex >= current.homeServicesHighlights.length) {
        return current;
      }

      const homeServicesHighlights = [...current.homeServicesHighlights];
      const [moved] = homeServicesHighlights.splice(index, 1);
      homeServicesHighlights.splice(nextIndex, 0, moved);

      return {
        ...current,
        homeServicesHighlights,
      };
    });
  }

  function addHomeServiceHighlight() {
    setDraft((current) => ({
      ...current,
      homeServicesHighlights: [
        ...current.homeServicesHighlights,
        {
          id: createHomeServiceHighlightId(),
          label: "",
          text: "",
        },
      ],
    }));
  }

  function removeHomeServiceHighlight(index: number) {
    setDraft((current) => ({
      ...current,
      homeServicesHighlights: current.homeServicesHighlights.filter(
        (_, highlightIndex) => highlightIndex !== index,
      ),
    }));
  }

  function updateHomeService(index: number, key: keyof Omit<HomeService, "deliverables">, value: string) {
    setDraft((current) => ({
      ...current,
      homeServices: current.homeServices.map((service, serviceIndex) =>
        serviceIndex === index ? { ...service, [key]: value } : service,
      ),
    }));
  }

  function updateHomeServiceDeliverable(serviceIndex: number, deliverableIndex: number, value: string) {
    setDraft((current) => ({
      ...current,
      homeServices: current.homeServices.map((service, currentIndex) =>
        currentIndex === serviceIndex
          ? {
              ...service,
              deliverables: service.deliverables.map((deliverable, currentDeliverableIndex) =>
                currentDeliverableIndex === deliverableIndex ? value : deliverable,
              ),
            }
          : service,
      ),
    }));
  }

  function addHomeServiceDeliverable(serviceIndex: number) {
    setDraft((current) => ({
      ...current,
      homeServices: current.homeServices.map((service, currentIndex) =>
        currentIndex === serviceIndex
          ? {
              ...service,
              deliverables: [...service.deliverables, ""],
            }
          : service,
      ),
    }));
  }

  function removeHomeServiceDeliverable(serviceIndex: number, deliverableIndex: number) {
    setDraft((current) => ({
      ...current,
      homeServices: current.homeServices.map((service, currentIndex) =>
        currentIndex === serviceIndex
          ? {
              ...service,
              deliverables: service.deliverables.filter(
                (_, currentDeliverableIndex) => currentDeliverableIndex !== deliverableIndex,
              ),
            }
          : service,
      ),
    }));
  }

  function moveHomeService(index: number, direction: -1 | 1) {
    setDraft((current) => {
      const nextIndex = index + direction;

      if (nextIndex < 0 || nextIndex >= current.homeServices.length) {
        return current;
      }

      const homeServices = [...current.homeServices];
      const [moved] = homeServices.splice(index, 1);
      homeServices.splice(nextIndex, 0, moved);

      return {
        ...current,
        homeServices,
      };
    });
  }

  function addHomeService() {
    setDraft((current) => ({
      ...current,
      homeServices: [
        ...current.homeServices,
        {
          id: createHomeServiceId(),
          icon: homeServiceIcons[0],
          title: "",
          description: "",
          note: "",
          deliverables: [""],
        },
      ],
    }));
  }

  function removeHomeService(index: number) {
    setDraft((current) => ({
      ...current,
      homeServices: current.homeServices.filter((_, serviceIndex) => serviceIndex !== index),
    }));
  }

  function updateStoryParagraph(index: number, value: string) {
    setDraft((current) => ({
      ...current,
      aboutStoryParagraphs: current.aboutStoryParagraphs.map((paragraph, paragraphIndex) =>
        paragraphIndex === index ? { ...paragraph, body: value } : paragraph,
      ),
    }));
  }

  function moveStoryParagraph(index: number, direction: -1 | 1) {
    setDraft((current) => {
      const nextIndex = index + direction;

      if (nextIndex < 0 || nextIndex >= current.aboutStoryParagraphs.length) {
        return current;
      }

      const aboutStoryParagraphs = [...current.aboutStoryParagraphs];
      const [moved] = aboutStoryParagraphs.splice(index, 1);
      aboutStoryParagraphs.splice(nextIndex, 0, moved);

      return {
        ...current,
        aboutStoryParagraphs,
      };
    });
  }

  function addStoryParagraph() {
    setDraft((current) => ({
      ...current,
      aboutStoryParagraphs: [
        ...current.aboutStoryParagraphs,
        {
          id: createStoryParagraphId(),
          body: "",
        },
      ],
    }));
  }

  function removeStoryParagraph(index: number) {
    setDraft((current) => ({
      ...current,
      aboutStoryParagraphs: current.aboutStoryParagraphs.filter(
        (_, paragraphIndex) => paragraphIndex !== index,
      ),
    }));
  }

  async function handleSave() {
    setIsSaving(true);

    try {
      const cleanedHomeStoryParagraphs = draft.homeStoryParagraphs
        .map((paragraph, index) => ({
          id: paragraph.id || `home-story-${index + 1}`,
          body: paragraph.body.trim(),
        }))
        .filter((paragraph) => paragraph.body);

      const cleanedHomeStoryMetrics = draft.homeStoryMetrics
        .map((metric, index) => ({
          id: metric.id || `home-story-metric-${index + 1}`,
          value: metric.value.trim(),
          label: metric.label.trim(),
        }))
        .filter((metric) => metric.value || metric.label);

      const cleanedHomeServiceHighlights = draft.homeServicesHighlights
        .map((highlight, index) => ({
          id: highlight.id || `home-services-highlight-${index + 1}`,
          label: highlight.label.trim(),
          text: highlight.text.trim(),
        }))
        .filter((highlight) => highlight.label || highlight.text);

      const cleanedHomeServices = draft.homeServices
        .map((service, index) => ({
          id: service.id || `home-service-${index + 1}`,
          icon: service.icon,
          title: service.title.trim(),
          description: service.description.trim(),
          note: service.note.trim(),
          deliverables: service.deliverables.map((item) => item.trim()).filter(Boolean),
        }))
        .filter(
          (service) =>
            service.title ||
            service.description ||
            service.note ||
            service.deliverables.length > 0,
        );

      const cleanedStoryParagraphs = draft.aboutStoryParagraphs
        .map((paragraph, index) => ({
          id: paragraph.id || `about-story-${index + 1}`,
          body: paragraph.body.trim(),
        }))
        .filter((paragraph) => paragraph.body);

      const cleanedStats = draft.aboutStats
        .map((stat, index) => ({
          id: stat.id || `about-stat-${index + 1}`,
          icon: stat.icon,
          title: stat.title.trim(),
          description: stat.description.trim(),
        }))
        .filter((stat) => stat.title || stat.description);

      const { data, error } = await client
        .from("site_settings")
        .upsert(
          {
            id: siteSettingsRecordId,
            site_name: draft.siteName.trim(),
            site_title: draft.siteTitle.trim(),
            site_description: draft.siteDescription.trim(),
            site_url: draft.siteUrl.trim(),
            contact_email: draft.contactEmail.trim(),
            contact_phone: draft.contactPhone.trim(),
            address_line_1: draft.addressLine1.trim(),
            address_line_2: draft.addressLine2.trim(),
            address_city: draft.addressCity.trim(),
            address_region: draft.addressRegion.trim(),
            address_postal_code: draft.addressPostalCode.trim(),
            address_country: draft.addressCountry.trim(),
            instagram_url: draft.instagramUrl.trim(),
            facebook_url: draft.facebookUrl.trim(),
            linkedin_url: draft.linkedinUrl.trim(),
            seo_keywords: parseKeywords(draft.seoKeywords),
            og_title: draft.ogTitle.trim(),
            og_description: draft.ogDescription.trim(),
            og_kicker: draft.ogKicker.trim(),
            og_tagline: draft.ogTagline.trim(),
            logo_url: draft.logoUrl.trim(),
            logo_storage_path: draft.logoStoragePath,
            favicon_url: draft.faviconUrl.trim(),
            favicon_storage_path: draft.faviconStoragePath,
            light_background_hex: draft.lightBackgroundHex.trim(),
            light_foreground_hex: draft.lightForegroundHex.trim(),
            light_surface_hex: draft.lightSurfaceHex.trim(),
            light_muted_hex: draft.lightMutedHex.trim(),
            light_border_hex: draft.lightBorderHex.trim(),
            light_accent_hex: draft.lightAccentHex.trim(),
            dark_background_hex: draft.darkBackgroundHex.trim(),
            dark_foreground_hex: draft.darkForegroundHex.trim(),
            dark_surface_hex: draft.darkSurfaceHex.trim(),
            dark_muted_hex: draft.darkMutedHex.trim(),
            dark_border_hex: draft.darkBorderHex.trim(),
            dark_accent_hex: draft.darkAccentHex.trim(),
            about_hero_title: draft.aboutHeroTitle.trim(),
            about_hero_subtitle: draft.aboutHeroSubtitle.trim(),
            about_hero_image_url: draft.aboutHeroImageUrl.trim(),
            about_hero_image_storage_path: draft.aboutHeroImageStoragePath,
            home_hero_eyebrow: draft.homeHeroEyebrow.trim(),
            home_hero_title_line_one: draft.homeHeroTitleLineOne.trim(),
            home_hero_title_line_two: draft.homeHeroTitleLineTwo.trim(),
            home_hero_body: draft.homeHeroBody.trim(),
            home_hero_video_url: draft.homeHeroVideoUrl.trim(),
            home_hero_video_storage_path: draft.homeHeroVideoStoragePath,
            home_hero_image_url: draft.homeHeroImageUrl.trim(),
            home_hero_image_storage_path: draft.homeHeroImageStoragePath,
            home_hero_image_alt: draft.homeHeroImageAlt.trim(),
            home_hero_primary_cta_label: draft.homeHeroPrimaryCtaLabel.trim(),
            home_hero_primary_cta_href: draft.homeHeroPrimaryCtaHref.trim(),
            home_hero_secondary_cta_label: draft.homeHeroSecondaryCtaLabel.trim(),
            home_hero_secondary_cta_href: draft.homeHeroSecondaryCtaHref.trim(),
            home_hero_scroll_label: draft.homeHeroScrollLabel.trim(),
            home_story_eyebrow: draft.homeStoryEyebrow.trim(),
            home_story_title: draft.homeStoryTitle.trim(),
            home_story_paragraphs: cleanedHomeStoryParagraphs,
            home_story_image_url: draft.homeStoryImageUrl.trim(),
            home_story_image_storage_path: draft.homeStoryImageStoragePath,
            home_story_image_alt: draft.homeStoryImageAlt.trim(),
            home_story_metrics: cleanedHomeStoryMetrics,
            home_story_primary_cta_label: draft.homeStoryPrimaryCtaLabel.trim(),
            home_story_primary_cta_href: draft.homeStoryPrimaryCtaHref.trim(),
            home_story_secondary_cta_label: draft.homeStorySecondaryCtaLabel.trim(),
            home_story_secondary_cta_href: draft.homeStorySecondaryCtaHref.trim(),
            home_services_eyebrow: draft.homeServicesEyebrow.trim(),
            home_services_title: draft.homeServicesTitle.trim(),
            home_services_body: draft.homeServicesBody.trim(),
            home_services_highlights: cleanedHomeServiceHighlights,
            home_services: cleanedHomeServices,
            about_story_title: draft.aboutStoryTitle.trim(),
            about_story_paragraphs: cleanedStoryParagraphs,
            about_story_body_primary: cleanedStoryParagraphs[0]?.body ?? "",
            about_story_body_secondary: cleanedStoryParagraphs[1]?.body ?? "",
            about_mission_vision_eyebrow: draft.aboutMissionVisionEyebrow.trim(),
            about_mission_vision_title: draft.aboutMissionVisionTitle.trim(),
            about_mission_vision_body: draft.aboutMissionVisionBody.trim(),
            about_mission_title: draft.aboutMissionTitle.trim(),
            about_mission_body: draft.aboutMissionBody.trim(),
            about_vision_title: draft.aboutVisionTitle.trim(),
            about_vision_body: draft.aboutVisionBody.trim(),
            about_portrait_url: draft.aboutPortraitUrl.trim(),
            about_portrait_storage_path: draft.aboutPortraitStoragePath,
            about_portrait_alt: draft.aboutPortraitAlt.trim(),
            about_stats: cleanedStats,
            about_philosophy_title: draft.aboutPhilosophyTitle.trim(),
            about_philosophy_quote: draft.aboutPhilosophyQuote.trim(),
            about_philosophy_attribution: draft.aboutPhilosophyAttribution.trim(),
          },
          { onConflict: "id" },
        )
        .select(siteSettingsSelect)
        .single();

      if (error) {
        throw error;
      }

      const normalized = normalizeSiteSettings(data as SiteSettingsRow);
      const oldPaths = savedAssetPaths;

      setSettings(normalized);
      setDraft(createDraft(normalized));
      setSavedAssetPaths({
        logo: normalized.logoStoragePath,
        favicon: normalized.faviconStoragePath,
        aboutHero: normalized.aboutHeroImageStoragePath,
        homeHero: normalized.homeHeroImageStoragePath,
        homeHeroVideo: normalized.homeHeroVideoStoragePath,
        homeStory: normalized.homeStoryImageStoragePath,
        aboutPortrait: normalized.aboutPortraitStoragePath,
      });
      setErrorMessage(null);

      const obsoletePaths = [
        oldPaths.logo && oldPaths.logo !== normalized.logoStoragePath ? oldPaths.logo : null,
        oldPaths.favicon && oldPaths.favicon !== normalized.faviconStoragePath ? oldPaths.favicon : null,
        oldPaths.aboutHero && oldPaths.aboutHero !== normalized.aboutHeroImageStoragePath ? oldPaths.aboutHero : null,
        oldPaths.homeHero && oldPaths.homeHero !== normalized.homeHeroImageStoragePath ? oldPaths.homeHero : null,
        oldPaths.homeHeroVideo && oldPaths.homeHeroVideo !== normalized.homeHeroVideoStoragePath
          ? oldPaths.homeHeroVideo
          : null,
        oldPaths.homeStory && oldPaths.homeStory !== normalized.homeStoryImageStoragePath ? oldPaths.homeStory : null,
        oldPaths.aboutPortrait && oldPaths.aboutPortrait !== normalized.aboutPortraitStoragePath ? oldPaths.aboutPortrait : null,
      ].filter((value): value is string => Boolean(value));

      if (obsoletePaths.length) {
        await client.storage.from(siteAssetsBucket).remove(obsoletePaths);
      }

      toast.success("Site settings saved.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save site settings.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {errorMessage ? (
        <div className="rounded-[1.25rem] border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-amber-100">
          <p className="font-body leading-relaxed">
            Site settings are using fallback defaults right now: {errorMessage}. Run the latest
            Supabase migrations in `supabase/migrations` so these changes can be saved.
          </p>
        </div>
      ) : null}

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as SettingsTab)}
        className="space-y-6"
      >
        <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-display text-3xl text-foreground">Site Content Manager</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                Manage global branding, contact details, home-page content, and the About page from one place.
              </p>
            </div>
            <TabsList className="grid h-auto w-full grid-cols-4 rounded-[1rem] bg-background/70 p-1 lg:w-[560px]">
              <TabsTrigger value="branding" className="rounded-[0.8rem]">Branding</TabsTrigger>
              <TabsTrigger value="contact" className="rounded-[0.8rem]">Contact</TabsTrigger>
              <TabsTrigger value="home" className="rounded-[0.8rem]">Home</TabsTrigger>
              <TabsTrigger value="about" className="rounded-[0.8rem]">About</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="branding" className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-6">
              <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
                <p className="font-display text-2xl text-foreground">Brand Assets</p>
                <p className="mt-1 font-body text-sm text-muted-foreground">
                  Update the app logo and favicon used across navigation, footer, and metadata.
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-[1.25rem] border border-border bg-background/80 p-5">
                    <p className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      App Logo
                    </p>
                    <div className="relative mt-4 flex h-28 items-center justify-center overflow-hidden rounded-[1rem] border border-border bg-background">
                      <Image
                        src={draft.logoUrl}
                        alt="App logo preview"
                        fill
                        sizes="320px"
                        className="object-contain p-4"
                      />
                    </div>
                    <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 font-body text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:border-accent">
                      {uploadingAsset === "logo" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                      Upload Logo
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml"
                        className="hidden"
                        onChange={(event) => void handleAssetUpload(event, "logo")}
                      />
                    </label>
                  </div>

                  <div className="rounded-[1.25rem] border border-border bg-background/80 p-5">
                    <p className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      App Favicon
                    </p>
                    <div className="mt-4 flex h-28 items-center justify-center rounded-[1rem] border border-border bg-background">
                      <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-border bg-card">
                        <Image
                          src={draft.faviconUrl}
                          alt="App favicon preview"
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 font-body text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:border-accent">
                      {uploadingAsset === "favicon" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                      Upload Favicon
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml,image/x-icon"
                        className="hidden"
                        onChange={(event) => void handleAssetUpload(event, "favicon")}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
                <p className="font-display text-2xl text-foreground">Theme Palette</p>
                <p className="mt-1 max-w-2xl font-body text-sm text-muted-foreground">
                  Adjust the website color system for both light mode and dark mode. Changes apply to the
                  public site and the active theme toggle.
                </p>

                <div className="mt-6 grid gap-5 xl:grid-cols-2">
                  {paletteSections.map((section) => (
                    <div
                      key={section.title}
                      className="rounded-[1.25rem] border border-border bg-background/80 p-5"
                    >
                      <p className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        {section.title}
                      </p>
                      <p className="mt-2 font-body text-sm leading-6 text-muted-foreground">
                        {section.description}
                      </p>

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {section.fields.map((field) => (
                          <div key={field.key} className="space-y-2">
                            <label className="font-body text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                              {field.label}
                            </label>
                            <div className="flex items-center gap-3 rounded-[1rem] border border-border bg-card/70 px-3 py-3">
                              <Input
                                type="color"
                                value={draft[field.key] as string}
                                onChange={(event) => updateDraft(field.key, event.target.value)}
                                className="h-10 w-12 shrink-0 cursor-pointer rounded-md border-0 bg-transparent p-0"
                              />
                              <Input
                                value={draft[field.key] as string}
                                onChange={(event) => updateDraft(field.key, event.target.value)}
                                className="h-10 border-0 bg-transparent px-0 font-body text-sm uppercase tracking-[0.08em] shadow-none focus-visible:ring-0"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
                <p className="font-display text-2xl text-foreground">Branding</p>
                <div className="mt-6 space-y-5">
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Studio Name
                    </label>
                    <Input
                      value={draft.siteName}
                      onChange={(event) => updateDraft("siteName", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Site URL
                    </label>
                    <Input
                      value={draft.siteUrl}
                      onChange={(event) => updateDraft("siteUrl", event.target.value)}
                      placeholder="https://pencil-and-hammer.vercel.app"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      SEO Title
                    </label>
                    <Input
                      value={draft.siteTitle}
                      onChange={(event) => updateDraft("siteTitle", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      SEO Description
                    </label>
                    <Textarea
                      rows={4}
                      value={draft.siteDescription}
                      onChange={(event) => updateDraft("siteDescription", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      SEO Keywords
                    </label>
                    <Textarea
                      rows={3}
                      value={draft.seoKeywords}
                      onChange={(event) => updateDraft("seoKeywords", event.target.value)}
                      placeholder="luxury interior design, hospitality interiors, residential design"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
                <p className="font-display text-2xl text-foreground">Open Graph</p>
                <div className="mt-6 space-y-5">
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      OG Kicker
                    </label>
                    <Input
                      value={draft.ogKicker}
                      onChange={(event) => updateDraft("ogKicker", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      OG Title
                    </label>
                    <Input
                      value={draft.ogTitle}
                      onChange={(event) => updateDraft("ogTitle", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      OG Description
                    </label>
                    <Textarea
                      rows={4}
                      value={draft.ogDescription}
                      onChange={(event) => updateDraft("ogDescription", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      OG Tagline
                    </label>
                    <Input
                      value={draft.ogTagline}
                      onChange={(event) => updateDraft("ogTagline", event.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
            <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
              <p className="font-display text-2xl text-foreground">Contact Details</p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Email
                  </label>
                  <Input
                    value={draft.contactEmail}
                    onChange={(event) => updateDraft("contactEmail", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Phone
                  </label>
                  <Input
                    value={draft.contactPhone}
                    onChange={(event) => updateDraft("contactPhone", event.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Address Line 1
                  </label>
                  <Input
                    value={draft.addressLine1}
                    onChange={(event) => updateDraft("addressLine1", event.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Address Line 2
                  </label>
                  <Input
                    value={draft.addressLine2}
                    onChange={(event) => updateDraft("addressLine2", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    City
                  </label>
                  <Input
                    value={draft.addressCity}
                    onChange={(event) => updateDraft("addressCity", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    State / Region
                  </label>
                  <Input
                    value={draft.addressRegion}
                    onChange={(event) => updateDraft("addressRegion", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Postal Code
                  </label>
                  <Input
                    value={draft.addressPostalCode}
                    onChange={(event) => updateDraft("addressPostalCode", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Country
                  </label>
                  <Input
                    value={draft.addressCountry}
                    onChange={(event) => updateDraft("addressCountry", event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
              <p className="font-display text-2xl text-foreground">Social Links</p>
              <div className="mt-6 space-y-5">
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Instagram URL
                  </label>
                  <Input
                    value={draft.instagramUrl}
                    onChange={(event) => updateDraft("instagramUrl", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Facebook URL
                  </label>
                  <Input
                    value={draft.facebookUrl}
                    onChange={(event) => updateDraft("facebookUrl", event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    LinkedIn URL
                  </label>
                  <Input
                    value={draft.linkedinUrl}
                    onChange={(event) => updateDraft("linkedinUrl", event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="home" className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
            <div className="space-y-6">
              <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
                <p className="font-display text-2xl text-foreground">Home Hero</p>
                <p className="mt-1 font-body text-sm text-muted-foreground">
                  Control the hero video, fallback image, copy, and CTA buttons at the top of the
                  home page.
                </p>

                <div className="mt-6 grid gap-5">
                  <div className="relative h-[320px] overflow-hidden rounded-[1.2rem] border border-border bg-background">
                    {draft.homeHeroVideoUrl && isVideoAssetUrl(draft.homeHeroVideoUrl) ? (
                      <video
                        key={draft.homeHeroVideoUrl}
                        src={draft.homeHeroVideoUrl}
                        poster={draft.homeHeroImageUrl || undefined}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover object-center"
                      />
                    ) : draft.homeHeroImageUrl ? (
                      <Image
                        src={draft.homeHeroImageUrl}
                        alt={draft.homeHeroImageAlt || "Home hero preview"}
                        fill
                        sizes="900px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-background/80 font-body text-sm text-muted-foreground">
                        Upload a video for the home-page hero section.
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 font-body text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:border-accent">
                      {uploadingAsset === "homeHeroVideo" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                      Upload Hero Video
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime,video/ogg"
                        className="hidden"
                        onChange={(event) => void handleAssetUpload(event, "homeHeroVideo")}
                      />
                    </label>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 font-body text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:border-accent">
                      {uploadingAsset === "homeHero" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                      Upload Hero Image
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/avif"
                        className="hidden"
                        onChange={(event) => void handleAssetUpload(event, "homeHero")}
                      />
                    </label>
                    <p className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Video is used first. Image remains as poster and fallback.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Fallback Image Alt Text
                    </label>
                    <Input
                      value={draft.homeHeroImageAlt}
                      onChange={(event) => updateDraft("homeHeroImageAlt", event.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Eyebrow
                    </label>
                    <Input
                      value={draft.homeHeroEyebrow}
                      onChange={(event) => updateDraft("homeHeroEyebrow", event.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        Title Line One
                      </label>
                      <Input
                        value={draft.homeHeroTitleLineOne}
                        onChange={(event) => updateDraft("homeHeroTitleLineOne", event.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        Title Line Two
                      </label>
                      <Input
                        value={draft.homeHeroTitleLineTwo}
                        onChange={(event) => updateDraft("homeHeroTitleLineTwo", event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Body Copy
                    </label>
                    <Textarea
                      rows={4}
                      value={draft.homeHeroBody}
                      onChange={(event) => updateDraft("homeHeroBody", event.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        Primary CTA Label
                      </label>
                      <Input
                        value={draft.homeHeroPrimaryCtaLabel}
                        onChange={(event) => updateDraft("homeHeroPrimaryCtaLabel", event.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        Primary CTA Link
                      </label>
                      <Input
                        value={draft.homeHeroPrimaryCtaHref}
                        onChange={(event) => updateDraft("homeHeroPrimaryCtaHref", event.target.value)}
                        placeholder="/portfolio"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        Secondary CTA Label
                      </label>
                      <Input
                        value={draft.homeHeroSecondaryCtaLabel}
                        onChange={(event) => updateDraft("homeHeroSecondaryCtaLabel", event.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        Secondary CTA Link
                      </label>
                      <Input
                        value={draft.homeHeroSecondaryCtaHref}
                        onChange={(event) => updateDraft("homeHeroSecondaryCtaHref", event.target.value)}
                        placeholder="/contact"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Scroll Label
                    </label>
                    <Input
                      value={draft.homeHeroScrollLabel}
                      onChange={(event) => updateDraft("homeHeroScrollLabel", event.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
                <p className="font-display text-2xl text-foreground">Home Our Story</p>
                <p className="mt-1 font-body text-sm text-muted-foreground">
                  Control the home-page Our Story section independently from the About page.
                </p>

                <div className="mt-6 grid gap-5">
                  <div className="relative h-[320px] overflow-hidden rounded-[1.2rem] border border-border bg-background">
                    {draft.homeStoryImageUrl ? (
                      <Image
                        src={draft.homeStoryImageUrl}
                        alt={draft.homeStoryImageAlt || "Home Our Story preview"}
                        fill
                        sizes="900px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-background/80 font-body text-sm text-muted-foreground">
                        Upload an image for the home-page Our Story section.
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 font-body text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:border-accent">
                      {uploadingAsset === "homeStory" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                      Upload Story Image
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/avif"
                        className="hidden"
                        onChange={(event) => void handleAssetUpload(event, "homeStory")}
                      />
                    </label>
                    <p className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Displays in the home-page story split layout
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Story Image Alt Text
                    </label>
                    <Input
                      value={draft.homeStoryImageAlt}
                      onChange={(event) => updateDraft("homeStoryImageAlt", event.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Eyebrow
                    </label>
                    <Input
                      value={draft.homeStoryEyebrow}
                      onChange={(event) => updateDraft("homeStoryEyebrow", event.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Title
                    </label>
                    <Textarea
                      rows={3}
                      value={draft.homeStoryTitle}
                      onChange={(event) => updateDraft("homeStoryTitle", event.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        Primary CTA Label
                      </label>
                      <Input
                        value={draft.homeStoryPrimaryCtaLabel}
                        onChange={(event) => updateDraft("homeStoryPrimaryCtaLabel", event.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        Primary CTA Link
                      </label>
                      <Input
                        value={draft.homeStoryPrimaryCtaHref}
                        onChange={(event) => updateDraft("homeStoryPrimaryCtaHref", event.target.value)}
                        placeholder="/about"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        Secondary CTA Label
                      </label>
                      <Input
                        value={draft.homeStorySecondaryCtaLabel}
                        onChange={(event) => updateDraft("homeStorySecondaryCtaLabel", event.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        Secondary CTA Link
                      </label>
                      <Input
                        value={draft.homeStorySecondaryCtaHref}
                        onChange={(event) => updateDraft("homeStorySecondaryCtaHref", event.target.value)}
                        placeholder="/contact"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-display text-2xl text-foreground">Home Story Paragraphs</p>
                    <p className="mt-1 font-body text-sm text-muted-foreground">
                      Add, remove, and reorder the copy blocks shown in the home-page Our Story section.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addHomeStoryParagraph}
                    className="w-full sm:w-auto"
                  >
                    <Plus className="h-4 w-4" />
                    Add Paragraph
                  </Button>
                </div>

                <div className="mt-6 space-y-4">
                  {draft.homeStoryParagraphs.length ? (
                    draft.homeStoryParagraphs.map((paragraph, index) => (
                      <div
                        key={paragraph.id}
                        className="rounded-[1.15rem] border border-border/70 bg-background/70 p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                            Paragraph {index + 1}
                          </p>
                          <div className="flex items-center gap-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => moveHomeStoryParagraph(index, -1)}
                              disabled={index === 0}
                              className="text-muted-foreground"
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => moveHomeStoryParagraph(index, 1)}
                              disabled={index === draft.homeStoryParagraphs.length - 1}
                              className="text-muted-foreground"
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeHomeStoryParagraph(index)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                            Copy
                          </label>
                          <Textarea
                            rows={5}
                            value={paragraph.body}
                            onChange={(event) => updateHomeStoryParagraph(index, event.target.value)}
                            placeholder="Write the paragraph shown in the home-page Our Story section."
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[1.15rem] border border-dashed border-border bg-background/40 p-5 font-body text-sm text-muted-foreground">
                      No home story paragraphs yet. Add one to populate the home-page section.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-display text-2xl text-foreground">Story Metrics</p>
                    <p className="mt-1 font-body text-sm text-muted-foreground">
                      Edit the small cards shown beside the home-page story content.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addHomeStoryMetric}
                    className="w-full sm:w-auto"
                  >
                    <Plus className="h-4 w-4" />
                    Add Metric
                  </Button>
                </div>

                <div className="mt-6 space-y-4">
                  {draft.homeStoryMetrics.length ? (
                    draft.homeStoryMetrics.map((metric, index) => (
                      <div
                        key={metric.id}
                        className="rounded-[1.15rem] border border-border/70 bg-background/70 p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                            Metric {index + 1}
                          </p>
                          <div className="flex items-center gap-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => moveHomeStoryMetric(index, -1)}
                              disabled={index === 0}
                              className="text-muted-foreground"
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => moveHomeStoryMetric(index, 1)}
                              disabled={index === draft.homeStoryMetrics.length - 1}
                              className="text-muted-foreground"
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeHomeStoryMetric(index)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                              Value
                            </label>
                            <Input
                              value={metric.value}
                              onChange={(event) => updateHomeStoryMetric(index, "value", event.target.value)}
                              placeholder="84"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                              Label
                            </label>
                            <Input
                              value={metric.label}
                              onChange={(event) => updateHomeStoryMetric(index, "label", event.target.value)}
                              placeholder="Projects Delivered"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[1.15rem] border border-dashed border-border bg-background/40 p-5 font-body text-sm text-muted-foreground">
                      No metrics yet. Add one to populate the right-side cards.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
                <p className="font-display text-2xl text-foreground">Home Services Intro</p>
                <p className="mt-1 font-body text-sm text-muted-foreground">
                  Edit the heading and supporting copy for the What We Handle section.
                </p>

                <div className="mt-6 grid gap-4">
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Eyebrow
                    </label>
                    <Input
                      value={draft.homeServicesEyebrow}
                      onChange={(event) => updateDraft("homeServicesEyebrow", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Title
                    </label>
                    <Textarea
                      rows={3}
                      value={draft.homeServicesTitle}
                      onChange={(event) => updateDraft("homeServicesTitle", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Body Copy
                    </label>
                    <Textarea
                      rows={5}
                      value={draft.homeServicesBody}
                      onChange={(event) => updateDraft("homeServicesBody", event.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-display text-2xl text-foreground">Service Highlights</p>
                    <p className="mt-1 font-body text-sm text-muted-foreground">
                      Edit the two compact support cards shown beside the services intro.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addHomeServiceHighlight}
                    className="w-full sm:w-auto"
                  >
                    <Plus className="h-4 w-4" />
                    Add Highlight
                  </Button>
                </div>

                <div className="mt-6 space-y-4">
                  {draft.homeServicesHighlights.length ? (
                    draft.homeServicesHighlights.map((highlight, index) => (
                      <div
                        key={highlight.id}
                        className="rounded-[1.15rem] border border-border/70 bg-background/70 p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                            Highlight {index + 1}
                          </p>
                          <div className="flex items-center gap-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => moveHomeServiceHighlight(index, -1)}
                              disabled={index === 0}
                              className="text-muted-foreground"
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => moveHomeServiceHighlight(index, 1)}
                              disabled={index === draft.homeServicesHighlights.length - 1}
                              className="text-muted-foreground"
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeHomeServiceHighlight(index)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-4 grid gap-4">
                          <div className="space-y-2">
                            <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                              Label
                            </label>
                            <Input
                              value={highlight.label}
                              onChange={(event) => updateHomeServiceHighlight(index, "label", event.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                              Copy
                            </label>
                            <Textarea
                              rows={4}
                              value={highlight.text}
                              onChange={(event) => updateHomeServiceHighlight(index, "text", event.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[1.15rem] border border-dashed border-border bg-background/40 p-5 font-body text-sm text-muted-foreground">
                      No highlights yet. Add one to populate the support cards.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-display text-2xl text-foreground">Home Services</p>
                    <p className="mt-1 font-body text-sm text-muted-foreground">
                      Edit, reorder, and expand the service cards shown in the What We Handle section.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addHomeService}
                    className="w-full sm:w-auto"
                  >
                    <Plus className="h-4 w-4" />
                    Add Service
                  </Button>
                </div>

                <div className="mt-6 space-y-4">
                  {draft.homeServices.length ? (
                    draft.homeServices.map((service, index) => (
                      <div
                        key={service.id}
                        className="rounded-[1.15rem] border border-border/70 bg-background/70 p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                            Service {index + 1}
                          </p>
                          <div className="flex items-center gap-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => moveHomeService(index, -1)}
                              disabled={index === 0}
                              className="text-muted-foreground"
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => moveHomeService(index, 1)}
                              disabled={index === draft.homeServices.length - 1}
                              className="text-muted-foreground"
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeHomeService(index)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="mt-4 grid gap-4">
                          <div className="space-y-2">
                            <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                              Icon
                            </label>
                            <Select
                              value={service.icon}
                              onValueChange={(value) => updateHomeService(index, "icon", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choose an icon" />
                              </SelectTrigger>
                              <SelectContent>
                                {homeServiceIconOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                              Title
                            </label>
                            <Input
                              value={service.title}
                              onChange={(event) => updateHomeService(index, "title", event.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                              Description
                            </label>
                            <Textarea
                              rows={4}
                              value={service.description}
                              onChange={(event) => updateHomeService(index, "description", event.target.value)}
                            />
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-3">
                              <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                                Deliverables
                              </label>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addHomeServiceDeliverable(index)}
                              >
                                <Plus className="h-4 w-4" />
                                Add
                              </Button>
                            </div>
                            <div className="space-y-3">
                              {service.deliverables.length ? (
                                service.deliverables.map((deliverable, deliverableIndex) => (
                                  <div key={`${service.id}-${deliverableIndex}`} className="flex gap-2">
                                    <Input
                                      value={deliverable}
                                      onChange={(event) =>
                                        updateHomeServiceDeliverable(index, deliverableIndex, event.target.value)
                                      }
                                      placeholder="Deliverable"
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removeHomeServiceDeliverable(index, deliverableIndex)}
                                      className="shrink-0 text-muted-foreground hover:text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))
                              ) : (
                                <div className="rounded-[1rem] border border-dashed border-border bg-background/30 p-3 font-body text-sm text-muted-foreground">
                                  No deliverables yet. Add one to populate the service tags.
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[1.15rem] border border-dashed border-border bg-background/40 p-5 font-body text-sm text-muted-foreground">
                      No services yet. Add one to populate the What We Handle cards.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="about" className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
            <div className="space-y-6">
              <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
                <p className="font-display text-2xl text-foreground">About Hero</p>
                <p className="mt-1 font-body text-sm text-muted-foreground">
                  Control the main title, subtitle, and hero image at the top of the About page.
                </p>
                <div className="mt-6 grid gap-5">
                  <div className="relative h-56 overflow-hidden rounded-[1.2rem] border border-border bg-background">
                    {draft.aboutHeroImageUrl ? (
                      <Image
                        src={draft.aboutHeroImageUrl}
                        alt={draft.aboutHeroTitle || "About hero preview"}
                        fill
                        sizes="900px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-background/80 font-body text-sm text-muted-foreground">
                        Upload a hero image to replace the default About visual.
                      </div>
                    )}
                  </div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 font-body text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:border-accent">
                    {uploadingAsset === "aboutHero" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                    Upload Hero Image
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/avif"
                      className="hidden"
                      onChange={(event) => void handleAssetUpload(event, "aboutHero")}
                    />
                  </label>
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Hero Title
                    </label>
                    <Input
                      value={draft.aboutHeroTitle}
                      onChange={(event) => updateDraft("aboutHeroTitle", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Hero Subtitle
                    </label>
                    <Textarea
                      rows={3}
                      value={draft.aboutHeroSubtitle}
                      onChange={(event) => updateDraft("aboutHeroSubtitle", event.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
                <p className="font-display text-2xl text-foreground">Left Column Story</p>
                <p className="mt-1 font-body text-sm text-muted-foreground">
                  This controls the portrait above “Our Story” and every paragraph rendered in the left column.
                </p>
                <div className="mt-6 grid gap-5">
                  <div className="relative h-[360px] overflow-hidden rounded-[1.2rem] border border-border bg-background">
                    {draft.aboutPortraitUrl ? (
                      <Image
                        src={draft.aboutPortraitUrl}
                        alt={draft.aboutPortraitAlt || "Portrait preview"}
                        fill
                        sizes="700px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-background/80 font-body text-sm text-muted-foreground">
                        Upload a portrait photo to show above the story text.
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 font-body text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:border-accent">
                      {uploadingAsset === "aboutPortrait" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                      Upload Portrait
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/avif"
                        className="hidden"
                        onChange={(event) => void handleAssetUpload(event, "aboutPortrait")}
                      />
                    </label>
                    <p className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Displays above “Our Story” on the public page
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Portrait Alt Text
                    </label>
                    <Input
                      value={draft.aboutPortraitAlt}
                      onChange={(event) => updateDraft("aboutPortraitAlt", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Story Title
                    </label>
                    <Input
                      value={draft.aboutStoryTitle}
                      onChange={(event) => updateDraft("aboutStoryTitle", event.target.value)}
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                          Story Paragraphs
                        </p>
                        <p className="mt-1 font-body text-sm text-muted-foreground">
                          Add, remove, and reorder the copy blocks in the left column.
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addStoryParagraph}
                        className="w-full sm:w-auto"
                      >
                        <Plus className="h-4 w-4" />
                        Add Paragraph
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {draft.aboutStoryParagraphs.length ? (
                        draft.aboutStoryParagraphs.map((paragraph, index) => (
                          <div
                            key={paragraph.id}
                            className="rounded-[1.15rem] border border-border/70 bg-background/70 p-4"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <p className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                                Paragraph {index + 1}
                              </p>
                              <div className="flex items-center gap-1">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => moveStoryParagraph(index, -1)}
                                  disabled={index === 0}
                                  className="text-muted-foreground"
                                >
                                  <ArrowUp className="h-4 w-4" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => moveStoryParagraph(index, 1)}
                                  disabled={index === draft.aboutStoryParagraphs.length - 1}
                                  className="text-muted-foreground"
                                >
                                  <ArrowDown className="h-4 w-4" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeStoryParagraph(index)}
                                  className="text-muted-foreground hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="mt-4 space-y-2">
                              <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                                Copy
                              </label>
                              <Textarea
                                rows={5}
                                value={paragraph.body}
                                onChange={(event) => updateStoryParagraph(index, event.target.value)}
                                placeholder="Write the paragraph shown in the left About column."
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-[1.15rem] border border-dashed border-border bg-background/40 p-5 font-body text-sm text-muted-foreground">
                          No story paragraphs yet. Add one to populate the left column under “Our Story”.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
                <p className="font-display text-2xl text-foreground">Mission & Vision</p>
                <p className="mt-1 font-body text-sm text-muted-foreground">
                  This controls the section shown between the About story and the studio stats.
                </p>
                <div className="mt-6 grid gap-5">
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Section Eyebrow
                    </label>
                    <Input
                      value={draft.aboutMissionVisionEyebrow}
                      onChange={(event) =>
                        updateDraft("aboutMissionVisionEyebrow", event.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Section Title
                    </label>
                    <Input
                      value={draft.aboutMissionVisionTitle}
                      onChange={(event) =>
                        updateDraft("aboutMissionVisionTitle", event.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Section Body
                    </label>
                    <Textarea
                      rows={5}
                      value={draft.aboutMissionVisionBody}
                      onChange={(event) =>
                        updateDraft("aboutMissionVisionBody", event.target.value)
                      }
                    />
                  </div>
                  <div className="grid gap-5 lg:grid-cols-2">
                    <div className="rounded-[1.15rem] border border-border/70 bg-background/70 p-4">
                      <div className="space-y-2">
                        <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                          Mission Title
                        </label>
                        <Input
                          value={draft.aboutMissionTitle}
                          onChange={(event) => updateDraft("aboutMissionTitle", event.target.value)}
                        />
                      </div>
                      <div className="mt-4 space-y-2">
                        <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                          Mission Body
                        </label>
                        <Textarea
                          rows={5}
                          value={draft.aboutMissionBody}
                          onChange={(event) => updateDraft("aboutMissionBody", event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="rounded-[1.15rem] border border-border/70 bg-background/70 p-4">
                      <div className="space-y-2">
                        <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                          Vision Title
                        </label>
                        <Input
                          value={draft.aboutVisionTitle}
                          onChange={(event) => updateDraft("aboutVisionTitle", event.target.value)}
                        />
                      </div>
                      <div className="mt-4 space-y-2">
                        <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                          Vision Body
                        </label>
                        <Textarea
                          rows={5}
                          value={draft.aboutVisionBody}
                          onChange={(event) => updateDraft("aboutVisionBody", event.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-display text-2xl text-foreground">Right Grid Cards</p>
                    <p className="mt-1 font-body text-sm text-muted-foreground">
                      Add, remove, reorder, and edit the cards shown in the right-side About grid.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addAboutStat}
                    className="w-full sm:w-auto"
                  >
                    <Plus className="h-4 w-4" />
                    Add Grid Card
                  </Button>
                </div>

                <div className="mt-6 space-y-4">
                  {draft.aboutStats.length ? (
                    draft.aboutStats.map((stat, index) => (
                      <div
                        key={stat.id}
                        className="rounded-[1.15rem] border border-border/70 bg-background/70 p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                            Card {index + 1}
                          </p>
                          <div className="flex items-center gap-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => moveAboutStat(index, -1)}
                              disabled={index === 0}
                              className="text-muted-foreground"
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => moveAboutStat(index, 1)}
                              disabled={index === draft.aboutStats.length - 1}
                              className="text-muted-foreground"
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeAboutStat(index)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-4 grid gap-4">
                          <div className="space-y-2">
                            <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                              Icon
                            </label>
                            <Select
                              value={stat.icon}
                              onValueChange={(value) =>
                                updateAboutStat(index, "icon", value as AboutStatIcon)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select icon" />
                              </SelectTrigger>
                              <SelectContent>
                                {aboutIconOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                              Title
                            </label>
                            <Input
                              value={stat.title}
                              onChange={(event) => updateAboutStat(index, "title", event.target.value)}
                              placeholder="150+"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                              Description
                            </label>
                            <Textarea
                              rows={3}
                              value={stat.description}
                              onChange={(event) =>
                                updateAboutStat(index, "description", event.target.value)
                              }
                              placeholder="Projects completed"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[1.15rem] border border-dashed border-border bg-background/40 p-5 font-body text-sm text-muted-foreground">
                      No right-side cards yet. Add one to populate the About grid.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
                <p className="font-display text-2xl text-foreground">Philosophy Block</p>
                <div className="mt-6 space-y-5">
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Section Title
                    </label>
                    <Input
                      value={draft.aboutPhilosophyTitle}
                      onChange={(event) => updateDraft("aboutPhilosophyTitle", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Quote
                    </label>
                    <Textarea
                      rows={5}
                      value={draft.aboutPhilosophyQuote}
                      onChange={(event) => updateDraft("aboutPhilosophyQuote", event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Attribution
                    </label>
                    <Input
                      value={draft.aboutPhilosophyAttribution}
                      onChange={(event) => updateDraft("aboutPhilosophyAttribution", event.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-stretch sm:justify-end">
        <Button
          type="button"
          onClick={() => void handleSave()}
          disabled={isSaving}
          className="w-full bg-gradient-gold text-cream hover:opacity-95 sm:w-auto"
        >
          {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
          Save Settings
        </Button>
      </div>
    </div>
  );
}
