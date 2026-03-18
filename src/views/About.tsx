"use client";

import type { ElementType } from "react";
import { motion } from "framer-motion";
import { Award, Clock, Compass, Eye, Globe, Home, Sparkles, Users } from "lucide-react";

import aboutTeam from "@/assets/about-team.jpg";
import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ParallaxImage from "@/components/ParallaxImage";
import ScrollProgress from "@/components/ScrollProgress";
import { useSiteSettings } from "@/components/site/site-settings-context";
import type { AboutStatIcon } from "@/lib/site";

const aboutIconMap: Record<AboutStatIcon, ElementType> = {
  award: Award,
  users: Users,
  clock: Clock,
  globe: Globe,
  sparkles: Sparkles,
  home: Home,
};

function isBrandAsset(url: string, storagePath: string | null, logoUrl: string, logoStoragePath: string | null) {
  const normalizedUrl = url.trim().toLowerCase();
  const normalizedLogoUrl = logoUrl.trim().toLowerCase();
  const normalizedStoragePath = storagePath?.trim().toLowerCase() ?? "";
  const normalizedLogoStoragePath = logoStoragePath?.trim().toLowerCase() ?? "";

  if (!normalizedUrl) {
    return false;
  }

  if (
    (normalizedStoragePath && normalizedLogoStoragePath && normalizedStoragePath === normalizedLogoStoragePath) ||
    normalizedUrl === normalizedLogoUrl
  ) {
    return true;
  }

  return /logo|mark|icon|lockup|wordmark/.test(normalizedUrl);
}

export default function About() {
  const { settings } = useSiteSettings();
  const heroImage = settings.aboutHeroImageUrl || aboutTeam;
  const storyTitle = settings.aboutStoryTitle.trim() || "Our Story";
  const storyParagraphs = settings.aboutStoryParagraphs.filter((paragraph) =>
    paragraph.body.trim(),
  );
  const missionVisionEyebrow =
    settings.aboutMissionVisionEyebrow.trim() || "Mission & Vision";
  const missionVisionTitle =
    settings.aboutMissionVisionTitle.trim() ||
    "Design intent should survive the realities of execution.";
  const missionVisionBody =
    settings.aboutMissionVisionBody.trim() ||
    "Pencil And Hammer is built around a simple belief: strong interiors come from alignment, not handoff friction. We connect concept, technical coordination, procurement thinking, and delivery support so each decision strengthens the final space instead of compromising it.";
  const missionTitle = settings.aboutMissionTitle.trim() || "Our Mission";
  const missionBody =
    settings.aboutMissionBody.trim() ||
    "To lead every project with one disciplined process that keeps strategy, detailing, and site execution working together from the first brief to the final handover.";
  const visionTitle = settings.aboutVisionTitle.trim() || "Our Vision";
  const visionBody =
    settings.aboutVisionBody.trim() ||
    "To be the studio clients trust for interiors that feel calm, precise, and enduring because they are resolved with as much rigor in delivery as they are in design.";
  const missionVisionPillars = ["Strategy", "Coordination", "Delivery"];
  const portraitIsBrandAsset = isBrandAsset(
    settings.aboutPortraitUrl,
    settings.aboutPortraitStoragePath,
    settings.logoUrl,
    settings.logoStoragePath,
  );

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="bg-background">
        <section className="relative overflow-hidden border-b border-border/60 pt-32 sm:pt-36">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_22%),linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0)_100%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-16 sm:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14 lg:px-12">
            <AnimatedSection className="self-center">
              <p className="font-body text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                About The Studio
              </p>
              <h1 className="mt-5 max-w-xl font-display text-[3.3rem] font-light leading-[0.95] text-foreground sm:text-[4.5rem] md:text-[5.4rem]">
                {settings.aboutHeroTitle}
              </h1>
              {settings.aboutHeroSubtitle ? (
                <p className="mt-6 max-w-xl font-body text-base leading-8 text-muted-foreground sm:text-lg">
                  {settings.aboutHeroSubtitle}
                </p>
              ) : null}
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-border/70 bg-card/75 p-5 backdrop-blur-xl">
                  <p className="font-body text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Studio Model
                  </p>
                  <p className="mt-3 font-body text-sm leading-7 text-foreground/82">
                    One team across concept design, coordination, procurement guidance, and delivery support.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-border/70 bg-card/75 p-5 backdrop-blur-xl">
                  <p className="font-body text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Working Style
                  </p>
                  <p className="mt-3 font-body text-sm leading-7 text-foreground/82">
                    Clear communication, controlled detailing, and interiors that stay strong beyond presentation day.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="relative min-h-[28rem] overflow-hidden rounded-[2.4rem] border border-border/70 bg-charcoal shadow-[0_28px_80px_-40px_rgba(0,0,0,0.45)] sm:min-h-[34rem]">
                <ParallaxImage
                  src={heroImage}
                  alt={settings.aboutHeroTitle || settings.siteName}
                  className="absolute inset-0 h-full"
                  speed={0.18}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.1)_0%,rgba(8,8,8,0.56)_100%)]" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="max-w-md rounded-[1.6rem] border border-white/10 bg-black/22 p-5 backdrop-blur-xl">
                    <p className="font-body text-[10px] uppercase tracking-[0.24em] text-cream/56">
                      Pencil And Hammer
                    </p>
                    <p className="mt-3 font-display text-[2rem] leading-tight text-cream sm:text-[2.4rem]">
                      Spaces resolved with discipline, not decoration.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-padding">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14">
            {settings.aboutPortraitUrl ? (
              <AnimatedSection direction="left">
                <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-[0_24px_70px_-44px_rgba(0,0,0,0.18)]">
                  {portraitIsBrandAsset ? (
                    <div className="bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_58%)] p-4 dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_58%)] sm:p-5 lg:p-6">
                      <div className="flex aspect-[5/4] w-full items-center justify-center rounded-[1.6rem] border border-border/70 bg-background/82 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] dark:border-white/10 dark:bg-black/36 sm:aspect-[4/3] sm:p-5 lg:p-6">
                        <div className="h-full w-full overflow-hidden rounded-[1.1rem] sm:rounded-[1.25rem]">
                          <img
                            src={settings.aboutPortraitUrl}
                            alt={settings.aboutPortraitAlt || storyTitle}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={settings.aboutPortraitUrl}
                      alt={settings.aboutPortraitAlt || storyTitle}
                      className="h-[28rem] w-full object-cover object-center sm:h-[36rem] lg:h-[42rem]"
                    />
                  )}
                </div>
              </AnimatedSection>
            ) : null}

            <AnimatedSection direction="right" className="lg:pt-6">
              <p className="font-body text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
                Studio Narrative
              </p>
              <h2 className="mt-5 max-w-2xl font-display text-4xl font-light leading-tight text-foreground sm:text-5xl md:text-6xl">
                {storyTitle}
              </h2>
              <div className="mt-8 space-y-6">
                {storyParagraphs.map((paragraph) => (
                  <p
                    key={paragraph.id}
                    className="max-w-2xl font-body text-base leading-8 text-muted-foreground sm:text-lg"
                  >
                    {paragraph.body}
                  </p>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-padding relative overflow-hidden pt-0">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(255,255,255,0.3),transparent_22%),radial-gradient(circle_at_88%_84%,rgba(0,0,0,0.08),transparent_24%)] dark:bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_82%_76%,rgba(255,255,255,0.04),transparent_22%)]" />

          <AnimatedSection className="relative mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.56)_100%)] shadow-[0_30px_90px_-54px_rgba(0,0,0,0.2)] backdrop-blur-xl dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.055)_0%,rgba(255,255,255,0.02)_100%)] dark:shadow-[0_30px_90px_-54px_rgba(0,0,0,0.72)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.65),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.18),transparent_52%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.06),transparent_24%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_52%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.03),transparent_24%)]" />
              <div className="pointer-events-none absolute -left-20 top-12 h-40 w-40 rounded-full bg-foreground/6 blur-3xl dark:bg-white/6" />
              <div className="pointer-events-none absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-foreground/8 blur-3xl dark:bg-white/5" />

              <div className="relative grid gap-5 p-4 sm:gap-6 sm:p-6 lg:p-8">
                <div className="grid gap-5 xl:grid-cols-[minmax(0,1.14fr)_minmax(18rem,0.86fr)]">
                  <div className="rounded-[2.15rem] border border-border/70 bg-background/72 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-black/20 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <p className="font-body text-[11px] uppercase tracking-[0.34em] text-muted-foreground dark:text-cream/56">
                      {missionVisionEyebrow}
                    </p>
                    <h2 className="display-section-title mt-5 max-w-3xl font-display font-light text-foreground dark:text-cream">
                      {missionVisionTitle}
                    </h2>
                    <div className="mt-6 h-px w-full max-w-24 bg-gradient-to-r from-foreground/30 via-foreground/12 to-transparent dark:from-white/36 dark:via-white/12" />
                    <p className="mt-6 max-w-3xl font-body text-base leading-8 text-muted-foreground sm:text-lg dark:text-cream/72">
                      {missionVisionBody}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-2.5">
                      {missionVisionPillars.map((pillar) => (
                        <span
                          key={pillar}
                          className="rounded-full border border-border/70 bg-background/82 px-3 py-1.5 font-body text-[10px] uppercase tracking-[0.2em] text-foreground/72 dark:border-white/10 dark:bg-white/[0.04] dark:text-cream/68"
                        >
                          {pillar}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
                    <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/86 px-5 py-6 text-foreground shadow-[0_24px_60px_-44px_rgba(0,0,0,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:text-cream dark:shadow-none sm:px-6">
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.3),transparent_48%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_28%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_48%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_28%)]" />
                      <p className="relative font-body text-[10px] uppercase tracking-[0.26em] text-muted-foreground dark:text-cream/48">
                        Studio Direction
                      </p>
                      <p className="relative mt-5 font-display text-[2.6rem] leading-[0.9] tracking-[-0.05em] text-foreground dark:text-cream">
                        01
                      </p>
                      <p className="relative mt-4 max-w-[18rem] font-body text-sm leading-7 text-muted-foreground dark:text-cream/72">
                        One studio language carried from the first brief to the final handover.
                      </p>
                    </div>

                    <div className="rounded-[2rem] border border-border/70 bg-card/86 px-5 py-6 shadow-[0_24px_60px_-44px_rgba(0,0,0,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none sm:px-6">
                      <p className="font-body text-[10px] uppercase tracking-[0.26em] text-muted-foreground dark:text-cream/48">
                        02
                      </p>
                      <p className="mt-4 font-display text-[1.7rem] leading-tight text-foreground dark:text-cream">
                        Built For Clarity
                      </p>
                      <p className="mt-3 font-body text-sm leading-7 text-muted-foreground dark:text-cream/68">
                        Fewer handoff gaps, stronger detailing, and decisions that stay consistent.
                      </p>
                    </div>

                    <div className="rounded-[2rem] border border-border/70 bg-card/86 px-5 py-6 shadow-[0_24px_60px_-44px_rgba(0,0,0,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none sm:px-6">
                      <p className="font-body text-[10px] uppercase tracking-[0.26em] text-muted-foreground dark:text-cream/48">
                        03
                      </p>
                      <p className="mt-4 font-display text-[1.7rem] leading-tight text-foreground dark:text-cream">
                        Made To Last
                      </p>
                      <p className="mt-3 font-body text-sm leading-7 text-muted-foreground dark:text-cream/68">
                        Interiors that remain composed, practical, and commercially grounded beyond launch.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <AnimatedSection delay={0.04}>
                    <motion.article
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative flex h-full min-h-[19rem] flex-col overflow-hidden rounded-[2.15rem] border border-border/70 bg-background/84 p-6 shadow-[0_24px_72px_-48px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none"
                    >
                      <div className="pointer-events-none absolute right-4 top-3 font-display text-[4.6rem] leading-none tracking-[-0.08em] text-foreground/[0.06] dark:text-cream/[0.09] sm:right-6 sm:text-[5.6rem]">
                        01
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-border/70 bg-card/92 dark:border-white/10 dark:bg-black/16">
                          <Compass
                            size={21}
                            strokeWidth={1.5}
                            className="text-foreground transition-transform duration-500 group-hover:rotate-12 dark:text-cream"
                          />
                        </div>
                        <p className="font-body text-[10px] uppercase tracking-[0.24em] text-muted-foreground dark:text-cream/46">
                          Mission
                        </p>
                      </div>
                      <h3 className="mt-8 max-w-[18rem] font-display text-[clamp(2.15rem,5vw,3.1rem)] font-light leading-[0.94] text-foreground dark:text-cream">
                        {missionTitle}
                      </h3>
                      <p className="mt-5 max-w-[32rem] font-body text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8 dark:text-cream/70">
                        {missionBody}
                      </p>
                      <div className="mt-auto pt-8">
                        <div className="h-px w-full bg-gradient-to-r from-foreground/24 via-foreground/10 to-transparent dark:from-white/28 dark:via-white/10" />
                      </div>
                    </motion.article>
                  </AnimatedSection>

                  <AnimatedSection delay={0.1}>
                    <motion.article
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="group relative flex h-full min-h-[19rem] flex-col overflow-hidden rounded-[2.15rem] border border-white/10 bg-charcoal p-6 text-cream shadow-[0_28px_80px_-46px_rgba(0,0,0,0.56)] sm:p-8"
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />
                      <div className="pointer-events-none absolute right-4 top-3 font-display text-[4.6rem] leading-none tracking-[-0.08em] text-cream/10 sm:right-6 sm:text-[5.6rem]">
                        02
                      </div>
                      <div className="relative flex items-center justify-between gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-white/10 bg-white/[0.05]">
                          <Eye
                            size={21}
                            strokeWidth={1.5}
                            className="text-cream transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <p className="font-body text-[10px] uppercase tracking-[0.24em] text-cream/46">
                          Vision
                        </p>
                      </div>
                      <h3 className="relative mt-8 max-w-[18rem] font-display text-[clamp(2.15rem,5vw,3.1rem)] font-light leading-[0.94] text-cream">
                        {visionTitle}
                      </h3>
                      <p className="relative mt-5 max-w-[32rem] font-body text-sm leading-7 text-cream/72 sm:text-base sm:leading-8">
                        {visionBody}
                      </p>
                      <div className="relative mt-auto pt-8">
                        <div className="h-px w-full bg-gradient-to-r from-white/28 via-white/10 to-transparent" />
                      </div>
                    </motion.article>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        <section className="section-padding pt-0">
          <AnimatedSection className="mx-auto max-w-7xl">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {settings.aboutStats.map((stat, index) => {
                const Icon = aboutIconMap[stat.icon] ?? Award;

                return (
                  <motion.div
                    key={stat.id}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-[1.8rem] border border-border/70 bg-card/78 p-6 backdrop-blur-xl"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-border/70 bg-background/75">
                        <Icon size={22} strokeWidth={1.3} className="text-foreground" />
                      </div>
                      <p className="font-body text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        0{index + 1}
                      </p>
                    </div>
                    <p className="mt-8 font-display text-[2.5rem] text-foreground">{stat.title}</p>
                    <p className="mt-2 font-body text-sm leading-7 text-muted-foreground">
                      {stat.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>
        </section>

        <section className="section-padding pt-0">
          <AnimatedSection className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-[2.4rem] border border-border/70 bg-charcoal px-7 py-12 text-center text-cream shadow-[0_30px_80px_-50px_rgba(0,0,0,0.72)] sm:px-10 sm:py-16">
              <p className="font-body text-[11px] uppercase tracking-[0.32em] text-cream/48">
                Philosophy
              </p>
              <h2 className="mt-5 font-display text-4xl font-light text-cream sm:text-5xl">
                {settings.aboutPhilosophyTitle}
              </h2>
              <p className="mx-auto mt-8 max-w-3xl font-display text-[2rem] font-light italic leading-tight text-cream/82 sm:text-[2.5rem]">
                {settings.aboutPhilosophyQuote}
              </p>
              {settings.aboutPhilosophyAttribution ? (
                <p className="mt-8 font-body text-[11px] uppercase tracking-[0.28em] text-cream/52">
                  {settings.aboutPhilosophyAttribution}
                </p>
              ) : null}
            </div>
          </AnimatedSection>
        </section>
      </main>
      <Footer />
    </>
  );
}
