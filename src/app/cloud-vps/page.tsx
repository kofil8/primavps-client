'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCurrency } from '@/lib/currency';
import {
  CLOUD_PRESETS,
  CLOUD_OS_LIST,
  CLOUD_REGIONS,
  calculateCloudPrice,
  CloudPreset,
  CloudOs,
  CloudRegion,
} from '@/lib/data/plans';
import {
  Server,
  Cpu,
  HardDrive,
  Globe,
  Sliders,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Info,
  Check,
} from 'lucide-react';

export default function CloudVpsConfiguratorPage() {
  const { formatPrice, formatHourly } = useCurrency();

  // State
  const [region, setRegion] = useState<CloudRegion>(CLOUD_REGIONS[0]);
  const [os, setOs] = useState<CloudOs>(CLOUD_OS_LIST[0]);
  const [vcpu, setVcpu] = useState(2);
  const [ram, setRam] = useState(4);
  const [nvme, setNvme] = useState(80);
  const [addResidentialIp, setAddResidentialIp] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState(false);

  // Apply quick preset
  const applyPreset = (preset: CloudPreset) => {
    setVcpu(preset.vcpu);
    setRam(preset.ram);
    setNvme(preset.nvme);
  };

  // Adjust RAM if Windows OS requires at least 4GB
  const handleSelectOs = (selectedOs: CloudOs) => {
    setOs(selectedOs);
    if (selectedOs.family === 'windows' && ram < 4) {
      setRam(4);
    }
  };

  const totalPriceBdt = calculateCloudPrice(vcpu, ram, nvme, addResidentialIp);

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setDeploySuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Header */}
      <section className="bg-white border-b border-[#E2E8F0] pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold mb-3">
              <Sliders size={14} />
              <span>Developer Cloud Instances</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
              Configure Your Cloud Server
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] mt-2 leading-relaxed">
              Tailored compute resources with 100% dedicated NVMe RAID-1 IOPS, sub-millisecond hypervisor response, and transparent billing.
            </p>
          </div>
        </div>
      </section>

      {/* Main Configurator (65% Left / 35% Right) */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Configuration Panel (8 cols ≈ 65%) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Presets Bar */}
              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
                  <Zap size={14} className="text-[#2563EB]" />
                  <span>Quick Presets:</span>
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {CLOUD_PRESETS.map((preset) => {
                    const isActive = vcpu === preset.vcpu && ram === preset.ram && nvme === preset.nvme;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => applyPreset(preset)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-[#2563EB] text-white shadow-xs'
                            : 'bg-slate-100 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 1: Datacenter Region */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-[#0F172A] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-[#2563EB] text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    <span>Select Datacenter Region</span>
                  </h3>
                  <span className="text-xs text-[#64748B]">BGP Multi-homed Uplink</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {CLOUD_REGIONS.map((r) => {
                    const isSelected = region.id === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRegion(r)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-2 border-[#2563EB] bg-blue-50/50 shadow-2xs'
                            : 'border-[#E2E8F0] hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-[#0F172A]">{r.city}, {r.state}</span>
                          <span className="text-[11px] font-mono font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            {r.ping}ms
                          </span>
                        </div>
                        <span className="text-xs text-[#64748B] mt-1 block">{r.location}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Operating System */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-[#0F172A] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-[#2563EB] text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    <span>Choose Operating System</span>
                  </h3>
                  <span className="text-xs text-[#64748B]">Instant Auto-Install</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                  {CLOUD_OS_LIST.map((item) => {
                    const isSelected = os.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectOs(item)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-2 border-[#2563EB] bg-blue-50/50 shadow-2xs'
                            : 'border-[#E2E8F0] hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="font-bold text-xs sm:text-sm text-[#0F172A]">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-[#64748B] mt-0.5">
                          {item.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Hardware Resources (Interactive Sliders) */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-[#0F172A] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-[#2563EB] text-xs flex items-center justify-center font-bold">
                      3
                    </span>
                    <span>Hardware Resources</span>
                  </h3>
                  <span className="text-xs text-[#64748B]">Live Hardware Resizing</span>
                </div>

                {/* Slider 1: vCPU */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
                      <Cpu size={14} className="text-[#2563EB]" />
                      <span>Dedicated vCPU</span>
                    </span>
                    <span className="font-mono font-bold text-sm text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {vcpu} Cores
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="16"
                    step="1"
                    value={vcpu}
                    onChange={(e) => setVcpu(parseInt(e.target.value))}
                    className="w-full accent-[#2563EB] h-2 bg-slate-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#64748B] font-mono">
                    <span>1 Core</span>
                    <span>2 Cores</span>
                    <span>4 Cores</span>
                    <span>8 Cores</span>
                    <span>16 Cores</span>
                  </div>
                </div>

                {/* Slider 2: RAM */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
                      <Server size={14} className="text-[#2563EB]" />
                      <span>ECC DDR4/DDR5 Memory</span>
                    </span>
                    <span className="font-mono font-bold text-sm text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {ram} GB RAM
                    </span>
                  </div>
                  <input
                    type="range"
                    min={os.family === 'windows' ? 4 : 2}
                    max="64"
                    step="2"
                    value={ram}
                    onChange={(e) => setRam(parseInt(e.target.value))}
                    className="w-full accent-[#2563EB] h-2 bg-slate-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#64748B] font-mono">
                    <span>{os.family === 'windows' ? '4 GB (Min Win)' : '2 GB'}</span>
                    <span>8 GB</span>
                    <span>16 GB</span>
                    <span>32 GB</span>
                    <span>64 GB</span>
                  </div>
                </div>

                {/* Slider 3: NVMe */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
                      <HardDrive size={14} className="text-[#2563EB]" />
                      <span>Enterprise NVMe RAID-1 Storage</span>
                    </span>
                    <span className="font-mono font-bold text-sm text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {nvme} GB NVMe
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="500"
                    step="10"
                    value={nvme}
                    onChange={(e) => setNvme(parseInt(e.target.value))}
                    className="w-full accent-[#2563EB] h-2 bg-slate-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#64748B] font-mono">
                    <span>30 GB</span>
                    <span>100 GB</span>
                    <span>250 GB</span>
                    <span>500 GB</span>
                  </div>
                </div>

              </div>

              {/* Step 4: Network & IP Add-ons */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-[#0F172A] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-[#2563EB] text-xs flex items-center justify-center font-bold">
                      4
                    </span>
                    <span>Network &amp; IP Routing</span>
                  </h3>
                  <span className="text-xs text-emerald-600 font-semibold">1 Gbps Unmetered Port</span>
                </div>

                <div className="space-y-3 pt-1 text-xs">
                  {/* Default standard IP */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#0F172A] block">1 Dedicated IPv4 + /64 IPv6 Subnet</span>
                      <span className="text-[#64748B]">Standard enterprise datacenter route</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100/70 text-emerald-800 font-bold text-[11px]">
                      Included
                    </span>
                  </div>

                  {/* Residential ISP IP Upgrade toggle */}
                  <div
                    onClick={() => setAddResidentialIp(!addResidentialIp)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      addResidentialIp
                        ? 'border-[#2563EB] bg-blue-50/70'
                        : 'border-[#E2E8F0] bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0F172A]">
                          Upgrade to US Residential ISP IP (AT&amp;T / Comcast)
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-100 text-[#2563EB]">
                          0 Fraud Score
                        </span>
                      </div>
                      <span className="text-[#64748B] block text-[11px]">
                        Replaces datacenter IP with authentic home broadband ASN route
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-[#2563EB] block text-xs">
                        +{formatPrice(1200)}/mo
                      </span>
                      <span className={`text-[10px] font-bold ${addResidentialIp ? 'text-[#2563EB]' : 'text-slate-400'}`}>
                        {addResidentialIp ? '[Enabled]' : '[Click to Add]'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Sticky Summary Box (4 cols ≈ 35%) */}
            <div className="lg:col-span-4 sticky top-24 space-y-4">
              <div className="rounded-2xl bg-white border-2 border-[#2563EB] p-6 shadow-xl space-y-6">
                
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] block">
                    Configuration Summary
                  </span>
                  <h3 className="font-display font-extrabold text-xl text-[#0F172A] mt-0.5">
                    Cloud Instance
                  </h3>
                </div>

                {/* Specs List */}
                <div className="space-y-2.5 text-xs font-mono border-y border-slate-100 py-4">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Region:</span>
                    <span className="font-semibold text-[#0F172A]">{region.city}, {region.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">OS Image:</span>
                    <span className="font-semibold text-[#0F172A]">{os.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Compute:</span>
                    <span className="font-semibold text-[#0F172A]">{vcpu} Dedicated vCPU</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Memory:</span>
                    <span className="font-semibold text-[#0F172A]">{ram} GB RAM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Storage:</span>
                    <span className="font-semibold text-[#0F172A]">{nvme} GB NVMe RAID-1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Network IP:</span>
                    <span className={`font-semibold ${addResidentialIp ? 'text-[#2563EB]' : 'text-[#0F172A]'}`}>
                      {addResidentialIp ? 'US Residential ISP IP' : 'Dedicated IPv4 + IPv6'}
                    </span>
                  </div>
                </div>

                {/* Pricing Display */}
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-[#64748B] font-semibold uppercase">Total Monthly</span>
                    <span className="font-display font-extrabold text-3xl text-[#2563EB] tracking-tight">
                      {formatPrice(totalPriceBdt)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-[#64748B] font-mono mt-1">
                    <span>Hourly Rate:</span>
                    <span>{formatHourly(totalPriceBdt)}</span>
                  </div>
                </div>

                {/* Deploy Action */}
                {deploySuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                    <CheckCircle2 size={24} className="text-emerald-600 mx-auto" />
                    <div className="font-bold text-xs text-emerald-800">Instance Order Placed!</div>
                    <div className="text-[11px] text-emerald-700">Redirecting to automated web console...</div>
                  </div>
                ) : (
                  <button
                    onClick={handleDeploy}
                    disabled={isDeploying}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-75"
                  >
                    {isDeploying ? (
                      <span>Orchestrating Instance...</span>
                    ) : (
                      <>
                        <span>Deploy Cloud Instance</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                )}

                <div className="text-[11px] text-[#64748B] text-center space-y-1">
                  <div>Instant bKash, Nagad &amp; Card checkout supported.</div>
                  <div className="text-emerald-600 font-medium">99.98% Hardware SLA Guarantee</div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
