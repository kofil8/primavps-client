"use client";

import {
  BkashLogo,
  NagadLogo,
  UsdtLogo,
  VisaLogo,
} from "@/components/ui/PaymentLogos";
import { ArrowRight, ArrowUpRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { BrandLogo } from "../ui/BrandLogo";

const FOOTER_COLUMNS = [
  {
    title: "Servers & Plans",
    links: [
      { href: "/survey-vps", label: "Residential ISP RDP" },
      { href: "/hot-deals", label: "Hot Deals" },
      { href: "/cloud-vps", label: "High-Speed Cloud VPS" },
      { href: "/resellers", label: "Reseller Pricing" },
    ],
  },
  {
    title: "Free Tools",
    links: [
      { href: "/tools/ip-checker", label: "IP Risk Checker" },
      { href: "/tools/webrtc-test", label: "WebRTC Leak Test" },
      { href: "/tools/looking-glass", label: "Looking Glass Ping" },
      { href: "/blog", label: "Guides & Tutorials" },
    ],
  },
  {
    title: "Trust & Legal",
    links: [
      { href: "/legal/ip-replacement", label: "7-Day IP Swap Policy" },
      { href: "/legal/terms", label: "Terms of Service" },
      { href: "/legal/privacy", label: "Privacy Policy" },
      { href: "/login", label: "Client Area Login" },
    ],
  },
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
      {/* ─── 1. Compact Bengali Pre-Footer CTA Strip ─── */}
      <section className="bg-white py-10 sm:py-14">
        <div className="shell">
          <div className="flex flex-col justify-between gap-5 rounded-2xl border border-blue-100 bg-gradient-to-r from-[#eff5ff] via-[#f4f8ff] to-[#eaf2ff] px-6 py-6 lg:flex-row lg:items-center sm:items-center sm:px-8">
            <div>
              <h3 className="font-display text-lg font-extrabold text-slate-900 sm:text-xl">
                ক্লিন রেসিডেন্সিয়াল ISP VPS নিয়ে কাজ শুরু করতে প্রস্তুত?
              </h3>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                বিকাশ বা নগদে পেমেন্ট করুন—৯০ সেকেন্ডেই আপনার ডেডিকেটেড Windows
                11 RDP রেডি।
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2.5 sm:gap-3">
              <Link
                href="/survey-vps"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-700 active:scale-95 sm:text-sm"
              >
                <span>প্ল্যান দেখুন</span>
                <ArrowRight size={14} />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4.5 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition-colors hover:border-slate-400 hover:bg-slate-50 active:scale-95 sm:text-sm"
              >
                <FaWhatsapp size={15} className="text-emerald-600" />
                <span>WhatsApp সাপোর্ট</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Clean 4-Column Dark Footer ─── */}
      <footer className="border-t border-slate-800/90 bg-slate-950 text-slate-400">
        <div className="shell pt-12 pb-32 md:pb-10 sm:pt-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Left: Brand & Direct Support (5 Columns) */}
            <div className="space-y-4 lg:col-span-5 lg:pr-8">
              <Link
                href="/"
                aria-label="primavps home"
                className="group inline-flex items-center transition-opacity hover:opacity-95"
              >
                <BrandLogo theme="dark" size="lg" />
              </Link>

              <p className="max-w-sm text-xs leading-relaxed text-slate-400">
                US, UK, DE ও FR ডেডিকেটেড স্ট্যাটিক রেসিডেন্সিয়াল ISP এবং
                ক্লাউড সার্ভার। সরাসরি বিকাশ ও নগদে পেমেন্ট, ৯০ সেকেন্ডে
                অটো-ডেলিভারি।
              </p>

              {/* Status + WhatsApp Row */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <Link
                  href="/status"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/15"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span>All Systems Operational (99.98%)</span>
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/95 px-3 py-1 text-[11px] font-bold text-white transition-colors hover:bg-emerald-500"
                >
                  <FaWhatsapp size={13} />
                  <span>২৪/৭ WhatsApp</span>
                  <ArrowUpRight size={12} className="text-emerald-200" />
                </a>
              </div>

              {/* Contact Details */}
              <div className="space-y-1.5 pt-2 text-xs text-slate-400">
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

            {/* Right: 3 Navigation Columns + Payment Methods below them (7 Columns) */}
            <div className="flex flex-col justify-between gap-8 lg:col-span-7">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
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
                            className="text-slate-400 transition-colors hover:text-white"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Payment Methods — Cleanly aligned above the bottom divider */}
              <div className="flex flex-wrap items-center gap-3 border-t border-slate-800/60 pt-5">
                <span className="text-[11px] font-medium text-slate-500">
                  নিরাপদ পেমেন্ট:
                </span>
                <div className="flex flex-wrap items-center gap-2 opacity-85 transition-opacity hover:opacity-100">
                  <div
                    title="bKash Merchant Payment"
                    className="rounded-md bg-slate-100/95 px-2 py-1"
                  >
                    <BkashLogo className="h-3.5 w-auto" />
                  </div>
                  <div
                    title="Nagad Merchant Payment"
                    className="rounded-md bg-slate-100/95 px-2 py-1"
                  >
                    <NagadLogo className="h-3.5 w-auto" />
                  </div>
                  <div
                    title="Visa & Mastercard"
                    className="rounded-md bg-slate-100/95 px-2 py-1"
                  >
                    <VisaLogo className="h-3.5 w-auto" />
                  </div>
                  <div
                    title="USDT (TRC20 / BEP20)"
                    className="rounded-md bg-slate-100/95 px-2 py-1"
                  >
                    <UsdtLogo className="h-3.5 w-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── 3. Minimal Bottom Bar (Copyright + Socials) ─── */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-6 sm:flex-row">
            <p className="text-center text-xs text-slate-500 sm:text-left">
              © {new Date().getFullYear()} primavps.com · All rights reserved.
              Banani, Dhaka &amp; Ashburn, VA.
            </p>

            <div className="flex items-center gap-4 text-slate-400">
              <a
                href="https://facebook.com/primavps"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="primavps on Facebook"
                className="transition-colors hover:text-blue-400"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://youtube.com/@primavps"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="primavps on YouTube"
                className="transition-colors hover:text-red-500"
              >
                <FaYoutube size={15} />
              </a>
              <a
                href="https://linkedin.com/company/primavps"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="primavps on LinkedIn"
                className="transition-colors hover:text-blue-500"
              >
                <FaLinkedinIn size={14} />
              </a>
              <a
                href="https://twitter.com/primavps"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="primavps on Twitter"
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
