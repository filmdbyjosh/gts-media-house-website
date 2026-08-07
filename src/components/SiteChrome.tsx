"use client";

import AnimGridLines from "@/components/AnimGridLines";
import CustomCursor from "@/components/CustomCursor";
import LockdownOverlay from "@/components/LockdownOverlay";
import ScrollDown from "@/components/ScrollDown";
import { site } from "@/lib/site";

export default function SiteChrome() {
  return (
    <>
      <CustomCursor />
      <AnimGridLines />
      <ScrollDown />
      {site.lockdown ? <LockdownOverlay /> : null}
    </>
  );
}
