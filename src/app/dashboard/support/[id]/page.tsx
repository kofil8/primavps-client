"use client";

import { StatusPill } from "@/components/dashboard/StatusPill";
import { DEMO_TICKETS } from "@/lib/data/client-demo";
import { ArrowLeft, Send, Shield, User } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

interface ChatMessage {
  id: string;
  sender: "client" | "staff";
  author: string;
  time: string;
  body: string;
}

export default function TicketDetailPage() {
  const params = useParams<{ id: string }>();
  const ticket =
    DEMO_TICKETS.find((t) => t.id === params.id) ?? DEMO_TICKETS[0];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      sender: "client",
      author: "আপনি",
      time: "আজ, ১০:১৫ AM",
      body: "আসসালামু আলাইকুম, আমার US AT&T সার্ভারে নতুন একটি সফটওয়্যার পোর্ট ওপেন করতে চাচ্ছি। ফায়ারওয়াল রুল কি আমি নিজে পরিবর্তন করতে পারব?",
    },
    {
      id: "m2",
      sender: "staff",
      author: "Tanvir (Banani Ops Desk)",
      time: "আজ, ১০:১৯ AM",
      body: "ওয়ালাইকুম আসসালাম! জি, আপনার Windows 11 RDP-তে ফুল Administrator অ্যাক্সেস দেওয়া আছে। Windows Defender Firewall থেকে সরাসরি ইনবাউন্ড/আউটবাউন্ড পোর্ট কনফিগার করতে পারবেন।",
    },
  ]);
  const [reply, setReply] = useState("");

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        sender: "client",
        author: "আপনি",
        time: "এইমাত্র",
        body: reply.trim(),
      },
    ]);
    setReply("");
  };

  return (
    <div className="space-y-5">
      <Link
        href="/dashboard/support"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600"
      >
        <ArrowLeft size={14} />
        <span>সব টিকিটে ফিরে যান</span>
      </Link>

      {/* Ticket Header */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-xs font-bold text-blue-600">
              Ticket #{ticket.id}
            </p>
            <h1 className="mt-1 font-display text-lg font-extrabold text-slate-900 sm:text-xl">
              {ticket.subject}
            </h1>
          </div>
          <StatusPill status={ticket.status} />
        </div>
      </div>

      {/* Messages Thread */}
      <div className="space-y-3.5">
        {messages.map((msg) => {
          const isStaff = msg.sender === "staff";
          return (
            <div
              key={msg.id}
              className={`rounded-2xl border p-4 sm:p-5 ${
                isStaff
                  ? "border-blue-100 bg-blue-50/40"
                  : "border-slate-200/90 bg-white"
              }`}
            >
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 font-bold text-slate-900">
                  {isStaff ? (
                    <Shield size={14} className="text-blue-600" />
                  ) : (
                    <User size={14} className="text-slate-500" />
                  )}
                  <span>{msg.author}</span>
                </span>
                <span className="text-[11px] text-slate-400">{msg.time}</span>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-slate-700 sm:text-sm">
                {msg.body}
              </p>
            </div>
          );
        })}
      </div>

      {/* Reply Form */}
      <form
        onSubmit={handleSendReply}
        className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs sm:p-5"
      >
        <label
          htmlFor="ticket-reply"
          className="mb-2 block text-xs font-bold text-slate-800"
        >
          রিপ্লাই লিখুন
        </label>
        <textarea
          id="ticket-reply"
          rows={3}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="আপনার বার্তা লিখুন..."
          className="field text-sm"
        />
        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            disabled={!reply.trim()}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 disabled:opacity-50"
          >
            <Send size={14} />
            <span>রিপ্লাই পাঠান</span>
          </button>
        </div>
      </form>
    </div>
  );
}