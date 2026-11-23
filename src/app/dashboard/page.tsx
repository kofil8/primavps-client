import { StatusPill } from "@/components/dashboard/StatusPill";
import { demoAccount, demoActivity, usd } from "@/lib/data/client-demo";
import {
  ArrowRight,
  ReceiptText,
  Server,
  Sparkles,
  Ticket,
  Wallet,
} from "lucide-react";
import Link from "next/link";

const KPIS = [
  {
    label: "Active services",
    value: "2 of 3",
    detail: "1 provisioning",
    icon: Server,
  },
  {
    label: "Next invoice",
    value: usd(44),
    detail: `Due ${demoAccount.nextInvoiceDue}`,
    icon: ReceiptText,
  },
  {
    label: "Account credit",
    value: usd(demoAccount.creditUsd),
    detail: "Applied to next renewal",
    icon: Wallet,
  },
  {
    label: "Open tickets",
    value: "1",
    detail: "Avg. first reply 11 min",
    icon: Ticket,
  },
] as const;

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                {kpi.label}
              </span>
              <kpi.icon size={16} className="text-blue-600" aria-hidden="true" />
            </div>
            <p className="mt-2 font-display text-2xl font-bold text-slate-900">
              {kpi.value}
            </p>
            <p className="mt-0.5 text-xs text-slate-500">{kpi.detail}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-200/90 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="font-semibold text-slate-900">Your services</h2>
            <p className="text-xs text-slate-500">
              Servers, residential IPs and renewals
            </p>
          </div>
          <Link
            href="/dashboard/services"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline"
          >
            View all
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {demoAccount.services.map((service) => (
            <div
              key={service.id}
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-mono text-sm font-semibold text-slate-900">
                    {service.name}
                  </p>
                  <StatusPill
                    tone={service.status === "active" ? "green" : "amber"}
                  >
                    {service.status === "active" ? "Active" : "Provisioning"}
                  </StatusPill>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">
                  {service.plan} · {service.location} · {service.ip}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">
                  {usd(service.monthlyUsd)}
                  <span className="text-xs font-normal text-slate-500"> /mo</span>
                </p>
                <p className="text-xs text-slate-500">
                  Renews {service.renewsOn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200/90 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Recent invoices</h2>
            <Link
              href="/dashboard/invoices"
              className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline"
            >
              Billing history
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {demoAccount.invoices.slice(0, 3).map((invoice) => (
              <li
                key={invoice.id}
                className="flex items-center justify-between gap-3 px-5 py-3"
              >
                <div>
                  <p className="font-mono text-xs font-semibold text-slate-900">
                    {invoice.id}
                  </p>
                  <p className="text-xs text-slate-500">{invoice.issuedOn}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-900">
                    {usd(invoice.amountUsd)}
                  </span>
                  <StatusPill
                    tone={invoice.status === "paid" ? "green" : "amber"}
                  >
                    {invoice.status === "paid" ? "Paid" : "Due"}
                  </StatusPill>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200/90 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Recent activity</h2>
          </div>
          <ul className="divide-y divide-slate-100">
            {demoActivity.map((item) => (
              <li key={item.title} className="flex gap-3 px-5 py-3">
                <Sparkles
                  size={15}
                  className="mt-0.5 shrink-0 text-blue-500"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500">{item.detail}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">{item.when}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
