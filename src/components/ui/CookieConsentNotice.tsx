"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

export function CookieConsentNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if previously accepted
    try {
      const alreadyAccepted = localStorage.getItem("primevpsbd_cookie_consent");
      if (alreadyAccepted) return;
    } catch {
      // ignore storage errors
    }

    // Show notice shortly after page load
    const showTimer = setTimeout(() => {
      setVisible(true);
    }, 600);

    // Auto-hide after ~3 seconds of visibility (as requested: "2/3 rakhe auto hide")
    const hideTimer = setTimeout(() => {
      handleDismiss();
    }, 3800);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem("primevpsbd_cookie_consent", "true");
    } catch {
      // ignore
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-5 left-4 sm:left-6 z-40 max-w-[340px] sm:max-w-sm rounded-2xl border border-slate-200 bg-white/95 p-3.5 sm:p-4 text-slate-800 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Cookie size={17} />
            </div>

            <div className="flex-1 text-xs">
              <p className="font-bold text-slate-900 leading-snug">
                কুকি ও সিকিউরিটি পলিসি
              </p>
              <p className="mt-1 text-slate-600 leading-relaxed text-[11px] sm:text-xs">
                উন্নত ব্রাউজিং অভিজ্ঞতা ও অ্যাকাউন্ট নিরাপত্তা নিশ্চিত করতে আমরা প্রয়োজনীয় কুকি ব্যবহার করি। বিস্তারিত জানুন{" "}
                <Link
                  href="/legal/privacy"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  প্রাইভেসি পলিসিতে
                </Link>
                ।
              </p>

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  স্বীকৃতি দিন
                </button>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  ঠিক আছে
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Close cookie notice"
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
