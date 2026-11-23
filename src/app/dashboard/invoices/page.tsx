import { StatusPill } from "@/components/dashboard/StatusPill";
import { demoAccount, usd } from "@/lib/data/client-demo";
import { CreditCard, Wallet } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoices & Billing",
  description: "Invoice history, renewals and account credit.",
  robots: { index: false, follow: false },
};

export default function DashboardInvoicesPage() {
  const paidTotal = demoAccount.invoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((total, invoice) => total + invoice.amountUsd, 0);

  const dueTotal = demoAccount.invoices
    .filter((invoice) => invoice.status === "due")
    .reduce((total, invoice) => total + invoice.amountUsd, 0);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Paid (last 12 months)
          </p>
          <p className="mt-1.5 font-display text-2xl font-bold text-slate-900">
            {usd(paidTotal)}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Due now
          </p>
          <p className="mt-1.5 font-display text-2xl font-bold text-slate-900">
            {usd(dueTotal)}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            {dueTotal > 0
              ? `Auto-charges ${demoAccount.nextInvoiceDue}`
              : "Nothing outstanding"}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Account credit
          </p>
          <p className="mt-1.5 font-display text-2xl font-bold text-slate-900">
            {usd(demoAccount.creditUsd)}
          </p>
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="font-semibold text-slate-900">Invoice history</h2>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
            <CreditCard size={14} aria-hidden="true" />
            Visa ending 4242
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-slate-50 text-[11px] tracking-wide text-slate-500 uppercase">
              <tr>
                <th scope="col" className="px-5 py-2.5 font-semibold">
                  Invoice
                </th>
                <th scope="col" className="px-5 py-2.5 font-semibold">
                  Issued
                </th>
                <th scope="col" className="px-5 py-2.5 font-semibold">
                  Description
                </th>
                <th scope="col" className="px-5 py-2.5 text-right font-semibold">
                  Amount
                </th>
                <th scope="col" className="px-5 py-2.5 font-semibold">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {demoAccount.invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-5 py-3 font-mono text-xs font-semibold text-slate-900">
                    {invoice.id}
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {invoice.issuedOn}
                  </td>
                  <td className="px-5 py-3 text-slate-600">
                    {invoice.description}
                  </td>
                  <td className="px-5 py-3 text-right font-semibold text-slate-900">
                    {usd(invoice.amountUsd)}
                  </td>
                  <td className="px-5 py-3">
                    <StatusPill
                      tone={invoice.status === "paid" ? "green" : "amber"}
                    >
                      {invoice.status === "paid" ? "Paid" : "Due"}
                    </StatusPill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="flex items-start gap-2 rounded-2xl border border-blue-100 bg-blue-50/60 px-4 py-3 text-xs leading-5 text-blue-900">
        <Wallet size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
        Payments are handled by our billing desk while this workspace is in
        demo mode. Email support@primavps.com to settle or change a payment
        method.
      </p>
    </div>
  );
}
