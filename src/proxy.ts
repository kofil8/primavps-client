import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Protected routes that require an authenticated session
const PROTECTED_PREFIXES = [
  "/checkout",
  "/dashboard",
  "/client",
  "/billing",
  "/orders",
];

// Auth routes that logged-in users shouldn't see again
const AUTH_ROUTES = ["/login", "/register"];

// Match your backend/auth session cookie name(s)
const SESSION_COOKIE_NAMES = [
  "primavps_session",
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
];

function hasSession(request: NextRequest): boolean {
  return SESSION_COOKIE_NAMES.some((name) =>
    Boolean(request.cookies.get(name)?.value),
  );
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isLoggedIn = hasSession(request);

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  // 1. Unauthenticated user trying to access /checkout or /dashboard -> redirect to /login
  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Already logged-in user visiting /login or /register -> redirect to next or /dashboard
  const isAuthPage = AUTH_ROUTES.some((route) => pathname === route);
  if (isAuthPage && isLoggedIn) {
    const nextParam = request.nextUrl.searchParams.get("next");
    const safeNext =
      nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")
        ? nextParam
        : "/dashboard";
    return NextResponse.redirect(new URL(safeNext, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/dashboard/:path*",
    "/client/:path*",
    "/billing/:path*",
    "/orders/:path*",
    "/login",
    "/register",
  ],
};
