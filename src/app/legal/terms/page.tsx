import { pageSeo } from '@/lib/seo';
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';

export const metadata: Metadata = pageSeo({
  title: 'Terms of Service for VPS & RDP Hosting',
  description:
    'The terms that govern primavps cloud VPS, residential ISP VPS and API services, including acceptable use, billing, IP policy and cancellations.',
  path: '/legal/terms',
});

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-white border-b border-[#E2E8F0] pt-12 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-2 font-mono">
            Last Updated: November 16, 2026
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 sm:p-12 shadow-xs space-y-8 text-xs sm:text-sm text-[#334155] leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-[#0F172A]">
                1. Acceptance of Terms
              </h2>
              <p>
                By deploying or accessing any cloud instance, static residential ISP VPS, or API service provided by primavps.com, you agree to be bound by these Terms of Service. If you do not agree, you must terminate your instance immediately.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-[#0F172A]">
                2. Acceptable Use Policy (AUP)
              </h2>
              <p>
                Our residential and cloud infrastructure is intended for legitimate market research, remote work, software development, browsing automation, and cloud hosting.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li>Strictly prohibited: DDoS, port-scanning, botnet operations, cryptocurrency mining on shared hypervisors, and phishing.</li>
                <li>Violation of upstream carrier acceptable use guidelines results in immediate termination with no refund.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-[#0F172A]">
                3. SLA &amp; Service Availability
              </h2>
              <p>
                We maintain an engineering target of 99.98% network and hardware uptime on all NVMe clusters. In the event of an unscheduled outage exceeding 1 continuous hour, service credits are applied proportional to downtime upon ticket review.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-[#0F172A]">
                4. Billing, Renewals &amp; Cancellations
              </h2>
              <p>
                Services renew on a monthly, quarterly, or annual cadence depending on the chosen billing cycle. Invoices are generated 5 days prior to due dates and may be settled via automated bKash, Nagad, Credit Card, or USDT.
              </p>
            </section>

          </div>
        </div>
      </section>
    </div>
  );
}
