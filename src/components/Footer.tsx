import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-primary-foreground relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, hsl(38 60% 52% / 0.3), transparent)" }}
      />
      
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <AnimatedSection className="md:col-span-2" direction="left">
            <h3 className="font-display text-3xl font-semibold mb-4">
              MBM<span className="text-gradient-gold"> Designs</span>
            </h3>
            <p className="text-warm-gray max-w-md leading-relaxed font-body text-sm">
              Transforming spaces into extraordinary experiences. We blend artistry with functionality
              to create interiors that tell your unique story.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h4 className="font-display text-lg mb-6 text-cream">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {["Home", "About", "Portfolio", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-warm-gray hover:text-gold transition-colors font-body text-sm flex items-center gap-1 group"
                >
                  {item}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <h4 className="font-display text-lg mb-6 text-cream">Contact</h4>
            <div className="flex flex-col gap-3 text-warm-gray font-body text-sm">
              <p>hello@mbmdesigns.com</p>
              <p>+1 (555) 234-5678</p>
              <p>123 Design Avenue<br />New York, NY 10001</p>
            </div>
          </AnimatedSection>
        </div>
        <div className="border-t border-charcoal-light pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-warm-gray text-xs font-body">
            © {new Date().getFullYear()} MBM Designs. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="text-warm-gray hover:text-gold transition-colors"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
