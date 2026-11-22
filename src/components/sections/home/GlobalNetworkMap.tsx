"use client";

import { CountryFlag } from "@/components/ui/CountryFlag";
import { Reveal } from "@/components/ui/reveal";
import { Activity, ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type LocationId = "usa" | "europe" | "dhaka";

interface NetworkLocation {
  id: LocationId;
  city: string;
  tag: string;
  flags: string[];
  role: string;
  detail: string;
  latency: string;
  status: string;
  footerLabel: string;
  mapX: string;
  mapY: string;
  mapTooltip: string;
  dotColor: string;
  pingColor: string;
}

// Secondary US State IP Pools radiating from Core Server (Ashburn & Dallas)
const US_SECONDARY_STATES = [
  {
    code: "CA",
    name: "California",
    x: "18.5%",
    y: "40.5%",
    svgX: 296,
    svgY: 365,
  },
  {
    code: "IL",
    name: "Illinois",
    x: "25.5%",
    y: "36.5%",
    svgX: 408,
    svgY: 328,
  },
  { code: "NY", name: "New York", x: "29.5%", y: "36%", svgX: 472, svgY: 324 },
  { code: "GA", name: "Georgia", x: "27.5%", y: "41.5%", svgX: 440, svgY: 374 },
  { code: "FL", name: "Florida", x: "28.2%", y: "44.5%", svgX: 451, svgY: 400 },
];

const LOCATIONS: NetworkLocation[] = [
  {
    id: "usa",
    city: "USA (Ashburn & Dallas)",
    tag: "US ISP & Cloud Hub",
    flags: ["us"],
    role: "AT&T · Comcast · Verizon · Cox · Spectrum +২",
    detail:
      "Ashburn, VA ও Dallas, TX ডেটাসেন্টারে হোস্টেড—মাল্টি-স্টেট US জিওলোকেশন (CA, FL, GA, IL, VA, TX ও আরও স্টেট) সহ ডেডিকেটেড স্ট্যাটিক রেসিডেন্সিয়াল IP।",
    latency: "~178 ms",
    status: "99.98% Uptime SLA",
    footerLabel: "Tier-1 US Network",
    mapX: "24%",
    mapY: "40%",
    mapTooltip: "Ashburn, VA & Dallas, TX (~178 ms)",
    dotColor: "bg-blue-600",
    pingColor: "bg-blue-500",
  },
  {
    id: "europe",
    city: "Europe (UK · DE · FR)",
    tag: "European ISP Hub",
    flags: ["uk", "de", "fr"],
    role: "BT · Telekom · Orange Routing",
    detail:
      "লন্ডন, ফ্রাঙ্কফুর্ট ও প্যারিস রেসিডেন্সিয়াল নোড — AMS-IX ডিরেক্ট পিয়ারিংয়ে বাংলাদেশ থেকে লো-লেটেন্সি কানেকশন।",
    latency: "~146 ms",
    status: "99.99% Uptime SLA",
    footerLabel: "AMS-IX Interconnect",
    mapX: "49%",
    mapY: "32%",
    mapTooltip: "UK · DE · FR Hub · ~146 ms",
    dotColor: "bg-indigo-600",
    pingColor: "bg-indigo-500",
  },
  {
    id: "dhaka",
    city: "Bangladesh (Dhaka)",
    tag: "Operations & BDIX Desk",
    flags: ["bd"],
    role: "বনানী, ঢাকা ইঞ্জিনিয়ারিং ডেস্ক",
    detail:
      "রোড ১১, বনানী · ডিরেক্ট BDIX গেটওয়ে অপ্টিমাইজেশন এবং ২৪/৭ অন-সাইট বাংলাদেশি টেকনিক্যাল সাপোর্ট টিম।",
    latency: "< 5 ms BDIX",
    status: "গড়ে ৩ মিনিটে রিপ্লাই",
    footerLabel: "Local Support Hub",
    mapX: "71.5%",
    mapY: "46.5%",
    mapTooltip: "Dhaka BDIX Desk · <5 ms",
    dotColor: "bg-emerald-600",
    pingColor: "bg-emerald-500",
  },
];

export function GlobalNetworkMap() {
  const [activeLocation, setActiveLocation] = useState<LocationId>("usa");

  return (
    <section
      id="network"
      className="relative isolate scroll-mt-24 overflow-hidden border-b border-slate-200/80 bg-white py-16 sm:py-24"
    >
      {/* Subtle top wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(37,99,235,0.04),transparent_70%)]"
      />

      <div className="shell relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ── LEFT COLUMN: Hook Copy, Real Metrics & Secondary Action ── */}
          <Reveal className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Global Tier-1 Network
            </p>

            <h2 className="mt-2.5 font-display text-2xl font-extrabold leading-[1.2] tracking-tight text-slate-900 sm:text-4xl">
              ঢাকা থেকে ল্যাগ-ফ্রি
              <br />
              <span className="text-blue-600">গ্লোবাল ISP নেটওয়ার্ক</span>
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              আমেরিকা ও ইউরোপের শীর্ষ টিয়ার-১ ডাটা সেন্টারের সাথে আমাদের{" "}
              <strong className="font-semibold text-slate-800">
                বনানী, ঢাকা BDIX গেটওয়ে
              </strong>{" "}
              সরাসরি যুক্ত—ফলে RDP স্ক্রিন থাকে স্মুথ, আর যেকোনো সমস্যায় পান
              তাৎক্ষণিক লোকাল ইঞ্জিনিয়ারিং সাপোর্ট।
            </p>

            {/* Compact Trust Metrics */}
            <div className="mt-6 grid grid-cols-3 gap-3 border-y border-slate-100 py-4">
              <div>
                <p className="font-display text-lg font-extrabold text-slate-900 sm:text-xl">
                  99.98%
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                  আপটাইম SLA
                </p>
              </div>
              <div>
                <p className="font-display text-lg font-extrabold text-slate-900 sm:text-xl">
                  &lt;180ms
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                  ঢাকা → US পিং
                </p>
              </div>
              <div>
                <p className="font-display text-lg font-extrabold text-emerald-600 sm:text-xl">
                  24/7
                </p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                  বনানী সাপোর্ট
                </p>
              </div>
            </div>

            {/* Secondary Status Link */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/status"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-800 shadow-2xs transition-all hover:border-blue-600 hover:bg-blue-50/40 hover:text-blue-700 sm:text-sm"
              >
                <Activity size={15} className="text-emerald-600" />
                <span>লাইভ নেটওয়ার্ক স্ট্যাটাস দেখুন</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>

          {/* ── RIGHT COLUMN: Clean World Map + Live Interactive Routing ── */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-2 sm:p-4 shadow-xs">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/world-map.webp"
                  alt="primavps Global Tier-1 Network — USA, Europe & Dhaka BDIX Hub"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  priority
                  className="object-contain select-none"
                />

                {/* SVG Routing Arcs + US Multi-State Dotted Spokes */}
                <svg
                  aria-hidden
                  viewBox="0 0 1600 900"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  fill="none"
                >
                  {/* Dhaka -> USA Core Route */}
                  <path
                    d="M 1144 418 Q 760 110 384 360"
                    stroke={activeLocation === "usa" ? "#2563EB" : "#94A3B8"}
                    strokeWidth={activeLocation === "usa" ? "2.5" : "1.5"}
                    strokeDasharray="6 6"
                    strokeOpacity={activeLocation === "usa" ? "0.85" : "0.35"}
                    className="transition-all duration-300"
                  />

                  {/* Dhaka -> Europe Route */}
                  <path
                    d="M 1144 418 Q 960 220 784 288"
                    stroke={activeLocation === "europe" ? "#4F46E5" : "#94A3B8"}
                    strokeWidth={activeLocation === "europe" ? "2.5" : "1.5"}
                    strokeDasharray="6 6"
                    strokeOpacity={
                      activeLocation === "europe" ? "0.85" : "0.35"
                    }
                    className="transition-all duration-300"
                  />

                  {/* US Core (Ashburn & Dallas) -> Secondary State IP Pools (CA, IL, NY, GA, FL) */}
                  {US_SECONDARY_STATES.map((st) => (
                    <line
                      key={st.code}
                      x1={384}
                      y1={360}
                      x2={st.svgX}
                      y2={st.svgY}
                      stroke="#3B82F6"
                      strokeWidth={activeLocation === "usa" ? "1.6" : "1"}
                      strokeDasharray="3 4"
                      strokeOpacity={activeLocation === "usa" ? "0.7" : "0.2"}
                      className="transition-all duration-300"
                    />
                  ))}
                </svg>

                {/* Secondary US State Dots (CA, IL, NY, GA, FL) */}
                {US_SECONDARY_STATES.map((st) => (
                  <button
                    key={st.code}
                    type="button"
                    onClick={() => setActiveLocation("usa")}
                    aria-label={`${st.name} (${st.code}) IP Pool`}
                    style={{ left: st.x, top: st.y }}
                    className={`group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-opacity duration-300 focus:outline-none ${
                      activeLocation === "usa"
                        ? "opacity-100"
                        : "opacity-35 hover:opacity-80"
                    }`}
                  >
                    <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                      {activeLocation === "usa" && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-50" />
                      )}
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500 ring-1.5 ring-white shadow-xs transition-transform group-hover:scale-125" />
                    </span>

                    {/* Hover State Tooltip */}
                    <span className="pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-0.5 text-[9.5px] font-semibold text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 z-30">
                      {st.code} · IP Pool
                    </span>
                  </button>
                ))}

                {/* Primary Interactive Map Beacons */}
                {LOCATIONS.map((loc) => {
                  const isActive = activeLocation === loc.id;
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setActiveLocation(loc.id)}
                      aria-label={`Select ${loc.city}`}
                      aria-pressed={isActive}
                      style={{ left: loc.mapX, top: loc.mapY }}
                      className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 focus:outline-none"
                    >
                      <span className="relative flex h-6 w-6 items-center justify-center">
                        <span
                          className={`absolute inline-flex h-full w-full rounded-full ${loc.pingColor} ${
                            isActive
                              ? "animate-ping opacity-65"
                              : "opacity-25 group-hover:opacity-50"
                          }`}
                        />
                        <span
                          className={`relative inline-flex rounded-full ring-2 ring-white shadow-sm transition-transform ${
                            loc.dotColor
                          } ${isActive ? "h-3.5 w-3.5 scale-110" : "h-2.5 w-2.5 group-hover:scale-110"}`}
                        />
                      </span>

                      {/* Active or Hover Floating Pill */}
                      <span
                        className={`pointer-events-none absolute left-1/2 bottom-full mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1 text-[10px] font-bold shadow-md transition-all z-20 ${
                          isActive
                            ? "bg-slate-900 text-white opacity-100 translate-y-0"
                            : "bg-slate-900/90 text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                        }`}
                      >
                        {loc.mapTooltip}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── THREE INTERACTIVE LOCATION CARDS ── */}
        <Reveal className="mt-10 grid gap-4 md:grid-cols-3" delay={0.15}>
          {LOCATIONS.map((loc) => {
            const isSelected = activeLocation === loc.id;
            return (
              <button
                key={loc.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveLocation(loc.id)}
                className={`flex flex-col rounded-2xl border p-5 text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/30 shadow-md ring-1 ring-blue-600/20"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                {/* Card Header: Flags + City + Latency */}
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="flex items-center gap-2 font-display text-sm font-extrabold text-slate-900 sm:text-[15px]">
                    <span className="flex items-center -space-x-1">
                      {loc.flags.map((code) => (
                        <CountryFlag key={code} code={code} size={16} />
                      ))}
                    </span>
                    <span>{loc.city}</span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {loc.latency}
                  </span>
                </div>

                {/* Role */}
                <p className="mt-2.5 text-xs font-bold text-blue-700">
                  {loc.role}
                </p>

                {/* Description */}
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-600">
                  {loc.detail}
                </p>

                {/* Status Footer */}
                <div className="mt-4 flex w-full items-center justify-between border-t border-slate-100 pt-3 text-[11px]">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    {loc.status}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-slate-400">
                    <MapPin size={11} />
                    {loc.footerLabel}
                  </span>
                </div>
              </button>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
