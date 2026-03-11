"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/projects/ProjectCard";
import type { ProjectRecord } from "@/lib/projects/data";

type FeaturedWorkProps = {
  projects: ProjectRecord[];
};

export default function FeaturedWork({ projects }: FeaturedWorkProps) {
  return (
    <section className="section-padding bg-secondary/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="mb-12 flex flex-col items-start justify-between gap-4 sm:mb-16 md:mb-20 md:flex-row md:items-end">
          <div>
            <div className="line-accent mb-6" />
            <h2 className="font-display text-3xl font-light text-foreground sm:text-4xl md:text-6xl">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group font-body text-sm tracking-widest uppercase text-accent hover:text-gold-dark transition-colors flex items-center gap-2"
          >
            View All
            <motion.span whileHover={{ x: 4, y: -4 }} transition={{ duration: 0.2 }}>
              <ArrowUpRight size={14} />
            </motion.span>
          </Link>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {projects.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 0.15} scale>
              <ProjectCard project={project} priority={i === 0} compact />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
