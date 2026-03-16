"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import AnimatedSection from "@/components/AnimatedSection";
import type { ProjectRecord } from "@/lib/projects/data";
import { resolveProjectImageUrl } from "@/lib/projects/data";

type FeaturedWorkProps = {
  projects: ProjectRecord[];
};

export default function FeaturedWork({ projects }: FeaturedWorkProps) {
  if (projects.length === 0) {
    return null;
  }

  const [leadProject, ...secondaryProjects] = projects;
  const showcaseProjects = secondaryProjects.slice(0, 2);
  const indexProjects = projects.slice(0, 4);

  return (
    <section className="section-padding relative overflow-hidden bg-charcoal text-cream">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_20%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0)_100%)]" />

      <div className="relative mx-auto max-w-7xl">
        <AnimatedSection className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-body text-[11px] uppercase tracking-[0.34em] text-cream/54">
              Selected Work
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-light leading-tight text-cream sm:text-5xl md:text-6xl">
              A project presentation that feels architectural, not templated.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.26em] text-cream/72 transition-colors hover:text-cream"
          >
            See Full Portfolio
            <ArrowUpRight size={15} />
          </Link>
        </AnimatedSection>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <AnimatedSection scale>
            <Link href={`/portfolio/${leadProject.slug}`} className="group block h-full">
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative min-h-[34rem] overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/5"
              >
                <Image
                  src={resolveProjectImageUrl(leadProject.coverImageUrl)}
                  alt={leadProject.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.04)_0%,rgba(8,8,8,0.28)_40%,rgba(8,8,8,0.84)_100%)]" />

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <div className="max-w-xl rounded-[1.8rem] border border-white/10 bg-black/24 p-5 backdrop-blur-xl sm:p-6">
                    <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-cream/56">
                      <span>{leadProject.category}</span>
                      <span className="h-1 w-1 rounded-full bg-cream/30" />
                      <span>{leadProject.location}</span>
                      <span className="h-1 w-1 rounded-full bg-cream/30" />
                      <span>{leadProject.completionYear}</span>
                    </div>
                    <h3 className="mt-4 font-display text-3xl text-cream sm:text-4xl">
                      {leadProject.title}
                    </h3>
                    <p className="mt-4 max-w-lg font-body text-sm leading-7 text-cream/72 sm:text-base">
                      {leadProject.summary}
                    </p>
                  </div>
                </div>
              </motion.article>
            </Link>
          </AnimatedSection>

          <div className="grid gap-6">
            {showcaseProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.08} scale>
                <Link href={`/portfolio/${project.slug}`} className="group block">
                  <motion.article
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 md:grid-cols-[0.9fr_1.1fr]"
                  >
                    <div className="relative min-h-[18rem] overflow-hidden">
                      <Image
                        src={resolveProjectImageUrl(project.coverImageUrl)}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 28vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.04)_0%,rgba(8,8,8,0.4)_100%)]" />
                    </div>
                    <div className="flex flex-col justify-between p-6">
                      <div>
                        <p className="font-body text-[10px] uppercase tracking-[0.24em] text-cream/50">
                          {project.category}
                        </p>
                        <h3 className="mt-3 font-display text-2xl text-cream">
                          {project.title}
                        </h3>
                        <p className="mt-4 font-body text-sm leading-7 text-cream/70">
                          {project.summary}
                        </p>
                      </div>
                      <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                        <span className="font-body text-[10px] uppercase tracking-[0.22em] text-cream/46">
                          {project.location}
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="text-cream/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </AnimatedSection>
            ))}

            <AnimatedSection delay={0.16}>
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-[0.24em] text-cream/52">
                      Project Index
                    </p>
                    <p className="mt-2 font-display text-2xl text-cream">
                      Current portfolio selection
                    </p>
                  </div>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="mt-6 grid gap-3">
                  {indexProjects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/portfolio/${project.slug}`}
                      className="group flex items-center justify-between rounded-[1.2rem] border border-white/8 bg-black/18 px-4 py-4 transition-colors hover:border-white/18 hover:bg-white/[0.04]"
                    >
                      <div>
                        <p className="font-display text-xl text-cream">{project.title}</p>
                        <p className="mt-1 font-body text-[10px] uppercase tracking-[0.22em] text-cream/48">
                          {project.category} / {project.location}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={16}
                        className="text-cream/56 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
