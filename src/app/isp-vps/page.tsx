"use client";

import { LazyCheckoutDrawer } from "@/components/sections/isp/LazyCheckoutDrawer";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { useCurrency } from "@/lib/currency";
import { ISP_PLANS, IspPlan } from "@/lib/data/plans";
import {
  ArrowRight,
  Cpu,
  CreditCard,
  Gauge,
  HardDrive,
  MemoryStick,
  RefreshCw,
  ShieldCheck,
  Tag,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { FaWindows } from "react-icons/fa";

const CYCLES = [
  { id: "monthly", label: "১ মাস", months: 1, discount: 0 },
  { id: "quarterly", label: "৩ মাস", months: 3, discount: 0.05 },
  { id: "annual", label: "১২ মাস", months: 12, discount: 0.15 },
] as const;

type BillingCycle = (typeof CYCLES)[number]["id"];

const COUNTRY_CARRIERS: Record<
  string,
  { label: string; short: string; carriers: string[] }
> = {
  us: {
    label: "United States",
    short: "US",
    carriers: [
      "All",
      "AT&T",
      "Comcast",
      "Verizon",
      "Spectrum",
      "COX",
      "Frontier",
      "RCN",
    ],
  },
  uk: {
    label: "United Kingdom",
    short: "UK",
    carriers: ["All", "BT", "Virgin Media", "Vodafone UK"],
  },
  de: {
    label: "Germany",
    short: "DE",
    carriers: ["All", "Deutsche Telekom", "Vodafone DE", "O2 DE"],
  },
  fr: {
    label: "France",
    short: "FR",
    carriers: ["All", "Orange", "Free", "SFR"],
  },
};

const SUPPORTED_COUNTRIES = [
  { code: "us", label: "US" },
  { code: "uk", label: "UK" },
  { code: "de", label: "DE" },
  { code: "fr", label: "FR" },
];

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    color: "bg-blue-50 text-blue-600",
    text: "১০০% ডেডিকেটেড স্ট্যাটিক রেসিডেন্সিয়াল IP (শেয়ার্ড নয়)",
  },
  {
    icon: CreditCard,
    color: "bg-pink-50 text-pink-600",
    text: "বিকাশ, নগদ, রকেট ও ভিসা/মাস্টারকার্ডে সহজ লোকাল পেমেন্ট",
  },
  {
    icon: Zap,
    color: "bg-amber-50 text-amber-600",
    text: "৬০–৯০ সেকেন্ডে অটো-ডেলিভারি ও ২৪/৭ বনানী সাপোর্ট",
  },
  {
    icon: RefreshCw,
    color: "bg-emerald-50 text-emerald-600",
    text: "প্রথম ৭ দিনে ফ্রি IP রিপ্লেসমেন্ট (৮ম দিন থেকে ৳৩৫০)",
  },
];

function IspVpsContent() {
  const { formatPrice } = useCurrency();
  const searchParams = useSearchParams();

  const planParam = searchParams.get("plan");
  const countryParam = searchParams.get("country");
  const couponParam = searchParams.get("coupon") || "";

  const normalizedInitialCountry =
    countryParam && COUNTRY_CARRIERS[countryParam.toLowerCase()]
      ? countryParam.toLowerCase()
      : "us";

  const matchedInitialPlan = planParam
    ? (ISP_PLANS.find(
        (p) =>
          p.id.toLowerCase() === planParam.toLowerCase() ||
          p.tier.toLowerCase() === planParam.toLowerCase(),
      ) ?? null)
    : null;

  const [selectedCountry, setSelectedCountry] = useState(
    normalizedInitialCountry,
  );
  const [selectedCarrier, setSelectedCarrier] = useState("All");
  const [isFresh, setIsFresh] = useState(
    planParam === "vip" || matchedInitialPlan?.tier === "vip",
  );
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [activePlan, setActivePlan] = useState<IspPlan | null>(
    matchedInitialPlan,
  );
  const [prevParams, setPrevParams] = useState({ planParam, countryParam });

  if (
    prevParams.planParam !== planParam ||
    prevParams.countryParam !== countryParam
  ) {
    setPrevParams({ planParam, countryParam });
    if (planParam) {
      const match = ISP_PLANS.find(
        (p) =>
          p.id.toLowerCase() === planParam.toLowerCase() ||
          p.tier.toLowerCase() === planParam.toLowerCase(),
      );
      if (match) {
        setActivePlan(match);
        if (match.tier === "vip") setIsFresh(true);
      }
    }
    if (countryParam && COUNTRY_CARRIERS[countryParam.toLowerCase()]) {
      setSelectedCountry(countryParam.toLowerCase());
      setSelectedCarrier("All");
    }
  }

  const activeCountryMeta =
    COUNTRY_CARRIERS[selectedCountry] ?? COUNTRY_CARRIERS.us;
  const cycle = CYCLES.find((item) => item.id === billingCycle) ?? CYCLES[0];

  const handleCountryChange = (code: string) => {
    setSelectedCountry(code);
    setSelectedCarrier("All");
  };

  return (
    <div className="bg-slate-50 text-slate-900">
      {/* 1. Compact Fluid Hero with Right-Side Floating Protocol Card */}
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/vps-bg.webp')] bg-cover bg-center bg-no-repeat"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-slate-950/75"
        />

        <div className="shell relative z-10 py-10 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:py-16">
          {/* Left: Headline & Copy */}
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                Static Residential ISP · Dedicated IPv4
              </p>
              {couponParam && (
                <span className="rounded-md border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 font-mono text-[11px] font-bold text-emerald-300">
                  {couponParam.toUpperCase()} সিলেক্টেড
                </span>
              )}
            </div>

            <h1 className="mt-2.5 font-display text-[1.65rem] font-extrabold leading-[1.22] tracking-tight text-white sm:text-4xl">
              ডেডিকেটেড রেসিডেন্সিয়াল ISP VPS ও ক্লাউড ওয়ার্কস্টেশন
            </h1>
            <p className="mt-2.5 max-w-xl text-xs leading-relaxed text-slate-300 sm:mt-3 sm:text-base">
              US, UK, Germany ও France-এর ডেডিকেটেড হোম ব্রডব্যান্ড IP সহ
              প্রি-হার্ডেন্ড Windows 11 RDP। রিমোট ডেভেলপমেন্ট, QA টেস্টিং ও
              আন্তর্জাতিক বিজনেস অপারেশনের জন্য প্রস্তুত।
            </p>

            {/* Clean Inline Spec Line */}
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-slate-300">
              <span className="inline-flex items-center gap-1.5 text-white">
                <FaWindows size={13} className="text-[#38BDF8]" />
                Windows 10/11 RDP
              </span>
              <span className="text-slate-600">·</span>
              <span>Zero WebRTC Leak</span>
              <span className="text-slate-600">·</span>
              <span>৬০–৯০ সেকেন্ডে ডেলিভারি</span>
              <span className="text-slate-600">·</span>
              <span>৭-দিন ফ্রি IP Swap</span>
            </p>

            {/* Professional Use Cases Pills */}
            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-800/80 pt-3">
              <span className="text-[11px] font-semibold text-slate-400">
                উপযোগী ক্ষেত্রসমূহ:
              </span>
              <span className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-200">
                🛒 ই-কমার্স ও গ্লোবাল স্টোর
              </span>
              <span className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-200">
                📊 মার্কেট রিসার্চ ও ডেটা অ্যানালিটিক্স
              </span>
              <span className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-200">
                💻 রিমোট অফিস ও ফ্রিল্যান্সিং
              </span>
              <span className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-200">
                🛡️ অ্যাড ভেরিফিকেশন ও QA
              </span>
            </div>
          </div>

          {/* Right: Transparent Glassy Protocol & IP Type Card */}
          <div className="mt-6 w-full rounded-2xl border border-white/20 bg-white/[0.07] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/10 backdrop-blur-xl sm:max-w-md sm:p-5 lg:mt-0 lg:w-80 lg:shrink-0">
            <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
              <span className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-200/90 sm:text-[11px]">
                Supported Protocols
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                Ready
              </span>
            </div>

            {/* Responsive 4-Column Protocol Pills */}
            <div className="mt-3 grid grid-cols-4 gap-1.5 sm:gap-2">
              {["SOCKS5", "HTTP", "HTTPS", "RDP"].map((proto) => (
                <span
                  key={proto}
                  className="flex items-center justify-center rounded-lg border border-white/15 bg-white/10 py-1.5 font-mono text-[11px] font-bold tracking-wide text-white backdrop-blur-xs sm:text-xs"
                >
                  {proto}
                </span>
              ))}
            </div>

            {/* Quick IP Metadata */}
            <div className="mt-3.5 space-y-1.5 border-t border-white/15 pt-3 text-[11.5px] sm:text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-300">IP Type</span>
                <span className="text-right font-semibold text-white">
                  Static Residential ISP
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-300">Assignment</span>
                <span className="text-right font-semibold text-white">
                  100% Dedicated IPv4
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Responsive Filter Bar */}
      <section className="border-b border-slate-200 bg-white/95 backdrop-blur-md lg:sticky lg:top-16 lg:z-30">
        <div className="shell flex flex-col gap-3 py-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center justify-between gap-2.5 xl:contents">
            <div className="flex items-center gap-1 xl:border-r xl:border-slate-200 xl:pr-3">
              <span className="mr-1 hidden text-xs font-semibold text-slate-500 sm:inline">
                দেশ:
              </span>
              {SUPPORTED_COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleCountryChange(c.code)}
                  className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-all ${
                    selectedCountry === c.code
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-100/70 text-slate-600 hover:bg-slate-100 xl:bg-transparent"
                  }`}
                >
                  <CountryFlag code={c.code} size={14} />
                  <span>{c.label}</span>
                </button>
              ))}
            </div>

            <div className="inline-flex rounded-xl bg-slate-100 p-1 text-[11px] font-semibold sm:text-xs xl:order-last">
              <button
                type="button"
                onClick={() => setIsFresh(false)}
                className={`cursor-pointer whitespace-nowrap rounded-lg px-3 py-1.5 transition-colors ${
                  !isFresh
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600"
                }`}
              >
                Clean IP
              </button>
              <button
                type="button"
                onClick={() => setIsFresh(true)}
                className={`cursor-pointer whitespace-nowrap rounded-lg px-3 py-1.5 transition-colors ${
                  isFresh
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600"
                }`}
              >
                Virgin IP
              </button>
            </div>
          </div>

          <div className="-mx-4 flex items-center gap-1.5 overflow-x-auto px-4 pb-0.5 scrollbar-none sm:mx-0 sm:px-0 xl:flex-1 xl:px-2">
            <span className="mr-0.5 hidden shrink-0 text-xs font-semibold text-slate-500 sm:inline">
              ISP:
            </span>
            {activeCountryMeta.carriers.map((carrier) => (
              <button
                key={carrier}
                type="button"
                onClick={() => setSelectedCarrier(carrier)}
                className={`shrink-0 cursor-pointer whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                  selectedCarrier === carrier
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 xl:bg-transparent xl:hover:bg-slate-100"
                }`}
              >
                {carrier === "All" ? "Auto (Best IP)" : carrier}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Plans Grid */}
      <section className="py-10 sm:py-14 lg:py-16">
        <div className="shell">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CountryFlag code={selectedCountry} size={20} />
                <h2 className="font-display text-lg font-extrabold text-slate-900 sm:text-2xl">
                  {activeCountryMeta.label} ({activeCountryMeta.short})
                  প্ল্যানসমূহ
                </h2>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                প্রতিটি প্ল্যানে ডেডিকেটেড স্ট্যাটিক রেসিডেন্সিয়াল IP, ফুল
                Windows Admin এবং ৭-দিনের ফ্রি IP Swap সুবিধা অন্তর্ভুক্ত।
              </p>
            </div>

            <div className="grid w-full grid-cols-3 rounded-xl bg-slate-200/70 p-1 text-xs font-semibold sm:inline-flex sm:w-auto sm:text-sm">
              {CYCLES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setBillingCycle(item.id)}
                  className={`cursor-pointer whitespace-nowrap rounded-lg px-2.5 py-2 text-center transition-colors sm:px-3.5 sm:py-1.5 ${
                    billingCycle === item.id
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                  {item.discount > 0 && (
                    <span className="ml-1 text-[10px] font-bold text-emerald-700 sm:text-[11px]">
                      −{item.discount * 100}%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-5 sm:mt-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {ISP_PLANS.map((plan) => {
              const listPrice = isFresh ? plan.priceFreshBdt : plan.priceBdt;
              const monthly = Math.round(listPrice * (1 - cycle.discount));
              const total = monthly * cycle.months;
              const featured = plan.tier === "pro";
              const cleanOs = plan.os.replace(/\s*\(Pre-hardened\)/i, "");

              const specItems = [
                { icon: Cpu, label: "CPU", value: `${plan.specs.vcpu} vCPU` },
                {
                  icon: MemoryStick,
                  label: "RAM",
                  value: `${plan.specs.ram} GB`,
                },
                {
                  icon: HardDrive,
                  label: "NVMe",
                  value: `${plan.specs.nvme} GB`,
                },
                { icon: Gauge, label: "Port", value: plan.specs.bandwidth },
              ];

              return (
                <article
                  key={plan.id}
                  className={`flex flex-col rounded-2xl bg-white p-5 transition-all duration-200 sm:rounded-3xl sm:p-6 ${
                    featured
                      ? "ring-2 ring-blue-600 shadow-xl shadow-blue-600/10"
                      : "border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-base font-extrabold text-slate-900 sm:text-lg">
                      {plan.name}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      {featured && (
                        <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10.5px] font-bold text-white">
                          জনপ্রিয়
                        </span>
                      )}
                      <span className="flex items-center gap-1 rounded-full border border-emerald-200/70 bg-emerald-50 px-2 py-0.5 text-[10.5px] font-bold text-emerald-700">
                        <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                        {plan.stockCount} স্টকে
                      </span>
                    </div>
                  </div>

                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    {plan.tagline}
                  </p>

                  <div className="mt-4 border-y border-slate-100 py-3.5 sm:mt-5 sm:py-4">
                    <p className="font-display text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                      {formatPrice(monthly)}
                      <span className="text-xs font-medium text-slate-500 sm:text-sm">
                        {" "}
                        /মাস
                      </span>
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                      {cycle.months === 1
                        ? "মাসিক বিলিং · যেকোনো সময় ক্যানসেল"
                        : `${cycle.months} মাসে মোট ${formatPrice(total)} বিল`}
                    </p>
                  </div>

                  <dl className="mt-4 grid grid-cols-2 gap-2.5 text-xs sm:gap-3 sm:text-sm">
                    {specItems.map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2.5 rounded-xl bg-slate-50/90 px-3 py-2"
                      >
                        <Icon
                          size={15}
                          className="shrink-0 text-blue-600"
                          aria-hidden="true"
                        />
                        <div className="min-w-0">
                          <dt className="text-[10px] font-medium text-slate-500">
                            {label}
                          </dt>
                          <dd className="truncate font-bold text-slate-900">
                            {value}
                          </dd>
                        </div>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-4 flex-1 space-y-2.5 text-xs text-slate-700 sm:mt-5 sm:text-sm">
                    <li className="flex items-center gap-2.5">
                      <FaWindows
                        size={15}
                        className="shrink-0 text-[#0078D4]"
                        aria-hidden="true"
                      />
                      <span>Pre-hardened {cleanOs}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CountryFlag code={selectedCountry} size={15} />
                      <span>
                        Static{" "}
                        {selectedCarrier === "All"
                          ? "Residential"
                          : selectedCarrier}{" "}
                        IP
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <RefreshCw
                        size={14}
                        className="shrink-0 text-emerald-600"
                        aria-hidden="true"
                      />
                      <span>৭-দিনের ফ্রি IP Swap গ্যারান্টি</span>
                    </li>
                  </ul>

                  <button
                    type="button"
                    onClick={() => setActivePlan(plan)}
                    className={`mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all active:scale-[0.99] sm:mt-6 ${
                      featured
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700"
                        : "border border-slate-300 bg-white text-slate-900 hover:border-blue-600 hover:bg-blue-50/40 hover:text-blue-700"
                    }`}
                  >
                    <span>অর্ডার করুন ({activeCountryMeta.short})</span>
                    <ArrowRight size={15} />
                  </button>
                </article>
              );
            })}
          </div>

          <p className="mt-5 text-center text-xs text-slate-500">
            প্রথম ৭ দিন ফ্রি IP Swap সুবিধা (AUP সাপেক্ষে)। ৮ম দিন থেকে নতুন IP
            প্রয়োজন হলে ড্যাশবোর্ড থেকে মাত্র{" "}
            <strong className="font-semibold text-slate-700">৳৩৫০</strong>{" "}
            ফি-তে ইনস্ট্যান্ট পরিবর্তন করতে পারবেন।
          </p>

          {/* Compact Trust & Helpful Links */}
          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:mt-12 sm:rounded-3xl sm:p-8">
            <h2 className="font-display text-base font-extrabold text-slate-900 sm:text-xl">
              রিমোট ও প্রফেশনাল ক্লাউড কাজের জন্য primavps কেন নির্ভরযোগ্য?
            </h2>
            <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-sm">
              সাধারণ ডেটাসেন্টার আইপিতে অনেক আন্তর্জাতিক প্ল্যাটফর্মে ব্লকেজ বা
              সিকিউরিটি ফ্ল্যাগ দেখা দেয়। primavps-এর AT&amp;T, Comcast,
              Verizon বা BT-এর ১০০% খাঁটি ও ডেডিকেটেড স্ট্যাটিক হোম ব্রডব্যান্ড
              IP যেকোনো গ্লোবাল প্রফেশনাল সিস্টেমে নিরবচ্ছিন্ন এক্সেস নিশ্চিত
              করে।
            </p>

            <ul className="mt-5 grid gap-3 text-xs text-slate-700 sm:grid-cols-2 sm:text-sm">
              {TRUST_POINTS.map(({ icon: Icon, color, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                >
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-lg ${color}`}
                  >
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <span className="font-medium text-slate-800">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600 sm:mt-6 sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Users size={14} className="text-slate-400" />
                ১০+ সার্ভার দরকার?{" "}
                <Link
                  href="/resellers"
                  className="font-bold text-blue-600 hover:underline"
                >
                  রিসেলার প্রাইসিং দেখুন
                </Link>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Tag size={14} className="text-slate-400" />
                কুপন কোড ব্যবহার করুন:{" "}
                <Link
                  href="/hot-deals"
                  className="font-bold text-blue-600 hover:underline"
                >
                  হট ডিলস দেখুন
                </Link>
              </span>
            </div>
          </section>
        </div>
      </section>

      {/* 4. Lazy-Loaded Checkout Drawer */}
      <LazyCheckoutDrawer
        plan={activePlan}
        carrier={selectedCarrier}
        isFresh={isFresh}
        initialBillingCycle={billingCycle}
        initialCountry={selectedCountry}
        initialCoupon={couponParam}
        onClose={() => setActivePlan(null)}
      />
    </div>
  );
}

export default function IspVpsPage() {
  return (
    <Suspense
      fallback={
        <div className="shell flex min-h-[50vh] items-center justify-center py-20 text-slate-500">
          প্ল্যানসমূহ লোড হচ্ছে...
        </div>
      }
    >
      <IspVpsContent />
    </Suspense>
  );
}