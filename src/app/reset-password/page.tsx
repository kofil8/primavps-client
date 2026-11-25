"use client";

import { FocusedHeader } from "@/components/layout/FocusedHeader";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("নতুন পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }
    if (password !== confirm) {
      setError("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    setLoading(true);
    // UI-first simulation (will connect to POST /api/v1/auth/reset-password)
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setDone(true);
    window.setTimeout(() => router.push("/login"), 1800);
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
      {!token ? (
        <div className="text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-red-50 text-red-600">
            <AlertCircle size={24} />
          </div>
          <h1 className="mt-4 font-display text-xl font-extrabold text-slate-900">
            রিসেট লিংকটি অবৈধ বা মেয়াদোত্তীর্ণ
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
            অনুগ্রহ করে আবার পাসওয়ার্ড রিসেটের অনুরোধ পাঠান।
          </p>
          <Link
            href="/forgot-password"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            নতুন রিসেট লিংক নিন
          </Link>
        </div>
      ) : done ? (
        <div className="text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 size={24} />
          </div>
          <h1 className="mt-4 font-display text-xl font-extrabold text-slate-900">
            পাসওয়ার্ড আপডেট হয়েছে
          </h1>
          <p className="mt-2 text-xs text-slate-600 sm:text-sm">
            আপনাকে লগইন পেজে নিয়ে যাওয়া হচ্ছে…
          </p>
        </div>
      ) : (
        <>
          <div className="grid size-11 place-items-center rounded-2xl bg-blue-50 text-blue-600">
            <Lock size={20} />
          </div>
          <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-slate-900">
            নতুন পাসওয়ার্ড সেট করুন
          </h1>
          <p className="mt-1.5 text-xs text-slate-600 sm:text-sm">
            আপনার অ্যাকাউন্টের নিরাপত্তার জন্য শক্তিশালী পাসওয়ার্ড দিন।
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="new-pass"
                className="mb-1.5 block text-xs font-bold text-slate-800"
              >
                নতুন পাসওয়ার্ড
              </label>
              <div className="relative">
                <input
                  id="new-pass"
                  type={showPass ? "text" : "password"}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className="field pr-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-700"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-pass"
                className="mb-1.5 block text-xs font-bold text-slate-800"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                id="confirm-pass"
                type={showPass ? "text" : "password"}
                required
                minLength={8}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="পুনরায় পাসওয়ার্ড লিখুন"
                className="field text-sm"
              />
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
              {loading ? "আপডেট হচ্ছে…" : "পাসওয়ার্ড সংরক্ষণ করুন"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <FocusedHeader backHref="/login" backLabel="লগইনে ফিরে যান" />
      <main className="shell flex min-h-[calc(100vh-3.75rem)] items-center justify-center py-12">
        <Suspense
          fallback={
            <div className="text-sm text-slate-500">লোড হচ্ছে…</div>
          }
        >
          <ResetPasswordContent />
        </Suspense>
      </main>
    </div>
  );
}