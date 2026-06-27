"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import LineButton from "@/components/LineButton";
import WebsiteModal from "@/components/WebsiteModal";
import { easeOut, motionDurations } from "@/lib/motion";
import { site } from "@/lib/site";

type HeaderProps = {
  onAuditClick?: () => void;
};

export default function Header({ onAuditClick }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [websiteOpen, setWebsiteOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  const navLink = (item: (typeof site.nav)[number], key?: string) => {
    const isActive = !("external" in item) && pathname === item.href;
    const className = `nav-line-link ${isActive ? "after:scale-x-100" : ""}`;

    if ("external" in item && item.external) {
      return (
        <a
          key={key}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link key={key} href={item.href} className={className}>
        {item.label}
      </Link>
    );
  };

  const openWebsite = () => {
    setMobileOpen(false);
    setWebsiteOpen(true);
  };

  return (
    <>
      <motion.header
        className="relative z-20 border-b border-white/10 bg-brandBg"
        initial={{ opacity: reducedMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: reducedMotion ? 0 : motionDurations.ui,
          ease: easeOut,
        }}
      >
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-5 py-5 md:px-12 md:py-8">
          <Link
            href="/"
            className="relative block h-24 w-64 shrink-0 sm:h-28 sm:w-72 md:h-32 md:w-80"
          >
            <Image
              src={site.logo}
              alt={site.name}
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 md:flex lg:gap-8">
            {site.nav.map((item) => navLink(item, item.href))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden flex-col items-center gap-3 sm:flex">
              <LineButton onClick={onAuditClick}>Free audit</LineButton>
              <button
                type="button"
                onClick={openWebsite}
                className="nav-line-link text-[11px] text-brandWhite"
              >
                {site.websiteCta.label}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-lg md:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? "×" : "☰"}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="border-t border-white/10 px-5 py-6 md:hidden">
            <div className="flex flex-col gap-6">
              {site.nav.map((item) => (
                <div key={item.href} onClick={() => setMobileOpen(false)}>
                  {navLink(item)}
                </div>
              ))}
              <div className="flex flex-col items-center gap-3 pt-2">
                <LineButton
                  onClick={() => {
                    setMobileOpen(false);
                    onAuditClick?.();
                  }}
                >
                  Free audit
                </LineButton>
                <button
                  type="button"
                  onClick={openWebsite}
                  className="nav-line-link text-[11px] text-brandWhite"
                >
                  {site.websiteCta.label}
                </button>
              </div>
            </div>
          </nav>
        )}
      </motion.header>

      <WebsiteModal
        open={websiteOpen}
        onClose={() => setWebsiteOpen(false)}
      />
    </>
  );
}
