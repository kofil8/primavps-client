"use client";

import { useState } from "react";
import { useCurrency } from "@/lib/currency";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Cpu,
  Gauge,
  HardDrive,
  Lock,
  MapPin,
  MessageCircle,
  Monitor,
  Network,
  ShieldCheck,
  Tag,
  Terminal,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { BkashLogo, NagadLogo, VisaLogo, UsdtLogo } from "@/components/ui/PaymentLogos";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const ISP_PROMISES = [
  "IPQS Fraud Score: 0/100 গ্যারান্টি",
  "৭ দিনের ফ্রি IP রিপ্লেসমেন্ট",
  "AT&T / Comcast ডেডিকেটেড স্ট্যাটিক আইপি",
  "ঢাকা সাপোর্ট, গড় রেসপন্স ৩ মিনিট",
];

const CLOUD_PROMISES = [
  "AMD EPYC 3.2GHz & DDR5 ECC র্যাম",
  "PCIe Gen4 NVMe (6,800 MB/s Read)",
  "ফুল রুট ও ব্রাউজার VNC রিমোট কনসোল",
  "৯৯.৯৮% আপটাইম SLA ও ভ্যাট ইনভয়েস",
];

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

export function HeroSection() {
  const { formatPrice } = useCurrency();
  const reduceMotion = useReducedMotion();
  const [activeMode, setActiveMode] = useState<"isp" | "cloud">("isp");

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

      {/* Top Trust Bar - Clean static badges */}
      <div className="relative z-20 border-b border-slate-100 bg-slate-50/80 px-4 py-2 backdrop-blur-sm">
        <div className="shell flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1.5 font-bold text-blue-700">
              <Tag size={13} />
              কোড <span className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-[11px] text-blue-800">LAUNCH10</span>-এ ১০% ছাড়
            </span>
            <span className="hidden sm:inline-block h-3 w-px bg-slate-300" />
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
              <Zap size={13} className="text-amber-500" />
              &lt; ৬০ সেকেন্ডে অটো-ডেলিভারি
            </span>
            <span className="hidden md:inline-block h-3 w-px bg-slate-300" />
            <span className="hidden md:inline-flex items-center gap-1.5 font-medium text-slate-700">
              🇧🇩 বনানী অফিস ও ২৪/৭ লাইভ সাপোর্ট
            </span>
          </div>

          <Link
            href="https://wa.me/8801960677463?text=হ্যালো,%20আমি%20primevpsbd%20সার্ভার%20সম্পর্কে%20জানতে%20চাচ্ছি"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            সাপোর্ট হেল্পডেস্ক (গড় রিপ্লাই ৩ মিনিট)
          </Link>
        </div>
      </div>

      <div className="shell relative z-10 grid items-center gap-10 py-12 sm:py-16 lg:min-h-[85vh] lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-20 lg:pl-16 xl:pl-20">
        {/* ── LEFT COLUMN ── */}
        <motion.div
          variants={stagger}
          initial={reduceMotion ? false : "hidden"}
          animate="show"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            Residential ISP VPS · AT&amp;T / Comcast
          </div>

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

          {/* ── SUBHEADLINE (Dynamic based on activeMode) ── */}
          <motion.p
            key={activeMode}
            variants={rise}
            className="mt-6 max-w-[32rem] text-base leading-[1.75] text-slate-600 sm:text-[1.05rem]"
          >
            {activeMode === "isp" ? (
              <>
                AT&amp;T · Comcast রেসিডেন্সিয়াল IP — সার্ভে, ফ্রিল্যান্সিং ও
                পেপ্যাল অ্যাকাউন্টের জন্য{" "}
                <strong className="font-semibold text-slate-900">
                  100% ক্লিন US VPS
                </strong>
                , পেমেন্ট করুন{" "}
                <strong className="font-semibold text-pink-600">বিকাশ</strong> বা{" "}
                <strong className="font-semibold text-orange-500">নগদে</strong>।
              </>
            ) : (
              <>
                AMD EPYC · Gen4 NVMe 6,800 MB/s — ডকার, কাস্টম কার্নেল ও প্রোডাকশন
                অ্যাপের জন্য{" "}
                <strong className="font-semibold text-slate-900">
                  ডেডিকেটেড KVM ক্লাউড ইনফ্রাস্ট্রাকচার
                </strong>
                , পেমেন্ট করুন{" "}
                <strong className="font-semibold text-pink-600">বিকাশ</strong> বা{" "}
                <strong className="font-semibold text-orange-500">নগদে</strong>।
              </>
            )}
          </motion.p>

          {/* ── CTA BUTTONS ── */}
          <motion.div
            variants={rise}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            {activeMode === "isp" ? (
              <>
                {/* PRIMARY — Residential ISP */}
                <Link
                  href="/survey-vps"
                  className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/35 active:translate-y-0"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full"
                  />
                  <ShieldCheck size={18} className="shrink-0" />
                  ISP Plans দেখুন — {formatPrice(2999)}/মাস
                  <ArrowRight
                    size={16}
                    className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>

                {/* SECONDARY — Cloud VPS */}
                <button
                  type="button"
                  onClick={() => setActiveMode("cloud")}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-6 py-[0.9rem] text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 hover:shadow-md active:translate-y-0"
                >
                  <Zap size={15} className="shrink-0 text-indigo-500" />
                  Cloud NVMe দেখুন — {formatPrice(950)}/মাস
                </button>
              </>
            ) : (
              <>
                {/* PRIMARY — Cloud VPS */}
                <Link
                  href="/cloud-vps"
                  className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-slate-900 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/35 active:translate-y-0"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full"
                  />
                  <Zap size={18} className="shrink-0 text-amber-400" />
                  Cloud NVMe কনফিগার করুন — {formatPrice(950)}/মাস
                  <ArrowRight
                    size={16}
                    className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>

                {/* SECONDARY — Residential ISP */}
                <button
                  type="button"
                  onClick={() => setActiveMode("isp")}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-6 py-[0.9rem] text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 hover:shadow-md active:translate-y-0"
                >
                  <ShieldCheck size={15} className="shrink-0 text-blue-600" />
                  Residential ISP দেখুন — {formatPrice(2999)}/মাস
                </button>
              </>
            )}
          </motion.div>

          {/* Frictionless Micro-copy */}
          <motion.p variants={rise} className="mt-2.5 text-xs text-slate-500 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            কোনো ক্রেডিট কার্ড লাগবে না · বিকাশ বা নগদে পেমেন্টের ৬০ সেকেন্ডেই ইনস্ট্যান্ট অ্যাক্সেস
          </motion.p>

          {/* WhatsApp CTA & Mobile Follow Bar */}
          <motion.div variants={rise} className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="https://wa.me/8801960677463?text=হ্যালো,%20আমি%20Residential%20RDP%20/%20KVM%20VPS%20কেনার%20আগে%20কিছু%20তথ্য%20জানতে%20চাচ্ছি"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-emerald-700"
            >
              <MessageCircle size={16} className="text-emerald-500" />
              এখনই ইঞ্জিনিয়ারের সাথে কথা বলুন — ঢাকা টিম ৩ মিনিটে রিপ্লাই দেয়
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
            className="mt-6 flex flex-wrap items-center gap-2.5"
          >
            <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
              পেমেন্ট করুন:
            </span>
            <BkashLogo className="h-8 w-auto" />
            <NagadLogo className="h-8 w-auto" />
            <VisaLogo className="h-7 w-auto" />
            <UsdtLogo className="h-8 w-auto" />
          </motion.div>

          {/* ── PROMISE CHECKLIST ── */}
          <motion.ul
            variants={rise}
            className="mt-7 grid gap-2.5 border-t border-slate-100 pt-6 sm:grid-cols-2"
          >
            {(activeMode === "isp" ? ISP_PROMISES : CLOUD_PROMISES).map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-slate-600">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                  <Check size={11} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ── RIGHT COLUMN: Interactive Live Terminal / RDP Proof Showcase ── */}
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
              className={`absolute -inset-5 rounded-[2.5rem] blur-2xl transition-all duration-500 ${
                activeMode === "isp"
                  ? "bg-gradient-to-br from-blue-100/90 via-emerald-100/40 to-transparent"
                  : "bg-gradient-to-br from-indigo-100/90 via-slate-100/40 to-transparent"
              }`}
            />
            {/* Device Frame */}
            <div className="relative overflow-hidden rounded-[1.6rem] border border-slate-200/90 bg-white shadow-2xl shadow-slate-300/50 ring-1 ring-slate-100">
              {/* Browser chrome top bar */}
              <div className="flex items-center gap-2 border-b border-slate-200 bg-[#f5f5f7] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <div className="ml-3 flex flex-1 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1 font-mono text-[11px] text-slate-600">
                  <span className="text-emerald-600">🔒</span>
                  {activeMode === "isp"
                    ? "edge-node://dallas-hub.primevpsbd.com:3389"
                    : "ssh-node://ashburn-kvm-01.primevpsbd.com:22"}
                </div>
              </div>

              {/* Mode Switcher Tabs inside frame */}
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
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <span className="font-mono text-[10px]">$</span> Linux NVMe KVM
                </button>

                <div className="ml-auto flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  LIVE PREVIEW
                </div>
              </div>

              {/* Dynamic Interactive Preview Canvas (No generic stock image!) */}
              {activeMode === "isp" ? (
                <div className="relative overflow-hidden bg-slate-950 p-5 font-mono text-xs select-none">
                  {/* Subtle matrix backdrop */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b22_1px,transparent_1px),linear-gradient(to_bottom,#1e293b22_1px,transparent_1px)] bg-[size:16px_16px]" />

                  <div className="relative z-10 space-y-4">
                    {/* Node status bar */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-emerald-400" /> Dallas US-Central (AT&amp;T Fiber)
                      </span>
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                        <Zap size={10} className="text-amber-300" /> 178ms Dhaka
                      </span>
                    </div>

                    {/* Fraud Score Card */}
                    <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-4 shadow-lg shadow-emerald-950/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                            <ShieldCheck size={26} className="text-emerald-400" />
                          </div>
                          <div>
                            <p className="font-sans text-xs font-bold text-white">IPQS Fraud Risk: 0/100</p>
                            <p className="font-sans text-[11px] text-slate-400">AT&amp;T U-verse · ASN: AS7018</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="rounded-full bg-emerald-400/20 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-300 border border-emerald-400/30">
                            100% CLEAN
                          </span>
                        </div>
                      </div>

                      <div className="mt-3.5 pt-3 border-t border-emerald-800/40 grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                        <div>ASN Type: <span className="text-white font-bold">ISP / Residential</span></div>
                        <div>WebRTC Leak: <span className="text-emerald-400 font-bold">0% (Shielded)</span></div>
                        <div>Proxy / VPN: <span className="text-emerald-400 font-bold">Undetected</span></div>
                        <div>IP Status: <span className="text-white font-bold">Dedicated Static</span></div>
                      </div>
                    </div>

                    {/* Windows 11 RDP Controls */}
                    <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Remote Desktop: Windows 11 Pro</span>
                        <span className="text-slate-300">60 FPS · Hardware Accelerated</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative overflow-hidden bg-slate-950 p-5 font-mono text-xs select-none">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b22_1px,transparent_1px),linear-gradient(to_bottom,#1e293b22_1px,transparent_1px)] bg-[size:16px_16px]" />

                  <div className="relative z-10 space-y-3.5">
                    {/* Ashburn node bar */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-indigo-400" /> Ashburn US-East Tier-1 Node
                      </span>
                      <span className="inline-flex items-center gap-1 rounded bg-indigo-500/15 px-2 py-0.5 text-[10px] font-bold text-indigo-300">
                        <Zap size={10} className="text-amber-300" /> 188ms Dhaka
                      </span>
                    </div>

                    {/* Terminal Benchmark Output (yabs preview) */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 font-mono text-[11px] space-y-2 text-slate-300">
                      <div className="text-indigo-400 font-bold flex items-center gap-2">
                        <Terminal size={13} />
                        root@ashburn-vps-01:~# yabs.sh --benchmark
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Processor:</span>
                          <span className="text-white font-semibold">AMD EPYC 7763 (3.24 GHz)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">RAM:</span>
                          <span className="text-emerald-400 font-semibold">DDR5 ECC Dedicated Memory</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">NVMe Read:</span>
                          <span className="text-emerald-400 font-semibold">6,840 MB/s (Gen4 RAID-1)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Uplink:</span>
                          <span className="text-white font-semibold">10 Gbps Tier-1 Redundant</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Virtualization:</span>
                          <span className="text-indigo-300 font-semibold">KVM (Full Root Access)</span>
                        </div>
                      </div>
                    </div>

                    {/* Features grid */}
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-2 text-slate-300">
                        ✓ Docker / K8s
                      </div>
                      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-2 text-slate-300">
                        ✓ Custom Kernel
                      </div>
                      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-2 text-slate-300">
                        ✓ Anti-DDoS
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action trigger footer inside card */}
              <div className="p-4 bg-white border-t border-slate-100">
                {activeMode === "isp" ? (
                  <Link
                    href="/survey-vps"
                    className="group flex items-center justify-between rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-700"
                  >
                    <span>ISP Plans দেখুন — {formatPrice(2999)}/মাস</span>
                    <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ) : (
                  <Link
                    href="/cloud-vps"
                    className="group flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800"
                  >
                    <span>Cloud NVMe কনফিগার করুন — {formatPrice(950)}/মাস</span>
                    <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
