'use client';

import React from 'react';
import { Check, X, Shield, Zap, Sparkles } from 'lucide-react';

const COMPARISON_ROWS = [
  {
    feature: 'IP Routing & Isolation Method',
    primevps: 'OS Kernel-Level Direct Routing (Native NIC binding, zero proxy overhead)',
    others: 'Exposed Proxifier app, CCProxy, or leaky SOCKS5 port forwarder',
    highlight: true,
  },
  {
    feature: 'IP Quality & Fraud Score',
    primevps: '100% Pre-Screened 0/100 IPQS & clean IPinfo ISP residential classification',
    others: 'Recycled datacenter IPs, flagged ASN pools, or shared dirty IPs',
    highlight: true,
  },
  {
    feature: 'Provisioning Speed',
    primevps: 'Automated < 90 Seconds from payment to RDP login screen',
    others: 'Manual setup taking 6 to 24 hours via personal message',
    highlight: false,
  },
  {
    feature: 'DNS & WebRTC Leak Resistance',
    primevps: '0% Leak Guaranteed — US residential DNS locked at NIC level',
    others: 'High risk of Bangladeshi/ISP local DNS leakage in browser',
    highlight: true,
  },
  {
    feature: 'Server Power Control',
    primevps: '24/7 Self-service Web Console (Start, Stop, Hard Reboot, VNC console)',
    others: 'Must wait for seller to manually reboot host on WhatsApp',
    highlight: false,
  },
  {
    feature: 'Payment & Checkout',
    primevps: 'Automated bKash, Nagad, Cards & USDT with instant receipt & invoice',
    others: 'Manual send-money to personal numbers with uncertain confirmation',
    highlight: false,
  },
];

export function ComparisonMatrix() {
  return (
    <section className="py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold mb-3 uppercase tracking-wider">
            Engineered Difference
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight">
            Why Engineering-Driven VPS Beats Local Resellers
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] mt-2">
            Most local vendors sell recycled Proxifier wrappers on cheap shared servers. primevpsbd builds hypervisor-level dedicated instances.
          </p>
        </div>

        {/* Clean Comparison Table */}
        <div className="rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <th className="py-4 px-6 font-bold text-[#0F172A] w-1/3">
                    Evaluation Matrix
                  </th>
                  <th className="py-4 px-6 font-bold text-[#2563EB] bg-blue-50/50 border-x border-blue-100 w-1/3">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} />
                      <span>primevpsbd.com (Engineered)</span>
                    </div>
                  </th>
                  <th className="py-4 px-6 font-semibold text-[#64748B] w-1/3">
                    Typical Local RDP Sellers
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50/60 transition-colors ${
                      row.highlight ? 'bg-slate-50/30' : ''
                    }`}
                  >
                    {/* Feature */}
                    <td className="py-4 px-6 font-semibold text-[#0F172A]">
                      {row.feature}
                    </td>

                    {/* primevpsbd */}
                    <td className="py-4 px-6 bg-blue-50/30 border-x border-blue-100 font-medium text-[#0F172A]">
                      <div className="flex items-start gap-2">
                        <Check size={16} className="text-[#2563EB] mt-0.5 flex-shrink-0" />
                        <span>{row.primevps}</span>
                      </div>
                    </td>

                    {/* Typical sellers */}
                    <td className="py-4 px-6 text-[#64748B]">
                      <div className="flex items-start gap-2">
                        <X size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{row.others}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
