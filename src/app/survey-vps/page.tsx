'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCurrency } from '@/lib/currency';
import { ISP_PLANS, CARRIERS, IspPlan } from '@/lib/data/plans';
import { CheckoutDrawer } from '@/components/sections/isp/CheckoutDrawer';
import {
  ShieldCheck,
  Zap,
  Cpu,
  HardDrive,
  Wifi,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
} from 'lucide-react';

export default function SurveyVpsPage() {
  const { formatPrice } = useCurrency();
  const [selectedCarrier, setSelectedCarrier] = useState('All');
  const [isFresh, setIsFresh] = useState(false);
  const [activePlanForCheckout, setActivePlanForCheckout] = useState<IspPlan | null>(null);

  // Filter plans based on carrier
  const filteredPlans = ISP_PLANS.filter((plan) => {
    if (selectedCarrier === 'All') return true;
    return plan.carriers.includes(selectedCarrier);
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Page Header */}
      <section className="bg-white border-b border-[#E2E8F0] pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold mb-3">
              <ShieldCheck size={14} />
              <span>Dedicated Static Residential ASN</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
              Dedicated Static Residential ISP VPS
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] mt-2 leading-relaxed">
              Clean AT&amp;T, Comcast, and Verizon IPs bound directly to KVM hypervisors. Zero WebRTC exposure, zero DNS leakage, and native residential TCP window sizes.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Interactive Filter Bar */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Carrier Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-[#64748B] mr-2 uppercase tracking-wider hidden sm:inline">
              Carrier:
            </span>
            {CARRIERS.map((carrier) => (
              <button
                key={carrier}
                onClick={() => setSelectedCarrier(carrier)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCarrier === carrier
                    ? 'bg-[#2563EB] text-white shadow-xs'
                    : 'bg-slate-100 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/70'
                }`}
              >
                {carrier === 'All' ? 'All Carriers' : carrier}
              </button>
            ))}
          </div>

          {/* IP Type Switcher (Used vs Fresh) */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="inline-flex items-center p-1 bg-slate-100 border border-[#E2E8F0] rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setIsFresh(false)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  !isFresh
                    ? 'bg-white text-[#0F172A] shadow-xs font-bold'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Clean Screened ISP IP
              </button>
              <button
                type="button"
                onClick={() => setIsFresh(true)}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  isFresh
                    ? 'bg-[#2563EB] text-white shadow-xs font-bold'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <Sparkles size={12} className={isFresh ? 'text-amber-300' : ''} />
                <span>100% Virgin Fresh IP</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3-Tier Pricing Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPlans.map((plan) => {
              const currentPrice = isFresh ? plan.priceFreshBdt : plan.priceBdt;
              const isPro = plan.tier === 'pro';

              return (
                <div
                  key={plan.id}
                  className={`rounded-2xl bg-white p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 relative ${
                    isPro
                      ? 'border-2 border-[#2563EB] shadow-xl md:-translate-y-2'
                      : 'border border-[#E2E8F0] shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Top Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-[#2563EB] text-white text-[11px] font-bold uppercase tracking-wider shadow-xs">
                      {plan.badge}
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Title & Tagline */}
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-extrabold text-xl text-[#0F172A]">
                          {plan.name}
                        </h3>
                        {/* Live Stock Badge */}
                        <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                          <span>{plan.stockCount} in stock</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                        {plan.tagline}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="py-2 border-y border-slate-100 flex items-baseline gap-2">
                      <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
                        {formatPrice(currentPrice)}
                      </span>
                      <span className="text-xs text-[#64748B]">/ month</span>
                    </div>

                    {/* Spec Chips (4-Box Grid) */}
                    <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-[#64748B] text-[10px] block uppercase">vCPU Cores</span>
                        <span className="font-semibold text-[#0F172A]">{plan.specs.vcpu} vCPU Dedicated</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-[#64748B] text-[10px] block uppercase">ECC Memory</span>
                        <span className="font-semibold text-[#0F172A]">{plan.specs.ram} GB DDR4/DDR5</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-[#64748B] text-[10px] block uppercase">NVMe Storage</span>
                        <span className="font-semibold text-[#0F172A]">{plan.specs.nvme} GB Fast Disk</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-[#64748B] text-[10px] block uppercase">Bandwidth</span>
                        <span className="font-semibold text-[#0F172A]">{plan.specs.bandwidth} Port</span>
                      </div>
                    </div>

                    {/* Key Technical Highlights */}
                    <ul className="space-y-2 text-xs text-[#0F172A] pt-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                        <span>Pre-hardened {plan.os} with Zero Leak</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                        <span>Dedicated Static ISP IP ({selectedCarrier === 'All' ? 'AT&T / Comcast' : selectedCarrier})</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                        <span>Automated &lt; 90s Provisioning Guarantee</span>
                      </li>
                      {plan.tier === 'vip' && (
                        <li className="flex items-center gap-2 font-semibold text-[#2563EB]">
                          <Sparkles size={15} className="flex-shrink-0" />
                          <span>1 Free IP Replacement within 7 Days</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Deploy Button */}
                  <div className="pt-8">
                    <button
                      onClick={() => setActivePlanForCheckout(plan)}
                      className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm ${
                        isPro
                          ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-md hover:shadow-lg'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <span>Deploy {plan.name}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Reseller Banner */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-[#0F172A] p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
                <Users size={13} />
                <span>Agency &amp; Team Program</span>
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl">
                Ordering 10+ VPS for your survey team or agency?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Get up to 20% recurring volume discount, dedicated account manager, and private carrier subnet allocation.
              </p>
            </div>
            <Link
              href="/resellers"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#0F172A] font-semibold text-sm transition-all whitespace-nowrap shadow-md"
            >
              Explore Reseller Program →
            </Link>
          </div>
        </div>
      </section>

      {/* Slide-over Checkout Drawer */}
      <CheckoutDrawer
        plan={activePlanForCheckout}
        carrier={selectedCarrier}
        isFresh={isFresh}
        onClose={() => setActivePlanForCheckout(null)}
      />

    </div>
  );
}
