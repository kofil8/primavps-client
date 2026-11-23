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
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

function getSafeNextPath(nextParam: string | null): string {
  if (nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")) {
    return nextParam;
  }
  return "/dashboard";
}

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

function RegisterFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = getSafeNextPath(searchParams.get("next"));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loginHref = searchParams.get("next")
    ? `/login?next=${encodeURIComponent(nextPath)}`
    : "/login";

  const clearFieldError = (field: keyof FieldErrors) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (formError) setFormError(null);
  };

  const resetCaptcha = () => {
    setTurnstileToken(null);
    setTurnstileResetKey((prev) => prev + 1);
  };

  const validate = (): boolean => {
    const errors: FieldErrors = {};
    const digitsOnly = phone.replace(/\D/g, "");

    if (!firstName.trim()) errors.firstName = "First name is required.";
    if (!lastName.trim()) errors.lastName = "Last name is required.";

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (digitsOnly.length < 8) {
      errors.phone = "Please enter a valid phone number.";
    }

    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }

    if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!validate()) return;

    if (TURNSTILE_ENABLED && !turnstileToken) {
      setFormError("Please complete the security verification.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          phone,
          password,
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

      router.push(nextPath);
      router.refresh();
    } catch {
      setFormError(
        "Network error. Please check your connection and try again.",
      );
      resetCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100dvh-10rem)] items-center justify-center bg-slate-50 px-4 py-10 sm:py-14">
      <div className="w-full max-w-md rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900">
            Create an account
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Your first server can be online in 90 seconds.
          </p>
        </div>

        {formError && (
          <div
            role="alert"
            className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700"
          >
            <AlertCircle size={15} className="mt-0.5 shrink-0 text-red-600" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="label mb-1.5">
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
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    clearFieldError("firstName");
                  }}
                  placeholder="Asif"
                  className={`field w-full pl-9 disabled:opacity-60 ${
                    fieldErrors.firstName
                      ? "border-red-400 focus:border-red-500"
                      : ""
                  }`}
                />
              </div>
              {fieldErrors.firstName && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                  <AlertCircle size={12} />
                  {fieldErrors.firstName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="label mb-1.5">
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
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    clearFieldError("lastName");
                  }}
                  placeholder="Mahmud"
                  className={`field w-full pl-9 disabled:opacity-60 ${
                    fieldErrors.lastName
                      ? "border-red-400 focus:border-red-500"
                      : ""
                  }`}
                />
              </div>
              {fieldErrors.lastName && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                  <AlertCircle size={12} />
                  {fieldErrors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="label mb-1.5">
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearFieldError("email");
                }}
                placeholder="you@company.com"
                className={`field w-full pl-9 disabled:opacity-60 ${
                  fieldErrors.email ? "border-red-400 focus:border-red-500" : ""
                }`}
              />
            </div>
            {fieldErrors.email && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                <AlertCircle size={12} />
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Phone Number (react-international-phone) */}
          <div>
            <label htmlFor="phone" className="label mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div
              className={`rounded-xl border bg-white transition-colors focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/15 ${
                fieldErrors.phone ? "border-red-400" : "border-slate-300"
              }`}
            >
              <PhoneInput
                defaultCountry="bd"
                value={phone}
                disabled={loading}
                onChange={(val) => {
                  setPhone(val);
                  clearFieldError("phone");
                }}
                inputProps={{
                  id: "phone",
                  name: "phone",
                  required: true,
                  autoComplete: "tel",
                  placeholder: "1712 345678",
                }}
                className="w-full"
                inputClassName="!h-10 !w-full !border-0 !bg-transparent !text-sm !text-slate-900 !outline-none !ring-0"
                countrySelectorStyleProps={{
                  buttonClassName:
                    "!h-10 !border-0 !border-r !border-slate-200 !bg-transparent !px-3 !rounded-l-xl hover:!bg-slate-50",
                  dropdownStyleProps: {
                    className: "!z-50 !rounded-xl !border-slate-200 !shadow-lg",
                  },
                }}
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              Required for account verification and WhatsApp support updates.
            </p>
            {fieldErrors.phone && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                <AlertCircle size={12} />
                {fieldErrors.phone}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="label mb-1.5">
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearFieldError("password");
                }}
                placeholder="At least 8 characters"
                className={`field w-full pr-10 pl-9 disabled:opacity-60 ${
                  fieldErrors.password
                    ? "border-red-400 focus:border-red-500"
                    : ""
                }`}
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
            {fieldErrors.password && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                <AlertCircle size={12} />
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="label mb-1.5">
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
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  clearFieldError("confirmPassword");
                }}
                placeholder="Re-enter your password"
                className={`field w-full pr-10 pl-9 disabled:opacity-60 ${
                  fieldErrors.confirmPassword
                    ? "border-red-400 focus:border-red-500"
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
                className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {fieldErrors.confirmPassword && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                <AlertCircle size={12} />
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          {/* Cloudflare Turnstile */}
          <div className="pt-1">
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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || (TURNSTILE_ENABLED && !turnstileToken)}
            className="btn-primary inline-flex w-full cursor-pointer items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>Creating account…</span>
              </>
            ) : (
              <>
                <span>Create account</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>

          <p className="text-center text-xs text-slate-500">
            By signing up you agree to our{" "}
            <Link
              href="/legal/terms"
              className="font-medium text-blue-700 hover:underline"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/legal/privacy"
              className="font-medium text-blue-700 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </form>

        <p className="mt-6 border-t border-slate-100 pt-4 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href={loginHref}
            className="font-semibold text-blue-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 text-sm text-slate-500">
          Loading…
        </div>
      }
    >
      <RegisterFormContent />
    </Suspense>
  );
}
