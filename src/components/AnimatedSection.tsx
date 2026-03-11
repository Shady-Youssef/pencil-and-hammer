"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  scale?: boolean;
}

export default function AnimatedSection({ children, className = "", delay = 0, direction = "up", scale = false }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const y = direction === "up" ? 40 : 0;
  const x = direction === "left" ? -40 : direction === "right" ? 40 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y,
        x,
        scale: scale ? 0.97 : 1,
        clipPath: direction === "up"
          ? "inset(8% 0% 0% 0%)"
          : direction === "left"
          ? "inset(0% 0% 0% 8%)"
          : direction === "right"
          ? "inset(0% 8% 0% 0%)"
          : "inset(4% 4% 4% 4%)",
      }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)",
      } : undefined}
      transition={{
        duration: 1,
        delay,
        ease: [0.16, 1, 0.3, 1],
        clipPath: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.6, delay },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
