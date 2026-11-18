"use client";

import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export function StickySocialBar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -35 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      className="fixed left-3 xl:left-5 2xl:left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center pointer-events-auto"
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
    </motion.aside>
  );
}
