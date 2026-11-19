"use client";

import { openApplication } from "@/lib/connect-open";

type ApplyButtonProps = {
  className?: string;
};

export default function ApplyButton({ className = "" }: ApplyButtonProps) {
  return (
    <a
      href="/#connect"
      className={`apply-btn ${className}`.trim()}
      onClick={(event) => {
        event.preventDefault();
        openApplication();
      }}
    >
      Connect with us
    </a>
  );
}
