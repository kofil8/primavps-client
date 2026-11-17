'use client';

import React, { useSyncExternalStore } from 'react';
import { X } from 'lucide-react';

const DISMISSED_KEY = 'pv_announcement_dismissed_v3';
const DISMISSAL_EVENT = 'pv-announcement-dismissed';

function subscribeToDismissal(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(DISMISSAL_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(DISMISSAL_EVENT, onChange);
  };
}

function getDismissedSnapshot() {
  return localStorage.getItem(DISMISSED_KEY) === 'true';
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
    localStorage.setItem(DISMISSED_KEY, 'true');
    window.dispatchEvent(new Event(DISMISSAL_EVENT));
  };

  if (dismissed) return null;

  return (
    <div className="relative z-50 flex h-9 items-center justify-between border-b border-blue-700 bg-[#365FE8] px-4 text-xs text-white sm:px-6 sm:text-[13px]">
      <div className="flex-1 text-center truncate flex items-center justify-center gap-2">
        <span className="font-semibold">A little welcome offer:</span>
        <span className="font-semibold tracking-wide">
          Use{' '}
          <code className="rounded border border-white/30 bg-white/15 px-1.5 py-0.5 font-mono">
            LAUNCH10
          </code>{' '}
          for 10% off
        </span>
      </div>
      <button
        onClick={handleDismiss}
        className="ml-2 flex-shrink-0 rounded p-1 text-white/75 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Dismiss banner"
      >
        <X size={14} />
      </button>
    </div>
  );
}
