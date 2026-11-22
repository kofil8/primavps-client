"use client";

import { Check, Copy, Sparkles, X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";

const DISMISSED_KEY = "pv_announcement_dismissed_v6";
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

  const dismissed = useSyncExternalStore(
    subscribeToDismissal,
    getDismissedSnapshot,
    getServerDismissedSnapshot,
  );

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "true");
    window.dispatchEvent(new Event(DISMISSAL_EVENT));
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText("LAUNCH10");
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = "LAUNCH10";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Promotional announcement"
      aria-hidden={collapsed}
      className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
        collapsed
          ? "pointer-events-none grid-rows-[0fr] opacity-0"
          : "grid-rows-[1fr] opacity-100"
      }`}
    >
      <div className="overflow-hidden">
        <div className="relative z-50 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-slate-200">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-1.5 sm:px-6 lg:px-8">
            {/* Desktop centering spacer */}
            <div className="hidden w-6 sm:block" aria-hidden="true" />

            {/* Center Content */}
            <div className="flex flex-1 flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center text-[11px] sm:text-xs">
              <div className="inline-flex items-center gap-1.5">
                <Sparkles size={12} className="shrink-0 text-cyan-400" />
                <span>
                  Launch offer:{" "}
                  <strong className="font-semibold text-white">10% off</strong>{" "}
                  your first server with code
                </span>

                {/* Compact Clickable Promo Code Pill */}
                <button
                  type="button"
                  onClick={handleCopyCode}
                  tabIndex={collapsed ? -1 : 0}
                  title="Click to copy promo code"
                  aria-label={
                    copied ? "Promo code copied" : "Copy promo code LAUNCH10"
                  }
                  className={`group inline-flex cursor-pointer items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[10.5px] font-bold tracking-wider transition-all active:scale-95 ${
                    copied
                      ? "bg-emerald-500 text-white"
                      : "bg-white/10 text-cyan-300 ring-1 ring-white/15 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  <span>{copied ? "COPIED" : "LAUNCH10"}</span>
                  {copied ? (
                    <Check size={11} strokeWidth={2.5} className="shrink-0" />
                  ) : (
                    <Copy
                      size={10}
                      className="shrink-0 opacity-80 transition-transform group-hover:scale-110"
                    />
                  )}
                </button>
              </div>

              {/* Divider */}
              <span
                className="hidden h-3 w-px bg-white/15 lg:inline-block"
                aria-hidden="true"
              />

              {/* Secondary Trust Signal */}
              <div className="hidden items-center gap-1.5 text-[11px] text-slate-300 lg:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Instant activation (&lt;60s) &amp; 24/7 BD Support</span>
              </div>
            </div>

            {/* Compact Dismiss Button */}
            <button
              type="button"
              onClick={handleDismiss}
              tabIndex={collapsed ? -1 : 0}
              className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded text-slate-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              aria-label="Dismiss announcement"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
