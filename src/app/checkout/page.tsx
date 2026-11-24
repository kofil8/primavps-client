"use client";

import {
  BkashLogo,
  NagadLogo,
  RocketLogo,
  SslcommerzLogo,
  VisaLogo,
} from "@/components/ui/PaymentLogos";
import { COMPANY_INFO } from "@/lib/config/company";
import { useCurrency } from "@/lib/currency";
import { ISP_PLANS } from "@/lib/data/plans";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Lock,
  Phone,
  Server,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function CheckoutOrderReview() {
  const searchParams = useSearchParams();
  const { formatPrice } = useCurrency();

  const planSlug = searchParams.get("plan") || "starter";
  const country = (searchParams.get("country") || "us").toUpperCase();
  const carrier = searchParams.get("carrier") || "Auto (Best IP)";
  const cycle = searchParams.get("cycle") || "monthly";
  const isFresh = searchParams.get("fresh") === "1";

  const matchedPlan =
    ISP_PLANS.find(
      (p) =>
        p.id.toLowerCase() === planSlug.toLowerCase() ||
        p.tier.toLowerCase() === planSlug.toLowerCase(),
    ) || ISP_PLANS[0];

  const basePrice = isFresh
    ? matchedPlan.priceFreshBdt
    : matchedPlan.priceBdt;

  const cycleMonths = cycle === "annual" ? 12 : cycle === "quarterly" ? 3 : 1;
  const cycleDiscount = cycle === "annual" ? 0.15 : cycle === "quarterly" ? 0.05 : 0;
  const finalMonthly = Math.round(basePrice * (1 - cycleDiscount));
  const finalTotal = finalMonthly * cycleMonths;

  const [paymentMethod, setPaymentMethod] = useState<"sslcommerz" | "bkash" | "nagad" | "rocket">("sslcommerz");
  const [agreed, setAgreed] = useState(true);
  const [processing, setProcessing] = useState(false);

  const handlePayNow = () => {
    setProcessing(true);
    // Simulates redirect to SSLCOMMERZ gateway or bKash merchant checkout
    setTimeout(() => {
      alert("SSLCOMMERZ পেমেন্ট গেটওয়েতে রিডাইরেক্ট করা হচ্ছে... (Sandbox / Demo Mode)");
      setProcessing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-14 text-slate-800">
      <div className="shell max-w-4xl">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/isp-vps"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600"
          >
            <ArrowLeft size={14} />
            <span>সার্ভার তালিকায় ফিরুন</span>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Order Summary & Payment Selection (7 cols) */}
          <div className="space-y-6 lg:col-span-7">
            {/* Header */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-center gap-2 text-blue-700">
                <ShieldCheck size={20} className="text-blue-600" />
                <h1 className="font-display text-xl font-extrabold text-slate-900">
                  নিরাপদ চেকআউট ও পেমেন্ট
                </h1>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                SSLCOMMERZ 256-bit এনক্রিপ্টেড গেটওয়ের মাধ্যমে শতভাগ সুরক্ষিত লেনদেন
              </p>

              {/* Server Details */}
              <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="flex items-center gap-1.5 text-sm">
                    <Server size={15} className="text-blue-600" />
                    {matchedPlan.name} ({country} ISP)
                  </span>
                  <span className="font-mono text-sm">{formatPrice(finalMonthly)}/মাস</span>
                </div>
                <div className="mt-2 space-y-1 text-slate-600">
                  <p>• ক্যারিয়ার: <strong>{carrier}</strong></p>
                  <p>• স্পেসিফিকেশন: {matchedPlan.specs.vcpu} vCPU, {matchedPlan.specs.ram}GB RAM, {matchedPlan.specs.nvme}GB NVMe</p>
                  <p>• বিলিং মেয়াদ: {cycleMonths} মাস {cycleDiscount > 0 && `(${cycleDiscount * 100}% ডিসকাউন্ট)`}</p>
                  <p>• আইপি টাইপ: {isFresh ? "Virgin Unassigned Static ISP" : "Clean Static Residential ISP"}</p>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-slate-500">
                পেমেন্ট মাধ্যম নির্বাচন করুন
              </h2>

              <div className="mt-4 space-y-2.5">
                {/* SSLCOMMERZ All-in-one */}
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all ${
                    paymentMethod === "sslcommerz"
                      ? "border-blue-600 bg-blue-50/50 shadow-xs"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "sslcommerz"}
                      onChange={() => setPaymentMethod("sslcommerz")}
                      className="size-4 text-blue-600"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        SSLCOMMERZ পেমেন্ট গেটওয়ে (সবগুলো মাধ্যম)
                      </p>
                      <p className="text-[11px] text-slate-500">
                        bKash, Nagad, Rocket, VISA, Mastercard, Amex, Net Banking
                      </p>
                    </div>
                  </div>
                  <div className="rounded bg-slate-900 px-2 py-0.5">
                    <SslcommerzLogo className="h-4 w-auto" />
                  </div>
                </label>

                {/* Direct bKash */}
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all ${
                    paymentMethod === "bkash"
                      ? "border-pink-600 bg-pink-50/40 shadow-xs"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "bkash"}
                      onChange={() => setPaymentMethod("bkash")}
                      className="size-4 text-pink-600"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        বিকাশ সরাসরি মার্চেন্ট পেমেন্ট
                      </p>
                      <p className="text-[11px] text-slate-500">
                        তাৎক্ষণিক অটো-ভেরিফিকেশন ও ডেলিভারি
                      </p>
                    </div>
                  </div>
                  <BkashLogo className="h-4 w-auto" />
                </label>

                {/* Direct Nagad */}
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all ${
                    paymentMethod === "nagad"
                      ? "border-orange-600 bg-orange-50/40 shadow-xs"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "nagad"}
                      onChange={() => setPaymentMethod("nagad")}
                      className="size-4 text-orange-600"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        নগদ সরাসরি মার্চেন্ট পেমেন্ট
                      </p>
                      <p className="text-[11px] text-slate-500">
                        দ্রুততম অটোমেটেড পেমেন্ট
                      </p>
                    </div>
                  </div>
                  <NagadLogo className="h-4 w-auto" />
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Mandatory Compliance Agreement (5 cols) */}
          <div className="space-y-5 lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h2 className="font-display text-base font-bold text-slate-900">
                মূল্য ও বিলিং বিবরণ
              </h2>

              <div className="mt-4 space-y-2 border-b border-slate-100 pb-4 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>সাবস্ক্রিপশন ফি ({cycleMonths} মাস)</span>
                  <span className="font-mono font-semibold">{formatPrice(basePrice * cycleMonths)}</span>
                </div>
                {cycleDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>সাইকেল ডিসকাউন্ট ({cycleDiscount * 100}%)</span>
                    <span className="font-mono">−{formatPrice((basePrice * cycleMonths) - finalTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>ভ্যাট ও সার্ভিস চার্জ</span>
                  <span className="font-semibold text-emerald-700">অন্তর্ভুক্ত (০.০০)</span>
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-900">পরিশোধযোগ্য মোট</span>
                  <p className="text-[10px] text-slate-500">(সকল সরকারি কর অন্তর্ভুক্ত)</p>
                </div>
                <span className="font-display text-2xl font-black text-slate-900">
                  {formatPrice(finalTotal)}
                </span>
              </div>

              {/* Mandatory Policy Consent */}
              <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/50 p-3 text-[11.5px]">
                <label className="flex cursor-pointer items-start gap-2">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="leading-snug text-slate-700">
                    আমি {COMPANY_INFO.brandName}-এর{" "}
                    <Link href="/terms" target="_blank" className="font-semibold text-blue-600 underline">
                      শর্তাবলী
                    </Link>
                    ,{" "}
                    <Link href="/privacy-policy" target="_blank" className="font-semibold text-blue-600 underline">
                      গোপনীয়তা নীতি
                    </Link>{" "}
                    এবং{" "}
                    <Link href="/refund-policy" target="_blank" className="font-semibold text-blue-600 underline">
                      রিফান্ড পলিসি
                    </Link>{" "}
                    পড়েছি এবং এতে সম্মতি জানাচ্ছি।
                  </span>
                </label>
              </div>

              <button
                type="button"
                onClick={handlePayNow}
                disabled={!agreed || processing}
                className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Lock size={15} />
                <span>
                  {processing ? "পেমেন্ট গেটওয়েতে রিডাইরেক্ট হচ্ছে..." : `পে করুন — ${formatPrice(finalTotal)}`}
                </span>
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] text-slate-500">
                <Clock size={12} className="text-emerald-600" />
                <span>পেমেন্ট সফল হলে ৬০–৯০ সেকেন্ডে অটো-ডেলিভারি</span>
              </div>
            </div>

            {/* Support Guarantee */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-600 shadow-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>৭ দিনের ফ্রি IP Swap ও সাপোর্ট গ্যারান্টি</span>
              </div>
              <p className="mt-1.5 leading-relaxed">
                কোনো টেকনিক্যাল সমস্যা হলে আমাদের ঢাকা বনানী সাপোর্ট টিম ২৪/৭ প্রস্তুত।
              </p>
              <p className="mt-2 text-slate-800">
                হটলাইন: <strong className="font-mono text-blue-600">{COMPANY_INFO.contact.phoneDisplay}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="shell py-20 text-center text-slate-500">চেকআউট লোড হচ্ছে...</div>}>
      <CheckoutOrderReview />
    </Suspense>
  );
}
