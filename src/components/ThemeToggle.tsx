"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-context";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, mounted, toggle } = useTheme();
  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
      aria-pressed={mounted ? isDark : undefined}
      className={cn(
        "relative inline-flex h-8 w-[4.5rem] items-center overflow-hidden rounded-full border border-border/80 bg-background/82 p-1 text-foreground shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-black/42 dark:text-cream dark:shadow-[0_16px_36px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <span className="absolute inset-x-2 flex items-center justify-between pointer-events-none">
        <Sun
          size={13}
          className={cn(
            "transition-all duration-300",
            mounted
              ? isDark
                ? "opacity-30 text-current"
                : "opacity-95 text-current"
              : "opacity-50 text-current",
          )}
        />
        <Moon
          size={13}
          className={cn(
            "transition-all duration-300",
            mounted
              ? isDark
                ? "opacity-95 text-current"
                : "opacity-30 text-current"
              : "opacity-50 text-current",
          )}
        />
      </span>

      <motion.span
        initial={false}
        animate={{ x: mounted && isDark ? 40 : 0 }}
        transition={{ type: "spring", stiffness: 450, damping: 32 }}
        className="relative z-10 block h-6 w-6 rounded-full bg-current shadow-[0_10px_24px_rgba(0,0,0,0.14)] dark:shadow-[0_10px_24px_rgba(255,255,255,0.08)]"
      />
    </button>
  );
}
