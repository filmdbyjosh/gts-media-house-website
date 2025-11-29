"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "framer-motion";

export default function TypingEyebrow() {
  const ref = React.useRef<HTMLParagraphElement | null>(null);
  const isInView = useInView(ref, { amount: 0.8, once: false });
  const [keyVal, setKeyVal] = useState(0);

  useEffect(() => {
    if (isInView) {
      setKeyVal(prev => prev + 1);
    }
  }, [isInView]);

  return (
    <p
      ref={ref}
      key={keyVal}
      className="typewriter text-[11px] font-heading font-semibold uppercase tracking-[0.25em] text-textMuted"
      style={{ display: "inline-block" }}
    >
      What&apos;s the right pick for you?
    </p>
  );
}
