"use client";

import { BrandLogo } from "@/components/ui/BrandLogo";
import {
  Cpu,
  CreditCard,
  ExternalLink,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  PanelLeftOpen,
  Server,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

const MAIN_NAV = [
  { href: "/dashboard", label: "ওভারভিউ", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/services", label: "আমার সার্ভার", icon: Server },
  { href: "/dashboard/invoices", label: "ইনভয়েস ও বিল", icon: CreditCard },
  { href: "/dashboard/support", label: "সাপোর্ট টিকিট", icon: LifeBuoy },
  { href: "/dashboard/settings", label: "সেটিংস", icon: Settings },
];

const DEPLOY_NAV = [
  {
    href: "/dashboard/isp-vps",
    label: "ISP Residential VPS",
    badge: "RDP",
    icon: ShieldCheck,
  },
  {
    href: "/dashboard/cloud-vps",
    label: "Custom Cloud VPS",
    badge: "NVMe",
    icon: Cpu,
  },
];

export function DashboardSidebar({
  onNavigate,
  isMobileDrawer = false,
  collapsed = false,
  onToggleCollapse,
}: {
  onNavigate?: () => void;
  isMobileDrawer?: boolean;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const isCollapsed = !isMobileDrawer && collapsed;

  const handleLogout = async () => {
    setSigningOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("সাইন আউট সম্পন্ন হয়েছে।");
      router.push("/login");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div
      className={`flex h-full flex-col justify-between bg-white ${
        isCollapsed ? "px-2.5 py-4" : "p-4"
      }`}
    >
      <div className="overflow-y-auto">
        {/* Brand Header */}
        <div
          className={`flex items-center pb-4 ${
            isCollapsed
              ? "flex-col gap-2.5 px-0"
              : `justify-between px-1 ${isMobileDrawer ? "pr-9" : ""}`
          }`}
        >
          <Link
            href="/dashboard"
            onClick={onNavigate}
            aria-label="primavps portal home"
            className="group inline-flex items-center"
          >
            <BrandLogo
              variant={isCollapsed ? "mark" : "full"}
              theme="light"
              size="sm"
            />
          </Link>

          {!isCollapsed && (
            <div className="flex items-center gap-1.5">
              <span className="rounded-md bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-bold text-blue-700">
                PORTAL
              </span>
              {!isMobileDrawer && onToggleCollapse && (
                <button
                  type="button"
                  onClick={onToggleCollapse}
                  aria-label="Collapse sidebar"
                  title="সাইডবার ছোট করুন"
                  className="grid size-7 cursor-pointer place-items-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          )}

          {isCollapsed && onToggleCollapse && (
            <button
              type="button"
              onClick={onToggleCollapse}
              aria-label="Expand sidebar"
              title="সাইডবার বড় করুন"
              className="grid size-8 cursor-pointer place-items-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              <PanelLeftOpen size={15} />
            </button>
          )}
        </div>

        {/* Deploy New Server Section (Stays inside /dashboard/*) */}
        <div
          className={`mb-5 rounded-2xl border border-blue-100 bg-blue-50/50 ${
            isCollapsed ? "p-1.5" : "p-2.5"
          }`}
        >
          {!isCollapsed && (
            <p className="px-1.5 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
              নতুন সার্ভার ডিপ্লয়
            </p>
          )}
          <div className="space-y-1">
            {DEPLOY_NAV.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  title={isCollapsed ? item.label : undefined}
                  aria-label={isCollapsed ? item.label : undefined}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center rounded-xl text-xs font-bold transition-colors ${
                    isCollapsed
                      ? "justify-center p-2.5"
                      : "justify-between px-2.5 py-2"
                  } ${
                    active
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-white text-slate-800 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={15} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </span>
                  {!isCollapsed && (
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[9px] font-bold ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main Portal Navigation */}
        {!isCollapsed && (
          <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            ম্যানেজমেন্ট
          </p>
        )}
        <nav aria-label="Client portal navigation" className="space-y-1">
          {MAIN_NAV.map((item) => {
            const Icon = item.icon;
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                title={isCollapsed ? item.label : undefined}
                aria-label={isCollapsed ? item.label : undefined}
                aria-current={active ? "page" : undefined}
                className={`flex items-center rounded-xl text-xs font-bold transition-colors sm:text-sm ${
                  isCollapsed ? "justify-center p-2.5" : "gap-2.5 px-3 py-2.5"
                } ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  size={17}
                  className={active ? "text-blue-600" : "text-slate-400"}
                />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
        <Link
          href="/"
          title={isCollapsed ? "মূল ওয়েবসাইট" : undefined}
          aria-label={isCollapsed ? "মূল ওয়েবসাইট" : undefined}
          className={`flex w-full items-center rounded-xl text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900 ${
            isCollapsed ? "justify-center p-2.5" : "justify-between px-3 py-2"
          }`}
        >
          {!isCollapsed && <span>মূল ওয়েবসাইট</span>}
          <ExternalLink size={14} />
        </Link>

        <button
          type="button"
          disabled={signingOut}
          onClick={handleLogout}
          title={isCollapsed ? "সাইন আউট" : undefined}
          aria-label={isCollapsed ? "সাইন আউট" : undefined}
          className={`flex w-full cursor-pointer items-center rounded-xl border border-slate-200 text-xs font-bold text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:opacity-60 ${
            isCollapsed ? "justify-center p-2.5" : "gap-2.5 px-3 py-2.5"
          }`}
        >
          <LogOut size={15} />
          {!isCollapsed && (
            <span>{signingOut ? "সাইন আউট হচ্ছে…" : "সাইন আউট"}</span>
          )}
        </button>
      </div>
    </div>
  );
}