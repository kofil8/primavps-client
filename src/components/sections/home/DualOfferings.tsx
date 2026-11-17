'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCurrency } from '@/lib/currency';
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu, HardDrive, Wifi, Sparkles, Zap } from 'lucide-react';

export function DualOfferings() {
  const { formatPrice } = useCurrency();

  return (
    <section className="py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block mb-2 font-mono">
            Core Infrastructure
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#0F172A] tracking-tight">
            High-Performance Compute &amp; ISP Routing
          </h2>
          <p className="text-sm text-[#64748B] mt-2">
            Pick between authentic US residential broadband instances or scalable NVMe cloud servers.
          </p>
        </div>

        {/* 2 Big Visual Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Dedicated ISP Compute */}
          <div className="rounded-3xl bg-white border-2 border-[#2563EB] shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
            
            {/* Visual Header Image */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-900">
              <Image
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
                alt="AT&T and Comcast US Residential Routing Hypervisor"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              {/* Badges on image */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#2563EB] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <Sparkles size={13} />
                <span>Most Popular</span>
              </div>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-[11px] font-mono uppercase text-blue-300 font-bold tracking-wider">
                  Residential Network Slice
                </span>
                <h3 className="font-display font-bold text-2xl text-white">
                  Dedicated ISP Compute
                </h3>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Authentic AT&amp;T &amp; Comcast static residential IPs bound at the hypervisor level. 100% leak-free Windows 10/11 Pro for high-trust accounts.
                </p>

                {/* Price */}
                <div className="py-2 border-y border-slate-100 flex items-baseline gap-2">
                  <span className="text-xs text-[#64748B] uppercase font-semibold">From</span>
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
                    {formatPrice(2999)}
                  </span>
                  <span className="text-xs text-[#64748B]">/ month (Instant bKash/Nagad)</span>
                </div>

                {/* Spec Chips (4-Box Grid) */}
                <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-[#64748B] block">Carrier Route</span>
                    <span className="font-bold text-[#0F172A] text-xs">AT&amp;T / Comcast</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-[#64748B] block">IPQS Fraud Score</span>
                    <span className="font-bold text-emerald-600 text-xs">0 / 100 Clean</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-[#64748B] block">Hardware</span>
                    <span className="font-bold text-[#0F172A] text-xs">2–4 Dedicated vCPU</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-[#64748B] block">Storage</span>
                    <span className="font-bold text-[#0F172A] text-xs">45–80 GB NVMe</span>
                  </div>
                </div>

                {/* Crisp Bullets */}
                <ul className="space-y-2 text-xs text-[#334155] pt-1 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                    <span>Zero WebRTC &amp; DNS leak (Kernel routed, no Proxifier)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                    <span>7-Day Automated IP Replacement Guarantee</span>
                  </li>
                </ul>
              </div>

              {/* Deploy CTA */}
              <div className="pt-4">
                <Link
                  href="/survey-vps"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm shadow-md transition-all active:scale-[0.98]"
                >
                  <span>Deploy ISP Instance (Live Stock)</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

          </div>

          {/* Card 2: Scalable Cloud Instances */}
          <div className="rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
            
            {/* Visual Header Image */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-900">
              <Image
                src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80"
                alt="Pure NVMe Compute Server Racks"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-[11px] font-mono uppercase text-purple-300 font-bold tracking-wider">
                  Cloud Compute &amp; APIs
                </span>
                <h3 className="font-display font-bold text-2xl text-white">
                  Scalable Cloud Instances
                </h3>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Pure NVMe RAID-1 compute for production web apps, databases, and microservices. Dedicated vCPU cores with sub-millisecond IOPS.
                </p>

                {/* Price */}
                <div className="py-2 border-y border-slate-100 flex items-baseline gap-2">
                  <span className="text-xs text-[#64748B] uppercase font-semibold">From</span>
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
                    {formatPrice(950)}
                  </span>
                  <span className="text-xs text-[#64748B]">/ month (Customizable resources)</span>
                </div>

                {/* Spec Chips (4-Box Grid) */}
                <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-[#64748B] block">Compute</span>
                    <span className="font-bold text-[#0F172A] text-xs">1 to 16 vCPUs</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-[#64748B] block">Memory</span>
                    <span className="font-bold text-[#0F172A] text-xs">2 to 64 GB RAM</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-[#64748B] block">Storage</span>
                    <span className="font-bold text-[#0F172A] text-xs">30 to 500 GB NVMe</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-[#64748B] block">Port Speed</span>
                    <span className="font-bold text-[#0F172A] text-xs">1 Gbps Unmetered</span>
                  </div>
                </div>

                {/* Crisp Bullets */}
                <ul className="space-y-2 text-xs text-[#334155] pt-1 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                    <span>AMD EPYC™ &amp; Intel® Xeon Gold enterprise processors</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                    <span>Custom OS: Ubuntu 24.04, Debian 12, Windows Server</span>
                  </li>
                </ul>
              </div>

              {/* Deploy CTA */}
              <div className="pt-4">
                <Link
                  href="/cloud-vps"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-white hover:bg-slate-50 text-[#0F172A] border border-[#E2E8F0] font-semibold text-sm shadow-xs hover:border-slate-300 transition-all active:scale-[0.98]"
                >
                  <span>Launch Cloud Configurator</span>
                  <ArrowRight size={16} className="text-[#64748B]" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
