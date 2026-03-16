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
    <section className="section-padding relative overflow-hidden bg-secondary/35">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_24%,rgba(255,255,255,0.12),transparent_22%),radial-gradient(circle_at_84%_78%,rgba(0,0,0,0.05),transparent_24%)]" />

      <AnimatedSection className="relative mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-[2.6rem] border border-border/70 bg-card/85 shadow-[0_35px_90px_-54px_rgba(0,0,0,0.28)] backdrop-blur-xl lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <div className="relative min-h-[20rem] overflow-hidden lg:min-h-[30rem]">
            <Image
              src={aboutTeamImage}
              alt="Pencil And Hammer design presentation"
              fill
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.08)_0%,rgba(10,10,10,0.38)_100%)]" />
            <div className="absolute left-6 top-6 rounded-full border border-white/14 bg-black/18 px-4 py-2 backdrop-blur-md">
              <span className="font-body text-[10px] uppercase tracking-[0.26em] text-cream/72">
                Start a project
              </span>
            </div>
          </div>

          <div className="p-7 sm:p-9 lg:p-12">
            <p className="font-body text-[11px] uppercase tracking-[0.34em] text-muted-foreground">
              Next Move
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-4xl font-light leading-tight text-foreground sm:text-5xl md:text-6xl">
              Build a project identity that feels resolved before site work begins.
            </h2>
            <p className="mt-6 max-w-xl font-body text-base leading-8 text-muted-foreground">
              Whether the project is residential, hospitality, or workplace,
              the goal is the same: create an interior that reads clearly,
              performs well, and carries its atmosphere all the way through delivery.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {closingNotes.map((note) => (
                <div
                  key={note}
                  className="rounded-[1.4rem] border border-border/70 bg-background/72 px-4 py-4"
                >
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Included
                  </p>
                  <p className="mt-2 font-body text-sm leading-6 text-foreground/82">{note}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex min-w-[220px] items-center justify-center gap-3 rounded-full bg-foreground px-8 py-4 font-body text-xs font-semibold uppercase tracking-[0.24em] text-background transition-colors hover:bg-foreground/90"
                >
                  Book Initial Consultation
                  <ArrowUpRight size={15} />
                </Link>
              </MagneticButton>
              <Link
                href="/portfolio"
                className="font-body text-xs uppercase tracking-[0.26em] text-muted-foreground transition-colors hover:text-foreground"
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
