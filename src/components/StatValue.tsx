"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type StatValueProps = {
  value: number;
  suffix?: string;
  className?: string;
};

export default function StatValue({ value, suffix = "", className }: StatValueProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const [n, setN] = useState(value);

  useEffect(() => {
    if (reduced !== false) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1200);
          const eased = 1 - (1 - t) ** 3;
          setN(Math.round(value * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setN(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduced, value]);

  return (
    <p ref={ref} className={className}>
      {`${n}${suffix}`}
    </p>
  );
}
