import { pageSeo } from '@/lib/seo';
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = pageSeo({
  title: '7-Day IP Replacement Policy',
  description:
    'How the primavps 7-day IP replacement guarantee works for residential and virgin ISP VPS plans, including eligibility and how to request a swap.',
  path: '/legal/ip-replacement',
});

export default function IpReplacementPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-white border-b border-[#E2E8F0] pt-12 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold mb-3">
            <ShieldCheck size={14} />
            <span>Customer Trust Guarantee</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
            7-Day IP Replacement Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-2 font-mono">
            Applies to all VIP Fresh and Pro Residential ISP Tiers
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 sm:p-12 shadow-xs space-y-8 text-xs sm:text-sm text-[#334155] leading-relaxed">
            
            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-[#0F172A]">
                1. Overview of the Guarantee
              </h2>
              <p>
                At primavps.com, we understand that survey workers, vendors, and account managers rely heavily on uncontaminated IP reputation. We guarantee that all residential static IPs delivered under our VIP and Pro plans have been pre-screened to possess a 0/100 IPQualityScore fraud score and authentic ISP usage status.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-[#0F172A]">
                2. Eligibility Conditions
              </h2>
              <p>
                You are entitled to 1 free IP replacement within the first 7 days (168 hours) from instance provisioning under any of the following circumstances:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>The assigned IP displays an IPQS fraud score exceeding 15 upon initial login.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>The ASN classification reports &quot;Data Center / Hosting&quot; rather than &quot;ISP / Residential&quot;.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Upstream carrier BGP routing failure prevents connection from your location.</span>
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-lg text-[#0F172A]">
                3. Replacement Procedure
              </h2>
              <p>
                To request an automated replacement:
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                <li>Submit a ticket at <Link href="/contact" className="text-[#2563EB] hover:underline">/contact</Link> or via your dashboard with department &quot;IP Screening &amp; Replacement&quot;.</li>
                <li>Our diagnostic orchestrator validates the telemetry and binds a replacement static IP to your hypervisor in under 15 minutes.</li>
                <li>Your VPS disk image, files, and installed software remain completely intact during the NIC IP reassignment.</li>
              </ol>
            </section>

          </div>
        </div>
      </section>
    </div>
  );
}
