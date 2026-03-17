"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Lightbulb, Paintbrush, Ruler, Sofa } from "lucide-react";

import AnimatedSection from "@/components/AnimatedSection";
import { useSiteSettings } from "@/components/site/site-settings-context";
import type { HomeServiceIcon } from "@/lib/site";

const serviceIconMap: Record<HomeServiceIcon, typeof Paintbrush> = {
  paintbrush: Paintbrush,
  ruler: Ruler,
  lightbulb: Lightbulb,
  sofa: Sofa,
};

export default function ServicesSection() {
  const { settings } = useSiteSettings();
  const sectionHighlights = settings.homeServicesHighlights.filter(
    (item) => item.label.trim() || item.text.trim(),
  );
  const services = settings.homeServices.filter(
    (service) =>
      service.title.trim() ||
      service.description.trim() ||
      service.note.trim() ||
      service.deliverables.some((item) => item.trim()),
  );

  return (
    <section className="section-padding relative overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(255,255,255,0.18),transparent_20%),radial-gradient(circle_at_84%_82%,rgba(0,0,0,0.08),transparent_24%)] dark:bg-[radial-gradient(circle_at_16%_16%,rgba(255,255,255,0.05),transparent_22%),radial-gradient(circle_at_82%_76%,rgba(255,255,255,0.03),transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl">
        <AnimatedSection className="grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:items-end">
          <div className="max-w-3xl">
            <p className="font-body text-[11px] uppercase tracking-[0.34em] text-muted-foreground dark:text-cream/56">
              {settings.homeServicesEyebrow}
            </p>
            <h2 className="display-section-title mt-5 font-display font-light text-foreground dark:text-cream">
              {settings.homeServicesTitle}
            </h2>
            <p className="mt-6 max-w-2xl font-body text-base leading-8 text-muted-foreground dark:text-cream/72">
              {settings.homeServicesBody}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {sectionHighlights.map((item) => (
              <div
                key={item.id}
                className="rounded-[1.85rem] border border-border/70 bg-card/88 p-5 shadow-[0_22px_55px_-38px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none sm:p-6"
              >
                <p className="font-body text-[10px] uppercase tracking-[0.24em] text-muted-foreground dark:text-cream/52">
                  {item.label}
                </p>
                <p className="mt-3 font-body text-sm leading-7 text-foreground/80 dark:text-cream/74">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6">
          {services.map((service, index) => {
            const Icon = serviceIconMap[service.icon] ?? Paintbrush;

            return (
              <AnimatedSection key={service.id} delay={index * 0.08} scale>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex h-full min-h-[22rem] flex-col rounded-[2rem] border border-border/70 bg-card/90 p-5 shadow-[0_28px_80px_-56px_rgba(0,0,0,0.16)] sm:p-7 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.025)_100%)] dark:shadow-[0_28px_80px_-56px_rgba(0,0,0,0.56)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border border-border/70 bg-background/82 dark:border-white/10 dark:bg-black/18">
                        <Icon
                          size={22}
                          strokeWidth={1.4}
                          className="text-foreground transition-transform duration-500 group-hover:scale-110 dark:text-cream"
                        />
                      </div>
                      <p className="font-body text-[10px] uppercase tracking-[0.24em] text-muted-foreground dark:text-cream/46">
                        Service 0{index + 1}
                      </p>
                    </div>

                    <span className="font-display text-[2.6rem] leading-none tracking-[-0.06em] text-foreground/[0.08] dark:text-cream/14">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="mt-7">
                    <h3 className="display-card-title font-display text-foreground dark:text-cream">
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-[34rem] font-body text-sm leading-7 text-muted-foreground dark:text-cream/70">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.deliverables.filter(Boolean).map((item, deliverableIndex) => (
                      <span
                        key={`${service.id}-deliverable-${deliverableIndex}`}
                        className="rounded-full border border-border/70 bg-secondary/55 px-3 py-1.5 font-body text-[11px] uppercase tracking-[0.14em] text-foreground/68 dark:border-white/10 dark:bg-black/16 dark:text-cream/64"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-8">
                    <div className="flex items-start justify-between gap-4 border-t border-border/70 pt-5 dark:border-white/10">
                      <div>
                        <p className="font-body text-[10px] uppercase tracking-[0.22em] text-muted-foreground dark:text-cream/46">
                          Scope Note
                        </p>
                        <p className="mt-2 max-w-[26rem] font-body text-sm leading-6 text-foreground/82 dark:text-cream/78">
                          {service.note}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={15}
                        className="mt-0.5 shrink-0 text-foreground/42 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-cream/42"
                      />
                    </div>
                  </div>
                </motion.article>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
