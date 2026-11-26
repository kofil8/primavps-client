"use client";

import { TurnstileWidget } from "@/components/auth/TurnstileWidget";
import { BrandLogo } from "@/components/ui/BrandLogo";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldAlert,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParam = searchParams.get("next");
  const safeNext =
    nextParam && nextParam.startsWith("/admin") ? nextParam : "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!turnstileToken) {
      setError("Complete security verification first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          portalMode: "admin",
          turnstileToken,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Invalid administrator credentials.");
        setTurnstileToken(null);
        setResetKey((k) => k + 1);
        return;
      }

      router.push(safeNext);
      router.refresh();
    } catch {
      setError("Network error. Please retry.");
      setTurnstileToken(null);
      setResetKey((k) => k + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-slate-950 px-4 py-10 text-white">
      <div className="mb-6">
        <BrandLogo theme="dark" size="md" />
      </div>

      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl sm:p-7">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
          <ShieldAlert size={15} />
          <span>Internal Operations Console</span>
        </div>
        <h1 className="mt-2 font-display text-xl font-extrabold text-white">
          Admin Sign In
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Authorized Primavps staff only. All access is audit-logged.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300"
          >
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="admin-email"
              className="mb-1 block text-xs font-semibold text-slate-300"
            >
              Staff Email
            </label>
            <div className="relative">
              <Mail
                size={15}
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-500"
              />
              <input
                id="admin-email"
                type="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ops@primavps.com"
                className="h-10 w-full rounded-xl border border-white/15 bg-slate-950 pr-3 pl-9 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-pass"
              className="mb-1 block text-xs font-semibold text-slate-300"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={15}
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-500"
              />
              <input
                id="admin-pass"
                type={showPassword ? "text" : "password"}
                required
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="h-10 w-full rounded-xl border border-white/15 bg-slate-950 pr-10 pl-9 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label="Toggle password visibility"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div className="flex justify-center overflow-hidden">
            <div className="origin-center max-[360px]:scale-[0.88]">
              <TurnstileWidget
                resetKey={resetKey}
                onVerify={setTurnstileToken}
                onExpire={() => setTurnstileToken(null)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white hover:bg-blue-500 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>Verifying…</span>
              </>
            ) : (
              <span>Sign in to Admin</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginContent />
    </Suspense>
  );
}