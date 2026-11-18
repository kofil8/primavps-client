"use client";

import { Check, Mail, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

const CHANNELS = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+880 9606-PRIME",
    note: "Fastest — about 3 minutes",
  },
  {
    icon: Mail,
    title: "Email",
    value: "support@primevpsbd.com",
    note: "Replies within 15 minutes",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+880 9606-PRIME",
    note: "24/7 Dhaka operations desk",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Technical support",
    message: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTicketId(`PV-${Math.floor(1000 + Math.random() * 9000)}`);
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="shell py-12 sm:py-14">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Talk to our team
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Engineers in Dhaka, 24/7. Pick whichever channel suits you.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-3">
            {CHANNELS.map((channel) => (
              <div
                key={channel.title}
                className="card flex items-start gap-3 p-4"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
                  <channel.icon size={17} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {channel.title}
                  </p>
                  <p className="text-sm text-slate-700">{channel.value}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {channel.note}
                  </p>
                </div>
              </div>
            ))}

            <div className="rounded-2xl bg-slate-900 p-5 text-sm text-slate-300">
              <p className="font-semibold text-white">Already a customer?</p>
              <p className="mt-1 leading-6">
                Reboot, reinstall and check IP health from the client area — no
                ticket needed.
              </p>
            </div>
          </div>

          <div className="card p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 text-center">
                <span className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <Check size={24} />
                </span>
                <h2 className="mt-4 font-display text-xl font-bold text-slate-900">
                  Message sent
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Ticket #{ticketId} is with our team. We reply by email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  Send a message
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="label mb-1.5">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(event) =>
                        setForm({ ...form, name: event.target.value })
                      }
                      placeholder="Asif Mahmud"
                      className="field"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="label mb-1.5">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(event) =>
                        setForm({ ...form, email: event.target.value })
                      }
                      placeholder="you@company.com"
                      className="field"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="label mb-1.5">
                    Topic
                  </label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={(event) =>
                      setForm({ ...form, subject: event.target.value })
                    }
                    className="field"
                  >
                    <option>Technical support</option>
                    <option>Billing &amp; payments</option>
                    <option>IP replacement</option>
                    <option>Custom infrastructure</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="label mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={(event) =>
                      setForm({ ...form, message: event.target.value })
                    }
                    placeholder="Include your server IP or order number if relevant."
                    className="field"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
