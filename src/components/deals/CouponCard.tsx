"use client";

import { useCurrency } from "@/lib/currency";
import { HotDeal } from "@/lib/data/deals";
import { ArrowRight, Check, Copy, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CouponCardProps {
  deal: HotDeal;
}

export function CouponCard({ deal }: CouponCardProps) {
  const { formatPrice } = useCurrency();
  const [copied, setCopied] = useState(false);

  const copyCoupon = async () => {
    try {
      await navigator.clipboard.writeText(deal.couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const headerColors = {
    blue: "bg-blue-600 text-white",
    amber: "bg-amber-400 text-slate-950 font-bold",
    cyan: "bg-cyan-500 text-slate-950 font-bold",
    emerald: "bg-emerald-500 text-slate-950 font-bold",
  }[deal.headerTheme];

  const buttonAccentColors = {
    blue: "hover:bg-blue-50 text-blue-600 border-blue-200",
    amber: "hover:bg-amber-50 text-amber-700 border-amber-200",
    cyan: "hover:bg-cyan-50 text-cyan-700 border-cyan-200",
    emerald: "hover:bg-emerald-50 text-emerald-700 border-emerald-200",
  }[deal.headerTheme];

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      {/* Top Banner (Reference style) */}
      <div className={`px-5 py-4 text-center ${headerColors}`}>
        <p className="text-sm font-extrabold uppercase tracking-wide sm:text-base">
          {deal.title}
        </p>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              {deal.category}
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-2xl font-black text-slate-900">
                {formatPrice(deal.discountedPriceBdt)}
              </span>
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(deal.originalPriceBdt)}
              </span>
              <span className="text-xs font-medium text-slate-500">/first mo</span>
            </div>
          </div>
          <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-700">
            Save {deal.discountPercent}%
          </span>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
          {deal.subtitle}
        </p>

        {/* Specs Pills */}
        <div className="mt-4 grid grid-cols-2 gap-2 border-y border-slate-100 py-3 text-xs">
          {deal.specs.map((spec) => (
            <div key={spec.label} className="flex flex-col">
              <span className="text-[11px] text-slate-400">{spec.label}</span>
              <span className="font-semibold text-slate-700">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Coupon Code Section */}
        <div className="mt-auto pt-5">
          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={copyCoupon}
              className={`relative flex w-full items-center justify-between rounded-xl border border-dashed px-4 py-2.5 font-mono text-sm font-bold tracking-wider transition-all active:scale-[0.98] ${buttonAccentColors}`}
            >
              <span className="flex items-center gap-2">
                <Sparkles size={14} />
                {deal.couponCode}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-600" />
                    <span className="font-semibold text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Get Coupon Code</span>
                  </>
                )}
              </span>
            </button>

            <Link
              href={deal.targetUrl}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-slate-800"
            >
              Claim Deal Now
              <ArrowRight size={14} />
            </Link>
          </div>

          <p className="mt-2.5 text-center text-[11px] text-slate-400">
            Apply code at checkout. Limited slots available.
          </p>
        </div>
      </div>
    </div>
  );
}
