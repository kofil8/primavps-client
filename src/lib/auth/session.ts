import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextResponse } from "next/server";

export const SESSION_COOKIE = "primavps_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export type UserRole = "USER" | "RESELLER" | "ADMIN";

export interface SessionPayload {
  email: string;
  name?: string;
  role: UserRole;
  issuedAt: number;
}

export interface NavbarUser {
  email: string;
  name?: string | null;
  role: UserRole;
}

function getSecret(): string {
  return (
    process.env.SESSION_SECRET ||
    process.env.TURNSTILE_SECRET_KEY ||
    "primavps-insecure-development-secret"
  );
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

function normalizeRole(role: unknown): UserRole {
  if (role === "RESELLER" || role === "ADMIN" || role === "USER") {
    return role;
  }
  return "USER";
}

export function createSessionToken(
  email: string,
  name?: string,
  role: UserRole = "USER",
): string {
  const payload: SessionPayload = {
    email,
    ...(name ? { name } : {}),
    role: normalizeRole(role),
    issuedAt: Date.now(),
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function attachSessionCookie(
  response: NextResponse,
  email: string,
  rememberMe = true,
  name?: string,
  role: UserRole = "USER",
): void {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: createSessionToken(email, name, role),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    ...(rememberMe ? { maxAge: SESSION_MAX_AGE } : {}),
  });
}

export function verifySessionToken(
  token: string | undefined,
): SessionPayload | null {
  if (!token) return null;

  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  const expected = Buffer.from(sign(encoded));
  const received = Buffer.from(signature);
  if (
    expected.length !== received.length ||
    !timingSafeEqual(expected, received)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as Partial<SessionPayload>;

    if (
      typeof payload.email !== "string" ||
      typeof payload.issuedAt !== "number"
    ) {
      return null;
    }

    return {
      email: payload.email,
      ...(typeof payload.name === "string" ? { name: payload.name } : {}),
      role: normalizeRole(payload.role),
      issuedAt: payload.issuedAt,
    };
  } catch {
    return null;
  }
}