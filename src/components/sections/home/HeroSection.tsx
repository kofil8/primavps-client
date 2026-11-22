"use client";

import { CountryFlag } from "@/components/ui/CountryFlag";
import {
  BkashLogo,
  NagadLogo,
  UsdtLogo,
  VisaLogo,
} from "@/components/ui/PaymentLogos";
import { useCurrency } from "@/lib/currency";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Globe,
  MessageCircle,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SUPPORTED_COUNTRIES = [
  {
    code: "US",
    name: "United States",
    isp: "AT&T · Comcast",
    sampleIp: "108.204.142.88",
    ping: "~178 ms",
  },
  {
    code: "UK",
    name: "United Kingdom",
    isp: "BT · Virgin Media",
    sampleIp: "51.89.144.12",
    ping: "~152 ms",
  },
  {
    code: "DE",
    name: "Germany",
    isp: "Deutsche Telekom",
    sampleIp: "80.153.24.90",
    ping: "~144 ms",
  },
  {
    code: "FR",
    name: "France",
    isp: "Orange · Free",
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

export function HeroSection() {
  const { formatPrice } = useCurrency();
  const reduceMotion = useReducedMotion();
  const [selectedCountry, setSelectedCountry] = useState(
    SUPPORTED_COUNTRIES[0],
  );

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent("open-chat"));
  };

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

      {/* Main hero grid */}
      <div className="shell relative z-10 grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
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

          {/* Headline — underline anchored strictly to "নিশ্চিন্তে।" */}
          <h1 className="mt-6 font-display text-[2.65rem] font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem]">
            ব্যান হওয়ার ভয় শেষ।
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
              এখন কাজ করুন{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                  নিশ্চিন্তে।
                </span>
                <svg
                  aria-hidden
                  className="absolute -bottom-2 left-0 w-full overflow-visible"
                  viewBox="0 0 180 10"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 7 Q48 2 92 6 Q136 9 178 3"
                    stroke="#3b82f6"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
          </h1>

          {/* Dynamic Subheadline */}
          <p className="mt-6 max-w-2xl text-base leading-[1.75] text-slate-600 sm:text-[1.05rem]">
            <span className="font-semibold text-slate-800">
              {selectedCountry.isp}
            </span>{" "}
            রেসিডেন্সিয়াল IP — সার্ভে, ফ্রিল্যান্সিং ও পেপ্যাল অ্যাকাউন্টের
            জন্য{" "}
            <strong className="font-semibold text-slate-900">
              100% ক্লিন {selectedCountry.code} VPS
            </strong>
            , পেমেন্ট করুন{" "}
            <strong className="font-semibold text-pink-600">বিকাশ</strong> বা{" "}
            <strong className="font-semibold text-orange-500">নগদে</strong>।
          </p>

          {/* Country Selection Chips */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="mr-1 flex items-center gap-1 text-xs font-semibold text-slate-500">
              <Globe size={13} className="text-blue-600" /> লোকেশন:
            </span>
            {SUPPORTED_COUNTRIES.map((country) => {
              const active = selectedCountry.code === country.code;
              return (
                <button
                  key={country.code}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedCountry(country)}
                  className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                    active
                      ? "border border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                      : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  <CountryFlag code={country.code} size={15} />
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
                className="flex items-center gap-2.5 text-xs text-slate-700 sm:text-sm"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <Check size={13} strokeWidth={2.75} />
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0"
            >
              <span>ISP Plans দেখুন — {formatPrice(2999)}/মাস</span>
              <ArrowRight size={16} />
            </Link>

            <button
              type="button"
              onClick={handleOpenChat}
              className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 shadow-2xs transition-all hover:border-slate-400 hover:bg-slate-50"
            >
              <MessageCircle size={16} className="text-indigo-600" />
              <span>লাইভ চ্যাটে প্রশ্ন করুন</span>
            </button>
          </div>

          {/* Payment Partners */}
          <div className="mt-7 flex flex-wrap items-center gap-2.5 border-t border-slate-100 pt-4">
            <span className="mr-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              পেমেন্ট মাধ্যম:
            </span>
            {[
              { name: "bKash", node: <BkashLogo className="h-4.5 w-auto" /> },
              { name: "Nagad", node: <NagadLogo className="h-4.5 w-auto" /> },
              {
                name: "Visa & Mastercard",
                node: <VisaLogo className="h-4.5 w-auto" />,
              },
              { name: "USDT", node: <UsdtLogo className="h-4.5 w-auto" /> },
            ].map((item) => (
              <div
                key={item.name}
                title={item.name}
                className="inline-flex h-8 items-center justify-center rounded-lg border border-slate-200/80 bg-white px-2.5 shadow-2xs transition-colors hover:border-slate-300"
              >
                {item.node}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column (5 cols): Residential Illustration + Minimal Live Trust Pills */}
        <motion.div
          className="relative flex items-center justify-center lg:col-span-5 lg:-mt-4"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          {/* Soft Cyan/Blue Glow Backdrop */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 m-auto h-[82%] w-[82%] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.22)_0%,rgba(59,130,246,0.12)_45%,transparent_72%)] blur-2xl"
          />

          <div className="relative w-full max-w-[460px] lg:max-w-none">
            {/* Floating House Illustration */}
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/residential.svg"
                alt="Clean Residential ISP IP VPS Illustration"
                width={540}
                height={480}
                priority
                className="h-auto w-full select-none drop-shadow-[0_20px_35px_rgba(37,99,235,0.14)]"
              />
            </motion.div>

            {/* Top-Left Floating Trust Pill */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="absolute top-3 left-1 sm:top-5 sm:left-2 inline-flex items-center gap-2 rounded-2xl border border-emerald-200/80 bg-white/90 px-3.5 py-2 shadow-lg shadow-slate-900/5 backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <div className="leading-tight">
                <p className="text-[11px] font-extrabold text-slate-900">
                  IPQS 0/100 Clean
                </p>
                <p className="text-[10px] font-medium text-emerald-700">
                  Zero Fraud · Static ISP
                </p>
              </div>
            </motion.div>

            {/* Bottom-Right Interactive Node Pill (Updates with Country Chips) */}
            <div className="absolute right-1 -bottom-2 sm:right-2 sm:bottom-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCountry.code}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2.5 rounded-2xl border border-slate-200/90 bg-white/95 px-3.5 py-2.5 shadow-lg shadow-blue-900/10 backdrop-blur-md"
                >
                  <CountryFlag code={selectedCountry.code} size={20} />
                  <div className="leading-tight">
                    <p className="text-[11px] font-bold text-slate-900">
                      {selectedCountry.isp}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] font-semibold text-slate-500">
                      <span>{selectedCountry.sampleIp}</span>
                      <span className="text-slate-300">•</span>
                      <span className="inline-flex items-center gap-0.5 text-blue-600">
                        <Wifi size={10} />
                        {selectedCountry.ping}
                      </span>
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom-Left Floating Protocol Pill
            <div className="absolute bottom-6 left-2 z-20 hidden items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-xs sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              <span className="font-mono text-[10.5px] font-bold tracking-wide text-slate-700">
                SOCKS5 · HTTP · HTTPS
              </span>
            </div> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
