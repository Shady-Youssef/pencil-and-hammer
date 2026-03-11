import { fallbackProjects, isProjectCategory, isProjectStatus, type ProjectImage, type ProjectRecord } from "@/lib/projects/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const projectSelect = `
  id,
  slug,
  title,
  category,
  location,
  client_name,
  summary,
  description,
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
  completion_year: number | null;
  status: string | null;
  featured: boolean | null;
  published: boolean | null;
  sort_order: number | null;
  cover_image_url: string | null;
  project_images: ProjectImageRow[] | null;
};

type AdminProjectsResult = {
  projects: ProjectRecord[];
  error: string | null;
};

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

function normalizeProject(row: ProjectRow): ProjectRecord {
  const rawCategory = row.category;
  const rawStatus = row.status ?? "";
  const category: ProjectRecord["category"] = isProjectCategory(rawCategory)
    ? rawCategory
    : "Residential";
  const status: ProjectRecord["status"] = isProjectStatus(rawStatus)
    ? rawStatus
    : "Completed";
  const images: ProjectImage[] = [...(row.project_images ?? [])]
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

  const coverImageUrl =
    row.cover_image_url ??
    images.find((image) => image.isCover)?.imageUrl ??
    images[0]?.imageUrl ??
    fallbackProjects[0].coverImageUrl;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category,
    location: row.location ?? "",
    clientName: row.client_name ?? "",
    summary: row.summary ?? "",
    description: row.description ?? "",
    completionYear: row.completion_year ?? new Date().getFullYear(),
    status,
    featured: row.featured ?? false,
    published: row.published ?? false,
    sortOrder: row.sort_order ?? 0,
    coverImageUrl,
    images,
  };
}

export async function getPublishedProjects() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select(projectSelect)
    .eq("published", true);

  if (error || !data?.length) {
    return sortProjects(fallbackProjects);
  }

  return sortProjects((data as ProjectRow[]).map(normalizeProject));
}

export async function getFeaturedProjects(limit = 3) {
  const projects = await getPublishedProjects();
  const featured = projects.filter((project) => project.featured);

  return (featured.length ? featured : projects).slice(0, limit);
}

export async function getPublishedProjectBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select(projectSelect)
    .eq("published", true)
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    return fallbackProjects.find((project) => project.slug === slug) ?? null;
  }

  return normalizeProject(data as ProjectRow);
}

export async function getAdminProjects(): Promise<AdminProjectsResult> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select(projectSelect);

  if (error) {
    return {
      projects: [],
      error: error.message,
    };
  }

  return {
    projects: sortProjects((data as ProjectRow[]).map(normalizeProject)),
    error: null,
  };
}
