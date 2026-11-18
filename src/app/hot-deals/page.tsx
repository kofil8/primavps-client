import { CouponCard } from "@/components/deals/CouponCard";
import { DealsFeatures } from "@/components/deals/DealsFeatures";
import { DealsHero } from "@/components/deals/DealsHero";
import { DealsSupportBanner } from "@/components/deals/DealsSupportBanner";
import { HOT_DEALS_LIST } from "@/lib/data/deals";
import { ArrowRight, HelpCircle, ShieldCheck, Tag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HOT Deals & Flash Sales | PrimeVPS BD",
  description:
    "Exclusive limited-time flash sales and promo discounts on NVMe Cloud VPS, Residential Survey VPS, Virgin US IPs, and Reseller clusters.",
};

const FAQ_ITEMS = [
  {
    q: "How do I redeem my coupon code?",
    a: "Click 'Get Coupon Code' on any card above to copy it to your clipboard. Select your desired server configuration, and paste the code into the promo code field during checkout to receive your discount instantly.",
  },
  {
    q: "Can I combine multiple coupon codes?",
    a: "Only one coupon code may be redeemed per server deployment. However, you can use different coupons across distinct products in separate orders.",
  },
  {
    q: "What payment methods are supported?",
    a: "We accept local Bangladeshi payment methods including bKash, Nagad, Rocket, local bank transfer, as well as International Visa/MasterCard, PayPal, and major Cryptocurrencies (USDT, BTC).",
  },
  {
    q: "Is there a money-back or IP replacement guarantee?",
    a: "Yes. All our Residential and Virgin ISP VPS plans come with our 7-Day clean IP guarantee. If your assigned residential IP encounters fraud score issues, we replace it free of charge within 7 days.",
  },
];

export default function HotDealsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Flash Sale Hero with Countdown & /public/promotion.webp graphic */}
      <DealsHero />

      {/* 2. Interactive Coupon Codes Section (Anchor target) */}
      <section id="coupons-section" className="section bg-white scroll-mt-20">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow flex items-center justify-center gap-1.5">
              <Tag size={14} />
              Exclusive Vouchers
            </span>
            <h2 className="section-title mt-2">
              Verified Flash Coupons & Promo Codes
            </h2>
            <p className="lede">
              Copy any promotional code below to unlock special introductory pricing.
              All coupon codes are tested and valid for new deployments.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOT_DEALS_LIST.map((deal) => (
              <CouponCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Fast, Reliable & Scalable Infrastructure Features */}
      <DealsFeatures />

      {/* 4. Growth & Tools Promotion Banner */}
      <section className="section bg-gradient-to-b from-white to-slate-50">
        <div className="shell">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg sm:p-12 lg:flex lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <ShieldCheck size={14} />
                Complimentary Diagnostics Included
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Grow Your Business with Powerful VPS Tools & Insights
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Every deal comes with unrestricted access to our diagnostic toolset.
                Verify IP fraud scores, inspect WebRTC leak risks, and audit network latency
                before and after provisioning.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-0 lg:shrink-0">
              <Link
                href="/tools/ip-checker"
                className="btn-primary"
              >
                IP Fraud Checker
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/tools/webrtc-test"
                className="btn-outline"
              >
                WebRTC Leak Test
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 24/7 Support Banner */}
      <DealsSupportBanner />

      {/* 6. Frequently Asked Questions & Deal Terms */}
      <section className="section bg-slate-50 border-t border-slate-200">
        <div className="shell max-w-4xl">
          <div className="text-center">
            <span className="eyebrow flex items-center justify-center gap-1.5">
              <HelpCircle size={14} />
              Clear & Transparent
            </span>
            <h2 className="section-title mt-2">
              Frequently Asked Questions About Hot Deals
            </h2>
            <p className="lede">
              Everything you need to know about redeeming promotional discounts and service terms.
            </p>
          </div>

          <div className="mt-10 grid gap-4">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.q}
                className="card p-5 sm:p-6 shadow-xs transition-shadow hover:shadow-md"
              >
                <h4 className="text-base font-bold text-slate-900">
                  {item.q}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
