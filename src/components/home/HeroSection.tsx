"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import heroImg from "@/assets/hero-interior.jpg";
import accentImg from "@/assets/portfolio-2.jpg";
import detailImg from "@/assets/portfolio-4.jpg";
import MagneticButton from "@/components/MagneticButton";
import { useSiteSettings } from "@/components/site/site-settings-context";
import TextReveal from "@/components/TextReveal";

const stats = [
  { value: "84", label: "Projects Delivered" },
  { value: "11", label: "Design + Site Specialists" },
  { value: "96%", label: "Repeat And Referral Work" },
];

const processRail = [
  {
    step: "01",
    title: "Strategy",
    description: "Brief alignment, site reading, and a clearer direction before visuals begin.",
  },
  {
    step: "02",
    title: "Design Development",
    description: "Layouts, materials, and decisions resolved with practical delivery in mind.",
  },
  {
    step: "03",
    title: "Delivery Oversight",
    description: "Technical coordination and site follow-through without losing the design intent.",
  },
];

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
  const imageYSecondary = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", shouldReduceMotion ? "0%" : "-6%"],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", shouldReduceMotion ? "0%" : "4%"],
  );

  return (
    <section ref={ref} className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.08),transparent_20%),linear-gradient(180deg,rgba(10,10,10,0.04)_0%,rgba(10,10,10,0)_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-[7%] hidden w-px bg-white/6 lg:block" />
      <div className="pointer-events-none absolute inset-y-0 right-[7%] hidden w-px bg-white/6 lg:block" />
      <div className="pointer-events-none absolute left-[7%] right-[7%] top-[8.75rem] hidden h-px bg-white/6 lg:block" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:items-center lg:gap-14">
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-card/75 px-4 py-2 backdrop-blur-lg">
              <span className="h-2 w-2 rounded-full bg-foreground/80" />
              <span className="font-body text-[10px] uppercase tracking-[0.34em] text-muted-foreground sm:text-[11px]">
                Interior Design Company
              </span>
            </div>

            <div className="mt-8 max-w-[38rem]">
              <h1 className="font-display text-[3.2rem] font-light leading-[0.92] tracking-[-0.045em] text-foreground sm:text-[4.35rem] md:text-[5.4rem] xl:text-[6.05rem]">
                <TextReveal delay={0.1}>Interiors with structure.</TextReveal>
                <span className="mt-2 block italic text-foreground/92">
                  <TextReveal delay={0.26}>Atmosphere in every decision.</TextReveal>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7 max-w-xl font-body text-[15px] leading-8 text-muted-foreground sm:text-lg"
              >
                {settings.siteName} develops residential, hospitality, and workplace
                interiors through one connected workflow. The design feels refined because
                the process is disciplined from the start.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.66 }}
              className="mt-9 flex flex-col gap-4 sm:flex-row"
            >
              <MagneticButton>
                <Link
                  href="/portfolio"
                  className="inline-flex min-w-[220px] items-center justify-center gap-3 rounded-full bg-foreground px-8 py-4 font-body text-xs font-semibold uppercase tracking-[0.24em] text-background transition-colors hover:bg-foreground/90"
                >
                  Review Projects
                  <ArrowUpRight size={15} />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-border bg-card/70 px-8 py-4 font-body text-xs uppercase tracking-[0.24em] text-foreground transition-colors hover:border-foreground/30 hover:bg-card"
                >
                  Schedule Consultation
                </Link>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.78 }}
              className="mt-9 grid gap-3 sm:grid-cols-3"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.6rem] border border-border/70 bg-card/70 p-4 backdrop-blur-lg"
                >
                  <p className="font-display text-[2.35rem] text-foreground">{stat.value}</p>
                  <p className="mt-2 font-body text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[34rem] lg:min-h-[39rem]"
          >
            <div className="absolute inset-x-[10%] top-0 h-full rounded-[2.5rem] border border-border/70 bg-card/35 backdrop-blur-sm" />
            <motion.div
              style={{ y: imageY }}
              className="absolute right-0 top-12 h-[70%] w-[76%] overflow-hidden rounded-[2.4rem] border border-white/10 bg-charcoal shadow-[0_35px_90px_-45px_rgba(0,0,0,0.72)]"
            >
              <Image
                src={heroImg}
                alt="Curated interior by Pencil And Hammer"
                fill
                priority
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.08)_0%,rgba(10,10,10,0.3)_40%,rgba(10,10,10,0.7)_100%)]" />
            </motion.div>

            <motion.div
              style={{ y: imageYSecondary }}
              className="absolute bottom-0 left-0 h-[42%] w-[50%] overflow-hidden rounded-[2rem] border border-white/10 bg-charcoal shadow-[0_28px_70px_-40px_rgba(0,0,0,0.78)]"
            >
              <Image
                src={accentImg}
                alt="Layered seating area with architectural lighting"
                fill
                placeholder="blur"
                sizes="(max-width: 1024px) 75vw, 24vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.02)_0%,rgba(10,10,10,0.24)_48%,rgba(10,10,10,0.6)_100%)]" />
            </motion.div>

            <div className="absolute left-[10%] top-3 max-w-[14rem] rounded-[1.6rem] border border-border/70 bg-background/92 p-5 shadow-[0_22px_50px_-34px_rgba(0,0,0,0.4)] backdrop-blur-xl">
              <p className="font-body text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                Project Method
              </p>
              <p className="mt-3 font-display text-[1.95rem] leading-tight text-foreground">
                Editorial design with delivery logic built in.
              </p>
            </div>

            <div className="absolute bottom-[7%] right-[8%] flex max-w-[16rem] items-start gap-3 rounded-[1.5rem] border border-white/10 bg-charcoal/92 p-4 text-cream shadow-[0_26px_70px_-40px_rgba(0,0,0,0.82)]">
              <div className="relative h-14 w-14 overflow-hidden rounded-[1rem] border border-white/10">
                <Image
                  src={detailImg}
                  alt="Material detail"
                  fill
                  placeholder="blur"
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.24em] text-cream/52">
                  Material Direction
                </p>
                <p className="mt-2 font-body text-sm leading-6 text-cream/82">
                  Balanced palettes, technical clarity, and controlled atmosphere.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.92 }}
          className="mt-14 grid gap-4 border-t border-border/60 pt-8 md:grid-cols-3"
        >
          {processRail.map((item) => (
            <div
              key={item.step}
              className="rounded-[1.7rem] border border-border/70 bg-card/70 p-5 backdrop-blur-lg"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-body text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                  Phase {item.step}
                </p>
                <div className="h-px flex-1 bg-border/80" />
              </div>
              <p className="mt-5 font-display text-[1.8rem] text-foreground">{item.title}</p>
              <p className="mt-3 font-body text-sm leading-7 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          >
            <ArrowDown size={16} className="text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
