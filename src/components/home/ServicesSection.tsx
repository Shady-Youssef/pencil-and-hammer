"use client";

import { motion } from "framer-motion";
import { Lightbulb, Paintbrush, Ruler, Sofa } from "lucide-react";

import AnimatedSection from "@/components/AnimatedSection";

const services = [
  {
    icon: Paintbrush,
    title: "Interior Design",
    description:
      "Concept direction, material thinking, and spatial language shaped for real project conditions.",
    note: "From concept boards to fully coordinated design intent.",
    className: "md:col-span-3 md:row-span-2",
  },
  {
    icon: Ruler,
    title: "Space Planning",
    description:
      "Layouts are resolved for movement, visibility, furniture logic, and everyday use.",
    note: "Flow, zoning, and operational clarity.",
    className: "md:col-span-3",
  },
  {
    icon: Lightbulb,
    title: "Lighting Strategy",
    description:
      "Layered lighting schemes that define mood while supporting technical and functional needs.",
    note: "Ambient, accent, and task lighting in one system.",
    className: "md:col-span-2",
  },
  {
    icon: Sofa,
    title: "Furniture + Styling",
    description:
      "Curated selections, custom pieces, and finishing layers that complete the atmosphere.",
    note: "Procurement-minded recommendations with a cohesive final read.",
    className: "md:col-span-4",
  },
];

export default function ServicesSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_26%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_82%_72%,rgba(0,0,0,0.06),transparent_30%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14">
        <AnimatedSection className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-body text-[11px] uppercase tracking-[0.34em] text-muted-foreground">
            What We Handle
          </p>
          <h2 className="mt-5 max-w-md font-display text-4xl font-light leading-tight text-foreground sm:text-5xl md:text-6xl">
            A studio structure built for more than mood boards.
          </h2>
          <p className="mt-6 max-w-md font-body text-base leading-8 text-muted-foreground">
            The work is organized like a serious project: concept, planning,
            materials, lighting, and furniture all developed as one coherent system.
          </p>
        </AnimatedSection>

        <div className="grid gap-4 md:grid-cols-6 md:auto-rows-[minmax(180px,1fr)]">
          {services.map((service, index) => (
            <AnimatedSection
              key={service.title}
              delay={index * 0.08}
              scale
              className={service.className}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border/70 bg-card/75 p-6 backdrop-blur-xl sm:p-7"
              >
                <div className="absolute right-5 top-5 font-display text-6xl leading-none tracking-[-0.06em] text-foreground/[0.04]">
                  0{index + 1}
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-border/70 bg-background/80">
                    <service.icon
                      size={26}
                      strokeWidth={1.35}
                      className="text-foreground transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="h-px flex-1 bg-border/80" />
                </div>
                <div className="mt-8">
                  <h3 className="font-display text-2xl text-foreground">{service.title}</h3>
                  <p className="mt-3 font-body text-sm leading-7 text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                <div className="mt-auto pt-8">
                  <div className="rounded-[1.2rem] bg-background/70 px-4 py-3">
                    <p className="font-body text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      Scope Note
                    </p>
                    <p className="mt-2 font-body text-sm leading-6 text-foreground/82">
                      {service.note}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
