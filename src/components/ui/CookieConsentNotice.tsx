"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function CookieConsentNotice() {
  const [visible, setVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem("primevpsbd_cookie_consent", "true");
    } catch {
      // ignore storage errors
    }
  };

  useEffect(() => {
    try {
      if (localStorage.getItem("primevpsbd_cookie_consent")) return;
    } catch {
      // ignore
    }

    const showTimer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(showTimer);
  }, []);

  // Auto-hide after 7s, pauses while user hovers/focuses
  useEffect(() => {
    if (!visible || isPaused) return;

    hideTimerRef.current = setTimeout(() => {
      handleDismiss();
    }, 7000);

    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [visible, isPaused]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="region"
          aria-label="কুকি ও সিকিউরিটি পলিসি"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-5 inset-x-4 mx-auto sm:inset-x-auto sm:left-6 z-40 max-w-[350px] sm:max-w-sm rounded-2xl border border-slate-200/90 bg-white px-4 pb-4 pt-9 sm:px-5 sm:pb-5 sm:pt-10 text-slate-800 shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
        >
          {/* Floating Cookie Icon */}
          <motion.div
            initial={{ rotate: -12, scale: 0.85 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 18,
              delay: 0.1,
            }}
            className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 pointer-events-none select-none"
          >
            <Image
              src="/cookies-logo.webp"
              alt="Cookie Policy"
              width={64}
              height={64}
              priority
              className="h-14 w-14 sm:h-16 sm:w-16 object-contain drop-shadow-[0_6px_12px_rgba(15,23,42,0.16)]"
            />
          </motion.div>

          {/* Close Button */}
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="বন্ধ করুন"
            className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>

          {/* Content */}
          <div className="text-center">
            <h3 className="text-sm font-bold text-slate-900 leading-snug">
              কুকি ও সিকিউরিটি পলিসি
            </h3>
            <p className="mt-1.5 text-slate-600 leading-relaxed text-xs">
              উন্নত ব্রাউজিং অভিজ্ঞতা ও অ্যাকাউন্ট নিরাপত্তা নিশ্চিত করতে আমরা
              প্রয়োজনীয় কুকি ব্যবহার করি। বিস্তারিত জানুন{" "}
              <Link
                href="/legal/privacy"
                className="font-semibold text-blue-600 hover:underline"
              >
                প্রাইভেসি পলিসিতে
              </Link>
              ।
            </p>

            {/* Clearer CTA Hierarchy */}
            <div className="mt-4 flex items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={handleDismiss}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer"
              >
                স্বীকৃতি দিন
              </button>
              <Link
                href="/legal/privacy"
                className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                বিস্তারিত
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
