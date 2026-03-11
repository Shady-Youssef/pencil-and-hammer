"use client";

import {
  ExternalLink,
  Eye,
  ImagePlus,
  Loader2,
  Plus,
  Save,
  Search,
  Star,
  Trash2,
  Upload,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import ProjectPreviewDialog from "@/components/admin/ProjectPreviewDialog";
import { useAuth } from "@/components/auth/auth-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  defaultProjectDetailStatusDescription,
  defaultProjectDetailStatusLabel,
  defaultProjectNarrativeEyebrow,
  defaultProjectNarrativeHighlight,
  defaultProjectNarrativeTitle,
  fallbackProjects,
  projectCategories,
  projectMediaBucket,
  projectStatusOptions,
  resolveProjectImageUrl,
  slugifyProjectTitle,
  type ProjectCategory,
  type ProjectRecord,
  type ProjectStatus,
} from "@/lib/projects/data";

const projectSelect = `
  id,
  slug,
  title,
  category,
  location,
  client_name,
  summary,
  description,
  narrative_eyebrow,
  narrative_title,
  narrative_highlight,
  detail_status_label,
  detail_status_title,
  detail_status_description,
  completion_year,
  status,
  featured,
  published,
  sort_order,
  cover_image_url,
  project_images (
    id,
    image_url,
    storage_path,
    alt_text,
    caption,
    sort_order,
    is_cover
  )
`;

type ProjectImageDraft = {
  id: string;
  imageUrl: string;
  altText: string;
  caption: string;
  sortOrder: number;
  isCover: boolean;
  storagePath: string | null;
};

type ProjectDraft = {
  id: string | null;
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
  completionYear: string;
  status: ProjectStatus;
  featured: boolean;
  published: boolean;
  sortOrder: string;
  coverImageUrl: string;
  images: ProjectImageDraft[];
};

type ProjectManagerProps = {
  initialProjects: ProjectRecord[];
  initialError: string | null;
};

type ProjectImageRow = {
  id: string;
  image_url: string;
  storage_path: string | null;
  alt_text: string | null;
  caption: string | null;
  sort_order: number | null;
  is_cover: boolean | null;
};

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string | null;
  client_name: string | null;
  summary: string | null;
  description: string | null;
  narrative_eyebrow: string | null;
  narrative_title: string | null;
  narrative_highlight: string | null;
  detail_status_label: string | null;
  detail_status_title: string | null;
  detail_status_description: string | null;
  completion_year: number | null;
  status: string | null;
  featured: boolean | null;
  published: boolean | null;
  sort_order: number | null;
  cover_image_url: string | null;
  project_images: ProjectImageRow[] | null;
};

type VisibilityFilter = "all" | "published" | "hidden";
type EditorTab = "overview" | "story" | "gallery";

function normalizeProject(row: ProjectRow): ProjectRecord {
  const images = [...(row.project_images ?? [])]
    .map((image) => ({
      id: image.id,
      imageUrl: image.image_url,
      altText: image.alt_text ?? row.title,
      caption: image.caption ?? "",
      sortOrder: image.sort_order ?? 0,
      isCover: image.is_cover ?? false,
      storagePath: image.storage_path,
    }))
    .sort((left, right) => {
      if (left.isCover !== right.isCover) {
        return left.isCover ? -1 : 1;
      }

      return left.sortOrder - right.sortOrder;
    });

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: projectCategories.includes(row.category as ProjectCategory)
      ? (row.category as ProjectCategory)
      : "Residential",
    location: row.location ?? "",
    clientName: row.client_name ?? "",
    summary: row.summary ?? "",
    description: row.description ?? "",
    narrativeEyebrow: row.narrative_eyebrow ?? defaultProjectNarrativeEyebrow,
    narrativeTitle: row.narrative_title ?? defaultProjectNarrativeTitle,
    narrativeHighlight: row.narrative_highlight ?? defaultProjectNarrativeHighlight,
    detailStatusLabel: row.detail_status_label ?? defaultProjectDetailStatusLabel,
    detailStatusTitle:
      row.detail_status_title ??
      (projectStatusOptions.includes(row.status as ProjectStatus)
        ? (row.status as ProjectStatus)
        : "Completed"),
    detailStatusDescription:
      row.detail_status_description ?? defaultProjectDetailStatusDescription,
    completionYear: row.completion_year ?? new Date().getFullYear(),
    status: projectStatusOptions.includes(row.status as ProjectStatus)
      ? (row.status as ProjectStatus)
      : "Completed",
    featured: row.featured ?? false,
    published: row.published ?? false,
    sortOrder: row.sort_order ?? 0,
    coverImageUrl:
      row.cover_image_url ??
      images.find((image) => image.isCover)?.imageUrl ??
      images[0]?.imageUrl ??
      "",
    images,
  };
}

function sortProjects(projects: ProjectRecord[]) {
  return [...projects].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1;
    }

    if (left.sortOrder !== right.sortOrder) {
      return left.sortOrder - right.sortOrder;
    }

    return left.title.localeCompare(right.title);
  });
}

function isFallbackProjectId(id: string | null) {
  return !!id && id.startsWith("fallback-");
}

function getNextProjectSortOrder(projects: ProjectRecord[]) {
  return String((projects.length ? Math.max(...projects.map((project) => project.sortOrder)) : 0) + 10);
}

function createEmptyDraft(sortOrder = "100"): ProjectDraft {
  return {
    id: null,
    slug: "",
    title: "",
    category: "Residential",
    location: "",
    clientName: "",
    summary: "",
    description: "",
    narrativeEyebrow: defaultProjectNarrativeEyebrow,
    narrativeTitle: defaultProjectNarrativeTitle,
    narrativeHighlight: defaultProjectNarrativeHighlight,
    detailStatusLabel: defaultProjectDetailStatusLabel,
    detailStatusTitle: "Completed",
    detailStatusDescription: defaultProjectDetailStatusDescription,
    completionYear: String(new Date().getFullYear()),
    status: "Completed",
    featured: false,
    published: true,
    sortOrder,
    coverImageUrl: "",
    images: [],
  };
}

function toDraft(project: ProjectRecord): ProjectDraft {
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    category: project.category,
    location: project.location,
    clientName: project.clientName,
    summary: project.summary,
    description: project.description,
    narrativeEyebrow: project.narrativeEyebrow,
    narrativeTitle: project.narrativeTitle,
    narrativeHighlight: project.narrativeHighlight,
    detailStatusLabel: project.detailStatusLabel,
    detailStatusTitle: project.detailStatusTitle,
    detailStatusDescription: project.detailStatusDescription,
    completionYear: String(project.completionYear),
    status: project.status,
    featured: project.featured,
    published: project.published,
    sortOrder: String(project.sortOrder),
    coverImageUrl: resolveProjectImageUrl(project.coverImageUrl),
    images: project.images.map((image) => ({
      id: image.id,
      imageUrl: resolveProjectImageUrl(image.imageUrl),
      altText: image.altText,
      caption: image.caption,
      sortOrder: image.sortOrder,
      isCover: image.isCover,
      storagePath: image.storagePath,
    })),
  };
}

function getStatusVariant(status: ProjectStatus) {
  switch (status) {
    case "Completed":
      return "default";
    case "In Progress":
      return "secondary";
    default:
      return "outline";
  }
}

function sanitizeFileName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildPreviewProject(draft: ProjectDraft): ProjectRecord {
  const title = draft.title.trim() || "Untitled Project";
  const slug = draft.slug.trim() || slugifyProjectTitle(title) || "project-preview";
  const cleanImages = draft.images
    .filter((image) => image.imageUrl.trim())
    .map((image) => ({
      ...image,
      imageUrl: image.imageUrl.trim(),
      altText: image.altText.trim() || title,
      caption: image.caption.trim(),
    }))
    .sort((left, right) => {
      if (left.isCover !== right.isCover) {
        return left.isCover ? -1 : 1;
      }

      return left.sortOrder - right.sortOrder;
    });
  const coverImageUrl =
    draft.coverImageUrl.trim() ||
    cleanImages.find((image) => image.isCover)?.imageUrl ||
    cleanImages[0]?.imageUrl ||
    resolveProjectImageUrl(fallbackProjects[0].coverImageUrl);
  const images =
    cleanImages.length > 0
      ? cleanImages
      : [
          {
            id: "preview-cover",
            imageUrl: coverImageUrl,
            altText: title,
            caption: "Preview cover image",
            sortOrder: 0,
            isCover: true,
            storagePath: null,
          },
        ];

  return {
    id: draft.id ?? "preview-project",
    slug,
    title,
    category: draft.category,
    location: draft.location.trim(),
    clientName: draft.clientName.trim(),
    summary:
      draft.summary.trim() ||
      "A short project summary will appear here in the portfolio card and detail intro.",
    description:
      draft.description.trim() ||
      "The full project story will appear here. Use this area to explain the concept, materials, atmosphere, and outcome.",
    narrativeEyebrow: draft.narrativeEyebrow.trim() || defaultProjectNarrativeEyebrow,
    narrativeTitle: draft.narrativeTitle.trim() || defaultProjectNarrativeTitle,
    narrativeHighlight: draft.narrativeHighlight.trim() || defaultProjectNarrativeHighlight,
    detailStatusLabel: draft.detailStatusLabel.trim() || defaultProjectDetailStatusLabel,
    detailStatusTitle: draft.detailStatusTitle.trim() || draft.status,
    detailStatusDescription:
      draft.detailStatusDescription.trim() || defaultProjectDetailStatusDescription,
    completionYear: Number(draft.completionYear) || new Date().getFullYear(),
    status: draft.status,
    featured: draft.featured,
    published: draft.published,
    sortOrder: Number(draft.sortOrder) || 0,
    coverImageUrl,
    images,
  };
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
      {children}
    </label>
  );
}

function StatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: number;
  helper: string;
}) {
  return (
    <div className="rounded-[1.25rem] border border-border bg-card p-5">
      <p className="font-body text-xs uppercase tracking-[0.28em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-3 font-display text-4xl text-foreground">{value}</p>
      <p className="mt-2 font-body text-sm text-muted-foreground">{helper}</p>
    </div>
  );
}

export default function ProjectManager({
  initialProjects,
  initialError,
}: ProjectManagerProps) {
  const { client } = useAuth();
  const starterProjects = initialProjects.length ? initialProjects : fallbackProjects;
  const [projects, setProjects] = useState(() => sortProjects(starterProjects));
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    starterProjects[0]?.id ?? null,
  );
  const [draft, setDraft] = useState<ProjectDraft>(
    starterProjects[0] ? toDraft(starterProjects[0]) : createEmptyDraft(getNextProjectSortOrder(starterProjects)),
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTargetId, setUploadTargetId] = useState<string | "new" | null>(null);
  const [hasAttemptedSeed, setHasAttemptedSeed] = useState(initialProjects.length > 0);
  const [removedImages, setRemovedImages] = useState<ProjectImageDraft[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [visibilityFilter, setVisibilityFilter] = useState<VisibilityFilter>("all");
  const [activeTab, setActiveTab] = useState<EditorTab>("overview");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const editorSectionRef = useRef<HTMLDivElement | null>(null);

  const hasPersistedProjects = useMemo(
    () => projects.some((project) => !isFallbackProjectId(project.id)),
    [projects],
  );
  const publishedCount = useMemo(
    () => projects.filter((project) => project.published).length,
    [projects],
  );
  const featuredCount = useMemo(
    () => projects.filter((project) => project.featured).length,
    [projects],
  );
  const hiddenCount = useMemo(
    () => projects.filter((project) => !project.published).length,
    [projects],
  );
  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [projects, selectedProjectId],
  );
  const baselineDraft = useMemo(
    () =>
      selectedProject
        ? toDraft(selectedProject)
        : createEmptyDraft(getNextProjectSortOrder(projects)),
    [projects, selectedProject],
  );
  const hasUnsavedChanges = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(baselineDraft),
    [baselineDraft, draft],
  );
  const previewProject = useMemo(() => buildPreviewProject(draft), [draft]);
  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesQuery =
        !query ||
        [
          project.title,
          project.slug,
          project.location,
          project.clientName,
          project.summary,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesStatus = statusFilter === "all" || project.status === statusFilter;
      const matchesVisibility =
        visibilityFilter === "all" ||
        (visibilityFilter === "published" ? project.published : !project.published);

      return matchesQuery && matchesStatus && matchesVisibility;
    });
  }, [projects, searchQuery, statusFilter, visibilityFilter]);
  const publicPageHref = draft.published && previewProject.slug
    ? `/portfolio/${previewProject.slug}`
    : null;
  const activeTabLabel = useMemo(() => {
    switch (activeTab) {
      case "story":
        return "Story & Status";
      case "gallery":
        return "Gallery";
      default:
        return "Overview";
    }
  }, [activeTab]);

  const refreshProjects = useCallback(async (nextSelectedId?: string | null) => {
    const { data, error } = await client.from("projects").select(projectSelect);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    const nextProjects = (data as ProjectRow[]).length
      ? sortProjects((data as ProjectRow[]).map(normalizeProject))
      : sortProjects(fallbackProjects);
    setProjects(nextProjects);
    setErrorMessage(null);

    const resolvedSelectedId =
      nextSelectedId ??
      (nextProjects.find((project) => project.id === selectedProjectId)?.id ??
        nextProjects[0]?.id ??
        null);

    setSelectedProjectId(resolvedSelectedId);

    if (!resolvedSelectedId) {
      setDraft(createEmptyDraft(getNextProjectSortOrder(nextProjects)));
      setRemovedImages([]);
      setActiveTab("overview");
      return;
    }

    const project = nextProjects.find((item) => item.id === resolvedSelectedId);

    if (project) {
      setDraft(toDraft(project));
      setRemovedImages([]);
      setActiveTab("overview");
    }
  }, [client, selectedProjectId]);

  const importFallbackPortfolio = useCallback(async () => {
    const { data: existingProjects, error: existingProjectsError } = await client
      .from("projects")
      .select("id, slug");

    if (existingProjectsError) {
      throw existingProjectsError;
    }

    const slugToProjectId = new Map<string, string>(
      (existingProjects ?? []).map((project) => [project.slug as string, project.id as string]),
    );

    const missingProjects = fallbackProjects.filter(
      (project) => !slugToProjectId.has(project.slug),
    );

    if (missingProjects.length) {
      const projectPayload = missingProjects.map((project) => ({
        slug: project.slug,
        title: project.title,
        category: project.category,
        location: project.location,
        client_name: project.clientName,
        summary: project.summary,
        description: project.description,
        narrative_eyebrow: project.narrativeEyebrow,
        narrative_title: project.narrativeTitle,
        narrative_highlight: project.narrativeHighlight,
        detail_status_label: project.detailStatusLabel,
        detail_status_title: project.detailStatusTitle,
        detail_status_description: project.detailStatusDescription,
        completion_year: project.completionYear,
        status: project.status,
        featured: project.featured,
        published: project.published,
        sort_order: project.sortOrder,
        cover_image_url: resolveProjectImageUrl(project.coverImageUrl),
      }));

      const { data: insertedProjects, error: insertProjectsError } = await client
        .from("projects")
        .insert(projectPayload)
        .select("id, slug");

      if (insertProjectsError) {
        throw insertProjectsError;
      }

      for (const project of insertedProjects ?? []) {
        slugToProjectId.set(project.slug as string, project.id as string);
      }

      const imagePayload = missingProjects.flatMap((project) => {
        const projectId = slugToProjectId.get(project.slug);

        if (!projectId) {
          return [];
        }

        return project.images.map((image) => ({
          project_id: projectId,
          image_url: resolveProjectImageUrl(image.imageUrl),
          storage_path: image.storagePath,
          alt_text: image.altText,
          caption: image.caption,
          sort_order: image.sortOrder,
          is_cover: image.isCover,
        }));
      });

      if (imagePayload.length) {
        const { error: insertImagesError } = await client
          .from("project_images")
          .insert(imagePayload);

        if (insertImagesError) {
          throw insertImagesError;
        }
      }
    }

    return slugToProjectId;
  }, [client]);

  const handleImportDemoPortfolio = useCallback(async (fallbackId: string | null = draft.id) => {
    setIsImporting(true);

    try {
      const selectedFallback = isFallbackProjectId(fallbackId)
        ? fallbackProjects.find((project) => project.id === fallbackId) ?? null
        : null;
      const slugMap = await importFallbackPortfolio();
      await refreshProjects(selectedFallback ? (slugMap.get(selectedFallback.slug) ?? null) : null);
      toast.success("Portfolio synced to Supabase.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to sync portfolio to Supabase.");
    } finally {
      setIsImporting(false);
    }
  }, [draft.id, importFallbackPortfolio, refreshProjects]);

  useEffect(() => {
    if (errorMessage || hasPersistedProjects || hasAttemptedSeed) {
      return;
    }

    setHasAttemptedSeed(true);
    void handleImportDemoPortfolio();
  }, [errorMessage, handleImportDemoPortfolio, hasPersistedProjects, hasAttemptedSeed]);

  useEffect(() => {
    if (!selectedProjectId) {
      return;
    }

    document
      .getElementById(`project-item-${selectedProjectId}`)
      ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [filteredProjects.length, selectedProjectId]);

  function selectProject(project: ProjectRecord) {
    setSelectedProjectId(project.id);
    setDraft(toDraft(project));
    setRemovedImages([]);
    setActiveTab("overview");
  }

  function createNewProject() {
    setSelectedProjectId(null);
    setDraft(createEmptyDraft(getNextProjectSortOrder(projects)));
    setRemovedImages([]);
    setActiveTab("overview");
  }

  function updateDraft<K extends keyof ProjectDraft>(key: K, value: ProjectDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function updateImage(id: string, updater: (image: ProjectImageDraft) => ProjectImageDraft) {
    setDraft((current) => ({
      ...current,
      images: current.images.map((image) => (image.id === id ? updater(image) : image)),
    }));
  }

  function addImageFromUrl() {
    const nextSort = draft.images.length
      ? Math.max(...draft.images.map((image) => image.sortOrder)) + 10
      : 10;

    setDraft((current) => ({
      ...current,
      images: [
        ...current.images,
        {
          id: `temp-${crypto.randomUUID()}`,
          imageUrl: "",
          altText: current.title || "Project image",
          caption: "",
          sortOrder: nextSort,
          isCover: current.images.length === 0 && !current.coverImageUrl,
          storagePath: null,
        },
      ],
    }));
  }

  function setCoverImage(imageId: string) {
    setDraft((current) => {
      const images = current.images.map((image) => ({
        ...image,
        isCover: image.id === imageId,
      }));
      const cover = images.find((image) => image.id === imageId);

      return {
        ...current,
        images,
        coverImageUrl: cover?.imageUrl ?? current.coverImageUrl,
      };
    });
  }

  async function removeImage(image: ProjectImageDraft) {
    if (image.storagePath && image.id.startsWith("temp-")) {
      await client.storage.from(projectMediaBucket).remove([image.storagePath]);
    }

    if (!image.id.startsWith("temp-")) {
      setRemovedImages((current) => [...current, image]);
    }

    setDraft((current) => {
      const nextImages = current.images.filter((entry) => entry.id !== image.id);
      const nextCover =
        current.coverImageUrl === image.imageUrl
          ? nextImages.find((entry) => entry.isCover)?.imageUrl ?? nextImages[0]?.imageUrl ?? ""
          : current.coverImageUrl;

      return {
        ...current,
        images: nextImages,
        coverImageUrl: nextCover,
      };
    });
  }

  async function uploadImages(files: File[], imageId?: string) {
    if (!files.length) {
      return;
    }

    const nextSlug = draft.slug || slugifyProjectTitle(draft.title);

    if (!nextSlug) {
      toast.error("Enter a title first so uploaded images can be organized.");
      return;
    }

    setIsUploading(true);
    setUploadTargetId(imageId ?? "new");

    try {
      const imageToReplace = imageId
        ? draft.images.find((image) => image.id === imageId) ?? null
        : null;
      const uploadedImages: ProjectImageDraft[] = [];
      const baselineSortOrder = imageToReplace
        ? Math.max(
            0,
            ...draft.images
              .filter((image) => image.id !== imageToReplace.id)
              .map((image) => image.sortOrder),
          )
        : draft.images.length
          ? Math.max(...draft.images.map((image) => image.sortOrder))
          : 0;

      for (const file of files) {
        const path = `${nextSlug}/${Date.now()}-${sanitizeFileName(file.name)}`;
        const { error } = await client.storage
          .from(projectMediaBucket)
          .upload(path, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          throw error;
        }

        const {
          data: { publicUrl },
        } = client.storage.from(projectMediaBucket).getPublicUrl(path);

        uploadedImages.push({
          id: imageToReplace?.id ?? `temp-${crypto.randomUUID()}`,
          imageUrl: publicUrl,
          altText: imageToReplace?.altText || draft.title || file.name,
          caption: imageToReplace?.caption ?? "",
          sortOrder:
            imageToReplace?.sortOrder ?? baselineSortOrder + uploadedImages.length * 10 + 10,
          isCover: imageToReplace?.isCover ?? (draft.images.length === 0 && uploadedImages.length === 0),
          storagePath: path,
        });
      }

      setDraft((current) => {
        if (imageToReplace) {
          const replacement = uploadedImages[0];
          const nextImages = current.images.map((image) =>
            image.id === imageToReplace.id
              ? {
                  ...image,
                  imageUrl: replacement.imageUrl,
                  altText: replacement.altText,
                  caption: replacement.caption,
                  storagePath: replacement.storagePath,
                }
              : image,
          );

          return {
            ...current,
            slug: current.slug || nextSlug,
            coverImageUrl:
              current.coverImageUrl === imageToReplace.imageUrl || imageToReplace.isCover
                ? replacement.imageUrl
                : current.coverImageUrl,
            images: nextImages,
          };
        }

        return {
          ...current,
          slug: current.slug || nextSlug,
          coverImageUrl:
            current.coverImageUrl || uploadedImages.find((image) => image.isCover)?.imageUrl || "",
          images: [...current.images, ...uploadedImages],
        };
      });

      if (imageToReplace?.storagePath) {
        await client.storage.from(projectMediaBucket).remove([imageToReplace.storagePath]);
      }

      toast.success(
        imageToReplace
          ? "Image uploaded."
          : `${uploadedImages.length} image uploaded.`,
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to upload images.");
    } finally {
      setIsUploading(false);
      setUploadTargetId(null);
    }
  }

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>, imageId?: string) {
    const files = Array.from(event.target.files ?? []);
    await uploadImages(imageId ? files.slice(0, 1) : files, imageId);
    event.target.value = "";
  }

  async function handleSave(event?: {
    preventDefault?: () => void;
    stopPropagation?: () => void;
  }) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    if (!draft.title.trim()) {
      toast.error("Project title is required.");
      setActiveTab("overview");
      return;
    }

    const slug = draft.slug.trim() || slugifyProjectTitle(draft.title);

    if (!slug) {
      toast.error("Project slug is required.");
      setActiveTab("overview");
      return;
    }

    setIsSaving(true);

    try {
      const fallbackTemplate = isFallbackProjectId(draft.id)
        ? fallbackProjects.find((project) => project.id === draft.id) ?? null
        : null;
      const fallbackProjectMap = fallbackTemplate
        ? await importFallbackPortfolio()
        : null;
      const projectPayload = {
        slug,
        title: draft.title.trim(),
        category: draft.category,
        location: draft.location.trim(),
        client_name: draft.clientName.trim(),
        summary: draft.summary.trim(),
        description: draft.description.trim(),
        narrative_eyebrow: draft.narrativeEyebrow.trim(),
        narrative_title: draft.narrativeTitle.trim(),
        narrative_highlight: draft.narrativeHighlight.trim(),
        detail_status_label: draft.detailStatusLabel.trim(),
        detail_status_title: draft.detailStatusTitle.trim(),
        detail_status_description: draft.detailStatusDescription.trim(),
        completion_year: Number(draft.completionYear) || new Date().getFullYear(),
        status: draft.status,
        featured: draft.featured,
        published: draft.published,
        sort_order: Number(draft.sortOrder) || 0,
        cover_image_url:
          draft.coverImageUrl.trim() ||
          draft.images.find((image) => image.isCover)?.imageUrl ||
          draft.images[0]?.imageUrl ||
          null,
      };

      let projectId =
        fallbackTemplate && fallbackProjectMap
          ? (fallbackProjectMap.get(fallbackTemplate.slug) ?? null)
          : draft.id;

      if (projectId) {
        const { error } = await client
          .from("projects")
          .update(projectPayload)
          .eq("id", projectId);

        if (error) {
          throw error;
        }
      } else {
        const { data, error } = await client
          .from("projects")
          .insert(projectPayload)
          .select("id")
          .single();

        if (error) {
          throw error;
        }

        projectId = data.id as string;
      }

      if (!projectId) {
        throw new Error("Project save did not return an id.");
      }

      const removedImageIds = removedImages
        .filter((image) => !image.id.startsWith("temp-") && !image.id.startsWith("fallback-"))
        .map((image) => image.id);
      const removedStoragePaths = removedImages
        .map((image) => image.storagePath)
        .filter((path): path is string => !!path);

      if (removedImageIds.length) {
        const { error } = await client
          .from("project_images")
          .delete()
          .in("id", removedImageIds);

        if (error) {
          throw error;
        }
      }

      if (removedStoragePaths.length) {
        await client.storage.from(projectMediaBucket).remove(removedStoragePaths);
      }

      if (fallbackTemplate) {
        const { error } = await client
          .from("project_images")
          .delete()
          .eq("project_id", projectId);

        if (error) {
          throw error;
        }
      }

      const existingImages = draft.images
        .filter((image) => !image.id.startsWith("temp-") && !image.id.startsWith("fallback-"))
        .map((image) => ({
          id: image.id,
          project_id: projectId,
          image_url: image.imageUrl,
          storage_path: image.storagePath,
          alt_text: image.altText.trim(),
          caption: image.caption.trim(),
          sort_order: image.sortOrder,
          is_cover: image.isCover,
        }));

      const newImages = draft.images
        .filter((image) => image.id.startsWith("temp-") || image.id.startsWith("fallback-"))
        .map((image) => ({
          project_id: projectId,
          image_url: image.imageUrl,
          storage_path: image.storagePath,
          alt_text: image.altText.trim(),
          caption: image.caption.trim(),
          sort_order: image.sortOrder,
          is_cover: image.isCover,
        }));

      if (existingImages.length) {
        const { error } = await client.from("project_images").upsert(existingImages);

        if (error) {
          throw error;
        }
      }

      if (newImages.length) {
        const { error } = await client.from("project_images").insert(newImages);

        if (error) {
          throw error;
        }
      }

      await refreshProjects(projectId);
      toast.success("Project saved.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save project.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!draft.id) {
      createNewProject();
      return;
    }

    if (!window.confirm(`Delete "${draft.title}"? This cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const storagePaths = draft.images
        .map((image) => image.storagePath)
        .filter((path): path is string => !!path);

      const { error } = await client.from("projects").delete().eq("id", draft.id);

      if (error) {
        throw error;
      }

      if (storagePaths.length) {
        await client.storage.from(projectMediaBucket).remove(storagePaths);
      }

      await refreshProjects(null);
      toast.success("Project deleted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete project.");
    } finally {
      setIsDeleting(false);
    }
  }

  function openLivePage() {
    if (!publicPageHref) {
      return;
    }

    window.open(publicPageHref, "_blank", "noopener,noreferrer");
  }

  function scrollToEditor() {
    editorSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderProjectNavigatorContent(isMobileSheet = false) {
    return (
      <>
        <div className={isMobileSheet ? "border-b border-border px-5 py-5" : "border-b border-border px-5 py-5"}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-display text-2xl text-foreground">
                {isMobileSheet ? "Project Navigator" : "Projects"}
              </p>
              <p className="mt-1 font-body text-sm text-muted-foreground">
                Search, filter, and jump between records faster.
              </p>
            </div>
            <Button
              type="button"
              onClick={() => {
                createNewProject();
                if (isMobileSheet) {
                  setIsNavigatorOpen(false);
                  window.setTimeout(scrollToEditor, 80);
                }
              }}
              className="w-full bg-gradient-gold text-charcoal hover:opacity-95 sm:w-auto"
            >
              <Plus />
              New
            </Button>
          </div>

          <div className="mt-5 space-y-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search title, slug, client, or location"
                className="pl-9"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as ProjectStatus | "all")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  {projectStatusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={visibilityFilter}
                onValueChange={(value) => setVisibilityFilter(value as VisibilityFilter)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All visibility</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="hidden">Hidden</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div
          data-lenis-prevent
          className={isMobileSheet
            ? "h-[calc(85vh-11.5rem)] overflow-y-auto overscroll-contain px-4 py-4"
            : "h-[22rem] overflow-y-auto overscroll-contain px-4 py-4 sm:h-[28rem] xl:h-[54rem]"
          }
        >
          <div className="mb-4 flex flex-col gap-2 px-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Showing {filteredProjects.length} of {projects.length}
            </p>
            {(searchQuery || statusFilter !== "all" || visibilityFilter !== "all") ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setVisibilityFilter("all");
                }}
                className="font-body text-xs uppercase tracking-[0.24em] text-accent transition-colors hover:text-accent/80"
              >
                Clear filters
              </button>
            ) : null}
          </div>

          <div className="space-y-3 pr-2">
            {filteredProjects.map((project) => {
              const isActive = selectedProjectId === project.id;

              return (
                <button
                  id={`project-item-${project.id}`}
                  key={project.id}
                  type="button"
                  onClick={() => {
                    selectProject(project);
                    if (isMobileSheet) {
                      setIsNavigatorOpen(false);
                      window.setTimeout(scrollToEditor, 80);
                    }
                  }}
                  className={`w-full rounded-[1.1rem] border p-4 text-left transition-all ${
                    isActive
                      ? "border-accent bg-secondary/50 shadow-[0_18px_40px_-28px_rgba(198,147,60,0.5)]"
                      : "border-border hover:border-accent/30 hover:bg-secondary/25"
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="truncate font-display text-xl text-foreground">
                        {project.title}
                      </p>
                      <p className="mt-1 truncate font-body text-sm text-muted-foreground">
                        {project.location || "Location pending"}
                      </p>
                    </div>
                    {project.featured ? (
                      <Badge className="border-0 bg-accent text-accent-foreground">
                        <Star className="mr-1 size-3.5" />
                        Featured
                      </Badge>
                    ) : null}
                  </div>

                  <p className="mt-3 line-clamp-2 font-body text-sm leading-relaxed text-muted-foreground">
                    {project.summary || "No summary added yet."}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Badge variant={getStatusVariant(project.status)}>{project.status}</Badge>
                    <Badge variant={project.published ? "default" : "outline"}>
                      {project.published ? "Published" : "Hidden"}
                    </Badge>
                    <Badge variant="outline">{project.images.length} images</Badge>
                  </div>

                  <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <p className="min-w-0 truncate font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      /portfolio/{project.slug}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      Sort {project.sortOrder}
                    </p>
                  </div>
                </button>
              );
            })}

            {!filteredProjects.length ? (
              <div className="rounded-[1rem] border border-dashed border-border p-6 text-center">
                <p className="font-body text-sm text-muted-foreground">
                  No projects match the current filters.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ProjectPreviewDialog
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        project={previewProject}
        hasUnsavedChanges={hasUnsavedChanges}
        liveHref={publicPageHref}
      />
      <Sheet open={isNavigatorOpen} onOpenChange={setIsNavigatorOpen}>
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-[1.5rem] border-border bg-background p-0 xl:hidden"
        >
          <SheetHeader className="border-b border-border/70 px-5 py-4 text-left">
            <SheetTitle className="font-display text-2xl">Project Navigator</SheetTitle>
            <SheetDescription>
              Switch projects, filter records, or start a new draft without leaving the editor.
            </SheetDescription>
          </SheetHeader>
          {renderProjectNavigatorContent(true)}
        </SheetContent>
      </Sheet>

      <div
        className="space-y-8 pb-28 xl:pb-0"
        onSubmitCapture={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Projects" value={projects.length} helper="Full portfolio inventory" />
          <StatCard label="Published" value={publishedCount} helper="Visible on the website" />
          <StatCard label="Featured" value={featuredCount} helper="Pinned to priority slots" />
          <StatCard label="Hidden" value={hiddenCount} helper="Saved but not public" />
        </div>

        <div className="xl:hidden">
          <div className="rounded-[1.4rem] border border-border bg-card/95 p-4 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.75)] backdrop-blur-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-body text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Current Project
                </p>
                <p className="mt-2 truncate font-display text-2xl text-foreground">
                  {draft.title.trim() || "New Project Draft"}
                </p>
                <p className="mt-2 font-body text-sm text-muted-foreground">
                  You are editing the <span className="text-foreground">{activeTabLabel}</span> section.
                </p>
              </div>
              <Badge variant={hasUnsavedChanges ? "secondary" : "outline"}>
                {hasUnsavedChanges ? "Unsaved" : "Saved"}
              </Badge>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Button type="button" variant="outline" onClick={() => setIsNavigatorOpen(true)}>
                Browse Projects
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={createNewProject}
              >
                <Plus />
                New Draft
              </Button>
            </div>

            <div className="mt-4 rounded-[1rem] border border-border/70 bg-background/50 p-3">
              <p className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Mobile flow
              </p>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                1. Open <span className="text-foreground">Browse Projects</span> to switch records.
                2. Edit the current section tabs.
                3. Use the fixed bottom bar to preview or save at any time.
              </p>
            </div>
          </div>
        </div>

        {errorMessage ? (
          <div className="rounded-[1.25rem] border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-amber-100">
            <p className="font-body leading-relaxed">
              Supabase project management is not ready yet: {errorMessage}. Run the SQL migration in
              `supabase/migrations` to create the `projects`, `project_images`, and storage setup.
            </p>
          </div>
        ) : null}

        {!errorMessage && !hasPersistedProjects ? (
          <div className="rounded-[1.25rem] border border-accent/25 bg-accent/10 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-display text-xl text-foreground">
                  Starter portfolio is syncing to Supabase
                </p>
                <p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-muted-foreground">
                  The starter portfolio is being stored as real editable records so project cards,
                  detail pages, gallery images, and captions all persist from Supabase.
                </p>
              </div>
              <Button
                type="button"
                onClick={() => void handleImportDemoPortfolio()}
                className="bg-gradient-gold text-charcoal hover:opacity-95"
                disabled={isImporting}
              >
                {isImporting ? <Loader2 className="animate-spin" /> : <Upload />}
                Sync Portfolio
              </Button>
            </div>
          </div>
        ) : null}

        <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
          <div className="hidden xl:block rounded-[1.5rem] border border-border bg-card">
            {renderProjectNavigatorContent()}
          </div>

          <div ref={editorSectionRef} className="rounded-[1.5rem] border border-border bg-card">
            <div className="border-b border-border px-5 py-5 sm:px-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-2xl text-foreground sm:text-3xl">
                      {draft.id ? "Edit Project" : "Create Project"}
                    </p>
                    {hasUnsavedChanges ? (
                      <Badge variant="secondary">Unsaved changes</Badge>
                    ) : (
                      <Badge variant="outline">Up to date</Badge>
                    )}
                    {isFallbackProjectId(draft.id) ? (
                      <Badge className="border-0 bg-accent text-accent-foreground">
                        Starter record
                      </Badge>
                    ) : null}
                  </div>
                  <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-muted-foreground">
                    Edit the public project card, detail storytelling, publishing state, and gallery
                    from one place.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant={getStatusVariant(draft.status)}>{draft.status}</Badge>
                    <Badge variant={draft.published ? "default" : "outline"}>
                      {draft.published ? "Published on website" : "Hidden from website"}
                    </Badge>
                    <Badge variant="outline">
                      {draft.images.length} image{draft.images.length === 1 ? "" : "s"}
                    </Badge>
                  </div>
                </div>

                <div className="grid w-full gap-3 sm:flex sm:w-auto sm:flex-row sm:flex-wrap">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsNavigatorOpen(true)}
                    className="w-full xl:hidden"
                  >
                    Browse Projects
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsPreviewOpen(true)}
                    className="w-full sm:w-auto"
                  >
                    <Eye />
                    Preview
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={openLivePage}
                    disabled={!publicPageHref}
                    className="w-full sm:w-auto"
                  >
                    <ExternalLink />
                    Open live page
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDelete}
                    disabled={isDeleting || isImporting}
                    className="w-full sm:w-auto"
                  >
                    {isDeleting ? <Loader2 className="animate-spin" /> : <Trash2 />}
                    Delete
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSave}
                    className="w-full bg-gradient-gold text-charcoal hover:opacity-95 sm:w-auto"
                    disabled={isSaving || isImporting}
                  >
                    {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
                    Save
                  </Button>
                </div>
              </div>

              <div className="mt-5 rounded-[1.15rem] border border-border/70 bg-background/50 p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="font-body text-xs uppercase tracking-[0.28em] text-muted-foreground">
                      Preview route
                    </p>
                    <p className="mt-2 break-all font-body text-sm text-foreground">
                      /portfolio/{previewProject.slug}
                    </p>
                  </div>
                  <p className="max-w-xl font-body text-sm leading-relaxed text-muted-foreground">
                    Preview shows the current draft, including unsaved edits. The live page button
                    opens the public route when this project is marked as published.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-5 py-5 sm:px-6 sm:py-6">
              <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as EditorTab)}
                className="space-y-6"
              >
                <TabsList className="grid h-auto grid-cols-1 gap-2 rounded-[1rem] bg-secondary/60 p-1.5 sm:grid-cols-3">
                  <TabsTrigger value="overview" className="w-full rounded-[0.8rem]">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="story" className="w-full rounded-[0.8rem]">
                    Story & Status
                  </TabsTrigger>
                  <TabsTrigger value="gallery" className="w-full rounded-[0.8rem]">
                    Gallery
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                    <div className="space-y-6">
                      <div className="rounded-[1.25rem] border border-border/70 bg-background/40 p-4 sm:p-5">
                        <div>
                          <p className="font-display text-xl text-foreground">Project Basics</p>
                          <p className="mt-1 font-body text-sm text-muted-foreground">
                            Core information that drives the portfolio card and public detail page.
                          </p>
                        </div>

                        <div className="mt-5 grid gap-5 md:grid-cols-2">
                          <div className="space-y-2 md:col-span-2">
                            <FieldLabel>Title</FieldLabel>
                            <Input
                              value={draft.title}
                              onChange={(event) => {
                                const title = event.target.value;
                                setDraft((current) => ({
                                  ...current,
                                  title,
                                  slug: current.id ? current.slug : slugifyProjectTitle(title),
                                }));
                              }}
                              placeholder="Grand Lounge Residence"
                            />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <FieldLabel>Slug</FieldLabel>
                            <Input
                              value={draft.slug}
                              onChange={(event) =>
                                updateDraft("slug", slugifyProjectTitle(event.target.value))
                              }
                              placeholder="grand-lounge-residence"
                            />
                          </div>
                          <div className="space-y-2">
                            <FieldLabel>Category</FieldLabel>
                            <Select
                              value={draft.category}
                              onValueChange={(value) =>
                                updateDraft("category", value as ProjectCategory)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a category" />
                              </SelectTrigger>
                              <SelectContent>
                                {projectCategories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <FieldLabel>Status</FieldLabel>
                            <Select
                              value={draft.status}
                              onValueChange={(value) =>
                                updateDraft("status", value as ProjectStatus)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a status" />
                              </SelectTrigger>
                              <SelectContent>
                                {projectStatusOptions.map((status) => (
                                  <SelectItem key={status} value={status}>
                                    {status}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <FieldLabel>Location</FieldLabel>
                            <Input
                              value={draft.location}
                              onChange={(event) => updateDraft("location", event.target.value)}
                              placeholder="SoHo, NY"
                            />
                          </div>
                          <div className="space-y-2">
                            <FieldLabel>Client</FieldLabel>
                            <Input
                              value={draft.clientName}
                              onChange={(event) => updateDraft("clientName", event.target.value)}
                              placeholder="Private Client"
                            />
                          </div>
                          <div className="space-y-2">
                            <FieldLabel>Completion Year</FieldLabel>
                            <Input
                              type="number"
                              value={draft.completionYear}
                              onChange={(event) =>
                                updateDraft("completionYear", event.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <FieldLabel>Sort Order</FieldLabel>
                            <Input
                              type="number"
                              value={draft.sortOrder}
                              onChange={(event) => updateDraft("sortOrder", event.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[1.25rem] border border-border/70 bg-background/40 p-4 sm:p-5">
                        <FieldLabel>Summary</FieldLabel>
                        <p className="mt-2 font-body text-sm text-muted-foreground">
                          Short copy used in cards, metadata, and the project detail intro.
                        </p>
                        <Textarea
                          className="mt-4"
                          value={draft.summary}
                          onChange={(event) => updateDraft("summary", event.target.value)}
                          rows={4}
                          placeholder="A short summary for cards, SEO, and detail page intros."
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="rounded-[1.25rem] border border-border/70 bg-background/40 p-4 sm:p-5">
                        <p className="font-display text-xl text-foreground">Publishing</p>
                        <p className="mt-1 font-body text-sm text-muted-foreground">
                          Control whether the project appears publicly and how prominently it is shown.
                        </p>

                        <div className="mt-5 space-y-4">
                          <label className="flex items-center gap-3 rounded-[1rem] border border-border/70 bg-background/60 px-4 py-3 font-body text-sm text-foreground">
                            <Checkbox
                              checked={draft.featured}
                              onCheckedChange={(checked) =>
                                updateDraft("featured", Boolean(checked))
                              }
                            />
                            Featured project
                          </label>
                          <label className="flex items-center gap-3 rounded-[1rem] border border-border/70 bg-background/60 px-4 py-3 font-body text-sm text-foreground">
                            <Checkbox
                              checked={draft.published}
                              onCheckedChange={(checked) =>
                                updateDraft("published", Boolean(checked))
                              }
                            />
                            Published on website
                          </label>
                        </div>
                      </div>

                      <div className="rounded-[1.25rem] border border-border/70 bg-background/40 p-4 sm:p-5">
                        <FieldLabel>Cover Image URL</FieldLabel>
                        <p className="mt-2 font-body text-sm text-muted-foreground">
                          Optional override. If empty, the current cover image from the gallery is used.
                        </p>
                        <Input
                          className="mt-4"
                          value={draft.coverImageUrl}
                          onChange={(event) => updateDraft("coverImageUrl", event.target.value)}
                          placeholder="https://..."
                        />
                      </div>

                      <div className="overflow-hidden rounded-[1.25rem] border border-border/70 bg-background/40">
                        <div className="relative aspect-[4/3] bg-secondary">
                          {previewProject.coverImageUrl ? (
                            <img
                              src={resolveProjectImageUrl(previewProject.coverImageUrl)}
                              alt={previewProject.title}
                              className="h-full w-full object-cover"
                            />
                          ) : null}
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,5,4,0.08)_0%,rgba(6,5,4,0.24)_50%,rgba(6,5,4,0.72)_100%)]" />
                          <div className="absolute inset-x-0 bottom-0 p-4">
                            <p className="font-body text-xs uppercase tracking-[0.28em] text-gold-light">
                              {previewProject.category}
                            </p>
                            <p className="mt-2 font-display text-2xl text-cream">
                              {previewProject.title}
                            </p>
                            <p className="mt-2 line-clamp-2 font-body text-sm text-cream/75">
                              {previewProject.summary}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="story" className="space-y-6">
                  <div className="rounded-[1.25rem] border border-border/70 bg-background/40 p-4 sm:p-5">
                    <FieldLabel>Full Description</FieldLabel>
                    <p className="mt-2 font-body text-sm text-muted-foreground">
                      Long-form project story for the detail page.
                    </p>
                    <Textarea
                      className="mt-4"
                      value={draft.description}
                      onChange={(event) => updateDraft("description", event.target.value)}
                      rows={8}
                      placeholder="Tell the full project story for the detail page."
                    />
                  </div>

                  <div className="rounded-[1.25rem] border border-border/70 bg-background/40 p-4 sm:p-5">
                    <div>
                      <p className="font-display text-xl text-foreground">Narrative Section</p>
                      <p className="mt-1 font-body text-sm text-muted-foreground">
                        Control the story heading and project status card content.
                      </p>
                    </div>

                    <div className="mt-5 grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <FieldLabel>Narrative Label</FieldLabel>
                        <Input
                          value={draft.narrativeEyebrow}
                          onChange={(event) =>
                            updateDraft("narrativeEyebrow", event.target.value)
                          }
                          placeholder="Project Narrative"
                        />
                      </div>
                      <div className="space-y-2">
                        <FieldLabel>Status Card Label</FieldLabel>
                        <Input
                          value={draft.detailStatusLabel}
                          onChange={(event) =>
                            updateDraft("detailStatusLabel", event.target.value)
                          }
                          placeholder="Project Status"
                        />
                      </div>
                      <div className="space-y-2">
                        <FieldLabel>Narrative Title</FieldLabel>
                        <Input
                          value={draft.narrativeTitle}
                          onChange={(event) => updateDraft("narrativeTitle", event.target.value)}
                          placeholder="Designed with atmosphere,"
                        />
                      </div>
                      <div className="space-y-2">
                        <FieldLabel>Narrative Highlight</FieldLabel>
                        <Input
                          value={draft.narrativeHighlight}
                          onChange={(event) =>
                            updateDraft("narrativeHighlight", event.target.value)
                          }
                          placeholder="clarity, and detail."
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <FieldLabel>Status Card Title</FieldLabel>
                        <Input
                          value={draft.detailStatusTitle}
                          onChange={(event) =>
                            updateDraft("detailStatusTitle", event.target.value)
                          }
                          placeholder="Completed"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <FieldLabel>Status Card Description</FieldLabel>
                        <Textarea
                          rows={4}
                          value={draft.detailStatusDescription}
                          onChange={(event) =>
                            updateDraft("detailStatusDescription", event.target.value)
                          }
                          placeholder="Add supporting copy for the status card."
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="gallery" className="space-y-6">
                  <div className="rounded-[1.25rem] border border-border/70 bg-background/40 p-4 sm:p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-xl text-foreground">Gallery Assets</p>
                        <p className="mt-1 font-body text-sm text-muted-foreground">
                          Upload images, control captions, and choose the cover image.
                        </p>
                      </div>
                      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-4 py-2 font-body text-sm text-foreground transition-colors hover:border-accent">
                          {isUploading && uploadTargetId === "new" ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <Upload size={16} />
                          )}
                          Upload New
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(event) => void handleUpload(event)}
                          />
                        </label>
                        <Button type="button" variant="outline" onClick={addImageFromUrl} className="w-full sm:w-auto">
                          <ImagePlus />
                          Add Image Block
                        </Button>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      {draft.images.map((image) => (
                        <div
                          key={image.id}
                          className="grid gap-4 rounded-[1.2rem] border border-border/80 bg-background/70 p-4 xl:grid-cols-[220px_1fr]"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] border border-border/60 bg-secondary">
                            {image.imageUrl ? (
                              <img
                                src={image.imageUrl}
                                alt={image.altText || draft.title || "Project image"}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center px-4 text-center font-body text-sm text-muted-foreground">
                                Upload an image or paste a URL to preview it here.
                              </div>
                            )}
                          </div>

                          <div className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="space-y-2 md:col-span-2">
                                <FieldLabel>Image URL</FieldLabel>
                                <Input
                                  value={image.imageUrl}
                                  onChange={(event) =>
                                    updateImage(image.id, (current) => ({
                                      ...current,
                                      imageUrl: event.target.value,
                                    }))
                                  }
                                  placeholder="https://..."
                                />
                              </div>
                              <div className="space-y-2">
                                <FieldLabel>Alt Text</FieldLabel>
                                <Input
                                  value={image.altText}
                                  onChange={(event) =>
                                    updateImage(image.id, (current) => ({
                                      ...current,
                                      altText: event.target.value,
                                    }))
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <FieldLabel>Sort Order</FieldLabel>
                                <Input
                                  type="number"
                                  value={String(image.sortOrder)}
                                  onChange={(event) =>
                                    updateImage(image.id, (current) => ({
                                      ...current,
                                      sortOrder: Number(event.target.value) || 0,
                                    }))
                                  }
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <FieldLabel>Caption</FieldLabel>
                              <Textarea
                                rows={3}
                                value={image.caption}
                                onChange={(event) =>
                                  updateImage(image.id, (current) => ({
                                    ...current,
                                    caption: event.target.value,
                                  }))
                                }
                                placeholder="Add an editorial caption for this image."
                              />
                            </div>

                            <div className="flex flex-wrap gap-3">
                              <Button
                                type="button"
                                variant={image.isCover ? "default" : "outline"}
                                onClick={() => setCoverImage(image.id)}
                              >
                                {image.isCover ? "Cover Image" : "Set as Cover"}
                              </Button>
                              <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-4 py-2 font-body text-sm text-foreground transition-colors hover:border-accent">
                                {isUploading && uploadTargetId === image.id ? (
                                  <Loader2 className="animate-spin" />
                                ) : (
                                  <Upload size={16} />
                                )}
                                Replace
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(event) => void handleUpload(event, image.id)}
                                />
                              </label>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => void removeImage(image)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {!draft.images.length ? (
                        <div className="rounded-[1rem] border border-dashed border-border p-8 text-center">
                          <p className="font-body text-sm text-muted-foreground">
                            No gallery images yet. Upload images or add an image block to start building the project story.
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-4 bottom-4 z-30 xl:hidden">
        <div className="rounded-[1.25rem] border border-border/80 bg-background/92 p-2 shadow-[0_26px_70px_-34px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          <div className="grid grid-cols-3 gap-2">
            <Button type="button" variant="outline" onClick={() => setIsNavigatorOpen(true)} className="h-11">
              Browse
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsPreviewOpen(true)} className="h-11">
              Preview
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="h-11 bg-gradient-gold text-charcoal hover:opacity-95"
              disabled={isSaving || isImporting}
            >
              {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
