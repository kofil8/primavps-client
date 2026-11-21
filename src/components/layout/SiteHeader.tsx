"use client";

import { useEffect, useState } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";

/** The bar is only shown at (or very near) the top of the page. */
const SHOW_AT_TOP = 24;

/**
 * Sticky site header. Pinning the bar and navbar together lets the announcement
 * strip collapse once the user scrolls away from the top, and the navbar glides
 * up into its place. The bar stays hidden until the user scrolls back to the top.
 */
export function SiteHeader() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let queued = false;

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        setCollapsed(window.scrollY > SHOW_AT_TOP);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar collapsed={collapsed} />
      <Navbar />
    </header>
  );
}
