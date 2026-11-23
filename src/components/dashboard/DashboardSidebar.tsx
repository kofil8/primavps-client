"use client";

import {
  LayoutDashboard,
  LifeBuoy,
  ReceiptText,
  Server,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/services", label: "Services", icon: Server },
  { href: "/dashboard/invoices", label: "Invoices", icon: ReceiptText },
  { href: "/dashboard/support", label: "Support", icon: LifeBuoy },
] as const;

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Client area"
      className="flex gap-1.5 overflow-x-auto rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-sm lg:sticky lg:top-24 lg:flex-col lg:gap-0.5 lg:self-start lg:p-2"
    >
      {NAV_ITEMS.map((item) => {
        const active =
          item.href === "/dashboard"
            ? pathname === item.href
            : pathname === item.href || pathname?.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
              active
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <item.icon size={16} aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
