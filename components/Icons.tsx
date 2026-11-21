type P = { size?: number; className?: string };

const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const IconSearch = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const IconMenu = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);

export const IconClose = ({ size, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconArrow = ({ size = 16, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconLink = ({ size = 18, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </svg>
);

export const IconClock = ({ size = 14, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const IconEye = ({ size = 14, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconPlay = ({ size = 14, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M7 5v14l12-7z" fill="currentColor" />
  </svg>
);

// Ikon merek disederhanakan (bentuk huruf), bukan logo resmi.
export const IconWA = ({ size = 18 }: P) => (
  <svg {...base(size)}>
    <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.1z" />
    <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.3-1.8-.9-.8.8a4 4 0 0 1-2-2l.8-.8-.9-1.8z" strokeWidth={1.4} />
  </svg>
);

export const IconX = ({ size = 16 }: P) => (
  <svg {...base(size)}>
    <path d="M4 4l16 16M20 4 4 20" />
  </svg>
);

export const IconFB = ({ size = 18 }: P) => (
  <svg {...base(size)}>
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />
  </svg>
);
