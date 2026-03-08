import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Paintbrush, Sofa, Lightbulb, Ruler } from "lucide-react";

const services = [
  {
    icon: Paintbrush,
    title: "Interior Design",
    description: "Comprehensive design solutions tailored to your lifestyle, from concept to completion.",
    num: "01",
  },
  {
    icon: Sofa,
    title: "Furniture Curation",
    description: "Hand-selected pieces from world-renowned artisans and exclusive collections.",
    num: "02",
  },
  {
    icon: Lightbulb,
    title: "Lighting Design",
    description: "Custom lighting schemes that create atmosphere and enhance architectural details.",
    num: "03",
  },
  {
    icon: Ruler,
    title: "Space Planning",
    description: "Optimizing layouts for flow, function, and visual impact in every project.",
    num: "04",
  },
];

export default function ServicesSection() {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background decorative element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsla(38, 60%, 52%, 0.03), transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative">
        <AnimatedSection className="text-center mb-20">
          <div className="line-accent mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-6xl font-light text-foreground mb-5">
            Our Services
          </h2>
          <p className="font-body text-muted-foreground max-w-lg mx-auto text-base">
            A full spectrum of design services to elevate every corner of your world.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 0.12} scale>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group p-8 bg-card rounded-sm border border-border neo-border cursor-pointer relative overflow-hidden"
              >
                {/* Number watermark */}
                <span className="absolute -top-2 -right-2 font-display text-[80px] font-light text-foreground/[0.03] leading-none select-none">
                  {service.num}
                </span>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-sm bg-secondary flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors duration-500">
                    <service.icon
                      size={28}
                      strokeWidth={1.2}
                      className="text-accent transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-display text-xl mb-3 text-foreground">{service.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <motion.div
                    className="h-[1px] bg-accent mt-6 origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
