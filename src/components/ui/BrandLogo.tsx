import { useId } from "react";

export type BrandLogoTheme = "light" | "dark" | "mono";
export type BrandLogoSize = "sm" | "md" | "lg";

interface BrandLogoMarkProps {
  size?: BrandLogoSize;
  theme?: BrandLogoTheme;
  className?: string;
}

interface BrandLogoProps {
  variant?: "full" | "mark";
  theme?: BrandLogoTheme;
  size?: BrandLogoSize;
  className?: string;
}

const MARK_SIZES: Record<BrandLogoSize, string> = {
  sm: "size-7",
  md: "size-8",
  lg: "size-10",
};

const TEXT_SIZES: Record<BrandLogoSize, string> = {
  sm: "text-base",
  md: "text-base sm:text-lg",
  lg: "text-xl sm:text-2xl",
};

export function BrandLogoMark({
  size = "md",
  theme = "light",
  className = "",
}: BrandLogoMarkProps) {
  const uid = useId().replace(/:/g, "");
  const gradId = `primavps-grad-${uid}`;
  const isMono = theme === "mono";

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`${MARK_SIZES[size]} shrink-0 ${
        theme === "dark" ? "rounded-lg ring-1 ring-white/12" : ""
      } ${className}`}
    >
      {!isMono && (
        <defs>
          <linearGradient
            id={gradId}
            x1="0"
            y1="0"
            x2="32"
            y2="32"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="55%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#3730A3" />
          </linearGradient>
        </defs>
      )}

      {/* Rounded-square squircle container (rx=8 matches Tailwind rounded-lg at 32px) */}
      <rect
        width="32"
        height="32"
        rx="8"
        fill={isMono ? "currentColor" : `url(#${gradId})`}
      />

      {/* Architectural Beveled 'P' (CW outer, CCW counter for universal fill-rule safety) */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 5.5H17.5A7.75 7.75 0 0 1 17.5 21H12V25.25A1.25 1.25 0 0 1 10.75 26.5H10A1.25 1.25 0 0 1 8.75 25.25V8.75L12 5.5ZM12 8.75V17.75H17.5A4.5 4.5 0 0 0 17.5 8.75H12Z"
        fill="#FFFFFF"
      />

      {/* Concentric Dedicated Static-IP Core Node */}
      <circle
        cx="17.5"
        cy="13.25"
        r="2.25"
        fill={isMono ? "#FFFFFF" : "#67E8F9"}
        fillOpacity={isMono ? 0.72 : 1}
      />
    </svg>
  );
}

export function BrandLogo({
  variant = "full",
  theme = "light",
  size = "md",
  className = "",
}: BrandLogoProps) {
  const primaColor =
    theme === "dark"
      ? "text-white"
      : theme === "mono"
        ? "text-current"
        : "text-slate-900";

  const vpsColor =
    theme === "dark"
      ? "text-blue-400"
      : theme === "mono"
        ? "text-current opacity-70"
        : "text-blue-600";

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2 select-none sm:gap-2.5 ${className}`}
    >
      <BrandLogoMark
        size={size}
        theme={theme}
        className="shadow-xs transition-transform duration-200 group-hover:scale-105"
      />
      {variant === "full" && (
        <span
          className={`font-display ${TEXT_SIZES[size]} leading-none font-extrabold tracking-[-0.025em]`}
        >
          <span className={primaColor}>prima</span>
          <span className={vpsColor}>vps</span>
        </span>
      )}
    </span>
  );
}
