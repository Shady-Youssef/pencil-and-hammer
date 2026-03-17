"use client";

import { motion } from "framer-motion";
import { Lightbulb, Paintbrush, Ruler, Sofa } from "lucide-react";

import AnimatedSection from "@/components/AnimatedSection";
import { useSiteSettings } from "@/components/site/site-settings-context";
import type { HomeServiceIcon } from "@/lib/site";

const serviceIconMap: Record<HomeServiceIcon, typeof Paintbrush> = {
  paintbrush: Paintbrush,
  ruler: Ruler,
  lightbulb: Lightbulb,
  sofa: Sofa,
};

function getServiceCardSpan(total: number, index: number) {
  if (total <= 1) {
    return "xl:col-span-6";
  }

  if (total === 2) {
    return "xl:col-span-3";
  }

  if (total === 3) {
    return "xl:col-span-2";
  }

  const remainder = total % 3;

  if (remainder === 1) {
    const splitIndex = total - 4;
    return index >= splitIndex ? "xl:col-span-3" : "xl:col-span-2";
  }

  if (remainder === 2) {
    const splitIndex = total - 2;
    return index >= splitIndex ? "xl:col-span-3" : "xl:col-span-2";
  }

  return "xl:col-span-2";
}

export default function ServicesSection() {
  const { settings } = useSiteSettings();
  const sectionHighlights = settings.homeServicesHighlights.filter(
    (item) => item.label.trim() || item.text.trim(),
  );
  const services = settings.homeServices.filter(
    (service) =>
      service.title.trim() ||
      service.description.trim() ||
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

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:mt-12 xl:grid-cols-6 xl:gap-5">
          {services.map((service, index) => {
            const Icon = serviceIconMap[service.icon] ?? Paintbrush;
            const spanClassName = getServiceCardSpan(services.length, index);

            return (
              <AnimatedSection
                key={service.id}
                delay={index * 0.08}
                scale
                className={spanClassName}
              >
                <motion.article
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex h-full min-h-[16rem] flex-col rounded-[1.75rem] border border-border/70 bg-card/90 p-4 shadow-[0_24px_72px_-56px_rgba(0,0,0,0.16)] sm:p-5 xl:min-h-[15rem] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.025)_100%)] dark:shadow-[0_24px_72px_-56px_rgba(0,0,0,0.56)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.95rem] border border-border/70 bg-background/82 dark:border-white/10 dark:bg-black/18">
                        <Icon
                          size={20}
                          strokeWidth={1.4}
                          className="text-foreground transition-transform duration-500 group-hover:scale-110 dark:text-cream"
                        />
                      </div>
                      <p className="font-body text-[10px] uppercase tracking-[0.24em] text-muted-foreground dark:text-cream/46">
                        Service 0{index + 1}
                      </p>
                    </div>

                    <span className="font-display text-[2.15rem] leading-none tracking-[-0.06em] text-foreground/[0.08] xl:text-[2rem] dark:text-cream/14">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="mt-5">
                    <h3 className="font-display text-[clamp(2rem,2.2vw,2.85rem)] leading-[0.94] tracking-[-0.04em] text-foreground dark:text-cream">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-[28rem] font-body text-sm leading-6 text-muted-foreground dark:text-cream/70">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.deliverables.filter(Boolean).map((item, deliverableIndex) => (
                      <span
                        key={`${service.id}-deliverable-${deliverableIndex}`}
                        className="rounded-full border border-border/70 bg-secondary/55 px-2.5 py-1 font-body text-[10px] uppercase tracking-[0.14em] text-foreground/68 dark:border-white/10 dark:bg-black/16 dark:text-cream/64"
                      >
                        {item}
                      </span>
                    ))}
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
