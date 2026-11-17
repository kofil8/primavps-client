'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

const FAQS = [
  {
    q: 'What makes your AT&T and Comcast IPs different from ordinary proxies or VPNs?',
    a: 'Ordinary proxy services route traffic through datacenter servers (DigitalOcean, AWS) or shared dirty proxy pools. Our servers are bound directly to authentic static ISP broadband gateways (AS7018 AT&T, AS7922 Comcast). Your browser communicates with native residential TCP window fingerprints and zero WebRTC leakage.',
  },
  {
    q: 'Will my survey accounts on Swagbucks, Cint, or PureSpectrum get flagged?',
    a: 'No. These platforms use IPQualityScore and MaxMind to verify ASN type. Because our IPs have guaranteed 0/100 fraud scores and are verified "ISP" type, survey routers treat your session as a genuine US resident browsing from home.',
  },
  {
    q: 'How fast is server provisioning and which payment methods work?',
    a: 'Provisioning is 100% automated. As soon as you confirm payment via bKash, Nagad, Visa/Mastercard, or USDT, your RDP credentials (IP, Port, Username, Password) are generated and displayed on your screen in under 90 seconds.',
  },
  {
    q: 'What is the 7-Day Free IP Replacement Policy?',
    a: 'On our VIP Fresh tier, if your virgin ISP IP experiences any carrier-side routing issue or unexpected block within the first 7 days, our automated system provides 1 free replacement with another clean static IP.',
  },
];

export function ProofAndFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block mb-2 font-mono">
            Frequently Answered
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0F172A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#64748B] mt-2">
            Everything you need to know about our residential routing and cloud provisioning.
          </p>
        </div>

        {/* Clean FAQ Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left py-4 px-6 flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#0F172A] hover:bg-slate-100/60 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#64748B] flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#2563EB]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* High-Converting Bottom CTA Card */}
        <div className="mt-16 rounded-3xl bg-[#0D1117] text-white p-8 sm:p-12 text-center space-y-4 shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            <span>Automated 90-Second Delivery</span>
          </div>

          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Ready to deploy your high-reputation server?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Instant bKash, Nagad, Card and USDT checkout with automated hypervisor deployment.
          </p>

          <div className="pt-3 flex flex-wrap justify-center gap-3">
            <Link
              href="/survey-vps"
              className="px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              Deploy Survey ISP VPS (৳2,999)
            </Link>
            <Link
              href="/cloud-vps"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold transition-all border border-white/15 backdrop-blur-md"
            >
              Configure Cloud Instance (৳950)
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
