"use client";

import { NewTicketModal } from "@/components/dashboard/NewTicketModal";
import { StatusPill } from "@/components/dashboard/StatusPill";
import {
  getStoredTickets,
  saveStoredTickets,
} from "@/lib/services/portal-store";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardSupportPage() {
  const [tickets, setTickets] = useState(getStoredTickets);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateTicket = (data: {
    subject: string;
    serviceName: string;
    priority: string;
    message: string;
  }) => {
    const newItem = {
      id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: data.subject,
      department: data.serviceName,
      status: "open" as const,
      updated: "Just now",
    };
    setTickets((prev) => {
      const next = [newItem, ...prev];
      saveStoredTickets(next);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
            সাপোর্ট টিকিট
          </h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            বনানী টেকনিক্যাল ডেস্ক থেকে গড়ে ৩–১০ মিনিটে উত্তর পাবেন।
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
        >
          <Plus size={15} />
          <span>নতুন টিকিট খুলুন</span>
        </button>
      </div>

      <div className="space-y-3">
        {tickets.map((tkt) => (
          <Link
            key={tkt.id}
            href={`/dashboard/support/${tkt.id}`}
            className="group flex flex-col justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs transition-all hover:border-blue-300 hover:shadow-sm sm:flex-row sm:items-center sm:p-5"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-600">
                  #{tkt.id}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs font-medium text-slate-500">
                  {tkt.department}
                </span>
              </div>
              <h2 className="mt-1 text-sm font-bold text-slate-900 group-hover:text-blue-600 sm:text-base">
                {tkt.subject}
              </h2>
            </div>

            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <span className="text-xs text-slate-400">{tkt.updated}</span>
              <StatusPill status={tkt.status} />
              <ArrowRight
                size={15}
                className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-600"
              />
            </div>
          </Link>
        ))}
      </div>

      <NewTicketModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateTicket}
      />
    </div>
  );
}