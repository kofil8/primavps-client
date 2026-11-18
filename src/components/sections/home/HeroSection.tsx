"use client";

import { useEffect, useState } from "react";
import { useCurrency } from "@/lib/currency";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Gauge,
  HardDrive,
  MapPin,
  MessageCircle,
  Monitor,
  Network,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BkashLogo, NagadLogo } from "@/components/ui/PaymentLogos";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const SLIDES = [
  "/datacenter-1.webp",
  "/datacenter-2.webp",
  "/datacenter-3.webp",
];
const SLIDE_INTERVAL = 5000;

const PROMISES = [
  "IPQS Fraud Score: 0/100 গ্যারান্টি",
  "৭ দিনের ফ্রি IP রিপ্লেসমেন্ট",
  "৯৯.৯৮% আপটাইম SLA",
  "ঢাকা সাপোর্ট, গড় রেসপন্স ৩ মিনিট",
];

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.04 } },
};

export function HeroSection() {
  const { formatPrice } = useCurrency();
  const reduceMotion = useReducedMotion();
  const [slide, setSlide] = useState(0);
  const [activeMode, setActiveMode] = useState<"isp" | "cloud">("isp");

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(
      () => setSlide((s) => (s + 1) % SLIDES.length),
      SLIDE_INTERVAL
    );
    return () => clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Soft blue gradient wash — top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_75%_-5%,rgba(37,99,235,0.08),transparent_65%)]"
      />
      {/* Very subtle grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,#64748b_1px,transparent_1px),linear-gradient(to_bottom,#64748b_1px,transparent_1px)] [background-size:40px_40px]"
      />

      <div className="shell relative z-10 grid items-center gap-10 py-16 sm:py-20 lg:min-h-[90vh] lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-28 lg:pl-16 xl:pl-20">
        {/* ── LEFT COLUMN ── */}
        <motion.div
          variants={stagger}
          initial={reduceMotion ? false : "hidden"}
          animate="show"
        >
          {/* Live status pill */}
          <motion.div variants={rise} className="inline-flex">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              850+ সার্ভার চালু · ইনস্ট্যান্ট অ্যাক্টিভেশন &lt; ৯০ সেকেন্ড
            </span>
          </motion.div>

          {/* ── HEADLINE ── */}
          <motion.h1
            variants={rise}
            className="mt-6 font-display text-[2.75rem] font-extrabold leading-[1.06] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.75rem]"
          >
            ব্যান হওয়ার ভয় শেষ।
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                এখন কাজ করুন নিশ্চিন্তে।
              </span>
              {/* Underline accent */}
              <svg
                aria-hidden
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 320 8"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 6 Q80 2 160 5 Q240 8 318 3"
                  stroke="url(#ul)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="ul" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.h1>

          {/* ── SUBHEADLINE ── */}
          <motion.p
            variants={rise}
            className="mt-6 max-w-[30rem] text-base leading-[1.75] text-slate-500 sm:text-[1.05rem]"
          >
            AT&T · Comcast রেসিডেন্সিয়াল IP — সার্ভে, ফ্রিল্যান্সিং ও
            হাই-ট্রাফিক অ্যাপের জন্য{" "}
            <strong className="font-semibold text-slate-800">
              100% ক্লিন US VPS
            </strong>
            , পেমেন্ট করুন{" "}
            <strong className="font-semibold text-pink-600">বিকাশ</strong> বা{" "}
            <strong className="font-semibold text-orange-500">নগদে</strong>।
          </motion.p>

          {/* ── CTA BUTTONS ── */}
          <motion.div
            variants={rise}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            {/* PRIMARY — Residential ISP */}
            <Link
              href="/survey-vps"
              className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/35 active:translate-y-0"
            >
              {/* shimmer sweep */}
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full"
              />
              <ShieldCheck size={17} className="shrink-0" />
              Residential ISP — {formatPrice(2999)}/মাস
              <ArrowRight
                size={16}
                className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            {/* SECONDARY — Cloud VPS */}
            <Link
              href="/cloud-vps"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-6 py-[0.9rem] text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 hover:shadow-md active:translate-y-0"
            >
              <Zap size={15} className="shrink-0 text-indigo-500" />
              Cloud NVMe — {formatPrice(950)}/মাস
            </Link>
          </motion.div>

          {/* WhatsApp CTA & Mobile Follow Bar */}
          <motion.div variants={rise} className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="https://wa.me/8801960677463?text=Hello%20primevpsbd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-emerald-700"
            >
              <MessageCircle size={15} className="text-emerald-500" />
              এখনই কথা বলুন — ঢাকা টিম ৩ মিনিটে রিপ্লাই দেয়
            </Link>

            {/* Mobile-only social strip */}
            <div className="flex items-center gap-2.5 lg:hidden">
              <span className="text-[11px] font-semibold text-slate-400">— Follow:</span>
              <a href="https://youtube.com/@primevpsbd" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-slate-400 hover:text-red-600 transition-colors">
                <FaYoutube size={15} />
              </a>
              <a href="https://linkedin.com/company/primevpsbd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-blue-600 transition-colors">
                <FaLinkedinIn size={14} />
              </a>
              <a href="https://x.com/primevpsbd" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-slate-400 hover:text-sky-500 transition-colors">
                <FaTwitter size={14} />
              </a>
              <a href="https://facebook.com/primevpsbd" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-400 hover:text-blue-600 transition-colors">
                <FaFacebookF size={14} />
              </a>
            </div>
          </motion.div>

          {/* ── PAYMENT BADGES ── */}
          <motion.div
            variants={rise}
            className="mt-7 flex flex-wrap items-center gap-2.5"
          >
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
              পেমেন্ট করুন:
            </span>
            {/* bKash */}
            <div className="flex items-center gap-1.5 rounded-xl border border-pink-100 bg-pink-50 px-3 py-1.5 shadow-xs">
              <BkashLogo className="h-4 w-4" />
              <span className="text-[11px] font-bold text-pink-700">bKash</span>
            </div>
            {/* Nagad */}
            <div className="flex items-center gap-1.5 rounded-xl border border-orange-100 bg-orange-50 px-3 py-1.5 shadow-xs">
              <NagadLogo className="h-4 w-4" />
              <span className="text-[11px] font-bold text-orange-600">
                Nagad
              </span>
            </div>
            <span className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600 shadow-xs">
              Visa / Mastercard
            </span>
            <span className="rounded-xl border border-teal-100 bg-teal-50 px-3 py-1.5 text-[11px] font-bold text-teal-700 shadow-xs">
              USDT
            </span>
          </motion.div>

          {/* ── PROMISE CHECKLIST ── */}
          <motion.ul
            variants={rise}
            className="mt-8 grid gap-2.5 border-t border-slate-100 pt-7 sm:grid-cols-2"
          >
            {PROMISES.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-slate-600">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  <Check size={11} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ── RIGHT COLUMN: Framed Hardware Showcase ── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.18 }}
          className="hidden lg:block"
        >
          <div className="relative">
            {/* Outer glow */}
            <div
              aria-hidden
              className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-blue-100/80 via-indigo-100/40 to-transparent blur-2xl"
            />
            {/* Device Bezel */}
            <div className="relative overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-white shadow-2xl shadow-slate-300/50 ring-1 ring-slate-100">
              {/* Browser chrome top bar */}
              <div className="flex items-center gap-2 border-b border-slate-200 bg-[#f5f5f7] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <div className="ml-3 flex flex-1 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1 text-[11px] text-slate-500">
                  <span className="text-emerald-600">🔒</span>
                  edge-node://dallas-hub.primevpsbd.com
                </div>
              </div>

              {/* Mode Switcher */}
              <div className="flex items-center gap-1 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                <button
                  type="button"
                  onClick={() => setActiveMode("isp")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    activeMode === "isp"
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Monitor size={13} /> Windows 11 RDP
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode("cloud")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    activeMode === "cloud"
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <span className="font-mono text-[10px]">$</span> Linux NVMe VPS
                </button>
              </div>

              {/* Datacenter Image Carousel */}
              <div className="relative h-52 overflow-hidden bg-slate-900">
                {SLIDES.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 50vw"
                    className={`object-cover transition-opacity duration-1000 ${
                      i === slide ? "opacity-90" : "opacity-0 pointer-events-none"
                    }`}
                  />
                ))}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-transparent to-transparent" />
                {/* Telemetry chips */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Ashburn US-East Tier-1
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                    <Zap size={10} className="text-amber-300" />
                    178ms · Dhaka Ping
                  </span>
                </div>
                {/* Slide dots */}
                <div className="absolute right-3 bottom-3 flex gap-1">
                  {SLIDES.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSlide(i)}
                      className={`h-1.5 rounded-full transition-all ${i === slide ? "w-5 bg-white" : "w-1.5 bg-white/40"}`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Info Panel */}
              <div className="p-5">
                {activeMode === "isp" ? (
                  <div className="space-y-3">
                    {/* Fraud Score */}
                    <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck size={20} className="text-emerald-600 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">IPQS Fraud Score</p>
                          <p className="text-[11px] text-slate-500">AT&T Fiber · Dallas, TX</p>
                        </div>
                      </div>
                      <span className="font-mono text-2xl font-black text-emerald-600">
                        0<span className="text-sm font-normal text-slate-400">/100</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-[11px]">
                      {["✓ No Proxy", "✓ No VPN", "✓ Zero Leak"].map((t) => (
                        <div key={t} className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-center">
                          <p className="font-semibold text-emerald-600">{t}</p>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/survey-vps"
                      className="group flex items-center justify-between rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-700"
                    >
                      <span>ISP Plans দেখুন — {formatPrice(2999)}/মাস</span>
                      <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      {[
                        { icon: Gauge, color: "text-blue-600", label: "AMD EPYC", sub: "3.2 GHz vCPU" },
                        { icon: HardDrive, color: "text-indigo-600", label: "NVMe Gen4", sub: "6,800 MB/s" },
                        { icon: Network, color: "text-emerald-600", label: "10 Gbps", sub: "Tier-1 Uplink" },
                        { icon: MapPin, color: "text-rose-500", label: "Ashburn VA", sub: "US-East Tier-3" },
                      ].map(({ icon: Icon, color, label, sub }) => (
                        <div key={label} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5">
                          <Icon size={14} className={`${color} shrink-0`} />
                          <div>
                            <p className="font-semibold text-slate-800">{label}</p>
                            <p className="text-slate-500">{sub}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/cloud-vps"
                      className="group flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800"
                    >
                      <span>Cloud NVMe কনফিগার করুন — {formatPrice(950)}/মাস</span>
                      <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
