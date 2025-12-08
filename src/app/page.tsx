"use client";

import React, {
  FormEvent,
  MouseEvent as ReactMouseEvent,
  useEffect,
  useState,
  useRef,
} from "react";
import { motion } from "framer-motion";
import { SkeletonCameraIcon } from "../components/SkeletonCameraIcon";
import Image from "next/image";

/* MAIN PAGE */

export default function HomePage() {
  return (
    <main className="relative bg-brandBg text-textMain">
      <CustomCursor />
    

      {/* HERO VIDEO STRIP */}
      <section className="relative h-[33vh] w-full overflow-hidden">
        <video
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      </section>
      <SkeletonCameraIcon />



      {/* electric blue hero section */}
      <Hero />

      {/* production vs freelance (inside container) */}
      <ProductionSection />

      {/* full bleed process section */}
      <ProductionProcessSection />

      {/* rest of page in container */}
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        {/* CONTACT SECTION */}
        <ContactSection />

        {/* FOUNDER SECTION */}
        <motion.section
          className="mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <FounderSection />
        </motion.section>

        <Footer />
      </div>
    </main>
  );
}

/* HERO - electric blue hero section */

function Hero() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left - rect.width / 2) / rect.width;
    const y = (clientY - rect.top - rect.height / 2) / rect.height;
    setParallax({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative left-1/2 w-screen -translate-x-1/2"
    >
      {/* banner strip under hero video */}
      <div className="w-full border-y border-white bg-black">
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
          <p className="text-center text-[11px] font-heading font-semibold uppercase tracking-[0.25em] text-electricBlue">
            Elevate your brand with visuals that match its ambition.
          </p>
        </div>
      </div>

      <div className="relative flex min-h-screen w-full items-center justify-center bg-electricBlue text-brandWhite">
        {/* glow + divider */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute right-[-80px] bottom-[-80px] h-80 w-80 rounded-full bg-black/25 blur-3xl" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/18" />
        </div>

        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-1 px-4 py-6 text-center sm:px-6 lg:px-8">

  {/* eyebrow */}
  <div className="flex items-center justify-center gap-2 text-[11px] font-heading uppercase tracking-[0.25em] text-white/80">
    <span className="h-px w-4 bg-white/30 animate-line-fade" />
    <span>Motion Creates Emotion</span>
    <span className="h-px w-4 bg-white/30 animate-line-fade" />
  </div>

  {/* headline + subline */}
  <div className="space-y-4 max-w-4xl mx-auto mt-4 text-center">
    <h1 className="text-balance font-heading font-bold tracking-tight leading-[1.05] text-3xl sm:text-5xl lg:text-[3.5rem]">
      Dynamic brand visuals inspired by
    </h1>
    <p className="text-balance font-heading font-semibold tracking-[0.35em] text-xs sm:text-sm lg:text-base uppercase text-white/90">
      LIFESTYLE&nbsp; | &nbsp;ENERGY&nbsp; | &nbsp;CULTURE
    </p>
  </div>

  {/* CTA + subtext */}
  <div className="flex flex-wrap items-center justify-center gap-4">
    <a
      href="#contact"
      className="rounded-full bg-brandWhite px-7 py-2.5 text-sm font-semibold text-brandBlack transition hover:bg-[#e5e5e5]"
    >
      Connect With Us
    </a>
    <p className="text-xs text-white/85">
      Premium visual storytelling for brands that want to stand out.
    </p>
  </div>

  {/* logo at the bottom */}
  <div className="flex justify-center mt-4">
    <Image
      src="/gts-main-logo.png"
      alt="GTS Media House Logo"
      width={1600}
      height={1600}
      className="w-auto h-96"
      priority
    />
  </div>

</div>


        {/* scroll hint */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 text-[11px] text-white/80">
          <div className="h-6 w-px bg-white/45 animate-line-fade" />
          <span>Designed for brands that lead</span>
        </div>
      </div>
    </section>
  );
}

/* PRODUCTION COMPANY VS FREELANCE */

function ProductionSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-16">
        {/* Top: eyebrow, headline, subtext */}
        <motion.div
          className="relative pb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* subtle gradient blob */}
          <div className="pointer-events-none absolute -top-12 right-[-80px] h-40 w-40 rounded-full bg-electricBlue/10 blur-3xl" />

          <div className="text-center">
            <p className="typewriter text-[11px] font-heading font-semibold uppercase tracking-[0.25em] text-textMuted">
              What&apos;s the right pick for you?
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end">
            <div className="flex items-start gap-4">
              <span className="hidden h-20 w-px bg-borderSoft lg:block" />
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight leading-tight text-textMain"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span className="text-electricBlue">Production company</span>
                <br />
                vs freelance
                <br />
                video guy
              </motion.h2>
            </div>

            <motion.p
              className="mt-4 max-w-md text-base sm:text-lg font-medium text-textMuted lg:ml-auto lg:text-right"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              Two very different ways to approach video. One is built for brand
              storytelling at scale. The other is built for fast, simple
              execution.
            </motion.p>
          </div>
        </motion.div>

        {/* Row 1: production company card + paragraph */}
        <motion.div
          className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)] lg:items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <motion.div className="group relative rounded-3xl border border-borderSoft bg-brandWhite px-6 py-7 shadow-cardSm transition-all duration-300 hover:-translate-y-3 hover:scale-[1.02] hover:bg-electricBlue hover:border-white/20 hover:shadow-[0_22px_70px_rgba(0,0,0,0.6)]">
            <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.25em] text-textMuted group-hover:text-white/80">
              Production company
            </p>
            <p className="mt-4 text-xl font-heading font-semibold text-brandBlack group-hover:text-white">
              Built for full scale brand storytelling.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-textMuted group-hover:text-white/85">
              A full crew, real strategy, and cinematic execution from first
              call to final export.
            </p>

            <div className="mt-6 space-y-4 text-sm">
              <div>
                <p className="font-semibold text-brandBlack group-hover:text-white">
                  Strategic foundation
                </p>
                <p className="text-xs leading-relaxed text-textMuted group-hover:text-white/85">
                  Discovery, planning, and brand aligned goals before cameras
                  ever roll.
                </p>
              </div>
              <div>
                <p className="font-semibold text-brandBlack group-hover:text-white">
                  Creative and direction
                </p>
                <p className="text-xs leading-relaxed text-textMuted group-hover:text-white/85">
                  Concepts, scripting, and storyboarding with a creative lead
                  guiding every frame.
                </p>
              </div>
              <div>
                <p className="font-semibold text-brandBlack group-hover:text-white">
                  Full crew and gear
                </p>
                <p className="text-xs leading-relaxed text-textMuted group-hover:text-white/85">
                  Specialists for camera, lighting, audio, edit, and color with
                  cinema level tools.
                </p>
              </div>
              <div>
                <p className="font-semibold text-brandBlack group-hover:text-white">
                  Cinematic post
                </p>
                <p className="text-xs leading-relaxed text-textMuted group-hover:text-white/85">
                  Editing, sound design, and color grading built to live on web,
                  social, and campaigns.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-sm leading-relaxed text-textMuted">
              A production company is built for brands that want to treat
              content like a real asset, not a one off expense. Strategy,
              creative, crew, and post are all aligned around your brand
              identity and long term goals. It is the difference between making
              a video and building a visual system for how your brand shows up
              everywhere.
            </p>
          </motion.div>
        </motion.div>

        {/* Freelance cue */}
        <motion.div
          className="flex justify-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col items-end gap-2 text-textMuted">
            <span className="text-[11px] font-heading uppercase tracking-[0.25em]">
              Freelance video guy
            </span>
            <span className="text-xs animate-line-fade">↓ scroll</span>
          </div>
        </motion.div>

        {/* Row 2: freelance paragraph + card */}
        <motion.div
          className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.7fr)] lg:items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-sm leading-relaxed text-textMuted">
              A freelance video guy is perfect when you need something quick and
              simple: an event recap, a basic promo, or a one off social asset.
              It is lean, fast, and budget friendly, but it is not designed to
              carry a full brand strategy or replace the depth of a dedicated
              production team.
            </p>
          </motion.div>

          <motion.div className="group relative rounded-3xl border border-borderSoft bg-brandWhite px-6 py-7 shadow-cardSm transition-all duration-300 hover:-translate-y-3 hover:scale-[1.02] hover:bg-electricBlue hover:border-white/20 hover:shadow-[0_22px_70px_rgba(0,0,0,0.6)]">
            <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.25em] text-textMuted group-hover:text-white/80">
              Freelance video guy
            </p>
            <p className="mt-4 text-xl font-heading font-semibold text-brandBlack group-hover:text-white">
              Best for small, fast projects.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-textMuted group-hover:text-white/85">
              One person wearing many hats. Great when you need something simple
              done quickly.
            </p>

            <div className="mt-6 space-y-4 text-sm">
              <div>
                <p className="font-semibold text-brandBlack group-hover:text-white">
                  Task based work
                </p>
                <p className="text-xs leading-relaxed text-textMuted group-hover:text-white/85">
                  Focused on delivering a specific video, not a long term brand
                  content strategy.
                </p>
              </div>
              <div>
                <p className="font-semibold text-brandBlack group-hover:text-white">
                  One person, many roles
                </p>
                <p className="text-xs leading-relaxed text-textMuted group-hover:text-white/85">
                  The same person shoots, records audio, and edits, which keeps
                  it lean but limited.
                </p>
              </div>
              <div>
                <p className="font-semibold text-brandBlack group-hover:text-white">
                  Lighter setups
                </p>
                <p className="text-xs leading-relaxed text-textMuted group-hover:text-white/85">
                  Solid gear, but not the full lighting, audio, and crew depth
                  of a studio production.
                </p>
              </div>
              <div>
                <p className="font-semibold text-brandBlack group-hover:text-white">
                  Simple post
                </p>
                <p className="text-xs leading-relaxed text-textMuted group-hover:text-white/85">
                  Faster edits with less time for deep color, sound design, and
                  multi version deliverables.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* PROCESS SECTION - full bleed, sticky label, scroll progress */

function ProductionProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionHeight = rect.height;

      const distance = viewportHeight - rect.top;
      const total = sectionHeight + viewportHeight;
      const raw = distance / total;
      const clamped = Math.min(1, Math.max(0, raw));

      setProgress(clamped);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="video-production-process"
      ref={sectionRef}
      className="relative bg-brandBg py-20"
    >
      {/* soft full bleed gradient accents */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(0,240,255,0.12),_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(circle_at_bottom,_rgba(0,196,204,0.1),_transparent_60%)]" />

      <div className="relative mx-auto flex max-w-6xl gap-10 px-4 sm:px-6 lg:px-8">
        {/* Sticky side label on desktop */}
        <div className="hidden lg:flex lg:w-32 lg:flex-col lg:pt-4">
          <div className="sticky top-32">
            <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.25em] text-electricBlue">
              Process
            </p>

            {/* Scroll progress bar */}
            <div className="mt-4 h-24 w-[2px] overflow-hidden rounded-full bg-borderSoft">
              <div
                className="w-full rounded-full bg-electricBlue transition-[height] duration-150 ease-out"
                style={{ height: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full lg:flex-1">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.25em] text-electricBlue">
              The Essential Guide | Video Production
            </p>

            <h2 className="mt-3 text-2xl font-heading font-bold tracking-tight sm:text-3xl lg:text-4xl">
              The video production process, from idea to launch.
            </h2>

            <p className="mt-4 text-sm text-textMuted">
              Video production is one of the most collaborative creative systems
              you can run. Every project blends story, cinematography, planning,
              and post production into one vision. Most people only see the
              final cut. The real work happens inside the process. If even one
              stage is rushed or skipped, the final piece feels off. This is how
              a professional production flows from concept to delivery so brands
              and athletes know exactly what they are investing in.
            </p>
          </motion.div>

          {/* Stages */}
          <div className="mt-12 space-y-12 border-t border-borderSoft pt-10">
            {/* 01 Development */}
            <motion.article
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <h3 className="text-sm font-heading font-semibold uppercase tracking-[0.2em] text-textMuted">
                01 Development
              </h3>
              <p className="mt-3 text-sm text-textMuted">
                Development is where the idea first takes shape. This phase is
                about defining the story, the purpose of the video, the
                emotional tone, and the overall creative direction. Loose ideas
                turn into a clear concept that makes sense for the brand and the
                audience. Instead of getting lost in gear talk or logistics,
                development stays focused on vision and on what you want people
                to feel when they watch. Once that core concept feels strong
                enough to stand on its own, the project is ready to move into
                planning.
              </p>
            </motion.article>

            {/* 02 Pre production */}
            <motion.article
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.04 }}
              className="max-w-3xl"
            >
              <h3 className="text-sm font-heading font-semibold uppercase tracking-[0.2em] text-textMuted">
                02 Pre production
              </h3>
              <p className="mt-3 text-sm text-textMuted">
                Pre production is the foundation of a smooth shoot. This phase
                turns the creative idea into an organized plan. Scripts or
                outlines are written, visual direction is refined, locations are
                chosen, schedules are built, and talent or athletes are
                confirmed. Gear is locked in, logistics are mapped, and everyone
                knows what needs to happen on the day. When pre production is
                done well, the shoot feels calm, efficient, and intentional
                instead of rushed or improvised.
              </p>
            </motion.article>

            {/* 03 Production */}
            <motion.article
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
              className="max-w-3xl"
            >
              <h3 className="text-sm font-heading font-semibold uppercase tracking-[0.2em] text-textMuted">
                03 Production
              </h3>
              <p className="mt-3 text-sm text-textMuted">
                Production is where the plan becomes real footage. The crew
                executes the vision that was mapped out during development and
                pre production. Instead of one person trying to juggle every
                role, a structured production uses specialists so each part of
                the shoot is handled right. The director focuses on story and
                performance, camera operators handle framing and motion, audio
                is recorded clean, and lighting is shaped to fit the look. For
                brands and athletes, this is where hero shots, action sequences,
                lifestyle moments, product details, and interviews are captured
                at a level that will hold up in the edit.
              </p>
            </motion.article>

            {/* 04 Post production */}
            <motion.article
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
              className="max-w-3xl"
            >
              <h3 className="text-sm font-heading font-semibold uppercase tracking-[0.2em] text-textMuted">
                04 Post production
              </h3>
              <p className="mt-3 text-sm text-textMuted">
                Post production is where everything comes to life. This phase
                brings all the footage, audio, and story pieces together in the
                timeline. The edit shapes the pacing and structure, sound design
                gives impact, music and timing lock in the emotion, and color
                correction and grading give the final look. Titles and graphics
                are added where needed, and revisions dial things in so the
                piece feels clean and deliberate. A strong post production
                process can turn even simple moments into something cinematic and
                memorable.
              </p>
            </motion.article>

            {/* 05 Delivery */}
            <motion.article
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
              className="max-w-3xl border-t border-borderSoft pt-10"
            >
              <h3 className="text-sm font-heading font-semibold uppercase tracking-[0.2em] text-textMuted">
                05 Delivery and distribution
              </h3>
              <p className="mt-3 text-sm text-textMuted">
                Once the final cut is approved, the project moves into delivery.
                The video is exported in the correct formats for each platform
                so it performs well wherever it lives. That can mean a full
                YouTube version, vertical cuts for Reels and TikTok, a clean
                website version, ad edits, and short teasers. Thumbnails and
                titles are considered, and files are organized so the brand can
                find and use everything without digging through clutter. The
                goal is simple. Make it easy to hit publish and keep using the
                content across your ecosystem.
              </p>
            </motion.article>

            {/* How it shifts */}
            <motion.article
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
              className="max-w-3xl"
            >
              <h3 className="text-sm font-heading font-semibold uppercase tracking-[0.2em] text-textMuted">
                How it shifts by video type
              </h3>
              <p className="mt-3 text-sm text-textMuted">
                Different projects lean on different parts of the workflow.
                Brand videos rely on clear storytelling, emotion, and cinematic
                pacing. Athlete and action sports pieces focus on timing, speed,
                and the feeling of being there. Product launches lean into clean
                hero shots and clarity. Social content needs a faster rhythm and
                consistent formatting that works in feeds. Documentary style
                work blends structured interviews with real life moments and a
                more relaxed, authentic tone. The same core stages are always
                there, but the priorities adjust based on the goal of the video.
              </p>
            </motion.article>

            {/* Professional productions */}
            <motion.article
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="max-w-3xl border-t border-borderSoft pt-10"
            >
              <h3 className="text-sm font-heading font-semibold uppercase tracking-[0.2em] text-textMuted">
                Professional Video Productions stands alone
              </h3>
              <p className="mt-3 text-sm text-textMuted">
                The real difference between hiring a freelancer and partnering
                with a production company is structure. A production team runs
                on specialists, systems, and a tested process. Each stage is
                handled by someone who lives in that part of the workflow every
                day instead of one person guessing their way through several
                jobs at once. That is why the experience feels smoother, the
                visuals look cleaner, and the final piece lands harder with the
                people you are trying to reach.
              </p>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}

/* CONTACT FORM */

function ContactSection() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const name =
      (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const email =
      (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const project =
      (form.elements.namedItem("project") as HTMLTextAreaElement)?.value || "";

    const subject = "New project inquiry for GTS Media House";

    const body = `
I want to talk about a project.

Name: ${name}
Email: ${email}

Project details:
${project}
    `;

    const mailtoLink = `mailto:info@gtsmediahouse.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
    form.reset();
  }; // <-- THIS was missing

  return (
    <section
      id="contact"
      className="relative left-1/2 w-screen -translate-x-1/2 bg-electricBlue py-16 text-brandBlack"
    >
      {/* subtle spotlight glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.18),_transparent_70%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:px-8">
        {/* LEFT: text */}
        <div className="max-w-xl">
          <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.25em] text-black/60">
            Connect
          </p>

          <h2 className="mt-2 text-3xl font-heading font-bold tracking-tight sm:text-4xl">
            Want to create something cinematic? Just say hello.
          </h2>
        </div>

        {/* RIGHT: form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-4 rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur"
        >
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-black/70">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/40"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-black/70">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/40"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-black/70">
              Project details
            </label>
            <textarea
              name="project"
              required
              rows={5}
              className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/40"
              placeholder="What’s the project?"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-brandBlack px-7 py-2.5 text-sm font-semibold text-brandWhite transition hover:bg-black"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}


/* FOUNDER */

function FounderSection() {
  return (
    <section
      id="founder"
      className="relative left-1/2 w-screen -translate-x-1/2 bg-electricBlue text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.22),_transparent_65%)]" />

      <div className="relative mx-auto flex max-w-7xl min-h-screen flex-col items-center gap-10 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:gap-20 lg:px-8 lg:py-24">
        {/* LEFT: text */}
        <motion.div
          className="flex-1 flex items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="max-w-xl">
            <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.25em] text-white/70">
              Founder
            </p>

            <h2 className="mt-3 text-balance text-3xl font-heading font-bold tracking-tight sm:text-4xl lg:text-[2.8rem]">
              The Story
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/85">
              <p>
                Get The Shot Media House started with a simple belief. Brands
                deserve visuals that feel powerful. GTS was founded by Josh
                Weiss, a creative and entrepreneur who always gravitated toward
                brand films that felt like they belonged on a big screen, not
                just in a feed.
              </p>

              <p>
                Josh began filming in 2011, shooting action sports, small
                businesses, and local creators. Those early projects became
                stepping stones to working with top level brands and world class
                athletes. Along the way, he learned that high level work is not
                built by one person trying to do everything alone. The best
                films come from the right people in the right roles.
              </p>

              <p>
                GTS Media House exists for brands that want that standard. A
                studio built around structure, specialists, and intentional
                execution. For teams who want their visuals to match the
                ambition of their brand. Not just another video, but a
                production that truly represents who they are.
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: empty space for balance */}
        <div className="flex-1 hidden lg:block" />
      </div>
    </section>
  );
}

/* FOOTER */

function Footer() {
  return (
    <footer className="mt-16 border-t border-borderSoft pt-6 text-xs text-textMuted">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} GTS Media House. All rights reserved.</p>
        <p>Cinematic production for brands.</p>
      </div>
    </footer>
  );
}

/* CUSTOM CURSOR */

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleEnter = () => setVisible(true);
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseenter", handleEnter);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseenter", handleEnter);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[999] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-electricBlue bg-[#00b8ff14] backdrop-blur-sm sm:block"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        transition: "transform 40ms linear, opacity 180ms ease-out",
      }}
    />
  );
}
