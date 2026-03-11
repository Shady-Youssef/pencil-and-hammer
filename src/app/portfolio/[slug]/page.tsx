import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProjectDetailView from "@/components/projects/ProjectDetailView";
import { getPublishedProjectBySlug, getPublishedProjects } from "@/lib/projects/server";
import { absoluteUrl } from "@/lib/site";
import { getSiteSettings } from "@/lib/site/server";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    getPublishedProjectBySlug(slug),
    getSiteSettings(),
  ]);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: absoluteUrl(`/portfolio/${project.slug}`, settings.siteUrl),
    },
    openGraph: {
      title: `${project.title} | ${settings.siteName}`,
      description: project.summary,
      type: "article",
      url: absoluteUrl(`/portfolio/${project.slug}`, settings.siteUrl),
      images: [
        {
          url:
            typeof project.coverImageUrl === "string"
              ? project.coverImageUrl
              : absoluteUrl("/api/og", settings.siteUrl),
          alt: project.title,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const [project, publishedProjects, settings] = await Promise.all([
    getPublishedProjectBySlug(slug),
    getPublishedProjects(),
    getSiteSettings(),
  ]);

  if (!project) {
    notFound();
  }

  const projectIndex = publishedProjects.findIndex((entry) => entry.slug === project.slug);
  const stickyHero = projectIndex === -1 ? true : projectIndex % 2 === 0;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    creator: {
      "@type": "Organization",
      name: settings.siteName,
    },
    image:
      typeof project.coverImageUrl === "string"
        ? project.coverImageUrl
        : absoluteUrl("/api/og", settings.siteUrl),
    url: absoluteUrl(`/portfolio/${project.slug}`, settings.siteUrl),
    contentLocation: project.location,
    dateCreated: `${project.completionYear}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProjectDetailView project={project} stickyHero={stickyHero} />
    </>
  );
}
