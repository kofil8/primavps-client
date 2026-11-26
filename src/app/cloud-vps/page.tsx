"use client";

import {
  CloudOsStep,
  OsBrandIcon,
} from "@/components/sections/cloud/CloudOsStep";
import {
  CloudRegionStep,
  getRegionCountryCode,
} from "@/components/sections/cloud/CloudRegionStep";
import { CloudResourceSliders } from "@/components/sections/cloud/CloudResourceSliders";
import { CloudSummaryCard } from "@/components/sections/cloud/CloudSummaryCard";
import type { CheckoutPlan } from "@/components/sections/isp/CheckoutDrawer";
import { LazyCheckoutDrawer } from "@/components/sections/isp/LazyCheckoutDrawer";
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
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { SiAmd } from "react-icons/si";

function CloudVpsContent() {
  const { formatPrice } = useCurrency();
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
            পছন্দের লোকেশন, OS ও রিসোর্স বেছে নিয়ে ৬০–৯০ সেকেন্ডে সার্ভার চালু
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
            <CloudRegionStep
              regions={CLOUD_REGIONS}
              selected={region}
              onSelect={setRegion}
            />

            <CloudOsStep
              options={CLOUD_OS_LIST}
              selected={os}
              onSelect={selectOs}
            />

            <CloudResourceSliders
              presets={CLOUD_PRESETS}
              vcpu={vcpu}
              ram={ram}
              nvme={nvme}
              minRam={minRam}
              residentialIp={residentialIp}
              onApplyPreset={applyPreset}
              onChangeVcpu={setVcpu}
              onChangeRam={setRam}
              onChangeNvme={setNvme}
            />

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
          <CloudSummaryCard
            os={os}
            region={region}
            vcpu={vcpu}
            ram={ram}
            nvme={nvme}
            residentialIp={residentialIp}
            totalPrice={totalPrice}
            onDeploy={() => setCheckoutOpen(true)}
          />
        </div>
      </section>

      {/* Mobile & Tablet Floating Summary Bar */}
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

      {/* Lazy-Loaded Checkout Drawer */}
      <LazyCheckoutDrawer
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