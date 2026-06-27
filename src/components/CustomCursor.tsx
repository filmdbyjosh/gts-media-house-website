"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";

const DOT_SIZE = 10;

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const reducedMotion = useReducedMotion();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, { stiffness: 700, damping: 42, mass: 0.12 });
  const dotY = useSpring(mouseY, { stiffness: 700, damping: 42, mass: 0.12 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateEnabled = () => setIsEnabled(media.matches);
    updateEnabled();
    media.addEventListener("change", updateEnabled);
    return () => media.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!isEnabled || reducedMotion) return;

    const handleMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.documentElement.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
    };
  }, [isEnabled, reducedMotion, mouseX, mouseY]);

  if (!isEnabled || reducedMotion || !isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[10000] rounded-full bg-brandBlue"
      style={{
        x: dotX,
        y: dotY,
        width: DOT_SIZE,
        height: DOT_SIZE,
        translateX: "-50%",
        translateY: "-50%",
      }}
      aria-hidden="true"
    />
  );
}
