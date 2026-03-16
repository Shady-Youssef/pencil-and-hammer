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
    <footer className="relative overflow-hidden bg-charcoal text-primary-foreground">
      <div
        className="absolute left-1/2 top-0 h-px w-[800px] -translate-x-1/2"
        style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.2), transparent)" }}
      />

      <div className="section-padding mx-auto max-w-7xl">
        <div className="mb-16 grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,0.8fr)]">
          <AnimatedSection direction="left">
            <BrandLockup
              name={settings.siteName}
              logoUrl={settings.logoUrl}
              className="gap-3"
              textClassName="text-2xl text-cream sm:text-[2rem]"
              logoClassName="object-contain p-1.5"
            />
            <p className="mt-6 max-w-md font-body text-sm leading-8 text-warm-gray">
              Pencil And Hammer develops residential, hospitality, and workplace interiors with a process built around clarity, coordination, and a more refined final result.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h4 className="mb-6 font-body text-[11px] uppercase tracking-[0.24em] text-cream/58">Navigation</h4>
            <div className="flex flex-col gap-3">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-1 font-body text-sm text-warm-gray transition-colors hover:text-cream"
                >
                  {item.label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <h4 className="mb-6 font-body text-[11px] uppercase tracking-[0.24em] text-cream/58">Contact</h4>
            <div className="flex flex-col gap-3 font-body text-sm text-warm-gray">
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
        <div className="flex flex-col items-center justify-between gap-4 border-t border-charcoal-light pt-8 md:flex-row">
          <p className="font-body text-xs text-warm-gray">
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
                className="text-warm-gray transition-colors hover:text-cream"
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
