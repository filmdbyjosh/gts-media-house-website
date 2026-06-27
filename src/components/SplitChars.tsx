"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { charDelay, easeOut, motionDurations } from "@/lib/motion";

type SplitCharsProps = {
  text: string;
  className?: string;
  delay?: number;
};

export default function SplitChars({
  text,
  className = "",
  delay = 0,
}: SplitCharsProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const reducedMotion = useReducedMotion();

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          initial={{ opacity: reducedMotion ? 1 : 0 }}
          animate={{ opacity: isInView || reducedMotion ? 1 : 0 }}
          transition={{
            duration: reducedMotion ? 0 : motionDurations.char,
            delay: reducedMotion ? 0 : charDelay(index, delay),
            ease: easeOut,
          }}
          aria-hidden
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
