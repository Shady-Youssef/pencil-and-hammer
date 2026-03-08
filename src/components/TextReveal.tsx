import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function TextReveal({ children, className = "", delay = 0, stagger = 0.02 }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const words = children.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotateX: -80 }}
            animate={isInView ? { y: "0%", rotateX: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
