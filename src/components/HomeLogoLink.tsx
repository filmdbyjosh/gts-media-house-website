"use client";

import type { ReactNode } from "react";

export default function HomeLogoLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href="/"
      className={className}
      aria-label="GTS Media House home"
      onClick={(event) => {
        event.preventDefault();
        window.location.assign("/");
      }}
    >
      {children}
    </a>
  );
}
