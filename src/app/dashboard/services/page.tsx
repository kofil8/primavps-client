"use client";

import { StatusPill } from "@/components/dashboard/StatusPill";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { useCurrency } from "@/lib/currency";
import { getStoredServices } from "@/lib/services/portal-store";
import { ArrowRight, Plus, Server } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardServicesPage() {
  const { formatPrice } = useCurrency();
  const [services] = useState(getStoredServices);
  const [filter, setFilter] = useState<"all" | "running" | "stopped">("all");

  const filtered = services.filter((s) =>
    filter === "all" ? true : s.status === filter,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
            আমার সার্ভারসমূহ
          </h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            যেকোনো সার্ভারে ক্লিক করে RDP পাসওয়ার্ড, পাওয়ার কন্ট্রোল ও IP
            Swap পরিচালনা করুন।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-xl bg-slate-200/70 p-1 text-xs font-bold">
            {(["all", "running", "stopped"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`cursor-pointer rounded-lg px-3 py-1.5 capitalize transition-colors ${
                  filter === tab
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <Link
            href="/isp-vps"
            className="hidden items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 sm:inline-flex"
          >
            <Plus size={14} />
            <span>নতুন VPS</span>
          </Link>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
          <Server size={28} className="mx-auto text-slate-400" />
          <p className="mt-3 text-sm font-bold text-slate-900">
            এই ক্যাটাগরিতে কোনো সার্ভার নেই
          </p>
          <Link
            href="/dashboard/isp-vps"
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white"
          >
            <span>নতুন সার্ভার অর্ডার করুন</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((srv) => (
            <Link
              key={srv.id}
              href={`/dashboard/services/${srv.id}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs transition-all hover:border-blue-300 hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <CountryFlag code={srv.country.toLowerCase()} size={24} />
                    <div>
                      <h2 className="font-display text-base font-extrabold text-slate-900 group-hover:text-blue-600">
                        {srv.name}
                      </h2>
                      <p className="font-mono text-xs text-slate-500">
                        {srv.ip} · {srv.carrier}
                      </p>
                    </div>
                  </div>
                  <StatusPill status={srv.status} />
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-600">
                  <span className="rounded-lg bg-slate-50 px-2.5 py-1">
                    {srv.specs.vcpu} vCPU
                  </span>
                  <span className="rounded-lg bg-slate-50 px-2.5 py-1">
                    {srv.specs.ram} GB RAM
                  </span>
                  <span className="rounded-lg bg-slate-50 px-2.5 py-1">
                    {srv.specs.nvme} GB NVMe
                  </span>
                  <span className="rounded-lg bg-slate-50 px-2.5 py-1">
                    {srv.os}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5 text-xs">
                <span className="text-slate-500">
                  রিনিউ: <strong className="text-slate-800">{srv.renewsOn}</strong>{" "}
                  ({formatPrice(srv.monthlyBdt)})
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-blue-600">
                  <span>ম্যানেজ করুন</span>
                  <ArrowRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}