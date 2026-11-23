import { StatusPill } from "@/components/dashboard/StatusPill";
import { demoAccount } from "@/lib/data/client-demo";
import { BookOpen, Mail, MessageCircle, Ticket } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support",
  description: "Tickets, live chat and infrastructure support.",
  robots: { index: false, follow: false },
};

const CHANNELS = [
  {
    title: "Open a ticket",
    detail: "Technical support, billing or IP replacement",
    href: "/contact",
    icon: Ticket,
  },
  {
    title: "Email support",
    detail: "support@primavps.com · replies in ~11 min",
    href: "mailto:support@primavps.com",
    icon: Mail,
  },
  {
    title: "Infrastructure guides",
    detail: "Setup, security and IP reputation playbooks",
    href: "/blog",
    icon: BookOpen,
  },
] as const;

export default function DashboardSupportPage() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {CHANNELS.map((channel) => (
          <Link
            key={channel.title}
            href={channel.href}
            className="group rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-colors hover:border-blue-300"
          >
            <channel.icon
              size={18}
              className="text-blue-600"
              aria-hidden="true"
            />
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {channel.title}
            </p>
            <p className="mt-0.5 text-xs leading-5 text-slate-500">
              {channel.detail}
            </p>
          </Link>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-200/90 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="font-semibold text-slate-900">Your tickets</h2>
            <p className="text-xs text-slate-500">
              24/7 coverage · median first reply 11 minutes
            </p>
          </div>
          <MessageCircle
            size={16}
            className="text-slate-400"
            aria-hidden="true"
          />
        </div>

        <ul className="divide-y divide-slate-100">
          {demoAccount.tickets.map((ticket) => (
            <li
              key={ticket.id}
              className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-slate-500">
                    {ticket.id}
                  </span>
                  <StatusPill tone={ticket.status === "open" ? "blue" : "slate"}>
                    {ticket.status === "open" ? "Open" : "Resolved"}
                  </StatusPill>
                </div>
                <p className="mt-0.5 text-sm font-medium text-slate-900">
                  {ticket.subject}
                </p>
                <p className="text-xs text-slate-500">{ticket.department}</p>
              </div>
              <p className="text-xs text-slate-400">Updated {ticket.updated}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
