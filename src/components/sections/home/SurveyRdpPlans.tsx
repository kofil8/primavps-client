"use client";

import { useState } from "react";
import { useCurrency } from "@/lib/currency";
import { Reveal } from "@/components/ui/reveal";
import { CountryFlag } from "@/components/ui/CountryFlag";
import {
  ArrowRight,
  Check,
  Globe,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

// ─── Countries ───────────────────────────────────────────────────────────────

const COUNTRIES = [
  { code: "us", name: "United States", shortName: "US", isp: "AT&T / Comcast" },
  { code: "uk", name: "United Kingdom", shortName: "UK", isp: "BT / Virgin Media" },
  { code: "de", name: "Germany", shortName: "DE", isp: "Deutsche Telekom" },
  { code: "fr", name: "France", shortName: "FR", isp: "Orange / Free" },
];

// ─── Plan Tiers ──────────────────────────────────────────────────────────────

interface PlanTier {
  id: string;
  name: string;
  badge: string | null;
  highlight: boolean;
  vcpu: string;
  ram: string;
  storage: string;
  monthlyPrice: number;
  planSlug: string;
  features: string[];
}

const TIERS: PlanTier[] = [
  {
    id: "starter",
    name: "Starter",
    badge: null,
    highlight: false,
    vcpu: "2 vCPU",
    ram: "4 GB RAM",
    storage: "45 GB NVMe",
    monthlyPrice: 2999,
    planSlug: "starter",
    features: [
      "100% Dedicated Static Residential IP",
      "Windows 11 RDP (Full Administrator)",
      "Zero WebRTC & DNS Leaks",
      "৭ দিনের ফ্রি IP রিপ্লেসমেন্ট গ্যারান্টি",
    ],
  },
  {
    id: "pro",
    name: "Popular Pro",
    badge: "সবচেয়ে জনপ্রিয় 🔥",
    highlight: true,
    vcpu: "4 vCPU",
    ram: "6 GB RAM",
    storage: "60 GB NVMe",
    monthlyPrice: 3799,
    planSlug: "pro",
    features: [
      "100% Dedicated Static Residential IP",
      "Windows 11 RDP (Full Administrator)",
      "Zero WebRTC & DNS Leaks",
      "৭ দিনের ফ্রি IP রিপ্লেসমেন্ট গ্যারান্টি",
    ],
  },
  {
    id: "vip",
    name: "VIP Fresh",
    badge: "Virgin ASN · সর্বোচ্চ ফ্রেশ",
    highlight: false,
    vcpu: "4 vCPU",
    ram: "8 GB RAM",
    storage: "80 GB NVMe",
    monthlyPrice: 4999,
    planSlug: "vip",
    features: [
      "Virgin ASN — আনটাস্কড ফ্রেশ IP রেঞ্জ",
      "Windows 11 RDP (Full Administrator)",
      "Zero WebRTC & DNS Leaks",
      "৭ দিনের ফ্রি IP রিপ্লেসমেন্ট গ্যারান্টি",
    ],
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function SurveyRdpPlans() {
  const { formatPrice } = useCurrency();

  // Selected country per plan card
  const [selectedCountries, setSelectedCountries] = useState<Record<string, string>>({
    starter: "us",
    pro: "us",
    vip: "us",
  });

  const handleCountryChange = (planId: string, countryCode: string) => {
    setSelectedCountries((prev) => ({
      ...prev,
      [planId]: countryCode,
    }));
  };

  return (
    <section id="pricing" className="border-b border-slate-200 bg-white py-20 sm:py-28">
      <div className="shell">
        {/* Section Header */}
        <Reveal className="max-w-2xl">
          <p className="eyebrow inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-blue-600">
            <Sparkles size={14} />
            Residential ISP RDP Plans
          </p>
          <h2 className="section-title mt-2.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            আপনার কাজের জন্য সঠিক সার্ভার বেছে নিন
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            ইউএস, ইউকে, জার্মানি ও ফ্রান্সের ডেডিকেটেড স্ট্যাটিক আইপি। বিকাশ বা নগদে
            পেমেন্টের ৯০ সেকেন্ডের মধ্যে ডেলিভারি।
          </p>
        </Reveal>

        {/* Top Feature Strip */}
        <Reveal className="mt-7 flex flex-wrap gap-3" delay={0.05}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200/60">
            <ShieldCheck size={14} /> 0/100 IPQS Clean IP
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-200/60">
            <RefreshCw size={14} /> 7-Day Free IP Swap
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200/60">
            <Zap size={14} /> &lt;৯০ সেকেন্ডে অটো-অ্যাক্টিভেশন
          </span>
        </Reveal>

        {/* Plan Cards Grid */}
        <Reveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" delay={0.1}>
          {TIERS.map((tier) => {
            const currentCountryCode = selectedCountries[tier.id] || "us";
            const currentCountry =
              COUNTRIES.find((c) => c.code === currentCountryCode) || COUNTRIES[0];

            return (
              <div
                key={tier.id}
                className={`relative flex flex-col rounded-3xl border p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  tier.highlight
                    ? "border-blue-500 bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                    : "border-slate-200 bg-white shadow-sm"
                }`}
              >
                {/* Badge if present */}
                {tier.badge && (
                  <div
                    className={`mb-4 inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1 text-[11px] font-bold ${
                      tier.highlight
                        ? "bg-white/20 text-white backdrop-blur-xs"
                        : "bg-amber-100 text-amber-900 border border-amber-200"
                    }`}
                  >
                    {tier.badge}
                  </div>
                )}

                {/* Plan Name & Tagline */}
                <h3
                  className={`font-display text-2xl font-extrabold ${
                    tier.highlight ? "text-white" : "text-slate-900"
                  }`}
                >
                  {tier.name}
                </h3>

                {/* Interactive Country Selector Pills */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        tier.highlight ? "text-blue-100" : "text-slate-500"
                      }`}
                    >
                      সার্ভার লোকেশন:
                    </span>
                    <span
                      className={`text-[11px] font-semibold ${
                        tier.highlight ? "text-blue-100" : "text-blue-600"
                      }`}
                    >
                      {currentCountry.name}
                    </span>
                  </div>

                  <div
                    className={`grid grid-cols-4 gap-1 p-1 rounded-2xl border transition-colors ${
                      tier.highlight
                        ? "bg-black/15 border-white/20"
                        : "bg-slate-100/80 border-slate-200/80"
                    }`}
                  >
                    {COUNTRIES.map((c) => {
                      const isSelected = c.code === currentCountryCode;
                      return (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => handleCountryChange(tier.id, c.code)}
                          className={`flex items-center justify-center gap-1.5 py-1.5 px-1 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? tier.highlight
                                ? "bg-white text-blue-700 shadow-md scale-102"
                                : "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200 scale-102"
                              : tier.highlight
                              ? "text-blue-100 hover:bg-white/10"
                              : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
                          }`}
                        >
                          <CountryFlag code={c.code} size={15} />
                          <span className="tracking-tight">{c.shortName}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active ISP Info indicator */}
                  <div
                    className={`mt-2.5 flex items-center gap-1.5 text-xs font-semibold ${
                      tier.highlight ? "text-blue-100" : "text-slate-600"
                    }`}
                  >
                    <Globe size={13} className={`shrink-0 ${tier.highlight ? "text-blue-200" : "text-blue-600"}`} />
                    <span>
                      {currentCountry.isp} Residential IP
                    </span>
                  </div>
                </div>

                {/* Hardware Specs Grid */}
                <div
                  className={`mt-5 grid grid-cols-3 gap-2 rounded-2xl p-3 text-center text-xs ${
                    tier.highlight ? "bg-white/10" : "bg-slate-50"
                  }`}
                >
                  {[
                    { label: "CPU", value: tier.vcpu },
                    { label: "RAM", value: tier.ram },
                    { label: "NVMe", value: tier.storage },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p
                        className={`font-extrabold ${
                          tier.highlight ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {value}
                      </p>
                      <p
                        className={`mt-0.5 text-[10px] ${
                          tier.highlight ? "text-blue-200" : "text-slate-400"
                        }`}
                      >
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Feature Bullet Points */}
                <ul className="mt-5 flex-1 space-y-2.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-xs">
                      <Check
                        size={15}
                        className={`mt-0.5 shrink-0 ${
                          tier.highlight ? "text-blue-200" : "text-emerald-600"
                        }`}
                      />
                      <span
                        className={
                          tier.highlight ? "text-blue-50" : "text-slate-600"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Price and Action Button */}
                <div className="mt-7 border-t pt-5 border-current/10">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`font-display text-3xl font-black ${
                        tier.highlight ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {formatPrice(tier.monthlyPrice)}
                    </span>
                    <span
                      className={`text-sm ${
                        tier.highlight ? "text-blue-200" : "text-slate-400"
                      }`}
                    >
                      /মাস
                    </span>
                  </div>

                  <Link
                    href={`/survey-vps?plan=${tier.planSlug}&country=${currentCountryCode}`}
                    className={`mt-4 flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 ${
                      tier.highlight
                        ? "bg-white text-blue-700 shadow-lg hover:bg-blue-50"
                        : "bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-700"
                    }`}
                  >
                    <span>এখনই নিন ({currentCountry.shortName})</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            );
          })}
        </Reveal>

        {/* Footer info note */}
        <Reveal
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500"
          delay={0.15}
        >
          <span>পেমেন্ট: বিকাশ · নগদ · রকেট · কার্ড · USDT</span>
          <span className="hidden sm:inline-block h-3 w-px bg-slate-300" />
          <span>ডেভেলপার / KVM ক্লাউড দরকার?</span>
          <Link
            href="/cloud-vps"
            className="font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            Cloud NVMe Plans দেখুন <ArrowRight size={12} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
