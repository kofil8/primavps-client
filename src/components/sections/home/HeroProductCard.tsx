'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  RotateCcw,
  Monitor,
  ShieldCheck,
  Check,
  Cpu,
  Wifi,
  HardDrive,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

export function HeroProductCard() {
  const [rebooting, setRebooting] = useState(false);
  const [activeTab, setActiveTab] = useState<'node' | 'vnc'>('node');

  const handleReboot = () => {
    setRebooting(true);
    setTimeout(() => setRebooting(false), 1500);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      
      {/* Floating Payment Notification (Top Right) */}
      <div className="absolute -top-4 right-2 sm:right-6 z-20 px-3.5 py-1.5 rounded-full bg-[#161B22]/95 border border-emerald-500/30 text-white text-[11px] font-mono shadow-xl backdrop-blur-md flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
        <span className="text-pink-400 font-bold">bKash</span>
        <span className="text-slate-300">৳2,999 Approved —</span>
        <span className="text-emerald-400 font-semibold">Active in 68s</span>
      </div>

      {/* Main Glassmorphic Cloud Card */}
      <div className="rounded-3xl bg-[#161B22]/90 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden text-slate-100">
        
        {/* Hardware Visual Banner */}
        <div className="relative h-28 w-full overflow-hidden border-b border-white/10">
          <Image
            src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80"
            alt="Dallas Tier-1 Datacenter Hardware"
            fill
            className="object-cover object-center opacity-40 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161B22] via-[#161B22]/60 to-transparent" />
          
          <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="font-mono text-xs font-bold text-white tracking-wide">
                dallas-att-04.primevpsbd.com
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
              AT&amp;T Residential
            </span>
          </div>
        </div>

        {/* View Switcher Bar */}
        <div className="px-5 py-2.5 bg-[#0D1117] border-b border-white/5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 p-0.5 bg-slate-900 border border-white/10 rounded-lg">
            <button
              onClick={() => setActiveTab('node')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'node'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Control Panel
            </button>
            <button
              onClick={() => setActiveTab('vnc')}
              className={`px-3 py-1 rounded-md font-medium flex items-center gap-1 transition-colors ${
                activeTab === 'vnc'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor size={12} />
              <span>RDP Display</span>
            </button>
          </div>

          <button
            onClick={handleReboot}
            disabled={rebooting}
            className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono flex items-center gap-1 transition-all"
          >
            <RotateCcw size={11} className={rebooting ? 'animate-spin text-blue-400' : ''} />
            <span>{rebooting ? 'Rebooting...' : 'Reboot'}</span>
          </button>
        </div>

        {/* Card Body */}
        {activeTab === 'node' ? (
          <div className="p-5 space-y-4">
            {/* Visual Clean Telemetry Box */}
            <div className="p-3.5 rounded-2xl bg-[#0D1117] border border-white/10 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-mono text-slate-400">Assigned Residential IP</span>
                <div className="font-mono font-bold text-emerald-400 text-sm">
                  108.204.142.88
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  AS7018 AT&amp;T Services • Dallas, TX
                </div>
              </div>

              <div className="text-right">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold block">
                  0/100 IPQS
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">Zero WebRTC Leak</span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-[10px] text-slate-400 block">vCPU Load</span>
                <span className="font-bold text-white text-xs mt-0.5 block">14.2%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-[10px] text-slate-400 block">Active RAM</span>
                <span className="font-bold text-white text-xs mt-0.5 block">2.4 / 6 GB</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-[10px] text-slate-400 block">NVMe Speed</span>
                <span className="font-bold text-emerald-400 text-xs mt-0.5 block">&lt; 0.4ms</span>
              </div>
            </div>
          </div>
        ) : (
          /* VNC Desktop Display */
          <div className="p-5 bg-[#0D1117] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/10 pb-2">
              <span className="text-white font-semibold">Windows 10 Pro (60 FPS RDP)</span>
              <span className="text-emerald-400">● Zero Leak Verified</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono space-y-1.5">
              <div className="text-emerald-400 font-bold">✓ BrowserLeaks Test: 100% Passed</div>
              <div className="text-slate-300">• Public IP: 108.204.142.88 (Dallas, TX)</div>
              <div className="text-slate-300">• WebRTC STUN: Clean Match (No BD Exposure)</div>
              <div className="text-blue-400 text-[11px] pt-1">Safe for Swagbucks, Cint, PayPal &amp; Stripe</div>
            </div>
          </div>
        )}

      </div>

      {/* Floating Human Support Engineer Badge (Bottom Left) */}
      <div className="absolute -bottom-5 -left-2 sm:left-4 z-20 px-3.5 py-2 rounded-2xl bg-[#161B22]/95 border border-white/15 text-white shadow-2xl backdrop-blur-md flex items-center gap-3">
        <div className="relative">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-400 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80"
              alt="Tanvir - Operations Lead"
              fill
              className="object-cover"
            />
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
        </div>
        <div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <span>Tanvir · On-Call Lead</span>
            <span className="text-[10px] text-emerald-400 font-mono">Online</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            Dhaka Desk · Reply in ~3 mins
          </div>
        </div>
      </div>

    </div>
  );
}
