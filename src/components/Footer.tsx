"use client";

import Link from "next/link";
import { Instagram, Facebook, Linkedin, ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import BrandLockup from "@/components/BrandLockup";
import { useSiteSettings } from "@/components/site/site-settings-context";
import { motion } from "framer-motion";
import { getAddressLines, getEffectiveBrandMarkUrl } from "@/lib/site";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
] as const;

export default function Footer() {
  const { settings } = useSiteSettings();
  const brandMarkUrl = getEffectiveBrandMarkUrl(settings);
  const socialLinks = [
    { href: settings.instagramUrl, label: "Instagram", icon: Instagram },
    { href: settings.facebookUrl, label: "Facebook", icon: Facebook },
    { href: settings.linkedinUrl, label: "LinkedIn", icon: Linkedin },
  ].filter((item) => item.href);
  const addressLines = getAddressLines(settings);

  return (
    <footer className="relative overflow-hidden bg-background text-foreground dark:bg-charcoal dark:text-primary-foreground">
      <div
        className="absolute left-1/2 top-0 h-px w-[800px] -translate-x-1/2"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.28), transparent)" }}
      />

      <div className="section-padding mx-auto max-w-7xl">
        <div className="mb-16 grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,0.8fr)]">
          <AnimatedSection direction="left">
            <BrandLockup
              name={settings.siteName}
              logoUrl={brandMarkUrl}
              mode="mark"
              className="gap-3 sm:gap-3.5"
              textClassName="text-[1.45rem] text-foreground sm:text-[1.75rem] dark:text-cream"
              logoClassName="object-contain object-center"
              markClassName="h-[3.25rem] w-[4rem] rounded-[1.05rem] border border-black/5 bg-white/94 shadow-[0_14px_28px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-white/92 dark:shadow-[0_18px_34px_rgba(0,0,0,0.24)] sm:h-[3.75rem] sm:w-[4.7rem]"
            />
            <p className="mt-6 max-w-md font-body text-sm leading-8 text-muted-foreground dark:text-warm-gray">
              Pencil And Hammer develops residential, hospitality, and workplace interiors with a process built around clarity, coordination, and a more refined final result.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h4 className="mb-6 font-body text-[11px] uppercase tracking-[0.24em] text-muted-foreground dark:text-cream/58">Navigation</h4>
            <div className="flex flex-col gap-3">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-1 font-body text-sm text-muted-foreground transition-colors hover:text-foreground dark:text-warm-gray dark:hover:text-cream"
                >
                  {item.label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <h4 className="mb-6 font-body text-[11px] uppercase tracking-[0.24em] text-muted-foreground dark:text-cream/58">Contact</h4>
            <div className="flex flex-col gap-3 font-body text-sm text-muted-foreground dark:text-warm-gray">
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
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-8 dark:border-charcoal-light md:flex-row">
          <p className="font-body text-xs text-muted-foreground dark:text-warm-gray">
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
                className="text-muted-foreground transition-colors hover:text-foreground dark:text-warm-gray dark:hover:text-cream"
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
