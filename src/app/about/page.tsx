"use client";

import { PageShell } from "@/components/PageShell";
import { site } from "@/lib/site";

export default function AboutPage() {
  return (
    <PageShell
      lines={[
        { before: "DIGITAL ", emphasis: "MARKETING" },
        { before: "BUILT TO ", emphasis: "SCALE" },
      ]}
      subtitle="A digital marketing agency for brands that want strategy, creative, and performance working as one system."
    >
      <section className="border-t border-white/10">
        <div className="list-row border-b-0">
          <div className="mx-auto max-w-[1100px] space-y-6 px-5 md:px-12">
            {site.about.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-2xl font-body text-base leading-relaxed text-textMuted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
