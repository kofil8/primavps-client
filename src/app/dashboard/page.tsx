"use client";

import { StatusPill } from "@/components/dashboard/StatusPill";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { useCurrency } from "@/lib/currency";
import {
  getStoredInvoices,
  getStoredServices,
  getStoredTickets,
} from "@/lib/services/portal-store";
import {
  ArrowRight,
  Cpu,
  ReceiptText,
  Server,
  ShieldCheck,
  Ticket,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardOverviewPage() {
  const { formatPrice } = useCurrency();
  const [services, setServices] = useState<ReturnType<typeof getStoredServices>>([]);
  const [invoices, setInvoices] = useState<ReturnType<typeof getStoredInvoices>>([]);
  const [tickets, setTickets] = useState<ReturnType<typeof getStoredTickets>>([]);

  // Hydrate safely on client to avoid SSR mismatch
  useEffect(() => {
    queueMicrotask(() => {
      setServices(getStoredServices());
      setInvoices(getStoredInvoices());
      setTickets(getStoredTickets());
    });
  }, []);

  const runningCount = services.filter((s) => s.status === "running").length;
  const unpaidInvoices = invoices.filter(
    (inv) => inv.status === "unpaid" || inv.status === "overdue",
  );
  const dueTotalBdt = unpaidInvoices.reduce((acc, i) => acc + i.amountBdt, 0);
  const openTicketsCount = tickets.filter((t) => t.status === "open").length;

  return (
    <div className="space-y-6">
      {/* Welcome + In-Portal Deploy Actions */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
            ড্যাশবোর্ড ওভারভিউ
          </h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            আপনার সক্রিয় সার্ভার, বকেয়া বিল ও সাপোর্ট স্ট্যাটাস একনজরে দেখুন।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/dashboard/isp-vps"
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
          >
            <ShieldCheck size={14} />
            <span>নতুন ISP VPS</span>
          </Link>
          <Link
            href="/dashboard/cloud-vps"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-50"
          >
            <Cpu size={14} />
            <span>নতুন Cloud VPS</span>
          </Link>
        </div>
      </div>

      {/* Live KPI Cards */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">সক্রিয় সার্ভার</span>
            <Server size={16} className="text-blue-600" />
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-slate-900">
            {runningCount} / {services.length}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            {runningCount}টি রানিং অবস্থায় আছে
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">বকেয়া ইনভয়েস</span>
            <ReceiptText size={16} className="text-amber-600" />
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-slate-900">
            {formatPrice(dueTotalBdt)}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            {unpaidInvoices.length}টি ইনভয়েস পরিশোধ বাকি
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs sm:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">ওপেন টিকিট</span>
            <Ticket size={16} className="text-emerald-600" />
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-slate-900">
            {openTicketsCount}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            গড় রিপ্লাই সময় ৩–১০ মিনিট
          </p>
        </div>
      </div>

      {/* Clickable Services List */}
      <section className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="font-display text-sm font-extrabold text-slate-900 sm:text-base">
            আপনার সার্ভারসমূহ
          </h2>
          <Link
            href="/dashboard/services"
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
          >
            সব দেখুন <ArrowRight size={13} />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {services.map((srv) => (
            <Link
              key={srv.id}
              href={`/dashboard/services/${srv.id}`}
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-slate-50/70"
            >
              <div className="flex items-center gap-3">
                <CountryFlag code={srv.country.toLowerCase()} size={20} />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-display text-sm font-bold text-slate-900">
                      {srv.name}
                    </p>
                    <StatusPill status={srv.status} />
                  </div>
                  <p className="font-mono text-xs text-slate-500">
                    {srv.ip} · {srv.carrier}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900 sm:text-sm">
                  {formatPrice(srv.monthlyBdt)}
                  <span className="font-normal text-slate-500"> /মাস</span>
                </p>
                <p className="text-[11px] text-slate-500">
                  রিনিউ: {srv.renewsOn}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Invoices with Direct Pay Now */}
      <section className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="font-display text-sm font-extrabold text-slate-900 sm:text-base">
            সাম্প্রতিক ইনভয়েস
          </h2>
          <Link
            href="/dashboard/invoices"
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
          >
            সব বিল দেখুন <ArrowRight size={13} />
          </Link>
        </div>

        <ul className="divide-y divide-slate-100">
          {invoices.slice(0, 4).map((inv) => (
            <li
              key={inv.id}
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-3"
            >
              <div>
                <p className="font-mono text-xs font-bold text-slate-900">
                  {inv.id}
                </p>
                <p className="text-xs text-slate-500">
                  {inv.item} · {inv.date}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-slate-900 sm:text-sm">
                  {formatPrice(inv.amountBdt)}
                </span>
                <StatusPill status={inv.status} />
                {(inv.status === "unpaid" || inv.status === "overdue") && (
                  <Link
                    href={`/checkout?invoice=${inv.id}&from=dashboard`}
                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-blue-700"
                  >
                    পেমেন্ট করুন
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}