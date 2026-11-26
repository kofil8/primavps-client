"use client";

import { CountryFlag } from "@/components/ui/CountryFlag";
import { useCurrency } from "@/lib/currency";
import { HOT_DEALS_LIST } from "@/lib/data/deals";
import { ISP_PLANS } from "@/lib/data/plans";
import {
  ArrowRight,
  Check,
  Cpu,
  HardDrive,
  MemoryStick,
  RefreshCw,
  ShieldCheck,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CYCLES = [
  { id: "monthly", label: "১ মাস", months: 1, discount: 0 },
  { id: "quarterly", label: "৩ মাস", months: 3, discount: 0.05 },
  { id: "annual", label: "১২ মাস", months: 12, discount: 0.15 },
] as const;

const COUNTRY_CARRIERS: Record<
  string,
  { label: string; short: string; carriers: string[] }
> = {
  us: {
    label: "United States",
    short: "US",
    carriers: ["All", "AT&T", "Comcast", "Verizon", "Spectrum", "COX"],
  },
  uk: {
    label: "United Kingdom",
    short: "UK",
    carriers: ["All", "BT", "Virgin Media", "Vodafone UK"],
  },
  de: {
    label: "Germany",
    short: "DE",
    carriers: ["All", "Deutsche Telekom", "Vodafone DE"],
  },
  fr: {
    label: "France",
    short: "FR",
    carriers: ["All", "Orange", "Free", "SFR"],
  },
};

export default function DashboardDeployIspPage() {
  const router = useRouter();
  const { formatPrice } = useCurrency();

  const [country, setCountry] = useState("us");
  const [carrier, setCarrier] = useState("All");
  const [isFresh, setIsFresh] = useState(false);
  const [cycleId, setCycleId] = useState<(typeof CYCLES)[number]["id"]>("monthly");
  const [selectedPlanId, setSelectedPlanId] = useState(
    ISP_PLANS.find((p) => p.tier === "pro")?.id ?? ISP_PLANS[0].id,
  );
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    percent: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");

  const activeCountry = COUNTRY_CARRIERS[country] ?? COUNTRY_CARRIERS.us;
  const cycle = CYCLES.find((c) => c.id === cycleId) ?? CYCLES[0];
  const selectedPlan =
    ISP_PLANS.find((p) => p.id === selectedPlanId) ?? ISP_PLANS[0];

  const baseMonthly = isFresh
    ? selectedPlan.priceFreshBdt
    : selectedPlan.priceBdt;
  const discountedMonthly = Math.round(baseMonthly * (1 - cycle.discount));
  const subtotal = discountedMonthly * cycle.months;
  const couponSaving = appliedCoupon
    ? Math.round((subtotal * appliedCoupon.percent) / 100)
    : 0;
  const finalTotal = Math.max(0, subtotal - couponSaving);

  const handleCountryChange = (code: string) => {
    setCountry(code);
    setCarrier("All");
  };

  const handleApplyCoupon = () => {
    setCouponError("");
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    const deal = HOT_DEALS_LIST.find(
      (d) => d.couponCode.toUpperCase() === code,
    );
    if (!deal) {
      setAppliedCoupon(null);
      setCouponError("কুপন কোডটি সঠিক নয় বা মেয়াদোত্তীর্ণ।");
      return;
    }

    setAppliedCoupon({ code: deal.couponCode, percent: deal.discountPercent });
  };

  const handleProceedCheckout = () => {
    const params = new URLSearchParams({
      type: "isp",
      plan: selectedPlan.id,
      country,
      carrier,
      cycle: cycle.id,
      fresh: String(isFresh),
      from: "dashboard",
    });
    if (appliedCoupon) {
      params.set("coupon", appliedCoupon.code);
    }
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Header + Product Switcher Tabs */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
            নতুন সার্ভার ডিপ্লয় করুন
          </h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            পছন্দের লোকেশন, ISP ও প্ল্যান নির্বাচন করে সরাসরি চেকআউট সম্পন্ন করুন।
          </p>
        </div>

        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 text-xs font-bold shadow-2xs">
          <Link
            href="/dashboard/isp-vps"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-white"
          >
            <ShieldCheck size={14} />
            <span>ISP Residential VPS</span>
          </Link>
          <Link
            href="/dashboard/cloud-vps"
            className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            <Cpu size={14} />
            <span>Custom Cloud VPS</span>
          </Link>
        </div>
      </div>

      {/* 2-Column Configurator + Sticky Summary */}
      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:items-start">
        <div className="space-y-5">
          {/* Step 1: Location & Carrier */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
            <h2 className="font-display text-sm font-extrabold text-slate-900 sm:text-base">
              ১. দেশ, IP টাইপ ও ক্যারিয়ার নির্বাচন
            </h2>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {Object.entries(COUNTRY_CARRIERS).map(([code, meta]) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => handleCountryChange(code)}
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all ${
                      country === code
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <CountryFlag code={code} size={15} />
                    <span>{meta.short}</span>
                  </button>
                ))}
              </div>

              <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setIsFresh(false)}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 transition-colors ${
                    !isFresh
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-600"
                  }`}
                >
                  Clean IP
                </button>
                <button
                  type="button"
                  onClick={() => setIsFresh(true)}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 transition-colors ${
                    isFresh
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-600"
                  }`}
                >
                  Virgin IP
                </button>
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                ISP Carrier ({activeCountry.label})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {activeCountry.carriers.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCarrier(item)}
                    className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                      carrier === item
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                    }`}
                  >
                    {item === "All" ? "Auto (Best Clean IP)" : item}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Step 2: Plan Selection */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-sm font-extrabold text-slate-900 sm:text-base">
                ২. সার্ভার প্ল্যান ও বিলিং সাইকেল
              </h2>

              <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
                {CYCLES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCycleId(c.id)}
                    className={`cursor-pointer rounded-lg px-3 py-1.5 transition-colors ${
                      cycleId === c.id
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-600"
                    }`}
                  >
                    {c.label}
                    {c.discount > 0 && (
                      <span className="ml-1 text-[10px] text-emerald-700">
                        -{c.discount * 100}%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {ISP_PLANS.map((plan) => {
                const selected = plan.id === selectedPlan.id;
                const price = Math.round(
                  (isFresh ? plan.priceFreshBdt : plan.priceBdt) *
                    (1 - cycle.discount),
                );
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`flex cursor-pointer flex-col rounded-2xl border p-4 text-left transition-all ${
                      selected
                        ? "border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-sm font-extrabold text-slate-900">
                        {plan.name}
                      </span>
                      {selected && (
                        <span className="grid size-5 place-items-center rounded-full bg-blue-600 text-white">
                          <Check size={12} />
                        </span>
                      )}
                    </div>

                    <p className="mt-2 font-display text-xl font-black text-slate-900">
                      {formatPrice(price)}
                      <span className="text-[11px] font-medium text-slate-500">
                        {" "}
                        /মাস
                      </span>
                    </p>

                    <ul className="mt-3 space-y-1.5 text-[11px] font-medium text-slate-600">
                      <li className="flex items-center gap-1.5">
                        <Cpu size={12} className="text-blue-600" />
                        {plan.specs.vcpu} vCPU
                      </li>
                      <li className="flex items-center gap-1.5">
                        <MemoryStick size={12} className="text-blue-600" />
                        {plan.specs.ram} GB RAM
                      </li>
                      <li className="flex items-center gap-1.5">
                        <HardDrive size={12} className="text-blue-600" />
                        {plan.specs.nvme} GB NVMe
                      </li>
                    </ul>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Sticky Order Summary */}
        <aside className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs lg:sticky lg:top-20">
          <h2 className="font-display text-base font-extrabold text-slate-900">
            অর্ডার সামারি
          </h2>

          <dl className="mt-4 space-y-2.5 border-b border-slate-100 pb-4 text-xs">
            <div className="flex justify-between">
              <dt className="text-slate-500">প্ল্যান</dt>
              <dd className="font-bold text-slate-900">{selectedPlan.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">লোকেশন ও ISP</dt>
              <dd className="font-semibold text-slate-800">
                {activeCountry.short} · {carrier === "All" ? "Auto" : carrier}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">IP টাইপ</dt>
              <dd className="font-semibold text-slate-800">
                {isFresh ? "Virgin Static IP" : "Pre-Screened Clean IP"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">বিলিং সাইকেল</dt>
              <dd className="font-semibold text-slate-800">{cycle.label}</dd>
            </div>
          </dl>

          {/* Promo Code */}
          <div className="mt-4">
            <label
              htmlFor="dash-isp-coupon"
              className="mb-1.5 flex items-center gap-1 text-[11px] font-bold text-slate-700"
            >
              <Tag size={12} className="text-blue-600" />
              প্রোমো কোড (ঐচ্ছিক)
            </label>
            <div className="flex gap-2">
              <input
                id="dash-isp-coupon"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="যেমন: LAUNCH10"
                className="field py-2 text-xs uppercase"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="cursor-pointer rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50"
              >
                অ্যাপ্লাই
              </button>
            </div>
            {couponError && (
              <p className="mt-1 text-[11px] font-medium text-red-600">
                {couponError}
              </p>
            )}
            {appliedCoupon && (
              <p className="mt-1 text-[11px] font-semibold text-emerald-700">
                ✓ {appliedCoupon.code} অ্যাপ্লাই হয়েছে (-{formatPrice(couponSaving)})
              </p>
            )}
          </div>

          <div className="mt-4 flex items-baseline justify-between border-t border-slate-100 pt-4">
            <span className="text-xs font-bold text-slate-600">সর্বমোট বিল</span>
            <span className="font-display text-2xl font-black text-slate-900">
              {formatPrice(finalTotal)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleProceedCheckout}
            className="mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <span>চেকআউটে যান</span>
            <ArrowRight size={15} />
          </button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <RefreshCw size={12} className="text-emerald-600" />
            <span>৭-দিনের ফ্রি IP Swap · ডে ৮+ ৳৩৫০</span>
          </p>
        </aside>
      </div>
    </div>
  );
}