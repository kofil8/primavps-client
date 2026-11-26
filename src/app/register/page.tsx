"use client";

import { TurnstileWidget } from "@/components/auth/TurnstileWidget";
import { FocusedHeader } from "@/components/layout/FocusedHeader";
import {
  evaluatePasswordStrength,
  registerSchema,
  type RegisterFormValues,
} from "@/lib/validation/auth";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Check,
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
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

type FieldErrors = Partial<Record<keyof RegisterFormValues, string>>;
type PortalMode = "client" | "reseller";

function getSafeNextPath(nextParam: string | null): string | null {
  if (nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")) {
    return nextParam;
  }
  return null;
}

function RegisterFormContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const nextParam = searchParams.get("next");
  const roleParam = searchParams.get("role");
  const tierParam = searchParams.get("tier");
  const safeNext = getSafeNextPath(nextParam);

  const deriveModeFromParams = (): PortalMode => {
    if (roleParam?.toLowerCase() === "client") return "client";
    if (
      roleParam?.toLowerCase() === "reseller" ||
      safeNext?.startsWith("/reseller-portal") ||
      Boolean(tierParam)
    ) {
      return "reseller";
    }
    return "client";
  };

  const [portalMode, setPortalMode] = useState<PortalMode>(deriveModeFromParams);
  const [prevRoleKey, setPrevRoleKey] = useState(
    `${roleParam ?? ""}|${nextParam ?? ""}|${tierParam ?? ""}`,
  );
  const currentRoleKey = `${roleParam ?? ""}|${nextParam ?? ""}|${tierParam ?? ""}`;
  if (prevRoleKey !== currentRoleKey) {
    setPrevRoleKey(currentRoleKey);
    setPortalMode(deriveModeFromParams());
  }

  const [agencyName, setAgencyName] = useState("");
  const [values, setValues] = useState<RegisterFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
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

  const strength = useMemo(
    () => evaluatePasswordStrength(values.password),
    [values.password],
  );

  const passwordsMatch =
    values.confirmPassword.length > 0 &&
    values.password === values.confirmPassword;

  const loginHref = useMemo(() => {
    const params = new URLSearchParams();
    params.set("role", isReseller ? "reseller" : "client");

    if (safeNext) {
      params.set("next", safeNext);
    } else if (isReseller) {
      params.set("next", "/reseller-portal");
    }

    return `/login?${params.toString()}`;
  }, [isReseller, safeNext]);

  const updateField = <K extends keyof RegisterFormValues>(
    field: K,
    val: RegisterFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (formError) setFormError(null);
  };

  const resetCaptcha = () => {
    setTurnstileToken(null);
    setTurnstileResetKey((prev) => prev + 1);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const parsed = registerSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof RegisterFormValues | undefined;
        if (key && !nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      }
      setFieldErrors(nextErrors);
      return;
    }

    if (!turnstileToken) {
      setFormError("Please complete the security verification.");
      return;
    }

    setLoading(true);
    try {
      const { firstName, lastName, email, phone, password } = parsed.data;

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          name: `${firstName} ${lastName}`,
          email,
          phone,
          password,
          role: isReseller ? "RESELLER" : "USER",
          agencyName: isReseller ? agencyName.trim() || undefined : undefined,
          requestedTier: isReseller ? tierParam || undefined : undefined,
          turnstileToken,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setFormError(
          data.error || "Could not create your account. Please try again.",
        );
        resetCaptcha();
        return;
      }

      const destination =
        safeNext ?? (isReseller ? "/reseller-portal" : "/dashboard");

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
          prompt: "Already have an account?",
          label: "Sign in",
          href: loginHref,
        }}
      />

      <main className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-7xl items-start justify-center px-3.5 py-5 pb-[max(2rem,env(safe-area-inset-bottom))] sm:items-center sm:px-6 sm:py-8">
        <div className="w-full max-w-[500px] rounded-2xl border border-slate-200/90 bg-white p-4.5 shadow-sm sm:rounded-3xl sm:p-7">
          {/* Account Type Switcher */}
          <div
            role="tablist"
            aria-label="Account type"
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
              <span>Personal / Client</span>
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
            {isReseller && tierParam && (
              <span className="mb-1.5 inline-flex rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700">
                Selected Tier: {tierParam.toUpperCase()}
              </span>
            )}
            <h1 className="font-display text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              {isReseller ? "Create a reseller account" : "Create an account"}
            </h1>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
              {isReseller
                ? "Unlock 10%–20% wholesale rates, prepaid wallet & bulk VM deploy."
                : "Your first server can be online in 90 seconds."}
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

          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-3.5">
            {/* Optional Agency Name (Reseller mode only) */}
            {isReseller && (
              <div>
                <label
                  htmlFor="agencyName"
                  className="mb-1 block text-xs font-bold text-slate-800"
                >
                  Agency / Brand Name{" "}
                  <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <div className="relative">
                  <Building2
                    size={15}
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="agencyName"
                    name="agencyName"
                    type="text"
                    disabled={loading}
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    placeholder="e.g. Dhaka Cloud Agency"
                    className={`${inputBase} pl-9`}
                  />
                </div>
              </div>
            )}

            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-1 block text-xs font-bold text-slate-800"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User
                    size={15}
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    disabled={loading}
                    value={values.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    placeholder="Asif"
                    className={`${inputBase} pl-9 ${
                      fieldErrors.firstName
                        ? "!border-red-400 focus:!border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {fieldErrors.firstName && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600">
                    <AlertCircle size={12} className="shrink-0" />
                    <span>{fieldErrors.firstName}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="mb-1 block text-xs font-bold text-slate-800"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User
                    size={15}
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    disabled={loading}
                    value={values.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    placeholder="Mahmud"
                    className={`${inputBase} pl-9 ${
                      fieldErrors.lastName
                        ? "!border-red-400 focus:!border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {fieldErrors.lastName && (
                  <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600">
                    <AlertCircle size={12} className="shrink-0" />
                    <span>{fieldErrors.lastName}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
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
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={loading}
                  value={values.email}
                  onChange={(e) => updateField("email", e.target.value)}
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

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone"
                className="mb-1 block text-xs font-bold text-slate-800"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div
                className={`rounded-xl border bg-white transition-colors focus-within:ring-2 ${
                  fieldErrors.phone
                    ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500/15"
                    : isReseller
                      ? "border-slate-300 focus-within:border-indigo-600 focus-within:ring-indigo-600/15"
                      : "border-slate-300 focus-within:border-blue-600 focus-within:ring-blue-600/15"
                }`}
              >
                <PhoneInput
                  defaultCountry="bd"
                  value={values.phone}
                  disabled={loading}
                  onChange={(val) => updateField("phone", val)}
                  inputProps={{
                    id: "phone",
                    name: "phone",
                    required: true,
                    autoComplete: "tel",
                    placeholder: "1712 345678",
                  }}
                  className="w-full"
                  inputClassName="!h-11 sm:!h-10 !w-full !border-0 !bg-transparent !text-base sm:!text-sm !text-slate-900 !outline-none !ring-0"
                  countrySelectorStyleProps={{
                    buttonClassName:
                      "!h-11 sm:!h-10 !border-0 !border-r !border-slate-200 !bg-transparent !px-2.5 sm:!px-3 !rounded-l-xl hover:!bg-slate-50",
                    dropdownStyleProps: {
                      className:
                        "!z-50 !max-w-[calc(100vw-2.5rem)] !rounded-xl !border-slate-200 !shadow-lg",
                    },
                  }}
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Used for account verification and WhatsApp support updates.
              </p>
              {fieldErrors.phone && (
                <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600">
                  <AlertCircle size={12} className="shrink-0" />
                  <span>{fieldErrors.phone}</span>
                </p>
              )}
            </div>

            {/* Password & Confirm Password */}
            <div className="space-y-2.5">
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1 block text-xs font-bold text-slate-800"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock
                      size={15}
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      disabled={loading}
                      value={values.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      placeholder="8+ characters"
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
                      className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
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

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-1 block text-xs font-bold text-slate-800"
                  >
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock
                      size={15}
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      disabled={loading}
                      value={values.confirmPassword}
                      onChange={(e) =>
                        updateField("confirmPassword", e.target.value)
                      }
                      placeholder="Re-enter password"
                      className={`${inputBase} pr-10 pl-9 ${
                        fieldErrors.confirmPassword
                          ? "!border-red-400 focus:!border-red-500"
                          : passwordsMatch
                            ? "!border-emerald-400 focus:!border-emerald-500"
                            : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      disabled={loading}
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={15} />
                      ) : (
                        <Eye size={15} />
                      )}
                    </button>
                  </div>
                  {passwordsMatch && !fieldErrors.confirmPassword && (
                    <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                      <Check size={12} className="shrink-0" />
                      <span>Passwords match</span>
                    </p>
                  )}
                  {fieldErrors.confirmPassword && (
                    <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600">
                      <AlertCircle size={12} className="shrink-0" />
                      <span>{fieldErrors.confirmPassword}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Password Strength Meter */}
              {values.password.length > 0 && (
                <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="grid flex-1 grid-cols-4 gap-1.5">
                      {[1, 2, 3, 4].map((step) => (
                        <span
                          key={step}
                          className={`h-1.5 rounded-full transition-colors ${
                            strength.score >= step
                              ? strength.barColor
                              : "bg-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span
                      className={`text-[11px] font-bold ${strength.textColor}`}
                    >
                      {strength.label}
                    </span>
                  </div>

                  <ul className="mt-2 grid grid-cols-1 gap-x-3 gap-y-1 text-[11px] min-[360px]:grid-cols-2">
                    {[
                      { ok: strength.checks.length, text: "8+ characters" },
                      {
                        ok: strength.checks.upper && strength.checks.lower,
                        text: "Upper & lowercase",
                      },
                      { ok: strength.checks.number, text: "At least 1 number" },
                      { ok: strength.checks.special, text: "1 special symbol" },
                    ].map((rule) => (
                      <li
                        key={rule.text}
                        className={`flex items-center gap-1 ${
                          rule.ok
                            ? "font-semibold text-emerald-700"
                            : "text-slate-500"
                        }`}
                      >
                        <Check
                          size={11}
                          className={
                            rule.ok ? "text-emerald-600" : "text-slate-300"
                          }
                        />
                        <span>{rule.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

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
                  <span>Creating account…</span>
                </>
              ) : (
                <>
                  <span>
                    {isReseller
                      ? "Create reseller account"
                      : "Create account"}
                  </span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-slate-500 sm:text-xs">
              By signing up you agree to our{" "}
              <Link href="/terms" className={accentLinkClass}>
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className={accentLinkClass}>
                Privacy Policy
              </Link>
              .
            </p>
          </form>

          <p className="mt-4 border-t border-slate-100 pt-3.5 text-center text-xs text-slate-600 sm:text-sm">
            Already have an account?{" "}
            <Link href={loginHref} className={accentLinkClass}>
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-slate-50 text-sm text-slate-500">
          Loading…
        </div>
      }
    >
      <RegisterFormContent />
    </Suspense>
  );
}
