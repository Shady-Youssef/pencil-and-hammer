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

  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(0,0,0,0.05),transparent_24%),radial-gradient(circle_at_82%_70%,rgba(255,255,255,0.1),transparent_20%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <AnimatedSection className="xl:sticky xl:top-28 xl:self-start">
          <p className="font-body text-[11px] uppercase tracking-[0.34em] text-muted-foreground">
            Client Perspective
          </p>
          <h2 className="mt-5 max-w-md font-display text-4xl font-light leading-tight text-foreground sm:text-5xl md:text-6xl">
            Trusted because the process feels clear as well as beautiful.
          </h2>
          <p className="mt-6 max-w-md font-body text-base leading-8 text-muted-foreground">
            Clients stay confident when design, coordination, and delivery
            are connected. That confidence shows up in the work and in the reviews.
          </p>

          <div className="mt-10 rounded-[1.8rem] border border-border/70 bg-card/75 p-6 backdrop-blur-xl">
            <p className="font-body text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              Reputation Snapshot
            </p>
            <div className="mt-4 flex items-end gap-4">
              <p className="font-display text-5xl text-foreground">4.9</p>
              <div className="pb-2">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={14}
                      className="fill-foreground text-foreground"
                    />
                  ))}
                </div>
                <p className="mt-2 font-body text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Average client rating
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid gap-5 md:grid-cols-2">
          <AnimatedSection scale className="md:row-span-2">
            <motion.article
              whileHover={{ y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full min-h-[28rem] flex-col rounded-[2.2rem] border border-border/70 bg-charcoal p-7 text-cream shadow-[0_30px_80px_-42px_rgba(0,0,0,0.8)] sm:p-8"
            >
              <Quote size={34} className="text-cream/18" />
              <p className="mt-8 font-display text-[2rem] leading-tight text-cream sm:text-[2.5rem]">
                “{leadTestimonial.quote}”
              </p>
              <div className="mt-auto pt-10">
                <div className="flex gap-1">
                  {Array.from({ length: leadTestimonial.rating }).map((_, index) => (
                    <Star
                      key={index}
                      size={14}
                      className="fill-cream text-cream"
                    />
                  ))}
                </div>
                <p className="mt-5 font-display text-2xl text-cream">
                  {leadTestimonial.name}
                </p>
                <p className="mt-2 font-body text-[11px] uppercase tracking-[0.22em] text-cream/54">
                  {leadTestimonial.role}
                </p>
              </div>
            </motion.article>
          </AnimatedSection>

          {supportingTestimonials.slice(0, 2).map((testimonial, index) => (
            <AnimatedSection
              key={testimonial.id}
              delay={0.08 + index * 0.08}
              scale
              className={index === 1 ? "md:translate-y-10" : ""}
            >
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full min-h-[18rem] flex-col rounded-[1.9rem] border border-border/70 bg-card/80 p-6 backdrop-blur-xl sm:p-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-background/80">
                    <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-foreground/82">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        size={13}
                        className="fill-foreground text-foreground"
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-8 flex-1 font-body text-sm leading-7 text-foreground/82">
                  “{testimonial.quote}”
                </p>
                <div className="mt-8 border-t border-border/70 pt-4">
                  <p className="font-display text-xl text-foreground">{testimonial.name}</p>
                  <p className="mt-2 font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </motion.article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
