import AnimatedSection from "@/components/AnimatedSection";
import MagneticButton from "@/components/MagneticButton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
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

      <div className="max-w-4xl mx-auto text-center relative">
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
          <MagneticButton className="inline-block">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 border border-accent/40 font-body text-sm tracking-[0.2em] uppercase px-14 py-5 text-foreground font-medium overflow-hidden hover:border-accent transition-all duration-700"
            >
              <span className="relative z-10 group-hover:text-background transition-colors duration-500">Get in Touch</span>
              <ArrowRight size={16} className="relative z-10 group-hover:text-background group-hover:translate-x-1 transition-all duration-500" />
              <motion.span
                className="absolute inset-0 bg-accent"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                style={{ transformOrigin: "left" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </Link>
          </MagneticButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
