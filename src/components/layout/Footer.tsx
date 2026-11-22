"use client";

import { CountryFlag } from "@/components/ui/CountryFlag";
import {
  BkashLogo,
  NagadLogo,
  UsdtLogo,
  VisaLogo,
} from "@/components/ui/PaymentLogos";
import {
  ArrowRight,
  ArrowUpRight,
  Headset,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const FOOTER_COLUMNS = [
  {
    title: "Servers & Plans",
    links: [
      { href: "/hot-deals", label: "Hot Deals", badge: "Hot" },
      { href: "/survey-vps", label: "Residential ISP RDP" },
      { href: "/cloud-vps", label: "High-Speed Cloud VPS" },
      { href: "/resellers", label: "Reseller Pricing" },
      { href: "/status", label: "Network Status SLA" },
    ],
  },
  {
    title: "Free Tools & Audit",
    links: [
      {
        href: "/tools/ip-checker",
        label: "IP Risk Checker",
        badge: "Free",
      },
      { href: "/tools/webrtc-test", label: "WebRTC Leak Test" },
      { href: "/tools/looking-glass", label: "Looking Glass Ping" },
      { href: "/blog", label: "Guides & Tutorials" },
    ],
  },
  {
    title: "Trust & Legal",
    links: [
      {
        href: "/legal/ip-replacement",
        label: "7-Day IP Swap",
        badge: "Guarantee",
      },
      { href: "/legal/terms", label: "Terms of Service" },
      { href: "/legal/privacy", label: "Privacy Policy" },
      { href: "/contact", label: "Dhaka Support Desk" },
      { href: "/login", label: "Client Area Login" },
    ],
  },
];

const ACTIVE_NODES = [
  { code: "us", city: "Dallas & Ashburn", isp: "AT&T / Comcast" },
  { code: "gb", city: "London, UK", isp: "BT / Virgin Media" },
  { code: "de", city: "Frankfurt, DE", isp: "Telekom / Vodafone" },
  { code: "fr", city: "Paris, FR", isp: "Orange / Free" },
];

export function Footer() {
  const whatsappNumber = (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801700000000"
  ).replace(/[^0-9]/g, "");

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello primavps, I need assistance or want to order a server.",
  )}`;

  return (
    <>
      {/* ─── 1. Pre-Footer Consultation Strip (Light Main App BG) ─── */}
      <section className="bg-white pt-6 pb-12 sm:pt-8 sm:pb-16">
        <div className="shell">
          <div className="flex flex-col justify-between gap-5 rounded-2xl border border-blue-100/90 bg-gradient-to-r from-[#eff5ff] via-[#f1f6ff] to-[#eaf2ff] px-6 py-5 sm:flex-row sm:items-center sm:px-8 sm:py-5.5 shadow-[0_2px_12px_rgba(37,99,235,0.04)]">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <Headset className="h-7 w-7 shrink-0 text-blue-600 sm:h-8 sm:w-8" />
              <div>
                <h3 className="font-display text-base font-bold text-slate-900 sm:text-lg">
                  Not sure which VPS you need?
                </h3>
                <p className="mt-0.5 text-xs text-slate-600 sm:text-sm">
                  Tell us what you&apos;re trying to run. We&apos;ll help you choose the right infrastructure.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2.5 sm:gap-3">
              <Link
                href="/survey-vps"
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-blue-500 active:scale-95 sm:text-sm"
              >
                <span>Get a VPS</span>
                <ArrowRight size={14} />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-200/90 bg-white px-4.5 py-2.5 text-xs font-semibold text-slate-700 shadow-xs transition-colors hover:border-blue-300 hover:bg-slate-50 hover:text-slate-900 active:scale-95 sm:text-sm"
              >
                <Headset size={15} className="text-slate-700" />
                <span>Talk to an Engineer</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Main Dark Footer ─── */}
      <footer className="border-t border-slate-800/90 bg-slate-950 text-slate-400">
        <div className="shell pt-12 pb-28 sm:pt-14 md:pb-8">
          {/* ─── Balanced 12-Column Main Grid ─── */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Left Brand & Direct Support (4 Columns) */}
          <div className="flex flex-col justify-between space-y-5 pr-0 lg:col-span-4 lg:pr-4">
            <div>
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="font-display text-xl font-black tracking-tight text-white transition-opacity hover:opacity-90"
                >
                  prima<span className="text-blue-500">vps</span>
                </Link>
                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                  ISP-First
                </span>
              </div>

              <p className="mt-2.5 text-xs leading-relaxed text-slate-400">
                US, UK, DE ও FR ডেডিকেটেড স্ট্যাটিক রেসিডেনশিয়াল ISP এবং ক্লাউড
                সার্ভার। সরাসরি বিকাশ ও নগদে পেমেন্ট, ৯০ সেকেন্ডে স্বয়ংক্রিয়
                ডেলিভারি।
              </p>

              {/* Real-time Uptime Status Pill */}
              <div className="mt-3.5">
                <Link
                  href="/status"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/15"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  <span>All Systems Operational (99.98%)</span>
                </Link>
              </div>
            </div>

            {/* Contact & WhatsApp */}
            <div className="space-y-2.5 border-t border-slate-800/70 pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600/95 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-emerald-500"
              >
                <FaWhatsapp size={15} />
                <span>২৪/৭ WhatsApp হেল্পলাইন</span>
                <ArrowUpRight size={13} className="text-emerald-200" />
              </a>

              <div className="space-y-1.5 pt-1 text-xs text-slate-400">
                <p className="flex items-center gap-2">
                  <MapPin size={13} className="shrink-0 text-blue-400" />
                  <span>Banani C/A, Dhaka 1213, Bangladesh</span>
                </p>
                <a
                  href="mailto:support@primavps.com"
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail size={13} className="shrink-0 text-blue-400" />
                  <span>support@primavps.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Navigation & Nodes Grid (8 Columns -> 4 Equal Sub-columns) */}
          <div className="grid grid-cols-2 gap-7 sm:grid-cols-4 lg:col-span-8">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-200">
                  {column.title}
                </h4>
                <ul className="mt-3.5 space-y-2.5 text-xs">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-slate-400 transition-colors hover:text-white"
                      >
                        <span className="transition-transform group-hover:translate-x-0.5">
                          {link.label}
                        </span>
                        {"badge" in link && link.badge && (
                          <span
                            className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold leading-none ${
                              link.badge === "Hot"
                                ? "border border-rose-500/30 bg-rose-500/15 text-rose-400"
                                : link.badge === "Free"
                                  ? "border border-blue-500/30 bg-blue-500/15 text-blue-400"
                                  : "border border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
                            }`}
                          >
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* 4th Right Sub-Column: Active Global ISP Nodes */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-200">
                Active ISP Nodes
              </h4>
              <ul className="mt-3.5 space-y-2.5 text-xs">
                {ACTIVE_NODES.map((node) => (
                  <li key={node.code}>
                    <Link
                      href="/survey-vps"
                      className="-mx-1 flex items-start gap-2 rounded-lg p-1 transition-colors hover:bg-slate-900"
                    >
                      <span className="mt-0.5 shrink-0">
                        <CountryFlag code={node.code} size={14} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-300 group-hover:text-white">
                          {node.city}
                        </p>
                        <p className="truncate text-[10px] text-slate-500">
                          {node.isp}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ─── 3. Clean, Authentic Payment Methods Strip ─── */}
        <div className="mt-9 flex flex-col gap-4 border-t border-slate-800/80 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-medium text-slate-400">
              নিরাপদ পেমেন্ট মেথড:
            </span>

            <div className="flex flex-wrap items-center gap-2">
              {/* bKash */}
              <div
                title="bKash Merchant Payment"
                className="flex h-8 items-center justify-center rounded-md border border-slate-200/10 bg-white px-2.5 shadow-2xs"
              >
                <BkashLogo className="h-5 w-auto" />
              </div>

              {/* Nagad */}
              <div
                title="Nagad Merchant Payment"
                className="flex h-8 items-center justify-center rounded-md border border-slate-200/10 bg-white px-2.5 shadow-2xs"
              >
                <NagadLogo className="h-5 w-auto" />
              </div>

              {/* Visa & Mastercard */}
              <div
                title="Visa & Mastercard"
                className="flex h-8 items-center justify-center rounded-md border border-slate-200/10 bg-white px-2.5 shadow-2xs"
              >
                <VisaLogo className="h-5 w-auto" />
              </div>

              {/* USDT Crypto */}
              <div
                title="USDT (TRC20 / BEP20)"
                className="flex h-8 items-center gap-1.5 rounded-md border border-slate-200/10 bg-white px-2.5 shadow-2xs"
              >
                <UsdtLogo className="h-4 w-auto" />
                <span className="text-[11px] font-bold tracking-tight text-slate-800">
                  USDT
                </span>
              </div>
            </div>
          </div>

          <p className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={15} className="shrink-0 text-emerald-400" />
            <span>99.98% Network SLA · Instant Auto-Provisioning</span>
          </p>
        </div>

        {/* ─── 4. Bottom Copyright & Socials ─── */}
        <div className="mt-5 flex flex-col items-center justify-between gap-4 border-t border-slate-800/60 pt-5 sm:flex-row">
          <p className="text-center text-xs text-slate-500 sm:text-left">
            © {new Date().getFullYear()} primavps.com · All rights reserved.
            Banani, Dhaka &amp; Dallas, TX.
          </p>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://facebook.com/primavps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-colors hover:text-blue-400"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="https://youtube.com/@primavps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="transition-colors hover:text-red-500"
            >
              <FaYoutube size={15} />
            </a>
            <a
              href="https://linkedin.com/company/primavps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-blue-500"
            >
              <FaLinkedinIn size={14} />
            </a>
            <a
              href="https://twitter.com/primavps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="transition-colors hover:text-sky-400"
            >
              <FaTwitter size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
