import { attachSessionCookie } from "@/lib/auth/session";
import {
  getClientIp,
  isTurnstileConfigured,
  verifyTurnstile,
} from "@/lib/auth/turnstile";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password, rememberMe, turnstileToken } = (await req
    .json()
    .catch(() => ({}))) as {
    email?: string;
    password?: string;
    rememberMe?: boolean;
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

  // The challenge script can be blocked by adblockers, firewalls or offline
  // networks. Only verify tokens that were actually issued, so those users can
  // still sign in; an invalid token is still rejected.
  if (isTurnstileConfigured() && turnstileToken) {
    const isHuman = await verifyTurnstile(turnstileToken, getClientIp(req.headers));
    if (!isHuman) {
      return NextResponse.json(
        { error: "Bot verification failed. Please try again." },
        { status: 403 },
      );
    }
  }

  // Demo session: no user records are stored yet, so any valid form submission
  // gets a signed cookie identifying the email it was submitted with.
  const response = NextResponse.json({ ok: true });
  attachSessionCookie(response, email.trim().toLowerCase(), Boolean(rememberMe));

  return response;
}
