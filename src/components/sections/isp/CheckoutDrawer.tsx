'use client';

import React, { useState } from 'react';
import { useCurrency } from '@/lib/currency';
import { IspPlan } from '@/lib/data/plans';
import { X, ShieldCheck, Check, Tag, ArrowRight, CreditCard, Lock, Sparkles } from 'lucide-react';

interface CheckoutDrawerProps {
  plan: IspPlan | null;
  carrier: string;
  isFresh: boolean;
  onClose: () => void;
}

export function CheckoutDrawer({ plan, carrier, isFresh, onClose }: CheckoutDrawerProps) {
  const { formatPrice } = useCurrency();
  const [selectedCarrier, setSelectedCarrier] = useState(carrier === 'All' ? 'AT&T' : carrier);
  const [selectedLocation, setSelectedLocation] = useState('Dallas, TX (US-Central)');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!plan) return null;

  const basePrice = isFresh ? plan.priceFreshBdt : plan.priceBdt;
  
  // Calculate cycle multiplier and discounts
  let totalBdt = basePrice;
  if (billingCycle === 'quarterly') {
    totalBdt = Math.round(basePrice * 3 * 0.95); // 5% discount
  } else if (billingCycle === 'annual') {
    totalBdt = Math.round(basePrice * 12 * 0.85); // 15% discount
  }

  // Apply coupon discount (e.g., LAUNCH10 = 10% off)
  if (couponApplied) {
    totalBdt = Math.round(totalBdt * 0.9);
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (couponCode.trim().toUpperCase() === 'LAUNCH10') {
      setCouponApplied(true);
    } else {
      setCouponError('Invalid coupon code. Try "LAUNCH10"');
    }
  };

  const handleProceedPayment = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity duration-300">
      
      {/* Click outside backdrop */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer content (480px width) */}
      <div className="w-full max-w-[480px] bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 border-l border-[#E2E8F0]">
        
        {/* Header */}
        <div>
          <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                Instant Checkout
              </span>
              <h3 className="font-display font-extrabold text-lg text-[#0F172A]">
                Configure &amp; Deploy Server
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {orderComplete ? (
            /* Order Success State */
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200">
                <Check size={32} />
              </div>
              <h4 className="font-display font-extrabold text-xl text-[#0F172A]">
                Provisioning Initiated!
              </h4>
              <p className="text-xs sm:text-sm text-[#64748B]">
                Your {plan.name} node with {selectedCarrier} residential IP is being bound to hypervisor in {selectedLocation}.
              </p>
              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs text-left space-y-1">
                <div className="text-emerald-400 font-bold">Status: [OK] Hypervisor Assigned</div>
                <div>Node IP: Assigned on payment confirmation</div>
                <div>OS: Windows 10 Pro (Hardened)</div>
                <div>Estimated Handshake: 45 Seconds</div>
              </div>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-[#2563EB] text-white text-sm font-semibold rounded-xl"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          ) : (
            /* Regular Form Content */
            <div className="p-6 space-y-6 text-xs sm:text-sm">
              
              {/* Selected Plan Summary Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#0F172A]">{plan.name}</span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100/70 text-[#2563EB]">
                    {isFresh ? '100% Virgin IP' : 'Clean ISP IP'}
                  </span>
                </div>
                <div className="text-xs text-[#64748B] flex flex-wrap gap-x-3 gap-y-1 font-mono pt-1">
                  <span>{plan.specs.vcpu} vCPU</span>
                  <span>•</span>
                  <span>{plan.specs.ram} GB RAM</span>
                  <span>•</span>
                  <span>{plan.specs.nvme} GB NVMe</span>
                  <span>•</span>
                  <span>{plan.specs.bandwidth}</span>
                </div>
              </div>

              {/* Step 1: Select Preferred Carrier */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
                  1. Select US Residential Carrier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['AT&T', 'Comcast', 'Verizon'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedCarrier(c)}
                      className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                        selectedCarrier === c
                          ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] shadow-2xs'
                          : 'border-[#E2E8F0] bg-white text-[#64748B] hover:border-slate-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Datacenter Location */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
                  2. Select Datacenter Location
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Dallas, TX', sub: 'US-Central (Fastest)' },
                    { label: 'Ashburn, VA', sub: 'US-East (Low Latency)' },
                  ].map((loc) => (
                    <button
                      key={loc.label}
                      type="button"
                      onClick={() => setSelectedLocation(`${loc.label} (${loc.sub})`)}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        selectedLocation.includes(loc.label)
                          ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]'
                          : 'border-[#E2E8F0] bg-white text-[#64748B] hover:border-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-xs text-[#0F172A]">{loc.label}</div>
                      <div className="text-[10px] text-[#64748B]">{loc.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Billing Cycle */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
                  3. Billing Cycle &amp; Discounts
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'monthly', label: '1 Month', tag: 'Standard' },
                    { id: 'quarterly', label: '3 Months', tag: 'Save 5%' },
                    { id: 'annual', label: '12 Months', tag: 'Save 15%' },
                  ].map((cycle) => (
                    <button
                      key={cycle.id}
                      type="button"
                      onClick={() => setBillingCycle(cycle.id as any)}
                      className={`p-2 rounded-lg border text-center transition-all ${
                        billingCycle === cycle.id
                          ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]'
                          : 'border-[#E2E8F0] bg-white text-[#64748B] hover:border-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-xs text-[#0F172A]">{cycle.label}</div>
                      <div className="text-[10px] text-emerald-600 font-medium">{cycle.tag}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-semibold text-[#0F172A] block">
                  Promo / Coupon Code
                </label>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Try LAUNCH10"
                    disabled={couponApplied}
                    className="flex-1 px-3 py-2 border border-[#E2E8F0] rounded-lg text-xs uppercase font-mono focus:outline-none focus:border-[#2563EB]"
                  />
                  <button
                    type="submit"
                    disabled={couponApplied || !couponCode.trim()}
                    className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold disabled:opacity-50"
                  >
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </form>
                {couponApplied && (
                  <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <Check size={12} />
                    <span>LAUNCH10 coupon applied: 10% off</span>
                  </p>
                )}
                {couponError && (
                  <p className="text-xs text-red-500 font-medium">
                    {couponError}
                  </p>
                )}
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2">
                <div className="flex justify-between text-xs text-[#64748B]">
                  <span>Base Rate:</span>
                  <span className="font-mono">{formatPrice(basePrice)}/mo</span>
                </div>
                {billingCycle !== 'monthly' && (
                  <div className="flex justify-between text-xs text-emerald-600 font-medium">
                    <span>Cycle Discount:</span>
                    <span>{billingCycle === 'quarterly' ? '-5%' : '-15%'}</span>
                  </div>
                )}
                {couponApplied && (
                  <div className="flex justify-between text-xs text-emerald-600 font-medium">
                    <span>Coupon (LAUNCH10):</span>
                    <span>-10%</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#E2E8F0] flex justify-between items-baseline">
                  <span className="font-bold text-sm text-[#0F172A]">Due Today:</span>
                  <span className="font-display font-extrabold text-2xl text-[#2563EB] tracking-tight">
                    {formatPrice(totalBdt)}
                  </span>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Footer Checkout CTA */}
        {!orderComplete && (
          <div className="p-6 border-t border-[#E2E8F0] bg-white space-y-3">
            <button
              onClick={handleProceedPayment}
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-75"
            >
              {isSubmitting ? (
                <span>Routing to Gateway...</span>
              ) : (
                <>
                  <Lock size={15} />
                  <span>Proceed to bKash / Card Payment</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-2 text-[11px] text-[#64748B]">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>Instant Automated Provisioning in &lt; 90 Seconds</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
