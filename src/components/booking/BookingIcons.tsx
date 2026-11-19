type IconProps = { className?: string };

export function ShortFormIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 80" className={className} aria-hidden="true">
      <rect
        x="5"
        y="4"
        width="38"
        height="72"
        rx="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
      />
      <polygon points="18,30 18,50 36,40" fill="currentColor" />
    </svg>
  );
}

export function LongFormIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 80 48" className={className} aria-hidden="true">
      <rect
        x="4"
        y="8"
        width="72"
        height="32"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
      />
      <polygon points="32,18 32,30 46,24" fill="currentColor" />
    </svg>
  );
}

export function VibeHypeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d="M8 18h8M8 24h6M8 30h8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M28 6 16 26h10l-3 16 18-22H30z"
        fill="currentColor"
      />
    </svg>
  );
}

export function VibeCinematicIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="4" y="12" width="40" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <rect x="4" y="12" width="40" height="5" fill="currentColor" />
      <rect x="4" y="31" width="40" height="5" fill="currentColor" />
      <polygon points="20,20 20,28 28,24" fill="currentColor" />
    </svg>
  );
}

export function VibeVlogIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <path
        d="M10 38c2-8 8-12 14-12s12 4 14 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <rect x="30" y="10" width="10" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="35" cy="14" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function VibeEducationalIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="14" cy="14" r="4.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="14" cy="24" r="4.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="14" cy="34" r="4.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M22 14h14M22 24h14M22 34h8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <polygon points="32,30 32,38 40,34" fill="currentColor" />
    </svg>
  );
}

export function AddonCutsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="10" y="6" width="18" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <rect x="20" y="12" width="18" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <polygon points="26,22 26,32 34,27" fill="currentColor" />
    </svg>
  );
}

export function AddonThumbIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect x="8" y="12" width="32" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <circle cx="18" cy="22" r="3" fill="currentColor" />
      <path d="M12 32l8-8 6 6 4-4 6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  );
}

export function AddonRevisionIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d="M14 18a12 12 0 0 1 20-2M34 30a12 12 0 0 1-20 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path d="M32 8v10h10M16 40V30H6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
    </svg>
  );
}

export function AddonMusicIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M20 34V14l16-4v20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
      <circle cx="16" cy="34" r="5" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <circle cx="32" cy="30" r="5" fill="none" stroke="currentColor" strokeWidth="2.6" />
    </svg>
  );
}

export function AddonRushIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <path d="M24 16v9l6 4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export function BothIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 80 48" className={className} aria-hidden="true">
      <rect
        x="4"
        y="6"
        width="22"
        height="36"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <rect
        x="32"
        y="12"
        width="44"
        height="24"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}

export function VibePersonalIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="16" r="7" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <path
        d="M8 40c2.5-10 10-15 16-15s13.5 5 16 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function VibeCommercialIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect
        x="8"
        y="14"
        width="32"
        height="24"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
      />
      <path
        d="M16 14V12a8 8 0 0 1 16 0v2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M20 26h8M24 22v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}


export function PersonalVideoEditingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {/* camera */}
      <rect
        x="4"
        y="14"
        width="22"
        height="16"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
      />
      <path
        d="M26 20l8-4v12l-8-4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      {/* computer */}
      <rect
        x="22"
        y="28"
        width="20"
        height="12"
        rx="1.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path
        d="M28 40h8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PersonalVideoOnlyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect
        x="6"
        y="14"
        width="26"
        height="20"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
      />
      <path
        d="M32 20l10-5v18l-10-5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PersonalEditingOnlyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect
        x="8"
        y="10"
        width="32"
        height="22"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
      />
      <path
        d="M16 40h16M24 32v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function personalServiceIcon(id: string) {
  switch (id) {
    case "video-editing":
      return PersonalVideoEditingIcon;
    case "video-only":
      return PersonalVideoOnlyIcon;
    case "editing-only":
      return PersonalEditingOnlyIcon;
    default:
      return PersonalVideoEditingIcon;
  }
}

export function vibeIcon(id: string) {
  switch (id) {
    case "personal":
      return VibePersonalIcon;
    case "commercial":
      return VibeCommercialIcon;
    case "hype":
      return VibeHypeIcon;
    case "cinematic":
      return VibeCinematicIcon;
    case "vlog":
      return VibeVlogIcon;
    case "educational":
      return VibeEducationalIcon;
    default:
      return VibePersonalIcon;
  }
}

export function addonIcon(id: string) {
  switch (id) {
    case "thumbnail":
      return AddonThumbIcon;
    case "revision":
      return AddonRevisionIcon;
    case "licensed-music":
      return AddonMusicIcon;
    case "next-day":
      return AddonRushIcon;
    default:
      return AddonCutsIcon;
  }
}
