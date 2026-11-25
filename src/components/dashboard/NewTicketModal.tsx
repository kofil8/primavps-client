"use client";

import { DEMO_SERVICES } from "@/lib/data/client-demo";
import { LifeBuoy, Send, X } from "lucide-react";
import { useState } from "react";

interface NewTicketModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (ticket: {
    subject: string;
    serviceName: string;
    priority: string;
    message: string;
  }) => void;
}

export function NewTicketModal({
  open,
  onClose,
  onCreate,
}: NewTicketModalProps) {
  const [subject, setSubject] = useState("");
  const [serviceName, setServiceName] = useState(
    DEMO_SERVICES[0]?.name || "General Account",
  );
  const [priority, setPriority] = useState("Normal");
  const [message, setMessage] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    onCreate({
      subject: subject.trim(),
      serviceName,
      priority,
      message: message.trim(),
    });
    setSubject("");
    setMessage("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-ticket-title"
    >
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-blue-600">
              <LifeBuoy size={18} />
            </span>
            <h2
              id="new-ticket-title"
              className="font-display text-lg font-extrabold text-slate-900"
            >
              নতুন সাপোর্ট টিকিট খুলুন
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="cursor-pointer rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="ticket-subject"
              className="mb-1 block text-xs font-bold text-slate-800"
            >
              বিষয় (Subject)
            </label>
            <input
              id="ticket-subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="যেমন: RDP কানেকশন বা IP সংক্রান্ত সহায়তা"
              className="field text-sm"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="ticket-service"
                className="mb-1 block text-xs font-bold text-slate-800"
              >
                সংশ্লিষ্ট সার্ভার
              </label>
              <select
                id="ticket-service"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="field text-xs sm:text-sm"
              >
                {DEMO_SERVICES.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name} ({s.ip})
                  </option>
                ))}
                <option value="Billing & Payments">Billing &amp; Payments</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="ticket-priority"
                className="mb-1 block text-xs font-bold text-slate-800"
              >
                প্রায়োরিটি
              </label>
              <select
                id="ticket-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="field text-xs sm:text-sm"
              >
                <option value="Normal">Normal</option>
                <option value="High">High (Urgent RDP Issue)</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="ticket-message"
              className="mb-1 block text-xs font-bold text-slate-800"
            >
              বিস্তারিত বিবরণ
            </label>
            <textarea
              id="ticket-message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="আপনার সমস্যার বিস্তারিত লিখুন..."
              className="field text-sm"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline px-4 py-2.5 text-xs"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
            >
              <Send size={14} />
              <span>টিকিট পাঠান</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}