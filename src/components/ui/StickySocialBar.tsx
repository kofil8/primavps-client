"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export function StickySocialBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hide on smaller devices as soon as user scrolls down past the hero top
      if (window.scrollY > 90) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      className={`fixed z-40 flex flex-col items-center gap-2 sm:gap-3 pointer-events-auto transition-all duration-300 ease-out
        /* Desktop wide layout: vertical center on right in the free margin */
        min-[1420px]:right-4 2xl:right-6 min-[1420px]:top-1/2 min-[1420px]:-translate-y-1/2 min-[1420px]:opacity-60 min-[1420px]:hover:opacity-100 min-[1420px]:translate-x-0
        /* Smaller devices & mobile: positioned near top-right, auto-hides on scroll */
        max-[1419px]:top-24 sm:max-[1419px]:top-28 max-[1419px]:right-2 sm:max-[1419px]:right-3.5
        ${
          scrolled
            ? "max-[1419px]:opacity-0 max-[1419px]:pointer-events-none max-[1419px]:translate-x-8"
            : "max-[1419px]:opacity-85 max-[1419px]:translate-x-0"
        }
      `}
      aria-label="Follow us on social media"
    >
      {/* Social Icons Pill */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        className="flex flex-col items-center rounded-full border border-white/10 bg-[#080e26]/95 text-white shadow-xl shadow-slate-950/25 backdrop-blur-md
          /* Compact on small screens, full size on large desktop */
          p-2 sm:px-2.5 sm:py-3.5 min-[1420px]:px-3.5 min-[1420px]:py-5
          gap-2.5 sm:gap-3.5 min-[1420px]:gap-4.5"
      >
        {/* YouTube */}
        <motion.a
          href="https://youtube.com/@primevpsbd"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          whileHover={{ scale: 1.25, rotate: 6 }}
          whileTap={{ scale: 0.95 }}
          className="text-white/85 transition-colors hover:text-[#ff0000]"
        >
          <FaYoutube className="h-3 w-3 sm:h-3.5 sm:w-3.5 min-[1420px]:h-4 min-[1420px]:w-4" />
        </motion.a>

        {/* LinkedIn */}
        <motion.a
          href="https://linkedin.com/company/primevpsbd"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          whileHover={{ scale: 1.25, rotate: -6 }}
          whileTap={{ scale: 0.95 }}
          className="text-white/85 transition-colors hover:text-[#0a66c2]"
        >
          <FaLinkedinIn className="h-3 w-3 sm:h-3.5 sm:w-3.5 min-[1420px]:h-4 min-[1420px]:w-4" />
        </motion.a>

        {/* Twitter */}
        <motion.a
          href="https://x.com/primevpsbd"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter / X"
          whileHover={{ scale: 1.25, rotate: 6 }}
          whileTap={{ scale: 0.95 }}
          className="text-white/85 transition-colors hover:text-[#1da1f2]"
        >
          <FaTwitter className="h-3 w-3 sm:h-3.5 sm:w-3.5 min-[1420px]:h-3.5 min-[1420px]:w-3.5" />
        </motion.a>

        {/* Facebook */}
        <motion.a
          href="https://facebook.com/primevpsbd"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          whileHover={{ scale: 1.25, rotate: -6 }}
          whileTap={{ scale: 0.95 }}
          className="text-white/85 transition-colors hover:text-[#1877f2]"
        >
          <FaFacebookF className="h-3 w-3 sm:h-3.5 sm:w-3.5 min-[1420px]:h-3.5 min-[1420px]:w-3.5" />
        </motion.a>

        {/* Vertical text: "— FOLLOW" (Visible on large screens only) */}
        <div className="pt-1.5 pb-0.5 hidden min-[1420px]:flex flex-col items-center select-none">
          <span
            style={{ writingMode: "vertical-rl" }}
            className="rotate-180 uppercase tracking-[0.22em] text-[9px] font-bold text-slate-400 whitespace-nowrap"
          >
            — FOLLOW
          </span>
        </div>
      </motion.div>

      {/* Emergency WhatsApp pill */}
      <motion.a
        href="https://wa.me/8801960677463?text=Hello%20primevpsbd,%20I%20need%20more%20information%20about%20your%20VPS%20plans"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Emergency support on WhatsApp"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl shadow-emerald-950/20 ring-2 sm:ring-4 ring-emerald-500/20 transition-colors hover:bg-emerald-500
          h-8 w-8 sm:h-9 sm:w-9 min-[1420px]:h-11 min-[1420px]:w-11"
      >
        <span className="absolute right-0 top-0 flex h-2 w-2 sm:h-2.5 sm:w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-white" />
        </span>

        <MessageCircle className="h-4 w-4 sm:h-4.5 sm:w-4.5 min-[1420px]:h-5 min-[1420px]:w-5 fill-white/20" />

        {/* Inward tooltip on hover (desktop) */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg border border-white/10 bg-[#080e26] px-3 py-1.5 text-[11px] font-semibold text-white opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 hidden sm:inline-block">
          WhatsApp · জরুরি হেল্পলাইন
        </span>
      </motion.a>
    </aside>
  );
}
