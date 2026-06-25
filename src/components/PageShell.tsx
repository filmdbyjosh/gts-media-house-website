"use client";

import { useState } from "react";
import AuditModal from "@/components/AuditModal";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StrokeTitle from "@/components/StrokeTitle";
import { site } from "@/lib/site";

type PageShellProps = {
  lines: readonly { before: string; emphasis: string }[];
  subtitle?: string;
  children: React.ReactNode;
};

export function PageShell({ lines, subtitle, children }: PageShellProps) {
  const [auditOpen, setAuditOpen] = useState(false);

  return (
    <>
      <Header onAuditClick={() => setAuditOpen(true)} />
      <main className="min-h-screen bg-brandBg">
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-12 md:py-20">
            <StrokeTitle lines={lines} />
            {subtitle && (
              <p className="mt-8 max-w-2xl font-body text-base leading-relaxed text-textMuted md:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        </section>
        {children}
        <Footer />
      </main>
      <AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  );
}
