"use client";

import { ProvisionModal } from "@/components/admin/ProvisionModal";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { useCurrency } from "@/lib/currency";
import {
  getAdminState,
  provisionAdminOrder,
  resolveIpSwap,
  type AdminOrder,
  type AdminState,
} from "@/lib/services/admin-store";
import {
  ArrowLeftRight,
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  ServerCog,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminOverviewPage() {
  const { formatPrice } = useCurrency();
  const [state, setState] = useState<AdminState | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  useEffect(() => {
    const sync = () => setState(getAdminState());
    sync();
    window.addEventListener("admin-store-updated", sync);
    return () => window.removeEventListener("admin-store-updated", sync);
  }, []);

  if (!state) return null;

  const pendingOrders = state.orders.filter((o) => o.status === "PROVISIONING");
  const pendingSwaps = state.ipSwaps.filter((s) => s.status === "PENDING");
  const activeServers = state.orders.filter((o) => o.status === "ACTIVE").length;
  const totalRevenueBdt = state.orders
    .filter((o) => o.status === "ACTIVE" || o.status === "PROVISIONING")
    .reduce((sum, o) => sum + o.totalBdt, 0);

  const handleProvision = (
    orderId: string,
    payload: {
      ipAddress: string;
      rdpPort: number;
      username: string;
      password: string;
    },
  ) => {
    provisionAdminOrder(orderId, payload);
    toast.success(`Server activated (${payload.ipAddress}) & client notified.`);
  };

  const handleQuickApproveSwap = (swapId: string, country: string) => {
    const prefix = country === "us" ? "108.204" : "86.142";
    const nextIp = `${prefix}.${Math.floor(20 + Math.random() * 200)}.${Math.floor(10 + Math.random() * 240)}`;
    resolveIpSwap(swapId, "COMPLETED", nextIp);
    toast.success(`IP Swap completed — assigned ${nextIp}`);
  };

  return (
    <div className="space-y-6">
      {/* 4 Ops KPI Cards */}
      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800">
              Pending Provisioning
            </span>
            <Clock size={16} className="text-amber-600" />
          </div>
          <p className="mt-2 font-display text-2xl font-black text-slate-900">
            {pendingOrders.length}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-600">
            Paid orders waiting for IP/RDP
          </p>
        </div>

        <div className="rounded-2xl border border-rose-200/80 bg-rose-50/40 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-800">
              Pending IP Swaps
            </span>
            <ArrowLeftRight size={16} className="text-rose-600" />
          </div>
          <p className="mt-2 font-display text-2xl font-black text-slate-900">
            {pendingSwaps.length}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-600">
            7-day free &amp; paid swap queue
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Active Fleet / Users
            </span>
            <Users size={16} className="text-blue-600" />
          </div>
          <p className="mt-2 font-display text-2xl font-black text-slate-900">
            {activeServers} VMs · {state.users.length} Users
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Clients &amp; Reseller partners
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Recent Order Volume
            </span>
            <DollarSign size={16} className="text-emerald-600" />
          </div>
          <p className="mt-2 font-display text-2xl font-black text-slate-900">
            {formatPrice(totalRevenueBdt)}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Verified via bKash / SSL / Wallet
          </p>
        </div>
      </div>

      {/* Action-First Split: Provisioning Queue + IP Swaps */}
      <div className="grid gap-5 xl:grid-cols-2">
        {/* Urgent Provisioning Queue */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
            <div className="flex items-center gap-2">
              <ServerCog size={16} className="text-amber-600" />
              <h2 className="font-display text-sm font-extrabold text-slate-900">
                Pending Provisioning Queue
              </h2>
            </div>
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
            >
              All Orders <ArrowRight size={13} />
            </Link>
          </div>

          {pendingOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <CheckCircle2 size={28} className="text-emerald-500" />
              <p className="mt-2 text-xs font-bold text-slate-700">
                All paid orders are provisioned!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {pendingOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <CountryFlag code={order.country} size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-900">
                          {order.orderNumber}
                        </span>
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-600">
                          {order.gateway}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700">
                        {order.planName} · {order.carrier}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {order.customerName} ({order.customerEmail}) ·{" "}
                        {order.createdAt}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedOrder(order)}
                    className="cursor-pointer rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-600"
                  >
                    Assign IP &amp; Activate
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Pending IP Swap Queue */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
            <div className="flex items-center gap-2">
              <ArrowLeftRight size={16} className="text-rose-600" />
              <h2 className="font-display text-sm font-extrabold text-slate-900">
                Pending IP Swap Requests
              </h2>
            </div>
            <Link
              href="/admin/ip-swaps"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
            >
              Manage Swaps <ArrowRight size={13} />
            </Link>
          </div>

          {pendingSwaps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <CheckCircle2 size={28} className="text-emerald-500" />
              <p className="mt-2 text-xs font-bold text-slate-700">
                No pending IP swap requests.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {pendingSwaps.map((swap) => (
                <div
                  key={swap.id}
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <CountryFlag code={swap.country} size={15} />
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {swap.oldIp}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          swap.isFree
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {swap.isFree
                          ? "7-Day Free"
                          : `Paid ${formatPrice(swap.feeBdt)}`}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-slate-600">
                      {swap.reason}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {swap.customerName} · {swap.createdAt}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleQuickApproveSwap(swap.id, swap.country)}
                    className="cursor-pointer rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
                  >
                    Approve &amp; Swap
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <ProvisionModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onConfirm={handleProvision}
      />
    </div>
  );
}