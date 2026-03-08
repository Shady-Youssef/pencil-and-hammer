import AnimatedSection from "@/components/AnimatedSection";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <div className="line-accent mx-auto mb-8" />
          <h2 className="font-display text-4xl md:text-6xl font-light text-foreground mb-6">
            Ready to Transform
            <br />
            <span className="italic">Your Space?</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto mb-10">
            Let's create something extraordinary together. Schedule a consultation to begin your design journey.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-gradient-gold font-body text-sm tracking-widest uppercase px-12 py-4 text-charcoal font-medium hover:opacity-90 transition-opacity"
          >
            Start Your Project
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
