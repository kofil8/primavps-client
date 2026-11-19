"use client";

import { useCurrency } from "@/lib/currency";
import { Reveal } from "@/components/ui/reveal";
import {
  ArrowRight,
  Check,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import Link from "next/link";

// ─── Plan Tiers ──────────────────────────────────────────────────────────────

const TIERS = [
  {
    id: "starter",
    name: "Starter",
    badge: null,
    highlight: false,
    vcpu: "2 vCPU",
    ram: "4 GB RAM",
    storage: "45 GB NVMe",
    isp: "AT&T / Comcast",
    monthlyPrice: 2999,
    planSlug: "starter",
    perks: [
      "Dedicated Static Residential IP",
      "Windows 11 RDP (Full Access)",
      "Zero WebRTC & DNS Leak",
      "7-Day Free IP Swap",
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
    isp: "AT&T / Comcast",
    monthlyPrice: 3799,
    planSlug: "pro",
    perks: [
      "Dedicated Static Residential IP",
      "Windows 11 RDP (Full Access)",
      "Zero WebRTC & DNS Leak",
      "7-Day Free IP Swap",
    ],
  },
  {
    id: "vip",
    name: "VIP Fresh",
    badge: "Virgin ASN · সর্বোচ্চ ক্লিন",
    highlight: false,
    vcpu: "4 vCPU",
    ram: "8 GB RAM",
    storage: "80 GB NVMe",
    isp: "AT&T Virgin ASN",
    monthlyPrice: 4999,
    planSlug: "vip",
    perks: [
      "Virgin ASN — একদম নতুন IP রেঞ্জ",
      "Windows 11 RDP (Full Access)",
      "Zero WebRTC & DNS Leak",
      "7-Day Free IP Swap",
    ],
  },
] as const;

// ─── Shared guarantee strip ───────────────────────────────────────────────────

const GUARANTEES = [
  { icon: ShieldCheck, color: "text-emerald-600 bg-emerald-50", label: "0/100 IPQS Score" },
  { icon: RefreshCw,   color: "text-blue-600 bg-blue-50",       label: "7-Day IP Swap SLA" },
  { icon: Zap,         color: "text-amber-600 bg-amber-50",     label: "<90s অটো-ডেলিভারি" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function SurveyRdpPlans() {
  const { formatPrice } = useCurrency();

  return (
    <section
      id="pricing"
      className="border-b border-slate-200 bg-white py-20 sm:py-28"
    >
      <div className="shell">
        {/* Section header */}
        <Reveal className="max-w-2xl">
          <p className="eyebrow inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-blue-600">
            <Sparkles size={14} />
            Survey &amp; Residential RDP Plans
          </p>
          <h2 className="section-title mt-2.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            আপনার কাজের জন্য সঠিক প্ল্যানটি বেছে নিন
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            সব প্ল্যানে ডেডিকেটেড স্ট্যাটিক রেসিডেন্সিয়াল আইপি, বিকাশ/নগদ পেমেন্ট এবং
            ৯০ সেকেন্ডে অটো-ডেলিভারি অন্তর্ভুক্ত।
          </p>
        </Reveal>

        {/* Guarantee strip */}
        <Reveal className="mt-8 flex flex-wrap gap-3" delay={0.05}>
          {GUARANTEES.map(({ icon: Icon, color, label }) => (
            <span
              key={label}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${color} border border-current/10`}
            >
              <Icon size={13} />
              {label}
            </span>
          ))}
        </Reveal>

        {/* Plan cards */}
        <Reveal className="mt-10 grid gap-6 sm:grid-cols-3" delay={0.1}>
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                tier.highlight
                  ? "border-blue-500 bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                  : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div
                  className={`mb-4 inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1 text-[11px] font-bold ${
                    tier.highlight
                      ? "bg-white/20 text-white"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {tier.badge}
                </div>
              )}

              {/* Plan name & ISP */}
              <h3
                className={`font-display text-xl font-extrabold ${
                  tier.highlight ? "text-white" : "text-slate-900"
                }`}
              >
                {tier.name}
              </h3>
              <p
                className={`mt-0.5 text-xs font-semibold ${
                  tier.highlight ? "text-blue-200" : "text-blue-600"
                }`}
              >
                {tier.isp} Residential IP
              </p>

              {/* Specs row */}
              <div
                className={`mt-5 grid grid-cols-3 gap-2 rounded-2xl p-3 text-center text-xs ${
                  tier.highlight ? "bg-white/10" : "bg-slate-50"
                }`}
              >
                {[
                  { label: "CPU", value: tier.vcpu },
                  { label: "RAM", value: tier.ram },
                  { label: "Storage", value: tier.storage },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p
                      className={`font-bold ${
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

              {/* Perks */}
              <ul className="mt-5 flex-1 space-y-2.5">
                {tier.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs">
                    <Check
                      size={14}
                      className={`mt-0.5 shrink-0 ${
                        tier.highlight ? "text-blue-200" : "text-emerald-600"
                      }`}
                    />
                    <span
                      className={
                        tier.highlight ? "text-blue-100" : "text-slate-600"
                      }
                    >
                      {p}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Price + CTA */}
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
                  href={`/survey-vps?plan=${tier.planSlug}`}
                  className={`mt-4 flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 ${
                    tier.highlight
                      ? "bg-white text-blue-700 shadow-lg hover:bg-blue-50"
                      : "bg-blue-600 text-white shadow-md shadow-blue-600/20 hover:bg-blue-700"
                  }`}
                >
                  এখনই নিন <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </Reveal>

        {/* Bottom note */}
        <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500" delay={0.15}>
          <span className="flex items-center gap-1.5">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            বিকাশ · নগদ · রকেট · VISA · USDT
          </span>
          <span className="hidden sm:inline-block h-3 w-px bg-slate-300" />
          <span>Cloud VPS (KVM/NVMe) দরকার?</span>
          <Link
            href="/cloud-vps"
            className="font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            Cloud Plans দেখুন <ArrowRight size={12} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
