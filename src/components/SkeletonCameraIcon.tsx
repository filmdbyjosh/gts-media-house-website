"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function SkeletonCameraIcon() {
  return (
    <motion.div
      className="fixed left-4 top-4 z-30 sm:left-6 sm:top-6"
      animate={{
        rotateX: [-10, 3, -10],
        rotateY: [8, -4, 8],
        scale: [1, 1.04, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative h-16 w-24 sm:h-20 sm:w-28">
        <Image
          src="/icons/skull-camera.png"
          alt="GTS camera mark"
          fill
          className="object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
          priority
        />
      </div>
    </motion.div>
  );
}
