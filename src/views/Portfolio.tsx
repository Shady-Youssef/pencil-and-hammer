"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollProgress from "@/components/ScrollProgress";
import { motion, AnimatePresence } from "framer-motion";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const categories = ["All", "Residential", "Commercial", "Hospitality"];

const projects = [
  { image: portfolio1, title: "Serene Retreat", category: "Residential", location: "Manhattan, NY" },
  { image: portfolio2, title: "Modern Elegance", category: "Residential", location: "Brooklyn, NY" },
  { image: portfolio3, title: "Warm Sanctuary", category: "Hospitality", location: "Westchester, NY" },
  { image: portfolio4, title: "Executive Suite", category: "Commercial", location: "Midtown, NY" },
  { image: portfolio5, title: "Grand Dining", category: "Hospitality", location: "SoHo, NY" },
  { image: portfolio6, title: "Artisan Lounge", category: "Commercial", location: "Tribeca, NY" },
];

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

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
                  onClick={() => setActive(cat)}
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
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="group cursor-pointer"
                  >
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-all duration-700 flex items-end p-8">
                        <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-600" style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}>
                          <span className="font-body text-xs tracking-[0.3em] uppercase text-gold-light block mb-2">
                            {project.category}
                          </span>
                          <h3 className="font-display text-2xl text-cream">{project.title}</h3>
                          <p className="font-body text-sm text-cream/60">{project.location}</p>
                        </div>
                      </div>
                      {/* Corner accents */}
                      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-cream/0 group-hover:border-cream/30 transition-all duration-500" />
                      <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-cream/0 group-hover:border-cream/30 transition-all duration-500" />
                    </motion.div>
                  </motion.div>
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
