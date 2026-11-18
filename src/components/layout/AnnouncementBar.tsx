"use client";

import { X } from "lucide-react";
import { useSyncExternalStore } from "react";

const DISMISSED_KEY = "pv_announcement_dismissed_v4";
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
    <div className="relative z-50 flex h-9 items-center justify-center gap-3 bg-slate-900 px-10 text-xs text-slate-200">
      <p className="truncate">
        Launch offer — 10% off your first server with{" "}
        <span className="font-mono font-semibold text-white">LAUNCH10</span>
      </p>
      <button
        onClick={handleDismiss}
        className="absolute right-2 flex size-7 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Dismiss announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
}
