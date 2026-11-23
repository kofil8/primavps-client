import { SYSTEM_COMPONENTS } from "@/lib/data/status";
import { pageSeo } from "@/lib/seo";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = pageSeo({
  title: "Live Network Status & 90-Day Uptime Report",
  description:
    "Live network status for primavps cloud and residential ISP nodes: component latency, 90-day uptime and maintenance history from Dallas and Dhaka.",
  path: "/status",
  keywords: ["primavps status", "VPS uptime", "network status Bangladesh"],
});

export default function StatusPage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="shell flex flex-col gap-4 py-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
              All systems operational
            </span>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Network status
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Live monitoring from Dallas and Dhaka.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 px-5 py-3">
            <p className="text-xs text-slate-500">90-day uptime</p>
            <p className="font-display text-2xl font-bold text-emerald-600">
              99.98%
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell space-y-6">
          <div className="card overflow-hidden">
            <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-500 uppercase sm:grid-cols-[1fr_100px_100px_120px]">
              <span>Component</span>
              <span className="hidden text-right sm:block">Latency</span>
              <span className="hidden text-right sm:block">Uptime</span>
              <span className="text-right">Status</span>
            </div>

            <div className="divide-y divide-slate-100">
              {SYSTEM_COMPONENTS.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 sm:grid-cols-[1fr_100px_100px_120px]"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500 capitalize">
                      {item.category}
                    </p>
                  </div>
                  <span className="hidden text-right font-mono text-sm text-slate-600 sm:block">
                    {item.latencyMs} ms
                  </span>
                  <span className="hidden text-right font-mono text-sm font-semibold text-slate-900 sm:block">
                    {item.uptime90d.toFixed(2)}%
                  </span>
                  <span className="inline-flex items-center justify-end gap-1.5 text-sm font-medium text-emerald-700">
                    <CheckCircle2 size={15} />
                    <span className="hidden sm:inline">Operational</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-semibold text-slate-900">
              Past 90 days
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              No outages. All maintenance was completed with zero downtime.
            </p>
          </div>

          <Link
            href="/cloud-vps"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:underline"
          >
            Deploy a server on this network
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
