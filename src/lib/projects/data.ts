import type { StaticImageData } from "next/image";

import heroImage from "@/assets/hero-interior.jpg";
import aboutTeamImage from "@/assets/about-team.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

export const projectCategories = [
  "Residential",
  "Commercial",
  "Hospitality",
] as const;

export const projectStatusOptions = [
  "Planning",
  "In Progress",
  "Completed",
] as const;

export const projectMediaBucket = "project-media";

export type ProjectCategory = (typeof projectCategories)[number];
export type ProjectStatus = (typeof projectStatusOptions)[number];
export type ProjectImageSource = string | StaticImageData;

export type ProjectImage = {
  id: string;
  imageUrl: ProjectImageSource;
  altText: string;
  caption: string;
  sortOrder: number;
  isCover: boolean;
  storagePath: string | null;
};

export type ProjectRecord = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  clientName: string;
  summary: string;
  description: string;
  narrativeEyebrow: string;
  narrativeTitle: string;
  narrativeHighlight: string;
  detailStatusLabel: string;
  detailStatusTitle: string;
  detailStatusDescription: string;
  completionYear: number;
  status: ProjectStatus;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  coverImageUrl: ProjectImageSource;
  images: ProjectImage[];
};

export function resolveProjectImageUrl(source: ProjectImageSource) {
  return typeof source === "string" ? source : source.src;
}

export const defaultProjectNarrativeEyebrow = "Project Narrative";
export const defaultProjectNarrativeTitle = "Designed with atmosphere,";
export const defaultProjectNarrativeHighlight = "clarity, and detail.";
export const defaultProjectDetailStatusLabel = "Project Status";
export const defaultProjectDetailStatusDescription =
  "This page is structured to support full galleries, descriptive storytelling, and premium project presentation for both editorial browsing and client review.";

function sortImages(images: ProjectImage[]) {
  return [...images].sort((left, right) => {
    if (left.isCover !== right.isCover) {
      return left.isCover ? -1 : 1;
    }

    return left.sortOrder - right.sortOrder;
  });
}

function withImages(
  project: Omit<ProjectRecord, "images" | "coverImageUrl"> & {
    coverImageUrl?: ProjectImageSource;
    images: ProjectImage[];
  },
): ProjectRecord {
  const images = sortImages(project.images);
  const coverImageUrl =
    project.coverImageUrl ??
    images.find((image) => image.isCover)?.imageUrl ??
    images[0]?.imageUrl ??
    heroImage;

  return {
    ...project,
    narrativeEyebrow: project.narrativeEyebrow || defaultProjectNarrativeEyebrow,
    narrativeTitle: project.narrativeTitle || defaultProjectNarrativeTitle,
    narrativeHighlight: project.narrativeHighlight || defaultProjectNarrativeHighlight,
    detailStatusLabel: project.detailStatusLabel || defaultProjectDetailStatusLabel,
    detailStatusTitle: project.detailStatusTitle || project.status,
    detailStatusDescription:
      project.detailStatusDescription || defaultProjectDetailStatusDescription,
    coverImageUrl,
    images,
  };
}

export const fallbackProjects: ProjectRecord[] = [
  withImages({
    id: "fallback-serene-retreat",
    slug: "serene-retreat",
    title: "Serene Retreat",
    category: "Residential",
    location: "Manhattan, NY",
    clientName: "Private Residence",
    summary:
      "A dark, cocooning bedroom suite layered with bronze lighting, custom millwork, and tactile natural finishes.",
    description:
      "Serene Retreat was conceived as a private sanctuary above the rhythm of Manhattan. MBM Designs reworked the suite around a restrained architectural palette, balancing smoked oak, matte plaster, aged brass, and low-glow lighting to create a quiet sense of depth. The result is intimate, editorial, and deeply livable, with every surface calibrated for calm.",
    narrativeEyebrow: "Project Narrative",
    narrativeTitle: "Designed with atmosphere,",
    narrativeHighlight: "clarity, and detail.",
    detailStatusLabel: "Project Status",
    detailStatusTitle: "Completed",
    detailStatusDescription:
      "A layered private suite resolved around quiet luxury, warm metals, and a fully composed residential experience.",
    completionYear: 2025,
    status: "Completed",
    featured: true,
    published: true,
    sortOrder: 10,
    images: [
      {
        id: "fallback-serene-retreat-cover",
        imageUrl: portfolio1,
        altText: "Primary bedroom with sculpted dark millwork and amber bedside lighting",
        caption: "Primary suite composition with bespoke millwork and layered textile styling.",
        sortOrder: 0,
        isCover: true,
        storagePath: null,
      },
      {
        id: "fallback-serene-retreat-2",
        imageUrl: heroImage,
        altText: "Luxury interior lounge with warm bronze lighting",
        caption: "A tonal lounge vignette that informed the bedroom's material direction.",
        sortOrder: 1,
        isCover: false,
        storagePath: null,
      },
      {
        id: "fallback-serene-retreat-3",
        imageUrl: aboutTeamImage,
        altText: "Studio concept board presentation for a luxury residential project",
        caption: "Early concept development focused on atmosphere, texture, and silence.",
        sortOrder: 2,
        isCover: false,
        storagePath: null,
      },
    ],
  }),
  withImages({
    id: "fallback-modern-elegance",
    slug: "modern-elegance",
    title: "Modern Elegance",
    category: "Residential",
    location: "Brooklyn, NY",
    clientName: "Townhouse Renovation",
    summary:
      "A refined kitchen defined by veined stone, satin brass accents, and a cinematic lighting composition.",
    description:
      "Modern Elegance transforms the kitchen into a social and sculptural centerpiece. MBM Designs paired monolithic stone surfaces with softened lighting and precision cabinetry, producing a space that feels both dramatic and effortless. Every detail was tuned for hospitality at home, from the pendants' warm glow to the disciplined material rhythm across the island and back wall.",
    narrativeEyebrow: "Project Narrative",
    narrativeTitle: "Composed with restraint,",
    narrativeHighlight: "warmth, and precision.",
    detailStatusLabel: "Project Status",
    detailStatusTitle: "Completed",
    detailStatusDescription:
      "A residential kitchen and dining sequence calibrated for social flow, hospitality, and sculptural clarity.",
    completionYear: 2024,
    status: "Completed",
    featured: true,
    published: true,
    sortOrder: 20,
    images: [
      {
        id: "fallback-modern-elegance-cover",
        imageUrl: portfolio2,
        altText: "Luxury kitchen with pendant lighting and black stone island",
        caption: "The central island anchors the space with contrast, scale, and warm metal accents.",
        sortOrder: 0,
        isCover: true,
        storagePath: null,
      },
      {
        id: "fallback-modern-elegance-2",
        imageUrl: portfolio5,
        altText: "Dark dining space with layered lighting and hospitality mood",
        caption: "Adjacent entertaining zone designed to extend the kitchen's evening atmosphere.",
        sortOrder: 1,
        isCover: false,
        storagePath: null,
      },
      {
        id: "fallback-modern-elegance-3",
        imageUrl: heroImage,
        altText: "Editorial luxury interior with warm accent lighting",
        caption: "The project language balances restraint, warmth, and contemporary polish.",
        sortOrder: 2,
        isCover: false,
        storagePath: null,
      },
    ],
  }),
  withImages({
    id: "fallback-warm-sanctuary",
    slug: "warm-sanctuary",
    title: "Warm Sanctuary",
    category: "Hospitality",
    location: "Westchester, NY",
    clientName: "Boutique Wellness Suite",
    summary:
      "A spa-like bathing room grounded in stone, candlelight, and a highly atmospheric hospitality mood.",
    description:
      "Warm Sanctuary brings hospitality-grade immersion into a private wellness setting. MBM Designs used textured stone, smoked bronze fixtures, and carefully concealed lighting to produce a space that feels restorative and cinematic. The room was designed to slow time down, with every proportion, reflection, and accent light calibrated for ritual rather than routine.",
    narrativeEyebrow: "Project Narrative",
    narrativeTitle: "Built for ritual,",
    narrativeHighlight: "immersion, and calm.",
    detailStatusLabel: "Project Status",
    detailStatusTitle: "Completed",
    detailStatusDescription:
      "A wellness-focused interior shaped around stillness, tactile stonework, and a cinematic low-light atmosphere.",
    completionYear: 2025,
    status: "Completed",
    featured: true,
    published: true,
    sortOrder: 30,
    images: [
      {
        id: "fallback-warm-sanctuary-cover",
        imageUrl: portfolio3,
        altText: "Freestanding bath with candles and dark stone backdrop",
        caption: "The suite's hero moment frames ritual, stillness, and warm metallic contrast.",
        sortOrder: 0,
        isCover: true,
        storagePath: null,
      },
      {
        id: "fallback-warm-sanctuary-2",
        imageUrl: portfolio6,
        altText: "Hospitality lounge with artisanal materials and moody lighting",
        caption: "Supporting lounge spaces carry the same tonal richness and low-light atmosphere.",
        sortOrder: 1,
        isCover: false,
        storagePath: null,
      },
      {
        id: "fallback-warm-sanctuary-3",
        imageUrl: portfolio2,
        altText: "Kitchen detail with bronze fixtures and dark surfaces",
        caption: "Bronze detailing repeats across wet areas to unify the guest experience.",
        sortOrder: 2,
        isCover: false,
        storagePath: null,
      },
    ],
  }),
  withImages({
    id: "fallback-executive-suite",
    slug: "executive-suite",
    title: "Executive Suite",
    category: "Commercial",
    location: "Midtown, NY",
    clientName: "Private Office",
    summary:
      "A restrained executive environment blending tailored comfort with gallery-like material clarity.",
    description:
      "Executive Suite was designed for a client who wanted precision without coldness. MBM Designs treated the space as a sequence of calm, high-performing zones, balancing architectural discipline with tactile finishes and discreet warm lighting. The result feels authoritative, polished, and highly usable for both focused work and client hosting.",
    narrativeEyebrow: "Project Narrative",
    narrativeTitle: "Shaped for focus,",
    narrativeHighlight: "authority, and ease.",
    detailStatusLabel: "Project Status",
    detailStatusTitle: "Completed",
    detailStatusDescription:
      "A commercial environment designed to support concentrated work, client hosting, and a refined executive presence.",
    completionYear: 2024,
    status: "Completed",
    featured: false,
    published: true,
    sortOrder: 40,
    images: [
      {
        id: "fallback-executive-suite-cover",
        imageUrl: portfolio4,
        altText: "Executive commercial interior with layered lighting",
        caption: "A commercial workspace shaped around quiet authority and material depth.",
        sortOrder: 0,
        isCover: true,
        storagePath: null,
      },
      {
        id: "fallback-executive-suite-2",
        imageUrl: aboutTeamImage,
        altText: "Design team reviewing project presentations",
        caption: "Programming and workflow studies informed every spatial decision.",
        sortOrder: 1,
        isCover: false,
        storagePath: null,
      },
      {
        id: "fallback-executive-suite-3",
        imageUrl: portfolio6,
        altText: "Commercial lounge with warm low-level lighting",
        caption: "Hospitality-inspired lounge moments soften the workspace experience.",
        sortOrder: 2,
        isCover: false,
        storagePath: null,
      },
    ],
  }),
  withImages({
    id: "fallback-grand-dining",
    slug: "grand-dining",
    title: "Grand Dining",
    category: "Hospitality",
    location: "SoHo, NY",
    clientName: "Signature Restaurant",
    summary:
      "A richly layered dining environment designed around intimacy, glow, and high-end guest flow.",
    description:
      "Grand Dining is built around contrast: shadow and warmth, solidity and softness, spectacle and comfort. MBM Designs choreographed the room to feel immersive from arrival through service, using low ambient light, reflective bronze notes, and sculptural furniture placement to heighten the guest journey while preserving visual calm.",
    narrativeEyebrow: "Project Narrative",
    narrativeTitle: "Created for intimacy,",
    narrativeHighlight: "glow, and rhythm.",
    detailStatusLabel: "Project Status",
    detailStatusTitle: "Completed",
    detailStatusDescription:
      "A hospitality project engineered around guest flow, ambient drama, and a memorable arrival-to-service journey.",
    completionYear: 2025,
    status: "Completed",
    featured: false,
    published: true,
    sortOrder: 50,
    images: [
      {
        id: "fallback-grand-dining-cover",
        imageUrl: portfolio5,
        altText: "Hospitality dining space with moody lighting and elegant surfaces",
        caption: "Dining zones are layered to feel intimate while still visually expansive.",
        sortOrder: 0,
        isCover: true,
        storagePath: null,
      },
      {
        id: "fallback-grand-dining-2",
        imageUrl: portfolio3,
        altText: "Luxury bathing space with candlelit atmosphere",
        caption: "The same wellness-led lighting language appears in lounge restrooms and suites.",
        sortOrder: 1,
        isCover: false,
        storagePath: null,
      },
      {
        id: "fallback-grand-dining-3",
        imageUrl: heroImage,
        altText: "Interior design hero image with layered ambient light",
        caption: "The arrival sequence was designed to establish the restaurant's visual tone immediately.",
        sortOrder: 2,
        isCover: false,
        storagePath: null,
      },
    ],
  }),
  withImages({
    id: "fallback-artisan-lounge",
    slug: "artisan-lounge",
    title: "Artisan Lounge",
    category: "Commercial",
    location: "Tribeca, NY",
    clientName: "Private Members Club",
    summary:
      "A social club interior mixing crafted stone, bronze highlights, and softly theatrical evening light.",
    description:
      "Artisan Lounge rethinks the members club as an edited, hospitality-driven social space. MBM Designs built the interior around conversation zones, long sightlines, and intimate pools of light. Materially, the space leans into stone, smoked glass, and warm metal to create a setting that feels curated rather than crowded.",
    narrativeEyebrow: "Project Narrative",
    narrativeTitle: "Curated for connection,",
    narrativeHighlight: "tone, and depth.",
    detailStatusLabel: "Project Status",
    detailStatusTitle: "Completed",
    detailStatusDescription:
      "A members-space concept balancing social energy with editorial restraint and materially rich hospitality cues.",
    completionYear: 2024,
    status: "Completed",
    featured: false,
    published: true,
    sortOrder: 60,
    images: [
      {
        id: "fallback-artisan-lounge-cover",
        imageUrl: portfolio6,
        altText: "Members lounge with crafted materials and moody lighting",
        caption: "The main lounge balances artisanal richness with clean contemporary geometry.",
        sortOrder: 0,
        isCover: true,
        storagePath: null,
      },
      {
        id: "fallback-artisan-lounge-2",
        imageUrl: portfolio4,
        altText: "Commercial suite with gallery-like atmosphere",
        caption: "Supporting spaces keep the palette disciplined while varying the mood.",
        sortOrder: 1,
        isCover: false,
        storagePath: null,
      },
      {
        id: "fallback-artisan-lounge-3",
        imageUrl: portfolio1,
        altText: "Dark bedroom interior with sculptural lighting",
        caption: "Private retreat rooms extend the same low-light, tactile design language.",
        sortOrder: 2,
        isCover: false,
        storagePath: null,
      },
    ],
  }),
];

export function slugifyProjectTitle(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function isProjectCategory(value: string): value is ProjectCategory {
  return projectCategories.includes(value as ProjectCategory);
}

export function isProjectStatus(value: string): value is ProjectStatus {
  return projectStatusOptions.includes(value as ProjectStatus);
}
