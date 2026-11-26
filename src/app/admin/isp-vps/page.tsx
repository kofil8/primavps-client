"use client";

import { useCurrency } from "@/lib/currency";
import {
  getAdminState,
  updateIspPlan,
  type AdminIspPlan,
} from "@/lib/services/admin-store";
import { Check, Minus, Plus, ShieldCheck, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminIspVpsPage() {
  const { formatPrice } = useCurrency();
  const [plans, setPlans] = useState<AdminIspPlan[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<AdminIspPlan>>({});

  useEffect(() => {
    const sync = () => setPlans(getAdminState().ispPlans);
    sync();
    window.addEventListener("admin-store-updated", sync);
    return () => window.removeEventListener("admin-store-updated", sync);
  }, []);

  const startEdit = (plan: AdminIspPlan) => {
    setEditingId(plan.id);
    setDraft({
      priceBdt: plan.priceBdt,
      priceFreshBdt: plan.priceFreshBdt,
      vcpu: plan.vcpu,
      ramGb: plan.ramGb,
      nvmeGb: plan.nvmeGb,
    });
  };

  const saveEdit = (planId: string) => {
    updateIspPlan(planId, draft);
    setEditingId(null);
    toast.success("ISP plan updated — storefront pricing synced.");
  };

  const adjustStock = (plan: AdminIspPlan, delta: number) => {
    const next = Math.max(0, plan.stockCount + delta);
    updateIspPlan(plan.id, { stockCount: next });
    toast.success(`${plan.name} stock set to ${next}`);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Manage Residential ISP VPS plans, Clean/Virgin BDT pricing, and live inventory counts shown on{" "}
            <span className="font-mono text-slate-700">/isp-vps</span>.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-700">
          <ShieldCheck size={13} />
          API Endpoint: /api/v1/admin/plans?type=ISP_VPS
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => {
          const isEditing = editingId === plan.id;

          return (
            <div
              key={plan.id}
              className={`flex flex-col rounded-2xl border bg-white p-5 shadow-2xs transition-all ${
                plan.isActive ? "border-slate-200" : "border-slate-200/70 opacity-65"
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-base font-extrabold text-slate-900">
                      {plan.name}
                    </h2>
                    {plan.isPopular && (
                      <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 font-mono text-[11px] text-slate-400">
                    slug: {plan.slug}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    updateIspPlan(plan.id, { isActive: !plan.isActive });
                    toast.success(
                      `${plan.name} ${plan.isActive ? "hidden" : "published"}`,
                    );
                  }}
                  className={`cursor-pointer rounded-lg px-2.5 py-1 text-[11px] font-bold ${
                    plan.isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {plan.isActive ? "Active" : "Hidden"}
                </button>
              </div>

              {/* Quick Stock Stepper */}
              <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5">
                <span className="text-xs font-bold text-slate-600">Live Stock</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => adjustStock(plan, -1)}
                    className="grid size-7 cursor-pointer place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="min-w-8 text-center font-mono text-sm font-black text-slate-900">
                    {plan.stockCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => adjustStock(plan, 1)}
                    className="grid size-7 cursor-pointer place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* Pricing & Specs */}
              {isEditing ? (
                <div className="mt-4 space-y-2.5">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">
                        Clean IP (BDT)
                      </label>
                      <input
                        type="number"
                        value={draft.priceBdt ?? 0}
                        onChange={(e) =>
                          setDraft({ ...draft, priceBdt: Number(e.target.value) })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 px-2.5 py-1.5 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">
                        Virgin IP (BDT)
                      </label>
                      <input
                        type="number"
                        value={draft.priceFreshBdt ?? 0}
                        onChange={(e) =>
                          setDraft({ ...draft, priceFreshBdt: Number(e.target.value) })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 px-2.5 py-1.5 font-mono text-xs"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">vCPU</label>
                      <input
                        type="number"
                        value={draft.vcpu ?? 0}
                        onChange={(e) =>
                          setDraft({ ...draft, vcpu: Number(e.target.value) })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">RAM GB</label>
                      <input
                        type="number"
                        value={draft.ramGb ?? 0}
                        onChange={(e) =>
                          setDraft({ ...draft, ramGb: Number(e.target.value) })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">NVMe GB</label>
                      <input
                        type="number"
                        value={draft.nvmeGb ?? 0}
                        onChange={(e) =>
                          setDraft({ ...draft, nvmeGb: Number(e.target.value) })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-200 px-2 py-1.5 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="rounded-xl bg-slate-50 p-2.5">
                      <span className="text-[10px] text-slate-500">Clean IP / mo</span>
                      <p className="mt-0.5 font-display text-base font-black text-slate-900">
                        {formatPrice(plan.priceBdt)}
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-2.5">
                      <span className="text-[10px] text-slate-500">Virgin IP / mo</span>
                      <p className="mt-0.5 font-display text-base font-black text-slate-900">
                        {formatPrice(plan.priceFreshBdt)}
                      </p>
                    </div>
                  </div>
                  <p className="font-mono text-xs font-semibold text-slate-600">
                    {plan.vcpu} vCPU · {plan.ramGb} GB RAM · {plan.nvmeGb} GB NVMe
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-100 pt-3.5">
                <button
                  type="button"
                  onClick={() => {
                    updateIspPlan(plan.id, { isPopular: !plan.isPopular });
                    toast.success("Popular badge updated");
                  }}
                  className={`inline-flex cursor-pointer items-center gap-1 rounded-lg px-2.5 py-1.5 text-[11px] font-bold ${
                    plan.isPopular
                      ? "bg-amber-50 text-amber-700"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  <Star size={12} />
                  {plan.isPopular ? "Popular" : "Mark Popular"}
                </button>

                {isEditing ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="cursor-pointer rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => saveEdit(plan.id)}
                      className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700"
                    >
                      <Check size={13} /> Save
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => startEdit(plan)}
                    className="cursor-pointer rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Edit Price / Specs
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}