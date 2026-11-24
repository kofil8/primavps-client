"use client";

import { COMPANY_INFO } from "@/lib/config/company";
import { ArrowLeft, Building2, Globe2, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";

interface LegalPageShellProps {
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  lastUpdated: string;
  childrenBn: ReactNode;
  childrenEn: ReactNode;
}

export function LegalPageShell({
  titleBn,
  titleEn,
  subtitleBn,
  subtitleEn,
  lastUpdated,
  childrenBn,
  childrenEn,
}: LegalPageShellProps) {
  const [lang, setLang] = useState<"bn" | "en">("bn");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header Bar */}
      <section className="border-b border-slate-200 bg-white pt-10 pb-8 sm:pt-12 sm:pb-10">
        <div className="shell">
          <div className="mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-blue-600 sm:text-sm"
            >
              <ArrowLeft size={14} />
              <span>{lang === "bn" ? "মূল পাতায় ফিরুন" : "Back to Home"}</span>
            </Link>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
                <ShieldCheck size={13} className="text-blue-600" />
                <span>
                  {lang === "bn"
                    ? "অফিসিয়াল লিগ্যাল ও কমপ্লায়েন্স ডকুমেন্ট"
                    : "Official Legal & Compliance Document"}
                </span>
              </div>
              <h1 className="mt-2.5 font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {lang === "bn" ? titleBn : titleEn}
              </h1>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                {lang === "bn" ? subtitleBn : subtitleEn} ·{" "}
                <span className="font-mono">{lastUpdated}</span>
              </p>
            </div>

            {/* Language Switcher Toggle */}
            <div className="flex shrink-0 items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-100 p-1 shadow-2xs">
              <span className="sr-only">ভাষা নির্বাচন করুন</span>
              <button
                type="button"
                onClick={() => setLang("bn")}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                  lang === "bn"
                    ? "bg-white text-blue-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                aria-pressed={lang === "bn"}
              >
                <Globe2 size={13} className={lang === "bn" ? "text-blue-600" : "text-slate-400"} />
                <span>বাংলা</span>
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                  lang === "en"
                    ? "bg-white text-blue-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                aria-pressed={lang === "en"}
              >
                <Globe2 size={13} className={lang === "en" ? "text-blue-600" : "text-slate-400"} />
                <span>English</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Card */}
      <section className="py-8 sm:py-12">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Primary Document Text */}
            <div className="lg:col-span-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-10">
                {lang === "bn" ? childrenBn : childrenEn}
              </div>
            </div>

            {/* Verified Entity Sidebar for Reviewers / DBID */}
            <div className="space-y-5 lg:col-span-4">
              <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5 shadow-xs">
                <div className="flex items-center gap-2 text-blue-900">
                  <Building2 size={18} className="text-blue-600" />
                  <h2 className="font-display text-sm font-bold">
                    {lang === "bn"
                      ? "নিবন্ধিত ব্যবসায়িক তথ্য"
                      : "Registered Business Profile"}
                  </h2>
                </div>

                <div className="mt-3.5 space-y-2.5 text-xs text-slate-700">
                  <div>
                    <span className="font-semibold text-slate-500">
                      {lang === "bn" ? "প্রতিষ্ঠানের নাম:" : "Legal Entity:"}
                    </span>
                    <p className="font-bold text-slate-900">
                      {lang === "bn" ? COMPANY_INFO.legalNameBn : COMPANY_INFO.legalNameEn} ({COMPANY_INFO.brandName})
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-500">
                      {lang === "bn" ? "স্বত্বাধিকারী:" : "Proprietor:"}
                    </span>
                    <p className="font-medium text-slate-900">
                      {lang === "bn" ? COMPANY_INFO.proprietorNameBn : COMPANY_INFO.proprietorNameEn}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-500">
                      {lang === "bn" ? "ট্রেড লাইসেন্স নং:" : "Trade License No:"}
                    </span>
                    <p className="font-mono font-semibold text-slate-900">
                      {COMPANY_INFO.tradeLicenseNo}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-500">
                      {lang === "bn" ? "ডিবিআইডি (DBID) নং:" : "DBID No:"}
                    </span>
                    <p className="font-mono font-semibold text-slate-900">
                      {COMPANY_INFO.dbidNo}
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold text-slate-500">
                      {lang === "bn" ? "নিবন্ধিত ঠিকানা:" : "Registered Address:"}
                    </span>
                    <p className="leading-relaxed text-slate-900">
                      {lang === "bn" ? COMPANY_INFO.address.fullBn : COMPANY_INFO.address.fullEn}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                <div className="flex items-center gap-2 text-slate-900">
                  <Phone size={16} className="text-emerald-600" />
                  <h2 className="font-display text-sm font-bold">
                    {lang === "bn" ? "সরাসরি সহায়তা ও অভিযোগ" : "Support & Grievance"}
                  </h2>
                </div>
                <div className="mt-3 space-y-2 text-xs text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-800">
                      {lang === "bn" ? "হটলাইন:" : "Phone:"}
                    </span>{" "}
                    <a
                      href={`tel:${COMPANY_INFO.contact.phoneTel}`}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {COMPANY_INFO.contact.phoneDisplay}
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">
                      {lang === "bn" ? "ইমেইল:" : "Email:"}
                    </span>{" "}
                    <a
                      href={`mailto:${COMPANY_INFO.contact.supportEmail}`}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {COMPANY_INFO.contact.supportEmail}
                    </a>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {lang === "bn" ? COMPANY_INFO.supportHoursBn : COMPANY_INFO.supportHoursEn}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
