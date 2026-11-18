"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { useCurrency } from "@/lib/currency";
import {
  ArrowRight,
  Check,
  Cpu,
  Gauge,
  Globe2,
  HardDrive,
  Monitor,
  Network,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import Link from "next/link";

/* ── Animated dark-mode Graphics ── */

function ResidentialIspGraphic() {
  return (
    <div className="relative h-52 w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/60 font-mono text-xs select-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:16px_16px]" />
      <div className="relative z-10 flex h-full flex-col p-4">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 flex items-center gap-1 font-sans text-[10px] font-medium text-slate-300">
            <Monitor size={11} className="text-blue-400" /> Windows 11 Pro · RDP
          </span>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-bold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
          </span>
        </div>
        {/* Fraud Score Hero */}
        <div className="flex-1 flex items-center">
          <div className="w-full rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                <ShieldCheck size={22} className="text-emerald-400" />
              </div>
              <div>
                <p className="font-sans text-[11px] font-bold text-white">IPQS Fraud Score: 0/100</p>
                <p className="font-sans text-[10px] text-slate-400">AT&T Fiber · Dallas, TX · AS7018</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-300">
              CLEAN
            </span>
          </div>
        </div>
        {/* Bottom pills */}
        <div className="mt-3 grid grid-cols-3 gap-1.5 font-sans text-[9px]">
          {["✓ Zero WebRTC", "✓ No DNS Leak", "✓ 178ms Dhaka"].map((t) => (
            <div key={t} className="flex items-center justify-center gap-1 rounded-lg bg-white/[0.04] border border-white/5 py-1.5 text-slate-300">
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CloudVpsGraphic() {
  return (
    <div className="relative h-52 w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 font-mono text-xs select-none">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:16px_16px]" />
      <div className="relative z-10 flex h-full flex-col p-4">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
          <span className="ml-2 flex items-center gap-1 text-[10px] font-medium text-slate-400">
            <Terminal size={11} className="text-indigo-400" /> root@ashburn-vps-01:~#
          </span>
        </div>
        {/* Telemetry rows */}
        <div className="flex-1 space-y-2">
          {[
            { icon: Cpu, label: "AMD EPYC 3.2GHz", value: "2 vCPU · Dedicated", color: "text-indigo-400" },
            { icon: Gauge, label: "DDR5 ECC RAM", value: "4 GB (expandable)", color: "text-blue-400" },
            { icon: HardDrive, label: "NVMe Gen4 RAID-1", value: "6,800 MB/s Read", color: "text-emerald-400" },
            { icon: Network, label: "10 Gbps Uplink", value: "Ashburn Tier-1", color: "text-amber-400" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="flex items-center justify-between text-[10px]">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Icon size={11} className={color} /> {label}
              </span>
              <span className="font-semibold text-white">{value}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1.5 font-sans text-[9px]">
          <div className="flex items-center gap-1 rounded-lg bg-white/[0.04] border border-white/5 py-1.5 px-2 text-slate-300">
            <Globe2 size={10} className="text-blue-400" /> 10 Gbps Unmetered
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-white/[0.04] border border-white/5 py-1.5 px-2 text-slate-300">
            <Zap size={10} className="text-emerald-400" /> 99.98% SLA
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */

export function DualOfferings() {
  const { formatPrice } = useCurrency();
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const annualDiscount = 0.10; // 10% off
  const ispMonthly = 2999;
  const cloudMonthly = 950;
  const ispPrice = billing === "annual" ? Math.round(ispMonthly * (1 - annualDiscount)) : ispMonthly;
  const cloudPrice = billing === "annual" ? Math.round(cloudMonthly * (1 - annualDiscount)) : cloudMonthly;

  return (
    <section className="section border-b border-slate-200 bg-slate-50/60 py-20 sm:py-24">
      <div className="shell">
        <Reveal className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow flex items-center gap-1.5">
              <Sparkles size={13} /> দুটি প্রোডাক্ট, একটি ড্যাশবোর্ড
            </p>
            <h2 className="section-title mt-2 text-2xl sm:text-4xl font-extrabold">
              আপনার কাজের ধরন অনুযায়ী
              <br className="hidden sm:block" /> সঠিক সার্ভার বেছে নিন
            </h2>
          </div>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-xs">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                billing === "monthly"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              মাসিক
            </button>
            <button
              type="button"
              onClick={() => setBilling("annual")}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                billing === "annual"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              বাৎসরিক
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  billing === "annual" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"
                }`}
              >
                ১০% ছাড়
              </span>
            </button>
          </div>
        </Reveal>

        <Reveal className="mt-10 grid gap-7 lg:grid-cols-2" delay={0.12}>
          {/* Card 1: Residential ISP VPS (Primary / Highlighted) */}
          <article className="group flex flex-col overflow-hidden rounded-2xl border-2 border-blue-500/60 bg-white shadow-xl shadow-blue-500/10 ring-4 ring-blue-500/5 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/15">
            {/* Ribbon */}
            <div className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 py-1.5 text-center text-xs font-bold text-white">
              <Sparkles size={12} className="text-amber-300" />
              বাংলাদেশি সার্ভেয়ার ও ফ্রিল্যান্সারদের #১ পছন্দ
            </div>

            <ResidentialIspGraphic />

            <div className="flex flex-1 flex-col p-7">
              <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Residential ISP VPS
              </h3>
              <p className="mt-1 text-sm font-medium text-blue-600">
                Real US Home Internet — AT&T · Comcast · Spectrum
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                ক্লিন আমেরিকান রেসিডেন্সিয়াল আইপি ও উইন্ডোজ রিমোট ডেস্কটপ।
                সার্ভে সাইট, ফ্রিল্যান্স মার্কেটপ্লেস বা ব্যাংক অ্যাকাউন্টে
                ১০০% নিরাপদ।
              </p>

              <ul className="mt-5 space-y-2.5">
                {[
                  "0/100 IPQS ক্লিন — ভেরিফায়েড ফ্রেশ IP",
                  "WebRTC · DNS · IPv6 লিক ফ্রি গ্যারান্টি",
                  "Windows 10/11 Pro GUI — যেকোনো ডিভাইস থেকে RDP",
                  "৭ দিনের ফ্রি IP রিপ্লেসমেন্ট SLA",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex items-end justify-between gap-4 border-t border-slate-100 pt-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {billing === "annual" ? "বাৎসরিক প্ল্যান (মাসে)" : "মাসিক প্ল্যান"} শুরু
                  </p>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-display text-3xl font-extrabold text-slate-900">
                      {formatPrice(ispPrice)}
                    </span>
                    <span className="text-sm text-slate-500">/মাস</span>
                  </div>
                  {billing === "annual" && (
                    <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                      বাৎসরিক: {formatPrice(ispPrice * 12)} (১০% সাশ্রয়!)
                    </p>
                  )}
                </div>
                <Link
                  href="/survey-vps"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/25 transition-all duration-200 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  ISP Plans দেখুন <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </article>

          {/* Card 2: Cloud NVMe VPS */}
          <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60">
            {/* Ribbon */}
            <div className="flex items-center justify-center gap-1.5 bg-slate-900 py-1.5 text-center text-xs font-semibold text-slate-300">
              <Cpu size={12} className="text-indigo-400" />
              ডেভেলপার, স্টার্টআপ ও হাই-ট্র্যাফিক অ্যাপের জন্য
            </div>

            <CloudVpsGraphic />

            <div className="flex flex-1 flex-col p-7">
              <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Cloud VPS
              </h3>
              <p className="mt-1 text-sm font-medium text-slate-500">
                High-Frequency NVMe Compute — Ashburn US-East Tier-1
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                AMD EPYC প্রসেসর ও NVMe Gen4 স্টোরেজ। ওয়েবসাইট, API,
                ব্যাকএন্ড সার্ভিস ও ডাটাবেস হোস্টিংয়ের জন্য পারফেক্ট।
              </p>

              <ul className="mt-5 space-y-2.5">
                {[
                  "1–16 vCPU ও ২–৬৪ GB RAM — ডেডিকেটেড, নো-ওভারসোল্ড",
                  "NVMe Gen4 RAID-1 — ৬,৮০০ MB/s রিড স্পিড",
                  "Full Root Access — Ubuntu, Debian, Windows Server",
                  "10 Gbps আনমিটার্ড পোর্ট ও ৯৯.৯৮% আপটাইম SLA",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                      <Check size={11} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex items-end justify-between gap-4 border-t border-slate-100 pt-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {billing === "annual" ? "বাৎসরিক প্ল্যান (মাসে)" : "মাসিক প্ল্যান"} শুরু
                  </p>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-display text-3xl font-extrabold text-slate-900">
                      {formatPrice(cloudPrice)}
                    </span>
                    <span className="text-sm text-slate-500">/মাস</span>
                  </div>
                  {billing === "annual" && (
                    <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                      বাৎসরিক: {formatPrice(cloudPrice * 12)} (১০% সাশ্রয়!)
                    </p>
                  )}
                </div>
                <Link
                  href="/cloud-vps"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-md"
                >
                  Configure করুন <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
