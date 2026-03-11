"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollProgress from "@/components/ScrollProgress";
import ParallaxImage from "@/components/ParallaxImage";
import aboutTeam from "@/assets/about-team.jpg";
import { Award, Users, Clock, Globe } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Award, value: "150+", label: "Projects Completed" },
  { icon: Users, value: "12", label: "Team Members" },
  { icon: Clock, value: "15", label: "Years Experience" },
  { icon: Globe, value: "8", label: "Countries Served" },
];

export default function About() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-[70vh] overflow-hidden">
          <ParallaxImage src={aboutTeam} alt="MBM Design Studio" className="absolute inset-0 h-full" speed={0.2} />
          <div className="overlay-dark absolute inset-0" />
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatedSection className="text-center">
              <div className="line-accent mx-auto mb-6" />
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-cream">About Us</h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-body text-warm-gray mt-4 text-base tracking-wide"
              >
                The story behind the spaces
              </motion.p>
            </AnimatedSection>
          </div>
        </section>

        {/* Story */}
        <section className="section-padding bg-background">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <AnimatedSection direction="left">
              <div className="line-accent mb-6" />
              <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-6">
                Our Story
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Founded in 2010, MBM Designs has grown from a boutique studio into one of New York's most sought-after interior design firms. We believe that exceptional design is born from the intersection of artistry, innovation, and deep understanding of how people live.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                Every project we undertake is a collaborative journey. We listen, we dream, and we create spaces that are not only visually stunning but deeply personal — environments that enhance your daily life and stand the test of time.
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-card p-6 rounded-sm border border-border neo-border text-center"
                  >
                    <stat.icon size={24} strokeWidth={1.2} className="text-accent mx-auto mb-3" />
                    <motion.p
                      className="font-display text-3xl text-foreground"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="font-body text-xs text-muted-foreground tracking-wider uppercase mt-1">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Philosophy */}
        <section className="section-padding bg-charcoal relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-[400px] h-[400px] rounded-full border border-gold/5"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="max-w-4xl mx-auto text-center relative">
            <AnimatedSection>
              <div className="line-accent mx-auto mb-8" />
              <h2 className="font-display text-4xl md:text-5xl font-light text-cream mb-8">
                Our Philosophy
              </h2>
              <p className="font-display text-2xl md:text-3xl font-light text-warm-gray italic leading-relaxed">
                "Great design is not about following trends — it's about creating timeless spaces that resonate with the soul of those who inhabit them."
              </p>
              <p className="font-body text-sm text-gold tracking-widest uppercase mt-8">
                — Maria Bello, Founder
              </p>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
