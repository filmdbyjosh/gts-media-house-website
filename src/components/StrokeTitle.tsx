"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import SplitChars from "@/components/SplitChars";
import { lineStrokeDelay } from "@/lib/motion";

type StrokeTitleProps = {
  lines: readonly { before: string; emphasis: string }[];
};

export default function StrokeTitle({ lines }: StrokeTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const strokes = ref.current.querySelectorAll(".stroke-emphasis");
    strokes.forEach((stroke, lineIndex) => {
      const line = lines[lineIndex];
      if (!line) return;

      const delay = reducedMotion
        ? 0
        : lineStrokeDelay(line.before.length, line.emphasis.length, lineIndex);

      window.setTimeout(() => {
        stroke.classList.add("is-visible");
      }, delay);
    });
  }, [isInView, lines, reducedMotion]);

  return (
    <h1
      ref={ref}
      className="font-display text-[clamp(2.75rem,7.5vw,5.5rem)] font-bold uppercase leading-[0.82] tracking-tight text-brandWhite"
    >
      {lines.map((line, lineIndex) => {
        const beforeDelay = lineIndex * 0.18;

        return (
          <span key={line.emphasis} className="block">
            {line.before ? (
              <SplitChars text={line.before} delay={beforeDelay} />
            ) : null}
            <strong className="stroke-emphasis font-bold">
              <span className="relative z-[1]">
                <SplitChars
                  text={line.emphasis}
                  delay={
                    beforeDelay + line.before.length * 0.04 + (line.before ? 0.08 : 0)
                  }
                />
              </span>
            </strong>
          </span>
        );
      })}
    </h1>
  );
}
