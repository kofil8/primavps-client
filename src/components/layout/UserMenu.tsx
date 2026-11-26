"use client";

import type { NavbarUser } from "@/lib/auth/session";
import {
  ChevronDown,
  CreditCard,
  Layers,
  LayoutDashboard,
  LogOut,
  Server,
  Settings,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function UserMenu({ user }: { user: NavbarUser }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isReseller = user.role === "RESELLER";
  const initials = (user.name || user.email).slice(0, 2).toUpperCase();

  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const handleLogout = async () => {
    setSigningOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setOpen(false);
      toast.success("Signed out successfully.");
      router.refresh();
    } catch {
      toast.error("Could not sign out. Please try again.");
    } finally {
      setSigningOut(false);
    }
  };

  const quickLinks = isReseller
    ? [
        { href: "/reseller-portal", label: "Reseller Overview", icon: LayoutDashboard },
        { href: "/reseller-portal/deploy", label: "Bulk Deploy", icon: Layers },
        { href: "/reseller-portal/wallet", label: "Prepaid Wallet", icon: Wallet },
      ]
    : [
        { href: "/dashboard", label: "Client Overview", icon: LayoutDashboard },
        { href: "/dashboard/services", label: "My Servers", icon: Server },
        { href: "/dashboard/invoices", label: "Invoices & Billing", icon: CreditCard },
        { href: "/dashboard/settings", label: "Account Settings", icon: Settings },
      ];

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="Account menu"
        className="flex cursor-pointer items-center gap-1.5 rounded-full border border-slate-200 bg-white p-1 pr-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
      >
        <span
          className={`grid size-7 place-items-center rounded-full text-[11px] font-extrabold text-white ${
            isReseller ? "bg-indigo-600" : "bg-blue-600"
          }`}
        >
          {initials}
        </span>
        <ChevronDown
          size={13}
          className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full right-0 z-50 mt-2 w-64 rounded-2xl border border-slate-200/90 bg-white p-2 shadow-xl shadow-slate-900/10">
          {/* User Identity */}
          <div className="border-b border-slate-100 px-3 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-xs font-bold text-slate-900">
                {user.name || "PrimaVPS User"}
              </p>
              <span
                className={`shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                  isReseller
                    ? "bg-indigo-50 text-indigo-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {isReseller ? "RESELLER" : "CLIENT"}
              </span>
            </div>
            <p className="mt-0.5 truncate text-[11px] text-slate-500">
              {user.email}
            </p>
          </div>

          {/* Quick Links */}
          <div className="py-1.5">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                  <Icon size={14} className="text-slate-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Logout */}
          <div className="border-t border-slate-100 pt-1.5">
            <button
              type="button"
              disabled={signingOut}
              onClick={handleLogout}
              className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
            >
              <LogOut size={14} />
              <span>{signingOut ? "Signing out..." : "Sign out"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}