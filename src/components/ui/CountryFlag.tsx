"use client";

import React from "react";
import { DynamicFlag } from "@sankyu/react-circle-flags";

interface CountryFlagProps {
  code: string;
  size?: number;
  className?: string;
  title?: string;
}

export function CountryFlag({
  code,
  size = 20,
  className = "",
  title,
}: CountryFlagProps) {
  // Normalize country code (e.g. 'uk' -> 'gb', uppercase to lowercase)
  const normalizedCode = (code || "").trim().toLowerCase();
  const safeCode = normalizedCode === "uk" ? "gb" : normalizedCode;

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden shadow-xs ring-1 ring-black/5 dark:ring-white/10 ${className}`}
      style={{ width: size, height: size }}
      title={title || code.toUpperCase()}
    >
      <DynamicFlag
        code={safeCode}
        width={size}
        height={size}
        title={title || code.toUpperCase()}
      />
    </span>
  );
}
