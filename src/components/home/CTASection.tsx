import AnimatedSection from "@/components/AnimatedSection";
import MagneticButton from "@/components/MagneticButton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
              className="group relative inline-block bg-gradient-gold font-body text-sm tracking-widest uppercase px-14 py-5 text-charcoal font-medium overflow-hidden"
            >
              <span className="relative z-10">Start Your Project</span>
              <motion.span
                className="absolute inset-0 bg-foreground"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                style={{ transformOrigin: "left" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </Link>
          </MagneticButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
