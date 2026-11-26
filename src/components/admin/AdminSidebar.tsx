"use client";

import { BrandLogo } from "@/components/ui/BrandLogo";
import { getAdminState } from "@/lib/services/admin-store";
import {
  ArrowLeftRight,
  Cpu,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  ServerCog,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AdminSidebarProps {
  onNavigate?: () => void;
}

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [counts, setCounts] = useState({ provisioning: 0, swaps: 0, tickets: 0 });

  useEffect(() => {
    const sync = () => {
      const state = getAdminState();
      setCounts({
        provisioning: state.orders.filter((o) => o.status === "PROVISIONING").length,
        swaps: state.ipSwaps.filter((s) => s.status === "PENDING").length,
        tickets: state.tickets.filter((t) => t.status === "OPEN").length,
      });
    };
    sync();
    window.addEventListener("admin-store-updated", sync);
    return () => window.removeEventListener("admin-store-updated", sync);
  }, []);

  const handleLogout = async () => {
    setSigningOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  };

  const opsItems = [
    { href: "/admin", label: "Command Center", icon: LayoutDashboard, badge: 0 },
    {
      href: "/admin/orders",
      label: "Orders & Provisioning",
      icon: ServerCog,
      badge: counts.provisioning,
      badgeColor: "bg-amber-500 text-slate-950",
    },
    {
      href: "/admin/ip-swaps",
      label: "IP Swap Queue",
      icon: ArrowLeftRight,
      badge: counts.swaps,
      badgeColor: "bg-rose-500 text-white",
    },
    { href: "/admin/users", label: "Clients & Resellers", icon: Users, badge: 0 },
    {
      href: "/admin/tickets",
      label: "Support Desk",
      icon: LifeBuoy,
      badge: counts.tickets,
      badgeColor: "bg-blue-500 text-white",
    },
  ];

  const catalogItems = [
    { href: "/admin/isp-vps", label: "ISP VPS Plans", icon: ShieldCheck },
    { href: "/admin/cloud-vps", label: "Cloud VPS Config", icon: Cpu },
    { href: "/admin/coupons", label: "Coupons & Promos", icon: Tag },
    { href: "/admin/blog", label: "Blog & Guides", icon: FileText },
  ];

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : Boolean(pathname?.startsWith(href));

  return (
    <div className="flex h-full flex-col bg-slate-950 px-3.5 py-4 text-slate-200">
      {/* Brand + Ops Badge */}
      <div className="flex items-center justify-between px-2 pb-4">
        <Link href="/admin" onClick={onNavigate} className="flex items-center gap-2">
          <BrandLogo theme="dark" size="sm" />
        </Link>
        <span className="rounded-md border border-amber-400/30 bg-amber-500/15 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-amber-300">
          OPS ADMIN
        </span>
      </div>

      {/* Navigation */}
      <nav className="mt-1 flex-1 space-y-5 overflow-y-auto pr-0.5" aria-label="Admin navigation">
        {/* Group 1: Operations */}
        <div className="space-y-1">
          <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Operations
          </p>
          {opsItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                  active
                    ? "bg-white/10 text-white shadow-xs"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon
                    size={15}
                    className={active ? "text-amber-400" : "text-slate-500"}
                  />
                  <span>{item.label}</span>
                </span>
                {item.badge > 0 && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] font-extrabold ${
                      item.badgeColor || "bg-slate-700 text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Group 2: Catalog & CMS */}
        <div className="space-y-1">
          <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Catalog &amp; CMS
          </p>
          {catalogItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                  active
                    ? "bg-white/10 text-white shadow-xs"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                }`}
              >
                <Icon
                  size={15}
                  className={active ? "text-amber-400" : "text-slate-500"}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Controls */}
      <div className="mt-4 space-y-2 border-t border-slate-800/80 pt-3">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
        >
          <span>Public Storefront</span>
          <ExternalLink size={13} />
        </Link>

        <button
          type="button"
          disabled={signingOut}
          onClick={handleLogout}
          className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2.5 text-xs font-bold text-slate-300 transition-colors hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-300 disabled:opacity-60"
        >
          <LogOut size={15} />
          <span>{signingOut ? "Signing out…" : "Sign Out"}</span>
        </button>
      </div>
    </div>
  );
}