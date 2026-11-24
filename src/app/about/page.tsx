import { COMPANY_INFO } from "@/lib/config/company";
import { pageSeo } from "@/lib/seo";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Cpu,
  Globe2,
  Headphones,
  Mail,
  MapPin,
  Phone,
  Server,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = pageSeo({
  title: "আমাদের সম্পর্কে (About Us) - primavps",
  description:
    "Learn about primavps, our mission, legal entity, infrastructure, and Dhaka technical engineering operations.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero Header */}
      <section className="border-b border-slate-200 bg-white pt-14 pb-12 sm:pt-16 sm:pb-14">
        <div className="shell">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <ShieldCheck size={14} className="text-blue-600" />
            <span>অফিসিয়াল প্রোফাইল ও ব্যবসায়িক পরিচিতি</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            হাই-স্পিড ক্লাউড ও ডেডিকেটেড ISP সার্ভার সেবায় আপনার বিশ্বস্ত অংশীদার
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {COMPANY_INFO.legalNameBn} ({COMPANY_INFO.brandName}) বাংলাদেশের উদীয়মান আইটি উদ্যোক্তা, সফটওয়্যার ডেভেলপার ও রিমোট প্রফেশনালদের জন্য প্রিমিয়াম মানের ক্লাউড ইনফ্রাস্ট্রাকচার প্রদান করে আসছে।
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="py-10 sm:py-14">
        <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column (8 cols): Mission, Tech, Infrastructure */}
          <div className="space-y-8 lg:col-span-8">
            {/* Mission & Purpose */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
              <h2 className="font-display text-xl font-bold text-slate-900">
                আমাদের লক্ষ্য ও ব্যবসায়িক উদ্দেশ্য
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                আধুনিক বৈশ্বিক অর্থনীতিতে রিমোট ওয়ার্কিং, কোয়ালিটি অ্যাসুরেন্স (QA), অ্যাড ভেরিফিকেশন এবং ক্লাউড হোস্টিংয়ের জন্য একটি স্থিতিশীল ও খাঁটি হোম ব্রডব্যান্ড নেটওয়ার্ক অপরিহার্য। সাধারণ ডাটা সেন্টার ভিপিএসের সীমাবদ্ধতা কাটিয়ে বিশ্বমানের ক্যারিয়ার (যেমন AT&amp;T, Comcast, Deutsche Telekom, Orange) আইপি ব্যবহারের মাধ্যমে বাংলাদেশি ফ্রিল্যান্সার ও কোম্পানিগুলোর সক্ষমতা বৃদ্ধি করাই আমাদের মূল লক্ষ্য।
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <Server size={18} />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-900">১০০% ডেডিকেটেড</h3>
                  <p className="mt-1 text-xs text-slate-600">কোনো শেয়ার্ড আইপি নেই, প্রতিটি গ্রাহকের জন্য স্বতন্ত্র ব্যান্ডউইথ।</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                    <Cpu size={18} />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-900">NVMe পারফরম্যান্স</h3>
                  <p className="mt-1 text-xs text-slate-600">হাই-স্পিড জেন-৪ এনভিএমই স্টোরেজ ও ডিডিআর৪/ডিডিআর৫ মেমোরি।</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <Headphones size={18} />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-900">২৪/৭ ঢাকা ডেস্ক</h3>
                  <p className="mt-1 text-xs text-slate-600">জরুরি প্রযুক্তিগত সমস্যায় বনানী সাপোর্ট টিম সার্বক্ষণিক প্রস্তুত।</p>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
              <h2 className="font-display text-xl font-bold text-slate-900">
                আমাদের অঙ্গীকার
              </h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                  <span><strong>স্বচ্ছ বিলিং ও কমপ্লায়েন্স:</strong> কোনো গোপন চার্জ নেই। প্রতিটি পেমেন্টের জন্য ভ্যাট-উপযোগী অফিসিয়াল ক্যাশমেমো ও ইনভয়েস প্রদান।</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                  <span><strong>নিরাপদ ও স্থানীয় পেমেন্ট:</strong> বাংলাদেশ ব্যাংক অনুমোদিত MFS (বিকাশ, নগদ, রকেট) ও ভিসা/মাস্টারকার্ডের মাধ্যমে সুরক্ষিত লেনদেন।</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                  <span><strong>৭ দিনের আনকন্ডিশনাল সোয়াপ:</strong> কোনো আইপিতে টেকনিক্যাল জটিলতা হলে বিনামূল্যে তাৎক্ষণিক ফ্রেশ আইপি প্রদান।</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Legal Ownership & Verification Info */}
          <div className="space-y-5 lg:col-span-4">
            <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-xs">
              <div className="flex items-center gap-2 text-blue-900">
                <Building2 size={20} className="text-blue-600" />
                <h3 className="font-display text-base font-bold">
                  আইনি ও সরকারি নিবন্ধন তথ্য
                </h3>
              </div>

              <div className="mt-4 space-y-3.5 text-xs text-slate-700">
                <div>
                  <span className="font-semibold text-slate-500">প্রতিষ্ঠানের নাম (Trade Name):</span>
                  <p className="font-bold text-slate-900">{COMPANY_INFO.legalNameBn}</p>
                  <p className="font-medium text-slate-600">{COMPANY_INFO.legalNameEn} ({COMPANY_INFO.brandName})</p>
                </div>

                <div>
                  <span className="font-semibold text-slate-500">স্বত্বাধিকারী / উদ্যোক্তা (Proprietor):</span>
                  <p className="font-bold text-slate-900">{COMPANY_INFO.proprietorNameBn}</p>
                  <p className="text-[11px] text-slate-500">{COMPANY_INFO.proprietorNameEn}</p>
                </div>

                <div>
                  <span className="font-semibold text-slate-500">ট্রেড লাইসেন্স নম্বর:</span>
                  <p className="font-mono font-bold text-slate-900">{COMPANY_INFO.tradeLicenseNo}</p>
                </div>

                <div>
                  <span className="font-semibold text-slate-500">ডিজিটাল বিজনেস আইডি (DBID):</span>
                  <p className="font-mono font-bold text-slate-900">{COMPANY_INFO.dbidNo}</p>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <span className="font-semibold text-slate-500">নিবন্ধিত ব্যবসায়িক কার্যালয়:</span>
                  <p className="mt-1 leading-relaxed text-slate-900">{COMPANY_INFO.address.fullBn}</p>
                  <p className="mt-0.5 text-[11px] text-slate-500">{COMPANY_INFO.address.fullEn}</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h3 className="font-display text-base font-bold text-slate-900">
                যোগাযোগের তথ্য
              </h3>
              <div className="mt-3.5 space-y-2.5 text-xs text-slate-700">
                <p className="flex items-center gap-2">
                  <Phone size={14} className="text-emerald-600" />
                  <a href={`tel:${COMPANY_INFO.contact.phoneTel}`} className="font-semibold text-slate-900 hover:text-blue-600">
                    {COMPANY_INFO.contact.phoneDisplay}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={14} className="text-blue-600" />
                  <a href={`mailto:${COMPANY_INFO.contact.supportEmail}`} className="font-semibold text-slate-900 hover:text-blue-600">
                    {COMPANY_INFO.contact.supportEmail}
                  </a>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-red-500" />
                  <span className="text-slate-600">{COMPANY_INFO.address.areaEn}, {COMPANY_INFO.address.cityEn}</span>
                </p>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-slate-800"
                >
                  <span>যোগাযোগ পেজ দেখুন</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
