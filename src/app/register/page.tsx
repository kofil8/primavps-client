'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, Mail, User, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/survey-vps';
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC]">
      <div className="w-full max-w-md bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm space-y-6">
        
        <div className="space-y-2 text-center">
          <Link href="/" className="inline-block font-display font-extrabold text-2xl text-[#0F172A] tracking-tight">
            primevpsbd
          </Link>
          <h1 className="font-display font-bold text-xl text-[#0F172A]">
            Create your account
          </h1>
          <p className="text-xs text-[#64748B]">
            Deploy clean residential ISP servers in less than 90 seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#0F172A]">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tanvir Ahmed"
                className="w-full pl-10 pr-4 py-2.5 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#0F172A]">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tanvir@company.com"
                className="w-full pl-10 pr-4 py-2.5 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#0F172A]">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full pl-10 pr-4 py-2.5 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div className="text-[11px] text-[#64748B] leading-relaxed">
            By signing up, you agree to our{' '}
            <Link href="/legal/terms" className="text-[#2563EB] hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/legal/privacy" className="text-[#2563EB] hover:underline">
              Privacy Policy
            </Link>.
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Create Client Account</span>
            <ArrowRight size={15} />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-[#64748B]">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[#2563EB] hover:underline">
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
}
