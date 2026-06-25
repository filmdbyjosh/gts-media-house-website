"use client";

import { useEffect, useRef } from "react";

type StrokeTitleProps = {
  lines: readonly { before: string; emphasis: string }[];
};

export default function StrokeTitle({ lines }: StrokeTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const strokes = el.querySelectorAll(".stroke-emphasis");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          strokes.forEach((stroke, i) => {
            setTimeout(() => stroke.classList.add("is-visible"), i * 180);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <h1
      ref={ref}
      className="font-display text-[clamp(2.75rem,7.5vw,5.5rem)] font-bold uppercase leading-[0.82] tracking-tight text-brandWhite"
    >
      {lines.map((line, i) => (
        <span key={line.emphasis} className="block">
          {line.before}
          <strong className="stroke-emphasis font-bold">
            <span className="relative z-[1]">{line.emphasis}</span>
          </strong>
          {i === lines.length - 1 && (
            <span className="ml-1 inline-block h-2 w-2 rounded-full bg-brandBlue" />
          )}
        </span>
      ))}
    </h1>
  );
}
