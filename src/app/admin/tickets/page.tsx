"use client";

import {
  getAdminState,
  replyAdminTicket,
  saveAdminState,
  type AdminTicket,
} from "@/lib/services/admin-store";
import { CheckCircle2, LifeBuoy, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type TicketTab = "OPEN" | "ANSWERED" | "CLOSED" | "ALL";

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<AdminTicket[]>([]);
  const [tab, setTab] = useState<TicketTab>("ALL");
  const [replies, setReplies] = useState<Record<string, string>>({});

  useEffect(() => {
    const sync = () => setTickets(getAdminState().tickets);
    sync();
    window.addEventListener("admin-store-updated", sync);
    return () => window.removeEventListener("admin-store-updated", sync);
  }, []);

  const filtered = tickets.filter((t) => (tab === "ALL" ? true : t.status === tab));

  const handleSendReply = (ticketId: string) => {
    const text = (replies[ticketId] || "").trim();
    if (!text) return;
    replyAdminTicket(ticketId, text);
    setReplies({ ...replies, [ticketId]: "" });
    toast.success(`Reply sent to ${ticketId}`);
  };

  const toggleClose = (ticket: AdminTicket) => {
    const state = getAdminState();
    const nextStatus: AdminTicket["status"] =
      ticket.status === "CLOSED" ? "OPEN" : "CLOSED";
    saveAdminState({
      ...state,
      tickets: state.tickets.map((t) =>
        t.id === ticket.id ? { ...t, status: nextStatus, updatedAt: "Just now" } : t,
      ),
    });
    toast.success(`${ticket.id} marked as ${nextStatus}.`);
  };

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          Respond to client &amp; reseller technical support tickets directly from the Ops Desk.
        </p>

        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 text-xs font-bold">
          {(
            [
              { id: "ALL", label: `All (${tickets.length})` },
              {
                id: "OPEN",
                label: `Open (${tickets.filter((t) => t.status === "OPEN").length})`,
              },
              {
                id: "ANSWERED",
                label: `Answered (${tickets.filter((t) => t.status === "ANSWERED").length})`,
              },
              {
                id: "CLOSED",
                label: `Closed (${tickets.filter((t) => t.status === "CLOSED").length})`,
              },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`cursor-pointer rounded-lg px-3 py-1.5 transition-colors ${
                tab === item.id
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ticket List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-14 text-center">
          <LifeBuoy size={28} className="text-slate-400" />
          <p className="mt-2 text-xs font-bold text-slate-600">
            No tickets in this queue.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filtered.map((ticket) => (
            <div
              key={ticket.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500">
                      {ticket.id}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        ticket.priority === "HIGH"
                          ? "bg-rose-50 text-rose-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {ticket.priority}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        ticket.status === "OPEN"
                          ? "bg-amber-50 text-amber-700"
                          : ticket.status === "ANSWERED"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <h2 className="mt-1.5 text-sm font-extrabold text-slate-900">
                    {ticket.subject}
                  </h2>
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    {ticket.customerName} ({ticket.customerEmail}) · Updated{" "}
                    {ticket.updatedAt}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleClose(ticket)}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[11px] font-bold text-slate-600 hover:bg-slate-50"
                >
                  <CheckCircle2 size={12} />
                  {ticket.status === "CLOSED" ? "Reopen" : "Close Ticket"}
                </button>
              </div>

              {/* Latest Message Preview */}
              <div className="mt-3 rounded-xl bg-slate-50 px-3.5 py-2.5 text-xs text-slate-700">
                {ticket.lastMessage}
              </div>

              {/* Quick Staff Reply Box */}
              {ticket.status !== "CLOSED" && (
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="text"
                    value={replies[ticket.id] || ""}
                    onChange={(e) =>
                      setReplies({ ...replies, [ticket.id]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendReply(ticket.id);
                    }}
                    placeholder="Write a quick staff reply and press Enter…"
                    className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleSendReply(ticket.id)}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700"
                  >
                    <Send size={13} /> Reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}