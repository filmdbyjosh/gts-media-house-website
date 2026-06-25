"use client";

import { useState } from "react";
import AuditModal from "@/components/AuditModal";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LineButton from "@/components/LineButton";
import ReviewsPreview from "@/components/ReviewsPreview";
import ServiceRow from "@/components/ServiceRow";
import StrokeTitle from "@/components/StrokeTitle";
import { site } from "@/lib/site";

export default function Home() {
  const [auditOpen, setAuditOpen] = useState(false);
  const openAudit = () => setAuditOpen(true);

  return (
    <>
      <Header onAuditClick={openAudit} />

      <main className="bg-brandBg">
        <section className="border-b border-white/10">
          <div className="mx-auto grid max-w-[1100px] lg:grid-cols-2">
            <div className="flex flex-col justify-center px-5 py-16 md:px-12 md:py-20 lg:py-24">
              <StrokeTitle lines={site.hero.lines} />
              <div className="mt-10">
                <LineButton onClick={openAudit}>Free marketing audit</LineButton>
              </div>
            </div>

            <div className="relative min-h-[280px] overflow-hidden lg:min-h-full">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src="/hero-video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/25 lg:bg-gradient-to-r lg:from-brandBg lg:via-transparent lg:to-transparent" />
            </div>
          </div>
        </section>

        <section className="border-b border-white/10">
          <div className="mx-auto flex max-w-[1100px] flex-wrap gap-6 px-5 py-5 md:px-12">
            <a href="#process" className="nav-line-link after:scale-x-100">
              Process
            </a>
            <a href="#about" className="nav-line-link text-textMuted">
              About
            </a>
            <a href="#reviews" className="nav-line-link text-textMuted">
              Reviews
            </a>
          </div>
        </section>

        <section id="process" className="border-b border-white/10">
          <div className="mx-auto max-w-[1100px] px-5 py-8 md:px-12">
            <p className="font-body text-sm text-textMuted">
              Showing <strong className="text-brandWhite">{site.process.length}</strong>{" "}
              steps
            </p>
          </div>

          {site.process.map((step) => (
            <ServiceRow
              key={step.step}
              title={`${step.step} — ${step.title}`}
              description={step.description}
              onAction={openAudit}
              actionLabel="Get started"
            />
          ))}
        </section>

        <section id="about" className="border-b border-white/10">
          <div className="mx-auto max-w-[1100px] px-5 py-8 md:px-12">
            <p className="font-body text-sm text-textMuted">About</p>
          </div>
          <div className="list-row">
            <div className="mx-auto max-w-[1100px] px-5 md:px-12">
              <h2 className="mb-8 font-display text-2xl font-bold uppercase tracking-tight text-brandWhite md:text-3xl">
                {site.name}
              </h2>
              <div className="max-w-2xl space-y-6">
                {site.about.paragraphs.slice(0, 2).map((paragraph) => (
                  <p
                    key={paragraph}
                    className="font-body text-base leading-relaxed text-textMuted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-10">
                <LineButton href="/about">Read more</LineButton>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="border-b border-white/10">
          <div className="mx-auto max-w-[1100px] px-5 py-8 md:px-12">
            <p className="font-body text-sm text-textMuted">Reviews</p>
          </div>
          <ReviewsPreview />
        </section>

        <Footer />
      </main>

      <AuditModal open={auditOpen} onClose={() => setAuditOpen(false)} />
    </>
  );
}
