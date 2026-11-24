import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { COMPANY_INFO } from "@/lib/config/company";
import { pageSeo } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageSeo({
  title: "শর্তাবলী ও ব্যবহারের নীতিমালা (Terms & Conditions)",
  description:
    "Official Terms and Conditions, Acceptable Use Policy, and Billing Rules for primavps Cloud and Dedicated ISP services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPageShell
      titleBn="শর্তাবলী ও ব্যবহারের নীতিমালা"
      titleEn="Terms and Conditions"
      subtitleBn="primavps ক্লাউড ও ডেডিকেটেড ISP সার্ভিস ব্যবহারের সার্বিক নিয়মাবলী"
      subtitleEn="General Terms Governing PrimaVPS Cloud & Dedicated ISP Services"
      lastUpdated="২৪ নভেম্বর, ২০২৬"
      childrenBn={
        <div className="space-y-8 text-sm leading-relaxed text-slate-700">
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              ১. গ্রহণযোগ্যতা ও ভূমিকা (Acceptance of Terms)
            </h2>
            <p>
              {COMPANY_INFO.legalNameBn} ({COMPANY_INFO.brandName})-এর যেকোনো ক্লাউড সার্ভার, ডেডিকেটেড স্ট্যাটিক রেসিডেন্সিয়াল ISP সার্ভার, বা সফটওয়্যার ইন্টারফেস ব্যবহার করার মাধ্যমে আপনি এই শর্তাবলী ও নিয়মনীতি মেনে চলার পূর্ণ সম্মতি দিচ্ছেন। আপনি যদি এই শর্তাবলীতে একমত না হন, তবে অনুগ্রহপূর্বক সার্ভিস নেওয়া থেকে বিরত থাকুন।
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              ২. সার্ভিসের বিবরণ (Description of Services)
            </h2>
            <p>
              আমরা বিশ্বস্ত অবকাঠামো থেকে ক্লাউড ভিপিএস (Cloud VPS) এবং ডেডিকেটেড রেসিডেন্সিয়াল আইএসপি (ISP RDP) সার্ভার ভাড়া দিয়ে থাকি।
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-slate-700">
              <li>
                <strong>ডেডিকেটেড ISP RDP:</strong> গ্লোবাল ক্যারিয়ারের (যেমন AT&amp;T, Comcast, BT ইত্যাদি) খাঁটি ও ডেডিকেটেড ব্রডব্যান্ড স্ট্যাটিক আইপিসহ প্রি-কনফিগার করা Windows 11 পরিবেশ।
              </li>
              <li>
                <strong>হাই-স্পিড ক্লাউড ভিপিএস:</strong> রিমোট ডেভেলপমেন্ট, টেস্ট এনভায়রনমেন্ট, সফটওয়্যার টেস্টিং ও বিজনেস ডেটা হোস্টিং উপযোগী ক্লাউড সার্ভার।
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              ৩. গ্রহণযোগ্য ব্যবহারের নীতিমালা (Acceptable Use Policy - AUP)
            </h2>
            <p>
              আমাদের সার্ভার শুধুমাত্র বৈধ ব্যবসায়িক, পেশাদার গবেষণা, সফটওয়্যার ডেভেলপমেন্ট, ই-কমার্স এবং রিমোট অফিসের কাজের জন্য প্রযোজ্য।
            </p>
            <div className="rounded-xl border border-red-200 bg-red-50/70 p-4 text-red-900">
              <p className="font-bold">সম্পূর্ণ নিষিদ্ধ কার্যক্রমসমূহ:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-red-800">
                <li>কোনো প্রকার সাইবার আক্রমণ, DDoS আক্রমণ, পোর্ট স্ক্যানিং বা নেটওয়ার্ক ইন্ট্রুশন।</li>
                <li>স্প্যামিং, ফিশিং, ম্যালওয়্যার বা র‍্যানসমওয়্যার হোস্ট অথবা ছড়ানো।</li>
                <li>বাংলাদেশ সরকারের <em>সাইবার নিরাপত্তা আইন ২০২৩</em> কিংবা কোনো আন্তর্জাতিক আইন লঙ্ঘনকারী কর্মকাণ্ড।</li>
                <li>অবৈধ ক্রিপ্টোকারেন্সি মাইনিং কিংবা পাইরেটেড ও কপিরাইট লঙ্ঘনকারী কনটেন্ট পরিবেশন।</li>
              </ul>
            </div>
            <p className="text-xs text-slate-500">
              * কোনো গ্রাহক নিষিদ্ধ কার্যকলাপে জড়িত হলে পূর্ব ঘোষণা ছাড়াই তৎক্ষণাৎ তার অ্যাকাউন্ট ও সার্ভার স্থায়ীভাবে বাতিল করা হবে এবং কোনো অর্থ ফেরত দেওয়া হবে না।
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              ৪. পেমেন্ট, বিলিং ও স্বয়ংক্রিয় সাসপেনশন (Payment &amp; Renewal)
            </h2>
            <p>
              সার্ভিসের ফি সম্পূর্ণ অগ্রিম পরিশোধযোগ্য। অনুমোদিত বাংলাদেশি পেমেন্ট চ্যানেল (বিকাশ, নগদ, রকেট, ডেবিট/ক্রেডিট কার্ড) ও সিকিউর পেমেন্ট গেটওয়ের মাধ্যমে পেমেন্ট সম্পন্ন করতে হয়।
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-slate-700">
              <li>সাবস্ক্রিপশনের মেয়াদ শেষ হওয়ার ৩ দিন পূর্বে রিনিউয়াল নোটিশ পাঠানো হয়।</li>
              <li>মেয়াদ শেষ হওয়ার দিনের মধ্যে নবায়ন ফি পরিশোধ না করলে সার্ভার স্বয়ংক্রিয়ভাবে স্থগিত (Suspended) হয়ে যাবে।</li>
              <li>স্থগিত হওয়ার পরবর্তী ৪৮ ঘণ্টার মধ্যে বকেয়া পরিশোধ না করা হলে সার্ভারের সম্পূর্ণ ডেটা ও আইপি রিসাইকেল/মুছে ফেলা হবে, যার জন্য প্রতিষ্ঠান দায়ী থাকবে না।</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              ৫. দায়বদ্ধতা ও প্রযোজ্য আইন (Limitation of Liability &amp; Jurisdiction)
            </h2>
            <p>
              আমাদের টিম ৯৯.৯% আপটাইম বজায় রাখতে সর্বদা সচেষ্ট। তবে অপ্রত্যাশিত বৈশ্বিক ইন্টারনেট ব্যাকবোন ডাউনটাইম বা গ্রাহকের অননুমোদিত ব্যবহারের কারণে হওয়া কোনো পরোক্ষ ব্যবসায়িক ক্ষতির দায় প্রতিষ্ঠান বহন করে না।
            </p>
            <p>
              এই চুক্তি গণপ্রজাতন্ত্রী বাংলাদেশের প্রচলিত আইন দ্বারা পরিচালিত ও ব্যাখ্যায়িত হবে।
            </p>
          </section>
        </div>
      }
      childrenEn={
        <div className="space-y-8 text-sm leading-relaxed text-slate-700">
          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, deploying, or utilizing any cloud server, static residential ISP workstation, or API service provided by {COMPANY_INFO.legalNameEn} ({COMPANY_INFO.brandName}), you agree to be legally bound by these Terms and Conditions. If you do not agree, you must discontinue using our services immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              2. Description of Services
            </h2>
            <p>
              We provide high-performance Cloud Virtual Private Servers (Cloud VPS) and Dedicated Residential ISP (ISP RDP) instances hosted in premier international tier-3/tier-4 data centers.
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-slate-700">
              <li>
                <strong>Dedicated ISP RDP:</strong> Static residential IP addresses provisioned from global residential carriers (such as AT&amp;T, Comcast, BT) with dedicated Windows 11 remote desktop access.
              </li>
              <li>
                <strong>High-Speed Cloud VPS:</strong> Scalable Linux/Windows virtual machines engineered for remote software development, automation, and enterprise workload management.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              3. Acceptable Use Policy (AUP)
            </h2>
            <p>
              Our infrastructure is dedicated solely to legitimate business operations, digital marketing, software development, quality assurance testing, and remote corporate management.
            </p>
            <div className="rounded-xl border border-red-200 bg-red-50/70 p-4 text-red-900">
              <p className="font-bold">Strictly Prohibited Activities:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-red-800">
                <li>Any form of hacking, DDoS attacks, port scanning, or malicious network intrusion.</li>
                <li>Spamming, hosting or distributing phishing campaigns, malware, or ransomware.</li>
                <li>Activities violating the Cyber Security Act 2023 of Bangladesh or relevant international cyber laws.</li>
                <li>Unauthorized cryptocurrency mining or hosting copyrighted materials without license.</li>
              </ul>
            </div>
            <p className="text-xs text-slate-500">
              * Any violation of this Acceptable Use Policy will result in immediate termination without notice and complete forfeiture of any refund eligibility.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              4. Billing, Renewals &amp; Suspension
            </h2>
            <p>
              All service subscriptions are payable in advance via authorized Bangladeshi payment gateways and instruments (bKash, Nagad, Rocket, Visa, Mastercard).
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-slate-700">
              <li>Renewal notices are issued 3 days prior to expiration.</li>
              <li>Failure to settle the renewal invoice by the due date results in automated system suspension.</li>
              <li>Suspended instances will be reclaimed and permanently terminated 48 hours following invoice default.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              5. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the People&apos;s Republic of Bangladesh. Any dispute arising under these terms shall be subject to the exclusive jurisdiction of the competent courts in Dhaka, Bangladesh.
            </p>
          </section>
        </div>
      }
    />
  );
}
