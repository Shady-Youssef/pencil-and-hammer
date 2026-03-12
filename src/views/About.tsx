"use client";

import { motion } from "framer-motion";
import { Award, Clock, Globe, Home, Sparkles, Users } from "lucide-react";

import aboutTeam from "@/assets/about-team.jpg";
import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ParallaxImage from "@/components/ParallaxImage";
import ScrollProgress from "@/components/ScrollProgress";
import { useSiteSettings } from "@/components/site/site-settings-context";
import type { AboutStatIcon } from "@/lib/site";

const aboutIconMap: Record<AboutStatIcon, React.ElementType> = {
  award: Award,
  users: Users,
  clock: Clock,
  globe: Globe,
  sparkles: Sparkles,
  home: Home,
};

export default function About() {
  const { settings } = useSiteSettings();
  const heroImage = settings.aboutHeroImageUrl || aboutTeam;
  const storyTitle = settings.aboutStoryTitle.trim() || "Our Story";
  const storyParagraphs = settings.aboutStoryParagraphs.filter((paragraph) =>
    paragraph.body.trim(),
  );

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <section className="relative h-[70vh] overflow-hidden">
          <ParallaxImage
            src={heroImage}
            alt={settings.aboutHeroTitle || settings.siteName}
            className="absolute inset-0 h-full"
            speed={0.2}
          />
          <div className="overlay-dark absolute inset-0" />
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatedSection className="text-center">
              <div className="line-accent mx-auto mb-6" />
              <h1 className="font-display text-5xl font-light text-cream md:text-7xl lg:text-8xl">
                {settings.aboutHeroTitle}
              </h1>
              {settings.aboutHeroSubtitle ? (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 font-body text-base tracking-wide text-warm-gray"
                >
                  {settings.aboutHeroSubtitle}
                </motion.p>
              ) : null}
            </AnimatedSection>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="mx-auto max-w-7xl space-y-10 lg:space-y-14">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-12 xl:gap-16">
              <AnimatedSection direction="left">
                {settings.aboutPortraitUrl ? (
                  <div className="overflow-hidden rounded-[1.8rem] border border-border bg-card">
                    <img
                      src={settings.aboutPortraitUrl}
                      alt={settings.aboutPortraitAlt || storyTitle}
                      className="h-[460px] w-full object-cover object-center sm:h-[560px] lg:h-[640px] xl:h-[760px]"
                    />
                  </div>
                ) : null}
              </AnimatedSection>

              <AnimatedSection direction="right" className="lg:pt-6 xl:pt-10">
                <div className="line-accent mb-6" />
                <h2 className="mb-6 font-display text-4xl font-light text-foreground md:text-5xl xl:text-6xl">
                  {storyTitle}
                </h2>
                <div className="space-y-5 lg:space-y-6">
                  {storyParagraphs.map((paragraph) => (
                    <p
                      key={paragraph.id}
                      className="font-body text-base leading-relaxed text-muted-foreground sm:text-lg"
                    >
                      {paragraph.body}
                    </p>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection>
              <div
                className="mx-auto grid max-w-7xl justify-center gap-4 sm:gap-5"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 320px))",
                }}
              >
                {settings.aboutStats.map((stat, index) => {
                  const Icon = aboutIconMap[stat.icon] ?? Award;

                  return (
                    <motion.div
                      key={stat.id}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="neo-border w-full rounded-sm border border-border bg-card p-6 text-center sm:p-7"
                    >
                      <Icon size={24} strokeWidth={1.2} className="mx-auto mb-3 text-accent" />
                      <motion.p
                        className="font-display text-3xl text-foreground"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                      >
                        {stat.title}
                      </motion.p>
                      <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                        {stat.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-padding relative overflow-hidden bg-charcoal">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <motion.div
              className="h-[400px] w-[400px] rounded-full border border-gold/5"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="relative mx-auto max-w-4xl text-center">
            <AnimatedSection>
              <div className="line-accent mx-auto mb-8" />
              <h2 className="mb-8 font-display text-4xl font-light text-cream md:text-5xl">
                {settings.aboutPhilosophyTitle}
              </h2>
              <p className="font-display text-2xl font-light italic leading-relaxed text-warm-gray md:text-3xl">
                {settings.aboutPhilosophyQuote}
              </p>
              {settings.aboutPhilosophyAttribution ? (
                <p className="mt-8 font-body text-sm uppercase tracking-widest text-gold">
                  {settings.aboutPhilosophyAttribution}
                </p>
              ) : null}
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
