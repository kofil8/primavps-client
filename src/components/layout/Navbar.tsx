"use client";

import { useCurrency } from "@/lib/currency";
import {
  Activity,
  ArrowRight,
  ChevronDown,
  Cpu,
  Menu,
  Search,
  Server,
  ShieldCheck,
  Terminal,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const PRODUCT_LINKS = [
  {
    href: "/cloud-vps",
    title: "Cloud VPS",
    desc: "NVMe compute from ৳950/mo",
    icon: Cpu,
  },
  {
    href: "/survey-vps",
    title: "Residential ISP",
    desc: "Clean US IPs from ৳2,999/mo",
    icon: ShieldCheck,
  },
  {
    href: "/resellers",
    title: "Resellers",
    desc: "Volume pricing for teams",
    icon: Users,
  },
];

const TOOL_LINKS = [
  { href: "/tools/ip-checker", title: "IP fraud checker", icon: Search },
  { href: "/tools/webrtc-test", title: "WebRTC leak test", icon: Activity },
  { href: "/tools/looking-glass", title: "Looking glass", icon: Terminal },
];

const MOBILE_LINKS = [
  { href: "/cloud-vps", label: "Cloud VPS" },
  { href: "/survey-vps", label: "Residential ISP" },
  { href: "/resellers", label: "Resellers" },
  { href: "/status", label: "Network status" },
  { href: "/blog", label: "Guides" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const { currency, setCurrency } = useCurrency();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
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
        setMobileOpen(false);
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
    setMobileOpen(false);
  };

  const navLink =
    "rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div
        ref={navRef}
        className="shell flex h-16 items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2" onClick={closeAll}>
            <span className="grid size-8 place-items-center rounded-lg bg-blue-600 text-white">
              <Server size={17} />
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-slate-900">
              primevpsbd
            </span>
          </Link>
          <Link
            href="/status"
            className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 sm:inline-flex"
          >
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
            All systems normal
          </Link>
        </div>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setOpenMenu(openMenu === "products" ? null : "products")
              }
              aria-expanded={openMenu === "products"}
              className={`flex items-center gap-1 ${navLink}`}
            >
              Servers
              <ChevronDown
                size={14}
                className={`transition-transform ${
                  openMenu === "products" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openMenu === "products" && (
              <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                {PRODUCT_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeAll}
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                      <item.icon size={16} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-slate-900">
                        {item.title}
                      </span>
                      <span className="block text-xs text-slate-500">
                        {item.desc}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === "tools" ? null : "tools")}
              aria-expanded={openMenu === "tools"}
              className={`flex items-center gap-1 ${navLink}`}
            >
              Free tools
              <ChevronDown
                size={14}
                className={`transition-transform ${
                  openMenu === "tools" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openMenu === "tools" && (
              <div className="absolute top-full left-0 mt-2 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                {TOOL_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeAll}
                    className="flex items-center gap-3 rounded-xl p-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <item.icon size={16} className="text-blue-600" />
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/status" className={navLink}>
            Network
          </Link>
          <Link href="/blog" className={navLink}>
            Guides
          </Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => setCurrency("BDT")}
              className={`rounded-md px-2 py-1 transition-colors ${
                currency === "BDT"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              ৳ BDT
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`rounded-md px-2 py-1 transition-colors ${
                currency === "USD"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              $ USD
            </button>
          </div>
          <Link href="/login" className="btn-quiet">
            Sign in
          </Link>
          <Link href="/cloud-vps" className="btn-primary">
            Deploy server
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setCurrency(currency === "BDT" ? "USD" : "BDT")}
            className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700"
            aria-label={`Switch to ${currency === "BDT" ? "USD" : "BDT"}`}
          >
            {currency === "BDT" ? "৳ BDT" : "$ USD"}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="grid size-10 place-items-center rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="space-y-1" aria-label="Mobile">
            {MOBILE_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeAll}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 grid gap-2 border-t border-slate-100 pt-4">
            <Link href="/login" onClick={closeAll} className="btn-outline">
              Sign in
            </Link>
            <Link href="/cloud-vps" onClick={closeAll} className="btn-primary">
              Deploy server
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
