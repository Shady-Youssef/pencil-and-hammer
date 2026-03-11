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
        "relative inline-flex h-8 w-[4.5rem] items-center overflow-hidden rounded-full border border-border/80 bg-secondary/75 p-1 text-foreground shadow-[0_12px_35px_rgba(15,10,5,0.12)] backdrop-blur-xl transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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
                ? "opacity-30 text-foreground"
                : "opacity-90 text-gold"
              : "opacity-50 text-foreground",
          )}
        />
        <Moon
          size={13}
          className={cn(
            "transition-all duration-300",
            mounted
              ? isDark
                ? "opacity-85 text-gold-light"
                : "opacity-30 text-foreground"
              : "opacity-50 text-foreground",
          )}
        />
      </span>

      <motion.span
        animate={{ x: mounted && isDark ? 40 : 0 }}
        transition={{ type: "spring", stiffness: 450, damping: 32 }}
        className="relative z-10 block h-6 w-6 rounded-full bg-gradient-gold shadow-[0_8px_24px_rgba(194,145,58,0.45)]"
      />
    </button>
  );
}
