"use client";

import { X } from "lucide-react";
import { useSyncExternalStore } from "react";

const DISMISSED_KEY = "pv_announcement_dismissed_v5";
const DISMISSAL_EVENT = "pv-announcement-dismissed";

const ANNOUNCEMENT_TEXT =
  "Launch offer — 10% off your first server with code LAUNCH10  •  Reseller Program: up to 20% off on 50+ servers  •  BD support desk online 24/7  •  Instant activation in under 60 seconds";

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

export function AnnouncementBar() {
  const dismissed = useSyncExternalStore(
    subscribeToDismissal,
    getDismissedSnapshot,
    getServerDismissedSnapshot,
  );

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "true");
    window.dispatchEvent(new Event(DISMISSAL_EVENT));
  };

  if (dismissed) return null;

  return (
    <div className="relative z-50 flex h-9 items-center overflow-hidden bg-yellow-400 px-10 text-xs font-medium text-slate-900">
      <div className="relative flex flex-1 overflow-hidden">
        <div className="flex shrink-0 animate-marquee gap-12 whitespace-nowrap">
          <span>{ANNOUNCEMENT_TEXT}</span>
          <span aria-hidden="true">{ANNOUNCEMENT_TEXT}</span>
        </div>
      </div>
      <button
        onClick={handleDismiss}
        className="absolute right-2 flex size-7 items-center justify-center rounded-md text-slate-700 transition-colors hover:bg-black/10 hover:text-slate-900"
        aria-label="Dismiss announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
}
