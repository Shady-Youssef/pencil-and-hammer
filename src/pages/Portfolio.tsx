import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
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
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 section-padding bg-background">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection className="text-center">
              <div className="line-accent mx-auto mb-6" />
              <h1 className="font-display text-5xl md:text-7xl font-light text-foreground mb-4">
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
            <div className="flex justify-center gap-6 mb-12 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`font-body text-sm tracking-widest uppercase pb-2 border-b-2 transition-colors ${
                    active === cat
                      ? "border-accent text-accent"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((project) => (
                  <div key={project.title} className="group cursor-pointer">
                    <div className="relative overflow-hidden aspect-[4/5] rounded-sm">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-500 flex items-end p-6">
                        <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <span className="font-body text-xs tracking-widest uppercase text-gold-light block mb-1">
                            {project.category}
                          </span>
                          <h3 className="font-display text-2xl text-cream">{project.title}</h3>
                          <p className="font-body text-sm text-warm-gray">{project.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
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
