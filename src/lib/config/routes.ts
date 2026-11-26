export const FOCUSED_AND_PORTAL_PREFIXES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/checkout",
  "/dashboard",
  "/reseller-portal",
  "/admin",
] as const;

export function isFocusedOrPortalRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return FOCUSED_AND_PORTAL_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}