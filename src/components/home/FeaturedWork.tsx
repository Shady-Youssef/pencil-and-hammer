"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

const projects = [
  { image: portfolio1, title: "Serene Retreat", category: "Bedroom", location: "Manhattan, NY" },
  { image: portfolio2, title: "Modern Elegance", category: "Kitchen", location: "Brooklyn, NY" },
  { image: portfolio3, title: "Warm Sanctuary", category: "Bathroom", location: "Westchester, NY" },
];

export default function FeaturedWork() {
  return (
    <section className="section-padding bg-secondary/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-4">
          <div>
            <div className="line-accent mb-6" />
            <h2 className="font-display text-4xl md:text-6xl font-light text-foreground">
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

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 0.15} scale>
              <Link href="/portfolio" className="group block">
                <motion.div
                  className="relative overflow-hidden aspect-[4/5] rounded-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-700" />
                  
                  {/* Hover overlay content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <motion.div
                      initial={false}
                      className="translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-600"
                      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
                    >
                      <span className="font-body text-xs tracking-[0.3em] uppercase text-gold-light block mb-2">
                        {project.category}
                      </span>
                      <h3 className="font-display text-2xl text-cream mb-1">{project.title}</h3>
                      <p className="font-body text-sm text-cream/60">{project.location}</p>
                    </motion.div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-cream/0 group-hover:border-cream/30 transition-all duration-500" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-cream/0 group-hover:border-cream/30 transition-all duration-500" />
                </motion.div>
                <div className="pt-6">
                  <h3 className="font-display text-xl text-foreground group-hover:text-accent transition-colors duration-300">{project.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mt-1">{project.location}</p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
