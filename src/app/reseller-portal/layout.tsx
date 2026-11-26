"use client";

import { ResellerSidebar } from "@/components/reseller/ResellerSidebar";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useCurrency } from "@/lib/currency";
import { Layers, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const RESELLER_TITLES: Record<string, string> = {
  "/reseller-portal": "এজেন্সি ওভারভিউ",
  "/reseller-portal/deploy": "বাল্ক সার্ভার ডিপ্লয়",
  "/reseller-portal/servers": "ফ্লিট সার্ভার ম্যানেজমেন্ট",
  "/reseller-portal/clients": "সাব-ক্লায়েন্ট ম্যানেজমেন্ট",
  "/reseller-portal/wallet": "প্রিপেইড ওয়ালেট ও লেজার",
  "/reseller-portal/api": "API কী ও হোয়াইট-লেবেল",
};

export default function ResellerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!drawerOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [drawerOpen]);

  const title = (pathname && RESELLER_TITLES[pathname]) || "রিসেলার পোর্টাল";

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900">
      {/* Desktop Fixed Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 hidden border-r border-slate-200/90 bg-white transition-[width] duration-200 lg:block ${
          sidebarCollapsed ? "w-[72px]" : "w-64"
        }`}
      >
        <ResellerSidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        />
      </aside>

      {/* Mobile & Tablet Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200/90 bg-white/95 px-4 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open reseller menu"
            className="grid size-9 cursor-pointer place-items-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            <Menu size={18} />
          </button>
          <Link href="/reseller-portal">
            <BrandLogo theme="light" size="sm" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrency(currency === "BDT" ? "USD" : "BDT")}
            className="cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] font-bold text-slate-700"
          >
            {currency === "BDT" ? "৳ BDT" : "$ USD"}
          </button>
          <Link
            href="/reseller-portal/deploy"
            className="inline-flex items-center gap-1 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700"
          >
            <Layers size={13} />
            <span>Bulk Deploy</span>
          </Link>
        </div>
      </header>

      {/* Desktop Top Utility Bar */}
      <header
        className={`sticky top-0 z-20 hidden h-15 items-center justify-between border-b border-slate-200/80 bg-white/90 px-8 backdrop-blur-md transition-[padding] duration-200 lg:flex ${
          sidebarCollapsed ? "lg:pl-[104px]" : "lg:pl-72"
        }`}
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/reseller-portal" className="hover:text-slate-900">
            Reseller Portal
          </Link>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-slate-900">{title}</span>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="inline-flex items-center rounded-lg border border-slate-200/90 bg-slate-100/70 p-0.5 text-xs font-semibold"
            role="group"
            aria-label="Currency selector"
          >
            <button
              type="button"
              onClick={() => setCurrency("BDT")}
              className={`cursor-pointer rounded-md px-2.5 py-1 transition-all ${
                currency === "BDT"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              ৳ BDT
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`cursor-pointer rounded-md px-2.5 py-1 transition-all ${
                currency === "USD"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              $ USD
            </button>
          </div>

          <Link
            href="/reseller-portal/deploy"
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-indigo-700"
          >
            <Layers size={14} />
            <span>Bulk Deploy</span>
          </Link>
        </div>
      </header>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Reseller navigation drawer"
          className="fixed inset-0 z-50 flex bg-slate-950/50 backdrop-blur-xs lg:hidden"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="relative h-full w-72 max-w-[82vw] bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close reseller menu"
              className="absolute top-3.5 right-3 z-10 grid size-8 cursor-pointer place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
            >
              <X size={17} />
            </button>
            <ResellerSidebar
              isMobileDrawer
              onNavigate={() => setDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main
        className={`transition-[padding] duration-200 ${
          sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-64"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}