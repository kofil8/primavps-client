import React from "react";

export function BkashLogo({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-bold tracking-tight text-[#E2136E]">
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        {/* bKash origami bird geometry */}
        <path
          d="M17.5 3L6 14.5L14 16.5L17.5 3Z"
          fill="#D81B60"
        />
        <path
          d="M17.5 3L14 16.5L25 12L17.5 3Z"
          fill="#E2136E"
        />
        <path
          d="M25 12L14 16.5L19 28.5L25 12Z"
          fill="#C2185B"
        />
        <path
          d="M14 16.5L6 14.5L11 25.5L14 16.5Z"
          fill="#AD1457"
        />
        <path
          d="M14 16.5L11 25.5L19 28.5L14 16.5Z"
          fill="#E2136E"
        />
      </svg>
      <span className="text-[13px] font-extrabold tracking-tight">bKash</span>
    </span>
  );
}

export function NagadLogo({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-bold tracking-tight text-[#EA5421]">
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        {/* Nagad ribbon swirl geometry */}
        <circle cx="16" cy="16" r="14" fill="#FFF3E0" />
        <path
          d="M8 18C8 12 13 8 18 8C21.5 8 24 10 24 13C24 16.5 20.5 19 17 19H12"
          stroke="#EA5421"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 14C24 20 19 24 14 24C10.5 24 8 22 8 19C8 15.5 11.5 13 15 13H20"
          stroke="#D83E0E"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[13px] font-extrabold tracking-tight">নগদ <span className="text-[11px] font-bold opacity-80">(Nagad)</span></span>
    </span>
  );
}

export function VisaLogo({ className = "h-3.5 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Visa"
    >
      <path
        d="M19.5 1.5L15 14.5H11.5L8.5 4.2C8.3 3.4 8.1 3.1 7.4 2.8C6.3 2.2 4.5 1.7 3 1.4L3.1 1.0H9.5C10.3 1.0 11 1.6 11.2 2.5L12.8 10.6L16.2 1.5H19.5ZM24.5 9.8C24.5 6.1 19.3 5.9 19.3 4.2C19.3 3.6 19.9 3.0 21.1 2.8C21.7 2.7 23.3 2.6 25 3.4L25.6 1.0C24.8 0.7 23.7 0.4 22.3 0.4C16.9 0.4 15.8 3.3 15.8 5.7C15.8 9.5 21 9.8 21 11.7C21 12.3 20.4 12.9 19.1 12.9C17.7 12.9 16 12.2 15.2 11.7L14.6 14.2C15.6 14.7 17.5 15.1 19.4 15.1C25.1 15.1 24.5 12.1 24.5 9.8ZM33.5 1.5H30.5C29.8 1.5 29.2 1.9 29 2.5L24.5 14.5H28L28.7 12.5H33.2L33.6 14.5H36.7L33.5 1.5ZM29.6 10.1L31.3 5.3L32.3 10.1H29.6ZM40 1.5H37L34 14.5H37L40 1.5Z"
        fill="#1A1F71"
      />
    </svg>
  );
}

export function MastercardLogo({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Mastercard"
    >
      <circle cx="12" cy="12" r="10" fill="#EB001B" />
      <circle cx="24" cy="12" r="10" fill="#F79E1B" fillOpacity="0.88" />
      <path
        d="M18 5.8a9.98 9.98 0 0 0-4 6.2 9.98 9.98 0 0 0 4 6.2 9.98 9.98 0 0 0 4-6.2 9.98 9.98 0 0 0-4-6.2z"
        fill="#FF5F00"
      />
    </svg>
  );
}

export function UsdtLogo({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <span className="inline-flex items-center gap-1 font-semibold text-[#26A17B]">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93v2.07h-2v-2.07c-3.14-.17-5.5-1.07-5.5-2.18s2.36-2.01 5.5-2.18V10.3c-2.48-.15-4.28-.75-4.28-1.48 0-.74 1.8-1.34 4.28-1.49V5h2v2.33c2.48.15 4.28.75 4.28 1.49 0 .73-1.8 1.33-4.28 1.48v2.27c3.14.17 5.5 1.07 5.5 2.18s-2.36 2.01-5.5 2.18z" />
      </svg>
      <span className="text-[12px] font-bold text-slate-800">USDT</span>
    </span>
  );
}
