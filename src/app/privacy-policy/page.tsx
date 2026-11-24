import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { COMPANY_INFO } from "@/lib/config/company";
import { pageSeo } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageSeo({
  title: "গোপনীয়তা নীতি (Privacy Policy)",
  description:
    "Official Privacy Policy of primavps detailing customer data protection, billing integrity, and SSLCOMMERZ secure transaction standards.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      titleBn="গোপনীয়তা নীতি"
      titleEn="Privacy Policy"
      subtitleBn="আপনার ব্যক্তিগত তথ্য ও বিলিং ডেটার সর্বোচ্চ নিরাপত্তা নিশ্চিতে আমাদের প্রতিশ্রুতি"
      subtitleEn="Our Commitment to Protecting Your Personal and Transactional Privacy"
      lastUpdated="২৪ নভেম্বর, ২০২৬"
      childrenBn={
        <div className="space-y-8 text-sm leading-relaxed text-slate-700">
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              ১. যে সকল তথ্য আমরা সংগ্রহ করি (Information We Collect)
            </h2>
            <p>
              {COMPANY_INFO.legalNameBn} ({COMPANY_INFO.brandName}) শুধুমাত্র সার্ভিস ডেলিভারি ও কাস্টমার সহায়তার জন্য প্রয়োজনীয় ন্যূনতম তথ্য সংগ্রহ করে:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-slate-700">
              <li><strong>ব্যক্তিগত পরিচিতি:</strong> আপনার নাম, ইমেইল অ্যাড্রেস এবং যোগাযোগের জন্য সচল বাংলাদেশি মোবাইল ফোন নম্বর।</li>
              <li><strong>বিলিং ও লেনদেনের তথ্য:</strong> ট্রানজ্যাকশন আইডি (TrxID), অর্ডারের ইনভয়েস রেকর্ড এবং নির্বাচিত পেমেন্ট চ্যানেল।</li>
              <li><strong>টেকনিক্যাল ও নেটওয়ার্ক লগ:</strong> সার্ভার সিকিউরিটি এবং কোনো প্রকার সাইবার অপব্যবহার ও DDoS প্রতিরোধে শুধুমাত্র আইপি লগ সাময়িক সময়ের জন্য সংরক্ষিত থাকে।</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              ২. তথ্যের ব্যবহার ও ডেটা সুরক্ষা (How We Protect Your Data)
            </h2>
            <p>
              আপনার সংগৃহীত তথ্য অত্যন্ত কঠোর এনক্রিপশন ও সিকিউরিটি প্রটোকলের অধীনে রাখা হয়। এই তথ্য শুধুমাত্র:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-slate-700">
              <li>অটোমেটিক সার্ভার কনফিগারেশন ও ক্রেডেন্সিয়ালস সরবরাহে,</li>
              <li>বিলিং নবায়ন নোটিফিকেশন ও পেমেন্ট রিসিট প্রেরণে,</li>
              <li>এবং ২৪/৭ হেল্পডেস্ক সহায়তার জন্য ব্যবহৃত হয়।</li>
            </ul>
          </section>

          <section className="space-y-3">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 text-emerald-950">
              <h2 className="font-display text-base font-bold text-emerald-900">
                ৩. পেমেন্ট গেটওয়ে ও আর্থিক ডেটার নিরাপত্তা (SSLCOMMERZ Payment Security)
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-emerald-900">
                পেমেন্ট সম্পন্ন করার জন্য আমরা অনুমোদিত সিকিউর পেমেন্ট গেটওয়ে <strong>SSLCOMMERZ</strong> ব্যবহার করি। সকল অনলাইন কার্ড এবং এমএফএস লেনদেন আন্তর্জাতিক ব্যাংকিং স্ট্যান্ডার্ড <strong>128-bit/256-bit SSL Encryption</strong> এবং <strong>PCI-DSS</strong> কমপ্লায়েন্ট চ্যানেলে পরিচালিত হয়।
              </p>
              <p className="mt-2 text-xs font-semibold text-emerald-800">
                * {COMPANY_INFO.brandName} কখনই গ্রাহকের ডেবিট/ক্রেডিট কার্ডের পিন, সিভিভি (CVV) বা ওটিপি (OTP) সংরক্ষণ বা প্রত্যক্ষ করে না।
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              ৪. তৃতীয় পক্ষের কাছে তথ্য অপ্রকাশযোগ্যতা (No Third-Party Sharing)
            </h2>
            <p>
              আমরা আমাদের কোনো গ্রাহকের ব্যক্তিগত নাম, ইমেইল, মোবাইল নম্বর বা ব্যবসায়িক তথ্য কোনো বিজ্ঞাপন সংস্থা, ডেটা ব্রোকার বা অননুমোদিত তৃতীয় পক্ষের কাছে বিক্রি, লিজ বা শেয়ার করি না। দেশের প্রচলিত আইন অনুযায়ী কোনো উপযুক্ত আদালত বা সরকারি আইন প্রয়োগকারী সংস্থার আনুষ্ঠানিক নির্দেশ ব্যতীত গ্রাহক তথ্য সম্পূর্ণভাবে গোপন ও সুরক্ষিত রাখা হয়।
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              ৫. গোপনীয়তা সংক্রান্ত যোগাযোগ (Privacy Contact)
            </h2>
            <p>
              আপনার অ্যাকাউন্ট ডেটা সংশোধন বা মুছে ফেলার অনুরোধের জন্য আমাদের কমপ্লায়েন্স অফিসারের সাথে যোগাযোগ করুন:
            </p>
            <p className="text-slate-900">
              ইমেইল: <a href={`mailto:${COMPANY_INFO.contact.legalEmail}`} className="font-semibold text-blue-600 hover:underline">{COMPANY_INFO.contact.legalEmail}</a>
            </p>
          </section>
        </div>
      }
      childrenEn={
        <div className="space-y-8 text-sm leading-relaxed text-slate-700">
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              1. Information We Collect
            </h2>
            <p>
              {COMPANY_INFO.legalNameEn} ({COMPANY_INFO.brandName}) collects only necessary information required for service provisioning, account authentication, and billing verification:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-slate-700">
              <li><strong>Contact Information:</strong> Your full name, verified email address, and active mobile phone number.</li>
              <li><strong>Billing History:</strong> Gateway transaction references (TrxID), order invoices, and chosen payment method.</li>
              <li><strong>Infrastructure Logs:</strong> Ingress security metadata retained temporarily for DDoS prevention and perimeter firewall safety.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              2. Data Utilization &amp; Infrastructure Safeguards
            </h2>
            <p>
              Customer data is held securely under modern operational standards and is utilized exclusively for:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-slate-700">
              <li>Automated generation and encrypted delivery of server root credentials.</li>
              <li>Billing invoices, renewal reminders, and transaction receipts.</li>
              <li>Dhaka engineering desk customer support and service inquiries.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 text-emerald-950">
              <h2 className="font-display text-base font-bold text-emerald-900">
                3. Secure Payment Processing (SSLCOMMERZ Certified)
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-emerald-900">
                All card and mobile financial transactions are handled securely through licensed payment aggregator <strong>SSLCOMMERZ</strong>. Data is transmitted via industry-standard <strong>128-bit/256-bit SSL encryption</strong> following <strong>PCI-DSS</strong> guidelines.
              </p>
              <p className="mt-2 text-xs font-semibold text-emerald-800">
                * We do not store, process, or have access to raw card numbers, CVVs, or OTP security tokens.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              4. Strict Non-Disclosure &amp; Zero Data Selling
            </h2>
            <p>
              We maintain a strict policy against commercializing customer profiles. We do not sell, rent, disclose, or share your private contact information with advertisers or marketing networks under any circumstance, unless formally mandated by lawful authorities of Bangladesh.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              5. Contact Us Regarding Your Privacy
            </h2>
            <p>
              To query or request removal of your stored account records:
            </p>
            <p className="text-slate-900">
              Email: <a href={`mailto:${COMPANY_INFO.contact.legalEmail}`} className="font-semibold text-blue-600 hover:underline">{COMPANY_INFO.contact.legalEmail}</a>
            </p>
          </section>
        </div>
      }
    />
  );
}
