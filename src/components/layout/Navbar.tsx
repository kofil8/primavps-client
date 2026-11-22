"use client";

import { useCurrency } from "@/lib/currency";
import {
  Activity,
  ArrowRight,
  ChevronDown,
  Cpu,
  Flame,
  Home,
  LayoutGrid,
  Search,
  Server,
  ShieldCheck,
  Terminal,
  Users,
  Wrench,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const PRODUCT_LINKS = [
  {
    href: "/cloud-vps",
    title: "Cloud VPS",
    desc: "High-speed NVMe compute from ৳950/mo",
    icon: Cpu,
  },
  {
    href: "/survey-vps",
    title: "Residential ISP VPS",
    desc: "Clean 0/100 IPQS US/UK/EU IPs",
    icon: ShieldCheck,
    badge: "Popular",
  },
  {
    href: "/resellers",
    title: "Reseller Program",
    desc: "Volume discounts up to 20% for teams",
    icon: Users,
  },
];

const TOOL_LINKS = [
  {
    href: "/tools/ip-checker",
    title: "IP Fraud Checker",
    desc: "Check live IPQS & residential score",
    icon: Search,
  },
  {
    href: "/tools/webrtc-test",
    title: "WebRTC Leak Test",
    desc: "Verify zero real-IP or DNS exposure",
    icon: Activity,
  },
  {
    href: "/tools/looking-glass",
    title: "Looking Glass",
    desc: "Test live latency & routing ping",
    icon: Terminal,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileSheetOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const closeAll = () => {
    setOpenMenu(null);
    setMobileSheetOpen(false);
  };

  const navLinkClass =
    "rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100/80 hover:text-slate-900";

  const isHomeActive = pathname === "/" && !mobileSheetOpen;
  const isServersActive =
    (pathname?.startsWith("/survey-vps") ||
      pathname?.startsWith("/cloud-vps") ||
      pathname?.startsWith("/resellers")) &&
    !mobileSheetOpen;
  const isToolsActive = pathname?.startsWith("/tools") && !mobileSheetOpen;

  return (
    <>
      {/* ─── TOP HEADER (Desktop Full Nav + Mobile Minimal Brand & Currency) ─── */}
      <header className="relative z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div
          ref={navRef}
          className="shell flex h-14 md:h-16 items-center justify-between gap-4"
        >
          {/* 1. Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 focus-visible:outline-none"
            onClick={closeAll}
          >
            <span className="grid size-8 place-items-center rounded-lg bg-blue-600 text-white shadow-xs transition-transform group-hover:scale-105">
              <Server size={17} />
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-slate-900">
              prima<span className="text-blue-600">vps</span>
            </span>
          </Link>

          {/* 2. Desktop Center Navigation Links */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {/* Servers Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenMenu(openMenu === "products" ? null : "products")
                }
                aria-expanded={openMenu === "products"}
                className={`flex items-center gap-1.5 ${navLinkClass} ${
                  openMenu === "products" ? "bg-slate-100 text-slate-900" : ""
                }`}
              >
                <span>Servers</span>
                <ChevronDown
                  size={14}
                  className={`text-slate-400 transition-transform duration-200 ${
                    openMenu === "products" ? "rotate-180 text-slate-700" : ""
                  }`}
                />
              </button>

              {openMenu === "products" && (
                <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl border border-slate-200/90 bg-white p-2 shadow-xl shadow-slate-900/5 animate-fade-up">
                  {PRODUCT_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeAll}
                      className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                        <item.icon size={17} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <span className="mt-0.5 block text-xs text-slate-500">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Free Tools Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenMenu(openMenu === "tools" ? null : "tools")
                }
                aria-expanded={openMenu === "tools"}
                className={`flex items-center gap-1.5 ${navLinkClass} ${
                  openMenu === "tools" ? "bg-slate-100 text-slate-900" : ""
                }`}
              >
                <span>Free tools</span>
                <ChevronDown
                  size={14}
                  className={`text-slate-400 transition-transform duration-200 ${
                    openMenu === "tools" ? "rotate-180 text-slate-700" : ""
                  }`}
                />
              </button>

              {openMenu === "tools" && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl border border-slate-200/90 bg-white p-2 shadow-xl shadow-slate-900/5 animate-fade-up">
                  {TOOL_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeAll}
                      className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-50"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                        <item.icon size={15} />
                      </span>
                      <div>
                        <span className="block text-sm font-semibold text-slate-900">
                          {item.title}
                        </span>
                        <span className="block text-[11px] text-slate-500">
                          {item.desc}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/hot-deals"
              onClick={closeAll}
              className="group flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-50/80"
            >
              <Flame
                size={15}
                className="text-rose-500 transition-transform group-hover:scale-110"
              />
              <span>Hot Deals</span>
              <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[10px] font-extrabold tracking-wide text-rose-700">
                HOT
              </span>
            </Link>

            <Link href="/status" onClick={closeAll} className={navLinkClass}>
              Network
            </Link>
            <Link href="/blog" onClick={closeAll} className={navLinkClass}>
              Guides
            </Link>
          </nav>

          {/* 3. Desktop Right Controls */}
          <div className="hidden items-center gap-2.5 md:flex">
            <div
              className="inline-flex items-center rounded-lg border border-slate-200/90 bg-slate-100/70 p-0.5 text-xs font-semibold"
              role="group"
              aria-label="Currency selector"
            >
              <button
                type="button"
                onClick={() => setCurrency("BDT")}
                className={`rounded-md px-2.5 py-1 transition-all ${
                  currency === "BDT"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                ৳ BDT
              </button>
              <button
                type="button"
                onClick={() => setCurrency("USD")}
                className={`rounded-md px-2.5 py-1 transition-all ${
                  currency === "USD"
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                $ USD
              </button>
            </div>

            <Link
              href="/login"
              onClick={closeAll}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              Sign in
            </Link>

            <Link
              href="/survey-vps"
              onClick={closeAll}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-xs transition-all hover:bg-blue-700"
            >
              <span>Deploy server</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* 4. Mobile Top Right Controls (Clean Currency Pill + Sign in) */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setCurrency(currency === "BDT" ? "USD" : "BDT")}
              className="rounded-full border border-slate-200/90 bg-slate-50/90 px-3 py-1 text-xs font-bold text-slate-700 active:scale-95 transition-transform"
              aria-label={`Switch to ${currency === "BDT" ? "USD" : "BDT"}`}
            >
              {currency === "BDT" ? "৳ BDT" : "$ USD"}
            </button>
            <Link
              href="/login"
              onClick={closeAll}
              className="rounded-full border border-slate-200/90 bg-white px-3 py-1 text-xs font-semibold text-slate-800 active:scale-95 transition-transform"
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* ─── MOBILE GLASS SHEET OVERLAY (Opens when "More" tab is tapped) ─── */}
      {mobileSheetOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/25 backdrop-blur-xs md:hidden animate-fade-up"
          onClick={() => setMobileSheetOpen(false)}
        >
          <div
            className="fixed inset-x-3 bottom-24 z-50 max-h-[72vh] overflow-y-auto rounded-3xl border border-white/80 bg-white/85 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.18)] backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                All Services &amp; Tools
              </span>
              <button
                type="button"
                onClick={() => setMobileSheetOpen(false)}
                className="grid size-7 place-items-center rounded-full bg-slate-200/70 text-slate-700"
                aria-label="Close menu"
              >
                <X size={15} />
              </button>
            </div>

            <div className="mt-3 space-y-4">
              {/* Hot Deals Banner */}
              <Link
                href="/hot-deals"
                onClick={closeAll}
                className="flex items-center justify-between rounded-2xl border border-rose-200/80 bg-rose-500/10 px-3.5 py-2.5 text-sm font-bold text-rose-700"
              >
                <span className="flex items-center gap-2">
                  <Flame size={16} className="text-rose-600" />
                  Hot Deals &amp; Offers
                </span>
                <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-extrabold text-white">
                  SAVE 20%
                </span>
              </Link>

              {/* Servers Grid */}
              <div>
                <p className="px-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Servers
                </p>
                <div className="mt-1.5 grid grid-cols-1 gap-1.5">
                  {PRODUCT_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeAll}
                      className="flex items-center gap-3 rounded-2xl bg-white/70 p-2.5 border border-slate-200/50 active:scale-[0.99] transition-transform"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-blue-600/10 text-blue-600">
                        <item.icon size={16} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-900">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Free Tools */}
              <div>
                <p className="px-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Free Tools
                </p>
                <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                  {TOOL_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeAll}
                      className="flex flex-col items-center justify-center rounded-2xl bg-white/70 p-2.5 text-center border border-slate-200/50 active:scale-95 transition-transform"
                    >
                      <item.icon size={16} className="text-blue-600 mb-1" />
                      <span className="text-[11px] font-semibold text-slate-800 leading-tight">
                        {item.title
                          .replace(" Checker", "")
                          .replace(" Test", "")}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Links */}
              <div className="flex items-center justify-around border-t border-slate-200/60 pt-3 text-xs font-semibold text-slate-600">
                <Link href="/status" onClick={closeAll}>
                  Network Status
                </Link>
                <span className="text-slate-300">•</span>
                <Link href="/blog" onClick={closeAll}>
                  Guides
                </Link>
                <span className="text-slate-300">•</span>
                <Link href="/contact" onClick={closeAll}>
                  24/7 Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── IPHONE LIQUID GLASS FLOATING BOTTOM NAV BAR (Mobile Only) ─── */}
      <div className="pointer-events-none fixed inset-x-0 bottom-3 z-50 flex flex-col items-center px-4 pb-[env(safe-area-inset-bottom)] md:hidden">
        {/* Top Floating Quick-Action Pill */}
        <Link
          href="/survey-vps"
          onClick={closeAll}
          className="pointer-events-auto mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/75 px-3.5 py-1 text-[11px] font-bold text-slate-800 shadow-[0_8px_24px_rgba(15,23,42,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] backdrop-blur-xl transition-transform active:scale-95"
        >
          <span className="size-1.5 rounded-full bg-blue-600 animate-pulse-dot" />
          <span>Deploy Clean VPS</span>
          <ArrowRight size={11} className="text-blue-600" />
        </Link>

        {/* Main Frosted Glass Floating Dock */}
        <nav
          aria-label="Mobile bottom navigation"
          className="pointer-events-auto flex w-full max-w-[360px] items-center justify-between rounded-full border border-white/80 bg-white/70 p-1.5 shadow-[0_12px_36px_rgba(15,23,42,0.14),inset_0_1px_1.5px_rgba(255,255,255,0.95)] backdrop-blur-2xl"
        >
          {/* Tab 1: Home */}
          <Link
            href="/"
            onClick={closeAll}
            className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full py-2 text-[11px] font-semibold transition-all duration-200 active:scale-95 ${
              isHomeActive
                ? "bg-blue-600/12 text-blue-600 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Home
              size={19}
              strokeWidth={isHomeActive ? 2.4 : 1.9}
              className="transition-transform"
            />
            <span>Home</span>
          </Link>

          {/* Tab 2: Servers */}
          <Link
            href="/survey-vps"
            onClick={closeAll}
            className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full py-2 text-[11px] font-semibold transition-all duration-200 active:scale-95 ${
              isServersActive
                ? "bg-blue-600/12 text-blue-600 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Server size={19} strokeWidth={isServersActive ? 2.4 : 1.9} />
            <span>Servers</span>
          </Link>

          {/* Tab 3: Tools */}
          <Link
            href="/tools/ip-checker"
            onClick={closeAll}
            className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full py-2 text-[11px] font-semibold transition-all duration-200 active:scale-95 ${
              isToolsActive
                ? "bg-blue-600/12 text-blue-600 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Wrench size={19} strokeWidth={isToolsActive ? 2.4 : 1.9} />
            <span>Tools</span>
          </Link>

          {/* Tab 4: More / Menu Sheet */}
          <button
            type="button"
            onClick={() => setMobileSheetOpen(!mobileSheetOpen)}
            aria-expanded={mobileSheetOpen}
            className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full py-2 text-[11px] font-semibold transition-all duration-200 active:scale-95 ${
              mobileSheetOpen
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <LayoutGrid size={19} strokeWidth={mobileSheetOpen ? 2.4 : 1.9} />
            <span>More</span>
          </button>
        </nav>
      </div>
    </>
  );
}
