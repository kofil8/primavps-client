"use client";

import { CountryFlag } from "@/components/ui/CountryFlag";
import { useCurrency } from "@/lib/currency";
import { CloudOs, CloudRegion } from "@/lib/data/plans";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { OsBrandIcon } from "./CloudOsStep";
import { getRegionCountryCode } from "./CloudRegionStep";

interface CloudSummaryCardProps {
  os: CloudOs;
  region: CloudRegion;
  vcpu: number;
  ram: number;
  nvme: number;
  residentialIp: boolean;
  totalPrice: number;
  onDeploy: () => void;
}

export function CloudSummaryCard({
  os,
  region,
  vcpu,
  ram,
  nvme,
  residentialIp,
  totalPrice,
  onDeploy,
}: CloudSummaryCardProps) {
  const { formatPrice, formatHourly } = useCurrency();
  const activeCountryCode = getRegionCountryCode(region);

  return (
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
              <dd className="text-right font-bold text-slate-900">{value}</dd>
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
          onClick={onDeploy}
          className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700 active:scale-[0.99]"
        >
          <span>সার্ভার ডিপ্লয় করুন</span>
          <ArrowRight size={16} />
        </button>

        <ul className="mt-4 space-y-1.5 text-xs text-slate-600">
          <li className="flex items-center gap-1.5">
            <Check size={13} className="shrink-0 text-emerald-600" />
            <span>বিকাশ, নগদ, রকেট ও কার্ড পেমেন্ট</span>
          </li>
          <li className="flex items-center gap-1.5">
            <Check size={13} className="shrink-0 text-emerald-600" />
            <span>৬০–৯০ সেকেন্ডে অটো-ডেলিভারি · যেকোনো সময় ক্যানসেল</span>
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
  );
}