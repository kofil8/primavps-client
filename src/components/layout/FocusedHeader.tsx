"use client";

import { BrandLogo } from "@/components/ui/BrandLogo";
import { COMPANY_INFO } from "@/lib/config/company";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

interface AuthHeaderAction {
  prompt?: string;
  label: string;
  href: string;
}

interface FocusedHeaderProps {
  step?: 1 | 2 | 3;
  showSteps?: boolean;
  backHref?: string;
  backLabel?: string;
  supportLabel?: string;
  authAction?: AuthHeaderAction;
}

const CHECKOUT_STEPS = [
  { num: 1, label: "কনফিগারেশন" },
  { num: 2, label: "পেমেন্ট" },
  { num: 3, label: "RDP অ্যাক্টিভেশন" },
] as const;

export function FocusedHeader({
  step = 2,
  showSteps = false,
  backHref = "/",
  backLabel = "Back to home",
  supportLabel,
  authAction,
}: FocusedHeaderProps) {
  const resolvedSupportLabel = supportLabel ?? (showSteps ? "সাপোর্ট" : "Support");

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
      <div className="shell flex h-15 items-center justify-between gap-3 md:h-16 md:gap-4">
        {/* Left: Official Brand Logo + Optional Back Link */}
        <div className="flex min-w-0 items-center gap-3.5">
          <Link
            href="/"
            aria-label="Primavps home"
            className="shrink-0 transition-opacity hover:opacity-90 focus-visible:outline-none"
          >
            <BrandLogo theme="light" size="md" />
          </Link>

          <span className="hidden h-4 w-px bg-slate-200 sm:inline-block" />

          <Link
            href={backHref}
            className="hidden items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900 sm:inline-flex"
          >
            <ArrowLeft size={13} aria-hidden="true" />
            <span>{backLabel}</span>
          </Link>
        </div>

        {/* Center: Checkout Progress Stepper (Checkout routes only) */}
        {showSteps && (
          <ol
            aria-label="Checkout progress"
            className="hidden items-center gap-2 md:flex"
          >
            {CHECKOUT_STEPS.map((item, idx) => {
              const isDone = item.num < step;
              const isCurrent = item.num === step;
              return (
                <li key={item.num} className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                      isCurrent
                        ? "bg-blue-600 text-white shadow-2xs"
                        : isDone
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <span className="font-mono text-[11px]">
                      {isDone ? "✓" : item.num}
                    </span>
                    <span>{item.label}</span>
                  </span>
                  {idx < CHECKOUT_STEPS.length - 1 && (
                    <span className="h-px w-5 bg-slate-200" />
                  )}
                </li>
              );
            })}
          </ol>
        )}

        {/* Right: Auth Switcher (Login/Register) OR Checkout SSL + Support */}
        <div className="flex shrink-0 items-center gap-2.5">
          {authAction ? (
            <>
              {authAction.prompt && (
                <span className="hidden text-xs text-slate-500 md:inline">
                  {authAction.prompt}
                </span>
              )}
              <Link
                href={authAction.href}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 shadow-2xs transition-colors hover:border-slate-300 hover:bg-slate-50 sm:text-sm"
              >
                {authAction.label}
              </Link>
            </>
          ) : (
            <span className="hidden items-center gap-1 text-[11px] font-semibold text-emerald-700 lg:inline-flex">
              <ShieldCheck size={14} aria-hidden="true" />
              <span>256-bit SSL</span>
            </span>
          )}

          <a
            href={COMPANY_INFO.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Support"
            className={`inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 ${
              authAction ? "hidden sm:inline-flex" : "inline-flex"
            }`}
          >
            <FaWhatsapp size={14} className="text-emerald-600" aria-hidden="true" />
            <span>{resolvedSupportLabel}</span>
          </a>
        </div>
      </div>
    </header>
  );
}