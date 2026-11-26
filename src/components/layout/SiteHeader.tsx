"use client";

import type { NavbarUser } from "@/lib/auth/session";
import { isFocusedOrPortalRoute } from "@/lib/config/routes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";

const ENABLE_ANNOUNCEMENT = false;
const AUTO_HIDE_MS = 25_000;

export function SiteHeader({ user }: { user?: NavbarUser | null }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const hidePublicChrome = isFocusedOrPortalRoute(pathname);

  useEffect(() => {
    if (!ENABLE_ANNOUNCEMENT || hidePublicChrome) return;
    const timer = window.setTimeout(() => setCollapsed(true), AUTO_HIDE_MS);
    return () => window.clearTimeout(timer);
  }, [hidePublicChrome]);

  if (hidePublicChrome) return null;

  return (
    <div className="sticky top-0 z-50">
      {ENABLE_ANNOUNCEMENT && <AnnouncementBar collapsed={collapsed} />}
      <Navbar user={user} />
    </div>
  );
}