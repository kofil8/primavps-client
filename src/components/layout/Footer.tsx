"use client";

import {
  BkashLogo,
  NagadLogo,
  RocketLogo,
  SslcommerzLogo,
  VisaLogo,
} from "@/components/ui/PaymentLogos";
import { COMPANY_INFO } from "@/lib/config/company";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BrandLogo } from "../ui/BrandLogo";

const FOOTER_COLUMNS = [
  {
    title: "Servers & Plans",
    links: [
      { href: "/isp-vps", label: "Dedicated ISP VPS" },
      { href: "/cloud-vps", label: "High-Speed Cloud VPS" },
      { href: "/hot-deals", label: "Hot Deals & Offers" },
      { href: "/resellers", label: "Reseller Program" },
      { href: "/login", label: "Client Area Login" },
    ],
  },
  {
    title: "Locations",
    links: [
      { href: "/isp-vps?country=us", label: "United States (AT&T / Comcast)" },
      { href: "/isp-vps?country=uk", label: "United Kingdom (BT / Virgin)" },
      { href: "/isp-vps?country=de", label: "Germany (Telekom)" },
      { href: "/isp-vps?country=fr", label: "France (Orange / Free)" },
      { href: "/status", label: "Network Status (99.98%)" },
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
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact Support" },
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/refund-policy", label: "Refund & Return Policy" },
      { href: "/terms#aup", label: "Report Abuse / AUP" },
    ],
  },
] as const;

const SOCIAL_LINKS = [
  {
    href: "https://facebook.com/primavps",
    label: "primavps on Facebook",
    icon: FaFacebookF,
    size: 14,
    brandClass: "bg-[#1877F2] text-white hover:bg-[#166FE5]",
  },
  {
    href: "https://x.com/primavps",
    label: "primavps on X",
    icon: FaXTwitter,
    size: 14,
    brandClass: "bg-black text-white ring-1 ring-white/20 hover:bg-neutral-900",
  },
  {
    href: "https://linkedin.com/company/primavps",
    label: "primavps on LinkedIn",
    icon: FaLinkedinIn,
    size: 14,
    brandClass: "bg-[#0A66C2] text-white hover:bg-[#0958A8]",
  },
  {
    href: "https://youtube.com/@primavps",
    label: "primavps on YouTube",
    icon: FaYoutube,
    size: 15,
    brandClass: "bg-[#FF0000] text-white hover:bg-[#E60000]",
  },
] as const;

const PAYMENT_BADGES = [
  { title: "bKash", node: <BkashLogo className="h-3.5 w-auto" /> },
  { title: "Nagad", node: <NagadLogo className="h-3.5 w-auto" /> },
  { title: "DBBL Rocket", node: <RocketLogo className="h-3.5 w-auto" /> },
  { title: "Visa & Mastercard", node: <VisaLogo className="h-3.5 w-auto" /> },
  {
    title: "SSLCOMMERZ Secured",
    node: <SslcommerzLogo className="h-3.5 w-auto" />,
  },
];

const HIDDEN_CTA_ROUTES = ["/login", "/register", "/checkout", "/dashboard"];

export function Footer() {
  const pathname = usePathname();
  const hidePreFooter = HIDDEN_CTA_ROUTES.some(
    (route) => pathname === route || pathname?.startsWith(`${route}/`),
  );

  return (
    <>
      {/* ─── Pre-Footer CTA Strip (Hidden on Auth/Checkout) ─── */}
      {!hidePreFooter && (
        <section className="bg-white py-10 sm:py-14">
          <div className="shell">
            <div className="flex flex-col justify-between gap-5 rounded-2xl border border-blue-100 bg-gradient-to-r from-[#eff5ff] via-[#f4f8ff] to-[#eaf2ff] px-6 py-6 sm:px-8 lg:flex-row lg:items-center">
              <div>
                <h2 className="font-display text-lg font-extrabold text-slate-900 sm:text-xl">
                  ক্লিন রেসিডেন্সিয়াল ISP VPS নিয়ে কাজ শুরু করতে প্রস্তুত?
                </h2>
                <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                  বিকাশ বা নগদে পেমেন্ট করুন—৯০ সেকেন্ডেই আপনার ডেডিকেটেড
                  Windows 11 RDP রেডি।
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2.5 sm:gap-3">
                <Link
                  href="/isp-vps"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-all hover:bg-blue-700 active:scale-95 sm:text-sm"
                >
                  <span>প্ল্যান দেখুন</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
                <a
                  href={COMPANY_INFO.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4.5 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition-colors hover:border-slate-400 hover:bg-slate-50 active:scale-95 sm:text-sm"
                >
                  <FaWhatsapp
                    size={15}
                    className="text-emerald-600"
                    aria-hidden="true"
                  />
                  <span>WhatsApp সাপোর্ট</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Enterprise 3-Tier Dark Footer ─── */}
      <footer className="border-t border-white/10 bg-[#060913] text-slate-400">
        <div className="shell pt-14 pb-28 md:pb-10">
          {/* ── TIER 1: Brand/Contact + 4 Balanced Link Columns ── */}
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Brand & Direct Contact (4 cols) */}
            <div className="space-y-5 lg:col-span-4 lg:pr-6">
              <Link
                href="/"
                aria-label="primavps home"
                className="inline-flex items-center transition-opacity hover:opacity-90"
              >
                <BrandLogo theme="dark" size="lg" />
              </Link>

              <p className="max-w-xs text-[13px] leading-relaxed text-slate-400">
                Dedicated US, UK, DE &amp; FR static residential ISP and
                high-speed cloud servers. Instant delivery with local bKash,
                Nagad &amp; card payments.
              </p>

              {/* Clean Monochrome Contact List (Zero Badge Clutter) */}
              <address className="space-y-2.5 text-[13px] text-slate-400 not-italic">
                <p className="flex items-start gap-2.5">
                  <MapPin
                    size={14}
                    className="mt-0.5 shrink-0 text-slate-500"
                    aria-hidden="true"
                  />
                  <span>{COMPANY_INFO.address.fullEn}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone
                    size={14}
                    className="shrink-0 text-slate-500"
                    aria-hidden="true"
                  />
                  <a
                    href={`tel:${COMPANY_INFO.contact.phoneTel}`}
                    className="transition-colors hover:text-white"
                  >
                    {COMPANY_INFO.contact.phoneDisplay}
                  </a>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail
                    size={14}
                    className="shrink-0 text-slate-500"
                    aria-hidden="true"
                  />
                  <a
                    href={`mailto:${COMPANY_INFO.contact.supportEmail}`}
                    className="transition-colors hover:text-white"
                  >
                    {COMPANY_INFO.contact.supportEmail}
                  </a>
                </p>
              </address>

              {/* Social Icons Row — Clean spacing & hover feedback */}
              <div className="flex items-center gap-2.5 pt-2">
                {SOCIAL_LINKS.map(
                  ({ href, label, icon: Icon, size, brandClass }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`grid size-8 place-items-center rounded-lg shadow-xs transition-transform hover:-translate-y-0.5 ${brandClass}`}
                    >
                      <Icon size={size} aria-hidden="true" />
                    </a>
                  ),
                )}
                <a
                  href={COMPANY_INFO.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="primavps on WhatsApp"
                  className="grid size-8 place-items-center rounded-lg bg-[#25D366] text-white shadow-xs transition-transform hover:-translate-y-0.5 hover:bg-[#20BD5A]"
                >
                  <FaWhatsapp size={15} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* 4 Balanced Navigation Columns (8 cols) */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
              {FOOTER_COLUMNS.map((column) => (
                <nav key={column.title} aria-label={column.title}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                    {column.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-[13px]">
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
                </nav>
              ))}
            </div>
          </div>

          {/* ── TIER 2: Full-Width Verification & Payment Strip (Limda/CleanProxies Style) ── */}
          <div className="mt-12 flex flex-col justify-between gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center">
            {/* Left: Official Business Credentials */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Verified Registered Business (Bangladesh)
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-300">
                <span>
                  Trade License:{" "}
                  <strong className="font-mono font-semibold text-white">
                    {COMPANY_INFO.tradeLicenseNo}
                  </strong>
                </span>
                <span className="hidden h-3 w-px bg-white/15 sm:inline-block" />
                <span>
                  DBID:{" "}
                  <strong className="font-mono font-semibold text-white">
                    {COMPANY_INFO.dbidNo}
                  </strong>
                </span>
              </div>
            </div>

            {/* Right: Accepted Payment Methods */}
            <div className="mt-2.5 flex flex-wrap items-center gap-2 lg:justify-end">
              {PAYMENT_BADGES.map((item) => (
                <div
                  key={item.title}
                  title={item.title}
                  className="inline-flex h-7.5 items-center justify-center rounded border border-white/10 bg-slate-100/95 px-2.5 opacity-90 transition-opacity hover:opacity-100"
                >
                  {item.node}
                </div>
              ))}
            </div>
          </div>

          {/* ── TIER 3: Clean Legal & Copyright Bottom Bar ── */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} {COMPANY_INFO.legalNameEn} (
              {COMPANY_INFO.brandName}). All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <Link
                href="/terms"
                className="transition-colors hover:text-white"
              >
                Terms
              </Link>
              <Link
                href="/privacy-policy"
                className="transition-colors hover:text-white"
              >
                Privacy
              </Link>
              <Link
                href="/refund-policy"
                className="transition-colors hover:text-white"
              >
                Refund Policy
              </Link>
              <Link
                href="/terms#aup"
                className="transition-colors hover:text-white"
              >
                AUP
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
