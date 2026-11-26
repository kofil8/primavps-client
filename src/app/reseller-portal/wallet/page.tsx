"use client";

import { useCurrency } from "@/lib/currency";
import {
  DEFAULT_RESELLER_STATE,
  getResellerState,
  topUpResellerWallet,
} from "@/lib/services/reseller-store";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Plus,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PRESETS_BDT = [5000, 15000, 35000, 75000];
const METHODS = ["bKash Merchant", "Nagad", "SSLCommerz Card", "Bank Transfer"];

export default function ResellerWalletPage() {
  const { formatPrice } = useCurrency();
  const [state, setState] = useState(DEFAULT_RESELLER_STATE);
  const [amount, setAmount] = useState(15000);
  const [method, setMethod] = useState(METHODS[0]);

  useEffect(() => {
    const sync = () => setState(getResellerState());
    sync();
    window.addEventListener("reseller-store-updated", sync);
    return () => window.removeEventListener("reseller-store-updated", sync);
  }, []);

  const handleTopUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount < 1000) {
      toast.error("ন্যূনতম ১,০০০ টাকা টপ-আপ করতে হবে।");
      return;
    }
    topUpResellerWallet(amount, method);
    toast.success(`${formatPrice(amount)} সফলভাবে আপনার ওয়ালেটে যোগ হয়েছে!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
          প্রিপেইড ওয়ালেট ও লেনদেন লেজার
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          বিকাশ, নগদ বা ব্যাংক ট্রান্সফারে ব্যালেন্স অ্যাড করে ইনস্ট্যান্ট বাল্ক ডিপ্লয় করুন।
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.35fr]">
        {/* Left: Balance + Quick Top-Up Form */}
        <section className="space-y-5">
          <div className="rounded-2xl bg-slate-950 p-6 text-white shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>বর্তমান ওয়ালেট ব্যালেন্স</span>
              <Wallet size={18} className="text-indigo-400" />
            </div>
            <p className="mt-2 font-display text-3xl font-black tracking-tight">
              {formatPrice(state.walletBalanceBdt)}
            </p>
            <p className="mt-1.5 text-xs text-slate-400">
              নন-এক্সপায়ারিং এজেন্সি ক্রেডিট · জিরো গেটওয়ে চার্জ
            </p>
          </div>

          <form
            onSubmit={handleTopUp}
            className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs"
          >
            <h2 className="font-display text-sm font-extrabold text-slate-900 sm:text-base">
              ব্যালেন্স টপ-আপ করুন
            </h2>

            <div className="mt-3.5 grid grid-cols-2 gap-2">
              {PRESETS_BDT.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val)}
                  className={`cursor-pointer rounded-xl border py-2 font-mono text-xs font-bold transition-colors ${
                    amount === val
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {formatPrice(val)}
                </button>
              ))}
            </div>

            <div className="mt-4">
              <label className="mb-1 block text-xs font-bold text-slate-800">
                কাস্টম পরিমাণ (BDT)
              </label>
              <input
                type="number"
                min={1000}
                step={500}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="field !h-10 !rounded-xl font-mono text-sm"
              />
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-bold text-slate-800">
                পেমেন্ট মাধ্যম
              </label>
              <div className="grid grid-cols-2 gap-2">
                {METHODS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={`flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-colors ${
                      method === m
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <CreditCard size={13} />
                    <span className="truncate">{m}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700"
            >
              <Plus size={15} />
              <span>{formatPrice(amount)} টপ-আপ কনফার্ম করুন</span>
            </button>
          </form>
        </section>

        {/* Right: Transaction Ledger */}
        <section className="rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-display text-sm font-extrabold text-slate-900 sm:text-base">
              লেনদেন হিস্ট্রি ({state.transactions.length})
            </h2>
          </div>

          <ul className="divide-y divide-slate-100">
            {state.transactions.map((txn) => {
              const isCredit = txn.type === "credit" || txn.type === "refund";
              return (
                <li
                  key={txn.id}
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl ${
                        isCredit
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {isCredit ? (
                        <ArrowDownLeft size={15} />
                      ) : (
                        <ArrowUpRight size={15} />
                      )}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-900 sm:text-sm">
                        {txn.description}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {txn.id} · {txn.method} · {txn.date}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p
                      className={`font-mono text-xs font-extrabold sm:text-sm ${
                        isCredit ? "text-emerald-700" : "text-slate-900"
                      }`}
                    >
                      {isCredit ? "+" : "−"}
                      {formatPrice(txn.amountBdt)}
                    </p>
                    <p className="font-mono text-[11px] text-slate-400">
                      Bal: {formatPrice(txn.balanceAfterBdt)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}