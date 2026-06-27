"use client";

import AnimGridLines from "@/components/AnimGridLines";
import CustomCursor from "@/components/CustomCursor";
import ScrollDown from "@/components/ScrollDown";

export default function SiteChrome() {
  return (
    <>
      <CustomCursor />
      <AnimGridLines />
      <ScrollDown />
    </>
  );
}
