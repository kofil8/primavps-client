"use client";

import { CountryFlag } from "@/components/ui/CountryFlag";
import { Reveal } from "@/components/ui/reveal";
import { useCurrency } from "@/lib/currency";
import { ArrowRight, Check, Globe } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
    tagline: "রিমোট ব্রাউজিং, ডেভেলপমেন্ট ও সাধারণ কাজের জন্য",
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
    tagline: "মাল্টি-টাস্কিং, ই-কমার্স ও স্মুথ প্রফেশনাল ব্যবহারের জন্য",
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
      "একসাথে একাধিক ওয়ার্কস্পেসে ল্যাগ-ফ্রি পারফরম্যান্স",
      "প্রায়োরিটি রাউটিং — ঢাকা থেকে লো-পিং কানেকশন",
      "৭ দিনের ফ্রি IP রিপ্লেসমেন্ট ও প্রায়োরিটি সাপোর্ট",
    ],
  },
  {
    id: "vip",
    name: "VIP Fresh",
    tagline: "হাই-পারফরম্যান্স গ্লোবাল অপারেশনস ও ডেডিকেটেড কাজের জন্য",
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
      "গ্লোবাল এন্টারপ্রাইজ প্ল্যাটফর্মের জন্য সর্বোচ্চ ট্রাস্ট স্কোর",
      "৭ দিনের ফ্রি IP রিপ্লেসমেন্ট ও ডেডিকেটেড সাপোর্ট",
    ],
  },
];

export function IspPlansSection() {
  const { formatPrice } = useCurrency();
  const [selectedCountryCode, setSelectedCountryCode] = useState("us");

  const currentCountry =
    COUNTRIES.find((c) => c.code === selectedCountryCode) || COUNTRIES[0];

  return (
    <section
      id="pricing"
      className="border-b border-slate-200 bg-white py-12 sm:py-16 lg:py-24"
    >
      <div className="shell">
        {/* Header + Global Location Switcher */}
        <Reveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Residential ISP RDP Plans
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold leading-[1.22] tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              আপনার কাজের জন্য সঠিক সার্ভার বেছে নিন
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:mt-3 sm:text-base">
              সব প্ল্যানেই থাকছে{" "}
              <strong className="font-semibold text-slate-800">
                {currentCountry.isp}
              </strong>{" "}
              ডেডিকেটেড হোম IP। কোনো লুকানো চার্জ নেই।
            </p>
          </div>

          {/* 2x2 Grid on small phones, clean pill bar on sm+ */}
          <div className="flex w-full flex-col items-start gap-2 sm:w-auto lg:items-end">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              <Globe size={12} className="text-blue-600" />
              সার্ভার লোকেশন সিলেক্ট করুন
            </span>
            <div
              role="group"
              aria-label="Select server location"
              className="grid w-full grid-cols-2 gap-1 rounded-2xl border border-slate-200 bg-slate-100/80 p-1 sm:inline-flex sm:w-auto sm:flex-wrap sm:items-center"
            >
              {COUNTRIES.map((c) => {
                const isSelected = c.code === selectedCountryCode;
                return (
                  <button
                    key={c.code}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedCountryCode(c.code)}
                    className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-bold transition-all sm:px-3 sm:py-1.5 ${
                      isSelected
                        ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/80"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <CountryFlag code={c.code} size={15} />
                    <span className="truncate">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Plan Cards Grid: 1-col Mobile -> 2-col Tablet -> 3-col Laptop/Desktop */}
        <Reveal
          className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch lg:gap-6"
          delay={0.08}
        >
          {TIERS.map((tier, idx) => (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-2xl p-5 transition-all duration-200 sm:rounded-3xl sm:p-6 xl:p-7 ${
                tier.highlight
                  ? "bg-white shadow-lg shadow-blue-600/8 ring-2 ring-blue-600"
                  : "border border-slate-200 bg-white shadow-xs hover:border-slate-300 hover:shadow-md"
              } ${
                idx === 2
                  ? "md:col-span-2 md:mx-auto md:w-full md:max-w-md lg:col-span-1 lg:max-w-none"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-lg font-extrabold text-slate-900 sm:text-xl">
                  {tier.name}
                </h3>
                {tier.badge && (
                  <span
                    className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      tier.highlight
                        ? "bg-blue-600 text-white"
                        : "border border-amber-200 bg-amber-50 text-amber-800"
                    }`}
                  >
                    {tier.badge}
                  </span>
                )}
              </div>

              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                {tier.tagline}
              </p>

              <div className="mt-4 flex items-baseline gap-1 sm:mt-5">
                <span className="font-display text-3xl font-black tracking-tight tabular-nums text-slate-900 sm:text-4xl">
                  {formatPrice(tier.monthlyPrice)}
                </span>
                <span className="text-xs font-medium text-slate-400 sm:text-sm">
                  /মাস
                </span>
              </div>

              <div
                title={currentCountry.allIsps}
                className="mt-3.5 inline-flex max-w-full items-center gap-2 self-start rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200/70 sm:mt-4"
              >
                <CountryFlag code={currentCountry.code} size={14} />
                <span className="truncate">{currentCountry.isp}</span>
              </div>

              <div className="mt-4 grid grid-cols-3 divide-x divide-slate-200/80 rounded-2xl border border-slate-200/70 bg-slate-50/70 py-2.5 text-center sm:mt-5 sm:py-3">
                {[
                  { label: "CPU", value: tier.vcpu },
                  { label: "RAM", value: tier.ram },
                  { label: "NVMe SSD", value: tier.storage },
                ].map(({ label, value }) => (
                  <div key={label} className="px-1.5 sm:px-2">
                    <p className="text-xs font-extrabold tabular-nums text-slate-900 sm:text-sm">
                      {value}
                    </p>
                    <p className="mt-0.5 text-[9.5px] font-medium text-slate-500 sm:text-[10px]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <Link
                href={`/isp-vps?plan=${tier.planSlug}&country=${selectedCountryCode}`}
                className={`mt-5 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold transition-all active:scale-[0.99] sm:px-5 sm:text-sm ${
                  tier.highlight
                    ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                    : "border border-slate-300 bg-white text-slate-900 hover:border-blue-600 hover:bg-blue-50/40 hover:text-blue-700"
                }`}
              >
                <span>
                  {tier.ctaLabel} ({currentCountry.shortName})
                </span>
                <ArrowRight size={15} />
              </Link>

              <ul className="mt-5 flex-1 space-y-2.5 border-t border-slate-100 pt-4 sm:mt-6 sm:pt-5">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-xs leading-relaxed text-slate-600 sm:gap-2.5"
                  >
                    <Check
                      size={14}
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
          className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-xs text-slate-500 sm:mt-9 sm:gap-x-5"
          delay={0.14}
        >
          <span>পেমেন্ট: বিকাশ · নগদ · কার্ড · sslcommerz</span>
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
