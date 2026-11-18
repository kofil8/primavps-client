"use client";

import { Check, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const TIERS = [
  {
    name: "Teams",
    quantity: "10–24 servers",
    discount: "10% off",
    perks: ["Shared carrier pool", "Single monthly invoice"],
  },
  {
    name: "Agencies",
    quantity: "25–49 servers",
    discount: "15% off",
    perks: ["Private /28 subnet", "API provisioning"],
  },
  {
    name: "Enterprise",
    quantity: "50+ servers",
    discount: "20% off",
    perks: ["Reserved carrier routes", "99.99% SLA contract"],
  },
];

export default function ResellersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    quantity: "10–25",
    message: "",
  });

  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="shell py-12 sm:py-14">
          <p className="eyebrow">Reseller program</p>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Better pricing, from ten servers up
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Recurring discounts, private subnets and one invoice for your team.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell space-y-10">
          <div className="grid gap-5 md:grid-cols-3">
            {TIERS.map((tier) => (
              <div key={tier.name} className="card p-6">
                <p className="text-sm font-semibold text-blue-700">
                  {tier.name}
                </p>
                <h2 className="mt-1 font-display text-xl font-bold text-slate-900">
                  {tier.quantity}
                </h2>
                <p className="mt-3 inline-block rounded-lg bg-blue-50 px-2.5 py-1 text-sm font-semibold text-blue-700">
                  {tier.discount}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <CheckCircle2
                        size={15}
                        className="mt-0.5 shrink-0 text-emerald-600"
                      />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="card mx-auto w-full max-w-xl p-6 sm:p-8">
            {submitted ? (
              <div className="py-8 text-center">
                <span className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <Check size={24} />
                </span>
                <h2 className="mt-4 font-display text-xl font-bold text-slate-900">
                  Request received
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  We&apos;ll email wholesale pricing within two business hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <h2 className="font-display text-lg font-bold text-slate-900">
                  Request pricing
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="rname" className="label mb-1.5">
                      Name
                    </label>
                    <input
                      id="rname"
                      type="text"
                      required
                      value={form.name}
                      onChange={(event) =>
                        setForm({ ...form, name: event.target.value })
                      }
                      className="field"
                    />
                  </div>
                  <div>
                    <label htmlFor="remail" className="label mb-1.5">
                      Email
                    </label>
                    <input
                      id="remail"
                      type="email"
                      required
                      value={form.email}
                      onChange={(event) =>
                        setForm({ ...form, email: event.target.value })
                      }
                      className="field"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="rqty" className="label mb-1.5">
                    Server count
                  </label>
                  <select
                    id="rqty"
                    value={form.quantity}
                    onChange={(event) =>
                      setForm({ ...form, quantity: event.target.value })
                    }
                    className="field"
                  >
                    <option>10–25</option>
                    <option>25–49</option>
                    <option>50+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="rmsg" className="label mb-1.5">
                    Anything else?
                  </label>
                  <textarea
                    id="rmsg"
                    rows={3}
                    value={form.message}
                    onChange={(event) =>
                      setForm({ ...form, message: event.target.value })
                    }
                    placeholder="Preferred carriers or locations"
                    className="field"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Request pricing
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
