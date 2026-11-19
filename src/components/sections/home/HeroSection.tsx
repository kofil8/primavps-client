"use client";

import { useState } from "react";
import { useCurrency } from "@/lib/currency";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { BkashLogo, NagadLogo, VisaLogo, UsdtLogo } from "@/components/ui/PaymentLogos";

const MICRO_TRUST = [
  { icon: ShieldCheck, color: "text-emerald-600", label: "0/100 IPQS Score" },
  { icon: RefreshCw, color: "text-blue-600",    label: "7-Day Free IP Swap" },
  { icon: Zap,       color: "text-amber-500",   label: "৬০–৯০ সেকেন্ড ডেলিভারি" },
];

const ISP_BULLETS = [
  "IPQS Fraud Score: 0/100 গ্যারান্টি",
  "৭ দিনের ফ্রি IP রিপ্লেসমেন্ট",
  "AT&T / Comcast ডেডিকেটেড স্ট্যাটিক আইপি",
  "ঢাকা সাপোর্ট, গড় রেসপন্স ৩ মিনিট",
];

export function HeroSection() {
  const { formatPrice } = useCurrency();
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText("LAUNCH10");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Gradient wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_70%_-10%,rgba(37,99,235,0.07),transparent_60%)]"
      />
      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.022] [background-image:linear-gradient(to_right,#64748b_1px,transparent_1px),linear-gradient(to_bottom,#64748b_1px,transparent_1px)] [background-size:40px_40px]"
      />

      {/* Top promo bar */}
      <div className="relative z-20 border-b border-slate-100 bg-slate-50/80 px-4 py-2 backdrop-blur-sm">
        <div className="shell flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <button
              onClick={copyCode}
              className="inline-flex items-center gap-1.5 font-bold text-blue-700 hover:text-blue-800 transition-colors"
            >
              <Zap size={13} className="text-amber-500" />
              কোড{" "}
              <span className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-[11px] text-blue-800">
                LAUNCH10
              </span>{" "}
              {copied ? "✓ কপি হয়েছে!" : "— ১০% ছাড়"}
            </button>
            <span className="hidden sm:inline-block h-3 w-px bg-slate-300" />
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
              🇧🇩 বনানী অফিস · ২৪/৭ লাইভ সাপোর্ট
            </span>
          </div>
          <Link
            href="https://wa.me/8801960677463?text=হ্যালো,%20আমি%20Residential%20RDP%20কেনার%20আগে%20কিছু%20তথ্য%20জানতে%20চাচ্ছি"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <MessageCircle size={13} className="text-emerald-600" />
            WhatsApp-এ কথা বলুন
          </Link>
        </div>
      </div>

      {/* Main hero */}
      <div className="shell relative z-10 grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        {/* Left: Copy */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            Residential ISP VPS · AT&amp;T / Comcast
          </div>

          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            ব্যান হওয়ার ভয় ছাড়াই{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              সার্ভে ও রিমোট কাজ
            </span>{" "}
            করুন।
          </h1>

          <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
            আমেরিকার রিয়েল হোম ব্রডব্যান্ড (AT&amp;T / Comcast) রেসিডেন্সিয়াল
            RDP — বিকাশ বা নগদে পেমেন্ট, ৬০–৯০ সেকেন্ডে অটো-ডেলিভারি।
          </p>

          {/* ISP bullet points */}
          <ul className="mt-6 space-y-2">
            {ISP_BULLETS.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-sm text-slate-700">
                <Check size={16} className="shrink-0 text-emerald-600" />
                {b}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/survey-vps"
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:-translate-y-0.5"
            >
              ISP Plans দেখুন — {formatPrice(2999)}/মাস
              <ArrowRight size={16} />
            </Link>
            <Link
              href="https://wa.me/8801960677463?text=হ্যালো,%20আমি%20Residential%20RDP%20/%20KVM%20VPS%20কেনার%20আগে%20কিছু%20তথ্য%20জানতে%20চাচ্ছি"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-3.5 text-sm font-bold text-emerald-800 transition-all hover:bg-emerald-100"
            >
              <MessageCircle size={16} className="text-emerald-600" />
              WhatsApp-এ কথা বলুন
            </Link>
          </div>

          {/* Micro trust */}
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
            {MICRO_TRUST.map(({ icon: Icon, color, label }) => (
              <span key={label} className={`flex items-center gap-1.5 text-xs font-semibold text-slate-600`}>
                <Icon size={14} className={`${color} shrink-0`} />
                {label}
              </span>
            ))}
          </div>

          {/* Payment logos */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              পেমেন্ট:
            </span>
            <BkashLogo className="h-7 w-auto" />
            <NagadLogo className="h-7 w-auto" />
            <VisaLogo className="h-6 w-auto" />
            <UsdtLogo className="h-7 w-auto" />
          </div>
        </motion.div>

        {/* Right: IP Quality proof card */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
        >
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            {/* Card header */}
            <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Live IP Quality Report
                  </p>
                  <p className="mt-0.5 font-mono text-sm font-bold text-slate-900">
                    108.204.142.88
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Clean · AT&amp;T US
                </span>
              </div>
            </div>

            {/* Metrics */}
            <div className="divide-y divide-slate-100 px-6">
              {[
                { label: "IPQS Fraud Score", value: "0 / 100", good: true },
                { label: "ISP / ASN", value: "AT&T Services · AS7018", good: true },
                { label: "IP Type", value: "Residential · Static", good: true },
                { label: "WebRTC Leak", value: "Zero Leak ✓", good: true },
                { label: "DNS Leak", value: "Zero Leak ✓", good: true },
                { label: "Dhaka → Dallas Ping", value: "~178 ms avg", good: true },
              ].map(({ label, value, good }) => (
                <div key={label} className="flex items-center justify-between py-3">
                  <span className="text-xs text-slate-500">{label}</span>
                  <span className={`text-xs font-bold ${good ? "text-emerald-700" : "text-red-600"}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Card footer CTA */}
            <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
              <Link
                href="/survey-vps"
                className="group flex items-center justify-between rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700"
              >
                <span>ISP Plans দেখুন — {formatPrice(2999)}/মাস</span>
                <ChevronRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <p className="mt-2.5 text-center text-[11px] text-slate-400">
                আপনার IP স্ক্যান করুন →{" "}
                <Link href="/tools/ip-checker" className="font-semibold text-blue-600 hover:underline">
                  Full Fraud Scanner
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
