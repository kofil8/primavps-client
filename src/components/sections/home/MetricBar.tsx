'use client';

import React from 'react';
import { Server, ShieldAlert, Cpu, CreditCard } from 'lucide-react';

const METRICS = [
  {
    icon: Server,
    value: '99.98%',
    label: 'Uptime SLA',
    detail: 'Enterprise NVMe RAID-1',
  },
  {
    icon: ShieldAlert,
    value: '0% Leak',
    label: 'DNS & WebRTC',
    detail: 'Kernel-Level NIC Routing',
  },
  {
    icon: Cpu,
    value: '< 90s',
    label: 'Instant Delivery',
    detail: 'Automated Hypervisor API',
  },
  {
    icon: CreditCard,
    value: 'bKash / Cards',
    label: 'Instant Checkout',
    detail: 'Automated Invoices & Receipt',
  },
];

export function MetricBar() {
  return (
    <section className="bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#E2E8F0] -mx-4 sm:mx-0">
          {METRICS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="px-6 py-3 flex flex-col justify-center first:pt-0 last:pb-0 lg:first:pt-3 lg:last:pb-3"
              >
                <div className="flex items-center gap-2 text-[#2563EB] mb-1">
                  <Icon size={18} />
                  <span className="font-display font-extrabold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
                    {item.value}
                  </span>
                </div>
                <div className="text-xs font-bold text-[#0F172A] uppercase tracking-wider font-mono">
                  {item.label}
                </div>
                <div className="text-xs text-[#64748B] mt-0.5">
                  {item.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
