type IconProps = {
  className?: string;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className ?? "h-5 w-5"}
      {...stroke}
    >
      {children}
    </svg>
  );
}

export function StrategyIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 4v2.5M12 17.5V20M4 12h2.5M17.5 12H20" />
    </Svg>
  );
}

export function ScriptIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M7 3.5h7.5L19 8v12.5H7z" />
      <path d="M14.5 3.5V8H19" />
      <path d="M10 12h6M10 15.5h4" />
    </Svg>
  );
}

export function ProductionIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3.5 8.5h11.5v9H3.5z" />
      <path d="M15 11.5 20.5 9v8L15 14.5" />
    </Svg>
  );
}

export function PostIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 15.5c1.2-4 2.2-4 3.2 0s2 4 3.2 0 2-4 3.2 0 2 4 3.2 0 2.2-4 3.2 0" />
      <path d="M4 8.5h16" />
    </Svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="16.5" cy="7.5" r="0.8" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="6.5" width="18" height="11" rx="2.5" />
      <path d="M11 10.2v3.6l3.2-1.8z" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M10 16.8a2.6 2.6 0 1 1-2.2-2.55V7.2h5.4a3.6 3.6 0 0 0 3.3 3.2v2.15A5.7 5.7 0 0 1 13.2 11v5.8" />
    </Svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className ?? "h-5 w-5"}>
      <path
        fill="currentColor"
        d="M14.2 8.4H17V5.5h-2.8c-2.1 0-3.5 1.4-3.5 3.6v1.7H8.2V14h2.5v6.2h2.9V14h2.4l.5-3.2h-2.9V9.3c0-.6.3-.9 1.1-.9z"
      />
    </svg>
  );
}
