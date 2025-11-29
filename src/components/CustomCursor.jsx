"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState("default");
  const [cursorVisible, setCursorVisible] = useState(true);

  const mouseX = useSpring(0, { stiffness: 300, damping: 30, mass: 0.4 });
  const mouseY = useSpring(0, { stiffness: 300, damping: 30, mass: 0.4 });

  useEffect(() => {
    const moveHandler = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const hideHandler = () => setCursorVisible(false);
    const showHandler = () => setCursorVisible(true);

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseleave", hideHandler);
    window.addEventListener("mouseenter", showHandler);

    const interactiveSelectors = "a, button, [data-cursor='link']";
    const interactiveEls = document.querySelectorAll(interactiveSelectors);

    const handleEnter = () => setCursorVariant("link");
    const handleLeave = () => setCursorVariant("default");

    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseleave", hideHandler);
      window.removeEventListener("mouseenter", showHandler);

      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [mouseX, mouseY]);

  if (!cursorVisible) return null;

  const sizeDefault = 12;
  const sizeLink = 52;

  const isLink = cursorVariant === "link";
  const size = isLink ? sizeLink : sizeDefault;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: -size / 2,
        translateY: -size / 2,
        width: size,
        height: size,
        borderRadius: "9999px",
        backgroundColor: isLink ? "transparent" : "#00f0ff",
        border: isLink ? "1px solid #00f0ff" : "none",
        filter: "drop-shadow(0 0 6px #00f0ff)",

      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.4,
      }}
    />
  );
}

