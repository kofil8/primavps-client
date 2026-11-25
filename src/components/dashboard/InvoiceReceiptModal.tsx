"use client";

import { useCurrency } from "@/lib/currency";
import { CheckCircle2, Printer, X } from "lucide-react";

export interface ReceiptInvoice {
  id: string;
  item: string;
  amountBdt: number;
  date: string;
  status: "paid" | "unpaid" | "overdue";
  method?: string;
}

interface InvoiceReceiptModalProps {
  invoice: ReceiptInvoice | null;
  onClose: () => void;
}

export function InvoiceReceiptModal({
  invoice,
  onClose,
}: InvoiceReceiptModalProps) {
  const { formatPrice } = useCurrency();
  if (!invoice) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="receipt-title"
    >
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <p className="font-display text-lg font-black text-slate-900">
              prima<span className="text-blue-600">vps</span>
            </p>
            <p className="font-mono text-xs text-slate-500">
              Invoice #{invoice.id}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close receipt"
            className="cursor-pointer rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <h2 id="receipt-title" className="text-sm font-bold text-slate-900">
            পেমেন্ট রসিদ (Receipt)
          </h2>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
              invoice.status === "paid"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700"
            }`}
          >
            <CheckCircle2 size={12} />
            {invoice.status.toUpperCase()}
          </span>
        </div>

        <dl className="mt-4 space-y-2.5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-xs">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">সার্ভিস</dt>
            <dd className="text-right font-bold text-slate-900">
              {invoice.item}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">তারিখ</dt>
            <dd className="font-semibold text-slate-800">{invoice.date}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-500">পেমেন্ট মাধ্যম</dt>
            <dd className="font-semibold text-slate-800">
              {invoice.method || "bKash Merchant"}
            </dd>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2.5 text-sm">
            <dt className="font-bold text-slate-900">মোট পরিশোধ</dt>
            <dd className="font-display font-black text-slate-900">
              {formatPrice(invoice.amountBdt)}
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-outline inline-flex items-center gap-1.5 px-4 py-2 text-xs"
          >
            <Printer size={14} />
            <span>প্রিন্ট / PDF</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
}