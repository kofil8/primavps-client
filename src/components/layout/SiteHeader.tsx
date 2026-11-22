"use client";

import { useEffect, useState } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";

/**
 * Toggle to `true` (or drive from backend notice API) when you need to show
 * an emergency notice or promotional announcement.
 */
const ENABLE_ANNOUNCEMENT = false;

/** Auto-hide delay once shown (25 seconds). */
const AUTO_HIDE_MS = 25_000;

export function SiteHeader() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!ENABLE_ANNOUNCEMENT) return;

    const timer = window.setTimeout(() => {
      setCollapsed(true);
    }, AUTO_HIDE_MS);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {ENABLE_ANNOUNCEMENT && <AnnouncementBar collapsed={collapsed} />}
      <Navbar />
    </header>
  );
}
