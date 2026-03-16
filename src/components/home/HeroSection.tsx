"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/hero-interior.jpg";
import MagneticButton from "@/components/MagneticButton";
import { useSiteSettings } from "@/components/site/site-settings-context";
import TextReveal from "@/components/TextReveal";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { settings } = useSiteSettings();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  const metrics = [
    { value: "11", label: "Specialists across design and build" },
    { value: "84", label: "Projects delivered with site oversight" },
    { value: "4", label: "Core sectors: homes, retail, hospitality, workplaces" },
  ];

  return (
    <section ref={ref} className="relative min-h-[54rem] overflow-hidden pb-14 pt-28 sm:pb-20 sm:pt-32">
      <div className="paper-grid absolute inset-0 opacity-55" />
      <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top,hsla(0,0%,100%,0.12),transparent_55%)]" />

      <div className="section-padding relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="section-shell relative min-h-[42rem] overflow-hidden rounded-[2.4rem] border-white/10 bg-black/30 p-6 text-cream shadow-[0_40px_120px_-64px_rgba(0,0,0,0.8)] sm:p-8 md:p-10 lg:p-12"
        >
          <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
            <Image
              src={heroImg}
              alt="Pencil And Hammer interior project"
              fill
              priority
              placeholder="blur"
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.86)_0%,rgba(5,5,5,0.68)_44%,rgba(5,5,5,0.58)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_24%)]" />

          <div className="relative z-10 flex min-h-[38rem] flex-col justify-between">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-4">
                <div className="line-accent" />
                <p className="font-body text-[11px] uppercase tracking-[0.34em] text-gold-light sm:text-xs">
                  Design-Build Company
                </p>
              </div>

              <h1 className="max-w-3xl font-display text-[3.3rem] font-light leading-[0.94] text-cream sm:text-[4.6rem] md:text-[5.8rem] lg:text-[6.6rem]">
                <TextReveal delay={0.18}>Pencil sketches.</TextReveal>
                <br />
                <span className="text-gradient-gold">
                  <TextReveal delay={0.35}>Built realities.</TextReveal>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 max-w-2xl font-body text-base leading-8 text-cream/72 sm:text-lg"
              >
                {settings.siteName} shapes interiors through one connected
                process: strategy, concept design, technical coordination, and
                delivery. The result is a more grounded project from first
                meeting to final reveal.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.62 }}
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
              >
                <MagneticButton>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-gold px-8 py-4 font-body text-xs font-semibold uppercase tracking-[0.26em] text-cream"
                  >
                    Explore Projects
                    <ArrowUpRight size={16} />
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/6 px-8 py-4 font-body text-xs uppercase tracking-[0.26em] text-cream backdrop-blur-md transition-colors hover:border-white/28 hover:bg-white/10"
                  >
                    Book Discovery Call
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.82 }}
              className="grid gap-4 pt-10 md:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(0,1fr))]"
            >
              <div className="rounded-[1.6rem] border border-white/10 bg-black/28 p-5 backdrop-blur-md">
                <p className="font-body text-[11px] uppercase tracking-[0.28em] text-gold-light">
                  Current Focus
                </p>
                <p className="mt-3 font-display text-2xl text-cream">
                  Residential, hospitality, retail, and workplace interiors.
                </p>
              </div>
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[1.6rem] border border-white/10 bg-black/22 p-5 backdrop-blur-md"
                >
                  <p className="font-display text-4xl text-cream">{metric.value}</p>
                  <p className="mt-2 font-body text-xs uppercase tracking-[0.18em] text-cream/62">
                    {metric.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 flex items-center gap-3"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
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
