'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
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
            Welcome back
          </h1>
          <p className="text-xs text-[#64748B]">
            Manage your servers, residential IPs, and billing securely.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#0F172A]">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-2.5 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-[#0F172A]">Password</label>
              <a href="#" className="text-[#2563EB] hover:underline font-medium">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Continue to Dashboard</span>
            <ArrowRight size={15} />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-[#64748B]">
          Don&apos;t have an account yet?{' '}
          <Link href="/register" className="font-semibold text-[#2563EB] hover:underline">
            Create account
          </Link>
        </div>

      </div>
    </div>
  );
}
