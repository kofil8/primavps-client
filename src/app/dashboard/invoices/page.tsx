"use client";

import {
  InvoiceReceiptModal,
  ReceiptInvoice,
} from "@/components/dashboard/InvoiceReceiptModal";
import { StatusPill } from "@/components/dashboard/StatusPill";
import { useCurrency } from "@/lib/currency";
import { getStoredInvoices } from "@/lib/services/portal-store";
import { FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardInvoicesPage() {
  const { formatPrice } = useCurrency();
  const [invoices] = useState(getStoredInvoices);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptInvoice | null>(
    null,
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
          ইনভয়েস ও পেমেন্ট হিস্ট্রি
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          বকেয়া ইনভয়েস পরিশোধ করুন অথবা পূর্বের পেমেন্টের রসিদ ডাউনলোড করুন।
        </p>
      </div>

      {/* Mobile Card List (<640px) */}
      <div className="space-y-3 sm:hidden">
        {invoices.map((inv) => (
          <div
            key={inv.id}
            className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-mono text-xs font-bold text-slate-900">
                  {inv.id}
                </p>
                <p className="mt-0.5 text-xs font-medium text-slate-800">
                  {inv.item}
                </p>
              </div>
              <StatusPill status={inv.status} />
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
              <div>
                <p className="font-mono text-sm font-bold tabular-nums text-slate-900">
                  {formatPrice(inv.amountBdt)}
                </p>
                <p className="text-[11px] text-slate-500">{inv.date}</p>
              </div>
              {inv.status === "unpaid" || inv.status === "overdue" ? (
                <Link
                  href={`/checkout?invoice=${inv.id}`}
                  className="inline-flex items-center rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700"
                >
                  Pay Now
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setSelectedReceipt({
                      id: inv.id,
                      item: inv.item,
                      amountBdt: inv.amountBdt,
                      date: inv.date,
                      status: inv.status,
                    })
                  }
                  className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  <FileText size={13} />
                  <span>রসিদ</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Responsive Table (sm+) */}
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xs sm:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3.5">Invoice #</th>
                <th className="px-5 py-3.5">সার্ভিস</th>
                <th className="px-5 py-3.5">তারিখ</th>
                <th className="px-5 py-3.5">পরিমাণ</th>
                <th className="px-5 py-3.5">স্ট্যাটাস</th>
                <th className="px-5 py-3.5 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50">
                  <td className="px-5 py-4 font-mono font-bold text-slate-900">
                    {inv.id}
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-800">
                    {inv.item}
                  </td>
                  <td className="px-5 py-4 text-slate-500">{inv.date}</td>
                  <td className="px-5 py-4 font-mono font-bold tabular-nums text-slate-900">
                    {formatPrice(inv.amountBdt)}
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill status={inv.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    {inv.status === "unpaid" || inv.status === "overdue" ? (
                      <Link
                        href={`/checkout?invoice=${inv.id}`}
                        className="inline-flex items-center rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-blue-700"
                      >
                        Pay Now
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedReceipt({
                            id: inv.id,
                            item: inv.item,
                            amountBdt: inv.amountBdt,
                            date: inv.date,
                            status: inv.status,
                          })
                        }
                        className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                      >
                        <FileText size={13} />
                        <span>রসিদ</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InvoiceReceiptModal
        invoice={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
      />
    </div>
  );
}