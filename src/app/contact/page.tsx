"use client";

import { useState } from "react";
import AuditModal from "@/components/AuditModal";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LineButton from "@/components/LineButton";
import StrokeTitle from "@/components/StrokeTitle";
import { site } from "@/lib/site";

export default function ContactPage() {
  const [auditOpen, setAuditOpen] = useState(false);

  return (
    <>
      <Header onAuditClick={() => setAuditOpen(true)} />
      <main className="min-h-screen bg-brandBg">
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-12 md:py-20">
            <StrokeTitle
              lines={[
                { before: "LET'S ", emphasis: "TALK" },
                { before: "GROW ", emphasis: "TOGETHER" },
              ]}
            />
            <p className="mt-8 max-w-xl font-body text-base leading-relaxed text-textMuted">
              Ready for a free marketing audit? Reach out directly or claim yours
              below.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-5 py-16 md:px-12">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <div>
                <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-textMuted">
                  Email
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="nav-line-link text-base text-brandWhite"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-textMuted">
                  Instagram
                </p>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-line-link text-base text-brandWhite"
                >
                  @gtsmediahouse
                </a>
              </div>
            </div>

            <div className="border border-white/10 p-8">
              <h2 className="mb-2 font-display text-2xl font-bold uppercase tracking-tight">
                Free Audit
              </h2>
              <p className="mb-8 font-body text-sm leading-relaxed text-textMuted">
                We&apos;ll review your ads, funnel, and tracking — then show you
                where to invest next.
              </p>
              <LineButton onClick={() => setAuditOpen(true)}>
                Claim yours
              </LineButton>
            </div>
          </div>
        </section>

        <Footer />
      </main>
      <AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  );
}
