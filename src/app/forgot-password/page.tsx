"use client";

import { FocusedHeader } from "@/components/layout/FocusedHeader";
import { ArrowLeft, CheckCircle2, KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@")) {
      setError("সঠিক ইমেইল ঠিকানা লিখুন।");
      return;
    }

    setLoading(true);
    // UI-first simulation (will connect to POST /api/v1/auth/forgot-password)
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <FocusedHeader backHref="/login" backLabel="লগইনে ফিরে যান" />

      <main className="shell flex min-h-[calc(100vh-3.75rem)] items-center justify-center py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
          {!submitted ? (
            <>
              <div className="grid size-11 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <KeyRound size={20} />
              </div>

              <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-slate-900">
                পাসওয়ার্ড রিসেট করুন
              </h1>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                আপনার অ্যাকাউন্টের ইমেইল দিন—আমরা পাসওয়ার্ড পরিবর্তনের একটি
                সিকিউর লিংক পাঠিয়ে দেব।
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="reset-email"
                    className="mb-1.5 block text-xs font-bold text-slate-800"
                  >
                    ইমেইল ঠিকানা
                  </label>
                  <div className="relative">
                    <Mail
                      size={15}
                      className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="reset-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="field pl-10 text-sm"
                    />
                  </div>
                </div>

                {error && (
                  <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-60"
                >
                  {loading ? "লিংক পাঠানো হচ্ছে…" : "রিসেট লিংক পাঠান"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={24} />
              </div>
              <h2 className="mt-4 font-display text-xl font-extrabold text-slate-900">
                আপনার ইনবক্স চেক করুন
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                <strong className="text-slate-900">{email}</strong> ঠিকানায়
                পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে। ইনবক্সে না পেলে Spam ফোল্ডার
                চেক করুন।
              </p>

              <div className="mt-6 space-y-2.5">
                <Link
                  href="/reset-password?token=demo-reset-token"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-slate-800"
                >
                  ডেমো রিসেট পেজ প্রিভিউ দেখুন
                </Link>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="w-full cursor-pointer text-xs font-semibold text-blue-600 hover:underline"
                >
                  অন্য ইমেইল দিয়ে চেষ্টা করুন
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 border-t border-slate-100 pt-4 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600"
            >
              <ArrowLeft size={13} />
              <span>সাইন ইন পেজে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}