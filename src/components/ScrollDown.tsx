"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOut, motionDurations } from "@/lib/motion";

export default function ScrollDown() {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="pointer-events-none fixed bottom-3 left-1/2 z-[40] hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reducedMotion ? 0 : motionDurations.ui,
        delay: reducedMotion ? 0 : 2,
        ease: easeOut,
      }}
      aria-hidden="true"
    >
      <span className="font-body text-[9px] uppercase tracking-[0.6em] text-white/50 [writing-mode:vertical-lr]">
        Scroll
      </span>
      <motion.svg
        width="10"
        height="28"
        viewBox="0 0 10 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M5 1v20"
          stroke="currentColor"
          strokeWidth="1"
          className="text-white/80"
        />
        <path
          d="M1.5 17.5 5 21l3.5-3.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/40"
        />
      </motion.svg>
    </motion.div>
  );
}
