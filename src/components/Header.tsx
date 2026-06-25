"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LineButton from "@/components/LineButton";
import { site } from "@/lib/site";

type HeaderProps = {
  onAuditClick?: () => void;
};

export default function Header({ onAuditClick }: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <header className="border-b border-white/10 bg-brandBg">
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
          <LineButton
            onClick={onAuditClick}
            className="hidden sm:inline-flex"
          >
            Free audit
          </LineButton>

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
            <LineButton
              onClick={() => {
                setMobileOpen(false);
                onAuditClick?.();
              }}
            >
              Free audit
            </LineButton>
          </div>
        </nav>
      )}
    </header>
  );
}
