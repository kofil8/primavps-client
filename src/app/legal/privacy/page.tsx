import { pageSeo } from '@/lib/seo';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = pageSeo({
  title: 'Privacy Policy for VPS & RDP Customers',
  description:
    'How primavps collects, stores and protects customer data across our Dhaka and US infrastructure, and the rights you have over your information.',
  path: '/legal/privacy',
});

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-white border-b border-[#E2E8F0] pt-12 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
            Privacy Policy
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
                1. Information We Collect
              </h2>
              <p>
                We collect only minimal information necessary to deliver and invoice your cloud infrastructure:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-700">
                <li>Account details: Email address and contact name for billing authentication.</li>
                <li>Transaction records: bKash/Nagad transaction IDs or Stripe card tokens. We never store raw credit card numbers.</li>
                <li>System logs: Edge ingress IP logs retained for 72 hours solely for DDoS mitigation.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-[#0F172A]">
                2. No Packet Inspection Policy
              </h2>
              <p>
                We do not inspect, intercept, or record customer payload traffic inside your KVM instance or RDP sessions. Your operating system disk image is encrypted at rest on NVMe arrays.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-[#0F172A]">
                3. Third-Party Disclosures
              </h2>
              <p>
                We do not sell, rent, or trade your personal or business data to advertising brokers. Data is shared exclusively with payment processors (bKash/Stripe) to execute authorized charges.
              </p>
            </section>

          </div>
        </div>
      </section>
    </div>
  );
}
