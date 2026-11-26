"use client";

import { TurnstileWidget } from "@/components/auth/TurnstileWidget";
import { FocusedHeader } from "@/components/layout/FocusedHeader";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFieldErrors = Partial<Record<"email" | "password", string>>;
type PortalMode = "client" | "reseller";

function getSafeNextPath(nextParam: string | null): string | null {
  if (nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")) {
    return nextParam;
  }
  return null;
}

function LoginFormContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const nextParam = searchParams.get("next");
  const roleParam = searchParams.get("role");
  const safeNext = getSafeNextPath(nextParam);

  const deriveModeFromParams = (): PortalMode => {
    if (roleParam?.toLowerCase() === "client") return "client";
    if (
      roleParam?.toLowerCase() === "reseller" ||
      safeNext?.startsWith("/reseller-portal")
    ) {
      return "reseller";
    }
    return "client";
  };

  const [portalMode, setPortalMode] = useState<PortalMode>(deriveModeFromParams);
  const [prevRoleKey, setPrevRoleKey] = useState(`${roleParam ?? ""}|${nextParam ?? ""}`);
  const currentRoleKey = `${roleParam ?? ""}|${nextParam ?? ""}`;
  if (prevRoleKey !== currentRoleKey) {
    setPrevRoleKey(currentRoleKey);
    setPortalMode(deriveModeFromParams());
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isReseller = portalMode === "reseller";

  const handlePortalSwitch = (mode: PortalMode) => {
    if (mode === portalMode) return;
    setPortalMode(mode);
    setFormError(null);

    const params = new URLSearchParams(searchParams.toString());
    params.set("role", mode);

    if (mode === "reseller" && safeNext === "/dashboard") {
      params.delete("next");
    } else if (mode === "client" && safeNext?.startsWith("/reseller-portal")) {
      params.delete("next");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const registerHref = useMemo(() => {
    const params = new URLSearchParams();
    params.set("role", isReseller ? "reseller" : "client");

    if (isReseller) {
      const targetNext =
        safeNext && safeNext.startsWith("/reseller-portal")
          ? safeNext
          : "/reseller-portal";
      params.set("next", targetNext);
    } else if (safeNext && !safeNext.startsWith("/reseller-portal")) {
      params.set("next", safeNext);
    }

    return `/register?${params.toString()}`;
  }, [isReseller, safeNext]);

  const resetCaptcha = () => {
    setTurnstileToken(null);
    setTurnstileResetKey((prev) => prev + 1);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      const nextErrors: LoginFieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as "email" | "password" | undefined;
        if (key && !nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      }
      setFieldErrors(nextErrors);
      return;
    }

    if (!turnstileToken) {
      setFormError(
        "Please complete the security verification before signing in.",
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: parsed.data.email,
          password: parsed.data.password,
          rememberMe,
          portalMode,
          turnstileToken,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setFormError(
          data.error || "Invalid email or password. Please try again.",
        );
        resetCaptcha();
        return;
      }

      const role = data.user?.role as string | undefined;
      const destination =
        safeNext ??
        (role === "ADMIN" || role === "SUPER_ADMIN" || role === "SUPPORT"
          ? "/admin"
          : role === "RESELLER" || isReseller
            ? "/reseller-portal"
            : "/dashboard");

      router.push(destination);
      router.refresh();
    } catch {
      setFormError("Network error. Please check your connection and try again.");
      resetCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const accentLinkClass = isReseller
    ? "font-semibold text-indigo-700 hover:text-indigo-800 hover:underline"
    : "font-semibold text-blue-700 hover:text-blue-800 hover:underline";

  const focusRingClass = isReseller
    ? "focus:!border-indigo-600 focus:!ring-indigo-600/15"
    : "focus:!border-blue-600 focus:!ring-blue-600/15";

  const inputBase = `field !h-11 sm:!h-10 w-full !rounded-xl text-base sm:text-sm disabled:opacity-60 transition-colors ${focusRingClass}`;

  return (
    <div className="min-h-dvh bg-slate-50">
      <FocusedHeader
        backHref={isReseller ? "/resellers" : "/"}
        backLabel={isReseller ? "Reseller program" : "Back to home"}
        supportLabel="Support"
        authAction={{
          prompt: "New to Primavps?",
          label: "Create account",
          href: registerHref,
        }}
      />

      <main className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-7xl items-start justify-center px-3.5 py-6 pb-[max(2rem,env(safe-area-inset-bottom))] sm:items-center sm:px-6 sm:py-10">
        <div className="w-full max-w-md rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-8">
          {/* Portal Switcher: Client vs Reseller */}
          <div
            role="tablist"
            aria-label="Account portal type"
            className="mb-5 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1 text-xs font-bold"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!isReseller}
              onClick={() => handlePortalSwitch("client")}
              className={`inline-flex min-h-[38px] cursor-pointer items-center justify-center gap-1.5 rounded-lg px-2 py-2 whitespace-nowrap transition-all ${
                !isReseller
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <User size={14} className="shrink-0" />
              <span>Client Portal</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isReseller}
              onClick={() => handlePortalSwitch("reseller")}
              className={`inline-flex min-h-[38px] cursor-pointer items-center justify-center gap-1.5 rounded-lg px-2 py-2 whitespace-nowrap transition-all ${
                isReseller
                  ? "bg-white text-indigo-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building2 size={14} className="shrink-0" />
              <span>Reseller Partner</span>
            </button>
          </div>

          <div>
            <h1 className="font-display text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              {isReseller
                ? "Sign in to Reseller Portal"
                : "Sign in to your account"}
            </h1>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
              {isReseller
                ? "Manage your agency wallet, sub-clients, and bulk VM fleet."
                : "Manage your servers, residential IPs, and invoices."}
            </p>
          </div>

          {formError && (
            <div
              role="alert"
              className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700"
            >
              <AlertCircle size={15} className="mt-0.5 shrink-0 text-red-600" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="mb-1 block text-xs font-bold text-slate-800"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) {
                      setFieldErrors((prev) => ({ ...prev, email: undefined }));
                    }
                    if (formError) setFormError(null);
                  }}
                  placeholder="you@company.com"
                  className={`${inputBase} pl-9 ${
                    fieldErrors.email
                      ? "!border-red-400 focus:!border-red-500"
                      : ""
                  }`}
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600">
                  <AlertCircle size={12} className="shrink-0" />
                  <span>{fieldErrors.email}</span>
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="mb-1 flex items-center justify-between gap-2">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-bold text-slate-800"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <Link
                  href="/forgot-password"
                  className={`text-xs ${accentLinkClass}`}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={15}
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  disabled={loading}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) {
                      setFieldErrors((prev) => ({
                        ...prev,
                        password: undefined,
                      }));
                    }
                    if (formError) setFormError(null);
                  }}
                  placeholder="Enter your password"
                  className={`${inputBase} pr-10 pl-9 ${
                    fieldErrors.password
                      ? "!border-red-400 focus:!border-red-500"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={loading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600">
                  <AlertCircle size={12} className="shrink-0" />
                  <span>{fieldErrors.password}</span>
                </p>
              )}
            </div>

            {/* Remember Me */}
            <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-600 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
                className={`size-3.5 rounded border-slate-300 ${
                  isReseller
                    ? "text-indigo-600 focus:ring-indigo-500"
                    : "text-blue-600 focus:ring-blue-500"
                }`}
              />
              <span>Remember me for 30 days</span>
            </label>

            {/* Turnstile */}
            <div className="flex justify-center overflow-hidden pt-0.5">
              <div className="origin-center max-[370px]:scale-[0.86]">
                <TurnstileWidget
                  resetKey={turnstileResetKey}
                  onVerify={(token) => {
                    setTurnstileToken(token);
                    if (formError) setFormError(null);
                  }}
                  onExpire={() => setTurnstileToken(null)}
                  onError={() => {
                    setTurnstileToken(null);
                    setFormError("Security check failed to load. Please refresh.");
                  }}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold text-white shadow-sm transition-all active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 ${
                isReseller
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Signing in…</span>
                </>
              ) : (
                <>
                  <span>
                    {isReseller ? "Sign in as Reseller" : "Sign in"}
                  </span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <p className="mt-5 border-t border-slate-100 pt-4 text-center text-xs text-slate-600 sm:text-sm">
            Don&apos;t have an account?{" "}
            <Link href={registerHref} className={accentLinkClass}>
              Create an account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-slate-50 text-sm text-slate-500">
          Loading…
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
