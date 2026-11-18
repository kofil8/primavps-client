"use client";

import { CheckoutDrawer, CheckoutPlan } from "@/components/sections/isp/CheckoutDrawer";
import {
  CLOUD_OS_LIST,
  CLOUD_PRESETS,
  CLOUD_REGIONS,
  CloudOs,
  CloudPreset,
  CloudRegion,
  calculateCloudPrice,
} from "@/lib/data/plans";
import { useCurrency } from "@/lib/currency";
import { ArrowRight, Check, Cpu, Globe, HardDrive, Server } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function CloudVpsPage() {
  const { formatPrice, formatHourly } = useCurrency();
  const [region, setRegion] = useState<CloudRegion>(CLOUD_REGIONS[0]);
  const [os, setOs] = useState<CloudOs>(CLOUD_OS_LIST[0]);
  const [vcpu, setVcpu] = useState(2);
  const [ram, setRam] = useState(4);
  const [nvme, setNvme] = useState(80);
  const [residentialIp, setResidentialIp] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const applyPreset = (preset: CloudPreset) => {
    setVcpu(preset.vcpu);
    setRam(preset.ram);
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
    regionName: `${region.city}, ${region.state} (${region.location})`,
    specs: {
      vcpu,
      ram,
      nvme,
      bandwidth: "1 Gbps unmetered",
    },
  };

  const slider =
    "h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-blue-600";

  return (
    <div className="bg-slate-50 pb-24 lg:pb-0">
      <section className="relative isolate overflow-hidden bg-slate-950">
        <Image
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=75"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/30" />

        <div className="shell relative z-10 py-14 sm:py-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white">
            <Server size={14} />
            Cloud compute
          </span>
          <h1 className="mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Build your cloud server
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            Dedicated NVMe storage, full root access, live in 90 seconds.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="shell grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-5">
            <div className="card p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-sm font-semibold text-slate-900">
                  Presets
                </span>
                {CLOUD_PRESETS.map((preset) => {
                  const active =
                    vcpu === preset.vcpu &&
                    ram === preset.ram &&
                    nvme === preset.nvme;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => applyPreset(preset)}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        active
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="card p-6">
              <h2 className="flex items-center gap-2 font-display text-base font-bold text-slate-900">
                <Globe size={17} className="text-blue-600" />
                Region
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {CLOUD_REGIONS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setRegion(item)}
                    className={`rounded-xl border p-4 text-left transition-colors ${
                      region.id === item.id
                        ? "border-blue-600 bg-blue-50/60"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="block text-sm font-semibold text-slate-900">
                      {item.city}, {item.state}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      {item.location}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h2 className="flex items-center gap-2 font-display text-base font-bold text-slate-900">
                <Server size={17} className="text-blue-600" />
                Operating system
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {CLOUD_OS_LIST.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => selectOs(item)}
                    className={`rounded-xl border p-3 text-left transition-colors ${
                      os.id === item.id
                        ? "border-blue-600 bg-blue-50/60"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="block text-sm font-semibold text-slate-900">
                      {item.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="card space-y-6 p-6">
              <h2 className="flex items-center gap-2 font-display text-base font-bold text-slate-900">
                <Cpu size={17} className="text-blue-600" />
                Resources
              </h2>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">CPU</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {vcpu} vCPU
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={16}
                  value={vcpu}
                  aria-label="vCPU cores"
                  onChange={(event) => setVcpu(Number(event.target.value))}
                  className={`mt-3 ${slider}`}
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">Memory</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {ram} GB
                  </span>
                </div>
                <input
                  type="range"
                  min={os.family === "windows" ? 4 : 2}
                  max={64}
                  step={2}
                  value={ram}
                  aria-label="Memory in GB"
                  onChange={(event) => setRam(Number(event.target.value))}
                  className={`mt-3 ${slider}`}
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <HardDrive size={14} /> NVMe storage
                  </span>
                  <span className="font-mono font-semibold text-slate-900">
                    {nvme} GB
                  </span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={500}
                  step={10}
                  value={nvme}
                  aria-label="NVMe storage in GB"
                  onChange={(event) => setNvme(Number(event.target.value))}
                  className={`mt-3 ${slider}`}
                />
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-display text-base font-bold text-slate-900">
                Network
              </h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-slate-700">
                    1 IPv4 + /64 IPv6
                  </span>
                  <span className="font-medium text-emerald-700">Included</span>
                </div>
                <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 px-4 py-3">
                  <span>
                    <span className="block font-medium text-slate-900">
                      US residential IP
                    </span>
                    <span className="block text-xs text-slate-500">
                      AT&amp;T or Comcast route
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-slate-900">
                      +{formatPrice(1200)}
                    </span>
                    <input
                      type="checkbox"
                      checked={residentialIp}
                      onChange={(event) => setResidentialIp(event.target.checked)}
                      className="size-5 accent-blue-600"
                    />
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="card p-6 lg:sticky lg:top-24">
            <p className="text-xs font-semibold tracking-wide text-blue-700 uppercase">
              Your server
            </p>
            <h2 className="mt-1 font-display text-xl font-bold text-slate-900">
              Cloud VPS
            </h2>

            <dl className="mt-5 space-y-2.5 border-y border-slate-100 py-4 text-sm">
              {[
                ["Region", `${region.city}, ${region.state}`],
                ["OS", os.name],
                ["CPU", `${vcpu} vCPU`],
                ["Memory", `${ram} GB`],
                ["Storage", `${nvme} GB NVMe`],
                ["IP", residentialIp ? "Residential" : "Datacenter"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-slate-500">{label}</dt>
                  <dd className="text-right font-medium text-slate-900">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-slate-600">Monthly</span>
                <span className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <p className="mt-1 text-right font-mono text-xs text-slate-500">
                {formatHourly(totalPrice)}
              </p>
            </div>

            <button
              onClick={() => setCheckoutOpen(true)}
              className="btn-primary mt-5 w-full"
            >
              Deploy server
              <ArrowRight size={16} />
            </button>

            <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
              <li className="flex items-center gap-1.5">
                <Check size={13} className="text-emerald-600" />
                Instant bKash, Nagad &amp; card payment
              </li>
              <li className="flex items-center gap-1.5">
                <Check size={13} className="text-emerald-600" />
                Cancel anytime
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white p-3 lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <div>
            <p className="text-xs text-slate-500">Monthly</p>
            <p className="font-display text-xl font-bold text-slate-900">
              {formatPrice(totalPrice)}
            </p>
          </div>
          <button
            onClick={() => setCheckoutOpen(true)}
            className="btn-primary flex-1"
          >
            Deploy server
          </button>
        </div>
      </div>

      {checkoutOpen && (
        <CheckoutDrawer
          plan={plan}
          carrier="Cloud"
          isFresh={false}
          onClose={() => setCheckoutOpen(false)}
        />
      )}
    </div>
  );
}
