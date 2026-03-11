"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Homeowner",
    text: "MBM Designs transformed our home beyond anything we imagined. Every detail was considered with such care and precision.",
    initials: "SM",
  },
  {
    name: "James Chen",
    role: "CEO, Luxe Hotels",
    text: "Their understanding of luxury hospitality design is unparalleled. Our guests consistently praise the ambiance they created.",
    initials: "JC",
  },
  {
    name: "Olivia Park",
    role: "Real Estate Developer",
    text: "Working with MBM elevated our properties' value significantly. Their designs are both timeless and market-savvy.",
    initials: "OP",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-charcoal relative overflow-hidden">
      {/* Decorative orb */}
      <div className="absolute right-0 top-0 h-[280px] w-[280px] rounded-full pointer-events-none sm:h-[380px] sm:w-[380px] lg:h-[500px] lg:w-[500px]"
        style={{ background: "radial-gradient(circle, hsla(38, 60%, 52%, 0.04), transparent 70%)" }}
      />
      
      <div className="max-w-7xl mx-auto relative">
        <AnimatedSection className="mb-12 text-center sm:mb-16 md:mb-20">
          <div className="line-accent mx-auto mb-6" />
          <h2 className="font-display text-3xl font-light text-cream sm:text-4xl md:text-6xl">
            Client Voices
          </h2>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.15} scale>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card-hover relative rounded-sm p-6 sm:p-8"
              >
                <Quote size={28} className="text-gold/20 mb-4" />
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ y: 6, scale: 0.82 }}
                      whileInView={{ y: 0, scale: 1 }}
                      viewport={{ once: false, amount: 0.7 }}
                      transition={{ delay: 0.22 + j * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Star size={14} className="fill-gold text-gold" />
                    </motion.div>
                  ))}
                </div>
                <p className="font-body text-sm text-warm-gray leading-relaxed mb-8 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="font-body text-xs font-medium text-gold">{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-display text-lg text-cream">{t.name}</p>
                    <p className="font-body text-xs text-warm-gray tracking-wider uppercase">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
