"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroImg from "@/assets/hero-interior.jpg";
import MagneticButton from "@/components/MagneticButton";
import TextReveal from "@/components/TextReveal";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <section ref={ref} className="relative min-h-[42rem] h-[100svh] w-full overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
        <Image
          src={heroImg}
          alt="Luxury interior design"
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="overlay-dark absolute inset-0" />

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute h-40 w-40 rounded-full sm:h-64 sm:w-64"
          style={{ background: "radial-gradient(circle, hsla(38, 60%, 52%, 0.08), transparent 70%)", top: "20%", right: "10%" }}
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute h-56 w-56 rounded-full sm:h-80 sm:w-80 lg:h-96 lg:w-96"
          style={{ background: "radial-gradient(circle, hsla(38, 60%, 52%, 0.05), transparent 70%)", bottom: "10%", left: "5%" }}
          animate={{ y: [15, -15, 15], x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 pb-20 pt-28 text-center sm:px-6"
      >
        <motion.div
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 sm:mb-6"
        >
          <motion.div
            className="line-accent mx-auto mb-6 sm:mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <p className="mb-3 font-body text-[11px] tracking-[0.28em] uppercase text-gold-light sm:mb-4 sm:text-sm sm:tracking-[0.4em]">
            Interior Design Studio
          </p>
        </motion.div>

        <h1 className="max-w-6xl font-display text-4xl font-light leading-[1.02] text-cream sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl">
          <TextReveal delay={0.5}>Crafting Spaces</TextReveal>
          <br />
          <span className="italic">
            <TextReveal delay={0.7}>That Inspire</TextReveal>
          </span>
        </h1>

        <motion.p
          initial={{ y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl px-2 font-body text-sm leading-relaxed text-warm-gray sm:mt-8 sm:text-base md:mt-10 md:text-lg"
        >
          Where timeless elegance meets modern sophistication.
          We transform your vision into breathtaking reality.
        </motion.p>

        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-10 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6 md:mt-14"
        >
          <MagneticButton>
            <Link
              href="/portfolio"
              className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-[0.95rem] bg-gradient-gold px-8 py-3.5 font-body text-xs font-medium uppercase tracking-[0.24em] text-charcoal sm:w-auto sm:px-10 sm:py-4 sm:text-sm sm:tracking-widest"
            >
              <span className="relative z-10">View Our Work</span>
              <motion.span
                className="absolute inset-0 bg-cream"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-[0.95rem] border border-cream/40 bg-background/30 px-8 py-3.5 font-body text-xs uppercase tracking-[0.24em] text-cream backdrop-blur-sm transition-all duration-300 hover:border-accent hover:text-accent sm:w-auto sm:px-10 sm:py-4 sm:text-sm sm:tracking-widest"
            >
              Get in Touch
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ delay: 2 }}
          className="absolute bottom-6 sm:bottom-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-cream/40">Scroll</span>
            <ArrowDown size={16} className="text-cream/40" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
