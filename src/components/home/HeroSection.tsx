"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import heroImg from "@/assets/about-team.jpg";
import MagneticButton from "@/components/MagneticButton";
import { useSiteSettings } from "@/components/site/site-settings-context";

export default function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const { settings } = useSiteSettings();
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", shouldReduceMotion ? "0%" : "8%"],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", shouldReduceMotion ? "0%" : "5%"],
  );

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <Image
          src={heroImg}
          alt="Pencil And Hammer studio team at work"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.18)_28%,rgba(0,0,0,0.42)_62%,rgba(0,0,0,0.72)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_36%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-10 pt-28 sm:px-8 sm:pt-32 lg:px-12">
        <div className="flex flex-1 items-center justify-center">
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto flex w-full max-w-5xl flex-col items-center text-center text-cream"
          >
            <p className="font-body text-[11px] uppercase tracking-[0.42em] text-cream/62 sm:text-[12px]">
              Interior Design Studio
            </p>

            <h1 className="display-hero-title mt-6 font-display font-light text-cream">
              Crafting Spaces
              <span className="block italic text-cream/88">
                That Inspire
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-7 max-w-3xl font-body text-base leading-8 text-cream/76 sm:text-lg"
            >
              {settings.siteName} shapes residential, hospitality, and workplace interiors with a
              disciplined design-build process that keeps concept, coordination, and delivery aligned
              from the first conversation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 lg:gap-8"
            >
              <MagneticButton strength={0.1} className="w-full sm:w-auto sm:shrink-0">
                <Link
                  href="/portfolio"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-foreground px-9 py-4 font-body text-xs font-semibold uppercase tracking-[0.24em] text-background transition-opacity hover:opacity-90 sm:min-w-[250px] sm:w-auto"
                >
                  View Our Work
                  <ArrowUpRight size={15} />
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.1} className="w-full sm:w-auto sm:shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/18 bg-black/18 px-9 py-4 font-body text-xs uppercase tracking-[0.24em] text-cream transition-colors hover:border-white/30 hover:bg-black/28 sm:min-w-[250px] sm:w-auto"
                >
                  Get In Touch
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.8 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.34em] text-cream/48">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          >
            <ArrowDown size={14} className="text-cream/52" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
