"use client";

import ApplicationModal from "@/components/ApplicationModal";
import LockdownOverlay from "@/components/LockdownOverlay";
import { site } from "@/lib/site";
import { usePathname } from "next/navigation";

export default function SiteChrome() {
  const pathname = usePathname() ?? "";
  const isCheckoutSandbox =
    pathname === "/checkout" || pathname.startsWith("/checkout/");

  if (site.lockdown && !isCheckoutSandbox) {
    return <LockdownOverlay />;
  }

  return <ApplicationModal />;
}
