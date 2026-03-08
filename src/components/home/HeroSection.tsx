import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroImg from "@/assets/hero-interior.jpg";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="Luxury interior design" className="w-full h-full object-cover" />
        <div className="overlay-dark absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6"
        >
          <div className="line-accent mx-auto mb-8" />
          <p className="font-body text-sm tracking-[0.3em] uppercase text-gold-light mb-4">
            Interior Design Studio
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-cream leading-[1.1] max-w-5xl"
        >
          Crafting Spaces
          <br />
          <span className="italic font-light">That Inspire</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-body text-warm-gray text-base md:text-lg mt-8 max-w-xl leading-relaxed"
        >
          Where timeless elegance meets modern sophistication.
          We transform your vision into breathtaking reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 flex gap-6"
        >
          <a
            href="/portfolio"
            className="bg-gradient-gold font-body text-sm tracking-widest uppercase px-10 py-4 text-charcoal font-medium hover:opacity-90 transition-opacity"
          >
            View Our Work
          </a>
          <a
            href="/contact"
            className="border border-cream/30 font-body text-sm tracking-widest uppercase px-10 py-4 text-cream hover:bg-cream/10 transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown size={20} className="text-cream/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
