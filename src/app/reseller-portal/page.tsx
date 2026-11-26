"use client";

import { StatusPill } from "@/components/dashboard/StatusPill";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { useCurrency } from "@/lib/currency";
import {
  DEFAULT_RESELLER_STATE,
  getResellerState,
  getResellerTier,
} from "@/lib/services/reseller-store";
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Layers,
  Plus,
  Server,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ResellerOverviewPage() {
  const { formatPrice } = useCurrency();
  const [state, setState] = useState(DEFAULT_RESELLER_STATE);

  useEffect(() => {
    const sync = () => setState(getResellerState());
    sync();
    window.addEventListener("reseller-store-updated", sync);
    return () => window.removeEventListener("reseller-store-updated", sync);
  }, []);

  const runningCount = state.servers.filter((s) => s.status === "running").length;
  const tier = getResellerTier(state.servers.length);
  const monthlyMarginBdt = state.servers.reduce(
    (sum, s) => sum + (s.retailMonthlyBdt - s.wholesaleMonthlyBdt),
    0,
  );
  const tierProgressPct = tier.nextTierVms
    ? Math.min(100, Math.round((state.servers.length / tier.nextTierVms) * 100))
    : 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
              {state.agencyName}
            </h1>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700">
              {tier.name} Partner · {tier.discountPercent}% OFF
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            এজেন্সির সব ক্লায়েন্ট সার্ভার, প্রিপেইড ওয়ালেট এবং হোলসেল মার্জিন একনজরে দেখুন।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/reseller-portal/deploy"
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
          >
            <Layers size={14} />
            <span>বাল্ক ডিপ্লয়</span>
          </Link>
          <Link
            href="/reseller-portal/wallet"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-50"
          >
            <Plus size={14} />
            <span>ওয়ালেট টপ-আপ</span>
          </Link>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">ওয়ালেট ব্যালেন্স</span>
            <Wallet size={16} className="text-blue-600" />
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-slate-900">
            {formatPrice(state.walletBalanceBdt)}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            ইনস্ট্যান্ট বাল্ক ডিপ্লয়ের জন্য রেডি
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">ফ্লিট সার্ভার</span>
            <Server size={16} className="text-emerald-600" />
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-slate-900">
            {runningCount} / {state.servers.length}
          </p>
          <p className="mt-0.5 text-xs text-emerald-700">
            মাসিক আনুমানিক মার্জিন: {formatPrice(monthlyMarginBdt)}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">সাব-ক্লায়েন্ট</span>
            <Users size={16} className="text-indigo-600" />
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-slate-900">
            {state.clients.length}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            সব অ্যাকাউন্ট সক্রিয় আছে
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">হোলসেল টিয়ার</span>
            <Award size={16} className="text-amber-500" />
          </div>
          <p className="mt-2 font-display text-2xl font-extrabold text-slate-900">
            {tier.discountPercent}% OFF
          </p>
          <div className="mt-2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all"
                style={{ width: `${tierProgressPct}%` }}
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              {tier.nextTierVms
                ? `${tier.nextTierName} পেতে আরও ${Math.max(0, tier.nextTierVms - state.servers.length)}টি VM`
                : "সর্বোচ্চ Platinum টিয়ার আনলক হয়েছে"}
            </p>
          </div>
        </div>
      </div>

      {/* Fleet Preview + Wallet Activity */}
      <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
        <section className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="font-display text-sm font-extrabold text-slate-900 sm:text-base">
              সক্রিয় ফ্লিট সার্ভারসমূহ
            </h2>
            <Link
              href="/reseller-portal/servers"
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline"
            >
              সব দেখুন <ArrowRight size={13} />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {state.servers.slice(0, 5).map((srv) => (
              <div
                key={srv.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 hover:bg-slate-50/70"
              >
                <div className="flex items-center gap-3">
                  <CountryFlag code={srv.country} size={20} />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-mono text-xs font-bold text-slate-900 sm:text-sm">
                        {srv.hostname}
                      </p>
                      <StatusPill status={srv.status} />
                    </div>
                    <p className="text-xs text-slate-500">
                      {srv.clientName} ·{" "}
                      <span className="font-mono">{srv.ip}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs font-bold text-slate-900 sm:text-sm">
                    {formatPrice(srv.wholesaleMonthlyBdt)}
                    <span className="font-sans font-normal text-slate-400">
                      {" "}
                      /মাস
                    </span>
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    লাভ +{formatPrice(srv.retailMonthlyBdt - srv.wholesaleMonthlyBdt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="font-display text-sm font-extrabold text-slate-900 sm:text-base">
              সাম্প্রতিক ওয়ালেট লেনদেন
            </h2>
            <Link
              href="/reseller-portal/wallet"
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline"
            >
              লেজার <ArrowRight size={13} />
            </Link>
          </div>

          <ul className="divide-y divide-slate-100">
            {state.transactions.slice(0, 5).map((txn) => {
              const isCredit = txn.type === "credit" || txn.type === "refund";
              return (
                <li
                  key={txn.id}
                  className="flex items-center justify-between gap-3 px-5 py-3.5"
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg ${
                        isCredit
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {isCredit ? (
                        <ArrowDownLeft size={14} />
                      ) : (
                        <ArrowUpRight size={14} />
                      )}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {txn.description}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {txn.id} · {txn.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 font-mono text-xs font-bold ${
                      isCredit ? "text-emerald-700" : "text-slate-900"
                    }`}
                  >
                    {isCredit ? "+" : "−"}
                    {formatPrice(txn.amountBdt)}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}