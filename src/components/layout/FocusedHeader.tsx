"use client";

import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

interface FocusedHeaderProps {
  step?: 1 | 2 | 3;
  showSteps?: boolean;
  backHref?: string;
  backLabel?: string;
}

const CHECKOUT_STEPS = [
  { num: 1, label: "কনফিগারেশন" },
  { num: 2, label: "পেমেন্ট" },
  { num: 3, label: "RDP অ্যাক্টিভেশন" },
] as const;

export function FocusedHeader({
  step = 2,
  showSteps = false,
  backHref = "/isp-vps",
  backLabel = "প্ল্যানে ফিরে যান",
}: FocusedHeaderProps) {
  const whatsappNumber = (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801700000000"
  ).replace(/[^0-9]/g, "");

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
      <div className="shell flex h-15 items-center justify-between gap-4">
        {/* Left: Brand + Optional Back Link */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="font-display text-xl font-black tracking-tight text-slate-900"
          >
            prima<span className="text-blue-600">vps</span>
          </Link>

          <span className="hidden h-4 w-px bg-slate-200 sm:inline-block" />

          <Link
            href={backHref}
            className="hidden items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900 sm:inline-flex"
          >
            <ArrowLeft size={13} />
            <span>{backLabel}</span>
          </Link>
        </div>

        {/* Center: Checkout Progress Stepper */}
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

        {/* Right: Security Badge + WhatsApp Help */}
        <div className="flex items-center gap-2.5">
          <span className="hidden items-center gap-1 text-[11px] font-semibold text-emerald-700 lg:inline-flex">
            <ShieldCheck size={14} />
            <span>256-bit SSL</span>
          </span>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              "Hello primavps, I need help with my account or checkout.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
          >
            <FaWhatsapp size={14} className="text-emerald-600" />
            <span>সাপোর্ট</span>
          </a>
        </div>
      </div>
    </header>
  );
}