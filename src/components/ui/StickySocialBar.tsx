"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export function StickySocialBar() {
  return (
    <motion.aside
      initial={{ x: -35 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      className="fixed left-3 xl:left-5 2xl:left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 pointer-events-auto opacity-50 transition-opacity duration-300 hover:opacity-100 focus-within:opacity-100"
      aria-label="Follow us on social media"
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        className="flex flex-col items-center gap-5 rounded-full border border-white/10 bg-[#080e26] px-3.5 py-6 text-white shadow-2xl shadow-slate-950/30 backdrop-blur-xs"
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
          <FaYoutube size={16} />
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
          <FaLinkedinIn size={15} />
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
          <FaTwitter size={15} />
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
          <FaFacebookF size={15} />
        </motion.a>

        {/* Vertical text: "— FOLLOW ON" reading upwards */}
        <div className="pt-2 pb-1 flex flex-col items-center select-none">
          <span
            style={{ writingMode: "vertical-rl" }}
            className="rotate-180 uppercase tracking-[0.25em] text-[10px] font-bold text-slate-300/90 whitespace-nowrap"
          >
            — FOLLOW ON
          </span>
        </div>
      </motion.div>

      {/* WhatsApp support — sits directly below the Follow Us rail */}
      <motion.a
        href="https://wa.me/8801960677463?text=Hello%20primevpsbd,%20I%20need%20more%20information%20about%20your%20VPS%20plans"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct support on WhatsApp"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-2xl shadow-emerald-900/30 ring-4 ring-emerald-500/20 transition-colors hover:bg-emerald-500"
      >
        <span className="absolute right-0 top-0 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
        </span>

        <MessageCircle size={20} className="fill-white/20" />

        <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg border border-white/10 bg-[#080e26] px-3 py-1.5 text-[11px] font-semibold text-white opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
          WhatsApp · Reply in 3 min
        </span>
      </motion.a>
    </motion.aside>
  );
}
