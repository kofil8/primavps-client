import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters.")
      .max(50, "First name is too long."),
    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters.")
      .max(50, "Last name is too long."),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Please enter a valid email address."),
    phone: z
      .string()
      .trim()
      .refine((val) => val.replace(/\D/g, "").length >= 10, {
        message: "Please enter a valid phone number with country code.",
      }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[a-z]/, "Include at least one lowercase letter.")
      .regex(/[A-Z]/, "Include at least one uppercase letter.")
      .regex(/[0-9]/, "Include at least one number.")
      .regex(/[^A-Za-z0-9]/, "Include at least one special character."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export interface PasswordStrengthResult {
  score: 0 | 1 | 2 | 3 | 4;
  label: "Weak" | "Fair" | "Good" | "Strong" | "";
  barColor: string;
  textColor: string;
  checks: {
    length: boolean;
    upper: boolean;
    lower: boolean;
    number: boolean;
    special: boolean;
  };
}

export function evaluatePasswordStrength(
  password: string,
): PasswordStrengthResult {
  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  if (!password) {
    return {
      score: 0,
      label: "",
      barColor: "bg-slate-200",
      textColor: "text-slate-400",
      checks,
    };
  }

  const passed = Object.values(checks).filter(Boolean).length;

  if (passed <= 2) {
    return {
      score: 1,
      label: "Weak",
      barColor: "bg-red-500",
      textColor: "text-red-600",
      checks,
    };
  }
  if (passed === 3) {
    return {
      score: 2,
      label: "Fair",
      barColor: "bg-amber-500",
      textColor: "text-amber-600",
      checks,
    };
  }
  if (passed === 4) {
    return {
      score: 3,
      label: "Good",
      barColor: "bg-blue-500",
      textColor: "text-blue-600",
      checks,
    };
  }
  return {
    score: 4,
    label: "Strong",
    barColor: "bg-emerald-500",
    textColor: "text-emerald-600",
    checks,
  };
}