"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LOCATIONS = [
  {
    id: "usa",
    city: "USA (Dallas & Ashburn)",
    badge: "সার্ভার লোকেশন",
    count: 2,
    role: "Residential ISP & Cloud Compute Hub",
    detail: "Infomart Dallas (AT&T, Comcast ISP) এবং Equinix Ashburn (Gen4 NVMe KVM ক্লাউড)",
    latency: "178 ms avg",
    status: "Active · 99.98% SLA",
  },
  {
    id: "netherlands",
    city: "Netherlands (Amsterdam)",
    badge: "সার্ভার লোকেশন",
    count: 1,
    role: "European Transit Hub",
    detail: "AMS-IX Interconnect · ইউরোপ ও মিডল-ইস্ট কম-লেটেন্সি অপ্টিমাইজড রাউটিং",
    latency: "142 ms edge",
    status: "Active · 99.99% SLA",
  },
  {
    id: "dhaka",
    city: "Bangladesh (Dhaka)",
    badge: "অপারেশনস ও সাপোর্ট ডেস্ক",
    count: 1,
    role: "BDIX Peering & Support Gateway Desk",
    detail: "রোড ১১, বনানী · ডিরেক্ট BDIX লিংক ও ২৪/৭ অন-সাইট বাংলাদেশি ইঞ্জিনিয়ারিং টিম",
    latency: "< 5 ms BDIX",
    status: "Active · ৩ মিনিটে রিপ্লাই",
  },
];

export function GlobalNetworkMap() {
  const [activeLocation, setActiveLocation] = useState<string>("usa");

  return (
    <section
      id="network"
      className="relative isolate scroll-mt-24 overflow-hidden bg-white py-20 sm:py-28 border-b border-slate-200/80"
    >
      {/* Background subtle radial wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(37,99,235,0.04),transparent_70%)]"
      />

      <div className="shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ── LEFT COLUMN: Text, Stats, and Action Button ── */}
          <div className="relative lg:col-span-5">
            {/* Decorative Dotted Matrix */}
            <div
              aria-hidden
              className="absolute -top-7 -left-5 grid grid-cols-5 gap-2 opacity-35 pointer-events-none select-none"
            >
              {[...Array(20)].map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-blue-600/70"
                />
              ))}
            </div>

            <Reveal className="relative z-10">
              {/* Eyebrow */}
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                গ্লোবাল ইনফ্রাস্ট্রাকচার · GLOBAL NETWORK
              </p>

              {/* Main Heading with Wavy Purple Underline */}
              <h2 className="mt-3.5 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.65rem] leading-[1.12]">
                বিশ্বমানের টিয়ার-১
                <br />
                <span className="relative inline-block text-slate-900">
                  <span className="text-slate-900">গ্লোবাল নেটওয়ার্ক</span>
                  {/* Purple/Indigo Hand-Drawn Wavy Underline */}
                  <svg
                    aria-hidden
                    className="absolute -bottom-2 left-0 w-full text-indigo-600/90 overflow-visible"
                    viewBox="0 0 260 14"
                    fill="none"
                  >
                    <path
                      d="M 3 9 C 55 13, 120 5, 180 8 C 220 10, 248 6, 258 5"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>

              {/* Secondary title context */}
              <p className="mt-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
                US Cloud Nodes · Dhaka Operations &amp; BDIX Gateway Desk
              </p>

              {/* Description Paragraph */}
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-600">
                আমেরিকার ডালাস ও অ্যাশবার্নের শীর্ষ টিয়ার-১ ডাটা সেন্টার থেকে সর্বোচ্চ
                কম্পিউটিং পারফরম্যান্স, যার সম্পূর্ণ সাপোর্ট ও ট্রাফিক অপ্টিমাইজেশন
                সরাসরি পরিচালিত হয় বনানী, ঢাকার ইঞ্জিনিয়ারিং ডেস্ক থেকে।
              </p>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                কোনো মিথ্যা বা কাল্পনিক ক্লেইম নেই—৯৯.৯৮% বাস্তব আপটাইম SLA এবং সরাসরি
                BDIX ক্যাবল সংযোগ।
              </p>

              {/* Hub Count Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-2 text-sm font-medium text-slate-700">
                <button
                  type="button"
                  onClick={() => setActiveLocation("usa")}
                  className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs transition-colors ${
                    activeLocation === "usa"
                      ? "bg-blue-100 font-bold text-blue-900"
                      : "hover:bg-slate-100 text-slate-600"
                  }`}
                >
                  USA নোড <strong className="font-bold text-blue-600">(২টি)</strong>
                </button>
                <span className="text-slate-300">·</span>
                <button
                  type="button"
                  onClick={() => setActiveLocation("netherlands")}
                  className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs transition-colors ${
                    activeLocation === "netherlands"
                      ? "bg-blue-100 font-bold text-blue-900"
                      : "hover:bg-slate-100 text-slate-600"
                  }`}
                >
                  Netherlands <strong className="font-bold text-blue-600">(১টি)</strong>
                </button>
                <span className="text-slate-300">·</span>
                <button
                  type="button"
                  onClick={() => setActiveLocation("dhaka")}
                  className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs transition-colors ${
                    activeLocation === "dhaka"
                      ? "bg-emerald-100 font-bold text-emerald-900"
                      : "hover:bg-slate-100 text-slate-600"
                  }`}
                >
                  Dhaka Desk <strong className="font-bold text-emerald-600">(BDIX)</strong>
                </button>
              </div>

              {/* Action Button */}
              <div className="relative mt-8 inline-block pb-8">
                <Link
                  href="/status"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 active:scale-[0.98]"
                >
                  লাইভ নেটওয়ার্ক স্ট্যাটাস দেখুন <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT COLUMN: Clean World Map Image ── */}
          <div className="relative lg:col-span-7 flex flex-col items-center justify-center">
            <Reveal
              delay={0.15}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white p-2"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/world-map.webp"
                  alt="বিশ্বমানের টিয়ার-১ গ্লোবাল নেটওয়ার্ক — US Nodes & Dhaka Desk"
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  unoptimized
                  priority
                  className="object-contain"
                />

                {/* USA (Dallas/Ashburn) beacon */}
                <div
                  className="absolute left-[18%] top-[34%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  onClick={() => setActiveLocation("usa")}
                >
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-600 ring-2 ring-white" />
                  </span>
                  <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 mt-1 hidden group-hover:block whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[10px] font-bold text-white shadow-md z-20">
                    Dallas &amp; Ashburn (178ms)
                  </div>
                </div>

                {/* Netherlands beacon */}
                <div
                  className="absolute left-[48.5%] top-[29%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  onClick={() => setActiveLocation("netherlands")}
                >
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-500 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
                  </span>
                  <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 mt-1 hidden group-hover:block whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[10px] font-bold text-white shadow-md z-20">
                    Amsterdam Hub (142ms)
                  </div>
                </div>

                {/* Dhaka beacon */}
                <div
                  className="absolute left-[68%] top-[51.5%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  onClick={() => setActiveLocation("dhaka")}
                >
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600 ring-2 ring-white" />
                  </span>
                  <div className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 mt-1 hidden group-hover:block whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[10px] font-bold text-white shadow-md z-20">
                    Dhaka Operations Desk (&lt;5ms BDIX)
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── THREE LOCATION CARDS ── */}
        <Reveal
          className="mt-14 grid gap-5 sm:grid-cols-3"
          delay={0.2}
        >
          {LOCATIONS.map((loc) => {
            const isSelected = activeLocation === loc.id;
            return (
              <div
                key={loc.id}
                onClick={() => setActiveLocation(loc.id)}
                className={`cursor-pointer rounded-3xl border p-5 transition-all duration-200 ${
                  isSelected
                    ? "border-blue-500 bg-blue-50/40 shadow-md ring-2 ring-blue-500/10"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-display text-base font-bold text-slate-900">
                    <MapPin
                      size={17}
                      className={isSelected ? "text-blue-600" : "text-slate-400"}
                    />
                    {loc.city}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {loc.latency}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs font-bold text-blue-700">
                    {loc.role}
                  </p>
                  <span className="text-[10px] font-medium text-slate-400">
                    {loc.badge}
                  </span>
                </div>

                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {loc.detail}
                </p>

                <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {loc.status}
                  </span>
                  <span className="text-slate-400 font-mono text-[10px]">
                    {loc.id === "dhaka" ? "Support Gateway" : "Tier-1 Network"}
                  </span>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
