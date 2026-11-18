"use client";

import { CheckoutDrawer } from "@/components/sections/isp/CheckoutDrawer";
import { useCurrency } from "@/lib/currency";
import { CARRIERS, ISP_PLANS, IspPlan } from "@/lib/data/plans";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CYCLES = [
  { id: "monthly", label: "Monthly", months: 1, discount: 0 },
  { id: "quarterly", label: "3 months", months: 3, discount: 0.05 },
  { id: "annual", label: "12 months", months: 12, discount: 0.15 },
] as const;

type BillingCycle = (typeof CYCLES)[number]["id"];

export default function SurveyVpsPage() {
  const { formatPrice } = useCurrency();
  const [selectedCarrier, setSelectedCarrier] = useState("All");
  const [isFresh, setIsFresh] = useState(false);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [activePlan, setActivePlan] = useState<IspPlan | null>(null);

  const cycle = CYCLES.find((item) => item.id === billingCycle) ?? CYCLES[0];

  const plans = ISP_PLANS.filter(
    (plan) => selectedCarrier === "All" || plan.carriers.includes(selectedCarrier),
  );

  return (
    <div className="bg-slate-50">
      <section className="relative isolate overflow-hidden bg-slate-950">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=75"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/30" />

        <div className="shell relative z-10 py-14 sm:py-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white">
            <ShieldCheck size={14} />
            Static residential ISP
          </span>
          <h1 className="mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Clean US residential IPs
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            AT&amp;T, Comcast and Verizon addresses on a hardened Windows
            desktop. Online in 90 seconds.
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="shell flex flex-col gap-4 py-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="mr-1 hidden text-xs font-semibold text-slate-500 sm:inline">
              Carrier
            </span>
            {CARRIERS.map((carrier) => (
              <button
                key={carrier}
                onClick={() => setSelectedCarrier(carrier)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCarrier === carrier
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {carrier === "All" ? "All" : carrier}
              </button>
            ))}
          </div>

          <div className="inline-flex self-start rounded-xl bg-slate-100 p-1 text-sm font-medium md:self-auto">
            <button
              onClick={() => setIsFresh(false)}
              className={`rounded-lg px-3 py-1.5 transition-colors ${
                !isFresh ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
              }`}
            >
              Clean screened IP
            </button>
            <button
              onClick={() => setIsFresh(true)}
              className={`rounded-lg px-3 py-1.5 transition-colors ${
                isFresh ? "bg-white text-slate-900 shadow-sm" : "text-slate-600"
              }`}
            >
              Virgin IP
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">
                Choose a plan
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                All plans include full administrator access and a dedicated
                IPv4 address.
              </p>
            </div>

            <div className="inline-flex self-start rounded-xl bg-slate-200/70 p-1 text-sm font-medium">
              {CYCLES.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setBillingCycle(item.id)}
                  className={`rounded-lg px-3 py-1.5 transition-colors ${
                    billingCycle === item.id
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                  {item.discount > 0 && (
                    <span className="ml-1.5 text-xs text-emerald-700">
                      −{item.discount * 100}%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {plans.map((plan) => {
              const listPrice = isFresh ? plan.priceFreshBdt : plan.priceBdt;
              const monthly = Math.round(listPrice * (1 - cycle.discount));
              const total = monthly * cycle.months;
              const featured = plan.tier === "pro";

              return (
                <article
                  key={plan.id}
                  className={`flex flex-col rounded-2xl border bg-white p-6 ${
                    featured
                      ? "border-blue-600 shadow-lg shadow-blue-600/5"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-slate-900">
                      {plan.name}
                    </h3>
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      {plan.stockCount} in stock
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-slate-600">{plan.tagline}</p>

                  <div className="mt-5 border-y border-slate-100 py-4">
                    <p className="font-display text-3xl font-extrabold tracking-tight text-slate-900">
                      {formatPrice(monthly)}
                      <span className="text-sm font-normal text-slate-500">
                        {" "}
                        /mo
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {cycle.months === 1
                        ? "Billed monthly, cancel anytime"
                        : `Billed ${formatPrice(total)} every ${cycle.months} months`}
                    </p>
                  </div>

                  <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    {[
                      ["CPU", `${plan.specs.vcpu} vCPU`],
                      ["RAM", `${plan.specs.ram} GB`],
                      ["NVMe", `${plan.specs.nvme} GB`],
                      ["Port", plan.specs.bandwidth],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-xs text-slate-500">{label}</dt>
                        <dd className="font-medium text-slate-900">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    <li className="flex items-center gap-2">
                      <Check size={15} className="text-emerald-600" />
                      Pre-hardened {plan.os}
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={15} className="text-emerald-600" />
                      Static {selectedCarrier === "All" ? "ISP" : selectedCarrier} IP
                    </li>
                  </ul>

                  <button
                    onClick={() => setActivePlan(plan)}
                    className={`mt-6 w-full ${
                      featured ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    Deploy this plan
                    <ArrowRight size={15} />
                  </button>
                </article>
              );
            })}
          </div>

          <p className="mt-8 text-sm text-slate-600">
            Need 10 or more servers?{" "}
            <Link
              href="/resellers"
              className="font-semibold text-blue-700 hover:underline"
            >
              See volume pricing
            </Link>
            .
          </p>
        </div>
      </section>

      <CheckoutDrawer
        plan={activePlan}
        carrier={selectedCarrier}
        isFresh={isFresh}
        initialBillingCycle={billingCycle}
        onClose={() => setActivePlan(null)}
      />
    </div>
  );
}
