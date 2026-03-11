"use client";

import { Loader2, Plus, Save, Trash2, Upload, ImagePlus, Star } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { useAuth } from "@/components/auth/auth-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
      row.cover_image_url ?? images.find((image) => image.isCover)?.imageUrl ?? images[0]?.imageUrl ?? "",
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
    coverImageUrl:
      typeof project.coverImageUrl === "string" ? project.coverImageUrl : "",
    images: project.images.map((image) => ({
      id: image.id,
      imageUrl: typeof image.imageUrl === "string" ? image.imageUrl : "",
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
      return;
    }

    const project = nextProjects.find((item) => item.id === resolvedSelectedId);

    if (project) {
      setDraft(toDraft(project));
      setRemovedImages([]);
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
  }, [projects.length, selectedProjectId]);

  function selectProject(project: ProjectRecord) {
    setSelectedProjectId(project.id);
    setDraft(toDraft(project));
    setRemovedImages([]);
  }

  function createNewProject() {
    setSelectedProjectId(null);
    setDraft(createEmptyDraft(getNextProjectSortOrder(projects)));
    setRemovedImages([]);
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

  async function handleSave() {
    if (!draft.title.trim()) {
      toast.error("Project title is required.");
      return;
    }

    const slug = draft.slug.trim() || slugifyProjectTitle(draft.title);

    if (!slug) {
      toast.error("Project slug is required.");
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

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-[0.85fr_1.15fr_1.15fr]">
        <div className="rounded-[1.25rem] border border-border bg-card p-5">
          <p className="font-body text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Total Projects
          </p>
          <p className="mt-3 font-display text-4xl text-foreground">
            {projects.length}
          </p>
        </div>
        <div className="rounded-[1.25rem] border border-border bg-card p-5">
          <p className="font-body text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Published Projects
          </p>
          <p className="mt-3 font-display text-4xl text-foreground">
            {publishedCount}
          </p>
        </div>
        <div className="rounded-[1.25rem] border border-border bg-card p-5">
          <p className="font-body text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Featured Projects
          </p>
          <p className="mt-3 font-display text-4xl text-foreground">
            {featuredCount}
          </p>
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

      <div className="grid gap-6 xl:grid-cols-[0.4fr_0.6fr]">
        <div className="rounded-[1.5rem] border border-border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-4 py-4 sm:px-5">
            <div>
              <p className="font-display text-2xl text-foreground">Projects</p>
              <p className="mt-1 font-body text-sm text-muted-foreground">
                Select a project to edit or create a new one.
              </p>
            </div>
            <Button
              type="button"
              onClick={createNewProject}
              className="bg-gradient-gold text-charcoal hover:opacity-95"
            >
              <Plus />
              New
            </Button>
          </div>

          <div
            data-lenis-prevent
            className="h-[22rem] overflow-y-auto overscroll-contain px-4 py-4 sm:h-[28rem] xl:h-[36rem]"
          >
            <div className="space-y-3 pr-2">
              {projects.map((project) => {
                const isActive = selectedProjectId === project.id;

                return (
                  <button
                    id={`project-item-${project.id}`}
                    key={project.id}
                    type="button"
                    onClick={() => selectProject(project)}
                    className={`w-full rounded-[1.1rem] border p-4 text-left transition-all ${
                      isActive
                        ? "border-accent bg-secondary/50 shadow-[0_18px_40px_-28px_rgba(198,147,60,0.5)]"
                        : "border-border hover:border-accent/30 hover:bg-secondary/25"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-xl text-foreground">
                          {project.title}
                        </p>
                        <p className="mt-1 font-body text-sm text-muted-foreground">
                          {project.location}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        {project.featured ? (
                          <Badge className="bg-accent text-accent-foreground">
                            Featured
                          </Badge>
                        ) : null}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <Badge variant={getStatusVariant(project.status)}>
                        {project.status}
                      </Badge>
                      <p className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        {project.slug}
                      </p>
                    </div>
                  </button>
                );
              })}

              {!projects.length ? (
                <div className="rounded-[1rem] border border-dashed border-border p-6 text-center">
                  <p className="font-body text-sm text-muted-foreground">
                    No projects yet. Create the first project to populate the public portfolio.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-display text-2xl text-foreground">
                  {draft.id ? "Edit Project" : "Create Project"}
                </p>
                <p className="mt-1 font-body text-sm text-muted-foreground">
                  Control the public portfolio cards and project detail pages from this form.
                </p>
                {isFallbackProjectId(draft.id) ? (
                  <p className="mt-2 font-body text-xs uppercase tracking-[0.24em] text-gold-light">
                    Saving this starter project writes it to Supabase as a real portfolio record.
                  </p>
                ) : null}
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDelete}
                  disabled={isDeleting || isImporting}
                >
                  {isDeleting ? <Loader2 className="animate-spin" /> : <Trash2 />}
                  Delete
                </Button>
                <Button
                  type="button"
                  onClick={handleSave}
                  className="bg-gradient-gold text-charcoal hover:opacity-95"
                  disabled={isSaving || isImporting}
                >
                  {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
                  Save
                </Button>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Title
                </label>
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
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Slug
                </label>
                <Input
                  value={draft.slug}
                  onChange={(event) => updateDraft("slug", slugifyProjectTitle(event.target.value))}
                  placeholder="grand-lounge-residence"
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Category
                </label>
                <Select
                  value={draft.category}
                  onValueChange={(value) => updateDraft("category", value as ProjectCategory)}
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
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Status
                </label>
                <Select
                  value={draft.status}
                  onValueChange={(value) => updateDraft("status", value as ProjectStatus)}
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
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Location
                </label>
                <Input
                  value={draft.location}
                  onChange={(event) => updateDraft("location", event.target.value)}
                  placeholder="SoHo, NY"
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Client
                </label>
                <Input
                  value={draft.clientName}
                  onChange={(event) => updateDraft("clientName", event.target.value)}
                  placeholder="Private Client"
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Completion Year
                </label>
                <Input
                  type="number"
                  value={draft.completionYear}
                  onChange={(event) => updateDraft("completionYear", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Sort Order
                </label>
                <Input
                  type="number"
                  value={draft.sortOrder}
                  onChange={(event) => updateDraft("sortOrder", event.target.value)}
                />
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Summary
              </label>
              <Textarea
                value={draft.summary}
                onChange={(event) => updateDraft("summary", event.target.value)}
                rows={3}
                placeholder="A short summary for cards, SEO, and detail page intros."
              />
            </div>

            <div className="mt-5 space-y-2">
              <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Full Description
              </label>
              <Textarea
                value={draft.description}
                onChange={(event) => updateDraft("description", event.target.value)}
                rows={6}
                placeholder="Tell the full project story for the detail page."
              />
            </div>

            <div className="mt-6 rounded-[1.25rem] border border-border/70 bg-background/40 p-4 sm:p-5">
              <div>
                <p className="font-display text-xl text-foreground">Narrative Section</p>
                <p className="mt-1 font-body text-sm text-muted-foreground">
                  Control the project narrative heading and the status card copy on the detail page.
                </p>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Narrative Label
                  </label>
                  <Input
                    value={draft.narrativeEyebrow}
                    onChange={(event) => updateDraft("narrativeEyebrow", event.target.value)}
                    placeholder="Project Narrative"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Status Card Label
                  </label>
                  <Input
                    value={draft.detailStatusLabel}
                    onChange={(event) => updateDraft("detailStatusLabel", event.target.value)}
                    placeholder="Project Status"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Narrative Title
                  </label>
                  <Input
                    value={draft.narrativeTitle}
                    onChange={(event) => updateDraft("narrativeTitle", event.target.value)}
                    placeholder="Designed with atmosphere,"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Narrative Highlight
                  </label>
                  <Input
                    value={draft.narrativeHighlight}
                    onChange={(event) => updateDraft("narrativeHighlight", event.target.value)}
                    placeholder="clarity, and detail."
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Status Card Title
                  </label>
                  <Input
                    value={draft.detailStatusTitle}
                    onChange={(event) => updateDraft("detailStatusTitle", event.target.value)}
                    placeholder="Completed"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Status Card Description
                  </label>
                  <Textarea
                    rows={3}
                    value={draft.detailStatusDescription}
                    onChange={(event) =>
                      updateDraft("detailStatusDescription", event.target.value)
                    }
                    placeholder="Add supporting copy for the status card."
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Cover Image URL
              </label>
              <Input
                value={draft.coverImageUrl}
                onChange={(event) => updateDraft("coverImageUrl", event.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-6">
              <label className="flex items-center gap-3 font-body text-sm text-foreground">
                <Checkbox
                  checked={draft.featured}
                  onCheckedChange={(checked) => updateDraft("featured", Boolean(checked))}
                />
                Featured project
              </label>
              <label className="flex items-center gap-3 font-body text-sm text-foreground">
                <Checkbox
                  checked={draft.published}
                  onCheckedChange={(checked) => updateDraft("published", Boolean(checked))}
                />
                Published on website
              </label>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-border bg-card p-4 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-display text-2xl text-foreground">Gallery</p>
                <p className="mt-1 font-body text-sm text-muted-foreground">
                  Upload images or add another gallery image block manually.
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
                <Button type="button" variant="outline" onClick={addImageFromUrl}>
                  <ImagePlus />
                  Add Image Block
                </Button>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {draft.images.map((image) => (
                <div
                  key={image.id}
                  className="grid gap-4 rounded-[1.2rem] border border-border/80 bg-background/70 p-4 xl:grid-cols-[180px_1fr]"
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
                        <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                          Image URL
                        </label>
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
                        <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                          Alt Text
                        </label>
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
                        <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                          Sort Order
                        </label>
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
                      <label className="font-body text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        Caption
                      </label>
                      <Textarea
                        rows={2}
                        value={image.caption}
                        onChange={(event) =>
                          updateImage(image.id, (current) => ({
                            ...current,
                            caption: event.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-4 py-2 font-body text-sm text-foreground transition-colors hover:border-accent">
                        {isUploading && uploadTargetId === image.id ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <Upload size={16} />
                        )}
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) => void handleUpload(event, image.id)}
                        />
                      </label>
                      <Button
                        type="button"
                        variant={image.isCover ? "default" : "outline"}
                        onClick={() => setCoverImage(image.id)}
                      >
                        <Star />
                        {image.isCover ? "Cover Image" : "Set as Cover"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => void removeImage(image)}
                      >
                        <Trash2 />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {!draft.images.length ? (
                <div className="rounded-[1rem] border border-dashed border-border p-6 text-center">
                  <p className="font-body text-sm text-muted-foreground">
                    No gallery images yet. Upload assets or add hosted image URLs.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
