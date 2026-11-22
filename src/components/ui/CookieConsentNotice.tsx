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
      localStorage.setItem("primavps_cookie_consent", "true");
    } catch {
      // ignore storage errors
    }
  };

  useEffect(() => {
    try {
      if (localStorage.getItem("primavps_cookie_consent")) return;
    } catch {
      // ignore
    }

    const showTimer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(showTimer);
  }, []);

  // Auto-hide after 7s; pauses on hover, focus, or mobile touch
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
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="fixed inset-x-3 bottom-28 z-40 mx-auto w-[calc(100%-1.5rem)] max-w-[340px] rounded-2xl border border-slate-200/90 bg-white/95 px-4 pt-8 pb-4 text-slate-800 shadow-[0_20px_50px_rgba(15,23,42,0.14)] backdrop-blur-md md:inset-x-auto md:bottom-5 md:left-6 md:mx-0 md:w-full md:max-w-[360px] md:px-5 md:pt-10 md:pb-5"
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
            className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none md:-top-8"
          >
            <Image
              src="/cookies-logo.webp"
              alt="Cookie Policy"
              width={64}
              height={64}
              priority
              className="h-12 w-12 object-contain drop-shadow-[0_6px_12px_rgba(15,23,42,0.16)] md:h-16 md:w-16"
            />
          </motion.div>

          {/* Close Button */}
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="বন্ধ করুন"
            className="absolute top-2.5 right-2.5 cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 md:top-3 md:right-3"
          >
            <X size={15} />
          </button>

          {/* Content */}
          <div className="text-center">
            <h3 className="text-[13px] leading-snug font-bold text-slate-900 md:text-sm">
              কুকি ও সিকিউরিটি পলিসি
            </h3>
            <p className="mt-1 text-[11.5px] leading-relaxed text-slate-600 md:mt-1.5 md:text-xs">
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
            <div className="mt-3.5 flex items-center justify-center gap-2 md:mt-4 md:gap-2.5">
              <button
                type="button"
                onClick={handleDismiss}
                className="flex-1 cursor-pointer rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-700 active:scale-[0.98] md:px-4"
              >
                স্বীকৃতি দিন
              </button>
              <Link
                href="/legal/privacy"
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 md:px-3.5"
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
