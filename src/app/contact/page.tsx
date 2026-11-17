'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Clock, ShieldCheck, Check } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'Technical Support', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Header */}
      <section className="bg-white border-b border-[#E2E8F0] pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
              Contact Engineering &amp; Operations
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] mt-2 leading-relaxed">
              Direct access to our infrastructure engineers. We respond to technical inquiries and provisioning support 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Contact Information (5 cols) */}
            <div className="md:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
                <h3 className="font-display font-bold text-base text-[#0F172A]">
                  Direct Support Channels
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-[#0F172A]">
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-[#2563EB] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold block">Email Support</span>
                      <span className="text-[#64748B]">support@primevpsbd.com</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageSquare size={18} className="text-[#2563EB] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold block">Instant Telegram Support</span>
                      <span className="text-[#64748B]">@primevpsbd_ops</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-[#2563EB] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold block">SLA Response Window</span>
                      <span className="text-[#64748B]">&lt; 15 minutes for critical tickets</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck size={16} />
                  <span>Automated Operations</span>
                </div>
                <h4 className="font-display font-bold text-sm text-white">
                  Server Already Active?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You can perform hard reboots, OS reinstallations, and inspect IP routing health directly inside your Client Dashboard without opening a ticket.
                </p>
              </div>
            </div>

            {/* Contact Form (7 cols) */}
            <div className="md:col-span-7 bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs">
              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check size={24} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#0F172A]">
                    Message Dispatched
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] max-w-sm mx-auto">
                    Your inquiry has been assigned ticket ID #PV-{Math.floor(1000 + Math.random() * 9000)}. An engineer will reply shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-display font-bold text-lg text-[#0F172A]">
                    Submit a Ticket
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#0F172A]">Your Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Asif Mahmud"
                        className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#0F172A]">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="asif@domain.com"
                        className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#0F172A]">Department</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#2563EB] bg-white"
                    >
                      <option value="Technical Support">Technical &amp; RDP Support</option>
                      <option value="Billing & Payments">Billing &amp; bKash/Nagad Payment Verification</option>
                      <option value="IP Screening & Verification">IP Screening &amp; Replacement Inquiry</option>
                      <option value="Custom Infrastructure">Enterprise &amp; Custom Subnet Request</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#0F172A]">Message Details</label>
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Please include your VPS IP or Order ID if relevant..."
                      className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm active:scale-[0.98]"
                  >
                    Send Message to Engineering
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
