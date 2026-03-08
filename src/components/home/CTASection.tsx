import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-interior.jpg";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      </div>

      {/* Animated ring decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[500px] h-[500px] rounded-full border border-accent/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full border border-accent/8"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="section-padding max-w-4xl mx-auto text-center relative">
        <AnimatedSection>
          <div className="line-accent mx-auto mb-8" />
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-6">
            Ready to Transform
            <br />
            <span className="italic text-gradient-gold">Your Space?</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto mb-12 text-base">
            Let's create something extraordinary together. Schedule a consultation to begin your design journey.
          </p>

          <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.25 }} className="inline-block">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 rounded-full border border-border bg-card/90 px-10 py-4 font-body text-xs tracking-[0.28em] uppercase text-foreground shadow-[0_8px_30px_hsl(var(--background)/0.45)] transition-all duration-300 hover:border-accent hover:text-accent"
            >
              <Sparkles size={14} className="text-accent" />
              Book Private Consultation
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
