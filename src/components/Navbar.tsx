"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import BrandLockup from "@/components/BrandLockup";
import ThemeToggle from "@/components/ThemeToggle";
import { useSiteSettings } from "@/components/site/site-settings-context";
import { useTheme } from "@/components/theme-context";
import { getThemeBrandMarkUrl } from "@/lib/site";

const heroOverlayRoutes = new Set(["/"]);

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
  const { theme, mounted } = useTheme();
  const resolvedTheme = mounted ? theme : "light";
  const brandMarkUrl = getThemeBrandMarkUrl(settings, resolvedTheme);
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
    const updateScrolled = () => {
      const nextScrolled = window.scrollY > 24;
      setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
    };

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
        scrolled || isOpen || !hasHeroOverlay
          ? "border-b border-border/70 bg-background/90 shadow-[0_18px_44px_-28px_rgba(0,0,0,0.16)] backdrop-blur-2xl dark:bg-background/84 dark:shadow-[0_20px_48px_-28px_rgba(0,0,0,0.45)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:px-12">
        <Link
          href="/"
          className={`min-w-0 flex-1 transition-colors duration-500 lg:justify-self-start ${
            useOverlayPalette
              ? "text-cream drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]"
              : "text-foreground"
          }`}
        >
          <BrandLockup
            name={settings.siteName}
            logoUrl={brandMarkUrl}
            mode="mark"
            priority
            className="max-w-full gap-2.5 sm:gap-3 lg:gap-4"
            textClassName={`${useOverlayPalette ? "text-cream" : "text-foreground"} max-w-[9.5rem] text-[0.88rem] sm:max-w-[11.75rem] sm:text-[1rem] lg:max-w-none lg:text-[1.18rem] xl:text-[1.34rem]`}
            logoClassName="object-contain object-center"
            markClassName={`h-[3.4rem] w-[4.15rem] rounded-[1.1rem] sm:h-[3.95rem] sm:w-[4.9rem] lg:h-[4.9rem] lg:w-[6rem] ${
              useOverlayPalette
                ? "bg-white/92 shadow-[0_18px_34px_rgba(0,0,0,0.18)] backdrop-blur-md"
                : "bg-white/94 shadow-[0_14px_28px_rgba(0,0,0,0.12)] dark:bg-white/92 dark:shadow-[0_18px_36px_rgba(0,0,0,0.24)]"
            }`}
            fallbackTextClassName={useOverlayPalette ? "text-cream/84" : undefined}
          />
        </Link>

        <div className="hidden items-center justify-center lg:flex lg:justify-self-center">
          <div
            ref={desktopNavRef}
            className={`relative flex items-center gap-8 rounded-full border px-7 py-4 backdrop-blur-xl transition-colors ${
              useOverlayPalette
                ? "border-white/26 bg-black/42 text-white shadow-[0_24px_60px_-36px_rgba(0,0,0,0.62)]"
                : "border-border/80 bg-card/82 shadow-[0_18px_45px_-30px_rgba(0,0,0,0.16)] dark:border-white/10 dark:bg-black/18 dark:shadow-[0_18px_45px_-30px_rgba(0,0,0,0.32)]"
            }`}
          >
            {navLinks.map((link) => (
              <div key={link.path} className="relative">
                <Link
                  href={link.path}
                  ref={(node) => {
                    linkRefs.current[link.path] = node;
                  }}
                  className={`relative font-body text-[13px] font-medium tracking-[0.24em] uppercase transition-colors duration-300 ${
                    activePath === link.path
                      ? useOverlayPalette
                        ? "font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
                        : "text-foreground"
                      : useOverlayPalette
                        ? "text-white/92 drop-shadow-[0_2px_8px_rgba(0,0,0,0.28)] hover:text-white"
                        : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              </div>
            ))}
            <div className="pointer-events-none absolute inset-x-0 bottom-2 h-3">
              <motion.span
                className={`absolute bottom-0 h-[2px] rounded-full ${
                  useOverlayPalette ? "bg-white" : "bg-foreground"
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
        </div>

        <div className="flex shrink-0 items-center gap-2.5 lg:justify-self-end">
          <ThemeToggle
            className={
              useOverlayPalette
                ? "border-white/14 bg-black/20 text-cream shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
                : "border-border/80 bg-card/80 text-foreground shadow-[0_12px_30px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-black/24 dark:text-cream dark:shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
            }
          />

          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`rounded-full border px-3 py-2 transition-colors duration-500 ${
                useOverlayPalette
                  ? "border-white/14 bg-black/20 text-cream"
                  : "border-border/80 bg-card/80 text-foreground shadow-[0_12px_30px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-black/24 dark:text-cream dark:shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
              }`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
            exit={{ opacity: 0, height: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-border/70 bg-background/96 backdrop-blur-2xl dark:bg-background/94 lg:hidden"
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
                      activePath === link.path ? "text-foreground" : "text-muted-foreground"
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
