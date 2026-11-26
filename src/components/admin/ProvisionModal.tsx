"use client";

import type { AdminOrder } from "@/lib/services/admin-store";
import { CheckCircle2, RefreshCw, Server, X } from "lucide-react";
import { useEffect, useState } from "react";

interface ProvisionModalProps {
  order: AdminOrder | null;
  onClose: () => void;
  onConfirm: (
    orderId: string,
    payload: {
      ipAddress: string;
      rdpPort: number;
      username: string;
      password: string;
    },
  ) => void;
}

function generateStrongPassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
  return Array.from({ length: 14 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length)),
  ).join("");
}

export function ProvisionModal({
  order,
  onClose,
  onConfirm,
}: ProvisionModalProps) {
  const [ipAddress, setIpAddress] = useState("");
  const [rdpPort, setRdpPort] = useState(3389);
  const [username, setUsername] = useState("Administrator");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!order) return;
    const isLinux = order.os.toLowerCase().includes("ubuntu");
    setIpAddress(
      order.country === "us"
        ? `108.204.${Math.floor(10 + Math.random() * 200)}.${Math.floor(10 + Math.random() * 240)}`
        : `86.142.${Math.floor(10 + Math.random() * 200)}.${Math.floor(10 + Math.random() * 240)}`,
    );
    setRdpPort(isLinux ? 22 : 3389);
    setUsername(isLinux ? "root" : "Administrator");
    setPassword(generateStrongPassword());
  }, [order]);

  if (!order) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ipAddress.trim() || !username.trim() || !password.trim()) return;
    onConfirm(order.id, {
      ipAddress: ipAddress.trim(),
      rdpPort: Number(rdpPort) || 3389,
      username: username.trim(),
      password: password.trim(),
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-amber-50 text-amber-600">
              <Server size={18} />
            </span>
            <div>
              <h2 className="font-display text-sm font-extrabold text-slate-900">
                Provision &amp; Activate Server
              </h2>
              <p className="font-mono text-[11px] text-slate-500">
                {order.orderNumber} · {order.customerName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-7 cursor-pointer place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div className="rounded-xl bg-slate-50 px-3.5 py-2.5 text-xs text-slate-600">
            <span className="font-bold text-slate-900">{order.planName}</span> ·{" "}
            {order.carrier} ({order.country.toUpperCase()}) · {order.os}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-[11px] font-bold text-slate-700">
                Assigned Static IPv4
              </label>
              <input
                type="text"
                required
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700">
                Port
              </label>
              <input
                type="number"
                required
                value={rdpPort}
                onChange={(e) => setRdpPort(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-bold text-slate-700">
                Password
              </label>
              <button
                type="button"
                onClick={() => setPassword(generateStrongPassword())}
                className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-semibold text-blue-600 hover:underline"
              >
                <RefreshCw size={11} /> Regenerate
              </button>
            </div>
            <input
              type="text"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700"
            >
              <CheckCircle2 size={14} />
              <span>Activate &amp; Notify Client</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}