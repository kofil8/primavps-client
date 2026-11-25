import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "primavps_session";
const GUEST_ONLY_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];
const PROTECTED_PREFIXES = ["/checkout", "/dashboard"];

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  const isGuestOnly = GUEST_ONLY_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(`${r}/`),
  );
  if (isGuestOnly && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
  if (isProtected && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/checkout/:path*",
    "/dashboard/:path*",
  ],
};