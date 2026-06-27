"use client";

import { useState } from "react";
import { AnimReveal, AnimText } from "@/components/AnimFadeBox";
import AuditModal from "@/components/AuditModal";
import ContactInfo from "@/components/ContactInfo";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LineButton from "@/components/LineButton";
import StrokeTitle from "@/components/StrokeTitle";
import WebsiteModal from "@/components/WebsiteModal";

export default function ContactPage() {
  const [auditOpen, setAuditOpen] = useState(false);
  const [websiteOpen, setWebsiteOpen] = useState(false);

  return (
    <>
      <Header onAuditClick={() => setAuditOpen(true)} />
      <main className="relative z-10 min-h-screen bg-brandBg">
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-12 md:py-20">
            <StrokeTitle lines={[{ before: "LET'S ", emphasis: "TALK" }]} />
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-5 py-16 md:px-12">
          <div className="grid gap-12 md:grid-cols-2">
            <AnimReveal>
              <ContactInfo />
            </AnimReveal>

            <AnimReveal>
              <div className="border border-white/10 p-8">
                <h2 className="mb-2 font-display text-2xl font-bold uppercase tracking-tight">
                  Free Audit
                </h2>
                <AnimText delay={0.2}>
                  <p className="mb-8 font-body text-sm leading-relaxed text-textMuted">
                    We&apos;ll review your ads, funnel, and tracking — then show you
                    where to invest next.
                  </p>
                </AnimText>
                <LineButton onClick={() => setAuditOpen(true)}>
                  Claim yours
                </LineButton>
              </div>
            </AnimReveal>
          </div>

          <AnimReveal>
            <div
              id="websites"
              className="mt-12 max-w-xl border border-white/10 p-8"
            >
              <h2 className="mb-2 font-display text-xl font-bold uppercase tracking-tight text-brandWhite">
                Websites
              </h2>
              <AnimText delay={0.15}>
                <p className="mb-6 font-body text-sm leading-relaxed text-textMuted">
                  Need a site built around your brand? We design and develop websites
                  that match your marketing and scale with your business.
                </p>
              </AnimText>
              <button
                type="button"
                onClick={() => setWebsiteOpen(true)}
                className="nav-line-link text-sm text-brandWhite"
              >
                Get in touch
              </button>
            </div>
          </AnimReveal>
        </section>

        <Footer />
      </main>
      <AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />
      <WebsiteModal open={websiteOpen} onClose={() => setWebsiteOpen(false)} />
    </>
  );
}
