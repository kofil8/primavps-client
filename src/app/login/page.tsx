"use client";

import {
  TURNSTILE_ENABLED,
  TurnstileWidget,
} from "@/components/auth/TurnstileWidget";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function getSafeNextPath(nextParam: string | null): string {
  if (nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")) {
    return nextParam;
  }
  return "/dashboard";
}

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = getSafeNextPath(searchParams.get("next"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const registerHref = searchParams.get("next")
    ? `/register?next=${encodeURIComponent(nextPath)}`
    : "/register";

  const resetCaptcha = () => {
    setTurnstileToken(null);
    setTurnstileResetKey((prev) => prev + 1);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (TURNSTILE_ENABLED && !turnstileToken) {
      setError("Please complete the security verification before signing in.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          password,
          rememberMe,
          turnstileToken,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Invalid email or password. Please try again.");
        resetCaptcha();
        return;
      }

      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Network error. Please check your connection and try again.");
      resetCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100dvh-10rem)] items-center justify-center bg-slate-50 px-4 py-12 sm:py-16">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900">
            Sign in
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage servers, IPs and invoices.
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700"
          >
            <AlertCircle size={15} className="mt-0.5 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="label mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
              />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={loading}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError(null);
                }}
                placeholder="you@company.com"
                className="field w-full pl-10 disabled:opacity-60"
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="label">
                Password
              </label>
              <Link
                href="/contact"
                className="text-sm font-medium text-blue-700 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
              />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                disabled={loading}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (error) setError(null);
                }}
                placeholder="••••••••"
                className="field w-full pr-10 pl-10 disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={loading}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-600 select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              disabled={loading}
              className="size-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Remember me for 30 days</span>
          </label>

          {/* Cloudflare Turnstile Bot Detection */}
          <div className="pt-1">
            <TurnstileWidget
              resetKey={turnstileResetKey}
              onVerify={(token) => {
                setTurnstileToken(token);
                if (error) setError(null);
              }}
              onExpire={() => setTurnstileToken(null)}
              onError={() => {
                setTurnstileToken(null);
                setError("Security check failed to load. Please refresh.");
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || (TURNSTILE_ENABLED && !turnstileToken)}
            className="btn-primary inline-flex w-full cursor-pointer items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>Signing in…</span>
              </>
            ) : (
              <>
                <span>Sign in</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 space-y-2 border-t border-slate-100 pt-4 text-center text-sm text-slate-600">
          <p>
            New here?{" "}
            <Link
              href={registerHref}
              className="font-semibold text-blue-700 hover:underline"
            >
              Create an account
            </Link>
          </p>
          <p className="text-xs text-slate-400">
            Need help?{" "}
            <a
              href="mailto:support@primavps.com"
              className="text-slate-600 hover:underline"
            >
              support@primavps.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 text-sm text-slate-500">
          Loading…
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
