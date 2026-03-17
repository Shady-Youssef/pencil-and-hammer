"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import aboutTeamImage from "@/assets/about-team.jpg";
import AnimatedSection from "@/components/AnimatedSection";
import MagneticButton from "@/components/MagneticButton";

const closingNotes = [
  "Early-stage concept and planning",
  "Material and furniture direction",
  "Coordination support through delivery",
];

export default function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_24%,rgba(255,255,255,0.54),transparent_22%),radial-gradient(circle_at_84%_78%,rgba(0,0,0,0.05),transparent_24%)] dark:bg-[radial-gradient(circle_at_14%_24%,rgba(255,255,255,0.06),transparent_22%),radial-gradient(circle_at_84%_78%,rgba(255,255,255,0.03),transparent_24%)]" />

      <AnimatedSection className="relative mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-[2.6rem] border border-border/70 bg-card/88 shadow-[0_35px_90px_-54px_rgba(0,0,0,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-card/85 dark:shadow-[0_35px_90px_-54px_rgba(0,0,0,0.28)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="relative min-h-[20rem] overflow-hidden lg:min-h-full">
            <Image
              src={aboutTeamImage}
              alt="Pencil And Hammer design presentation"
              fill
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.48)_100%)]" />
            <div className="absolute left-6 top-6 rounded-full border border-white/14 bg-black/18 px-4 py-2 backdrop-blur-md">
              <span className="font-body text-[10px] uppercase tracking-[0.26em] text-cream/72">
                Start a project
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="max-w-sm rounded-[1.8rem] border border-white/14 bg-black/24 p-5 text-cream backdrop-blur-xl">
                <p className="font-body text-[10px] uppercase tracking-[0.24em] text-cream/58">
                  Studio Coordination
                </p>
                <p className="display-card-title mt-4 font-display text-cream">
                  Clear decisions before procurement and site pressure begin.
                </p>
              </div>
            </div>
          </div>

          <div className="p-7 sm:p-9 lg:p-12">
            <p className="font-body text-[11px] uppercase tracking-[0.34em] text-muted-foreground dark:text-cream/56">
              Next Move
            </p>
            <h2 className="display-cta-title mt-5 max-w-[44rem] font-display font-light text-foreground dark:text-cream">
              Start with a concept that already understands how the project needs to work.
            </h2>
            <p className="mt-6 max-w-xl font-body text-base leading-8 text-muted-foreground dark:text-cream/72">
              Whether the project is residential, hospitality, or workplace,
              the aim is the same: define the atmosphere, resolve the layout,
              and move into delivery with fewer surprises and stronger control.
            </p>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {closingNotes.map((note) => (
                <div
                  key={note}
                  className="rounded-[1.45rem] border border-border/70 bg-background/74 px-4 py-4 dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground dark:text-cream/48">
                    Included
                  </p>
                  <p className="mt-2 font-body text-sm leading-6 text-foreground/82 dark:text-cream/78">{note}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <MagneticButton className="w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-foreground px-8 py-4 font-body text-xs font-semibold uppercase tracking-[0.24em] text-background transition-opacity hover:opacity-88 sm:min-w-[220px] sm:w-auto"
                >
                  Book Initial Consultation
                  <ArrowUpRight size={15} />
                </Link>
              </MagneticButton>
              <Link
                href="/portfolio"
                className="font-body text-xs uppercase tracking-[0.26em] text-muted-foreground transition-colors hover:text-foreground dark:text-cream/56 dark:hover:text-cream"
              >
                Or review current project work
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
