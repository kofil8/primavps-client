'use client';

import React, { useState } from 'react';
import {
  RotateCcw,
  Power,
  Monitor,
  Terminal,
  Activity,
  ShieldCheck,
  Check,
  ExternalLink,
  Cpu,
  Wifi,
  HardDrive,
} from 'lucide-react';

export function ClientControlPanelMockup() {
  const [activeTab, setActiveTab] = useState<'control' | 'vnc'>('control');
  const [powerState, setPowerState] = useState<'running' | 'rebooting'>('running');
  const [rebootCount, setRebootCount] = useState(0);

  const handleReboot = () => {
    setPowerState('rebooting');
    setTimeout(() => {
      setPowerState('running');
      setRebootCount((c) => c + 1);
    }, 1800);
  };

  return (
    <div className="w-full rounded-2xl bg-[#0A0F1D] border border-slate-800/90 shadow-2xl overflow-hidden text-slate-200">
      
      {/* Top App Window Bar */}
      <div className="px-4 py-3 bg-[#060A14] border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-slate-400 pl-2">
            app.primevpsbd.com/vms/dal-att-042
          </span>
        </div>

        {/* View Switcher: Control Panel vs VNC Screen */}
        <div className="flex items-center p-0.5 bg-slate-900 border border-slate-800 rounded-lg text-xs">
          <button
            onClick={() => setActiveTab('control')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              activeTab === 'control'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('vnc')}
            className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'vnc'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor size={12} />
            <span>VNC Display</span>
          </button>
        </div>
      </div>

      {activeTab === 'control' ? (
        /* Real Interactive VM Dashboard View */
        <div className="p-5 sm:p-6 space-y-5">
          
          {/* Node Identity & Power Controls Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base text-white">
                  dal-att-win10-042
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  AT&amp;T Residential
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
                <span>Dallas, TX</span>
                <span>•</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                  {powerState === 'rebooting' ? 'Hard Rebooting...' : 'Online (Uptime: 24d 18h)'}
                </span>
              </div>
            </div>

            {/* Actions: One-click Reboot & Hard Power */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleReboot}
                disabled={powerState === 'rebooting'}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-all flex items-center gap-1.5 disabled:opacity-50 active:scale-95"
                title="Instant hard reboot via hypervisor API"
              >
                <RotateCcw size={12} className={powerState === 'rebooting' ? 'animate-spin' : ''} />
                <span>Reboot</span>
              </button>
              <button
                onClick={() => setActiveTab('vnc')}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Monitor size={12} />
                <span>Launch RDP</span>
              </button>
            </div>
          </div>

          {/* Quick Real-time Specs & Health Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">CPU Usage</div>
              <div className="text-sm font-bold text-white mt-0.5">14.2%</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-500 h-full w-[14%]" />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">RAM Active</div>
              <div className="text-sm font-bold text-white mt-0.5">2.4 / 6.0 GB</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full w-[40%]" />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">NVMe Disk IO</div>
              <div className="text-sm font-bold text-white mt-0.5">0.4ms Latency</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-cyan-500 h-full w-[18%]" />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">IPQS Score</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">0 / 100 Clean</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-400 h-full w-[100%]" />
              </div>
            </div>
          </div>

          {/* Assigned Dedicated ISP Routing Box */}
          <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-[11px]">Assigned Residential IP:</span>
                <span className="font-bold text-emerald-400">108.204.142.88</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Static
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Carrier: AS7018 AT&amp;T Services • Gateway Dallas Core • Zero DNS Leak
              </div>
            </div>

            <div className="text-right flex items-center gap-2 self-end sm:self-auto">
              <span className="text-[11px] text-slate-400 font-mono">Port: 3389</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[10px]">
                RDP Enabled
              </span>
            </div>
          </div>

          {/* Footer note: Human on-call monitor */}
          <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>Hypervisor Node Managed by Dallas Ops Team</span>
            </span>
            <span className="text-slate-400">Zero Proxifier Overhead</span>
          </div>

        </div>
      ) : (
        /* VNC Windows 10 Pro Remote Desktop Preview */
        <div className="relative aspect-video bg-[#0C1222] p-4 flex flex-col justify-between overflow-hidden">
          {/* Windows 10 Pro Desktop Simulator */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono border-b border-slate-800 pb-2">
              <span>RDP Stream // Windows 10 Pro (64-bit)</span>
              <span className="text-emerald-400">● 60 FPS Low Latency</span>
            </div>

            {/* Desktop window mock: browserleaks test preview */}
            <div className="w-full max-w-sm rounded-lg bg-slate-900 border border-slate-700/80 p-3 shadow-lg space-y-2 text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                <span className="font-semibold text-white">BrowserLeaks — WebRTC &amp; IP Check</span>
                <span className="text-[10px] text-slate-400">Chrome 131</span>
              </div>
              <div className="space-y-1 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Public IP:</span>
                  <span className="text-emerald-400 font-bold">108.204.142.88 (AT&amp;T)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">WebRTC STUN:</span>
                  <span className="text-emerald-400 font-bold">108.204.142.88 (Matched)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">DNS Servers:</span>
                  <span className="text-emerald-400 font-bold">United States (No Leak)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Windows Taskbar */}
          <div className="mt-8 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
                ⊞
              </div>
              <span className="text-[11px] text-slate-300">Ready for Swagbucks, Cint &amp; PayPal</span>
            </div>
            <span className="font-mono text-[11px]">Dallas Time: 02:45 PM CST</span>
          </div>
        </div>
      )}

    </div>
  );
}
