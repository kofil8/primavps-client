'use client';

import React, { useState } from 'react';
import { Users, CheckCircle2, ShieldCheck, ArrowRight, Check } from 'lucide-react';

const TIERS = [
  {
    tier: 'Tier 1 (Teams)',
    quantity: '10 to 24 Instances',
    discount: '10% Recurring Discount',
    perks: ['Shared carrier subnet', 'Priority Discord/WhatsApp engineering channel', 'Centralized single invoice'],
  },
  {
    tier: 'Tier 2 (Agencies)',
    quantity: '25 to 49 Instances',
    discount: '15% Recurring Discount',
    perks: ['Dedicated private /28 or /27 subnet', 'Automated API provisioning key', 'Instant bulk IP re-assignment'],
  },
  {
    tier: 'Tier 3 (Enterprise Vendors)',
    quantity: '50+ Instances',
    discount: '20% Recurring Discount',
    perks: ['Custom carrier route reservation (AT&T, Comcast, Verizon)', 'Dedicated hypervisor slice', 'SLA 99.99% contract'],
  },
];

export function ResellersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    quantity: '10-25',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Header */}
      <section className="bg-white border-b border-[#E2E8F0] pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold mb-3">
              <Users size={14} />
              <span>Bulk Reseller &amp; Agency Program</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
              Scale Your Team With Dedicated Residential Subnets
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] mt-2 leading-relaxed">
              Wholesale pricing, isolated carrier pools, and automated management for survey agencies, lead generation firms, and vendor teams.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Tiers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIERS.map((tier, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider block">
                      {tier.tier}
                    </span>
                    <h3 className="font-display font-bold text-xl text-[#0F172A] mt-1">
                      {tier.quantity}
                    </h3>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 font-display font-bold text-base text-[#2563EB]">
                    {tier.discount}
                  </div>

                  <ul className="space-y-2.5 text-xs text-[#0F172A]">
                    {tier.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Application Form */}
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check size={24} />
                </div>
                <h3 className="font-display font-bold text-xl text-[#0F172A]">
                  Inquiry Received
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  Our vendor relations engineer will contact you via email within 2 business hours with wholesale pricing tiers and test credentials.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#0F172A]">
                    Apply for Wholesale Pricing
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Fill out your projected instance requirements below to activate your vendor discount.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#0F172A]">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#0F172A]">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="agency@company.com"
                      className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#0F172A]">Estimated VPS Count</label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#2563EB] bg-white"
                  >
                    <option value="10-25">10 to 24 Instances (10% off)</option>
                    <option value="25-50">25 to 49 Instances (15% off)</option>
                    <option value="50+">50+ Instances (20% off + Private Subnet)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#0F172A]">Specific Carrier or Location Needs</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify preferred carriers (AT&T, Comcast, Verizon) or primary survey platforms..."
                    className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm active:scale-[0.98]"
                >
                  Submit Wholesale Application
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}

export default ResellersPage;
