import { StatusPill } from "@/components/dashboard/StatusPill";
import { demoAccount, usd } from "@/lib/data/client-demo";
import { Cpu, Gauge, Globe2, HardDrive, LifeBuoy, Network } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your Services",
  description: "Servers, residential ISP VPS instances and renewals.",
  robots: { index: false, follow: false },
};

export default function DashboardServicesPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold text-slate-900">
            Your services
          </h2>
          <p className="text-sm text-slate-600">
            {demoAccount.services.length} services ·{" "}
            {usd(
              demoAccount.services.reduce(
                (total, service) => total + service.monthlyUsd,
                0,
              ),
            )}{" "}
            per month
          </p>
        </div>
        <Link
          href="/isp-vps"
          className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Add a service
        </Link>
      </div>

      <div className="grid gap-4">
        {demoAccount.services.map((service) => (
          <section
            key={service.id}
            className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-mono text-sm font-bold text-slate-900">
                    {service.name}
                  </h3>
                  <StatusPill
                    tone={service.status === "active" ? "green" : "amber"}
                  >
                    {service.status === "active" ? "Active" : "Provisioning"}
                  </StatusPill>
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  {service.plan} · {service.location}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-slate-900">
                  {usd(service.monthlyUsd)}
                  <span className="text-xs font-normal text-slate-500"> /mo</span>
                </p>
                <p className="text-xs text-slate-500">
                  Renews {service.renewsOn}
                </p>
              </div>
            </div>

            <dl className="mt-4 grid gap-3 border-t border-slate-100 pt-4 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Cpu size={15} className="text-slate-400" aria-hidden="true" />
                <dt className="sr-only">Specs</dt>
                <dd className="text-slate-700">{service.specs}</dd>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 size={15} className="text-slate-400" aria-hidden="true" />
                <dt className="sr-only">Primary IP</dt>
                <dd className="font-mono text-slate-700">{service.ip}</dd>
              </div>
              <div className="flex items-center gap-2">
                <Network size={15} className="text-slate-400" aria-hidden="true" />
                <dt className="sr-only">Bandwidth</dt>
                <dd className="text-slate-700">{service.bandwidth}</dd>
              </div>
              <div className="flex items-center gap-2">
                <Gauge size={15} className="text-slate-400" aria-hidden="true" />
                <dt className="sr-only">IP reputation</dt>
                <dd className="text-slate-700">IPQS score 0/100 · clean</dd>
              </div>
            </dl>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <LifeBuoy size={13} aria-hidden="true" />
                Request changes
              </Link>
              <Link
                href="/tools/ip-checker"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <HardDrive size={13} aria-hidden="true" />
                Check IP reputation
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
