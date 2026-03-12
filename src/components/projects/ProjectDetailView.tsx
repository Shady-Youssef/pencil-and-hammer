"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Images, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import FeaturedWork from "@/components/home/FeaturedWork";
import { resolveProjectImageUrl, type ProjectRecord } from "@/lib/projects/data";

type ProjectDetailViewProps = {
  project: ProjectRecord;
  featuredProjects: ProjectRecord[];
};

export default function ProjectDetailView({
  project,
  featuredProjects,
}: ProjectDetailViewProps) {
  const [activeImageId, setActiveImageId] = useState(project.images[0]?.id ?? "");
  const activeImage =
    project.images.find((image) => image.id === activeImageId) ?? project.images[0];

  useEffect(() => {
    setActiveImageId(project.images[0]?.id ?? "");
  }, [project]);

  useEffect(() => {
    for (const image of project.images) {
      const preloadImage = new window.Image();
      preloadImage.src = resolveProjectImageUrl(image.imageUrl);
    }
  }, [project.images]);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="bg-background">
        <section className="relative overflow-hidden pt-24 sm:pt-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,147,60,0.14),transparent_36%),linear-gradient(180deg,rgba(9,7,5,1)_0%,rgba(9,7,5,0.4)_34%,rgba(9,7,5,0)_100%)]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute -right-10 top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(198,147,60,0.2),transparent_72%)] blur-3xl sm:-right-16 sm:top-20 sm:h-72 sm:w-72"
          />

          <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-14 sm:pt-10 md:px-12 lg:px-20 xl:px-24">
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.26em] text-muted-foreground transition-colors hover:text-accent"
              >
                <ArrowLeft size={14} />
                Back to Portfolio
              </Link>
            </motion.div>

            <div className="mt-8 grid gap-8 sm:mt-10 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-12">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.95, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-body text-xs uppercase tracking-[0.34em] text-gold-light">
                  {project.category}
                </p>
                <h1 className="mt-4 max-w-4xl font-display text-4xl font-light leading-[1.02] text-foreground sm:mt-5 sm:text-5xl md:text-7xl xl:text-8xl">
                  {project.title}
                </h1>
                <p className="mt-5 max-w-2xl font-body text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                  {project.summary}
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 34, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.95, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-4 rounded-[1.25rem] border border-border/70 bg-card/70 p-5 backdrop-blur-xl sm:grid-cols-3 sm:rounded-[1.5rem] sm:p-6 lg:grid-cols-1"
              >
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-accent" />
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                      Location
                    </p>
                    <p className="mt-1 font-body text-sm text-foreground">
                      {project.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDays size={16} className="text-accent" />
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                      Completion
                    </p>
                    <p className="mt-1 font-body text-sm text-foreground">
                      {project.completionYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Images size={16} className="text-accent" />
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                      Gallery
                    </p>
                    <p className="mt-1 font-body text-sm text-foreground">
                      {project.images.length} image{project.images.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-14 sm:px-6 sm:pb-16 md:px-12 lg:px-20 xl:px-24">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <motion.div
                initial={{ y: 34, opacity: 0, scale: 0.985 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] border border-white/8 bg-charcoal sm:aspect-[16/10] sm:rounded-[2rem] lg:h-[calc(100vh-9rem)] lg:aspect-auto"
                style={{ viewTransitionName: `project-cover-${project.slug}` }}
              >
                <AnimatePresence initial={false}>
                  <motion.div
                    key={activeImage?.id}
                    initial={{ opacity: 0.82, scale: 1.01 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.995 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    {activeImage ? (
                      <>
                        <Image
                          src={activeImage.imageUrl}
                          alt={activeImage.altText}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 62vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,3,0.08)_0%,rgba(5,4,3,0.26)_50%,rgba(5,4,3,0.68)_100%)]" />
                      </>
                    ) : null}
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <div className="rounded-[1.15rem] border border-white/10 bg-black/24 p-4 backdrop-blur-md sm:p-5">
                    <p className="font-display text-2xl text-cream sm:text-3xl">
                      {project.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="space-y-5">
              <motion.section
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[1.35rem] border border-border/70 bg-card/60 p-5 backdrop-blur-xl sm:rounded-[1.6rem] sm:p-6 md:p-8"
              >
                <p className="font-body text-xs uppercase tracking-[0.32em] text-gold-light">
                  Project Overview
                </p>
                <p className="mt-5 font-body text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                  {project.description}
                </p>
              </motion.section>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {project.images.map((image, index) => (
                  <motion.button
                    key={image.id}
                    type="button"
                    onClick={() => setActiveImageId(image.id)}
                    initial={{ y: 22, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.28 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -6 }}
                    className={`group relative overflow-hidden rounded-[1.25rem] border text-left transition-all duration-500 ${
                      image.id === activeImage?.id
                        ? "border-accent shadow-[0_24px_70px_-28px_rgba(198,147,60,0.55)]"
                        : "border-border/70 hover:border-accent/40"
                    }`}
                  >
                    <div className="relative aspect-[5/4]">
                      <Image
                        src={image.imageUrl}
                        alt={image.altText}
                        fill
                        sizes="(max-width: 1024px) 50vw, 34vw"
                        className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,7,5,0.02)_0%,rgba(9,7,5,0.14)_38%,rgba(9,7,5,0.72)_100%)]" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="font-body text-xs uppercase tracking-[0.25em] text-gold-light/95">
                        Gallery View
                      </p>
                      <p className="mt-2 font-body text-sm text-cream/80">
                        {project.title}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {featuredProjects.length > 0 ? <FeaturedWork projects={featuredProjects} /> : null}
      </main>
      <Footer />
    </>
  );
}
