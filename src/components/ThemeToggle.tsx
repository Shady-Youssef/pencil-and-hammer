import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative w-14 h-7 rounded-full bg-secondary border border-border p-0.5 transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {/* Track icons */}
      <span className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <Sun size={12} className={`transition-opacity duration-300 ${isDark ? "opacity-30" : "opacity-80 text-gold"}`} />
        <Moon size={12} className={`transition-opacity duration-300 ${isDark ? "opacity-80 text-gold-light" : "opacity-30"}`} />
      </span>

      {/* Thumb */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="relative z-10 w-6 h-6 rounded-full bg-gradient-gold shadow-md"
        style={{ marginLeft: isDark ? "calc(100% - 1.5rem)" : 0 }}
      />
    </button>
  );
}
