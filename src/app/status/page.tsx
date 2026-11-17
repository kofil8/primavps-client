'use client';

import React from 'react';
import { SYSTEM_COMPONENTS } from '@/lib/data/status';
import { ShieldCheck, CheckCircle2, Clock, Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Header */}
      <section className="bg-white border-b border-[#E2E8F0] pt-12 pb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot" />
                <span>All Core Systems Operational</span>
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
                System Status &amp; Real-time Telemetry
              </h1>
              <p className="text-sm sm:text-base text-[#64748B] mt-2 leading-relaxed">
                Independent real-time monitoring of our hypervisors, US residential IP routing fabrics, and payment gateways.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-right sm:self-end">
              <span className="text-[10px] text-[#64748B] uppercase font-bold tracking-wider block">
                Overall 90-Day SLA
              </span>
              <span className="font-display font-extrabold text-2xl text-emerald-600">
                99.98%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Status Grid */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-xs overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-[#64748B] uppercase tracking-wider">
              <span>System Component</span>
              <div className="flex items-center gap-12">
                <span className="hidden sm:inline">Edge Latency</span>
                <span>90-Day Uptime</span>
                <span>Status</span>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {SYSTEM_COMPONENTS.map((item) => (
                <div
                  key={item.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/60 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-xs sm:text-sm text-[#0F172A]">
                      {item.name}
                    </h3>
                    <span className="text-[11px] text-[#64748B] capitalize">
                      {item.category} subsystem
                    </span>
                  </div>

                  <div className="flex items-center gap-8 sm:gap-12">
                    <span className="text-xs font-mono text-[#64748B] hidden sm:inline">
                      {item.latencyMs} ms
                    </span>
                    <span className="text-xs font-mono font-bold text-[#0F172A]">
                      {item.uptime90d.toFixed(2)}%
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                      <span className="hidden sm:inline">Operational</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Incidents Card */}
          <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-[#64748B]" />
              <h3 className="font-display font-bold text-sm text-[#0F172A]">
                Incident History (Past 90 Days)
              </h3>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed">
              No critical outages reported. All scheduled hypervisor firmware updates and upstream BGP re-routings were performed with zero customer downtime.
            </p>
          </div>

          <div className="text-center pt-4">
            <Link
              href="/survey-vps"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:underline"
            >
              <span>Ready to deploy on our high-availability cluster? Explore ISP Plans</span>
              <ArrowRight size={13} />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
