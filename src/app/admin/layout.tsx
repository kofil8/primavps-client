"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Menu, ShieldAlert, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Ops Command Center",
  "/admin/orders": "Orders & Provisioning Queue",
  "/admin/ip-swaps": "IP Swap Requests",
  "/admin/users": "Clients & Resellers",
  "/admin/tickets": "Support Desk",
  "/admin/isp-vps": "ISP VPS Plans & Stock",
  "/admin/cloud-vps": "Cloud VPS Regions, OS & Rates",
  "/admin/coupons": "Coupons & Promotions",
  "/admin/blog": "Blog & Guides CMS",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const pageTitle = PAGE_TITLES[pathname || "/admin"] || "Admin Operations";

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-800 lg:block">
        <div className="sticky top-0 h-screen">
          <AdminSidebar />
        </div>
      </aside>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs lg:hidden"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="relative h-full w-64 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close sidebar"
              className="absolute top-3.5 right-3 z-10 grid size-7 cursor-pointer place-items-center rounded-lg bg-slate-800 text-slate-300"
            >
              <X size={15} />
            </button>
            <AdminSidebar onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200/90 bg-white/95 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="grid size-8 cursor-pointer place-items-center rounded-lg border border-slate-200 text-slate-700 lg:hidden"
            >
              <Menu size={16} />
            </button>
            <h1 className="font-display text-sm font-extrabold text-slate-900 sm:text-base">
              {pageTitle}
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 sm:inline-flex">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
              Banani Ops Desk · Live
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-2.5 py-1 font-mono text-[11px] font-bold text-amber-300">
              <ShieldAlert size={12} />
              ADMIN
            </span>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}