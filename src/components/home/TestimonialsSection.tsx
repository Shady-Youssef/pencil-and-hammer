import AnimatedSection from "@/components/AnimatedSection";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Homeowner",
    text: "MBM Designs transformed our home beyond anything we imagined. Every detail was considered with such care and precision.",
  },
  {
    name: "James Chen",
    role: "CEO, Luxe Hotels",
    text: "Their understanding of luxury hospitality design is unparalleled. Our guests consistently praise the ambiance they created.",
  },
  {
    name: "Olivia Park",
    role: "Real Estate Developer",
    text: "Working with MBM elevated our properties' value significantly. Their designs are both timeless and market-savvy.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <div className="line-accent mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-light text-cream">
            Client Voices
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.15}>
              <div className="glass-card p-8 rounded-sm">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="font-body text-sm text-warm-gray leading-relaxed mb-8 italic">
                  "{t.text}"
                </p>
                <div>
                  <p className="font-display text-lg text-cream">{t.name}</p>
                  <p className="font-body text-xs text-warm-gray tracking-wider uppercase">{t.role}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
