"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";

const ENABLE_ANNOUNCEMENT = false;
const AUTO_HIDE_MS = 25_000;

const FOCUSED_AND_PROTECTED_PREFIXES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/checkout",
  "/dashboard",
];

export function SiteHeader() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const hidePublicChrome = FOCUSED_AND_PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname?.startsWith(`${prefix}/`),
  );

  useEffect(() => {
    if (!ENABLE_ANNOUNCEMENT || hidePublicChrome) return;

    const timer = window.setTimeout(() => {
      setCollapsed(true);
    }, AUTO_HIDE_MS);

    return () => window.clearTimeout(timer);
  }, [hidePublicChrome]);

  if (hidePublicChrome) return null;

  return (
    <header className="sticky top-0 z-50">
      {ENABLE_ANNOUNCEMENT && <AnnouncementBar collapsed={collapsed} />}
      <Navbar />
    </header>
  );
}