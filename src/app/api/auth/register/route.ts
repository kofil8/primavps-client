import { attachSessionCookie, type UserRole } from "@/lib/auth/session";
import {
  getClientIp,
  isTurnstileConfigured,
  verifyTurnstile,
} from "@/lib/auth/turnstile";
import { NextRequest, NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, phone, password, role, turnstileToken } =
    (await req.json().catch(() => ({}))) as {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      password?: string;
      role?: string;
      turnstileToken?: string;
    };

  if (!firstName?.trim() || !lastName?.trim()) {
    return NextResponse.json(
      { error: "Please enter your first and last name." },
      { status: 400 },
    );
  }

  if (!email || !EMAIL_PATTERN.test(email.trim())) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!phone || phone.replace(/\D/g, "").length < 8) {
    return NextResponse.json(
      { error: "Please enter a valid phone number." },
      { status: 400 },
    );
  }

  if (!password || password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 },
    );
  }

  if (isTurnstileConfigured() && turnstileToken) {
    const isHuman = await verifyTurnstile(
      turnstileToken,
      getClientIp(req.headers),
    );
    if (!isHuman) {
      return NextResponse.json(
        { error: "Bot verification failed. Please try again." },
        { status: 403 },
      );
    }
  }

  const normalizedEmail = email.trim().toLowerCase();
  const fullName = `${firstName.trim()} ${lastName.trim()}`;
  const resolvedRole: UserRole = role === "RESELLER" ? "RESELLER" : "USER";

  const response = NextResponse.json({
    ok: true,
    user: {
      email: normalizedEmail,
      name: fullName,
      role: resolvedRole,
    },
  });

  attachSessionCookie(
    response,
    normalizedEmail,
    true,
    fullName,
    resolvedRole,
  );

  return response;
}