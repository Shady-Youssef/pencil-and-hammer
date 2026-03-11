"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import BrandLockup from "@/components/BrandLockup";
import { useSiteSettings } from "@/components/site/site-settings-context";
import ThemeToggle from "@/components/ThemeToggle";

const heroOverlayRoutes = new Set(["/", "/about"]);

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
] as const;

type NavLinkPath = (typeof navLinks)[number]["path"];
type IndicatorState = { left: number; width: number };

function getActivePath(pathname: string) {
  if (pathname === "/") {
    return "/";
  }

  const match = navLinks.find((link) => {
    if (link.path === "/") {
      return false;
    }

    return pathname === link.path || pathname.startsWith(`${link.path}/`);
  });

  return match?.path ?? pathname;
}

export default function Navbar() {
  const { settings } = useSiteSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [indicator, setIndicator] = useState<IndicatorState>({ left: 0, width: 0 });
  const desktopNavRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<NavLinkPath, HTMLAnchorElement | null>>({
    "/": null,
    "/about": null,
    "/portfolio": null,
    "/contact": null,
  });
  const pathname = usePathname() ?? "/";
  const activePath = getActivePath(pathname);
  const hasHeroOverlay = heroOverlayRoutes.has(pathname);
  const useOverlayPalette = hasHeroOverlay && !scrolled && !isOpen;

  const getLinkMetrics = (path: NavLinkPath): IndicatorState | null => {
    const container = desktopNavRef.current;
    const activeLink = linkRefs.current[path];

    if (!container || !activeLink) {
      return null;
    }

    const containerRect = container.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    return {
      left: linkRect.left - containerRect.left,
      width: linkRect.width,
    };
  };

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const nextIndicator = getLinkMetrics(activePath as NavLinkPath);

      if (!nextIndicator) {
        setIndicator({ left: 0, width: 0 });
        return;
      }

      setIndicator(nextIndicator);
    };

    updateIndicator();

    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activePath]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled || isOpen || !hasHeroOverlay
          ? "bg-background/80 backdrop-blur-2xl shadow-sm border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12 h-20">
        <Link
          href="/"
          className={`transition-colors duration-500 ${
            useOverlayPalette
              ? "text-cream drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]"
              : "text-foreground"
          }`}
        >
          <BrandLockup
            name={settings.siteName}
            logoUrl={settings.logoUrl}
            priority
            className="gap-2 sm:gap-3"
            textClassName={`${useOverlayPalette ? "text-cream" : "text-foreground"} text-lg sm:text-2xl`}
            logoClassName="object-contain p-1.5"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          <div ref={desktopNavRef} className="relative flex items-center gap-10 pb-3">
            {navLinks.map((link) => (
              <div key={link.path} className="relative">
                <Link
                  href={link.path}
                  ref={(node) => {
                    linkRefs.current[link.path] = node;
                  }}
                  className={`relative font-body text-sm tracking-widest uppercase transition-colors duration-300 ${
                    activePath === link.path
                      ? useOverlayPalette
                        ? "text-gold-light"
                        : "text-accent"
                      : useOverlayPalette
                        ? "text-cream/72 hover:text-cream"
                        : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              </div>
            ))}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4">
              <motion.span
                className={`absolute bottom-[1px] h-[2px] rounded-full ${
                  useOverlayPalette ? "bg-gold-light" : "bg-accent"
                }`}
                animate={{
                  x: indicator.left,
                  width: indicator.width,
                  opacity: indicator.width > 0 ? 1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 340,
                  damping: 30,
                  mass: 0.8,
                }}
              />
            </div>
          </div>
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
                <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }} transition={{ duration: 0.2 }}>
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }} transition={{ duration: 0.2 }}>
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
                  initial={{ x: -18 }}
                  animate={{ x: 0 }}
                  transition={{ delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.path}
                    className={`block py-3 font-body text-sm tracking-widest uppercase transition-colors ${
                      activePath === link.path
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
    </nav>
  );
}
