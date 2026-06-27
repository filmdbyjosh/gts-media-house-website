"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { easeOut, motionDurations } from "@/lib/motion";
import SplitChars from "@/components/SplitChars";

type AnimFadeBoxProps = {
  children: ReactNode;
  className?: string;
};

export function AnimFadeBox({ children, className = "" }: AnimFadeBoxProps) {
  return <div className={className}>{children}</div>;
}

type AnimTitleProps = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
};

export function AnimTitle({
  children,
  className = "",
  as: Tag = "h2",
}: AnimTitleProps) {
  return (
    <Tag className={className}>
      <SplitChars text={children} />
    </Tag>
  );
}

type AnimTextProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function AnimText({ children, className = "", delay = 0 }: AnimTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: reducedMotion ? 1 : 0 }}
      animate={{ opacity: isInView || reducedMotion ? 1 : 0 }}
      transition={{
        duration: reducedMotion ? 0 : motionDurations.fade,
        delay: reducedMotion ? 0 : delay,
        ease: easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}

type AnimRevealProps = {
  children: ReactNode;
  className?: string;
};

export function AnimReveal({ children, className = "" }: AnimRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 24 }}
      animate={{
        opacity: isInView || reducedMotion ? 1 : 0,
        y: isInView || reducedMotion ? 0 : 24,
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.8,
        ease: easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}

type AnimScaleProps = {
  children: ReactNode;
  className?: string;
};

export function AnimScale({ children, className = "" }: AnimScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: reducedMotion ? 1 : 0, scale: reducedMotion ? 1 : 0.95 }}
      animate={{
        opacity: isInView || reducedMotion ? 1 : 0,
        scale: isInView || reducedMotion ? 1 : 0.95,
      }}
      transition={{
        duration: reducedMotion ? 0 : 1,
        ease: easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}
