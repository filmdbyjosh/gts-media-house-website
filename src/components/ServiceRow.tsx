import LineButton from "@/components/LineButton";

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
    <article className="list-row">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-5 px-5 md:px-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div className="lg:max-w-[65%]">
          <h2 className="mb-4 font-display text-2xl font-bold uppercase tracking-tight text-brandWhite md:text-3xl">
            {title}
          </h2>
          <p className="font-body text-base leading-relaxed text-textMuted">
            {description}
          </p>
        </div>
        <div className="shrink-0 pt-1">
          {href ? (
            <LineButton href={href}>{actionLabel}</LineButton>
          ) : (
            <LineButton onClick={onAction}>{actionLabel}</LineButton>
          )}
        </div>
      </div>
    </article>
  );
}
