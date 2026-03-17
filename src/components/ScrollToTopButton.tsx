"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function shouldHideOnPath(pathname: string) {
  return (
    pathname.startsWith("/admin") ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password" ||
    pathname === "/dashboard"
  );
}

export default function ScrollToTopButton() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isHiddenRoute = useMemo(
    () => shouldHideOnPath(pathname ?? "/"),
    [pathname],
  );

  useEffect(() => {
    if (isHiddenRoute) {
      setIsVisible(false);
      return;
    }

    const updateVisibility = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;

      setIsVisible(window.scrollY > 480);
      setScrollProgress(progress);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, [isHiddenRoute]);

  const scrollPercent = Math.round(scrollProgress * 100);
  const isComplete = scrollPercent >= 100;

  const handleScrollToTop = () => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.__pencilHammerLenis) {
      window.__pencilHammerLenis.scrollTo(0, {
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isHiddenRoute) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          key="scroll-to-top"
          type="button"
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 18, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.92 }}
          whileHover={{ y: -4, scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleScrollToTop}
          className="fixed bottom-5 right-5 z-[70] flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-border/80 bg-background/82 text-foreground shadow-[0_24px_60px_-28px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-colors hover:border-foreground/22 hover:bg-background sm:bottom-7 sm:right-7 sm:h-14 sm:w-14 dark:border-white/12 dark:bg-black/55 dark:text-cream dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] dark:hover:border-white/28 dark:hover:bg-black/65"
        >
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(hsl(var(--foreground) / 0.92) ${scrollPercent}%, hsl(var(--foreground) / 0.1) ${scrollPercent}% 100%)`,
            }}
          />
          <span className="absolute inset-[1px] rounded-full bg-background dark:bg-[rgba(8,8,8,0.92)]" />
          <AnimatePresence mode="wait" initial={false}>
            {isComplete ? (
              <motion.span
                key="arrow"
                initial={{ opacity: 0, scale: 0.75, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.75, y: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex items-center justify-center text-foreground dark:text-cream"
              >
                <ArrowUp size={18} strokeWidth={2} />
              </motion.span>
            ) : (
              <motion.span
                key="percent"
                initial={{ opacity: 0, scale: 0.82, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.82, y: -8 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 font-body text-[10px] font-medium uppercase tracking-[0.06em] text-foreground dark:text-cream sm:text-[11px]"
              >
                {scrollPercent}%
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
