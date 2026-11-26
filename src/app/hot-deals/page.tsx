import { CouponCard } from "@/components/deals/CouponCard";
import { DealsHero } from "@/components/deals/DealsHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { HOT_DEALS_LIST, MAX_DISCOUNT_PERCENT } from "@/lib/data/deals";
import { faqSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { HelpCircle, Tag } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = pageSeo({
  title: `VPS Hot Deals & Promo Codes — Save up to ${MAX_DISCOUNT_PERCENT}%`,
  description: `Verified promo codes for residential ISP VPS and NVMe cloud servers. Save up to ${MAX_DISCOUNT_PERCENT}% on your first month — pay with bKash, Nagad, card, or sslcommerz.`,
  path: "/hot-deals",
  keywords: [
    "VPS promo code Bangladesh",
    "ISP VPS discount",
    "bKash VPS offer",
    "residential VPS coupon",
  ],
});

const FAQ_ITEMS = [
  {
    q: "কুপন কোড কীভাবে ব্যবহার করব?",
    a: "যেকোনো কার্ডের 'কপি করুন' বাটনে ক্লিক করে কোডটি কপি করুন অথবা 'অফারসহ অর্ডার করুন' বাটনে ক্লিক করুন। চেকআউটে কোড বসালেই প্রথম মাসের বিলে ডিসকাউন্ট কমে যাবে।",
  },
  {
    q: "ডিসকাউন্ট কি শুধু প্রথম মাসের জন্য?",
    a: "হ্যাঁ, সব প্রোমো কোড নতুন অর্ডারের প্রথম মাসের (First Invoice) জন্য প্রযোজ্য। পরবর্তী মাস থেকে রেগুলার মূল্যে রিনিউ হবে।",
  },
  {
    q: "বিকাশ ও নগদে কি কুপন কোড কাজ করবে?",
    a: "অবশ্যই। বিকাশ, নগদ, রকেট, কার্ড ও sslcommerz—সব পেমেন্ট মেথডেই কুপন কোড ব্যবহার করা যাবে।",
  },
  {
    q: "অফারে কেনা সার্ভারেও কি ৭-দিনের IP Swap থাকবে?",
    a: "হ্যাঁ, প্রতিটি রেসিডেন্সিয়াল ISP প্ল্যানে আমাদের ৭-দিনের ফ্রি IP Swap গ্যারান্টি সম্পূর্ণভাবে প্রযোজ্য থাকবে।",
  },
];

export default function HotDealsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <JsonLd data={faqSchema(FAQ_ITEMS.map(({ q, a }) => ({ q, a })))} />

      {/* 1. Original Flash Sale Hero */}
      <DealsHero />

      {/* 2. Verified Coupons Grid */}
      <section
        id="coupons-section"
        aria-labelledby="coupons-heading"
        className="scroll-mt-24 bg-white py-14 sm:py-20"
      >
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
              <Tag size={14} aria-hidden="true" />
              Exclusive Vouchers
            </span>
            <h2
              id="coupons-heading"
              className="mt-2 font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            >
              ভেরিফায়েড কুপন ও প্রোমো কোড
            </h2>
            <p className="mt-2.5 text-sm text-slate-600 sm:text-base">
              পছন্দের প্ল্যানের কোড কপি করে চেকআউটে বসান—প্রথম মাসেই সরাসরি
              ছাড়।
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HOT_DEALS_LIST.map((deal) => (
              <CouponCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Compact FAQ */}
      <section
        aria-labelledby="deals-faq-heading"
        className="border-t border-slate-200 bg-slate-50 py-14 sm:py-16"
      >
        <div className="shell max-w-3xl">
          <div className="text-center">
            <span className="inline-flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
              <HelpCircle size={14} aria-hidden="true" />
              Deal Terms
            </span>
            <h2
              id="deals-faq-heading"
              className="mt-2 font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
            >
              হট ডিলস সম্পর্কে সাধারণ প্রশ্ন
            </h2>
          </div>

          <div className="mt-8 grid gap-3.5">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs"
              >
                <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                  {item.q}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
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
