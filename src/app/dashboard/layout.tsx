"use client";

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Menu, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Desktop Fixed Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200/90 bg-white lg:block">
        <DashboardSidebar />
      </aside>

      {/* Mobile & Tablet Top Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200/90 bg-white/95 px-4 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open portal menu"
            className="grid size-9 cursor-pointer place-items-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            <Menu size={18} />
          </button>
          <Link
            href="/dashboard"
            className="font-display text-lg font-black tracking-tight text-slate-900"
          >
            prima<span className="text-blue-600">vps</span>
          </Link>
        </div>

        <Link
          href="/isp-vps"
          className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white"
        >
          <Plus size={14} />
          <span>New VPS</span>
        </Link>
      </header>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div
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
              aria-label="Close portal menu"
              className="absolute top-3.5 right-3 grid size-8 cursor-pointer place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
            >
              <X size={17} />
            </button>
            <DashboardSidebar onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}