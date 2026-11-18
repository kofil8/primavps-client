"use client";

import { useCurrency } from "@/lib/currency";
import { IspPlan } from "@/lib/data/plans";
import { ArrowRight, Check, Lock, X } from "lucide-react";
import { useEffect, useState } from "react";

export interface CheckoutPlan {
  id?: string;
  name: string;
  tagline?: string;
  priceBdt: number;
  priceFreshBdt?: number;
  specs: {
    vcpu: number;
    ram: number;
    nvme: number;
    bandwidth: string;
  };
  isCloud?: boolean;
  osName?: string;
  regionName?: string;
}

interface CheckoutDrawerProps {
  plan: CheckoutPlan | IspPlan | null;
  carrier?: string;
  isFresh?: boolean;
  initialBillingCycle?: "monthly" | "quarterly" | "annual";
  onClose: () => void;
}

const CYCLES = [
  { id: "monthly", label: "1 month", months: 1, discount: 0 },
  { id: "quarterly", label: "3 months", months: 3, discount: 0.05 },
  { id: "annual", label: "12 months", months: 12, discount: 0.15 },
] as const;

export function CheckoutDrawer({
  plan,
  carrier = "AT&T",
  isFresh = false,
  initialBillingCycle = "monthly",
  onClose,
}: CheckoutDrawerProps) {
  const { formatPrice } = useCurrency();
  const [selectedCarrier, setSelectedCarrier] = useState(
    carrier === "All" ? "AT&T" : carrier,
  );
  const [location, setLocation] = useState(
    plan && "regionName" in plan && plan.regionName
      ? plan.regionName
      : "Dallas, TX",
  );
  const [billingCycle, setBillingCycle] =
    useState<(typeof CYCLES)[number]["id"]>(initialBillingCycle);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!plan) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [plan, onClose]);

  if (!plan) return null;

  const isCloud = "isCloud" in plan && plan.isCloud;
  const basePrice =
    !isCloud && isFresh && "priceFreshBdt" in plan && plan.priceFreshBdt
      ? plan.priceFreshBdt
      : plan.priceBdt;

  const cycle = CYCLES.find((item) => item.id === billingCycle) ?? CYCLES[0];
  let total = Math.round(basePrice * cycle.months * (1 - cycle.discount));
  if (couponApplied) total = Math.round(total * 0.9);

  const applyCoupon = (event: React.FormEvent) => {
    event.preventDefault();
    if (coupon.trim().toUpperCase() === "LAUNCH10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("That code isn't valid.");
    }
  };

  const proceed = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setComplete(true);
    }, 900);
  };

  const optionClass = (active: boolean) =>
    `rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
      active
        ? "border-blue-600 bg-blue-50 text-slate-900"
        : "border-slate-200 text-slate-600 hover:border-slate-300"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <button
        className="flex-1 cursor-default"
        aria-label="Close checkout"
        onClick={onClose}
      />

      <div className="flex h-full w-full max-w-md flex-col justify-between overflow-y-auto border-l border-slate-200 bg-white">
        <div>
          <div className="flex items-start justify-between border-b border-slate-200 px-6 py-4">
            <div>
              <p className="text-xs font-semibold text-blue-700 uppercase">
                Checkout
              </p>
              <h2
                id="checkout-title"
                className="mt-0.5 font-display text-lg font-bold text-slate-900"
              >
                {plan.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="grid size-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
              aria-label="Close checkout"
            >
              <X size={18} />
            </button>
          </div>

          {complete ? (
            <div className="px-6 py-12 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <Check size={28} />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-slate-900">
                Payment received
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your server is being provisioned now. Login details will appear
                in your client area within 90 seconds.
              </p>
              <button onClick={onClose} className="btn-primary mt-6 w-full">
                Done
              </button>
            </div>
          ) : (
            <div className="space-y-6 px-6 py-5 text-sm">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  {plan.specs.vcpu} vCPU · {plan.specs.ram} GB RAM ·{" "}
                  {plan.specs.nvme} GB NVMe
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {isCloud
                    ? plan.osName
                    : `${isFresh ? "Virgin" : "Clean"} ${selectedCarrier} IP`}
                </p>
              </div>

              {!isCloud && (
                <div>
                  <p className="mb-2 font-medium text-slate-900">Carrier</p>
                  <div className="grid grid-cols-3 gap-2">
                    {["AT&T", "Comcast", "Verizon"].map((item) => (
                      <button
                        key={item}
                        onClick={() => setSelectedCarrier(item)}
                        className={optionClass(selectedCarrier === item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="mb-2 font-medium text-slate-900">Location</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Dallas, TX", "Ashburn, VA"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setLocation(item)}
                      className={optionClass(location.includes(item))}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 font-medium text-slate-900">Billing</p>
                <div className="grid grid-cols-3 gap-2">
                  {CYCLES.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setBillingCycle(item.id)}
                      className={optionClass(billingCycle === item.id)}
                    >
                      <span className="block">{item.label}</span>
                      <span className="block text-xs text-emerald-700">
                        {item.discount === 0
                          ? "Standard"
                          : `Save ${item.discount * 100}%`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={applyCoupon}>
                <label htmlFor="coupon" className="mb-2 block font-medium text-slate-900">
                  Promo code
                </label>
                <div className="flex gap-2">
                  <input
                    id="coupon"
                    value={coupon}
                    onChange={(event) => setCoupon(event.target.value)}
                    disabled={couponApplied}
                    placeholder="LAUNCH10"
                    className="field font-mono uppercase"
                  />
                  <button
                    type="submit"
                    disabled={couponApplied || !coupon.trim()}
                    className="btn-outline px-4"
                  >
                    {couponApplied ? "Applied" : "Apply"}
                  </button>
                </div>
                {couponApplied && (
                  <p className="mt-2 text-xs text-emerald-700">
                    LAUNCH10 applied — 10% off.
                  </p>
                )}
                {couponError && (
                  <p className="mt-2 text-xs text-red-600">{couponError}</p>
                )}
              </form>

              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex justify-between text-slate-600">
                  <span>
                    {formatPrice(basePrice)} × {cycle.months}
                  </span>
                  <span className="font-mono">
                    {formatPrice(basePrice * cycle.months)}
                  </span>
                </div>
                {(cycle.discount > 0 || couponApplied) && (
                  <div className="mt-1.5 flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-mono">
                      −
                      {formatPrice(
                        Math.round(basePrice * cycle.months * cycle.discount) +
                          (couponApplied
                            ? Math.round(
                                basePrice *
                                  cycle.months *
                                  (1 - cycle.discount) *
                                  0.1,
                              )
                            : 0),
                      )}
                    </span>
                  </div>
                )}
                <div className="mt-3 flex items-baseline justify-between border-t border-slate-200 pt-3">
                  <span className="font-medium text-slate-900">
                    Due today
                  </span>
                  <span className="font-display text-2xl font-extrabold text-slate-900">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {!complete && (
          <div className="space-y-2 border-t border-slate-200 px-6 py-4">
            <button
              onClick={proceed}
              disabled={submitting}
              className="btn-primary w-full"
            >
              <Lock size={15} />
              {submitting
                ? "Connecting to gateway…"
                : "Pay with bKash / card"}
              {!submitting && <ArrowRight size={16} />}
            </button>
            <p className="text-center text-xs text-slate-500">
              Live in 90 seconds · cancel anytime
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
