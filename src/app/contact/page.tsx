"use client";

import { COMPANY_INFO } from "@/lib/config/company";
import { Building2, Check, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

const CHANNELS = [
  {
    icon: Phone,
    title: "Official Phone / Helpline",
    value: COMPANY_INFO.contact.phoneDisplay,
    href: `tel:${COMPANY_INFO.contact.phoneTel}`,
    note: "24/7 Dhaka operations desk",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    value: COMPANY_INFO.contact.phoneDisplay,
    href: COMPANY_INFO.contact.whatsappUrl,
    note: "Fastest response — average ~3 mins",
  },
  {
    icon: Mail,
    title: "Support Email",
    value: COMPANY_INFO.contact.supportEmail,
    href: `mailto:${COMPANY_INFO.contact.supportEmail}`,
    note: "Official ticketing & inquiries",
  },
  {
    icon: MapPin,
    title: "Registered Corporate Office",
    value: COMPANY_INFO.address.fullEn,
    href: undefined,
    note: "Visiting Hours: Sun - Thu (10 AM - 6 PM)",
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
            <span className="mt-1 block text-xl text-slate-600 sm:text-2xl">
              যোগাযোগ করুন (Contact Us)
            </span>
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Engineers in Dhaka, 24/7. Pick whichever channel suits you.
            আমাদের ঢাকা অফিস ও টেকনিক্যাল টিম সার্বক্ষণিক গ্রাহক সহায়তায় নিয়োজিত। সরাসরি কল করুন অথবা নিচের ফর্মে বার্তা পাঠান।
          </p>
        </div>
      </section>

      <section className="section py-10 sm:py-14">
        <div className="shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            {CHANNELS.map((channel) => (
              <div
                key={channel.title}
                className="card flex items-start gap-3.5 p-4.5"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <channel.icon size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {channel.title}
                  </p>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="mt-0.5 block truncate text-sm font-semibold text-slate-900 hover:text-blue-600"
                      {...(channel.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {channel.value}
                    </a>
                  ) : (
                    <p className="mt-0.5 text-xs leading-relaxed font-semibold text-slate-900">
                      {channel.value}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-slate-500">{channel.note}</p>
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

            {/* Official Business Credentials Box for DBID / SSLCOMMERZ Reviewers */}
            <div className="rounded-2xl border border-blue-200 bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 text-blue-900">
                <Building2 size={16} className="text-blue-600" />
                <h3 className="font-display text-xs font-bold uppercase tracking-wider">
                  ট্রেড লাইসেন্স ও সরকারি নিবন্ধন
                </h3>
              </div>
              <div className="mt-3 space-y-1.5 text-xs text-slate-700">
                <p>
                  <span className="font-semibold text-slate-500">প্রতিষ্ঠানের নাম:</span>{" "}
                  <strong>{COMPANY_INFO.legalNameBn}</strong> ({COMPANY_INFO.brandName})
                </p>
                <p>
                  <span className="font-semibold text-slate-500">স্বত্বাধিকারী:</span>{" "}
                  {COMPANY_INFO.proprietorNameBn}
                </p>
                <p>
                  <span className="font-semibold text-slate-500">Trade License:</span>{" "}
                  <code className="font-mono text-slate-900">{COMPANY_INFO.tradeLicenseNo}</code>
                </p>
                <p>
                  <span className="font-semibold text-slate-500">DBID:</span>{" "}
                  <code className="font-mono text-slate-900">{COMPANY_INFO.dbidNo}</code>
                </p>
              </div>
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
                  <span className="mt-1 block text-base font-semibold text-slate-600">
                    বার্তা সফলভাবে পাঠানো হয়েছে
                  </span>
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Ticket #{ticketId} is with our team. We reply by email.
                  টিকিট #{ticketId} আমাদের টিমের কাছে পৌঁছেছে। দ্রুততম সময়ে আপনার ইমেইলে উত্তর দেওয়া হবে।
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  Send a message
                  <span className="mt-0.5 block text-sm font-semibold text-slate-600">
                    সরাসরি বার্তা পাঠান
                  </span>
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="label mb-1.5">
                      Name
                      <span className="ml-1 text-xs font-normal text-slate-500">
                        আপনার নাম
                      </span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(event) =>
                        setForm({ ...form, name: event.target.value })
                      }
                      placeholder="আসিফ মাহমুদ / Asif Mahmud"
                      className="field"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="label mb-1.5">
                      Email
                      <span className="ml-1 text-xs font-normal text-slate-500">
                        ইমেইল ঠিকানা
                      </span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(event) =>
                        setForm({ ...form, email: event.target.value })
                      }
                      placeholder="you@domain.com"
                      className="field"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="label mb-1.5">
                    Topic
                    <span className="ml-1 text-xs font-normal text-slate-500">
                      বিষয়
                    </span>
                  </label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={(event) =>
                      setForm({ ...form, subject: event.target.value })
                    }
                    className="field"
                  >
                    <option>Technical support (প্রযুক্তিগত সহায়তা)</option>
                    <option>Billing &amp; payments (বিলিং ও পেমেন্ট)</option>
                    <option>7-Day IP replacement (আইপি পরিবর্তন)</option>
                    <option>Business enterprise inquiry (করপোরেট সেবা)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="label mb-1.5">
                    Message
                    <span className="ml-1 text-xs font-normal text-slate-500">
                      আপনার বার্তা
                    </span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={(event) =>
                      setForm({ ...form, message: event.target.value })
                    }
                    placeholder="আপনার প্রশ্ন বা সার্ভার সংক্রান্ত প্রয়োজনীয় বিবরণ লিখুন।"
                    className="field"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  বার্তা পাঠান (Send Message)
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
