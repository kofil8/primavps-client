'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#F8FAFC] border-t border-[#E2E8F0] text-[#0F172A] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Grid: 4 Links Columns + Brand Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-display font-extrabold text-xl text-[#0F172A] tracking-tight">
                primevpsbd
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Enterprise Cloud VPS and clean US Residential ISP instances. Automated sub-90s provisioning with native bKash, Nagad, and Card checkout.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot" />
                <span>99.98% Network SLA</span>
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">Products</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#64748B]">
              <li>
                <Link href="/survey-vps" className="hover:text-[#2563EB] transition-colors">
                  AT&T Survey VPS
                </Link>
              </li>
              <li>
                <Link href="/survey-vps" className="hover:text-[#2563EB] transition-colors">
                  Comcast ISP Windows RDP
                </Link>
              </li>
              <li>
                <Link href="/cloud-vps" className="hover:text-[#2563EB] transition-colors">
                  Custom NVMe Cloud VPS
                </Link>
              </li>
              <li>
                <Link href="/resellers" className="hover:text-[#2563EB] transition-colors">
                  Bulk Vendor Program (20% off)
                </Link>
              </li>
            </ul>
          </div>

          {/* Free Tools Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">Free Tools</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#64748B]">
              <li>
                <Link href="/tools/ip-checker" className="hover:text-[#2563EB] transition-colors flex items-center gap-1.5">
                  <span>IP Fraud & Leak Checker</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 bg-blue-50 text-[#2563EB] rounded">Free</span>
                </Link>
              </li>
              <li>
                <Link href="/tools/webrtc-test" className="hover:text-[#2563EB] transition-colors">
                  WebRTC Leak Test
                </Link>
              </li>
              <li>
                <Link href="/tools/looking-glass" className="hover:text-[#2563EB] transition-colors">
                  Looking Glass & Ping
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#2563EB] transition-colors">
                  Engineering Blog & Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#64748B]">
              <li>
                <Link href="/status" className="hover:text-[#2563EB] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                  <span>System Status</span>
                </Link>
              </li>
              <li>
                <Link href="/resellers" className="hover:text-[#2563EB] transition-colors">
                  Volume Resellers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#2563EB] transition-colors">
                  Contact Support (24/7)
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#2563EB] transition-colors">
                  Client Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">Trust & Legal</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#64748B]">
              <li>
                <Link href="/legal/terms" className="hover:text-[#2563EB] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-[#2563EB] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/ip-replacement" className="hover:text-[#2563EB] transition-colors">
                  7-Day IP Replacement Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Payment Gateways Bar */}
        <div className="mt-12 pt-8 border-t border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center flex-wrap gap-2 text-xs text-[#64748B]">
            <span className="font-semibold text-[#0F172A] mr-1">Supported Payments:</span>
            <span className="px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-md font-medium text-pink-600 shadow-2xs">
              bKash
            </span>
            <span className="px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-md font-medium text-orange-600 shadow-2xs">
              Nagad
            </span>
            <span className="px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-md font-medium text-blue-700 shadow-2xs">
              Visa / Mastercard
            </span>
            <span className="px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-md font-medium text-emerald-700 shadow-2xs">
              USDT (TRC-20)
            </span>
          </div>

          <p className="text-xs text-[#64748B]">
            &copy; {new Date().getFullYear()} primevpsbd.com. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
