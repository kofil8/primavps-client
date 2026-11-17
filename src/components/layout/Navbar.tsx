'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCurrency } from '@/lib/currency';
import {
  ChevronDown,
  ShieldCheck,
  Cpu,
  Users,
  Search,
  Activity,
  Terminal,
  BookOpen,
  Headphones,
  ArrowRight,
  Menu,
  X,
  Server,
} from 'lucide-react';

export function Navbar() {
  const { currency, setCurrency } = useCurrency();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-slate-200 bg-white/95 shadow-[0_1px_2px_rgba(15,23,42,0.03)] backdrop-blur-md transition-colors">
      <div
        ref={navRef}
        className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between"
      >
        {/* Left: Brand Logo & Operational Status */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 transition-colors group-hover:text-blue-700">
              primevpsbd
            </span>
          </Link>
          <Link
            href="/status"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-mono text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
            title="All systems operational"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
            <span>Operational</span>
          </Link>
        </div>

        {/* Center: Consolidated Dropdowns */}
        <nav className="hidden lg:flex items-center gap-2">
          
          {/* 1. Products Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('products')}
              aria-expanded={openDropdown === 'products'}
              aria-controls={openDropdown === 'products' ? 'products-dropdown' : undefined}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                openDropdown === 'products'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
              }`}
            >
              <span>Products</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  openDropdown === 'products'
                    ? 'rotate-180 text-blue-700'
                    : 'text-slate-500'
                }`}
              />
            </button>

            {openDropdown === 'products' && (
              <div id="products-dropdown" className="absolute top-full left-0 mt-2 w-80 space-y-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <Link
                  href="/survey-vps"
                  onClick={() => setOpenDropdown(null)}
                  className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-50"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                      <span>Dedicated ISP Compute</span>
                      <span className="rounded bg-blue-50 px-1.5 py-0.2 font-mono text-[10px] text-blue-700">Flagship</span>
                    </div>
                    <div className="mt-0.5 text-[11px] leading-snug text-slate-500">
                      Authentic US residential routing for high-trust environments.
                    </div>
                  </div>
                </Link>

                <Link
                  href="/cloud-vps"
                  onClick={() => setOpenDropdown(null)}
                  className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-50"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Scalable Cloud Instances
                    </div>
                    <div className="mt-0.5 text-[11px] leading-snug text-slate-500">
                      Pure NVMe compute for web apps, microservices &amp; databases.
                    </div>
                  </div>
                </Link>

                <Link
                  href="/resellers"
                  onClick={() => setOpenDropdown(null)}
                  className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-50"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Users size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Volume Reseller Program
                    </div>
                    <div className="mt-0.5 text-[11px] leading-snug text-slate-500">
                      Wholesale discounts &amp; private subnets for teams and agencies.
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* 2. Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('tools')}
              aria-expanded={openDropdown === 'tools'}
              aria-controls={openDropdown === 'tools' ? 'tools-dropdown' : undefined}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                openDropdown === 'tools'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
              }`}
            >
              <span>Tools</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  openDropdown === 'tools'
                    ? 'rotate-180 text-blue-700'
                    : 'text-slate-500'
                }`}
              />
            </button>

            {openDropdown === 'tools' && (
              <div id="tools-dropdown" className="absolute top-full left-0 mt-2 w-80 space-y-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <Link
                  href="/tools/ip-checker"
                  onClick={() => setOpenDropdown(null)}
                  className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-50"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Search size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                      <span>IP Fraud &amp; Leak Checker</span>
                      <span className="rounded bg-emerald-50 px-1.5 py-0.2 font-mono text-[10px] text-emerald-700">Free</span>
                    </div>
                    <div className="mt-0.5 text-[11px] leading-snug text-slate-500">
                      Instant IPQS score, proxy flags &amp; ASN inspection.
                    </div>
                  </div>
                </Link>

                <Link
                  href="/tools/webrtc-test"
                  onClick={() => setOpenDropdown(null)}
                  className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-50"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <Activity size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      WebRTC Leak Test
                    </div>
                    <div className="mt-0.5 text-[11px] leading-snug text-slate-500">
                      Detect hidden browser STUN ICE candidate exposure.
                    </div>
                  </div>
                </Link>

                <Link
                  href="/tools/looking-glass"
                  onClick={() => setOpenDropdown(null)}
                  className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-50"
                >
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                    <Terminal size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Looking Glass &amp; Ping
                    </div>
                    <div className="mt-0.5 text-[11px] leading-snug text-slate-500">
                      Probe network latency and routes from US edge nodes.
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* 3. Resources Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('resources')}
              aria-expanded={openDropdown === 'resources'}
              aria-controls={openDropdown === 'resources' ? 'resources-dropdown' : undefined}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                openDropdown === 'resources'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-100/70 hover:text-slate-900'
              }`}
            >
              <span>Resources</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  openDropdown === 'resources'
                    ? 'rotate-180 text-blue-700'
                    : 'text-slate-500'
                }`}
              />
            </button>

            {openDropdown === 'resources' && (
              <div id="resources-dropdown" className="absolute top-full left-0 mt-2 w-80 space-y-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <Link
                  href="/blog"
                  onClick={() => setOpenDropdown(null)}
                  className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-50"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Engineering Blog
                    </div>
                    <div className="mt-0.5 text-[11px] leading-snug text-slate-500">
                      Practical guides on VPS sizing, IP security &amp; BGP.
                    </div>
                  </div>
                </Link>

                <Link
                  href="/status"
                  onClick={() => setOpenDropdown(null)}
                  className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-50"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Server size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      System Status &amp; SLA
                    </div>
                    <div className="mt-0.5 text-[11px] leading-snug text-slate-500">
                      Real-time 90-day uptime metrics &amp; edge latency.
                    </div>
                  </div>
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setOpenDropdown(null)}
                  className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-50"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Headphones size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      24/7 Operations Desk
                    </div>
                    <div className="mt-0.5 text-[11px] leading-snug text-slate-500">
                      Direct engineering support in Dhaka &amp; Dallas.
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

        </nav>

        {/* Right: Currency Switcher & Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Currency Toggle */}
          <div className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => setCurrency('BDT')}
              className={`px-2.5 py-1 rounded-[6px] transition-all ${
                currency === 'BDT'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              ৳ BDT
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 rounded-[6px] transition-all ${
                currency === 'USD'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              $ USD
            </button>
          </div>

          {/* Sign In */}
          <Link
            href="/login"
            className="px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:text-slate-900 sm:text-sm"
          >
            Sign In
          </Link>

          {/* Glowing Deploy CTA */}
          <Link
            href="/cloud-vps"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#365FE8] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#294dc4] active:scale-[0.98] sm:text-sm"
          >
            <span>Deploy Server</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrency(currency === 'BDT' ? 'USD' : 'BDT')}
            className="rounded border border-slate-200 bg-white px-2 py-1 font-mono text-xs font-bold text-slate-700"
          >
            {currency === 'BDT' ? '৳ BDT' : '$ USD'}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls={mobileMenuOpen ? 'mobile-menu' : undefined}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="space-y-4 border-b border-slate-200 bg-white px-4 pb-6 pt-3 text-sm shadow-xl animate-in slide-in-from-top-2 duration-200 md:hidden">
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-500">Products</div>
            <Link
              href="/survey-vps"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-50"
            >
              <span>Dedicated ISP Compute</span>
              <span className="text-[10px] text-blue-400 font-mono">from ৳2,999</span>
            </Link>
            <Link
              href="/cloud-vps"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-50"
            >
              <span>Scalable Cloud Instances</span>
              <span className="text-[10px] text-blue-400 font-mono">from ৳950</span>
            </Link>
            <Link
              href="/resellers"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-50"
            >
              Volume Reseller Program
            </Link>
          </div>

          <div className="space-y-1 border-t border-slate-200 pt-3">
            <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-500">Free Tools</div>
            <Link
              href="/tools/ip-checker"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-50"
            >
              IP Fraud &amp; Leak Checker
            </Link>
            <Link
              href="/tools/webrtc-test"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-50"
            >
              WebRTC Leak Test
            </Link>
            <Link
              href="/tools/looking-glass"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-50"
            >
              Looking Glass &amp; Ping
            </Link>
          </div>

          <div className="space-y-1 border-t border-slate-200 pt-3">
            <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-500">Resources</div>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-50"
            >
              Engineering Blog
            </Link>
            <Link
              href="/status"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-50"
            >
              System Status
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-50"
            >
              Contact Support
            </Link>
          </div>

          <div className="space-y-2 border-t border-slate-200 pt-3">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-2.5 text-center text-slate-600 hover:text-slate-900"
            >
              Sign In
            </Link>
            <Link
              href="/cloud-vps"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-2.5 text-center bg-[#2563EB] text-white font-semibold rounded-xl"
            >
              Deploy Server Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
