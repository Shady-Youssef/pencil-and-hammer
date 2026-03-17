"use client";

import type { ElementType } from "react";
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
