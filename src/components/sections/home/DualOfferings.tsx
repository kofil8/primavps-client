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

/* ── Tier Definitions ── */
const RESIDENTIAL_TIERS = [
  {
    id: "starter",
    name: "Starter",
    badge: "",
    vcpu: "2 vCPU",
    ram: "4 GB RAM",
    storage: "45 GB NVMe",
    monthlyPrice: 2999,
  },
  {
    id: "pro",
    name: "Pro",
    badge: "সবচেয়ে জনপ্রিয়",
    vcpu: "4 vCPU",
    ram: "6 GB RAM",
    storage: "60 GB NVMe",
    monthlyPrice: 3799,
  },
  {
    id: "vip",
    name: "VIP Fresh",
    badge: "Virgin ASN",
    vcpu: "4 vCPU",
    ram: "8 GB RAM",
    storage: "80 GB NVMe",
    monthlyPrice: 4999,
  },
];

const CLOUD_TIERS = [
  {
    id: "starter",
    name: "Starter 2G",
    badge: "",
    vcpu: "1 vCPU",
    ram: "2 GB DDR5",
    storage: "40 GB NVMe",
    monthlyPrice: 950,
  },
  {
    id: "web",
    name: "Balanced 4G",
    badge: "রিকমেন্ডেড",
    vcpu: "2 vCPU",
    ram: "4 GB DDR5",
    storage: "80 GB NVMe",
    monthlyPrice: 1800,
  },
  {
    id: "app",
    name: "Power 8G",
    badge: "হাই-লোড",
    vcpu: "4 vCPU",
    ram: "8 GB DDR5",
    storage: "160 GB NVMe",
    monthlyPrice: 3400,
  },
];

export function DualOfferings() {
  const { formatPrice } = useCurrency();
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [selectedIspTier, setSelectedIspTier] = useState<string>("starter");
  const [selectedCloudTier, setSelectedCloudTier] = useState<string>("starter");

  const annualDiscount = 0.1; // 10% off

  const currentIsp =
    RESIDENTIAL_TIERS.find((t) => t.id === selectedIspTier) || RESIDENTIAL_TIERS[0];
  const currentCloud =
    CLOUD_TIERS.find((t) => t.id === selectedCloudTier) || CLOUD_TIERS[0];

  const ispPrice =
    billing === "annual"
      ? Math.round(currentIsp.monthlyPrice * (1 - annualDiscount))
      : currentIsp.monthlyPrice;

  const cloudPrice =
    billing === "annual"
      ? Math.round(currentCloud.monthlyPrice * (1 - annualDiscount))
      : currentCloud.monthlyPrice;

  return (
    <section id="pricing" className="section border-b border-slate-200 bg-slate-50/60 py-20 sm:py-28">
      <div className="shell">
        <Reveal className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow inline-flex items-center gap-1.5 text-blue-600 font-bold uppercase tracking-wider">
              <Sparkles size={14} /> ইনস্ট্যান্ট প্ল্যান কনফিগারেটর · Instant Plan Configurator
            </p>
            <h2 className="section-title mt-2 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              আপনার কাজের ধরন অনুযায়ী
              <br className="hidden sm:block" /> সঠিক সার্ভার ও স্পেক্স বেছে নিন
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              হোমপেজেই সরাসরি র‍্যাম, সিপিইউ ও ড্রাইভ সিলেক্ট করুন—কোনো লুকানো চার্জ নেই।
              বিকাশ বা নগদে পেমেন্টের ৯০ সেকেন্ডের মধ্যে সার্ভার লাইভ হবে।
            </p>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                billing === "monthly"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              মাসিক বিলিং
            </button>
            <button
              type="button"
              onClick={() => setBilling("annual")}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                billing === "annual"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              বাৎসরিক বিলিং
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-extrabold ${
                  billing === "annual"
                    ? "bg-white/20 text-white"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                ১০% ছাড়
              </span>
            </button>
          </div>
        </Reveal>

        <Reveal className="mt-12 grid gap-8 lg:grid-cols-2" delay={0.12}>
          {/* Card 1: Residential ISP VPS (Highlighted) */}
          <article className="group flex flex-col overflow-hidden rounded-3xl border-2 border-blue-500/80 bg-white shadow-xl shadow-blue-500/10 ring-4 ring-blue-500/5 transition-all duration-300 hover:shadow-2xl">
            {/* Top Ribbon */}
            <div className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 py-2 text-center text-xs font-bold text-white">
              <Sparkles size={13} className="text-amber-300" />
              বাংলাদেশি সার্ভেয়ার ও ফ্রিল্যান্সারদের #১ পছন্দ
            </div>

            {/* Dark Mode Visual Graphic */}
            <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/60 font-mono text-xs select-none p-4">
              <div className="flex items-center justify-between text-[11px] text-slate-300 mb-2">
                <span className="flex items-center gap-1.5 font-sans font-semibold">
                  <Monitor size={13} className="text-blue-400" /> Windows 11 Pro RDP
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse inline-block mr-1" />
                  0/100 IPQS GUARANTEE
                </span>
              </div>

              <div className="mt-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <p className="font-sans text-xs font-bold text-white">
                      {currentIsp.name} · AT&amp;T / Comcast
                    </p>
                    <p className="font-sans text-[11px] text-slate-400">
                      100% Dedicated Static Residential IP
                    </p>
                  </div>
                </div>
                <span className="rounded-lg bg-emerald-400/20 px-2 py-0.5 text-[10px] font-black text-emerald-300">
                  CLEAN
                </span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[10px] text-slate-300 font-sans">
                <div className="rounded-lg bg-white/5 py-1.5 border border-white/5">✓ Zero WebRTC</div>
                <div className="rounded-lg bg-white/5 py-1.5 border border-white/5">✓ No DNS Leak</div>
                <div className="rounded-lg bg-white/5 py-1.5 border border-white/5">✓ 7-Day IP Swap</div>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-7">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Residential ISP VPS
                  </h3>
                  <p className="mt-0.5 text-xs font-semibold text-blue-600">
                    Real US Home Internet (AT&amp;T · Comcast · Spectrum)
                  </p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  Windows 11 RDP
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                আমেরিকান হোম ব্রডব্যান্ড আইপি। সার্ভে সাইট, ফ্রিল্যান্স মার্কেটপ্লেস বা
                ইউএস ব্যাংক একাউন্ট ব্যবহারে কোনো ব্যান বা ফ্ল্যাগের ভয় নেই।
              </p>

              {/* Inline Tier Selector Pills */}
              <div className="mt-5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  প্ল্যান টায়ার পছন্দ করুন:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {RESIDENTIAL_TIERS.map((tier) => {
                    const isSelected = selectedIspTier === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedIspTier(tier.id)}
                        className={`relative flex flex-col items-center justify-center rounded-2xl border p-2.5 text-center transition-all ${
                          isSelected
                            ? "border-blue-600 bg-blue-50/80 text-blue-900 ring-2 ring-blue-500/20 font-bold"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 font-medium"
                        }`}
                      >
                        {tier.badge && (
                          <span className="absolute -top-2 rounded-full bg-blue-600 px-1.5 py-0.2 text-[9px] font-extrabold text-white">
                            {tier.badge}
                          </span>
                        )}
                        <span className="text-xs">{tier.name}</span>
                        <span className="text-[10px] text-slate-500 mt-0.5">
                          {tier.vcpu} · {tier.ram}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic specs bullet list */}
              <div className="mt-6 rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-2 text-xs text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <Cpu size={14} className="text-blue-600" /> প্রসেসর ও মেমোরি:
                  </span>
                  <span className="font-bold text-slate-900">
                    {currentIsp.vcpu} + {currentIsp.ram}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <HardDrive size={14} className="text-indigo-600" /> এসএসডি স্টোরেজ:
                  </span>
                  <span className="font-bold text-slate-900">
                    {currentIsp.storage} (Pure Gen4 NVMe)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <Network size={14} className="text-emerald-600" /> আইপি টাইপ:
                  </span>
                  <span className="font-bold text-emerald-700">
                    100% Dedicated Static AT&amp;T / Comcast
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <ShieldCheck size={14} className="text-amber-600" /> রিপ্লেসমেন্ট গ্যারান্টি:
                  </span>
                  <span className="font-bold text-slate-900">
                    ৭ দিনের ফ্রি আইপি সোয়াপ
                  </span>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="mt-7 flex items-end justify-between gap-4 border-t border-slate-100 pt-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {billing === "annual" ? "বাৎসরিক ছাড়সহ (প্রতি মাসে)" : "মাসিক ফি"}
                  </p>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-display text-3xl font-black text-slate-900">
                      {formatPrice(ispPrice)}
                    </span>
                    <span className="text-sm text-slate-500">/মাস</span>
                  </div>
                  {billing === "annual" && (
                    <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                      মোট বাৎসরিক: {formatPrice(ispPrice * 12)} (১০% সেভ)
                    </p>
                  )}
                </div>
                <Link
                  href={`/survey-vps?plan=${currentIsp.id}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:bg-blue-700 hover:-translate-y-0.5"
                >
                  ৬০ সেকেন্ডে ডেপ্লয় করুন <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </article>

          {/* Card 2: Cloud NVMe VPS */}
          <article className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60">
            {/* Top Ribbon */}
            <div className="flex items-center justify-center gap-1.5 bg-slate-900 py-2 text-center text-xs font-semibold text-slate-300">
              <Cpu size={13} className="text-indigo-400" />
              ডেভেলপার, স্টার্টআপ ও হাই-লোড ব্যাকএন্ডের জন্য
            </div>

            {/* Dark Mode Terminal Graphic */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-950 font-mono text-xs select-none p-4">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Terminal size={13} className="text-indigo-400" /> root@ashburn-vps-01:~#
                </span>
                <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300">
                  KVM DEDICATED
                </span>
              </div>

              <div className="mt-3 space-y-2 text-[11px] text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Processor:</span>
                  <span className="text-white font-semibold">AMD EPYC 3.2GHz Dedicated</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Disk I/O:</span>
                  <span className="text-emerald-400 font-semibold">6,800 MB/s Gen4 NVMe RAID-1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Network:</span>
                  <span className="text-amber-300 font-semibold">10 Gbps Tier-1 Redundant</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-1.5 text-center text-[10px] text-slate-300 font-sans">
                <div className="rounded-lg bg-white/5 py-1.5 border border-white/5">✓ Full Root / VNC Console</div>
                <div className="rounded-lg bg-white/5 py-1.5 border border-white/5">✓ 99.98% Uptime SLA</div>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-7">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    KVM Cloud VPS
                  </h3>
                  <p className="mt-0.5 text-xs font-semibold text-slate-500">
                    High Performance NVMe · Ashburn US-East Tier-1
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                  Linux / Windows
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                নোড.জেএস, ডকার, পাইথন/ফাস্টএপিআই বা ওয়ার্ডপ্রেসের জন্য খাঁটি KVM
                ভার্চুয়ালাইজেশন। ডেডিকেটেড র্যাম এবং আল্ট্রাফাস্ট Gen4 ডিস্ক।
              </p>

              {/* Inline Tier Selector Pills */}
              <div className="mt-5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  প্ল্যান কনফিগারেশন পছন্দ করুন:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {CLOUD_TIERS.map((tier) => {
                    const isSelected = selectedCloudTier === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedCloudTier(tier.id)}
                        className={`relative flex flex-col items-center justify-center rounded-2xl border p-2.5 text-center transition-all ${
                          isSelected
                            ? "border-slate-900 bg-slate-900 text-white shadow-sm font-bold"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 font-medium"
                        }`}
                      >
                        {tier.badge && (
                          <span className={`absolute -top-2 rounded-full px-1.5 py-0.2 text-[9px] font-extrabold ${
                            isSelected ? "bg-amber-400 text-slate-950" : "bg-slate-700 text-white"
                          }`}>
                            {tier.badge}
                          </span>
                        )}
                        <span className="text-xs">{tier.name}</span>
                        <span className={`text-[10px] mt-0.5 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                          {tier.vcpu} · {tier.ram}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic specs bullet list */}
              <div className="mt-6 rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-2 text-xs text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <Cpu size={14} className="text-indigo-600" /> প্রসেসর ও মেমোরি:
                  </span>
                  <span className="font-bold text-slate-900">
                    {currentCloud.vcpu} AMD EPYC + {currentCloud.ram}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <HardDrive size={14} className="text-emerald-600" /> ড্রাইভ স্পিড:
                  </span>
                  <span className="font-bold text-slate-900">
                    {currentCloud.storage} (6,800 MB/s Gen4 NVMe)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <Network size={14} className="text-blue-600" /> নেটওয়ার্ক পোর্ট:
                  </span>
                  <span className="font-bold text-slate-900">
                    10 Gbps Tier-1 Port · DDoS Shield
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <Terminal size={14} className="text-amber-600" /> অ্যাক্সেস ও ওএস:
                  </span>
                  <span className="font-bold text-slate-900">
                    Full Root / KVM Console · Ubuntu/Debian/Alma
                  </span>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="mt-7 flex items-end justify-between gap-4 border-t border-slate-100 pt-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {billing === "annual" ? "বাৎসরিক ছাড়সহ (প্রতি মাসে)" : "মাসিক ফি"}
                  </p>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-display text-3xl font-black text-slate-900">
                      {formatPrice(cloudPrice)}
                    </span>
                    <span className="text-sm text-slate-500">/মাস</span>
                  </div>
                  {billing === "annual" && (
                    <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                      মোট বাৎসরিক: {formatPrice(cloudPrice * 12)} (১০% সেভ)
                    </p>
                  )}
                </div>
                <Link
                  href={`/cloud-vps?plan=${currentCloud.id}`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/25 transition-all duration-200 hover:bg-slate-800 hover:-translate-y-0.5"
                >
                  কনফিগার করুন <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
