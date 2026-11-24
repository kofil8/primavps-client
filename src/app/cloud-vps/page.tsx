"use client";

import {
  CheckoutDrawer,
  CheckoutPlan,
} from "@/components/sections/isp/CheckoutDrawer";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { useCurrency } from "@/lib/currency";
import {
  CLOUD_OS_LIST,
  CLOUD_PRESETS,
  CLOUD_REGIONS,
  CloudOs,
  CloudPreset,
  CloudRegion,
  calculateCloudPrice,
} from "@/lib/data/plans";
import {
  ArrowRight,
  Check,
  Cpu,
  HardDrive,
  Info,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import {
  FaCentos,
  FaDocker,
  FaFedora,
  FaLinux,
  FaUbuntu,
  FaWindows,
} from "react-icons/fa";
import { SiAlmalinux, SiAmd, SiDebian, SiRockylinux } from "react-icons/si";

// ─── Real OS Brand Icon Mapper (react-icons) ──────────────────────────────────
function OsBrandIcon({ os, size = 22 }: { os: CloudOs; size?: number }) {
  const key = `${os.id} ${os.name}`.toLowerCase();

  if (key.includes("ubuntu"))
    return <FaUbuntu size={size} className="text-[#E95420]" />;
  if (key.includes("windows"))
    return <FaWindows size={size} className="text-[#0078D4]" />;
  if (key.includes("debian"))
    return <SiDebian size={size} className="text-[#A81D33]" />;
  if (key.includes("alma"))
    return <SiAlmalinux size={size} className="text-[#0F4266]" />;
  if (key.includes("rocky"))
    return <SiRockylinux size={size} className="text-[#10B981]" />;
  if (key.includes("centos"))
    return <FaCentos size={size} className="text-[#932279]" />;
  if (key.includes("fedora"))
    return <FaFedora size={size} className="text-[#51A2DA]" />;
  if (key.includes("docker"))
    return <FaDocker size={size} className="text-[#2496ED]" />;

  return <FaLinux size={size} className="text-slate-700" />;
}

// ─── Region Country Flag Mapper ───────────────────────────────────────────────
function getRegionCountryCode(region: CloudRegion): string {
  const text =
    `${region.id} ${region.location} ${region.city} ${region.state}`.toLowerCase();
  if (
    text.includes("uk") ||
    text.includes("london") ||
    text.includes("manchester")
  )
    return "uk";
  if (
    text.includes("germany") ||
    text.includes("frankfurt") ||
    text.includes("berlin") ||
    text.includes("de")
  )
    return "de";
  if (text.includes("france") || text.includes("paris") || text.includes("fr"))
    return "fr";
  if (
    text.includes("netherlands") ||
    text.includes("amsterdam") ||
    text.includes("nl")
  )
    return "nl";
  if (text.includes("singapore") || text.includes("sg")) return "sg";
  return "us";
}

function CloudVpsContent() {
  const { formatPrice, formatHourly } = useCurrency();
  const searchParams = useSearchParams();
  const couponParam = searchParams.get("coupon") || "";

  const [region, setRegion] = useState<CloudRegion>(CLOUD_REGIONS[0]);
  const [os, setOs] = useState<CloudOs>(CLOUD_OS_LIST[0]);
  const [vcpu, setVcpu] = useState(2);
  const [ram, setRam] = useState(4);
  const [nvme, setNvme] = useState(80);
  const [residentialIp, setResidentialIp] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const minRam = os.family === "windows" ? 4 : 2;
  const activeCountryCode = getRegionCountryCode(region);

  const applyPreset = (preset: CloudPreset) => {
    setVcpu(preset.vcpu);
    setRam(Math.max(preset.ram, minRam));
    setNvme(preset.nvme);
  };

  const selectOs = (next: CloudOs) => {
    setOs(next);
    if (next.family === "windows" && ram < 4) setRam(4);
  };

  const clamp = (val: number, min: number, max: number) =>
    Math.min(max, Math.max(min, val));

  const totalPrice = calculateCloudPrice(vcpu, ram, nvme, residentialIp);

  const plan: CheckoutPlan = {
    id: `cloud-${vcpu}c-${ram}g`,
    name: `Cloud VPS · ${vcpu} vCPU / ${ram} GB`,
    priceBdt: totalPrice,
    isCloud: true,
    osName: os.name,
    regionName: `${region.city}, ${region.state}`,
    specs: {
      vcpu,
      ram,
      nvme,
      bandwidth: "1 Gbps Unmetered",
    },
  };

  const sliderClass =
    "h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-blue-600";

  return (
    <div className="bg-slate-50 pb-40 text-slate-900 md:pb-24 lg:pb-0">
      {/* 1. Cloud Console Hero */}
      <section className="relative isolate overflow-hidden border-b border-slate-800 bg-slate-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.24),transparent_48%),radial-gradient(circle_at_85%_20%,rgba(14,165,233,0.16),transparent_45%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] [background-size:32px_32px]"
        />

        <div className="shell relative z-10 py-10 sm:py-14">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/25 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold text-blue-300 sm:text-xs">
              <SiAmd size={14} aria-hidden="true" />
              <span>AMD EPYC™ Gen4 · NVMe KVM Cloud</span>
            </span>
            {couponParam && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-1 font-mono text-[11px] font-bold text-emerald-300">
                <Sparkles size={12} aria-hidden="true" />
                {couponParam.toUpperCase()} সিলেক্টেড
              </span>
            )}
          </div>

          <h1 className="mt-3.5 max-w-2xl font-display text-[1.7rem] font-extrabold leading-[1.2] tracking-tight text-white sm:text-4xl">
            হাই-স্পিড Cloud NVMe VPS ডিপ্লয় করুন
          </h1>
          <p className="mt-2.5 max-w-2xl text-xs leading-relaxed text-slate-300 sm:mt-3 sm:text-base">
            ডেডিকেটেড NVMe স্টোরেজ, ফুল রুট/অ্যাডমিন অ্যাক্সেস এবং ১ Gbps পোর্ট।
            পছন্দের লোকেশন, OS ও রিসোর্স বেছে নিয়ে ৯০ সেকেন্ডে সার্ভার চালু
            করুন।
          </p>

          {/* Hardware Spec Pills */}
          <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-300 sm:gap-3 sm:text-xs">
            {[
              "AMD EPYC™ 9004 Series",
              "Enterprise Gen4 NVMe",
              "1 Gbps Unmetered",
              "DDoS Protected",
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1"
              >
                <Zap size={12} className="text-sky-400" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Vultr / DigitalOcean-Style Cloud Configurator */}
      <section className="py-8 sm:py-12">
        <div className="shell grid items-start gap-6 lg:grid-cols-[1.6fr_1fr] xl:gap-8">
          {/* Left Column: 4 Numbered Cloud Steps */}
          <div className="space-y-5">
            {/* STEP 1: Datacenter Location */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:p-6">
              <div className="flex items-center gap-2.5">
                <span className="grid size-6 place-items-center rounded-md bg-blue-600 font-mono text-xs font-bold text-white">
                  1
                </span>
                <h2 className="font-display text-base font-extrabold text-slate-900 sm:text-lg">
                  ডেটাসেন্টার লোকেশন বেছে নিন
                </h2>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {CLOUD_REGIONS.map((item) => {
                  const active = region.id === item.id;
                  const flagCode = getRegionCountryCode(item);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setRegion(item)}
                      className={`group relative flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                        active
                          ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/15"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60"
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        <CountryFlag code={flagCode} size={22} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="truncate text-sm font-bold text-slate-900">
                            {item.city}
                          </span>
                          <span
                            className="size-2 shrink-0 rounded-full bg-emerald-500"
                            title="Online"
                          />
                        </div>
                        <span className="mt-0.5 block truncate text-xs text-slate-500">
                          {item.state} · {item.location}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: OS Image with Real Brand Icons */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:p-6">
              <div className="flex items-center gap-2.5">
                <span className="grid size-6 place-items-center rounded-md bg-blue-600 font-mono text-xs font-bold text-white">
                  2
                </span>
                <h2 className="font-display text-base font-extrabold text-slate-900 sm:text-lg">
                  অপারেটিং সিস্টেম (OS Image)
                </h2>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                {CLOUD_OS_LIST.map((item) => {
                  const active = os.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectOs(item)}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                        active
                          ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/15"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60"
                      }`}
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200/70 bg-slate-50">
                        <OsBrandIcon os={item} size={22} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-slate-900">
                          {item.name}
                        </span>
                        <span className="mt-0.5 block truncate text-[11px] text-slate-500">
                          {item.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {os.family === "windows" && (
                <p className="mt-3.5 flex items-center gap-1.5 rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-2 text-xs font-medium text-blue-800">
                  <Info size={14} className="shrink-0 text-blue-600" />
                  <span>
                    Windows OS-এর স্মুথ পারফরম্যান্সের জন্য ন্যূনতম ৪ GB RAM সেট
                    করা হয়েছে।
                  </span>
                </p>
              )}
            </div>

            {/* STEP 3: Server Size (Preset Cards + Custom Resource Sliders) */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-6 place-items-center rounded-md bg-blue-600 font-mono text-xs font-bold text-white">
                    3
                  </span>
                  <h2 className="font-display text-base font-extrabold text-slate-900 sm:text-lg">
                    সার্ভার সাইজ ও রিসোর্স
                  </h2>
                </div>
                <span className="hidden rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 sm:inline">
                  প্রিসেট অথবা কাস্টম
                </span>
              </div>

              {/* Vultr / DO-Style Preset Cards */}
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {CLOUD_PRESETS.map((preset) => {
                  const effectiveRam = Math.max(preset.ram, minRam);
                  const active =
                    vcpu === preset.vcpu &&
                    ram === effectiveRam &&
                    nvme === preset.nvme;
                  const presetPrice = calculateCloudPrice(
                    preset.vcpu,
                    effectiveRam,
                    preset.nvme,
                    residentialIp,
                  );

                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className={`flex cursor-pointer flex-col justify-between rounded-xl border p-3 text-left transition-all ${
                        active
                          ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/15"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60"
                      }`}
                    >
                      <div>
                        <span className="block text-xs font-extrabold text-slate-900">
                          {preset.label}
                        </span>
                        <span className="mt-1 block font-mono text-[11px] text-slate-500">
                          {preset.vcpu} vCPU · {effectiveRam} GB
                        </span>
                        <span className="block font-mono text-[11px] text-slate-500">
                          {preset.nvme} GB NVMe
                        </span>
                      </div>
                      <p className="mt-2.5 border-t border-slate-100 pt-2 font-display text-sm font-black text-blue-700">
                        {formatPrice(presetPrice)}
                        <span className="text-[10px] font-medium text-slate-400">
                          /mo
                        </span>
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Custom Fine-Tune Sliders */}
              <div className="mt-6 space-y-5 border-t border-slate-100 pt-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  অথবা স্লাইডার দিয়ে কাস্টমাইজ করুন
                </p>

                {/* CPU */}
                <div>
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                      <Cpu size={14} className="text-blue-600" />
                      <span>vCPU কোর</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Decrease vCPU"
                        onClick={() => setVcpu((v) => clamp(v - 1, 1, 16))}
                        className="grid size-7 cursor-pointer place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="min-w-[66px] text-center font-mono text-sm font-bold text-slate-900">
                        {vcpu} vCPU
                      </span>
                      <button
                        type="button"
                        aria-label="Increase vCPU"
                        onClick={() => setVcpu((v) => clamp(v + 1, 1, 16))}
                        className="grid size-7 cursor-pointer place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={16}
                    value={vcpu}
                    aria-label="vCPU cores"
                    onChange={(e) => setVcpu(Number(e.target.value))}
                    className={`mt-2.5 ${sliderClass}`}
                  />
                  <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-400">
                    <span>1 vCPU</span>
                    <span>16 vCPU</span>
                  </div>
                </div>

                {/* RAM */}
                <div>
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="font-semibold text-slate-700">
                      মেমোরি (DDR5 RAM)
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Decrease RAM"
                        onClick={() => setRam((r) => clamp(r - 2, minRam, 64))}
                        className="grid size-7 cursor-pointer place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="min-w-[66px] text-center font-mono text-sm font-bold text-slate-900">
                        {ram} GB
                      </span>
                      <button
                        type="button"
                        aria-label="Increase RAM"
                        onClick={() => setRam((r) => clamp(r + 2, minRam, 64))}
                        className="grid size-7 cursor-pointer place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={minRam}
                    max={64}
                    step={2}
                    value={ram}
                    aria-label="Memory in GB"
                    onChange={(e) => setRam(Number(e.target.value))}
                    className={`mt-2.5 ${sliderClass}`}
                  />
                  <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-400">
                    <span>{minRam} GB</span>
                    <span>64 GB</span>
                  </div>
                </div>

                {/* NVMe */}
                <div>
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                      <HardDrive size={14} className="text-blue-600" />
                      <span>NVMe Gen4 স্টোরেজ</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Decrease NVMe"
                        onClick={() => setNvme((n) => clamp(n - 10, 30, 500))}
                        className="grid size-7 cursor-pointer place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="min-w-[66px] text-center font-mono text-sm font-bold text-slate-900">
                        {nvme} GB
                      </span>
                      <button
                        type="button"
                        aria-label="Increase NVMe"
                        onClick={() => setNvme((n) => clamp(n + 10, 30, 500))}
                        className="grid size-7 cursor-pointer place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={30}
                    max={500}
                    step={10}
                    value={nvme}
                    aria-label="NVMe storage in GB"
                    onChange={(e) => setNvme(Number(e.target.value))}
                    className={`mt-2.5 ${sliderClass}`}
                  />
                  <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-400">
                    <span>30 GB</span>
                    <span>500 GB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 4: Network & Add-ons */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:p-6">
              <div className="flex items-center gap-2.5">
                <span className="grid size-6 place-items-center rounded-md bg-blue-600 font-mono text-xs font-bold text-white">
                  4
                </span>
                <h2 className="font-display text-base font-extrabold text-slate-900 sm:text-lg">
                  নেটওয়ার্ক ও অ্যাড-অন
                </h2>
              </div>

              <div className="mt-4 space-y-2.5 text-sm">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="flex items-center gap-2 text-xs font-medium text-slate-700 sm:text-sm">
                    <ShieldCheck size={15} className="text-emerald-600" />
                    <span>1 ডেডিকেটেড IPv4 + /64 IPv6 + DDoS প্রোটেকশন</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                    ফ্রি
                  </span>
                </div>

                <label
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3.5 transition-all ${
                    residentialIp
                      ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/15"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 text-xs font-bold text-slate-900 sm:text-sm">
                      <CountryFlag code="us" size={15} />
                      <span>US Residential ISP IP অ্যাড-অন</span>
                    </span>
                    <span className="mt-0.5 block text-[11px] text-slate-500">
                      AT&amp;T, Comcast, Verizon সহ ৭টি US ক্যারিয়ার
                      (মাল্টি-স্টেট অটো-অ্যাসাইন)
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-slate-900 sm:text-sm">
                      +{formatPrice(1200)}
                    </span>
                    <input
                      type="checkbox"
                      checked={residentialIp}
                      onChange={(e) => setResidentialIp(e.target.checked)}
                      className="size-4.5 cursor-pointer accent-blue-600"
                    />
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Console-Style Sticky Summary */}
          <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl lg:sticky lg:top-24">
            {/* Dark Console Header */}
            <div className="bg-slate-950 px-5 py-4 text-white sm:px-6">
              <p className="text-[10.5px] font-bold uppercase tracking-wider text-sky-400">
                Instance Summary
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10">
                  <OsBrandIcon os={os} size={22} />
                </span>
                <div className="min-w-0">
                  <h2 className="truncate font-display text-base font-extrabold text-white">
                    {os.name}
                  </h2>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-300">
                    <CountryFlag code={activeCountryCode} size={13} />
                    <span className="truncate">
                      {region.city}, {region.state}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <dl className="space-y-2.5 border-b border-slate-100 pb-4 text-xs sm:text-sm">
                {[
                  ["CPU", `${vcpu} vCPU (AMD EPYC)`],
                  ["মেমোরি", `${ram} GB DDR5`],
                  ["স্টোরেজ", `${nvme} GB NVMe Gen4`],
                  ["ব্যান্ডউইথ", "1 Gbps Unmetered"],
                  [
                    "IP টাইপ",
                    residentialIp ? "US Residential ISP" : "Datacenter IPv4",
                  ],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <dt className="text-slate-500">{label}</dt>
                    <dd className="text-right font-bold text-slate-900">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-semibold text-slate-600 sm:text-sm">
                    মাসিক বিল
                  </span>
                  <span className="font-display text-3xl font-black tracking-tight text-slate-900">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <p className="mt-1 text-right font-mono text-xs text-slate-500">
                  {formatHourly(totalPrice)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCheckoutOpen(true)}
                className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700 active:scale-[0.99]"
              >
                <span>সার্ভার ডিপ্লয় করুন</span>
                <ArrowRight size={16} />
              </button>

              <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-1.5">
                  <Check size={13} className="shrink-0 text-emerald-600" />
                  <span>বিকাশ, নগদ, কার্ড ও USDT পেমেন্ট</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check size={13} className="shrink-0 text-emerald-600" />
                  <span>৯০ সেকেন্ডে অটো-ডেলিভারি · যেকোনো সময় ক্যানসেল</span>
                </li>
              </ul>

              <p className="mt-4 border-t border-slate-100 pt-3 text-center text-[11px] text-slate-500">
                হোম ব্রডব্যান্ড আইপিসহ রেডিমেড RDP খুঁজছেন?{" "}
                <Link
                  href="/isp-vps"
                  className="font-bold text-blue-600 hover:underline"
                >
                  Dedicated ISP VPS দেখুন
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Mobile & Tablet Floating Summary Bar (Sits cleanly above mobile bottom dock on <768px) */}
      <div className="fixed inset-x-3 bottom-[84px] z-30 rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-lg backdrop-blur-md md:inset-x-0 md:bottom-0 md:rounded-none md:border-x-0 md:border-b-0 lg:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-slate-100">
              <OsBrandIcon os={os} size={18} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium text-slate-500">
                {vcpu} vCPU · {ram} GB · {nvme} GB NVMe
              </p>
              <p className="font-display text-lg font-black leading-tight text-slate-900 sm:text-xl">
                {formatPrice(totalPrice)}
                <span className="text-xs font-medium text-slate-500">
                  {" "}
                  /মাস
                </span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCheckoutOpen(true)}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-blue-700 sm:px-5 sm:text-sm"
          >
            <span>ডিপ্লয় করুন</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Checkout Drawer */}
      <CheckoutDrawer
        plan={checkoutOpen ? plan : null}
        carrier="Cloud"
        isFresh={false}
        initialCountry={activeCountryCode}
        initialCoupon={couponParam}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}

export default function CloudVpsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-500">
          ক্লাউড কনসোল লোড হচ্ছে…
        </div>
      }
    >
      <CloudVpsContent />
    </Suspense>
  );
}
