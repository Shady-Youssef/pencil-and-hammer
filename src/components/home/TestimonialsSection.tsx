"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import AnimatedSection from "@/components/AnimatedSection";
import type { TestimonialRecord } from "@/lib/testimonials/data";

type TestimonialsSectionProps = {
  testimonials: TestimonialRecord[];
};

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) {
    return null;
  }

  const [leadTestimonial, ...supportingTestimonials] = testimonials;
  const visibleSupportingTestimonials = supportingTestimonials.slice(0, 2);

  return (
    <section className="section-padding relative overflow-hidden bg-background text-foreground dark:text-cream">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.22),transparent_22%),radial-gradient(circle_at_82%_78%,rgba(0,0,0,0.05),transparent_24%)] dark:bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.05),transparent_24%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.03),transparent_22%)]" />

      <div className="relative mx-auto max-w-7xl">
        <AnimatedSection className="max-w-4xl">
          <p className="font-body text-[11px] uppercase tracking-[0.34em] text-muted-foreground dark:text-cream/56">
            Client Perspective
          </p>
          <h2 className="display-section-title mt-5 max-w-3xl font-display font-light text-foreground dark:text-cream">
            Trusted because the process feels clear, controlled, and beautifully resolved.
          </h2>
          <p className="mt-6 max-w-2xl font-body text-base leading-8 text-muted-foreground dark:text-cream/68">
            The strongest feedback is consistent: clients feel guided, informed, and more confident
            because design, coordination, and delivery are treated as one connected process.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.06} className="mt-10">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.7rem] border border-border/70 bg-card/86 p-6 dark:border-white/10 dark:bg-white/[0.05]">
              <p className="font-body text-[10px] uppercase tracking-[0.24em] text-muted-foreground dark:text-cream/50">
                Average Rating
              </p>
              <div className="mt-4 flex items-end gap-4">
                <p className="font-display text-[2.75rem] leading-none text-foreground dark:text-cream">
                  4.9
                </p>
                <div className="pb-1">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        size={14}
                        className="fill-foreground text-foreground dark:fill-cream dark:text-cream"
                      />
                    ))}
                  </div>
                  <p className="mt-2 font-body text-[11px] uppercase tracking-[0.16em] text-muted-foreground dark:text-cream/48">
                    Consistent client score
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-border/70 bg-card/86 p-6 dark:border-white/10 dark:bg-white/[0.05]">
              <p className="font-body text-[10px] uppercase tracking-[0.24em] text-muted-foreground dark:text-cream/50">
                Working Result
              </p>
              <p className="mt-4 font-body text-sm leading-7 text-foreground/78 dark:text-cream/72">
                The process feels calmer because decisions are made early, explained clearly, and
                carried through without disconnect between concept and delivery.
              </p>
            </div>

            <div className="rounded-[1.7rem] border border-border/70 bg-card/86 p-6 dark:border-white/10 dark:bg-white/[0.05]">
              <p className="font-body text-[10px] uppercase tracking-[0.24em] text-muted-foreground dark:text-cream/50">
                Why It Matters
              </p>
              <p className="mt-4 font-body text-sm leading-7 text-foreground/78 dark:text-cream/72">
                Better coordination protects both the atmosphere of the project and the client’s
                confidence while the work is moving.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} scale className="mt-10">
          <motion.article
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[2.2rem] border border-border/70 bg-foreground p-7 text-primary-foreground shadow-[0_30px_80px_-42px_rgba(0,0,0,0.32)] dark:border-white/10 dark:bg-charcoal dark:text-cream dark:shadow-[0_30px_80px_-42px_rgba(0,0,0,0.8)] sm:p-9"
          >
            <div className="grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-10">
              <div className="flex items-start justify-between gap-4 lg:flex-col lg:justify-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.15rem] border border-white/10 bg-white/[0.04]">
                  <Quote size={28} className="text-primary-foreground/20 dark:text-cream/18" />
                </div>
                <div className="flex gap-1 lg:pt-6">
                  {Array.from({ length: leadTestimonial.rating }).map((_, index) => (
                    <Star
                      key={index}
                      size={14}
                      className="fill-primary-foreground text-primary-foreground dark:fill-cream dark:text-cream"
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="font-display text-[1.9rem] leading-[1.02] text-primary-foreground sm:text-[2.15rem] lg:text-[2.45rem] dark:text-cream">
                  “{leadTestimonial.quote}”
                </p>

                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="font-display text-[1.7rem] leading-tight text-primary-foreground dark:text-cream">
                    {leadTestimonial.name}
                  </p>
                  <p className="mt-2 font-body text-[11px] uppercase tracking-[0.22em] text-primary-foreground/54 dark:text-cream/54">
                    {leadTestimonial.role}
                  </p>
                </div>
              </div>
            </div>
          </motion.article>
        </AnimatedSection>

        {visibleSupportingTestimonials.length > 0 ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {visibleSupportingTestimonials.map((testimonial, index) => (
              <AnimatedSection
                key={testimonial.id}
                delay={0.14 + index * 0.06}
                scale
              >
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-full min-h-[16rem] flex-col rounded-[1.85rem] border border-border/70 bg-card/88 p-6 text-foreground shadow-[0_24px_60px_-40px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-white/[0.05] dark:text-cream dark:shadow-none sm:p-7"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/80 dark:border-white/10 dark:bg-black/20">
                      <span className="font-body text-xs font-medium uppercase tracking-[0.18em] text-foreground/82 dark:text-cream/82">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          size={13}
                          className="fill-foreground text-foreground dark:fill-cream dark:text-cream"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mt-6 flex-1 font-body text-sm leading-7 text-foreground/78 dark:text-cream/74">
                    “{testimonial.quote}”
                  </p>

                  <div className="mt-6 border-t border-border/70 pt-4 dark:border-white/10">
                    <p className="font-display text-[1.45rem] leading-tight text-foreground dark:text-cream">
                      {testimonial.name}
                    </p>
                    <p className="mt-2 font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground dark:text-cream/44">
                      {testimonial.role}
                    </p>
                  </div>
                </motion.article>
              </AnimatedSection>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
