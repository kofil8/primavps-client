"use client";

import { CountryFlag } from "@/components/ui/CountryFlag";
import { useCurrency } from "@/lib/currency";
import {
  getAdminState,
  resolveIpSwap,
  type AdminIpSwap,
} from "@/lib/services/admin-store";
import { ArrowRight, CheckCircle2, RefreshCw, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type SwapFilter = "PENDING" | "COMPLETED" | "REJECTED" | "ALL";

function suggestFreshIp(country: string) {
  const prefixMap: Record<string, string> = {
    us: "108.204",
    uk: "86.142",
    de: "80.153",
    fr: "90.84",
  };
  const prefix = prefixMap[country] || "108.204";
  return `${prefix}.${Math.floor(15 + Math.random() * 210)}.${Math.floor(10 + Math.random() * 235)}`;
}

export default function AdminIpSwapsPage() {
  const { formatPrice } = useCurrency();
  const [swaps, setSwaps] = useState<AdminIpSwap[]>([]);
  const [filter, setFilter] = useState<SwapFilter>("PENDING");
  const [draftIps, setDraftIps] = useState<Record<string, string>>({});

  useEffect(() => {
    const sync = () => {
      const list = getAdminState().ipSwaps;
      setSwaps(list);
      setDraftIps((prev) => {
        const next = { ...prev };
        for (const s of list) {
          if (s.status === "PENDING" && !next[s.id]) {
            next[s.id] = suggestFreshIp(s.country);
          }
        }
        return next;
      });
    };
    sync();
    window.addEventListener("admin-store-updated", sync);
    return () => window.removeEventListener("admin-store-updated", sync);
  }, []);

  const filtered = swaps.filter((s) =>
    filter === "ALL" ? true : s.status === filter,
  );

  const handleApprove = (swap: AdminIpSwap) => {
    const newIp = (draftIps[swap.id] || suggestFreshIp(swap.country)).trim();
    resolveIpSwap(swap.id, "COMPLETED", newIp);
    toast.success(`Swap approved: ${swap.oldIp} → ${newIp}`);
  };

  const handleReject = (swap: AdminIpSwap) => {
    resolveIpSwap(swap.id, "REJECTED");
    toast.error(`Swap request ${swap.id} rejected.`);
  };

  return (
    <div className="space-y-5">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          Review 7-Day Free (AUP) and Day 8+ Paid ({formatPrice(350)}) IP replacement requests.
        </p>

        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 text-xs font-bold">
          {(
            [
              {
                id: "PENDING",
                label: `Pending (${swaps.filter((s) => s.status === "PENDING").length})`,
              },
              {
                id: "COMPLETED",
                label: `Completed (${swaps.filter((s) => s.status === "COMPLETED").length})`,
              },
              {
                id: "REJECTED",
                label: `Rejected (${swaps.filter((s) => s.status === "REJECTED").length})`,
              },
              { id: "ALL", label: "All" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`cursor-pointer rounded-lg px-3 py-1.5 transition-colors ${
                filter === item.id
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Swap Cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-14 text-center">
          <CheckCircle2 size={30} className="text-emerald-500" />
          <p className="mt-2 text-sm font-bold text-slate-800">
            No IP swap requests in this queue.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filtered.map((swap) => (
            <div
              key={swap.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Left Details */}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <CountryFlag code={swap.country} size={16} />
                    <span className="font-mono text-xs font-extrabold text-slate-900">
                      {swap.instanceName}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-bold ${
                        swap.isFree
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {swap.isFree
                        ? "7-Day Free Swap"
                        : `Paid Swap · ${formatPrice(swap.feeBdt)}`}
                    </span>
                    <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-600">
                      {swap.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700">{swap.reason}</p>

                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-slate-500">
                    <span>Old IP: <strong className="text-slate-800">{swap.oldIp}</strong></span>
                    {swap.newIp && (
                      <>
                        <ArrowRight size={12} className="text-emerald-600" />
                        <span>
                          New IP: <strong className="text-emerald-700">{swap.newIp}</strong>
                        </span>
                      </>
                    )}
                    <span>· {swap.customerName} ({swap.customerEmail})</span>
                    <span>· {swap.createdAt}</span>
                  </div>
                </div>

                {/* Right Controls (Only when Pending) */}
                {swap.status === "PENDING" && (
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5">
                      <input
                        type="text"
                        value={draftIps[swap.id] || ""}
                        onChange={(e) =>
                          setDraftIps({ ...draftIps, [swap.id]: e.target.value })
                        }
                        aria-label="Replacement IP"
                        className="w-32 bg-transparent font-mono text-xs font-bold text-slate-900 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setDraftIps({
                            ...draftIps,
                            [swap.id]: suggestFreshIp(swap.country),
                          })
                        }
                        title="Pick another pool IP"
                        className="cursor-pointer text-slate-400 hover:text-blue-600"
                      >
                        <RefreshCw size={13} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleApprove(swap)}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                    >
                      <CheckCircle2 size={14} /> Approve &amp; Swap
                    </button>

                    <button
                      type="button"
                      onClick={() => handleReject(swap)}
                      className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100"
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}