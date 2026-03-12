"use client";

import { useEffect, useState } from "react";

import AnimatedSection from "@/components/AnimatedSection";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { TestimonialRecord } from "@/lib/testimonials/data";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type TestimonialsSectionProps = {
  testimonials: TestimonialRecord[];
};

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(testimonials.length > 1);
  const [isAutoSwipePaused, setIsAutoSwipePaused] = useState(false);
  const canScroll = testimonials.length > 1;

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateScrollState();
    api.on("select", updateScrollState);
    api.on("reInit", updateScrollState);

    return () => {
      api.off("select", updateScrollState);
      api.off("reInit", updateScrollState);
    };
  }, [api]);

  useEffect(() => {
    if (!api || !canScroll || isAutoSwipePaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
        return;
      }

      api.scrollTo(0);
    }, 4600);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [api, canScroll, isAutoSwipePaused]);

  return (
    <section className="section-padding bg-charcoal relative overflow-hidden">
      <div
        className="absolute right-0 top-0 h-[280px] w-[280px] rounded-full pointer-events-none sm:h-[380px] sm:w-[380px] lg:h-[500px] lg:w-[500px]"
        style={{ background: "radial-gradient(circle, hsla(38, 60%, 52%, 0.04), transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative">
        <AnimatedSection className="mb-12 flex flex-col gap-6 sm:mb-16 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-left">
            <div className="line-accent mx-auto mb-6 md:mx-0" />
            <h2 className="font-display text-3xl font-light text-cream sm:text-4xl md:text-6xl">
              Client Voices
            </h2>
          </div>

          {canScroll ? (
            <div className="flex items-center justify-center gap-3 md:justify-end">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-11 w-11 rounded-full border-border/70 bg-background/50 backdrop-blur-xl transition-colors hover:border-accent hover:bg-background/70"
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label="Previous testimonials"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-11 w-11 rounded-full border-border/70 bg-background/50 backdrop-blur-xl transition-colors hover:border-accent hover:bg-background/70"
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
                aria-label="Next testimonials"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ) : null}
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              containScroll: "trimSnaps",
              loop: testimonials.length > 3,
            }}
            className="relative"
            onMouseEnter={() => setIsAutoSwipePaused(true)}
            onMouseLeave={() => setIsAutoSwipePaused(false)}
            onFocusCapture={() => setIsAutoSwipePaused(true)}
            onBlurCapture={(event) => {
              if (event.currentTarget.contains(event.relatedTarget)) {
                return;
              }

              setIsAutoSwipePaused(false);
            }}
          >
            <CarouselContent className="-ml-0">
              {testimonials.map((testimonial, i) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-0 pr-4 sm:basis-[82%] md:basis-1/2 xl:basis-1/3"
                >
                  <AnimatedSection delay={i * 0.08} scale className="h-full">
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="glass-card-hover relative flex h-full min-h-[360px] flex-col rounded-sm p-6 sm:p-8"
                    >
                      <Quote size={28} className="mb-4 text-gold/20" />
                      <div className="mb-6 flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, j) => (
                          <motion.div
                            key={j}
                            initial={{ y: 6, scale: 0.82 }}
                            whileInView={{ y: 0, scale: 1 }}
                            viewport={{ once: false, amount: 0.7 }}
                            transition={{
                              delay: 0.22 + j * 0.06,
                              duration: 0.35,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            <Star size={14} className="fill-gold text-gold" />
                          </motion.div>
                        ))}
                      </div>
                      <p className="mb-8 flex-1 font-body text-sm italic leading-relaxed text-warm-gray">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                          <span className="font-body text-xs font-medium text-gold">
                            {testimonial.initials}
                          </span>
                        </div>
                        <div>
                          <p className="font-display text-lg text-cream">{testimonial.name}</p>
                          <p className="font-body text-xs uppercase tracking-wider text-warm-gray">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </AnimatedSection>
      </div>
    </section>
  );
}
