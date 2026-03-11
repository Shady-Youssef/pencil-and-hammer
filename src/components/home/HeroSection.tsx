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
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
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
          className="absolute w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle, hsla(38, 60%, 52%, 0.08), transparent 70%)", top: "20%", right: "10%" }}
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, hsla(38, 60%, 52%, 0.05), transparent 70%)", bottom: "10%", left: "5%" }}
          animate={{ y: [15, -15, 15], x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <motion.div
            className="line-accent mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <p className="font-body text-sm tracking-[0.4em] uppercase text-gold-light mb-4">
            Interior Design Studio
          </p>
        </motion.div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-cream leading-[1.05] max-w-6xl">
          <TextReveal delay={0.5}>Crafting Spaces</TextReveal>
          <br />
          <span className="italic">
            <TextReveal delay={0.7}>That Inspire</TextReveal>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 1 }}
          className="font-body text-warm-gray text-base md:text-lg mt-10 max-w-xl leading-relaxed"
        >
          Where timeless elegance meets modern sophistication.
          We transform your vision into breathtaking reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-14 flex gap-6 flex-wrap justify-center"
        >
          <MagneticButton>
            <Link
              href="/portfolio"
              className="group relative inline-block bg-gradient-gold font-body text-sm tracking-widest uppercase px-10 py-4 text-charcoal font-medium overflow-hidden"
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
              className="inline-flex items-center justify-center border border-cream/40 bg-background/30 backdrop-blur-sm font-body text-sm tracking-widest uppercase px-10 py-4 text-cream hover:border-accent hover:text-accent transition-all duration-300"
            >
              Get in Touch
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10"
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
