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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_36%),linear-gradient(180deg,rgba(8,8,8,1)_0%,rgba(8,8,8,0.4)_34%,rgba(8,8,8,0)_100%)]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute -right-10 top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_72%)] blur-3xl sm:-right-16 sm:top-20 sm:h-72 sm:w-72"
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
          <div className="mx-auto max-w-7xl space-y-8 sm:space-y-10">
            <motion.section
              initial={{ y: 34, opacity: 0, scale: 0.985 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[1.5rem] border border-white/8 bg-charcoal sm:rounded-[2rem] lg:rounded-[2.25rem]"
              style={{ viewTransitionName: `project-cover-${project.slug}` }}
            >
              <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8.8]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={activeImage?.id}
                    initial={{ opacity: 0.82, scale: 1.01 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.995 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    {activeImage ? (
                      <>
                        <Image
                          src={resolveProjectImageUrl(activeImage.imageUrl)}
                          alt={activeImage.altText}
                          fill
                          priority
                          sizes="100vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,3,0.08)_0%,rgba(5,4,3,0.12)_32%,rgba(5,4,3,0.4)_68%,rgba(5,4,3,0.74)_100%)]" />
                      </>
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:items-end">
                  <div className="rounded-[1.2rem] border border-white/10 bg-black/24 p-5 backdrop-blur-md sm:rounded-[1.5rem] sm:p-6 lg:p-7">
                    <p className="font-body text-[10px] uppercase tracking-[0.3em] text-gold-light/90 sm:text-xs">
                      Featured Frame
                    </p>
                    <p className="mt-3 font-display text-2xl text-cream sm:text-3xl lg:text-4xl">
                      {project.title}
                    </p>
                    <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-cream/72 sm:text-base">
                      {project.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 rounded-[1.2rem] border border-white/10 bg-black/20 p-4 backdrop-blur-md sm:rounded-[1.5rem] sm:p-5">
                    <div>
                      <p className="font-body text-[10px] uppercase tracking-[0.26em] text-cream/45">
                        Location
                      </p>
                      <p className="mt-2 font-body text-sm text-cream sm:text-base">{project.location}</p>
                    </div>
                    <div>
                      <p className="font-body text-[10px] uppercase tracking-[0.26em] text-cream/45">
                        Completion
                      </p>
                      <p className="mt-2 font-body text-sm text-cream sm:text-base">{project.completionYear}</p>
                    </div>
                    <div>
                      <p className="font-body text-[10px] uppercase tracking-[0.26em] text-cream/45">
                        Gallery
                      </p>
                      <p className="mt-2 font-body text-sm text-cream sm:text-base">
                        {project.images.length} image{project.images.length === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {project.images.length > 1 ? (
              <motion.section
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-x-auto pb-2"
              >
                <div className="flex min-w-max gap-3 sm:gap-4">
                  {project.images.map((image, index) => (
                    <motion.button
                      key={image.id}
                      type="button"
                      onClick={() => setActiveImageId(image.id)}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.99 }}
                      className={`group relative w-[12rem] shrink-0 overflow-hidden rounded-[1.15rem] border text-left transition-all duration-500 sm:w-[14rem] ${
                        image.id === activeImage?.id
                          ? "border-accent shadow-[0_24px_70px_-28px_rgba(255,255,255,0.18)]"
                          : "border-border/70 hover:border-accent/40"
                      }`}
                    >
                      <div className="relative aspect-[5/4]">
                        <Image
                          src={resolveProjectImageUrl(image.imageUrl)}
                          alt={image.altText}
                          fill
                          sizes="224px"
                          className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,7,5,0.02)_0%,rgba(9,7,5,0.14)_38%,rgba(9,7,5,0.72)_100%)]" />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <p className="font-body text-[10px] uppercase tracking-[0.25em] text-gold-light/95">
                          View {index + 1}
                        </p>
                        <p className="mt-2 font-body text-sm text-cream/80">{project.title}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.section>
            ) : null}

            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-6">
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

              <motion.section
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
              >
                <div className="rounded-[1.35rem] border border-border/70 bg-card/60 p-5 backdrop-blur-xl sm:p-6">
                  <p className="font-body text-xs uppercase tracking-[0.32em] text-gold-light">
                    Design Intent
                  </p>
                  <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground sm:text-base">
                    The project is resolved as one complete atmosphere, where material choices, circulation, and lighting all support the same emotional tone.
                  </p>
                </div>
                <div className="rounded-[1.35rem] border border-border/70 bg-card/60 p-5 backdrop-blur-xl sm:p-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="mt-0.5 text-accent" />
                      <div>
                        <p className="font-body text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                          Location
                        </p>
                        <p className="mt-2 font-body text-sm text-foreground">{project.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CalendarDays size={16} className="mt-0.5 text-accent" />
                      <div>
                        <p className="font-body text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                          Completion
                        </p>
                        <p className="mt-2 font-body text-sm text-foreground">{project.completionYear}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Images size={16} className="mt-0.5 text-accent" />
                      <div>
                        <p className="font-body text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                          Gallery
                        </p>
                        <p className="mt-2 font-body text-sm text-foreground">
                          {project.images.length} image{project.images.length === 1 ? "" : "s"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>

            <section className="grid gap-4 sm:grid-cols-2 lg:auto-rows-[20rem] lg:grid-cols-12">
              {project.images.map((image, index) => {
                const layoutClassName =
                  index === 0
                    ? "sm:col-span-2 lg:col-span-7 lg:row-span-2"
                    : index % 3 === 1
                      ? "lg:col-span-5"
                      : index % 3 === 2
                        ? "lg:col-span-5"
                        : "sm:col-span-2 lg:col-span-7";

                return (
                  <motion.button
                    key={`gallery-${image.id}`}
                    type="button"
                    onClick={() => setActiveImageId(image.id)}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.3 + index * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -6 }}
                    className={`group relative overflow-hidden rounded-[1.35rem] border text-left transition-all duration-500 ${layoutClassName} ${
                      image.id === activeImage?.id
                        ? "border-accent shadow-[0_28px_90px_-34px_rgba(255,255,255,0.14)]"
                        : "border-border/70 hover:border-accent/40"
                    }`}
                  >
                    <div className="relative h-full min-h-[18rem]">
                      <Image
                        src={resolveProjectImageUrl(image.imageUrl)}
                        alt={image.altText}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,7,5,0.04)_0%,rgba(9,7,5,0.16)_48%,rgba(9,7,5,0.72)_100%)]" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <div className="inline-flex rounded-full border border-white/12 bg-black/18 px-3 py-1 font-body text-[10px] uppercase tracking-[0.24em] text-gold-light/95 backdrop-blur-md">
                        Gallery View {index + 1}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </section>
          </div>
        </section>

        {featuredProjects.length > 0 ? <FeaturedWork projects={featuredProjects} /> : null}
      </main>
      <Footer />
    </>
  );
}
