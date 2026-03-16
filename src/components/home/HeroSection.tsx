"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import heroImg from "@/assets/hero-interior.jpg";
import MagneticButton from "@/components/MagneticButton";
import { useSiteSettings } from "@/components/site/site-settings-context";
import TextReveal from "@/components/TextReveal";

const processNotes = [
  "Strategy-led planning",
  "Concept to delivery alignment",
  "Residential, hospitality, and workplace",
];

export default function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { settings } = useSiteSettings();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
    >
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0"
      >
        <Image
          src={heroImg}
          alt="Interior detail by Pencil And Hammer"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.58)_0%,rgba(5,5,5,0.38)_24%,rgba(5,5,5,0.72)_72%,rgba(5,5,5,0.9)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.34)_0%,transparent_22%,transparent_78%,rgba(5,5,5,0.34)_100%)]" />
      <div className="pointer-events-none absolute inset-0 grain-overlay" />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex min-h-[100svh] flex-col"
      >
        <div className="flex flex-1 items-center justify-center px-6 pb-20 pt-28 sm:px-8 sm:pb-24 sm:pt-32">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-4 rounded-full border border-white/12 bg-black/20 px-5 py-2.5 backdrop-blur-md"
            >
              <div className="line-accent w-10" />
              <p className="font-body text-[11px] uppercase tracking-[0.34em] text-cream/88 sm:text-xs">
                Design-Build Company
              </p>
            </motion.div>

            <div className="mt-8 max-w-5xl">
              <h1 className="font-display text-[3.9rem] font-light leading-[0.92] tracking-[-0.04em] text-cream sm:text-[5.2rem] md:text-[6.8rem] lg:text-[8.5rem]">
                <TextReveal delay={0.12}>Built with clarity.</TextReveal>
                <span className="mt-2 block italic text-cream/94">
                  <TextReveal delay={0.28}>Measured for life.</TextReveal>
                </span>
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 max-w-3xl font-body text-base leading-8 text-cream/68 sm:text-lg"
            >
              {settings.siteName} shapes interiors through one connected process:
              strategy, concept design, technical coordination, and delivery.
              The result is a calmer project with stronger decisions from the
              start.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.68 }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
            >
              <MagneticButton>
                <Link
                  href="/portfolio"
                  className="inline-flex min-w-[220px] items-center justify-center gap-3 rounded-full bg-white px-10 py-4 font-body text-xs font-semibold uppercase tracking-[0.24em] text-black transition-colors hover:bg-white/92"
                >
                  View Our Work
                  <ArrowUpRight size={15} />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/18 bg-black/18 px-10 py-4 font-body text-xs uppercase tracking-[0.24em] text-cream transition-colors hover:border-white/34 hover:bg-black/26"
                >
                  Get In Touch
                </Link>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.82 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-3"
            >
              {processNotes.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/10 bg-black/16 px-4 py-2 backdrop-blur-md"
                >
                  <span className="font-body text-[10px] uppercase tracking-[0.2em] text-cream/74 sm:text-[11px]">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="pb-8 sm:pb-10"
        >
          <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-3 px-6 sm:px-8">
            <span className="font-body text-[10px] uppercase tracking-[0.32em] text-cream/52">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            >
              <ArrowDown size={16} className="text-cream/52" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
