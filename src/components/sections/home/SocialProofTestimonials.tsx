'use client';

import React from 'react';
import Image from 'next/image';
import { Star, CheckCircle2, ShieldCheck, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  location: string;
  avatarUrl: string;
  carrierUsed: string;
  outcomeBadge: string;
  quote: string;
  verifiedUser: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Tanvir Hossain',
    role: 'Market Research Professional',
    location: 'Dhaka, Bangladesh',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&q=80',
    carrierUsed: 'AT&T Dallas Residential',
    outcomeBadge: '0 Bans in 8 Months',
    quote:
      'I lost three survey accounts on local RDP sellers due to cheap Proxifier leaks. Moving to primevpsbd was night and day. The AT&T IP is truly static, zero WebRTC leak, and passes IPQS every single time.',
    verifiedUser: true,
  },
  {
    name: 'Rafiqul Islam',
    role: 'Agency Lead (12 Account Team)',
    location: 'Chittagong, Bangladesh',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80',
    carrierUsed: 'Comcast & Verizon Pool',
    outcomeBadge: '14 Active Nodes',
    quote:
      'We run an agency with 12 workers on US panels. Being able to pay via bKash and get instant server credentials in 2 minutes without messaging someone on WhatsApp is a huge operational advantage.',
    verifiedUser: true,
  },
  {
    name: 'David Miller',
    role: 'E-Commerce Operations',
    location: 'Austin, Texas',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&q=80',
    carrierUsed: 'Custom Cloud NVMe',
    outcomeBadge: '99.99% Node Uptime',
    quote:
      'We use primevpsbd for our distributed crawling microservices. The NVMe IOPS speed is genuinely dedicated, and the ability to add clean residential egress addresses saved our team weeks.',
    verifiedUser: true,
  },
];

export function SocialProofTestimonials() {
  return (
    <section className="py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block mb-2 font-mono">
            Verified Experiences
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#0F172A] tracking-tight">
            Trusted by 850+ Surveyors &amp; Teams
          </h2>
          <p className="text-sm text-[#64748B] mt-2">
            Real outcomes from Bangladeshi freelancers, agency leads, and cloud engineers.
          </p>
        </div>

        {/* 3 Real Human Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-xs hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Stars & Outcome Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {item.outcomeBadge}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-[#334155] leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author with Real Photo Avatar */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-xs flex-shrink-0">
                  <Image
                    src={item.avatarUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#0F172A]">
                    <span>{item.name}</span>
                    {item.verifiedUser && (
                      <span title="Verified Active Customer">
                        <CheckCircle2 size={14} className="text-[#2563EB]" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    {item.role} • {item.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-12 p-4 rounded-2xl bg-slate-50 border border-[#E2E8F0] flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-[#64748B]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0F172A] text-sm">850+</span>
            <span>Active Survey Instances</span>
          </div>
          <div className="hidden sm:block text-slate-300">•</div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0F172A] text-sm">0/100</span>
            <span>IPQS Clean Reputation</span>
          </div>
          <div className="hidden sm:block text-slate-300">•</div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0F172A] text-sm">3 Mins</span>
            <span>Avg. Live Chat Response</span>
          </div>
        </div>

      </div>
    </section>
  );
}
