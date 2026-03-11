"use client";

import { useMemo, useState, useTransition } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollProgress from "@/components/ScrollProgress";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/projects/ProjectCard";
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
      <main>
        {/* Hero */}
        <section className="pt-36 pb-16 section-padding bg-background">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center">
              <div className="line-accent mx-auto mb-6" />
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-foreground mb-4">
                Our Portfolio
              </h1>
              <p className="font-body text-muted-foreground max-w-lg mx-auto">
                A curated collection of our most distinguished projects.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Filter + Grid */}
        <section className="section-padding pt-0 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center gap-6 mb-16 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    startTransition(() => {
                      setActive(cat);
                    });
                  }}
                  className={`relative font-body text-sm tracking-widest uppercase pb-2 transition-colors ${
                    active === cat
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                  {active === cat && (
                    <motion.div
                      layoutId="portfolio-filter"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ y: 24, scale: 0.992 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: -16, scale: 0.992 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filtered.map((project, i) => (
                  <AnimatedSection key={project.id} delay={i * 0.06} scale>
                    <ProjectCard project={project} priority={i < 2} />
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
