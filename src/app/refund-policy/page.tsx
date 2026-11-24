import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { COMPANY_INFO } from "@/lib/config/company";
import { pageSeo } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageSeo({
  title: "রিফান্ড, রিটার্ন ও ক্যানসেলেশন পলিসি (Refund & Cancellation Policy)",
  description:
    "Official Refund, Return, 7-Day IP Replacement, and Cancellation Policy for primavps with SSLCOMMERZ compliance.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <LegalPageShell
      titleBn="রিফান্ড, রিটার্ন ও ক্যানসেলেশন পলিসি"
      titleEn="Refund, Return & Cancellation Policy"
      subtitleBn="গ্রাহক সন্তুষ্টি ও স্বচ্ছ সেবার নিশ্চয়তায় আমাদের নীতিমালা"
      subtitleEn="Official Refund, Replacement, and Cancellation Guidelines"
      lastUpdated="২৪ নভেম্বর, ২০২৬"
      childrenBn={
        <div className="space-y-8 text-sm leading-relaxed text-slate-700">
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              ১. রিফান্ড পাওয়ার যোগ্যতা (Refund Eligibility)
            </h2>
            <p>
              {COMPANY_INFO.brandName}-এ আমরা শতভাগ স্বচ্ছ ও উন্নত সেবা প্রদানে অঙ্গীকারবদ্ধ। অর্ডার ও পেমেন্ট সফল হওয়ার পর যদি আমাদের অভ্যন্তরীণ টেকনিক্যাল ত্রুটি বা সার্ভার সমস্যার কারণে সার্ভিস সক্রিয় না হয় এবং আমাদের টেকনিক্যাল টিম ২৪ ঘণ্টার মধ্যে তা সমাধান করতে ব্যর্থ হয়, তবে গ্রাহক প্রদেয় মূল্যের <strong>১০০% পূর্ণ রিফান্ড</strong> পাওয়ার অধিকারী হবেন।
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              ২. ৭ দিনের ফ্রি IP সোয়াপ / রিপ্লেসমেন্ট সুবিধা (7-Day IP Replacement)
            </h2>
            <p>
              আমরা প্রতিটি রেসিডেন্সিয়াল সার্ভার ডেলিভারির পূর্বে কঠোরভাবে ফ্রড স্কোর ও লিক টেস্ট করে থাকি। তা সত্ত্বেও, ডেলিভারির প্রথম <strong>৭ দিনের মধ্যে</strong> আইপিতে কোনো রুটিন বা টেকনিক্যাল সমস্যা শনাক্ত হলে গ্রাহক <strong>বিনামূল্যে ১ (এক) বার আইপি পরিবর্তন (Swap)</strong> করে নিতে পারবেন। সাপোর্ট হেল্পডেস্কে টিকিট বা মেসেজ দেওয়ার পর যাচাই সাপেক্ষে দ্রুত নতুন আইপি কনফিগার করে দেওয়া হয়।
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              ৩. অফেরতযোগ্য শর্তাবলী (Non-Refundable Circumstances)
            </h2>
            <p>
              যেহেতু আমাদের সার্ভিসটি ডিজিটাল ক্লাউড ইনফ্রাস্ট্রাকচার ও ডেডিকেটেড ব্যbandwidth রিসোর্স:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-slate-700">
              <li>সার্ভার সফলভাবে সক্রিয় এবং ক্রেতা কর্তৃক ব্যবহৃত হওয়ার পর কোনো রিফান্ড প্রযোজ্য হবে না।</li>
              <li>গ্রাহকের ব্যক্তিগত সিদ্ধান্ত পরিবর্তন (Change of Mind) বা নিজস্ব প্রয়োজন শেষ হয়ে যাওয়ার কারণে রিফান্ড প্রদান করা হবে না।</li>
              <li>গ্রাহকের নিজস্ব অবহেলা, সিস্টেম ওভারলোড বা ব্যবহারের নীতিমালা (AUP) লঙ্ঘনের দায়ে যদি আপস্ট্রিম ক্যারিয়ার বা তৃতীয় পক্ষ কর্তৃক আইপি ব্লক হয়, তবে কোনো অর্থ ফেরত দেওয়া হবে না।</li>
            </ul>
          </section>

          <section className="space-y-3">
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-5 text-blue-950">
              <h2 className="font-display text-base font-bold text-blue-900">
                ৪. রিফান্ড প্রসেসিং সময় ও মাধ্যম (Refund Processing Timeline — SSLCOMMERZ Compliance)
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-blue-900">
                গ্রাহকের রিফান্ড আবেদন যথাযথ পর্যালোচনার পর অনুমোদিত হলে, পেমেন্ট মাধ্যম (বিকাশ, নগদ, রকেট বা ব্যাংক ডেবিট/ক্রেডিট কার্ড) অনুযায়ী <strong>৭ থেকে ১০ কার্যদিবসের (7 to 10 Working Days)</strong> মধ্যে গ্রাহকের যে অ্যাকাউন্ট থেকে টাকা পরিশোধ করা হয়েছিল ঠিক সেই মূল অ্যাকাউন্টে অর্থ স্বয়ংক্রিয়ভাবে ফেরত পাঠানো হবে।
              </p>
              <p className="mt-2 text-xs text-blue-700">
                * ব্যাংক বা এমএফএস (MFS) প্রসেসিং ছুটির দিনের ওপর নির্ভর করে সময়ে সামান্য তারতম্য ঘটতে পারে।
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              ৫. ক্যানসেলেশন ও রিফান্ড আবেদনের নিয়ম (How to Request)
            </h2>
            <p>
              সার্ভিস ক্যানসেল বা রিফান্ড আবেদন করতে গ্রাহক তার ইনভয়েস নম্বর ও অর্ডার আইডি উল্লেখপূর্বক আমাদের সাপোর্ট টিমে যোগাযোগ করবেন:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-slate-700">
              <li>ইমেইল: <a href={`mailto:${COMPANY_INFO.contact.billingEmail}`} className="font-semibold text-blue-600 hover:underline">{COMPANY_INFO.contact.billingEmail}</a></li>
              <li>হটলাইন: <a href={`tel:${COMPANY_INFO.contact.phoneTel}`} className="font-semibold text-blue-600 hover:underline">{COMPANY_INFO.contact.phoneDisplay}</a></li>
            </ul>
          </section>
        </div>
      }
      childrenEn={
        <div className="space-y-8 text-sm leading-relaxed text-slate-700">
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              1. Refund Eligibility
            </h2>
            <p>
              {COMPANY_INFO.brandName} is dedicated to delivering industry-standard cloud and ISP services. If, following successful payment, your instance fails to activate due to an internal technical malfunction on our end, and our engineering desk is unable to resolve it within <strong>24 hours</strong>, you will be entitled to a <strong>100% full refund</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              2. 7-Day Unconditional Free IP Replacement
            </h2>
            <p>
              Every dedicated residential IP undergoes strict fraud-score and WebRTC leak checks prior to provisioning. However, if any unexpected connectivity or carrier routing issue is encountered within the first <strong>7 days</strong> of delivery, we provide <strong>1 (one) complimentary fresh IP swap</strong> upon request.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              3. Non-Refundable Conditions
            </h2>
            <p>
              Given the nature of dedicated digital infrastructure and immediate upstream resource reservation:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-slate-700">
              <li>No refunds are provided once the instance has been successfully handed over and utilized.</li>
              <li>Change of mind or lack of client-side readiness does not qualify for a refund.</li>
              <li>Accounts terminated for violating our Acceptable Use Policy (AUP) forfeit all refund privileges.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-5 text-blue-950">
              <h2 className="font-display text-base font-bold text-blue-900">
                4. Refund Processing Timeline (SSLCOMMERZ Compliance)
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-blue-900">
                Upon verification and formal approval of an eligible refund request, the refunded amount will be credited back directly to the customer&apos;s original payment instrument (bKash, Nagad, Rocket, or issuing Debit/Credit card) within <strong>7 to 10 working days</strong>.
              </p>
              <p className="mt-2 text-xs text-blue-700">
                * Actual processing time may vary slightly depending on banking holidays and intermediary clearing systems.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              5. Contact for Cancellation or Refund
            </h2>
            <p>
              To initiate a cancellation or refund inquiry, please reach out with your invoice number and registered email:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-slate-700">
              <li>Email: <a href={`mailto:${COMPANY_INFO.contact.billingEmail}`} className="font-semibold text-blue-600 hover:underline">{COMPANY_INFO.contact.billingEmail}</a></li>
              <li>Phone Desk: <a href={`tel:${COMPANY_INFO.contact.phoneTel}`} className="font-semibold text-blue-600 hover:underline">{COMPANY_INFO.contact.phoneDisplay}</a></li>
            </ul>
          </section>
        </div>
      }
    />
  );
}
