"use client";

import { CountryFlag } from "@/components/ui/CountryFlag";
import { Reveal } from "@/components/ui/reveal";
import { useCurrency } from "@/lib/currency";
import { ArrowRight, Check, Globe } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// ─── Countries ───────────────────────────────────────────────────────────────

const COUNTRIES = [
  {
    code: "us",
    name: "United States",
    shortName: "US",
    isp: "AT&T · Comcast · Verizon +৪",
    allIsps: "AT&T, Comcast, Verizon, COX, Spectrum, Frontier, RCN",
  },
  {
    code: "uk",
    name: "United Kingdom",
    shortName: "UK",
    isp: "BT · Virgin Media",
    allIsps: "BT, Virgin Media",
  },
  {
    code: "de",
    name: "Germany",
    shortName: "DE",
    isp: "Deutsche Telekom",
    allIsps: "Deutsche Telekom",
  },
  {
    code: "fr",
    name: "France",
    shortName: "FR",
    isp: "Orange · Free",
    allIsps: "Orange, Free",
  },
];

// ─── Plan Tiers ──────────────────────────────────────────────────────────────

interface PlanTier {
  id: string;
  name: string;
  tagline: string;
  badge: string | null;
  highlight: boolean;
  vcpu: string;
  ram: string;
  storage: string;
  monthlyPrice: number;
  planSlug: string;
  ctaLabel: string;
  features: string[];
}

const TIERS: PlanTier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "১–২টি সার্ভে ব্রাউজার ও ডেইলি কাজের জন্য",
    badge: null,
    highlight: false,
    vcpu: "2 vCPU",
    ram: "4 GB",
    storage: "45 GB",
    monthlyPrice: 2999,
    planSlug: "starter",
    ctaLabel: "Starter বেছে নিন",
    features: [
      "100% ডেডিকেটেড স্ট্যাটিক রেসিডেন্সিয়াল IP",
      "Windows 11 RDP (Full Admin Access)",
      "Zero WebRTC & DNS লিক প্রোটেকশন",
      "৭ দিনের ফ্রি IP রিপ্লেসমেন্ট গ্যারান্টি",
    ],
  },
  {
    id: "pro",
    name: "Popular Pro",
    tagline: "মাল্টি-প্রোফাইল সার্ভে ও স্মুথ মাল্টিটাস্কিংয়ের জন্য",
    badge: "সবচেয়ে জনপ্রিয়",
    highlight: true,
    vcpu: "4 vCPU",
    ram: "6 GB",
    storage: "60 GB",
    monthlyPrice: 3799,
    planSlug: "pro",
    ctaLabel: "Popular Pro নিন",
    features: [
      "Starter-এর সব সুবিধাসহ ২ গুণ বেশি প্রসেসিং পাওয়ার",
      "একসাথে ৪–৫টি ব্রাউজার প্রোফাইলে ল্যাগ-ফ্রি পারফরম্যান্স",
      "প্রায়োরিটি রাউটিং — ঢাকা থেকে লো-পিং কানেকশন",
      "৭ দিনের ফ্রি IP রিপ্লেসমেন্ট ও প্রায়োরিটি সাপোর্ট",
    ],
  },
  {
    id: "vip",
    name: "VIP Fresh",
    tagline: "হাই-ভ্যালু PayPal, Prolific ও ভারী কাজের জন্য",
    badge: "Virgin ASN",
    highlight: false,
    vcpu: "4 vCPU",
    ram: "8 GB",
    storage: "80 GB",
    monthlyPrice: 4999,
    planSlug: "vip",
    ctaLabel: "VIP Fresh নিন",
    features: [
      "Virgin ASN — সম্পূর্ণ আনটাচড ফ্রেশ IP রেঞ্জ",
      "8 GB RAM ও 80 GB NVMe — জিরো স্লোডাউন",
      "স্ট্রিক্ট ফ্রড-চেক সাইটের জন্য সর্বোচ্চ ট্রাস্ট স্কোর",
      "৭ দিনের ফ্রি IP রিপ্লেসমেন্ট ও ডেডিকেটেড সাপোর্ট",
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function SurveyRdpPlans() {
  const { formatPrice } = useCurrency();
  const [selectedCountryCode, setSelectedCountryCode] = useState("us");

  const currentCountry =
    COUNTRIES.find((c) => c.code === selectedCountryCode) || COUNTRIES[0];

  return (
    <section
      id="pricing"
      className="border-b border-slate-200 bg-white py-16 sm:py-24"
    >
      <div className="shell">
        {/* Header + Global Location Switcher */}
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Residential ISP RDP Plans
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold leading-[1.22] tracking-tight text-slate-900 sm:text-4xl">
              আপনার কাজের জন্য সঠিক সার্ভার বেছে নিন
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              সব প্ল্যানেই থাকছে{" "}
              <strong className="font-semibold text-slate-800">
                {currentCountry.isp}
              </strong>{" "}
              ডেডিকেটেড হোম IP। কোনো লুকানো চার্জ নেই।
            </p>
          </div>

          {/* Single Global Country Switcher */}
          <div className="flex flex-col items-start gap-2 lg:items-end">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              <Globe size={12} className="text-blue-600" />
              সার্ভার লোকেশন সিলেক্ট করুন
            </span>
            <div
              role="group"
              aria-label="Select server location"
              className="inline-flex flex-wrap items-center gap-1 rounded-2xl border border-slate-200 bg-slate-100/80 p-1"
            >
              {COUNTRIES.map((c) => {
                const isSelected = c.code === selectedCountryCode;
                return (
                  <button
                    key={c.code}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedCountryCode(c.code)}
                    className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/80"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <CountryFlag code={c.code} size={15} />
                    <span>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Plan Cards Grid */}
        <Reveal
          className="mt-10 grid gap-6 lg:grid-cols-3 lg:items-stretch"
          delay={0.08}
        >
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-3xl p-6 transition-all duration-200 sm:p-7 ${
                tier.highlight
                  ? "bg-white ring-2 ring-blue-600 shadow-xl shadow-blue-600/10"
                  : "border border-slate-200 bg-white shadow-xs hover:border-slate-300 hover:shadow-md"
              }`}
            >
              {/* Top Row: Plan Name + Optional Badge (Fixed height alignment) */}
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-xl font-extrabold text-slate-900">
                  {tier.name}
                </h3>
                {tier.badge && (
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      tier.highlight
                        ? "bg-blue-600 text-white"
                        : "border border-amber-200 bg-amber-50 text-amber-800"
                    }`}
                  >
                    {tier.badge}
                  </span>
                )}
              </div>

              {/* 1-Line Use-Case Tagline */}
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                {tier.tagline}
              </p>

              {/* Price — Top & Immediately Scannable */}
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-4xl font-black tracking-tight text-slate-900">
                  {formatPrice(tier.monthlyPrice)}
                </span>
                <span className="text-sm font-medium text-slate-400">/মাস</span>
              </div>

              {/* Active Location + ISP Pill */}
              <div
                title={currentCountry.allIsps}
                className="mt-4 inline-flex items-center gap-2 self-start rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200/70"
              >
                <CountryFlag code={currentCountry.code} size={14} />
                <span>{currentCountry.isp}</span>
              </div>

              {/* Clean Hardware Specs Grid (No redundant labels) */}
              <div className="mt-5 grid grid-cols-3 divide-x divide-slate-200/80 rounded-2xl border border-slate-200/70 bg-slate-50/70 py-3 text-center">
                {[
                  { label: "CPU", value: tier.vcpu },
                  { label: "RAM", value: tier.ram },
                  { label: "NVMe SSD", value: tier.storage },
                ].map(({ label, value }) => (
                  <div key={label} className="px-2">
                    <p className="text-sm font-extrabold text-slate-900">
                      {value}
                    </p>
                    <p className="mt-0.5 text-[10px] font-medium text-slate-500">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Primary CTA Button */}
              <Link
                href={`/survey-vps?plan=${tier.planSlug}&country=${selectedCountryCode}`}
                className={`mt-5 flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all active:scale-[0.99] ${
                  tier.highlight
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 hover:bg-blue-700"
                    : "border border-slate-300 bg-white text-slate-900 hover:border-blue-600 hover:bg-blue-50/40 hover:text-blue-700"
                }`}
              >
                <span>
                  {tier.ctaLabel} ({currentCountry.shortName})
                </span>
                <ArrowRight size={15} />
              </Link>

              {/* Feature Bullet Points */}
              <ul className="mt-6 flex-1 space-y-2.5 border-t border-slate-100 pt-5">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-600"
                  >
                    <Check
                      size={15}
                      strokeWidth={2.5}
                      className={`mt-0.5 shrink-0 ${
                        tier.highlight ? "text-blue-600" : "text-emerald-600"
                      }`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>

        {/* Footer info note */}
        <Reveal
          className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500"
          delay={0.14}
        >
          <span>পেমেন্ট: বিকাশ · নগদ · কার্ড · USDT</span>
          <span className="hidden h-3 w-px bg-slate-300 sm:inline-block" />
          <span>ডেভেলপার / KVM ক্লাউড দরকার?</span>
          <Link
            href="/cloud-vps"
            className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
          >
            Cloud NVMe Plans দেখুন <ArrowRight size={12} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
