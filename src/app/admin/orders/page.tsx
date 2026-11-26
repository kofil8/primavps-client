"use client";

import { ProvisionModal } from "@/components/admin/ProvisionModal";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { useCurrency } from "@/lib/currency";
import {
  getAdminState,
  provisionAdminOrder,
  saveAdminState,
  type AdminOrder,
  type AdminOrderStatus,
} from "@/lib/services/admin-store";
import { Ban, CheckCircle2, Copy, Search, ServerCog } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type StatusTab = "ALL" | "PROVISIONING" | "ACTIVE" | "SUSPENDED";

const STATUS_BADGE: Record<AdminOrderStatus, string> = {
  PROVISIONING: "bg-amber-50 text-amber-700 border-amber-200",
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PENDING_PAYMENT: "bg-slate-100 text-slate-600 border-slate-200",
  SUSPENDED: "bg-rose-50 text-rose-700 border-rose-200",
  CANCELLED: "bg-slate-100 text-slate-500 border-slate-200",
};

export default function AdminOrdersPage() {
  const { formatPrice } = useCurrency();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [tab, setTab] = useState<StatusTab>("ALL");
  const [query, setQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  useEffect(() => {
    const sync = () => setOrders(getAdminState().orders);
    sync();
    window.addEventListener("admin-store-updated", sync);
    return () => window.removeEventListener("admin-store-updated", sync);
  }, []);

  const filtered = orders.filter((o) => {
    const matchesTab = tab === "ALL" ? true : o.status === tab;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      o.orderNumber.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerEmail.toLowerCase().includes(q) ||
      (o.ipAddress?.toLowerCase().includes(q) ?? false);
    return matchesTab && matchesQuery;
  });

  const handleProvision = (
    orderId: string,
    payload: { ipAddress: string; rdpPort: number; username: string; password: string },
  ) => {
    provisionAdminOrder(orderId, payload);
    toast.success(`Server activated (${payload.ipAddress}) & client notified.`);
  };

  const toggleSuspend = (order: AdminOrder) => {
    const state = getAdminState();
    const nextStatus: AdminOrderStatus =
      order.status === "SUSPENDED" ? "ACTIVE" : "SUSPENDED";
    saveAdminState({
      ...state,
      orders: state.orders.map((o) =>
        o.id === order.id ? { ...o, status: nextStatus } : o,
      ),
    });
    toast.success(
      `${order.orderNumber} marked as ${nextStatus === "SUSPENDED" ? "Suspended" : "Active"}.`,
    );
  };

  const copyIp = async (ip: string) => {
    try {
      await navigator.clipboard.writeText(ip);
      toast.success(`Copied ${ip}`);
    } catch {
      toast.error("Failed to copy IP");
    }
  };

  return (
    <div className="space-y-5">
      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={14}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order #, email, or IP…"
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pr-3 pl-9 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="inline-flex self-start rounded-xl border border-slate-200 bg-white p-1 text-xs font-bold">
          {(
            [
              { id: "ALL", label: `All (${orders.length})` },
              {
                id: "PROVISIONING",
                label: `Pending (${orders.filter((o) => o.status === "PROVISIONING").length})`,
              },
              {
                id: "ACTIVE",
                label: `Active (${orders.filter((o) => o.status === "ACTIVE").length})`,
              },
              {
                id: "SUSPENDED",
                label: `Suspended (${orders.filter((o) => o.status === "SUSPENDED").length})`,
              },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`cursor-pointer rounded-lg px-3 py-1.5 transition-colors ${
                tab === item.id
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <table className="w-full min-w-[860px] text-left text-xs">
          <thead className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3">Order &amp; Customer</th>
              <th className="px-4 py-3">Plan &amp; Region</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Assigned IP</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-xs font-semibold text-slate-500"
                >
                  No orders found for this filter.
                </td>
              </tr>
            ) : (
              filtered.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/60">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">
                        {order.orderNumber}
                      </span>
                      {order.customerRole === "RESELLER" && (
                        <span className="rounded bg-indigo-50 px-1.5 py-0.5 font-mono text-[9.5px] font-bold text-indigo-700">
                          RESELLER
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-600">
                      {order.customerName} · {order.customerEmail}
                    </p>
                    <p className="text-[10.5px] text-slate-400">{order.createdAt}</p>
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <CountryFlag code={order.country} size={14} />
                      <span>{order.planName}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {order.carrier} · {order.os}
                    </p>
                  </td>

                  <td className="px-4 py-3.5">
                    <p className="font-mono font-bold text-slate-900">
                      {formatPrice(order.totalBdt)}
                    </p>
                    <p className="font-mono text-[10.5px] text-slate-500">
                      {order.gateway} · {order.gatewayTranId}
                    </p>
                  </td>

                  <td className="px-4 py-3.5">
                    {order.ipAddress ? (
                      <button
                        type="button"
                        onClick={() => copyIp(order.ipAddress!)}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[11px] font-bold text-slate-800 hover:bg-slate-100"
                      >
                        <span>
                          {order.ipAddress}:{order.rdpPort || 3389}
                        </span>
                        <Copy size={11} className="text-slate-400" />
                      </button>
                    ) : (
                      <span className="font-mono text-[11px] text-amber-600">
                        Awaiting IP…
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                        STATUS_BADGE[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-right">
                    {order.status === "PROVISIONING" ? (
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-600"
                      >
                        <ServerCog size={13} />
                        Assign IP
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleSuspend(order)}
                        className={`inline-flex cursor-pointer items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-bold ${
                          order.status === "SUSPENDED"
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : "border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
                        }`}
                      >
                        {order.status === "SUSPENDED" ? (
                          <>
                            <CheckCircle2 size={12} /> Restore
                          </>
                        ) : (
                          <>
                            <Ban size={12} /> Suspend
                          </>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ProvisionModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onConfirm={handleProvision}
      />
    </div>
  );
}