import { attachSessionCookie, type UserRole } from "@/lib/auth/session";
import {
  getClientIp,
  isTurnstileConfigured,
  verifyTurnstile,
} from "@/lib/auth/turnstile";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password, rememberMe, role, portalMode, turnstileToken } =
    (await req.json().catch(() => ({}))) as {
      email?: string;
      password?: string;
      rememberMe?: boolean;
      role?: string;
      portalMode?: string;
      turnstileToken?: string;
    };

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!password || password.length < 6) {
    return NextResponse.json(
      { error: "Password must be at least 6 characters." },
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

  // Resolve role for demo session (will come from NestJS API once connected)
  let resolvedRole: UserRole = "USER";
  if (portalMode === "admin" || role === "ADMIN") {
    resolvedRole = "ADMIN";
  } else if (
    portalMode === "reseller" ||
    role === "RESELLER" ||
    normalizedEmail.includes("reseller")
  ) {
    resolvedRole = "RESELLER";
  }

  const response = NextResponse.json({
    ok: true,
    user: {
      email: normalizedEmail,
      role: resolvedRole,
    },
  });

  attachSessionCookie(
    response,
    normalizedEmail,
    Boolean(rememberMe),
    undefined,
    resolvedRole,
  );

  return response;
}