"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOut, motionDurations } from "@/lib/motion";

const positions = ["10%", "30%", "50%", "70%", "90%"];

export default function AnimGridLines() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] hidden lg:block"
      aria-hidden="true"
    >
      {positions.map((left, index) => (
        <motion.div
          key={left}
          className="absolute bottom-0 w-px origin-bottom bg-white/[0.04]"
          style={{ left }}
          initial={{ height: reducedMotion ? "100%" : "0%" }}
          animate={{ height: "100%" }}
          transition={{
            duration: reducedMotion ? 0 : motionDurations.line,
            delay: reducedMotion ? 0 : index * 0.08,
            ease: easeOut,
          }}
        />
      ))}
    </div>
  );
}
