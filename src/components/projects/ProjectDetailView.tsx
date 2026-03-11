"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CalendarDays, MapPin, Sparkles } from "lucide-react";
import { useState } from "react";

import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import type { ProjectRecord } from "@/lib/projects/data";

type ProjectDetailViewProps = {
  project: ProjectRecord;
  stickyHero: boolean;
};

export default function ProjectDetailView({
  project,
  stickyHero,
}: ProjectDetailViewProps) {
  const [activeImageId, setActiveImageId] = useState(
    project.images[0]?.id ?? "",
  );
  const activeImage =
    project.images.find((image) => image.id === activeImageId) ??
    project.images[0];

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
                className="grid gap-4 rounded-[1.25rem] border border-border/70 bg-card/70 p-5 backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6"
              >
                <motion.div
                  initial={{ x: 18, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3"
                >
                  <MapPin size={16} className="text-accent" />
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                      Location
                    </p>
                    <p className="mt-1 font-body text-sm text-foreground">
                      {project.location}
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ x: 18, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3"
                >
                  <Sparkles size={16} className="text-accent" />
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                      Client
                    </p>
                    <p className="mt-1 font-body text-sm text-foreground">
                      {project.clientName}
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ x: 18, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.55, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3"
                >
                  <CalendarDays size={16} className="text-accent" />
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                      Completion
                    </p>
                    <p className="mt-1 font-body text-sm text-foreground">
                      {project.completionYear}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {stickyHero ? (
          <section className="px-4 pb-12 sm:px-6 sm:pb-16 md:px-12 lg:px-20 xl:px-24">
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <motion.div
                  initial={{ y: 34, opacity: 0, scale: 0.985 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] border border-white/8 bg-charcoal sm:aspect-[16/10] sm:rounded-[2rem] lg:h-[calc(100vh-9rem)] lg:aspect-auto"
                  style={{ viewTransitionName: `project-cover-${project.slug}` }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage?.id}
                      initial={{ x: 44, opacity: 0.72, scale: 1.02 }}
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      exit={{ x: -28, opacity: 0.72, scale: 0.985 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,3,0.08)_0%,rgba(5,4,3,0.32)_50%,rgba(5,4,3,0.78)_100%)]" />
                        </>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>

                  {activeImage ? (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8"
                    >
                      <div className="max-w-2xl rounded-[1.05rem] border border-white/10 bg-black/25 p-4 backdrop-blur-md sm:rounded-[1.2rem] sm:p-5">
                        <p className="font-display text-xl text-cream sm:text-2xl">
                          {project.title}
                        </p>
                        <p className="mt-2 font-body text-xs leading-relaxed text-cream/75 sm:text-sm">
                          {activeImage.caption}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </motion.div>
              </div>

              <div className="space-y-5">
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
                          {image.caption}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="rounded-[1.35rem] border border-border/70 bg-card/60 p-5 backdrop-blur-xl sm:rounded-[1.6rem] sm:p-6 md:p-8">
                  <div className="grid gap-10">
                    <AnimatedSection direction="left">
                      <div>
                        <p className="font-body text-xs uppercase tracking-[0.32em] text-gold-light">
                          Project Narrative
                        </p>
                        <h2 className="mt-4 font-display text-3xl font-light text-foreground sm:text-4xl md:mt-5 md:text-5xl">
                          Designed with atmosphere,
                          <span className="text-gradient-gold"> clarity, and detail.</span>
                        </h2>
                      </div>
                    </AnimatedSection>
                    <AnimatedSection direction="right" delay={0.08}>
                      <div className="space-y-5">
                        <p className="font-body text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                          {project.description}
                        </p>
                        <motion.div
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="rounded-[1.25rem] border border-border/70 bg-secondary/35 p-5 sm:rounded-[1.5rem] sm:p-6"
                        >
                          <p className="font-body text-xs uppercase tracking-[0.28em] text-muted-foreground">
                            Project Status
                          </p>
                          <p className="mt-3 font-display text-2xl text-foreground">
                            {project.status}
                          </p>
                          <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                            This page is structured to support full galleries, descriptive storytelling,
                            and premium project presentation for both editorial browsing and client review.
                          </p>
                        </motion.div>
                      </div>
                    </AnimatedSection>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <>
            <section className="px-4 pb-10 sm:px-6 md:px-12 lg:px-20 xl:px-24">
              <div className="mx-auto max-w-7xl">
                <motion.div
                  initial={{ y: 34, opacity: 0, scale: 0.985 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] border border-white/8 bg-charcoal sm:aspect-[16/9] sm:rounded-[2rem]"
                  style={{ viewTransitionName: `project-cover-${project.slug}` }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage?.id}
                      initial={{ x: 44, opacity: 0.72, scale: 1.02 }}
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      exit={{ x: -28, opacity: 0.72, scale: 0.985 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      {activeImage ? (
                        <>
                          <Image
                            src={activeImage.imageUrl}
                            alt={activeImage.altText}
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,3,0.08)_0%,rgba(5,4,3,0.32)_50%,rgba(5,4,3,0.78)_100%)]" />
                        </>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>

                  {activeImage ? (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8"
                    >
                      <div className="max-w-2xl rounded-[1.05rem] border border-white/10 bg-black/25 p-4 backdrop-blur-md sm:rounded-[1.2rem] sm:p-5">
                        <p className="font-display text-xl text-cream sm:text-2xl">
                          {project.title}
                        </p>
                        <p className="mt-2 font-body text-xs leading-relaxed text-cream/75 sm:text-sm">
                          {activeImage.caption}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </motion.div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                          sizes="(max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,7,5,0.02)_0%,rgba(9,7,5,0.14)_38%,rgba(9,7,5,0.72)_100%)]" />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <p className="font-body text-xs uppercase tracking-[0.25em] text-gold-light/95">
                          Gallery View
                        </p>
                        <p className="mt-2 font-body text-sm text-cream/80">
                          {image.caption}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            <section className="px-4 py-12 sm:px-6 sm:py-16 md:px-12 lg:px-20 xl:px-24">
              <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr]">
                <AnimatedSection direction="left">
                  <div>
                    <p className="font-body text-xs uppercase tracking-[0.32em] text-gold-light">
                      Project Narrative
                    </p>
                    <h2 className="mt-4 font-display text-3xl font-light text-foreground sm:text-4xl md:mt-5 md:text-5xl">
                      Designed with atmosphere,
                      <span className="text-gradient-gold"> clarity, and detail.</span>
                    </h2>
                  </div>
                </AnimatedSection>
                <AnimatedSection direction="right" delay={0.08}>
                  <div className="space-y-5">
                    <p className="font-body text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                      {project.description}
                    </p>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-[1.25rem] border border-border/70 bg-secondary/35 p-5 sm:rounded-[1.5rem] sm:p-6"
                    >
                      <p className="font-body text-xs uppercase tracking-[0.28em] text-muted-foreground">
                        Project Status
                      </p>
                      <p className="mt-3 font-display text-2xl text-foreground">
                        {project.status}
                      </p>
                      <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                        This page is structured to support full galleries, descriptive storytelling,
                        and premium project presentation for both editorial browsing and client review.
                      </p>
                    </motion.div>
                  </div>
                </AnimatedSection>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
