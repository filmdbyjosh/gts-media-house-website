"use client";

import LineButton from "@/components/LineButton";
import { AnimReveal, AnimText, AnimTitle } from "@/components/AnimFadeBox";

type ServiceRowProps = {
  title: string;
  description: string;
  href?: string;
  onAction?: () => void;
  actionLabel?: string;
};

export default function ServiceRow({
  title,
  description,
  href,
  onAction,
  actionLabel = "View service",
}: ServiceRowProps) {
  return (
    <AnimReveal>
      <article className="list-row">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-5 px-5 md:px-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="lg:max-w-[65%]">
            <AnimTitle
              as="h2"
              className="mb-4 font-display text-2xl font-bold uppercase tracking-tight text-brandWhite md:text-3xl"
            >
              {title}
            </AnimTitle>
            <AnimText delay={0.25}>
              <p className="font-body text-base leading-relaxed text-textMuted">
                {description}
              </p>
            </AnimText>
          </div>
          <AnimText className="shrink-0 pt-1" delay={0.45}>
            {href ? (
              <LineButton href={href}>{actionLabel}</LineButton>
            ) : (
              <LineButton onClick={onAction}>{actionLabel}</LineButton>
            )}
          </AnimText>
        </div>
      </article>
    </AnimReveal>
  );
}
