"use client";

import { StatusPill } from "@/components/dashboard/StatusPill";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { useCurrency } from "@/lib/currency";
import {
  DEFAULT_RESELLER_STATE,
  getResellerState,
  updateResellerServerStatus,
} from "@/lib/services/reseller-store";
import { downloadRdpFile } from "@/lib/utils/rdp-file";
import {
  Check,
  Copy,
  Download,
  Layers,
  Play,
  Power,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ResellerFleetServersPage() {
  const { formatPrice } = useCurrency();
  const [state, setState] = useState(DEFAULT_RESELLER_STATE);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "running" | "stopped">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => setState(getResellerState());
    sync();
    window.addEventListener("reseller-store-updated", sync);
    return () => window.removeEventListener("reseller-store-updated", sync);
  }, []);

  const filtered = state.servers.filter((srv) => {
    const matchesStatus =
      statusFilter === "all" ? true : srv.status === statusFilter;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      srv.hostname.toLowerCase().includes(q) ||
      srv.ip.includes(q) ||
      srv.clientName.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const handleCopyIp = async (id: string, ip: string) => {
    try {
      await navigator.clipboard.writeText(ip);
      setCopiedId(id);
      toast.success("IP ক্লিপবোর্ডে কপি হয়েছে।");
      window.setTimeout(() => setCopiedId(null), 1500);
    } catch {
      toast.error("ক্লিপবোর্ডে কপি করা যায়নি — IP ম্যানুয়ালি কপি করুন।");
    }
  };

  const handleTogglePower = (id: string, hostname: string, next: "running" | "stopped") => {
    updateResellerServerStatus(id, next);
    toast.success(
      next === "running"
        ? `${hostname} চালু করা হয়েছে।`
        : `${hostname} শাটডাউন করা হয়েছে।`,
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
            ফ্লিট সার্ভার ({state.servers.length})
          </h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            সব সাব-ক্লায়েন্টের ISP ও Cloud সার্ভার এক টেবিলে কন্ট্রোল করুন।
          </p>
        </div>

        <Link
          href="/reseller-portal/deploy"
          className="inline-flex items-center gap-1.5 self-start rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 sm:self-auto"
        >
          <Layers size={14} />
          <span>নতুন বাল্ক ডিপ্লয়</span>
        </Link>
      </div>

      {/* Search + Status Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search
            size={15}
            className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="হোস্টনেম, IP বা ক্লায়েন্ট সার্চ করুন…"
            className="field !h-10 !rounded-xl pl-9 text-xs sm:text-sm"
          />
        </div>

        <div className="inline-flex self-start rounded-xl bg-slate-200/70 p-1 text-xs font-bold">
          {(
            [
              { id: "all", label: "সব" },
              { id: "running", label: "Running" },
              { id: "stopped", label: "Stopped" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`cursor-pointer rounded-lg px-3 py-1.5 transition-colors ${
                statusFilter === tab.id
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3.5">সার্ভার ও ক্লায়েন্ট</th>
                <th className="px-5 py-3.5">IP ও ক্যারিয়ার</th>
                <th className="px-5 py-3.5">হোলসেল / মার্জিন</th>
                <th className="px-5 py-3.5">স্ট্যাটাস</th>
                <th className="px-5 py-3.5 text-right">কুইক অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((srv) => (
                <tr key={srv.id} className="hover:bg-slate-50/60">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <CountryFlag code={srv.country} size={20} />
                      <div>
                        <p className="font-mono font-bold text-slate-900">
                          {srv.hostname}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {srv.clientName} · {srv.specs.vcpu}C/{srv.specs.ram}G
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-semibold text-slate-800">
                        {srv.ip}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyIp(srv.id, srv.ip)}
                        aria-label="Copy IP"
                        className="cursor-pointer rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      >
                        {copiedId === srv.id ? (
                          <Check size={13} className="text-emerald-600" />
                        ) : (
                          <Copy size={13} />
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500">{srv.carrier}</p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-mono font-bold text-slate-900">
                      {formatPrice(srv.wholesaleMonthlyBdt)}/মাস
                    </p>
                    <p className="text-[11px] font-semibold text-emerald-700">
                      +{formatPrice(srv.retailMonthlyBdt - srv.wholesaleMonthlyBdt)}{" "}
                      লাভ
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <StatusPill status={srv.status} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      {srv.os.toLowerCase().includes("windows") && (
                        <button
                          type="button"
                          onClick={() => {
                            downloadRdpFile({
                              ipAddress: srv.ip,
                              rdpPort: 3389,
                              username: "Administrator",
                              serverLabel: srv.hostname,
                            });
                            toast.success("RDP ফাইল ডাউনলোড শুরু হয়েছে।");
                          }}
                          title="Download .RDP file"
                          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-bold text-slate-700 hover:bg-slate-50"
                        >
                          <Download size={12} />
                          <span>.RDP</span>
                        </button>
                      )}

                      {srv.status === "stopped" ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleTogglePower(srv.id, srv.hostname, "running")
                          }
                          className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-emerald-700"
                        >
                          <Play size={12} />
                          <span>Start</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            handleTogglePower(srv.id, srv.hostname, "stopped")
                          }
                          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-[11px] font-bold text-red-700 hover:bg-red-100"
                        >
                          <Power size={12} />
                          <span>Stop</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}