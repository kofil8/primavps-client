"use client";

import {
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Plus,
  Server,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/services", label: "My Servers", icon: Server },
  { href: "/dashboard/invoices", label: "Invoices & Billing", icon: CreditCard },
  { href: "/dashboard/support", label: "Support Tickets", icon: LifeBuoy },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="flex h-full flex-col justify-between bg-white p-4">
      <div>
        <div className="flex items-center justify-between px-2 pb-4">
          <Link
            href="/"
            className="font-display text-xl font-black tracking-tight text-slate-900"
          >
            prima<span className="text-blue-600">vps</span>
          </Link>
          <span className="rounded-md bg-blue-50 px-2 py-0.5 font-mono text-[10px] font-bold text-blue-700">
            PORTAL
          </span>
        </div>

        <Link
          href="/isp-vps"
          onClick={onNavigate}
          className="mb-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-blue-700"
        >
          <Plus size={15} />
          <span>Deploy Server</span>
        </Link>

        <nav aria-label="Client portal navigation" className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-bold transition-colors sm:text-sm ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  size={16}
                  className={active ? "text-blue-600" : "text-slate-400"}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-6 flex w-full cursor-pointer items-center gap-2.5 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700"
      >
        <LogOut size={15} />
        <span>Sign Out</span>
      </button>
    </div>
  );
}