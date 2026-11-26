"use client";

import { BrandLogo } from "@/components/ui/BrandLogo";
import { useCurrency } from "@/lib/currency";
import {
  DEFAULT_RESELLER_STATE,
  getResellerState,
  getResellerTier,
} from "@/lib/services/reseller-store";
import {
  ExternalLink,
  KeyRound,
  Layers,
  LayoutDashboard,
  LogOut,
  PanelLeftOpen,
  Plus,
  Server,
  Users,
  Wallet,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const RESELLER_NAV = [
  { href: "/reseller-portal", label: "ওভারভিউ", icon: LayoutDashboard, exact: true },
  { href: "/reseller-portal/deploy", label: "বাল্ক ডিপ্লয়", icon: Layers },
  { href: "/reseller-portal/servers", label: "ফ্লিট সার্ভার", icon: Server },
  { href: "/reseller-portal/clients", label: "সাব-ক্লায়েন্ট", icon: Users },
  { href: "/reseller-portal/wallet", label: "ওয়ালেট ও বিলিং", icon: Wallet },
  { href: "/reseller-portal/api", label: "API ও হোয়াইট-লেবেল", icon: KeyRound },
];

export function ResellerSidebar({
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
  const { formatPrice } = useCurrency();
  const [signingOut, setSigningOut] = useState(false);
  const [state, setState] = useState(DEFAULT_RESELLER_STATE);

  const isCollapsed = !isMobileDrawer && collapsed;

  useEffect(() => {
    const sync = () => setState(getResellerState());
    sync();
    window.addEventListener("reseller-store-updated", sync);
    return () => window.removeEventListener("reseller-store-updated", sync);
  }, []);

  const tier = getResellerTier(state.servers.length);

  const handleLogout = async () => {
    setSigningOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("সাইন আউট সম্পন্ন হয়েছে।");
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
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
        <div
          className={`flex items-center pb-4 ${
            isCollapsed
              ? "flex-col gap-2.5 px-0"
              : `justify-between px-1 ${isMobileDrawer ? "pr-9" : ""}`
          }`}
        >
          <Link
            href="/reseller-portal"
            onClick={onNavigate}
            aria-label="Primavps Reseller Portal"
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
              <span className="rounded-md bg-indigo-50 px-2 py-0.5 font-mono text-[10px] font-bold text-indigo-700">
                RESELLER
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

        {/* Live Prepaid Wallet Card */}
        {isCollapsed ? (
          <Link
            href="/reseller-portal/wallet"
            onClick={onNavigate}
            title={`ওয়ালেট: ${formatPrice(state.walletBalanceBdt)} (${tier.name} -${tier.discountPercent}%)`}
            aria-label={`ওয়ালেট: ${formatPrice(state.walletBalanceBdt)}`}
            className="mb-4 flex items-center justify-center rounded-xl bg-slate-900 p-2.5 text-white shadow-xs transition-colors hover:bg-slate-800"
          >
            <Wallet size={17} />
          </Link>
        ) : (
          <div className="mb-4 rounded-2xl border border-slate-200/90 bg-slate-900 p-3.5 text-white shadow-xs">
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span>প্রিপেইড ওয়ালেট</span>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-300">
                {tier.name} -{tier.discountPercent}%
              </span>
            </div>
            <p className="mt-1.5 font-display text-xl font-black tracking-tight text-white">
              {formatPrice(state.walletBalanceBdt)}
            </p>
            <Link
              href="/reseller-portal/wallet"
              onClick={onNavigate}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-500"
            >
              <Plus size={14} />
              <span>ব্যালেন্স যোগ করুন</span>
            </Link>
          </div>
        )}

        {!isCollapsed && (
          <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            এজেন্সি প্যানেল
          </p>
        )}
        <nav aria-label="Reseller portal navigation" className="space-y-1">
          {RESELLER_NAV.map((item) => {
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
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  size={17}
                  className={active ? "text-indigo-600" : "text-slate-400"}
                />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
        <Link
          href="/"
          onClick={onNavigate}
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