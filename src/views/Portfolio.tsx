"use client";

import { useMemo, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";

import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/projects/ProjectCard";
import ScrollProgress from "@/components/ScrollProgress";
import type { ProjectRecord } from "@/lib/projects/data";

type PortfolioProps = {
  projects: ProjectRecord[];
};

export default function Portfolio({ projects }: PortfolioProps) {
  const [active, setActive] = useState("All");
  const [, startTransition] = useTransition();
  const categories = useMemo(
    () => ["All", ...new Set(projects.map((project) => project.category))],
    [projects],
  );
  const filtered =
    active === "All"
      ? projects
      : projects.filter((project) => project.category === active);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="bg-background">
        <section className="relative overflow-hidden border-b border-border/60 pt-32 sm:pt-36">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0)_100%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-14 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:px-12">
            <AnimatedSection>
              <p className="font-body text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                Portfolio
              </p>
              <h1 className="mt-5 max-w-2xl font-display text-[3.3rem] font-light leading-[0.95] text-foreground sm:text-[4.5rem] md:text-[5.4rem]">
                Projects presented with more clarity and less clutter.
              </h1>
            </AnimatedSection>
            <AnimatedSection direction="right" className="lg:pt-8">
              <p className="max-w-xl font-body text-base leading-8 text-muted-foreground sm:text-lg">
                The portfolio is organized to show atmosphere, category, and project character quickly.
                Filter by sector, scan the work, and move into each project detail view without friction.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-padding">
          <div className="mx-auto max-w-7xl">
            <AnimatedSection className="mb-12 flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    startTransition(() => {
                      setActive(cat);
                    });
                  }}
                  className={`rounded-full border px-5 py-2.5 font-body text-[11px] font-medium uppercase tracking-[0.22em] transition-colors ${
                    active === cat
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card/70 text-muted-foreground hover:border-foreground/24 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </AnimatedSection>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
              >
                {filtered.map((project, index) => (
                  <AnimatedSection key={project.id} delay={index * 0.04} scale>
                    <ProjectCard project={project} priority={index < 2} />
                  </AnimatedSection>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
