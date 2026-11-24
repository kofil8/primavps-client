"use client";

import { CountryFlag } from "@/components/ui/CountryFlag";
import { useCurrency } from "@/lib/currency";
import { HOT_DEALS_LIST } from "@/lib/data/deals";
import { IspPlan } from "@/lib/data/plans";
import { ArrowRight, Lock, MapPin, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface CheckoutPlan {
  id?: string;
  name: string;
  tagline?: string;
  priceBdt: number;
  priceFreshBdt?: number;
  specs: {
    vcpu: number;
    ram: number;
    nvme: number;
    bandwidth: string;
  };
  isCloud?: boolean;
  osName?: string;
  regionName?: string;
}

interface CheckoutDrawerProps {
  plan: CheckoutPlan | IspPlan | null;
  carrier?: string;
  isFresh?: boolean;
  initialBillingCycle?: "monthly" | "quarterly" | "annual";
  initialCountry?: string;
  initialCoupon?: string;
  onClose: () => void;
}

const COUNTRY_CONFIGS: Record<
  string,
  {
    label: string;
    defaultCity: string;
    cities: string[];
    carriers: string[];
    ipGeoLabel: string;
    ipGeoNote: string;
  }
> = {
  us: {
    label: "United States",
    defaultCity: "Ashburn, VA",
    cities: ["Ashburn, VA", "Dallas, TX"],
    carriers: [
      "Auto (Best)",
      "AT&T",
      "Comcast",
      "Verizon",
      "Spectrum",
      "COX",
      "Frontier",
      "RCN",
    ],
    ipGeoLabel: "US Multi-State (Auto-Assigned)",
    ipGeoNote:
      "কোর সার্ভার Ashburn/Dallas-এ হোস্টেড। আপনার পছন্দের ক্যারিয়ারে US-এর জনপ্রিয় স্টেট (CA, FL, GA, IL, VA, TX ইত্যাদি) থেকে ক্লিন IP অ্যাসাইন হবে।",
  },
  uk: {
    label: "United Kingdom",
    defaultCity: "London, UK",
    cities: ["London, UK", "Manchester, UK"],
    carriers: ["Auto (Best)", "BT", "Virgin Media", "Vodafone UK"],
    ipGeoLabel: "UK Residential (Auto-Assigned)",
    ipGeoNote:
      "লন্ডন হাব থেকে আপনার পছন্দের UK ক্যারিয়ারের ক্লিন রেসিডেন্সিয়াল IP অ্যাসাইন হবে।",
  },
  de: {
    label: "Germany",
    defaultCity: "Frankfurt, DE",
    cities: ["Frankfurt, DE", "Berlin, DE"],
    carriers: ["Auto (Best)", "Deutsche Telekom", "Vodafone DE", "O2 DE"],
    ipGeoLabel: "Germany Residential (Auto-Assigned)",
    ipGeoNote:
      "ফ্রাঙ্কফুর্ট হাব থেকে আপনার পছন্দের জার্মান ক্যারিয়ারের ক্লিন রেসিডেন্সিয়াল IP অ্যাসাইন হবে।",
  },
  fr: {
    label: "France",
    defaultCity: "Paris, FR",
    cities: ["Paris, FR", "Marseille, FR"],
    carriers: ["Auto (Best)", "Orange", "Free", "SFR"],
    ipGeoLabel: "France Residential (Auto-Assigned)",
    ipGeoNote:
      "প্যারিস হাব থেকে আপনার পছন্দের ফ্রেঞ্চ ক্যারিয়ারের ক্লিন রেসিডেন্সিয়াল IP অ্যাসাইন হবে।",
  },
};

const CYCLES = [
  { id: "monthly", label: "১ মাস", months: 1, discount: 0 },
  { id: "quarterly", label: "৩ মাস", months: 3, discount: 0.05 },
  { id: "annual", label: "১২ মাস", months: 12, discount: 0.15 },
] as const;

function findCouponDiscount(code: string): number {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return 0;
  const match = HOT_DEALS_LIST.find(
    (d) => d.couponCode.toUpperCase() === normalized,
  );
  return match ? match.discountPercent : 0;
}

export function CheckoutDrawer({
  plan,
  carrier = "All",
  isFresh = false,
  initialBillingCycle = "monthly",
  initialCountry = "us",
  initialCoupon = "",
  onClose,
}: CheckoutDrawerProps) {
  const router = useRouter();
  const { formatPrice } = useCurrency();

  const normCountry = (initialCountry || "us").toLowerCase();
  const activeCountryConfig =
    COUNTRY_CONFIGS[normCountry] || COUNTRY_CONFIGS.us;

  const [selectedCarrier, setSelectedCarrier] = useState(
    carrier && carrier !== "All" ? carrier : activeCountryConfig.carriers[0],
  );
  const [location, setLocation] = useState(activeCountryConfig.defaultCity);
  const [billingCycle, setBillingCycle] =
    useState<(typeof CYCLES)[number]["id"]>(initialBillingCycle);

  const [coupon, setCoupon] = useState(initialCoupon);
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [redirecting, setRedirecting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    const config = COUNTRY_CONFIGS[normCountry] || COUNTRY_CONFIGS.us;
    setSelectedCarrier(
      carrier && carrier !== "All" ? carrier : config.carriers[0],
    );
    setLocation(
      plan && "regionName" in plan && plan.regionName
        ? plan.regionName
        : config.defaultCity,
    );
    setBillingCycle(initialBillingCycle);

    if (initialCoupon) {
      const pct = findCouponDiscount(initialCoupon);
      setCoupon(initialCoupon.toUpperCase());
      setAppliedDiscountPercent(pct);
      setCouponError("");
    }
  }, [
    plan,
    initialCountry,
    carrier,
    normCountry,
    initialBillingCycle,
    initialCoupon,
  ]);

  useEffect(() => {
    if (!plan) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [plan, onClose]);

  if (!plan) return null;

  const isCloud = "isCloud" in plan && plan.isCloud;
  const basePrice =
    !isCloud && isFresh && "priceFreshBdt" in plan && plan.priceFreshBdt
      ? plan.priceFreshBdt
      : plan.priceBdt;

  const cycle = CYCLES.find((item) => item.id === billingCycle) ?? CYCLES[0];
  const subtotal = basePrice * cycle.months;
  const cycleSavings = Math.round(subtotal * cycle.discount);
  const afterCycle = subtotal - cycleSavings;
  const couponSavings =
    appliedDiscountPercent > 0
      ? Math.round((afterCycle * appliedDiscountPercent) / 100)
      : 0;
  const total = afterCycle - couponSavings;

  const applyCoupon = (event: React.FormEvent) => {
    event.preventDefault();
    const pct = findCouponDiscount(coupon);
    if (pct > 0) {
      setAppliedDiscountPercent(pct);
      setCouponError("");
    } else {
      setAppliedDiscountPercent(0);
      setCouponError("কুপন কোডটি সঠিক নয়।");
    }
  };

  const proceedToCheckout = () => {
    setRedirecting(true);
    const params = new URLSearchParams({
      plan: plan.id || plan.name.toLowerCase().replace(/\s+/g, "-"),
      country: normCountry,
      carrier: selectedCarrier,
      location: isCloud ? location : "auto",
      cycle: billingCycle,
      fresh: isFresh ? "1" : "0",
    });
    if (appliedDiscountPercent > 0 && coupon.trim()) {
      params.set("coupon", coupon.trim().toUpperCase());
    }

    router.push(`/checkout?${params.toString()}`);
  };

  const optionClass = (active: boolean) =>
    `cursor-pointer rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-colors ${
      active
        ? "border-blue-600 bg-blue-50 text-blue-900"
        : "border-slate-200 text-slate-600 hover:border-slate-300"
    }`;

  return (
    <div
      className="fixed inset-0 z-[60] flex justify-end bg-slate-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <button
        type="button"
        className="hidden flex-1 cursor-default sm:block"
        aria-label="Close checkout"
        onClick={onClose}
      />

      <div className="flex h-dvh w-full max-w-full flex-col border-l border-slate-200 bg-white sm:max-w-md">
        {/* Fixed Header */}
        <div className="flex shrink-0 items-start justify-between border-b border-slate-200 px-4 py-3.5 sm:px-6 sm:py-4">
          <div className="min-w-0 pr-2">
            <div className="flex items-center gap-1.5">
              <CountryFlag code={normCountry} size={14} />
              <p className="truncate text-[11px] font-bold uppercase tracking-wider text-blue-700">
                অর্ডার কনফিগারেশন · {activeCountryConfig.label}
              </p>
            </div>
            <h2
              id="checkout-title"
              className="mt-0.5 truncate font-display text-base font-extrabold text-slate-900 sm:text-lg"
            >
              {plan.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="Close checkout"
          >
            <X size={18} />
          </button>
        </div>

        {/* Independently Scrollable Body */}
        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4 text-sm sm:px-6 sm:py-5">
          {/* Summary Pill */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3.5">
            <p className="text-xs font-bold text-slate-800">
              {plan.specs.vcpu} vCPU · {plan.specs.ram} GB RAM ·{" "}
              {plan.specs.nvme} GB NVMe
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {isCloud
                ? `${plan.osName || "Cloud VPS"} · ${location}`
                : `${isFresh ? "Virgin" : "Clean"} ${selectedCarrier} IP · ${activeCountryConfig.ipGeoLabel}`}
            </p>
          </div>

          {/* Carrier Selector (ISP Plans) */}
          {!isCloud && (
            <div>
              <p className="mb-2 text-xs font-bold text-slate-900">
                পছন্দের ISP / ক্যারিয়ার (ASN)
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {activeCountryConfig.carriers.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelectedCarrier(item)}
                    className={optionClass(selectedCarrier === item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Location: Selectable for Cloud VPS, Transparent Auto-Assign Info for Residential ISP */}
          {isCloud ? (
            <div>
              <p className="mb-2 text-xs font-bold text-slate-900">
                সার্ভার লোকেশন
              </p>
              <div className="grid grid-cols-2 gap-2">
                {activeCountryConfig.cities.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setLocation(item)}
                    className={optionClass(location === item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2.5 rounded-xl border border-blue-100 bg-blue-50/50 p-3 text-xs">
              <MapPin
                size={15}
                className="mt-0.5 shrink-0 text-blue-600"
                aria-hidden="true"
              />
              <div>
                <p className="font-bold text-slate-900">
                  {activeCountryConfig.ipGeoLabel}
                </p>
                <p className="mt-0.5 leading-relaxed text-slate-600">
                  {activeCountryConfig.ipGeoNote}
                </p>
              </div>
            </div>
          )}

          {/* Billing Cycle */}
          <div>
            <p className="mb-2 text-xs font-bold text-slate-900">
              বিলিং সাইকেল
            </p>
            <div className="grid grid-cols-3 gap-2">
              {CYCLES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setBillingCycle(item.id)}
                  className={optionClass(billingCycle === item.id)}
                >
                  <span className="block">{item.label}</span>
                  <span className="block text-[10px] font-medium text-emerald-700">
                    {item.discount === 0
                      ? "রেগুলার"
                      : `−${item.discount * 100}%`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Promo Code */}
          <form onSubmit={applyCoupon}>
            <label
              htmlFor="coupon"
              className="mb-1.5 block text-xs font-bold text-slate-900"
            >
              প্রোমো কোড (যদি থাকে)
            </label>
            <div className="flex gap-2">
              <input
                id="coupon"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value);
                  if (appliedDiscountPercent > 0) setAppliedDiscountPercent(0);
                }}
                placeholder="LAUNCH10"
                className="field flex-1 font-mono text-xs uppercase"
              />
              <button
                type="submit"
                disabled={!coupon.trim()}
                className="btn-outline px-4 text-xs"
              >
                {appliedDiscountPercent > 0 ? "Applied" : "Apply"}
              </button>
            </div>
            {appliedDiscountPercent > 0 && (
              <p className="mt-1.5 text-xs font-semibold text-emerald-700">
                {coupon.toUpperCase()} অ্যাপ্লাই হয়েছে —{" "}
                {appliedDiscountPercent}% ছাড়!
              </p>
            )}
            {couponError && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {couponError}
              </p>
            )}
          </form>

          {/* Price Breakdown */}
          <div className="rounded-xl border border-slate-200 p-4 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>
                {formatPrice(basePrice)} × {cycle.months} মাস
              </span>
              <span className="font-mono font-semibold">
                {formatPrice(subtotal)}
              </span>
            </div>
            {(cycleSavings > 0 || couponSavings > 0) && (
              <div className="mt-1.5 flex justify-between font-semibold text-emerald-700">
                <span>মোট ছাড়</span>
                <span className="font-mono">
                  −{formatPrice(cycleSavings + couponSavings)}
                </span>
              </div>
            )}
            <div className="mt-3 flex items-baseline justify-between border-t border-slate-200 pt-3">
              <div>
                <span className="block text-sm font-bold text-slate-900">
                  সর্বমোট পেমেন্ট
                </span>
                <span className="block text-[10px] text-slate-500">
                  (সকল মূল্যের সাথে প্রযোজ্য ভ্যাট/ট্যাক্স অন্তর্ভুক্ত)
                </span>
              </div>
              <span className="font-display text-2xl font-black text-slate-900">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Sticky Footer CTA (Safe-area padded for iOS/Android) */}
        <div className="shrink-0 space-y-3 border-t border-slate-200 bg-white px-4 py-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-4">
          {/* Mandatory DBID & SSLCOMMERZ Terms Agreement Checkbox */}
          <div className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 p-2.5 text-[11px] text-slate-700">
            <input
              id="checkout-agree"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="checkout-agree" className="cursor-pointer leading-relaxed text-slate-600">
              আমি{" "}
              <Link href="/terms" target="_blank" className="font-semibold text-blue-600 hover:underline">
                শর্তাবলী
              </Link>
              ,{" "}
              <Link href="/privacy-policy" target="_blank" className="font-semibold text-blue-600 hover:underline">
                গোপনীয়তা নীতি
              </Link>{" "}
              এবং{" "}
              <Link href="/refund-policy" target="_blank" className="font-semibold text-blue-600 hover:underline">
                রিফান্ড পলিসি
              </Link>{" "}
              পড়েছি এবং এতে সম্মতি জানাচ্ছি।
            </label>
          </div>

          <button
            type="button"
            onClick={proceedToCheckout}
            disabled={!agreedToTerms || redirecting}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Lock size={15} />
            <span>
              {redirecting
                ? "চেকআউটে যাওয়া হচ্ছে…"
                : "লগইন ও পেমেন্টে এগিয়ে যান"}
            </span>
            {!redirecting && <ArrowRight size={16} />}
          </button>
          <p className="text-center text-[11px] text-slate-500">
            বিকাশ · নগদ · রকেট · ভিসা · মাস্টারকার্ড · SSLCOMMERZ সিকিউর পেমেন্ট
          </p>
        </div>
      </div>
    </div>
  );
}
