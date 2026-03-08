import AnimatedSection from "@/components/AnimatedSection";
import { Paintbrush, Sofa, Lightbulb, Ruler } from "lucide-react";

const services = [
  {
    icon: Paintbrush,
    title: "Interior Design",
    description: "Comprehensive design solutions tailored to your lifestyle, from concept to completion.",
  },
  {
    icon: Sofa,
    title: "Furniture Curation",
    description: "Hand-selected pieces from world-renowned artisans and exclusive collections.",
  },
  {
    icon: Lightbulb,
    title: "Lighting Design",
    description: "Custom lighting schemes that create atmosphere and enhance architectural details.",
  },
  {
    icon: Ruler,
    title: "Space Planning",
    description: "Optimizing layouts for flow, function, and visual impact in every project.",
  },
];

export default function ServicesSection() {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <div className="line-accent mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
            Our Services
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto">
            A full spectrum of design services to elevate every corner of your world.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 0.1}>
              <div className="group p-8 bg-card rounded-sm border border-border hover-lift cursor-pointer">
                <service.icon
                  size={32}
                  strokeWidth={1.2}
                  className="text-accent mb-6 group-hover:text-gold transition-colors duration-300"
                />
                <h3 className="font-display text-xl mb-3 text-foreground">{service.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
