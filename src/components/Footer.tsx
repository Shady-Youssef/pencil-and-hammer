import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-primary-foreground">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="font-display text-3xl font-semibold mb-4">
              MBM<span className="text-gradient-gold"> Designs</span>
            </h3>
            <p className="text-warm-gray max-w-md leading-relaxed font-body text-sm">
              Transforming spaces into extraordinary experiences. We blend artistry with functionality
              to create interiors that tell your unique story.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg mb-6">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {["Home", "About", "Portfolio", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-warm-gray hover:text-gold transition-colors font-body text-sm flex items-center gap-1 group"
                >
                  {item}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg mb-6">Contact</h4>
            <div className="flex flex-col gap-3 text-warm-gray font-body text-sm">
              <p>hello@mbmdesigns.com</p>
              <p>+1 (555) 234-5678</p>
              <p>123 Design Avenue<br />New York, NY 10001</p>
            </div>
          </div>
        </div>
        <div className="border-t border-charcoal-light pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-warm-gray text-xs font-body">
            © {new Date().getFullYear()} MBM Designs. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="text-warm-gray hover:text-gold transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
