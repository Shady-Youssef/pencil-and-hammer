"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __mbmLenis?: Lenis;
  }
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.innerWidth < 768 || "ontouchstart" in window) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });
    window.__mbmLenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      delete window.__mbmLenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
