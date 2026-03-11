"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  scale?: boolean;
}

export default function AnimatedSection({ children, className = "", delay = 0, direction = "up", scale = false }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const distance = shouldReduceMotion ? 0 : 28;
  const y = direction === "up" ? distance : 0;
  const x = direction === "left" ? -distance : direction === "right" ? distance : 0;
  const initialScale = shouldReduceMotion ? 1 : scale ? 0.985 : 1;

  return (
    <motion.div
      initial={{
        y,
        x,
        scale: initialScale,
      }}
      whileInView={{
        y: 0,
        x: 0,
        scale: 1,
      }}
      viewport={{
        once: false,
        amount: 0.28,
        margin: "0px 0px -10% 0px",
      }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.85,
        delay,
        ease: [0.22, 1, 0.36, 1],
        y: { duration: shouldReduceMotion ? 0.01 : 0.85, delay, ease: [0.22, 1, 0.36, 1] },
        x: { duration: shouldReduceMotion ? 0.01 : 0.85, delay, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: shouldReduceMotion ? 0.01 : 0.85, delay, ease: [0.22, 1, 0.36, 1] },
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
