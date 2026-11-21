"use client";

import { Check, Copy, Sparkles, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";

const DISMISSED_KEY = "pv_announcement_dismissed_v5";
const DISMISSAL_EVENT = "pv-announcement-dismissed";

function subscribeToDismissal(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(DISMISSAL_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(DISMISSAL_EVENT, onChange);
  };
}

function getDismissedSnapshot() {
  return localStorage.getItem(DISMISSED_KEY) === "true";
}

function getServerDismissedSnapshot() {
  return true;
}

interface AnnouncementBarProps {
  collapsed?: boolean;
}

export function AnnouncementBar({ collapsed = false }: AnnouncementBarProps) {
  const [copied, setCopied] = useState(false);
  const [isScrolledHide, setIsScrolledHide] = useState(false);

  const dismissed = useSyncExternalStore(
    subscribeToDismissal,
    getDismissedSnapshot,
    getServerDismissedSnapshot,
  );

  // Smooth scroll detection (hides immediately when scrolling down, shows at top or scrolling up)
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      if (scrollY <= 10) {
        setIsScrolledHide(false);
      } else if (scrollY > lastScrollY && scrollY > 30) {
        // Scrolling down -> hide smoothly
        setIsScrolledHide(true);
      } else if (scrollY < lastScrollY) {
        // Scrolling up -> show smoothly
        setIsScrolledHide(false);
      }

      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "true");
    window.dispatchEvent(new Event(DISMISSAL_EVENT));
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText("LAUNCH10");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = "LAUNCH10";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Permanently dismissed by user -> remove from DOM
  if (dismissed) return null;

  const isHidden = collapsed || isScrolledHide;

  return (
    <div
      role="region"
      aria-label="Promotional announcement"
      aria-hidden={isHidden}
      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
        isHidden
          ? "pointer-events-none grid-rows-[0fr] opacity-0"
          : "grid-rows-[1fr] opacity-100"
      }`}
    >
      <div className="overflow-hidden">
        <div className="relative z-50 border-b border-[#fde68a] bg-[#fef3c7] text-[#92400e]">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:px-6 lg:px-8">
            {/* Spacer for balanced centering on desktop */}
            <div className="hidden w-7 sm:block" aria-hidden="true" />

            {/* Center Content */}
            <div className="flex flex-1 flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center text-xs sm:text-[13px]">
              {/* Primary Offer + Interactive Pill */}
              <div className="inline-flex flex-wrap items-center justify-center gap-1.5">
                <span className="inline-flex items-center gap-1 font-medium">
                  <Sparkles size={14} className="shrink-0 text-amber-600" />
                  <span>
                    Launch offer:{" "}
                    <strong className="font-bold text-amber-950">
                      10% off
                    </strong>{" "}
                    your first server
                  </span>
                </span>

                <span className="text-[#92400e]/80">with code</span>

                {/* Clickable Promo Code Pill */}
                <button
                  type="button"
                  onClick={handleCopyCode}
                  tabIndex={isHidden ? -1 : 0}
                  title="Click to copy promo code"
                  aria-label={
                    copied ? "Promo code copied" : "Copy promo code LAUNCH10"
                  }
                  className={`group inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider transition-all duration-200 active:scale-95 ${
                    copied
                      ? "bg-emerald-600 text-white shadow-xs ring-1 ring-emerald-700"
                      : "bg-white/75 text-amber-950 shadow-2xs ring-1 ring-amber-900/20 hover:bg-white hover:ring-amber-900/35"
                  }`}
                >
                  <span>{copied ? "COPIED!" : "LAUNCH10"}</span>
                  {copied ? (
                    <Check size={12} strokeWidth={2.5} className="shrink-0" />
                  ) : (
                    <Copy
                      size={11}
                      className="shrink-0 text-amber-700 transition-transform group-hover:scale-110"
                    />
                  )}
                </button>
              </div>

              {/* Divider */}
              <span
                className="hidden h-3.5 w-px bg-amber-900/20 lg:inline-block"
                aria-hidden="true"
              />

              {/* Secondary Trust Signal */}
              <div className="hidden items-center gap-1.5 text-xs font-medium text-[#92400e]/90 lg:inline-flex">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
                </span>
                <span>Instant activation (&lt;60s) &amp; 24/7 BD Support</span>
              </div>
            </div>

            {/* Dismiss Button */}
            <button
              type="button"
              onClick={handleDismiss}
              tabIndex={isHidden ? -1 : 0}
              className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#92400e]/70 transition-colors hover:bg-amber-900/10 hover:text-amber-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-900"
              aria-label="Dismiss announcement"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
