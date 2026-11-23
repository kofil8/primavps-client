"use client";

import { useCurrency } from "@/lib/currency";
import { HotDeal } from "@/lib/data/deals";
import { ArrowRight, Check, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CouponCardProps {
  deal: HotDeal;
}

const ACCENT_STYLES: Record<
  HotDeal["accent"],
  { topBar: string; badge: string; codeBox: string }
> = {
  blue: {
    topBar: "bg-blue-600",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    codeBox:
      "border-blue-200 bg-blue-50/50 text-blue-700 hover:bg-blue-50 hover:border-blue-300",
  },
  amber: {
    topBar: "bg-amber-500",
    badge: "bg-amber-50 text-amber-800 border-amber-200",
    codeBox:
      "border-amber-200 bg-amber-50/60 text-amber-800 hover:bg-amber-50 hover:border-amber-300",
  },
  emerald: {
    topBar: "bg-emerald-600",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    codeBox:
      "border-emerald-200 bg-emerald-50/50 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300",
  },
};

export function CouponCard({ deal }: CouponCardProps) {
  const { formatPrice } = useCurrency();
  const [copied, setCopied] = useState(false);
  const styles = ACCENT_STYLES[deal.accent];

  const copyCoupon = async () => {
    try {
      await navigator.clipboard.writeText(deal.couponCode);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = deal.couponCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <article
      id={`deal-${deal.id}`}
      className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white transition-all duration-200 ${
        deal.featured
          ? "ring-2 ring-blue-600 shadow-xl shadow-blue-600/10"
          : "border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md"
      }`}
    >
      {/* Slim Top Accent Strip */}
      <div className={`h-1.5 w-full ${styles.topBar}`} aria-hidden="true" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Category + Badge */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {deal.category}
          </span>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${
              deal.featured
                ? "border-blue-600 bg-blue-600 text-white"
                : styles.badge
            }`}
          >
            {deal.badge || `${deal.discountPercent}% OFF`}
          </span>
        </div>

        {/* Plan Title */}
        <h3 className="mt-2 font-display text-lg font-extrabold text-slate-900">
          {deal.title}
        </h3>

        {/* Price Block — Fits cleanly on 14" laptops */}
        <div className="mt-3 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span className="font-display text-2xl font-black tracking-tight text-slate-900 xl:text-[28px]">
            {formatPrice(deal.discountedPriceBdt)}
          </span>
          <span className="text-xs font-medium text-slate-400 line-through">
            {formatPrice(deal.originalPriceBdt)}
          </span>
          <span className="text-[11px] font-medium text-slate-500">
            /প্রথম মাস
          </span>
        </div>

        <p className="mt-1 text-[11px] font-semibold text-emerald-700">
          সাশ্রয় {formatPrice(deal.savingsBdt)} ({deal.discountPercent}% ছাড়)
        </p>

        <p className="mt-3 text-xs leading-relaxed text-slate-600">
          {deal.subtitle}
        </p>

        {/* Specs 2x2 Grid */}
        <dl className="mt-4 grid grid-cols-2 gap-2.5 border-y border-slate-100 py-3.5 text-xs">
          {deal.specs.map((spec) => (
            <div key={spec.label}>
              <dt className="text-[10.5px] font-medium text-slate-400">
                {spec.label}
              </dt>
              <dd className="mt-0.5 font-semibold text-slate-800">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Interactive Coupon Copy + Direct Checkout CTA */}
        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={copyCoupon}
            aria-label={`Copy coupon code ${deal.couponCode}`}
            className={`flex w-full cursor-pointer items-center justify-between rounded-xl border border-dashed px-3.5 py-2.5 transition-all active:scale-[0.98] ${styles.codeBox}`}
          >
            <span className="font-mono text-sm font-extrabold tracking-wider">
              {deal.couponCode}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold">
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-600" />
                  <span className="text-emerald-600">কপি হয়েছে</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>কপি করুন</span>
                </>
              )}
            </span>
          </button>

          <Link
            href={deal.targetUrl}
            className={`mt-2.5 inline-flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all active:scale-[0.99] ${
              deal.featured
                ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            <span>অফারসহ অর্ডার করুন</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>

          <p className="mt-2 text-center text-[11px] text-slate-400">
            রিনিউ রেট: {formatPrice(deal.originalPriceBdt)}/মাস
          </p>
        </div>
      </div>
    </article>
  );
}
