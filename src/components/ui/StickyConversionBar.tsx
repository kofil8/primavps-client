"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, ShieldCheck, Tag, X, Zap } from "lucide-react";
import Link from "next/link";

export function StickyConversionBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const handleScroll = () => {
      if (window.scrollY > 480) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-3 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
      <div className="mx-auto max-w-5xl rounded-2xl border border-blue-500/20 bg-slate-900/95 px-4 py-3 text-white shadow-2xl backdrop-blur-md sm:px-6 sm:py-3.5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left content / Value Props */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
            <span className="flex items-center gap-1.5 font-bold text-emerald-400">
              <ShieldCheck size={16} />
              0/100 Clean US IP
            </span>
            <span className="hidden md:inline-block h-3.5 w-px bg-slate-700" />
            <span className="flex items-center gap-1.5 text-slate-200">
              <Zap size={14} className="text-amber-400" />
              বিকাশ/নগদে ৯০ সেকেন্ডে অ্যাক্টিভেশন
            </span>
            <span className="hidden lg:inline-block h-3.5 w-px bg-slate-700" />
            <span className="hidden sm:inline-flex items-center gap-1 rounded-md bg-blue-600/30 px-2 py-0.5 text-[11px] font-semibold text-blue-300 border border-blue-500/30">
              <Tag size={12} />
              ১০% ছাড় কোড: <strong className="text-white">LAUNCH10</strong>
            </span>
          </div>

          {/* Right action group */}
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <Link
              href="/isp-vps"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/25 transition-all hover:brightness-110 active:scale-95"
            >
              <span>প্ল্যান বেছে নিন</span>
              <ArrowRight size={14} />
            </Link>

            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
