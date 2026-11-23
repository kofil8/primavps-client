import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { getDisplayName, getSession } from "@/lib/auth/current-session";
import { pageSeo } from "@/lib/seo";
import { ArrowRight, LogOut } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = pageSeo({
  title: "Client Area",
  description:
    "Your primavps client area: servers, residential IPs, renewals and invoices.",
  path: "/dashboard",
  noIndex: true,
});

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login?next=/dashboard");
  }

  const displayName = getDisplayName(session);
  const firstName = displayName.split(" ")[0] || displayName;

  return (
    <div className="min-h-[calc(100dvh-8rem)] bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] text-blue-600 uppercase">
              Client area
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Welcome back, {firstName}
            </h1>
            <p className="mt-1 text-sm text-slate-600">{session.email}</p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/cloud-vps"
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <span>Deploy server</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <form action="/api/auth/logout" method="post">
              <button
                type="submit"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
              >
                <LogOut size={15} aria-hidden="true" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </form>
          </div>
        </div>

        <div className="mt-7 grid gap-6 lg:grid-cols-[220px_1fr] lg:items-start">
          <DashboardSidebar />
          <div className="min-w-0">{children}</div>
        </div>

        <p className="mt-8 text-xs leading-5 text-slate-400">
          Demo workspace — services and invoices below are sample data. No real
          servers are provisioned from this account.
        </p>
      </div>
    </div>
  );
}
