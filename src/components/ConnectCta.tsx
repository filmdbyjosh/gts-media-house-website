"use client";

import { openConnectForm } from "@/lib/connect-open";
import { site } from "@/lib/site";

type ConnectCtaProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function ConnectCta({ className = "", children }: ConnectCtaProps) {
  return (
    <a
      href="/#connect"
      className={className}
      onClick={(event) => {
        event.preventDefault();
        openConnectForm();
      }}
    >
      {children ?? site.hero.cta}
    </a>
  );
}
