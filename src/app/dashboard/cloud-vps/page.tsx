"use client";

import { CountryFlag } from "@/components/ui/CountryFlag";
import { useCurrency } from "@/lib/currency";
import {
  ArrowRight,
  Cpu,
  HardDrive,
  MemoryStick,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const REGIONS = [
  { id: "us-va", label: "US East (Ashburn)", code: "us", ping: "178 ms" },
  { id: "us-tx", label: "US Central (Dallas)", code: "us", ping: "194 ms" },
  { id: "uk-lon", label: "UK (London)", code: "uk", ping: "138 ms" },
  { id: "de-fra", label: "Germany (Frankfurt)", code: "de", ping: "126 ms" },
];

const OS_OPTIONS = [
  { id: "ubuntu-24", label: "Ubuntu 24.04 LTS", extraBdt: 0 },
  { id: "debian-12", label: "Debian 12 Bookworm", extraBdt: 0 },
  { id: "win-2022", label: "Windows Server 2022", extraBdt: 400 },
  { id: "win-11", label: "Windows 11 Pro RDP", extraBdt: 500 },
];

const CYCLES = [
  { id: "monthly", label: "১ মাস", months: 1, discount: 0 },
  { id: "quarterly", label: "৩ মাস", months: 3, discount: 0.05 },
  { id: "annual", label: "১২ মাস", months: 12, discount: 0.15 },
] as const;

export default function DashboardDeployCloudPage() {
  const router = useRouter();
  const { formatPrice } = useCurrency();

  const [regionId, setRegionId] = useState(REGIONS[0].id);
  const [osId, setOsId] = useState(OS_OPTIONS[0].id);
  const [vcpu, setVcpu] = useState(4);
  const [ram, setRam] = useState(8);
  const [nvme, setNvme] = useState(100);
  const [cycleId, setCycleId] = useState<(typeof CYCLES)[number]["id"]>("monthly");

  const activeRegion = REGIONS.find((r) => r.id === regionId) ?? REGIONS[0];
  const activeOs = OS_OPTIONS.find((o) => o.id === osId) ?? OS_OPTIONS[0];
  const cycle = CYCLES.find((c) => c.id === cycleId) ?? CYCLES[0];

  // Deterministic preview pricing (BDT)
  const monthlyBdt =
    vcpu * 350 + ram * 150 + Math.round(nvme * 6) + activeOs.extraBdt;
  const discountedMonthly = Math.round(monthlyBdt * (1 - cycle.discount));
  const totalBdt = discountedMonthly * cycle.months;

  const handleProceedCheckout = () => {
    const params = new URLSearchParams({
      type: "cloud",
      plan: `cloud-${vcpu}c-${ram}g`,
      country: activeRegion.code,
      region: activeRegion.label,
      os: activeOs.label,
      vcpu: String(vcpu),
      ram: String(ram),
      nvme: String(nvme),
      cycle: cycle.id,
      price: String(discountedMonthly),
      from: "dashboard",
    });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Header + Product Switcher Tabs */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
            কাস্টম Cloud VPS ডিপ্লয় করুন
          </h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            প্রয়োজন অনুযায়ী vCPU, DDR5 RAM এবং Gen4 NVMe স্টোরেজ কনফিগার করুন।
          </p>
        </div>

        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 text-xs font-bold shadow-2xs">
          <Link
            href="/dashboard/isp-vps"
            className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            <ShieldCheck size={14} />
            <span>ISP Residential VPS</span>
          </Link>
          <Link
            href="/dashboard/cloud-vps"
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-white"
          >
            <Cpu size={14} />
            <span>Custom Cloud VPS</span>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:items-start">
        <div className="space-y-5">
          {/* Step 1: Region */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
            <h2 className="font-display text-sm font-extrabold text-slate-900 sm:text-base">
              ১. ডেটাসেন্টার লোকেশন
            </h2>
            <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
              {REGIONS.map((region) => (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setRegionId(region.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                    regionId === region.id
                      ? "border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span className="flex items-center gap-2.5 text-xs font-bold text-slate-900">
                    <CountryFlag code={region.code} size={18} />
                    <span>{region.label}</span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">
                    ~{region.ping}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Step 2: OS */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
            <h2 className="font-display text-sm font-extrabold text-slate-900 sm:text-base">
              ২. অপারেটিং সিস্টেম
            </h2>
            <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
              {OS_OPTIONS.map((os) => (
                <button
                  key={os.id}
                  type="button"
                  onClick={() => setOsId(os.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 text-left text-xs font-bold transition-all ${
                    osId === os.id
                      ? "border-blue-600 bg-blue-50/40 text-blue-700 ring-2 ring-blue-600/20"
                      : "border-slate-200 text-slate-800 hover:border-slate-300"
                  }`}
                >
                  <span>{os.label}</span>
                  <span className="font-mono text-[11px] text-slate-500">
                    {os.extraBdt === 0 ? "Free" : `+${formatPrice(os.extraBdt)}`}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Step 3: Resource Sliders */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-sm font-extrabold text-slate-900 sm:text-base">
                ৩. রিসোর্স কনফিগারেশন
              </h2>
              <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
                {CYCLES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCycleId(c.id)}
                    className={`cursor-pointer rounded-lg px-3 py-1.5 transition-colors ${
                      cycleId === c.id
                        ? "bg-white text-slate-900 shadow-2xs"
                        : "text-slate-600"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 space-y-5">
              <div>
                <div className="mb-1.5 flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Cpu size={14} className="text-blue-600" /> vCPU Cores
                  </span>
                  <span className="font-mono text-slate-900">{vcpu} vCPU</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={16}
                  step={2}
                  value={vcpu}
                  onChange={(e) => setVcpu(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="mb-1.5 flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <MemoryStick size={14} className="text-blue-600" /> DDR5 RAM
                  </span>
                  <span className="font-mono text-slate-900">{ram} GB</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={32}
                  step={4}
                  value={ram}
                  onChange={(e) => setRam(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="mb-1.5 flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <HardDrive size={14} className="text-blue-600" /> Gen4 NVMe SSD
                  </span>
                  <span className="font-mono text-slate-900">{nvme} GB</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={500}
                  step={50}
                  value={nvme}
                  onChange={(e) => setNvme(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Sticky Summary */}
        <aside className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs lg:sticky lg:top-20">
          <h2 className="font-display text-base font-extrabold text-slate-900">
            ক্লাউড কনফিগারেশন সামারি
          </h2>

          <dl className="mt-4 space-y-2.5 border-b border-slate-100 pb-4 text-xs">
            <div className="flex justify-between">
              <dt className="text-slate-500">লোকেশন</dt>
              <dd className="font-bold text-slate-900">{activeRegion.label}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">OS</dt>
              <dd className="font-semibold text-slate-800">{activeOs.label}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">রিসোর্স</dt>
              <dd className="font-mono font-bold text-slate-900">
                {vcpu} vCPU · {ram} GB · {nvme} GB
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">বিলিং সাইকেল</dt>
              <dd className="font-semibold text-slate-800">{cycle.label}</dd>
            </div>
          </dl>

          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-xs font-bold text-slate-600">
              মোট ({cycle.label})
            </span>
            <span className="font-display text-2xl font-black text-slate-900">
              {formatPrice(totalBdt)}
            </span>
          </div>
          <p className="mt-1 text-right text-[11px] text-slate-500">
            {formatPrice(discountedMonthly)} /মাস হিসেবে
          </p>

          <button
            type="button"
            onClick={handleProceedCheckout}
            className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <span>চেকআউটে যান</span>
            <ArrowRight size={15} />
          </button>
        </aside>
      </div>
    </div>
  );
}