'use client';

import React, { useState } from 'react';
import { Copy, Check, Terminal, ShieldCheck, Activity, Cpu } from 'lucide-react';

interface NodeData {
  title: string;
  carrier: string;
  asn: string;
  fraudScore: string;
  fraudScoreLabel: string;
  usageType: string;
  location: string;
  provisioning: string;
  leakStatus: string;
  sampleIp: string;
}

const NODES: Record<'att' | 'cloud', NodeData> = {
  att: {
    title: 'AT&T Residential ISP Node (Dallas)',
    carrier: 'AT&T Services, Inc.',
    asn: 'AS7018 (Tier-1 Residential)',
    fraudScore: '0 / 100',
    fraudScoreLabel: '100% Clean Residential',
    usageType: 'ISP / Home Broadband',
    location: 'Dallas, TX (US-Central)',
    provisioning: '85 Seconds',
    leakStatus: '0% DNS & WebRTC Leak (Kernel Routed)',
    sampleIp: '108.204.142.***',
  },
  cloud: {
    title: 'NVMe Compute Node (Ashburn)',
    carrier: 'Tier-1 Backbone (Cogent/Telia)',
    asn: 'AS396982 (Enterprise DC)',
    fraudScore: '5 / 100',
    fraudScoreLabel: 'Verified Infrastructure',
    usageType: 'Dedicated Cloud Compute',
    location: 'Ashburn, VA (US-East)',
    provisioning: '60 Seconds',
    leakStatus: 'Hardware KVM Isolated',
    sampleIp: '194.163.155.***',
  },
};

export function LiveTelemetryCard() {
  const [activeTab, setActiveTab] = useState<'att' | 'cloud'>('att');
  const [copied, setCopied] = useState(false);
  const data = NODES[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(data.sampleIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-[#0B1120] border border-slate-800 text-slate-100 shadow-2xl overflow-hidden font-mono text-xs">
      {/* Terminal Titlebar & Tabs */}
      <div className="px-4 py-3 bg-[#070D18] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] font-sans font-medium text-slate-400 pl-2">
            live-telemetry://node-inspection
          </span>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center p-0.5 bg-slate-900 border border-slate-800 rounded-lg">
          <button
            onClick={() => setActiveTab('att')}
            className={`px-2.5 py-1 rounded text-[11px] font-sans font-medium transition-colors ${
              activeTab === 'att'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            AT&T ISP Node
          </button>
          <button
            onClick={() => setActiveTab('cloud')}
            className={`px-2.5 py-1 rounded text-[11px] font-sans font-medium transition-colors ${
              activeTab === 'cloud'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Cloud NVMe Node
          </button>
        </div>
      </div>

      {/* Main Terminal Body */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Node Status Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">Active Node</div>
            <div className="text-sm font-semibold text-white font-sans">{data.title}</div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
            <span>Ready for Instant Deploy</span>
          </div>
        </div>

        {/* Telemetry Key-Value Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span className="text-slate-400 text-[10px] block uppercase">ASN / Carrier</span>
            <span className="font-semibold text-blue-400">{data.asn}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span className="text-slate-400 text-[10px] block uppercase">IPQS Fraud Score</span>
            <span className="font-semibold text-emerald-400">{data.fraudScore} ({data.fraudScoreLabel})</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span className="text-slate-400 text-[10px] block uppercase">Usage Type</span>
            <span className="font-semibold text-slate-200">{data.usageType}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span className="text-slate-400 text-[10px] block uppercase">Datacenter Region</span>
            <span className="font-semibold text-slate-200">{data.location}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span className="text-slate-400 text-[10px] block uppercase">Leak Security</span>
            <span className="font-semibold text-cyan-300">{data.leakStatus}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
            <span className="text-slate-400 text-[10px] block uppercase">Avg. Provisioning</span>
            <span className="font-semibold text-amber-300">{data.provisioning} (Automated)</span>
          </div>

        </div>

        {/* Sample IP preview with copy */}
        <div className="pt-2 flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800/80">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-slate-400" />
            <span className="text-slate-400 text-[11px]">Inspect Sample IP:</span>
            <span className="font-bold text-white tracking-wider">{data.sampleIp}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-[11px]"
          >
            {copied ? (
              <>
                <Check size={12} className="text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Terminal Footer */}
      <div className="px-5 py-2.5 bg-[#070D18] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <span>Hardware: AMD EPYC / Intel Xeon NVMe RAID-1</span>
        <span className="text-blue-400 font-medium">BGP 10 Gbps Uplink</span>
      </div>
    </div>
  );
}
