"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { ProjectRecord } from "@/lib/projects/data";

type FeaturedWorkProps = {
  projects: ProjectRecord[];
};

export default function FeaturedWork({ projects }: FeaturedWorkProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(projects.length > 1);
  const [isAutoSwipePaused, setIsAutoSwipePaused] = useState(false);
  const canScroll = projects.length > 1;

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
    }, 4200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [api, canScroll, isAutoSwipePaused]);

  return (
    <section className="section-padding relative overflow-hidden bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection className="mb-12 flex flex-col items-start justify-between gap-4 sm:mb-16 md:mb-20 md:flex-row md:items-end">
          <div>
            <div className="line-accent mb-6" />
            <h2 className="font-display text-3xl font-light text-foreground sm:text-4xl md:text-6xl">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group flex items-center gap-2 font-body text-sm uppercase tracking-widest text-accent transition-colors hover:text-gold-dark"
          >
            View All
            <motion.span whileHover={{ x: 4, y: -4 }} transition={{ duration: 0.2 }}>
              <ArrowUpRight size={14} />
            </motion.span>
          </Link>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              containScroll: "trimSnaps",
              loop: projects.length > 3,
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
            {canScroll ? (
              <div className="mb-6 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 rounded-full border-border/70 bg-background/50 backdrop-blur-xl transition-colors hover:border-accent hover:bg-background/70"
                  onClick={() => api?.scrollPrev()}
                  disabled={!canScrollPrev}
                  aria-label="Previous projects"
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
                  aria-label="Next projects"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ) : null}

            <CarouselContent className="-ml-0">
              {projects.map((project, index) => (
                <CarouselItem
                  key={project.id}
                  className="pl-0 pr-4 sm:basis-[78%] md:basis-1/2 lg:basis-[42%] xl:basis-[36%]"
                >
                  <motion.div className="h-full">
                    <ProjectCard project={project} priority={index === 0} compact />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </AnimatedSection>
      </div>
    </section>
  );
}
