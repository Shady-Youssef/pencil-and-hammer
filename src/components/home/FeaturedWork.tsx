import AnimatedSection from "@/components/AnimatedSection";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

const projects = [
  { image: portfolio1, title: "Serene Retreat", category: "Bedroom", location: "Manhattan, NY" },
  { image: portfolio2, title: "Modern Elegance", category: "Kitchen", location: "Brooklyn, NY" },
  { image: portfolio3, title: "Warm Sanctuary", category: "Bathroom", location: "Westchester, NY" },
];

export default function FeaturedWork() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <div className="line-accent mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
              Featured Projects
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="font-body text-sm tracking-widest uppercase text-accent hover:text-gold-dark transition-colors flex items-center gap-2"
          >
            View All <ArrowUpRight size={14} />
          </Link>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 0.15}>
              <Link to="/portfolio" className="group block overflow-hidden">
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <span className="font-body text-xs tracking-widest uppercase text-gold-light">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="pt-5">
                  <h3 className="font-display text-xl text-foreground">{project.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mt-1">{project.location}</p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
