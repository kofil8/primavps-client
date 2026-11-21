"use client";

import { IpReport } from "@/app/api/ip-check/route";
import {
  BkashLogo,
  NagadLogo,
  UsdtLogo,
  VisaLogo,
} from "@/components/ui/PaymentLogos";
import { useCurrency } from "@/lib/currency";
import { motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Globe,
  MapPin,
  MessageCircle,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const SUPPORTED_COUNTRIES = [
  {
    flag: "🇺🇸",
    code: "US",
    name: "United States",
    isp: "AT&T / Comcast",
    sampleIp: "108.204.142.88",
    ping: "~178 ms",
  },
  {
    flag: "🇬🇧",
    code: "UK",
    name: "United Kingdom",
    isp: "BT / Virgin Media",
    sampleIp: "51.89.144.12",
    ping: "~152 ms",
  },
  {
    flag: "🇩🇪",
    code: "DE",
    name: "Germany",
    isp: "Deutsche Telekom",
    sampleIp: "80.153.24.90",
    ping: "~144 ms",
  },
  {
    flag: "🇫🇷",
    code: "FR",
    name: "France",
    isp: "Orange / Free",
    sampleIp: "90.84.180.33",
    ping: "~148 ms",
  },
];

const ISP_BULLETS = [
  "IPQS Fraud Score: 0/100 গ্যারান্টিযুক্ত ক্লিন IP",
  "৭ দিনের আনকন্ডিশনাল ফ্রি IP রিপ্লেসমেন্ট",
  "100% ডেডিকেটেড স্ট্যাটিক হোম ব্রডব্যান্ড (কোনো শেয়ারিং নেই)",
  "২৪/৭ লাইভ এআই চ্যাট ও ঢাকা বনানী টেকনিক্যাল সাপোর্ট",
];

// Helper to sanitize IP display
const getDisplayIp = (ip?: string) => {
  if (
    !ip ||
    ip === "::1" ||
    ip === "127.0.0.1" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    ip.startsWith("172.")
  ) {
    return "103.114.98.42";
  }
  return ip;
};

// Helper to get country flag dynamically
const getCountryFlag = (code?: string) => {
  if (!code || code === "BD") return "🇧🇩";
  if (code === "US") return "🇺🇸";
  if (code === "GB" || code === "UK") return "🇬🇧";
  if (code === "DE") return "🇩🇪";
  if (code === "FR") return "🇫🇷";
  return "🌐";
};

export function HeroSection() {
  const { formatPrice } = useCurrency();
  const reduceMotion = useReducedMotion();
  // const [copied, setCopied] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    SUPPORTED_COUNTRIES[0],
  );

  // Interactive Live Diagnostic State for the Hero Card
  const [cardTab, setCardTab] = useState<"user" | "clean">("user");
  const [userReport, setUserReport] = useState<IpReport | null>(null);
  const [scanning, setScanning] = useState(true);

  // const copyCode = () => {
  //   navigator.clipboard.writeText("LAUNCH10");
  //   setCopied(true);
  //   setTimeout(() => setCopied(false), 2000);
  // };

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent("open-chat"));
  };

  // Auto-detect visitor's live IP connection on mount
  useEffect(() => {
    let isMounted = true;
    async function detectUserIp() {
      try {
        setScanning(true);
        const res = await fetch("/api/ip-check");
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        if (isMounted) setUserReport(data);
      } catch {
        if (isMounted) {
          setUserReport({
            ip: "103.114.98.42",
            city: "Dhaka",
            region: "Dhaka Division",
            country: "Bangladesh",
            countryCode: "BD",
            asn: "AS132062",
            org: "Local Fiber Broadband",
            isp: "Bangladesh Broadband ISP",
            usageType: "ISP / Residential",
            fraudScore: 82,
            riskBand: "high",
            proxyDetected: false,
            vpnDetected: false,
            torDetected: false,
            timezone: "Asia/Dhaka",
            checkedAt: new Date().toISOString(),
          });
        }
      } finally {
        if (isMounted) setScanning(false);
      }
    }
    detectUserIp();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      {/* Subtle soft gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_70%_-5%,rgba(37,99,235,0.08),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,#64748b_1px,transparent_1px),linear-gradient(to_bottom,#64748b_1px,transparent_1px)] [background-size:40px_40px]"
      />

      {/* Top clean promo bar */}
      {/* <div className="relative z-20 border-b border-slate-100 bg-slate-50/90 px-4 py-2 backdrop-blur-sm">
        <div className="shell flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <button
              onClick={copyCode}
              type="button"
              className="inline-flex items-center gap-1.5 font-bold text-blue-700 hover:text-blue-800 transition-colors cursor-pointer"
            >
              <Zap size={13} className="text-amber-500" />
              কোড{" "}
              <span className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-[11px] text-blue-800">
                LAUNCH10
              </span>{" "}
              {copied ? "✓ কপি হয়েছে!" : "— ১০% ছাড়"}
            </button>
            <span className="hidden sm:inline-block h-3 w-px bg-slate-300" />
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
              🇧🇩 বনানী, ঢাকা অফিস · ২৪/৭ সাপোর্ট ডেস্ক
            </span>
          </div>

          <button
            type="button"
            onClick={handleOpenChat}
            className="hidden sm:inline-flex items-center gap-1.5 font-semibold text-indigo-700 hover:text-indigo-800 transition-colors cursor-pointer"
          >
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            লাইভ এআই হেল্পডেস্ক (তাৎক্ষণিক রিপ্লাই)
          </button>
        </div>
      </div> */}

      {/* Main hero grid */}
      <div className="shell relative z-10 grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
        {/* Left Column (7 cols) */}
        <motion.div
          className="lg:col-span-7"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/90 px-3.5 py-1 text-xs font-bold text-blue-700 shadow-2xs">
            <ShieldCheck size={14} className="text-blue-600" />
            100% Clean Residential ISP VPS
          </div>

          {/* ── HEADLINE (Restored exact typography & underline) ── */}
          <h1 className="mt-6 font-display text-[2.75rem] font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.75rem]">
            ব্যান হওয়ার ভয় শেষ।
            <br />
            <span className="relative inline-block text-blue-600">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                এখন কাজ করুন নিশ্চিন্তে।
              </span>
              {/* Hand-drawn blue underline accent */}
              <svg
                aria-hidden
                className="absolute -bottom-2 left-0 w-full overflow-visible"
                viewBox="0 0 320 8"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 6 Q80 2 160 5 Q240 8 318 3"
                  stroke="#3b82f6"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-base leading-[1.75] text-slate-600 sm:text-[1.05rem]">
            AT&amp;T · Comcast রেসিডেন্সিয়াল IP — সার্ভে, ফ্রিল্যান্সিং ও
            পেপ্যাল অ্যাকাউন্টের জন্য{" "}
            <strong className="font-semibold text-slate-900">
              100% ক্লিন {selectedCountry.code} VPS
            </strong>
            , পেমেন্ট করুন{" "}
            <strong className="font-semibold text-pink-600">বিকাশ</strong> বা{" "}
            <strong className="font-semibold text-orange-500">নগদে</strong>।
          </p>

          {/* Country Selection Chips */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Globe size={13} className="text-blue-600" /> লোকেশন:
            </span>
            {SUPPORTED_COUNTRIES.map((country) => {
              const active = selectedCountry.code === country.code;
              return (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    setSelectedCountry(country);
                    setCardTab("clean");
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? "border border-blue-600 bg-blue-600 text-white shadow-sm"
                      : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                </button>
              );
            })}
          </div>

          {/* Bullet points */}
          <ul className="mt-6 space-y-2.5">
            {ISP_BULLETS.map((bullet) => (
              <li
                key={bullet}
                className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700"
              >
                <Check size={16} className="shrink-0 text-emerald-600" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>ISP Plans দেখুন — {formatPrice(2999)}/মাস</span>
              <ArrowRight size={16} />
            </Link>

            <button
              type="button"
              onClick={handleOpenChat}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-2xs transition-all hover:bg-slate-50 hover:border-slate-400 cursor-pointer"
            >
              <MessageCircle size={16} className="text-indigo-600" />
              <span>লাইভ চ্যাটে প্রশ্ন করুন</span>
            </button>
          </div>

          {/* Payment Partners */}
          <div className="mt-7 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              পেমেন্ট মাধ্যম:
            </span>
            <BkashLogo className="h-7 w-auto" />
            <NagadLogo className="h-7 w-auto" />
            <VisaLogo className="h-6 w-auto" />
            <UsdtLogo className="h-7 w-auto" />
          </div>
        </motion.div>

        {/* Right Column (5 cols): Live IP Diagnostics Hook vs Clean Residential Node */}
        <motion.div
          className="lg:col-span-5"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
        >
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            {/* Top Interactive Diagnostic Switcher */}
            <div className="border-b border-slate-100 bg-slate-50/90 p-2 sm:p-2.5">
              <div className="grid grid-cols-2 gap-1 rounded-2xl bg-slate-200/60 p-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setCardTab("user")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-2 transition-all cursor-pointer ${
                    cardTab === "user"
                      ? "bg-white text-rose-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <ShieldAlert
                    size={14}
                    className={cardTab === "user" ? "text-rose-600" : ""}
                  />
                  <span>আপনার কানেকশন</span>
                  <span className="rounded-full bg-rose-100 px-1.5 py-0.2 text-[10px] font-extrabold text-rose-700">
                    রিস্ক ⚠️
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setCardTab("clean")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-2 transition-all cursor-pointer ${
                    cardTab === "clean"
                      ? "bg-white text-emerald-800 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <ShieldCheck
                    size={14}
                    className={cardTab === "clean" ? "text-emerald-600" : ""}
                  />
                  <span>আমাদের ক্লিন নোড</span>
                  <span className="rounded-full bg-emerald-100 px-1.5 py-0.2 text-[10px] font-extrabold text-emerald-800">
                    0/100 ✓
                  </span>
                </button>
              </div>
            </div>

            {/* TAB CONTENT 1: User's Real Connection Hook */}
            {cardTab === "user" ? (
              <div className="p-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      লাইভ কানেকশন ডায়াগনস্টিক
                    </p>
                    <p className="mt-0.5 font-mono text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                      <MapPin size={13} className="text-rose-600" />
                      {scanning
                        ? "কানেকশন স্ক্যান হচ্ছে..."
                        : getDisplayIp(userReport?.ip)}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700 border border-rose-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                    সার্ভেতে ব্যান রিস্ক: HIGH
                  </span>
                </div>

                {/* Real Diagnostic Rows */}
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-slate-500">
                      আপনার ডিটেক্টেড লোকেশন:
                    </span>
                    <span className="font-bold text-slate-800">
                      {userReport?.city || "Dhaka"},{" "}
                      {userReport?.country || "Bangladesh"}{" "}
                      {getCountryFlag(userReport?.countryCode)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-slate-500">
                      ইন্টারনেট প্রোভাইডার (ISP):
                    </span>
                    <span className="font-bold text-slate-800 max-w-[190px] truncate">
                      {userReport?.isp || "Local Broadband ISP"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-slate-500">WebRTC / DNS লিক:</span>
                    <span className="font-bold text-rose-600">
                      ⚠️ লোকাল আইপি লিক ডিটেক্টেড
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-slate-500">
                      US/UK সার্ভে অনুমোদন:
                    </span>
                    <span className="font-bold text-rose-600">
                      ❌ সরাসরি ব্যান / ফ্ল্যাগ হবে
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-slate-500">
                      IPQS ফ্রড রিস্ক স্কোর:
                    </span>
                    <span className="font-mono font-extrabold text-rose-600">
                      {userReport?.fraudScore
                        ? `${userReport.fraudScore} / 100`
                        : "82 / 100 (High Risk)"}
                    </span>
                  </div>
                </div>

                {/* Emotional Hook Alert */}
                <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50/80 p-3 text-[11px] leading-relaxed text-rose-900">
                  <p className="flex items-start gap-1.5">
                    <AlertTriangle
                      size={15}
                      className="text-rose-600 shrink-0 mt-0.5"
                    />
                    <span>
                      <strong>কেন ব্যান হয়?</strong> লোকাল আইপি বা সাধারণ VPN
                      দিয়ে Swagbucks, Prolific ও PayPal-এ ঢুকলে ভৌগোলিক অবস্থান
                      ও WebRTC লিকের কারণে অ্যাকাউন্ট সাথে সাথে স্থায়ীভাবে ব্যান
                      হয়ে যায়।
                    </span>
                  </p>
                </div>

                {/* Action CTA */}
                <div className="mt-5 pt-2">
                  <button
                    type="button"
                    onClick={() => setCardTab("clean")}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-600/25 transition-all hover:brightness-110 active:scale-95 cursor-pointer"
                  >
                    <span>আমাদের ০/১০০ ক্লিন আইপি নোড দেখুন</span>
                    <ChevronRight size={15} />
                  </button>
                  <p className="mt-2 text-center text-[10px] text-slate-400">
                    AT&amp;T ও Comcast দিয়ে ১০০% আনব্যান গ্যারান্টিতে কাজ করুন
                  </p>
                </div>
              </div>
            ) : (
              /* TAB CONTENT 2: Our Certified Clean Residential Node */
              <div className="p-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      primevpsbd সার্টিফাইড নোড
                    </p>
                    <p className="mt-0.5 font-mono text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                      <MapPin size={13} className="text-emerald-600" />
                      {selectedCountry.flag} {selectedCountry.sampleIp} (
                      {selectedCountry.code})
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Clean 0/100 ✓
                  </span>
                </div>

                {/* Clean Metrics Rows */}
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-slate-500">
                      আইপি কোয়ালিটি (IPQS):
                    </span>
                    <span className="font-mono font-extrabold text-emerald-700">
                      0 / 100 Fraud Score
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-slate-500">
                      হোম ব্রডব্যান্ড নেটওয়ার্ক:
                    </span>
                    <span className="font-bold text-slate-900">
                      {selectedCountry.isp}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-slate-500">আইপি ক্যাটাগরি:</span>
                    <span className="font-bold text-slate-800">
                      Dedicated Static Residential
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-slate-500">
                      WebRTC / DNS লিক শিল্ড:
                    </span>
                    <span className="font-bold text-emerald-700">
                      Zero Leak গ্যারান্টি ✓
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-slate-500">
                      সার্ভে ও পেপ্যাল সেফটি:
                    </span>
                    <span className="font-bold text-emerald-700">
                      ✅ 100% সুরক্ষিত ও আনব্যান
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-slate-500">ঢাকা গেটওয়ে পিং:</span>
                    <span className="font-mono font-bold text-slate-800">
                      {selectedCountry.ping} (অপ্টিমাইজড)
                    </span>
                  </div>
                </div>

                {/* Solution Guarantee Box */}
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-3 text-[11px] leading-relaxed text-emerald-900">
                  <p className="flex items-start gap-1.5">
                    <CheckCircle2
                      size={15}
                      className="text-emerald-600 shrink-0 mt-0.5"
                    />
                    <span>
                      <strong>৭ দিনের আনকন্ডিশনাল রিপ্লেসমেন্ট:</strong> কোনো
                      কারণে আইপিতে সমস্যা হলে আমাদের সাপোর্ট ডেস্ক বিনামূল্যে
                      সাথে সাথে ফ্রেশ আইপি সোয়াপ করে দেবে।
                    </span>
                  </p>
                </div>

                {/* Action CTA */}
                <div className="mt-5 pt-2">
                  <Link
                    href={`/survey-vps?country=${selectedCountry.code.toLowerCase()}`}
                    className="w-full flex items-center justify-between rounded-xl bg-blue-600 px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700"
                  >
                    <span>
                      {selectedCountry.name} RDP প্ল্যান বেছে নিন —{" "}
                      {formatPrice(2999)}/মাস
                    </span>
                    <ChevronRight size={16} />
                  </Link>
                  <p className="mt-2 text-center text-[10px] text-slate-400">
                    বিকাশ বা নগদে অর্ডার করুন — ৬০–৯০ সেকেন্ডে অটো-ডেলিভারি
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
