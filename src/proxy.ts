import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_USER_PREFIXES = [
  "/checkout",
  "/dashboard",
  "/reseller-portal",
  "/client",
  "/billing",
  "/orders",
];

const GUEST_ONLY_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

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

function getSafeNext(nextParam: string | null, fallback = "/dashboard"): string {
  if (nextParam && nextParam.startsWith("/") && !nextParam.startsWith("//")) {
    return nextParam;
  }
  return fallback;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isLoggedIn = hasSession(request);

  // 1. Admin routes (/admin and /admin/* except /admin/login)
  const isAdminLogin = pathname === "/admin/login";
  const isAdminProtected =
    (pathname === "/admin" || pathname.startsWith("/admin/")) && !isAdminLogin;

  if (isAdminProtected && !isLoggedIn) {
    const adminLoginUrl = new URL("/admin/login", request.url);
    adminLoginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(adminLoginUrl);
  }

  // 2. Customer, Checkout & Reseller Portal routes (/resellers stays PUBLIC)
  const isUserProtected = PROTECTED_USER_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (isUserProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Redirect signed-in users away from guest-only auth pages
  const isGuestOnly = GUEST_ONLY_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isGuestOnly && isLoggedIn) {
    const safeNext = getSafeNext(request.nextUrl.searchParams.get("next"));
    return NextResponse.redirect(new URL(safeNext, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/dashboard/:path*",
    "/reseller-portal",
    "/reseller-portal/:path*",
    "/admin",
    "/admin/:path*",
    "/client/:path*",
    "/billing/:path*",
    "/orders/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};