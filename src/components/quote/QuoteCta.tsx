"use client";

import ConnectCta from "@/components/ConnectCta";

type QuoteCtaProps = {
  className?: string;
  children?: React.ReactNode;
};

/** @deprecated Prefer ConnectCta — kept for existing imports */
export default function QuoteCta({ className = "", children }: QuoteCtaProps) {
  return <ConnectCta className={className}>{children}</ConnectCta>;
}
