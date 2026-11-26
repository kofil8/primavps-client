"use client";

import { FocusedHeader } from "@/components/layout/FocusedHeader";
import { CountryFlag } from "@/components/ui/CountryFlag";
import {
  BkashLogo,
  NagadLogo,
  VisaLogo,
} from "@/components/ui/PaymentLogos";
import { useCurrency } from "@/lib/currency";
import { HOT_DEALS_LIST } from "@/lib/data/deals";
import { ISP_PLANS } from "@/lib/data/plans";
import {
  ArrowRight,
  Lock,
  RefreshCw,
  ShieldCheck,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";

const CYCLES = {
  monthly: { label: "১ মাস (Monthly)", months: 1, discount: 0 },
  quarterly: { label: "৩ মাস (Quarterly)", months: 3, discount: 0.05 },
  annual: { label: "১২ মাস (Annual)", months: 12, discount: 0.15 },
} as const;

type CycleKey = keyof typeof CYCLES;
type GatewayId = "UDDOKTAPAY" | "BKASH" | "NAGAD" | "SSLCOMMERZ";

const GATEWAYS: {
  id: GatewayId;
  name: string;
  subtitle: string;
  badge?: string;
  available: boolean;
}[] = [
  {
    id: "UDDOKTAPAY",
    name: "UddoktaPay (bKash, Nagad, Rocket, Upay)",
    subtitle: "যেকোনো মোবাইল ব্যাংকিং দিয়ে ইনস্ট্যান্ট অটোমেটেড পেমেন্ট",
    badge: "সবচেয়ে জনপ্রিয়",
    available: true,
  },
  {
    id: "BKASH",
    name: "bKash Direct Merchant",
    subtitle: "সরাসরি বিকাশ টোকেনাইজড চেকআউট",
    badge: "শীঘ্রই আসছে",
    available: false,
  },
  {
    id: "NAGAD",
    name: "Nagad Direct Merchant",
    subtitle: "নগদ অ্যাপ বা USSD দিয়ে দ্রুত পেমেন্ট",
    badge: "শীঘ্রই আসছে",
    available: false,
  },
  {
    id: "SSLCOMMERZ",
    name: "SSLCommerz (Card / Bank)",
    subtitle: "Visa, Mastercard, Amex ও ইন্টারনেট ব্যাংকিং",
    badge: "শীঘ্রই আসছে",
    available: false,
  },
];

function evaluateCoupon(codeRaw: string, orderType: "isp" | "cloud") {
  const code = codeRaw.trim().toUpperCase();
  if (!code) {
    return { appliedCoupon: "", discountPercent: 0, couponMsg: "" };
  }

  const deal = HOT_DEALS_LIST.find((d) => d.couponCode.toUpperCase() === code);
  if (!deal) {
    return {
      appliedCoupon: "",
      discountPercent: 0,
      couponMsg: "কুপন কোডটি সঠিক নয়।",
    };
  }

  const allowed =
    (deal as { applicableTo?: string[] }).applicableTo ?? ["isp", "cloud"];
  if (!allowed.includes(orderType)) {
    return {
      appliedCoupon: "",
      discountPercent: 0,
      couponMsg: `${code} শুধুমাত্র ${allowed.includes("cloud") ? "Cloud VPS" : "Residential ISP VPS"}-এ প্রযোজ্য।`,
    };
  }

  return {
    appliedCoupon: code,
    discountPercent: deal.discountPercent,
    couponMsg: `${code} অ্যাপ্লাই হয়েছে — ${deal.discountPercent}% ছাড়!`,
  };
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { formatPrice } = useCurrency();

  const orderType = searchParams.get("type") === "cloud" ? "cloud" : "isp";
  const planParam = (searchParams.get("plan") || "pro").toLowerCase();
  const country = (searchParams.get("country") || "us").toLowerCase();
  const carrier = searchParams.get("carrier") || "Auto (Best)";
  const location = searchParams.get("location") || "Ashburn, VA";
  const isFresh = searchParams.get("fresh") === "1";
  const rawCycle = (searchParams.get("cycle") || "monthly") as CycleKey;
  const cycleKey: CycleKey = rawCycle in CYCLES ? rawCycle : "monthly";
  const initialCoupon = (searchParams.get("coupon") || "").toUpperCase();
  const existingInvoiceId = searchParams.get("invoiceId");

  const matchedIsp =
    ISP_PLANS.find(
      (p) => p.id.toLowerCase() === planParam || p.tier === planParam,
    ) ?? ISP_PLANS[1];

  const cloudVcpu = Number(searchParams.get("vcpu") || 2);
  const cloudRam = Number(searchParams.get("ram") || 4);
  const cloudNvme = Number(searchParams.get("nvme") || 80);
  const cloudOs = searchParams.get("os") || "Ubuntu 24.04 LTS";
  const cloudPrice = Number(searchParams.get("price") || 1250);

  const productTitle =
    orderType === "cloud"
      ? `Cloud NVMe VPS (${cloudVcpu} vCPU / ${cloudRam} GB)`
      : `${matchedIsp.name} (${country.toUpperCase()})`;

  const productSubtitle =
    orderType === "cloud"
      ? `${cloudOs} · ${cloudNvme} GB NVMe · ${location}`
      : `${isFresh ? "Virgin" : "Clean"} ${carrier} Static ISP · Windows 11 RDP`;

  const baseMonthlyBdt =
    orderType === "cloud"
      ? cloudPrice
      : isFresh
        ? matchedIsp.priceFreshBdt
        : matchedIsp.priceBdt;

  const initialCouponState = evaluateCoupon(initialCoupon, orderType);

  const [gateway, setGateway] = useState<GatewayId>("UDDOKTAPAY");
  const [couponInput, setCouponInput] = useState(initialCoupon);
  const [appliedCoupon, setAppliedCoupon] = useState(
    initialCouponState.appliedCoupon,
  );
  const [discountPercent, setDiscountPercent] = useState(
    initialCouponState.discountPercent,
  );
  const [couponMsg, setCouponMsg] = useState(initialCouponState.couponMsg);
  const [agreed, setAgreed] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const checkCoupon = (codeRaw: string) => {
    const result = evaluateCoupon(codeRaw, orderType);
    setAppliedCoupon(result.appliedCoupon);
    setDiscountPercent(result.discountPercent);
    setCouponMsg(result.couponMsg);
  };

  const cycle = CYCLES[cycleKey];
  const subtotal = baseMonthlyBdt * cycle.months;
  const cycleDiscount = Math.round(subtotal * cycle.discount);
  const afterCycle = subtotal - cycleDiscount;
  const couponDiscount =
    discountPercent > 0 ? Math.round((afterCycle * discountPercent) / 100) : 0;
  const totalBdt = afterCycle - couponDiscount;

  const handlePay = async () => {
    if (!agreed || submitting) return;
    setSubmitting(true);

    const apiBase =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

    const token =
      typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
      let invoiceId = existingInvoiceId;

      if (!invoiceId) {
        const orderRes = await fetch(`${apiBase}/orders`, {
          method: "POST",
          headers,
          credentials: "include",
          body: JSON.stringify({
            productType: orderType === "cloud" ? "CLOUD_VPS" : "ISP_VPS",
            planSlug: orderType === "isp" ? matchedIsp.id : undefined,
            country: country.toUpperCase(),
            carrier: orderType === "isp" ? carrier : undefined,
            isFreshIp: isFresh,
            osName: orderType === "cloud" ? cloudOs : "Windows 11 Pro",
            regionName: location,
            cycle: cycleKey.toUpperCase(),
            couponCode: appliedCoupon || undefined,
            customSpecs:
              orderType === "cloud"
                ? { vcpu: cloudVcpu, ram: cloudRam, nvme: cloudNvme }
                : undefined,
          }),
        });

        if (orderRes.status === 401) {
          toast.error("অর্ডার করতে অনুগ্রহ করে আগে লগইন করুন।");
          router.push(
            `/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`,
          );
          return;
        }

        const orderJson = await orderRes.json();
        if (!orderRes.ok) {
          throw new Error(orderJson?.message || "অর্ডার তৈরি করতে সমস্যা হয়েছে।");
        }

        invoiceId =
          orderJson?.data?.invoice?.id ||
          orderJson?.data?.invoiceId ||
          orderJson?.invoice?.id ||
          orderJson?.invoiceId;
      }

      if (!invoiceId) {
        throw new Error("ইনভয়েস আইডি পাওয়া যায়নি।");
      }

      const payRes = await fetch(`${apiBase}/payments/initiate`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({
          invoiceId,
          gateway,
        }),
      });

      const payJson = await payRes.json();
      if (!payRes.ok) {
        throw new Error(payJson?.message || "পেমেন্ট গেটওয়ে চালু করা যায়নি।");
      }

      const paymentUrl = payJson?.data?.paymentUrl || payJson?.paymentUrl;
      if (!paymentUrl) {
        throw new Error("গেটওয়ে থেকে পেমেন্ট লিংক পাওয়া যায়নি।");
      }

      window.location.href = paymentUrl;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "পেমেন্ট প্রক্রিয়ায় ত্রুটি হয়েছে।";
      toast.error(message);
      setSubmitting(false);
    }
  };

  return (
    <>
      <FocusedHeader
        step={2}
        showSteps
        backHref={
          searchParams.get("from") === "dashboard"
            ? "/dashboard/isp-vps"
            : "/isp-vps"
        }
        backLabel="কনফিগারেশন পরিবর্তন করুন"
      />

      <main className="shell py-8 sm:py-12">
        <div className="mx-auto grid max-w-5xl items-start gap-6 lg:grid-cols-[1.45fr_1fr] lg:gap-8">
          <div className="space-y-5">
            <section className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                <h1 className="font-display text-lg font-extrabold text-slate-900 sm:text-xl">
                  অর্ডার সামারি ও পেমেন্ট
                </h1>
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                  {cycle.label}
                </span>
              </div>

              <div className="mt-4 flex items-start justify-between gap-4 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <CountryFlag code={country} size={22} />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900 sm:text-base">
                      {productTitle}
                    </h2>
                    <p className="mt-0.5 text-xs text-slate-600">
                      {productSubtitle}
                    </p>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                      <RefreshCw size={12} />
                      <span>
                        {orderType === "isp"
                          ? "৭-দিনের ফ্রি IP Swap সুবিধা অন্তর্ভুক্ত"
                          : "১ Gbps Unmetered + DDoS প্রোটেকশন"}
                      </span>
                    </p>
                  </div>
                </div>
                <p className="shrink-0 font-display text-base font-black text-slate-900">
                  {formatPrice(baseMonthlyBdt)}
                  <span className="text-xs font-normal text-slate-500">
                    /মাস
                  </span>
                </p>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="checkout-coupon"
                  className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-800"
                >
                  <Tag size={13} className="text-blue-600" />
                  <span>প্রোমো কোড</span>
                </label>
                <div className="flex gap-2">
                  <input
                    id="checkout-coupon"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder={orderType === "cloud" ? "CLOUD15" : "LAUNCH10"}
                    className="field flex-1 font-mono text-xs uppercase"
                  />
                  <button
                    type="button"
                    onClick={() => checkCoupon(couponInput)}
                    className="btn-outline px-4 text-xs"
                  >
                    Apply
                  </button>
                </div>
                {couponMsg && (
                  <p
                    className={`mt-1.5 text-xs font-semibold ${
                      discountPercent > 0 ? "text-emerald-700" : "text-red-600"
                    }`}
                  >
                    {couponMsg}
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:p-6">
              <h2 className="font-display text-base font-extrabold text-slate-900 sm:text-lg">
                পেমেন্ট মেথড নির্বাচন করুন
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                পেমেন্ট সম্পন্ন হওয়ার ৬০–৯০ সেকেন্ডের মধ্যে সার্ভার অ্যাক্টিভ
                হবে।
              </p>

              <div className="mt-4 space-y-2.5">
                {GATEWAYS.map((item) => {
                  const active = gateway === item.id && item.available;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={!item.available}
                      onClick={() => item.available && setGateway(item.id)}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl border p-3.5 text-left transition-all ${
                        !item.available
                          ? "cursor-not-allowed border-slate-200/70 bg-slate-50/70 opacity-60"
                          : active
                            ? "cursor-pointer border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/15"
                            : "cursor-pointer border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid size-4.5 shrink-0 place-items-center rounded-full border ${
                            active
                              ? "border-blue-600 bg-blue-600"
                              : "border-slate-300 bg-slate-100"
                          }`}
                        >
                          {active && (
                            <span className="size-1.5 rounded-full bg-white" />
                          )}
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">
                              {item.name}
                            </span>
                            {item.badge && (
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                  item.available
                                    ? "bg-pink-50 text-pink-700"
                                    : "bg-slate-200/80 text-slate-600"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-1.5">
                        {item.id === "UDDOKTAPAY" && (
                          <div className="flex items-center gap-1.5 rounded-lg bg-white px-2 py-1 shadow-2xs ring-1 ring-slate-200/80">
                            <BkashLogo className="h-4 w-auto" />
                            <NagadLogo className="h-4 w-auto" />
                          </div>
                        )}
                        {item.id === "BKASH" && (
                          <BkashLogo className="h-5 w-auto grayscale" />
                        )}
                        {item.id === "NAGAD" && (
                          <NagadLogo className="h-5 w-auto grayscale" />
                        )}
                        {item.id === "SSLCOMMERZ" && (
                          <VisaLogo className="h-4.5 w-auto grayscale" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-22">
            <h2 className="font-display text-base font-extrabold text-slate-900">
              পেমেন্ট বিবরণী
            </h2>

            <dl className="mt-4 space-y-2.5 border-y border-slate-100 py-4 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-600">
                <span>সাবটোটাল ({cycle.months} মাস)</span>
                <span className="font-mono font-semibold text-slate-900">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {cycleDiscount > 0 && (
                <div className="flex justify-between font-semibold text-emerald-700">
                  <span>বিলিং সাইকেল ছাড়</span>
                  <span className="font-mono">
                    −{formatPrice(cycleDiscount)}
                  </span>
                </div>
              )}

              {couponDiscount > 0 && (
                <div className="flex justify-between font-semibold text-emerald-700">
                  <span>কুপন ({appliedCoupon})</span>
                  <span className="font-mono">
                    −{formatPrice(couponDiscount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>গেটওয়ে ফি</span>
                <span className="font-semibold text-emerald-700">৳০ (ফ্রি)</span>
              </div>
            </dl>

            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <span className="block text-sm font-bold text-slate-900">
                  সর্বমোট পরিশোধযোগ্য
                </span>
                <span className="text-[11px] text-slate-500">
                  ভ্যাট ও ট্যাক্স অন্তর্ভুক্ত
                </span>
              </div>
              <span className="font-display text-2xl font-black text-slate-900 sm:text-3xl">
                {formatPrice(totalBdt)}
              </span>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-3 text-[11px] leading-relaxed text-slate-600">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 size-4 rounded border-slate-300 accent-blue-600"
              />
              <span>
                আমি{" "}
                <Link
                  href="/terms"
                  target="_blank"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Terms
                </Link>
                ,{" "}
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                এবং{" "}
                <Link
                  href="/refund-policy"
                  target="_blank"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Refund Policy
                </Link>{" "}
                মেনে অর্ডার করছি।
              </span>
            </label>

            <button
              type="button"
              disabled={!agreed || submitting}
              onClick={handlePay}
              className="mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Lock size={15} />
              <span>
                {submitting
                  ? "UddoktaPay গেটওয়েতে যাচ্ছে…"
                  : `${formatPrice(totalBdt)} পেমেন্ট করুন`}
              </span>
              {!submitting && <ArrowRight size={15} />}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>পেমেন্টের সাথে সাথে ইনভয়েস ও RDP অ্যাক্টিভেশন</span>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
          চেকআউট লোড হচ্ছে…
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
