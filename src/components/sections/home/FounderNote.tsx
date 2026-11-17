'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageSquare, ShieldCheck, ArrowRight, HeartHandshake, PhoneCall } from 'lucide-react';

export function FounderNote() {
  return (
    <section className="py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-white border border-[#E2E8F0] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left Column: Real Human Presence & Message (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold">
              <HeartHandshake size={14} />
              <span>Built by Engineers in Dhaka</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0F172A] tracking-tight leading-snug">
              &ldquo;We built primevpsbd because we were tired of dirty proxy pools getting accounts banned.&rdquo;
            </h2>

            <p className="text-sm text-[#475569] leading-relaxed">
              In 2023, our research team tried every local RDP seller in Dhaka. Almost all of them sold recycled datacenter IPs wrapped in Proxifier. We engineered primevpsbd with hypervisor-level binding to real US residential subnets. We run on these nodes ourselves every single day.
            </p>

            {/* Founder & Lead Architect Identity with Photo */}
            <div className="pt-2 flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#2563EB] shadow-sm flex-shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&q=80"
                  alt="Mahmudur Rahman - Founder"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-display font-bold text-base text-[#0F172A]">
                  Mahmudur Rahman
                </div>
                <div className="text-xs text-[#64748B]">
                  Lead Systems Architect • primevpsbd Core Team
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 24/7 Dhaka & Dallas Operations Desk with Direct Connect (5 cols) */}
          <div className="lg:col-span-5 bg-[#0D1117] text-white p-8 sm:p-10 border-t lg:border-t-0 lg:border-l border-white/10 space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                24/7 Operations Desk
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
                <span>On-Call Active</span>
              </span>
            </div>

            <div className="space-y-4 text-xs font-mono text-slate-300">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                  🇧🇩
                </div>
                <div>
                  <span className="font-bold text-white text-xs block">Dhaka Core Office</span>
                  <span className="text-slate-400 text-[11px]">Level-3 Engineering &amp; bKash Desk • Banani, Dhaka</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  🇺🇸
                </div>
                <div>
                  <span className="font-bold text-white text-xs block">Dallas Edge Facility</span>
                  <span className="text-slate-400 text-[11px]">Infomart Carrier Hotel • AT&amp;T Services AS7018</span>
                </div>
              </div>
            </div>

            {/* Quick Live Contact Options */}
            <div className="pt-2 space-y-2.5">
              <Link
                href="/contact"
                className="w-full py-3 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
              >
                <MessageSquare size={14} />
                <span>Connect with On-Call Engineer</span>
              </Link>
              <div className="text-center text-[11px] text-slate-400 font-mono">
                Average live response: ~3 minutes
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
