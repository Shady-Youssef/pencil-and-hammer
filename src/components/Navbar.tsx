"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const heroOverlayRoutes = new Set(["/", "/about"]);

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
  { name: "Dashboard", path: "/dashboard" },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() ?? "/";
  const hasHeroOverlay = heroOverlayRoutes.has(pathname);
  const useOverlayPalette = hasHeroOverlay && !scrolled && !isOpen;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled || isOpen || !hasHeroOverlay
          ? "bg-background/80 backdrop-blur-2xl shadow-sm border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12 h-20">
        <Link
          href="/"
          className={`font-display text-2xl font-semibold tracking-wider transition-colors duration-500 ${
            useOverlayPalette ? "text-cream drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]" : "text-foreground"
          }`}
        >
          MBM<span className="text-gradient-gold"> Designs</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
            >
              <Link
                href={link.path}
                className={`relative font-body text-sm tracking-widest uppercase transition-colors duration-300 ${
                  pathname === link.path
                    ? useOverlayPalette
                      ? "text-gold-light"
                      : "text-accent"
                    : useOverlayPalette
                      ? "text-cream/72 hover:text-cream"
                      : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.name}
                {pathname === link.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className={`absolute -bottom-1 left-0 right-0 h-[2px] ${
                      useOverlayPalette ? "bg-gold-light" : "bg-accent"
                    }`}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
          <ThemeToggle
            className={
              useOverlayPalette
                ? "border-white/10 bg-charcoal/45 text-cream shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
                : undefined
            }
          />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle
            className={
              useOverlayPalette
                ? "border-white/10 bg-charcoal/45 text-cream shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
                : undefined
            }
          />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 transition-colors duration-500 ${
              useOverlayPalette ? "text-cream" : "text-foreground"
            }`}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
            exit={{ opacity: 0, height: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-border overflow-hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.path}
                    className={`block py-3 font-body text-sm tracking-widest uppercase transition-colors ${
                      pathname === link.path
                        ? "text-accent"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
