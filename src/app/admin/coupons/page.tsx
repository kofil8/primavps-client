"use client";

import {
  createAdminCoupon,
  getAdminState,
  toggleCouponActive,
  type AdminCoupon,
} from "@/lib/services/admin-store";
import { Copy, Plus, Tag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<AdminCoupon[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(10);
  const [scope, setScope] = useState<AdminCoupon["scope"]>("ISP_VPS");
  const [maxUses, setMaxUses] = useState("100");
  const [expiresAt, setExpiresAt] = useState("Dec 31, 2026");

  useEffect(() => {
    const sync = () => setCoupons(getAdminState().coupons);
    sync();
    window.addEventListener("admin-store-updated", sync);
    return () => window.removeEventListener("admin-store-updated", sync);
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    createAdminCoupon({
      code: code.trim().toUpperCase(),
      discountPercent: Number(discountPercent) || 10,
      scope,
      maxUses: maxUses.trim() ? Number(maxUses) : null,
      expiresAt: expiresAt.trim() || "Dec 31, 2026",
    });
    toast.success(`Promo code ${code.trim().toUpperCase()} created.`);
    setCode("");
    setModalOpen(false);
  };

  const copyCode = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`Copied ${value}`);
    } catch {
      toast.error("Copy failed");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          Manage active promo codes synced with <span className="font-mono">/hot-deals</span> and checkout validation.
        </p>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-blue-600"
        >
          <Plus size={14} /> New Promo Code
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {coupons.map((c) => {
          const pct = c.maxUses
            ? Math.min(100, Math.round((c.usedCount / c.maxUses) * 100))
            : 0;

          return (
            <div
              key={c.id}
              className={`rounded-2xl border bg-white p-5 shadow-2xs transition-opacity ${
                c.active ? "border-slate-200" : "border-slate-200/70 opacity-65"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <Tag size={15} />
                  </span>
                  <div>
                    <button
                      type="button"
                      onClick={() => copyCode(c.code)}
                      className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-sm font-black text-slate-900 hover:text-blue-600"
                    >
                      <span>{c.code}</span>
                      <Copy size={12} className="text-slate-400" />
                    </button>
                    <p className="text-[11px] text-slate-500">
                      Scope: <strong className="text-slate-700">{c.scope}</strong>
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-mono text-xs font-extrabold text-emerald-700">
                  -{c.discountPercent}%
                </span>
              </div>

              {/* Usage Progress */}
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Redemptions</span>
                  <span className="font-mono font-bold text-slate-800">
                    {c.usedCount} / {c.maxUses ?? "∞"}
                  </span>
                </div>
                {c.maxUses && (
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px]">
                <span className="text-slate-500">Expires: {c.expiresAt}</span>
                <button
                  type="button"
                  onClick={() => {
                    toggleCouponActive(c.id);
                    toast.success(
                      `${c.code} ${c.active ? "paused" : "activated"}.`,
                    );
                  }}
                  className={`cursor-pointer rounded-lg px-2.5 py-1 font-bold ${
                    c.active
                      ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {c.active ? "Active" : "Paused"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Coupon Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
          onClick={() => setModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-display text-sm font-extrabold text-slate-900">
                Create Promo Code
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="grid size-7 cursor-pointer place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="EID20"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs font-bold uppercase text-slate-900 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    required
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Product Scope
                  </label>
                  <select
                    value={scope}
                    onChange={(e) =>
                      setScope(e.target.value as AdminCoupon["scope"])
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
                  >
                    <option value="ALL">All Products</option>
                    <option value="ISP_VPS">ISP VPS Only</option>
                    <option value="CLOUD_VPS">Cloud VPS Only</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700">
                    Max Uses (blank = ∞)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={maxUses}
                    onChange={(e) => setMaxUses(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Expiry Label
                </label>
                <input
                  type="text"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}