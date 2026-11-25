"use client";

import {
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";

interface IpSwapModalProps {
  open: boolean;
  onClose: () => void;
  currentIp: string;
  carrier: string;
  isFreeEligible: boolean;
  daysRemaining: number;
  onConfirmSwap: (reason: string) => void;
}

const SWAP_REASONS = [
  "IPQS / Fraud Score বেড়ে গেছে",
  "নির্দিষ্ট প্ল্যাটফর্ম বা ওয়েবসাইটে ব্লক দেখাচ্ছে",
  "অন্য স্টেট বা নতুন ক্লিন IP প্রয়োজন",
  "অন্যান্য টেকনিক্যাল কারণ",
];

export function IpSwapModal({
  open,
  onClose,
  currentIp,
  carrier,
  isFreeEligible,
  daysRemaining,
  onConfirmSwap,
}: IpSwapModalProps) {
  const [reason, setReason] = useState(SWAP_REASONS[0]);
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    onConfirmSwap(reason);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ip-swap-title"
    >
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
              <RefreshCw size={18} />
            </span>
            <div>
              <h2
                id="ip-swap-title"
                className="font-display text-lg font-extrabold text-slate-900"
              >
                রেসিডেন্সিয়াল IP পরিবর্তন
              </h2>
              <p className="font-mono text-xs text-slate-500">
                বর্তমান IP: {currentIp} ({carrier})
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="cursor-pointer rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Policy Status Banner */}
        {isFreeEligible ? (
          <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-xs">
            <ShieldCheck
              size={16}
              className="mt-0.5 shrink-0 text-emerald-600"
            />
            <div>
              <p className="font-bold text-emerald-900">
                ফ্রি IP Swap প্রযোজ্য (আরও {daysRemaining} দিন বাকি)
              </p>
              <p className="mt-0.5 leading-relaxed text-emerald-800">
                প্রথম ৭ দিনের গ্যারান্টি আওতায় আপনি বিনামূল্যে ১টি ক্লিন{" "}
                {carrier} IP পাবেন।
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs">
            <AlertTriangle
              size={16}
              className="mt-0.5 shrink-0 text-amber-600"
            />
            <div>
              <p className="font-bold text-amber-900">
                পেইড IP রিপ্লেসমেন্ট — ৳৩৫০
              </p>
              <p className="mt-0.5 leading-relaxed text-amber-800">
                ৭-দিনের ফ্রি উইন্ডো শেষ হওয়ায় নতুন ক্লিন IP অ্যাসাইন করতে{" "}
                <strong>৳৩৫০</strong> ইনভয়েস তৈরি হবে।
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="swap-reason"
              className="mb-1.5 block text-xs font-bold text-slate-800"
            >
              IP পরিবর্তনের কারণ নির্বাচন করুন
            </label>
            <select
              id="swap-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="field text-xs sm:text-sm"
            >
              {SWAP_REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline px-4 py-2.5 text-xs"
            >
              বাতিল করুন
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 disabled:opacity-60"
            >
              <CheckCircle2 size={14} />
              <span>
                {submitting
                  ? "প্রসেস হচ্ছে…"
                  : isFreeEligible
                    ? "ফ্রি IP Swap কনফার্ম করুন"
                    : "৳৩৫০ ইনভয়েস তৈরি করুন"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}