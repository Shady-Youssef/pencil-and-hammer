"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import aboutTeamImage from "@/assets/about-team.jpg";
import AnimatedSection from "@/components/AnimatedSection";
import { useSiteSettings } from "@/components/site/site-settings-context";

export default function OurStorySection() {
  const { settings } = useSiteSettings();
  const storyEyebrow = settings.homeStoryEyebrow.trim() || "Our Story";
  const storyTitle =
    settings.homeStoryTitle.trim() ||
    "A studio shaped around design clarity, site rigor, and calm execution.";
  const storyParagraphs = settings.homeStoryParagraphs.filter((paragraph) =>
    paragraph.body.trim(),
  );
  const storyStats = settings.homeStoryMetrics;
  const hasStoryImage = Boolean(settings.homeStoryImageUrl);
  const primaryCtaLabel =
    settings.homeStoryPrimaryCtaLabel.trim() || "Explore The Studio";
  const primaryCtaHref = settings.homeStoryPrimaryCtaHref.trim() || "/about";
  const secondaryCtaLabel =
    settings.homeStorySecondaryCtaLabel.trim() || "Start A Conversation";
  const secondaryCtaHref = settings.homeStorySecondaryCtaHref.trim() || "/contact";

  return (
    <section className="section-padding relative overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.58),transparent_22%),radial-gradient(circle_at_86%_80%,rgba(0,0,0,0.05),transparent_24%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_22%),radial-gradient(circle_at_82%_74%,rgba(255,255,255,0.03),transparent_24%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-stretch">
        <AnimatedSection direction="left">
          <div className="relative h-full min-h-[26rem] overflow-hidden rounded-[2.4rem] border border-border/70 bg-card shadow-[0_28px_70px_-46px_rgba(0,0,0,0.18)] dark:border-white/10 dark:bg-card">
            {hasStoryImage ? (
              <div className="absolute inset-0">
                <img
                  src={settings.homeStoryImageUrl}
                  alt={settings.homeStoryImageAlt || settings.siteName}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ) : (
              <Image
                src={aboutTeamImage}
                alt={`${settings.siteName} team`}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
            )}
          </div>
        </AnimatedSection>

            <div className="grid gap-6">
          <AnimatedSection direction="right">
            <div className="rounded-[2.4rem] border border-border/70 bg-card/88 p-7 shadow-[0_28px_70px_-46px_rgba(0,0,0,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-9">
              <p className="font-body text-[11px] uppercase tracking-[0.34em] text-muted-foreground dark:text-cream/56">
                {storyEyebrow}
              </p>
              <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.75rem,4.8vw,5.2rem)] font-light leading-[0.94] tracking-[-0.04em] text-foreground dark:text-cream">
                {storyTitle}
              </h2>
              <div className="mt-7 space-y-5">
                {storyParagraphs.map((paragraph) => (
                  <p
                    key={paragraph.id}
                    className="max-w-2xl font-body text-base leading-8 text-muted-foreground dark:text-cream/72"
                  >
                    {paragraph.body}
                  </p>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={primaryCtaHref}
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-foreground px-8 py-4 font-body text-xs font-semibold uppercase tracking-[0.24em] text-background transition-opacity hover:opacity-88 sm:w-auto"
                >
                  {primaryCtaLabel}
                  <ArrowUpRight size={15} />
                </a>
                <a
                  href={secondaryCtaHref}
                  className="inline-flex items-center justify-center rounded-full border border-border/80 bg-background/75 px-8 py-4 font-body text-xs uppercase tracking-[0.24em] text-foreground transition-colors hover:border-foreground/24 hover:bg-background dark:border-white/10 dark:bg-black/18 dark:text-cream dark:hover:border-white/22"
                >
                  {secondaryCtaLabel}
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-3">
              {storyStats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[1.8rem] border border-border/70 bg-card/82 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <p className="font-body text-[10px] uppercase tracking-[0.24em] text-muted-foreground dark:text-cream/52">
                    0{index + 1}
                  </p>
                  <p className="mt-6 font-display text-[2.15rem] leading-none text-foreground sm:text-[2.3rem] dark:text-cream">
                    {stat.value}
                  </p>
                  <p className="mt-3 font-body text-sm leading-7 text-muted-foreground dark:text-cream/70">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
