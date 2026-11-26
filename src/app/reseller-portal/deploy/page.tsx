"use client";

import { CountryFlag } from "@/components/ui/CountryFlag";
import { useCurrency } from "@/lib/currency";
import { ISP_PLANS } from "@/lib/data/plans";
import {
  bulkDeployServers,
  DEFAULT_RESELLER_STATE,
  getResellerState,
  getResellerTier,
} from "@/lib/services/reseller-store";
import { Cpu, Layers, Loader2, ShieldCheck, Wallet } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const COUNTRIES = [
  { code: "us", label: "US", carrier: "AT&T Residential" },
  { code: "uk", label: "UK", carrier: "BT Broadband" },
  { code: "de", label: "DE", carrier: "Deutsche Telekom" },
  { code: "fr", label: "FR", carrier: "Orange Fiber" },
];

const CLOUD_PRESETS = [
  {
    id: "cloud-2c-4g",
    name: "Cloud 2C / 4G",
    specs: { vcpu: 2, ram: 4, nvme: 80 },
    priceBdt: 1950,
    os: "Ubuntu 24.04 LTS",
  },
  {
    id: "cloud-4c-8g",
    name: "Cloud 4C / 8G",
    specs: { vcpu: 4, ram: 8, nvme: 150 },
    priceBdt: 3600,
    os: "Ubuntu 24.04 LTS",
  },
  {
    id: "cloud-8c-16g",
    name: "Cloud 8C / 16G",
    specs: { vcpu: 8, ram: 16, nvme: 250 },
    priceBdt: 6800,
    os: "Windows Server 2022",
  },
];

export default function ResellerBulkDeployPage() {
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const [state, setState] = useState(DEFAULT_RESELLER_STATE);

  const [productType, setProductType] = useState<"isp" | "cloud">("isp");
  const [country, setCountry] = useState("us");
  const [planId, setPlanId] = useState(ISP_PLANS[1]?.id ?? ISP_PLANS[0].id);
  const [cloudId, setCloudId] = useState(CLOUD_PRESETS[0].id);
  const [quantity, setQuantity] = useState(3);
  const [clientId, setClientId] = useState(DEFAULT_RESELLER_STATE.clients[0].id);
  const [hostnamePrefix, setHostnamePrefix] = useState("us-isp-batch");

  const [deploying, setDeploying] = useState(false);

  useEffect(() => {
    const sync = () => {
      const next = getResellerState();
      setState(next);
      if (next.clients[0]) {
        setClientId((prev) => prev || next.clients[0].id);
      }
    };
    sync();
    window.addEventListener("reseller-store-updated", sync);
    return () => window.removeEventListener("reseller-store-updated", sync);
  }, []);

  const tier = getResellerTier(state.servers.length);
  const activeCountry = COUNTRIES.find((c) => c.code === country) ?? COUNTRIES[0];
  const selectedIsp = ISP_PLANS.find((p) => p.id === planId) ?? ISP_PLANS[0];
  const selectedCloud =
    CLOUD_PRESETS.find((p) => p.id === cloudId) ?? CLOUD_PRESETS[0];

  const retailMonthlyBdt =
    productType === "isp" ? selectedIsp.priceBdt : selectedCloud.priceBdt;
  const wholesaleMonthlyBdt = Math.round(
    retailMonthlyBdt * (1 - tier.discountPercent / 100),
  );
  const totalRetailBdt = retailMonthlyBdt * quantity;
  const totalWholesaleBdt = wholesaleMonthlyBdt * quantity;
  const totalProfitBdt = totalRetailBdt - totalWholesaleBdt;
  const insufficientBalance = state.walletBalanceBdt < totalWholesaleBdt;

  const handleDeploy = async () => {
    setDeploying(true);

    await new Promise((r) => setTimeout(r, 750));

    const res = bulkDeployServers({
      productType,
      planName: productType === "isp" ? selectedIsp.name : selectedCloud.name,
      country,
      carrier:
        productType === "isp" ? activeCountry.carrier : `${activeCountry.label} KVM`,
      os: productType === "isp" ? "Windows 11 Pro" : selectedCloud.os,
      specs: productType === "isp" ? selectedIsp.specs : selectedCloud.specs,
      quantity,
      clientId,
      hostnamePrefix: hostnamePrefix.trim() || `${country}-${productType}`,
      retailMonthlyBdt,
      wholesaleMonthlyBdt,
      totalWholesaleBdt,
    });

    setDeploying(false);

    if (!res.ok) {
      toast.error(res.error);
      return;
    }

    toast.success(
      `${res.created.length}টি সার্ভার সফলভাবে প্রোভিশন হয়েছে! ফ্লিট লিস্টে রিডাইরেক্ট হচ্ছে…`,
    );
    window.setTimeout(() => router.push("/reseller-portal/servers"), 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
          বাল্ক সার্ভার ডিপ্লয় (Wholesale)
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          একসাথে ১–২০টি সার্ভার কনফিগার করে সরাসরি সাব-ক্লায়েন্টে অ্যাসাইন করুন —{" "}
          <strong className="text-indigo-700">
            {tier.name} ({tier.discountPercent}% OFF)
          </strong>{" "}
          অটো অ্যাপ্লাই হবে।
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        {/* Left Configurator */}
        <div className="space-y-5">
          {/* Step 1: Product Type & Location */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
            <h2 className="font-display text-sm font-extrabold text-slate-900 sm:text-base">
              ১. সার্ভার টাইপ ও লোকেশন
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setProductType("isp")}
                className={`flex cursor-pointer items-center gap-2.5 rounded-xl border p-3.5 text-left transition-all ${
                  productType === "isp"
                    ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <ShieldCheck size={18} className="shrink-0 text-indigo-600" />
                <div>
                  <p className="text-xs font-bold text-slate-900 sm:text-sm">
                    ISP Residential VPS
                  </p>
                  <p className="text-[11px] text-slate-500">Static Home IP + RDP</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setProductType("cloud")}
                className={`flex cursor-pointer items-center gap-2.5 rounded-xl border p-3.5 text-left transition-all ${
                  productType === "cloud"
                    ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <Cpu size={18} className="shrink-0 text-blue-600" />
                <div>
                  <p className="text-xs font-bold text-slate-900 sm:text-sm">
                    NVMe Cloud VPS
                  </p>
                  <p className="text-[11px] text-slate-500">Linux / Windows KVM</p>
                </div>
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    setCountry(c.code);
                    setHostnamePrefix(`${c.code}-${productType}-batch`);
                  }}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all ${
                    country === c.code
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <CountryFlag code={c.code} size={15} />
                  <span>
                    {c.label} · {c.carrier}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Step 2: Plan Selection */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
            <h2 className="font-display text-sm font-extrabold text-slate-900 sm:text-base">
              ২. প্ল্যান নির্বাচন
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {productType === "isp"
                ? ISP_PLANS.map((plan) => {
                    const active = plan.id === planId;
                    const wholesale = Math.round(
                      plan.priceBdt * (1 - tier.discountPercent / 100),
                    );
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setPlanId(plan.id)}
                        className={`cursor-pointer rounded-2xl border p-4 text-left transition-all ${
                          active
                            ? "border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-600/20"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <p className="font-display text-sm font-extrabold text-slate-900">
                          {plan.name}
                        </p>
                        <p className="mt-1.5 font-mono text-lg font-black text-slate-900">
                          {formatPrice(wholesale)}
                          <span className="font-sans text-[11px] font-normal text-slate-500">
                            /মাস
                          </span>
                        </p>
                        <p className="text-[11px] text-slate-400 line-through">
                          Retail {formatPrice(plan.priceBdt)}
                        </p>
                        <p className="mt-2 text-[11px] text-slate-600">
                          {plan.specs.vcpu} vCPU · {plan.specs.ram}G ·{" "}
                          {plan.specs.nvme}G
                        </p>
                      </button>
                    );
                  })
                : CLOUD_PRESETS.map((preset) => {
                    const active = preset.id === cloudId;
                    const wholesale = Math.round(
                      preset.priceBdt * (1 - tier.discountPercent / 100),
                    );
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => setCloudId(preset.id)}
                        className={`cursor-pointer rounded-2xl border p-4 text-left transition-all ${
                          active
                            ? "border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-600/20"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <p className="font-display text-sm font-extrabold text-slate-900">
                          {preset.name}
                        </p>
                        <p className="mt-1.5 font-mono text-lg font-black text-slate-900">
                          {formatPrice(wholesale)}
                          <span className="font-sans text-[11px] font-normal text-slate-500">
                            /মাস
                          </span>
                        </p>
                        <p className="text-[11px] text-slate-400 line-through">
                          Retail {formatPrice(preset.priceBdt)}
                        </p>
                        <p className="mt-2 text-[11px] text-slate-600">
                          {preset.specs.vcpu} vCPU · {preset.specs.ram}G ·{" "}
                          {preset.specs.nvme}G
                        </p>
                      </button>
                    );
                  })}
            </div>
          </section>

          {/* Step 3: Quantity, Client Assignment & Hostname */}
          <section className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
            <h2 className="font-display text-sm font-extrabold text-slate-900 sm:text-base">
              ৩. পরিমাণ ও সাব-ক্লায়েন্ট অ্যাসাইনমেন্ট
            </h2>

            <div className="mt-4 space-y-4">
              <div>
                <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700">সার্ভারের সংখ্যা (Quantity)</span>
                  <span className="rounded-md bg-indigo-50 px-2 py-0.5 font-mono text-indigo-700">
                    {quantity}× VM
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="assign-client"
                    className="mb-1 block text-xs font-bold text-slate-800"
                  >
                    সাব-ক্লায়েন্ট সিলেক্ট করুন
                  </label>
                  <select
                    id="assign-client"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="field !h-10 !rounded-xl text-xs sm:text-sm"
                  >
                    {state.clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} {c.company ? `(${c.company})` : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="hostname-prefix"
                    className="mb-1 block text-xs font-bold text-slate-800"
                  >
                    হোস্টনেম প্রিফিক্স
                  </label>
                  <input
                    id="hostname-prefix"
                    value={hostnamePrefix}
                    onChange={(e) => setHostnamePrefix(e.target.value)}
                    placeholder="us-isp-batch"
                    className="field !h-10 !rounded-xl font-mono text-xs sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Sticky Wholesale Summary */}
        <aside className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs lg:sticky lg:top-20">
          <h2 className="font-display text-base font-extrabold text-slate-900">
            হোলসেল বিলিং সামারি
          </h2>

          <dl className="mt-4 space-y-2.5 border-b border-slate-100 pb-4 text-xs">
            <div className="flex justify-between">
              <dt className="text-slate-500">প্ল্যান ও পরিমাণ</dt>
              <dd className="font-bold text-slate-900">
                {quantity}×{" "}
                {productType === "isp" ? selectedIsp.name : selectedCloud.name}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">রিটেইল মূল্য</dt>
              <dd className="font-mono text-slate-500 line-through">
                {formatPrice(totalRetailBdt)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">
                রিসেলার ডিসকাউন্ট ({tier.discountPercent}%)
              </dt>
              <dd className="font-mono font-bold text-emerald-700">
                −{formatPrice(totalProfitBdt)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">বর্তমান ওয়ালেট ব্যালেন্স</dt>
              <dd
                className={`font-mono font-bold ${
                  insufficientBalance ? "text-red-600" : "text-slate-900"
                }`}
              >
                {formatPrice(state.walletBalanceBdt)}
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-xs font-bold text-slate-700">
              ওয়ালেট থেকে কাটবে
            </span>
            <span className="font-display text-2xl font-black text-slate-900">
              {formatPrice(totalWholesaleBdt)}
            </span>
          </div>
          <p className="mt-1 text-right text-[11px] font-semibold text-emerald-700">
            এই অর্ডারে আপনার মাসিক মার্জিন: +{formatPrice(totalProfitBdt)}
          </p>

          {insufficientBalance ? (
            <Link
              href="/reseller-portal/wallet"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-3 text-sm font-bold text-white hover:bg-amber-700"
            >
              <Wallet size={15} />
              <span>ওয়ালেট টপ-আপ করুন</span>
            </Link>
          ) : (
            <button
              type="button"
              disabled={deploying}
              onClick={handleDeploy}
              className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:opacity-60"
            >
              {deploying ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>ডিপ্লয় হচ্ছে…</span>
                </>
              ) : (
                <>
                  <Layers size={15} />
                  <span>ওয়ালেট থেকে {quantity}টি VM ডিপ্লয় করুন</span>
                </>
              )}
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}