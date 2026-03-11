"use client";

import Link from "next/link";
import { Instagram, Facebook, Linkedin, ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BrandLockup from "@/components/BrandLockup";
import { useSiteSettings } from "@/components/site/site-settings-context";
import { motion } from "framer-motion";
import { getAddressLines } from "@/lib/site";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Footer() {
  const { settings } = useSiteSettings();
  const socialLinks = [
    { href: settings.instagramUrl, label: "Instagram", icon: Instagram },
    { href: settings.facebookUrl, label: "Facebook", icon: Facebook },
    { href: settings.linkedinUrl, label: "LinkedIn", icon: Linkedin },
  ].filter((item) => item.href);
  const addressLines = getAddressLines(settings);

  return (
    <footer className="bg-charcoal text-primary-foreground relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, hsl(38 60% 52% / 0.3), transparent)" }}
      />
      
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <AnimatedSection className="md:col-span-2" direction="left">
            <BrandLockup
              name={settings.siteName}
              logoUrl={settings.logoUrl}
              className="gap-3"
              textClassName="text-2xl text-cream sm:text-3xl"
              logoClassName="object-contain p-1.5"
            />
            <p className="text-warm-gray max-w-md leading-relaxed font-body text-sm">
              Transforming spaces into extraordinary experiences. We blend artistry with functionality
              to create interiors that tell your unique story.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h4 className="font-display text-lg mb-6 text-cream">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-warm-gray hover:text-gold transition-colors font-body text-sm flex items-center gap-1 group"
                >
                  {item.label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <h4 className="font-display text-lg mb-6 text-cream">Contact</h4>
            <div className="flex flex-col gap-3 text-warm-gray font-body text-sm">
              <p>{settings.contactEmail}</p>
              <p>{settings.contactPhone}</p>
              <div>
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
        <div className="border-t border-charcoal-light pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-warm-gray text-xs font-body">
            © {new Date().getFullYear()} {settings.siteName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
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
