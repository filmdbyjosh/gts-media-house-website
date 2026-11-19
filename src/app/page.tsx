import type { Metadata } from "next";
import ApplyButton from "@/components/ApplyButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatValue from "@/components/StatValue";
import TalkingReels from "@/components/TalkingReels";
import {
  FacebookIcon,
  InstagramIcon,
  PostIcon,
  ProductionIcon,
  ScriptIcon,
  StrategyIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/components/SiteIcons";

export const metadata: Metadata = {
  title: "Done-for-you content production | GTS Media House",
  description:
    "We build custom content production systems for businesses looking to scale their social media presence.",
};

const wrap = "mx-auto w-full max-w-6xl px-6 lg:px-8";

const services = [
  {
    title: "Content Strategy",
    body: "Custom content plans built around your business, target audience and marketing goals.",
    Icon: StrategyIcon,
  },
  {
    title: "Research & Scripting",
    body: "Industry research, content development and custom video scripts.",
    Icon: ScriptIcon,
  },
  {
    title: "Production Setup",
    body: "Professional filming setups, camera settings, lighting and creative direction.",
    Icon: ProductionIcon,
  },
  {
    title: "Post-Production",
    body: "High-volume video editing with custom-branded subtitles, motion graphics, professional sound design and consistent visual quality across every video.",
    Icon: PostIcon,
  },
] as const;

const stats = [
  { value: 30, suffix: "+", label: "Monthly videos" },
  { value: 100, suffix: "%", label: "Custom content" },
  { value: 365, suffix: "", label: "Days of content" },
] as const;

const platforms = [
  { label: "Instagram", Icon: InstagramIcon },
  { label: "YouTube", Icon: YouTubeIcon },
  { label: "TikTok", Icon: TikTokIcon },
  { label: "Facebook", Icon: FacebookIcon },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0c0b0a] text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div className="hero-glow" aria-hidden="true" />
          <div
            className={`${wrap} relative grid items-center gap-14 py-16 md:py-24 lg:grid-cols-2 lg:gap-16 lg:py-28`}
          >
            <div>
              <h1 className="rise max-w-xl text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                Done-for-you content production.
              </h1>
              <p
                className="rise mt-6 max-w-xl text-base leading-relaxed text-stone-300 sm:text-lg"
                style={{ animationDelay: "90ms" }}
              >
                We build custom content production systems for businesses looking
                to scale their social media presence.
              </p>
              <div className="rise mt-10" style={{ animationDelay: "180ms" }}>
                <ApplyButton />
              </div>
            </div>
            <TalkingReels />
          </div>
        </section>

        <section className="border-t border-white/[0.08]" aria-labelledby="services-heading">
          <div className={`${wrap} py-20 md:py-28 lg:py-32`}>
            <h2
              id="services-heading"
              className="view-rise max-w-xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.05]"
            >
              Your dedicated content production team.
            </h2>
            <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
              {services.map((service, index) => (
                <article
                  key={service.title}
                  className="service-card view-rise rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-7"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <span className="sheen" aria-hidden="true" />
                  <div className="mb-8 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-white">
                      <service.Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs tabular-nums tracking-[0.18em] text-stone-500">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold tracking-tight text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-400">
                    {service.body}
                  </p>
                  <span
                    className="progress"
                    aria-hidden="true"
                    style={{ animationDelay: `${index * 0.45}s` }}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.08]" aria-labelledby="system-heading">
          <div className={`${wrap} py-20 md:py-28 lg:py-32`}>
            <h2
              id="system-heading"
              className="view-rise max-w-xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.05]"
            >
              Consistent content. Built to scale.
            </h2>
            <p className="view-rise mt-6 max-w-xl text-base leading-relaxed text-stone-300 sm:text-lg">
              A custom content production system designed around your brand,
              delivering high-quality video content month after month.
            </p>
            <div className="mt-16 grid border-y border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-white/10">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-b border-white/10 py-8 last:border-b-0 sm:border-b-0 sm:px-10 sm:first:pl-0 sm:last:pr-0"
                >
                  <StatValue
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-5xl font-bold tabular-nums tracking-tight text-white md:text-6xl"
                  />
                  <p className="mt-3 text-sm text-stone-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="marquee pb-16 md:pb-20" aria-hidden="true">
            <div className="marquee-track">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex items-center gap-11 pr-11">
                  {platforms.map(({ label, Icon }) => (
                    <span
                      key={`${copy}-${label}`}
                      className="inline-flex items-center gap-3 text-sm text-stone-400"
                    >
                      <Icon className="h-6 w-6" />
                      {label}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <ul className="sr-only">
            {platforms.map(({ label }) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </section>

        <section className="border-t border-white/[0.08]" aria-labelledby="cta-heading">
          <div className={`${wrap} py-16 md:py-24 lg:py-28`}>
            <div className="cta-shell">
              <div className="cta-spin" aria-hidden="true" />
              <div className="cta-inner px-6 py-16 sm:px-12 md:py-20">
                <h2
                  id="cta-heading"
                  className="max-w-xl text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.05]"
                >
                  Let&apos;s scale your content.
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-300 sm:text-lg">
                  Connect with GTS Media House.
                </p>
                <div className="mt-10">
                  <ApplyButton />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
