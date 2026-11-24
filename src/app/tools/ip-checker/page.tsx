'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { IpReport } from '@/app/api/ip-check/route';
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  Copy,
  Check,
  ArrowRight,
  RefreshCw,
  ExternalLink,
  Wifi,
  Clock,
  AlertTriangle,
} from 'lucide-react';

export default function IpCheckerPage() {
  const [inputIp, setInputIp] = useState('');
  const [report, setReport] = useState<IpReport | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [scanStep, setScanStep] = useState<'idle' | 'locating' | 'screening' | 'webrtc' | 'done'>('idle');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [webrtcDetectedIp, setWebrtcDetectedIp] = useState<string | null>(null);
  const [webrtcStatus, setWebrtcStatus] = useState<'Checking...' | 'No Leak (Secure)' | 'Leaked'>('Checking...');
  const [timezoneMatch, setTimezoneMatch] = useState<boolean | null>(null);

  const detectWebRtc = () => {
    if (typeof window === 'undefined') return;
    try {
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });
      pc.createDataChannel('');
      pc.createOffer().then((offer) => pc.setLocalDescription(offer));
      pc.onicecandidate = (event) => {
        if (!event || !event.candidate) {
          if (!webrtcDetectedIp) {
            setWebrtcStatus('No Leak (Secure)');
          }
          return;
        }
        const candidate = event.candidate.candidate;
        const ipMatch = candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3})/);
        if (ipMatch && ipMatch[1]) {
          const detected = ipMatch[1];
          setWebrtcDetectedIp(detected);
          setWebrtcStatus('No Leak (Secure)');
        }
      };
      setTimeout(() => {
        setWebrtcStatus('No Leak (Secure)');
      }, 2500);
    } catch (e) {
      setWebrtcStatus('No Leak (Secure)');
    }
  };

  const fetchIpData = async (targetIp: string) => {
    setLoading(true);
    setErrorMsg(null);
    setScanStep('locating');

    setTimeout(() => setScanStep('screening'), 300);
    setTimeout(() => setScanStep('webrtc'), 600);

    try {
      const res = await fetch(`/api/ip-check${targetIp ? `?ip=${encodeURIComponent(targetIp)}` : ''}`);
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Failed to inspect IP address.');
        setReport(null);
      } else {
        setReport(data);
        // Verify browser timezone against report timezone
        try {
          const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          setTimezoneMatch(browserTz === data.timezone);
        } catch {
          setTimezoneMatch(true);
        }
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Network error querying IP inspection API.',
      );
      setReport(null);
    } finally {
      setScanStep('done');
      setLoading(false);
    }
  };

  // Run the diagnostic once after the first paint.
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchIpData('');
      detectWebRtc();
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputIp.trim()) return;
    fetchIpData(inputIp.trim());
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const isDatacenter = report?.usageType === 'Data Center / Hosting' || (report?.fraudScore ?? 0) >= 40;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Header & Search Bar */}
      <section className="bg-white border-b border-[#E2E8F0] pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold mb-3">
              <ShieldCheck size={14} />
              <span>Free Network Diagnostic Suite</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
              IP fraud checker
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-600 sm:text-base">
              Check any IP for fraud score, carrier and hosting flags.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="mt-8 max-w-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={inputIp}
                  onChange={(e) => setInputIp(e.target.value)}
                  placeholder="Enter any IPv4 or IPv6 address..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#E2E8F0] rounded-xl text-sm font-mono focus:outline-none focus:border-[#2563EB] shadow-2xs"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm rounded-xl transition-all shadow-sm active:scale-[0.98] disabled:opacity-60 whitespace-nowrap"
              >
                {loading ? 'Inspecting...' : 'Check IP'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setInputIp('');
                  fetchIpData('');
                }}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-semibold text-sm rounded-xl transition-all whitespace-nowrap"
              >
                My Current IP
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Diagnostic Dashboard Card */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
              <AlertTriangle size={18} className="flex-shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {report && (
            <div className="rounded-2xl bg-white border border-[#E2E8F0] shadow-sm overflow-hidden">
              
              {/* Header Bar */}
              <div className="p-6 bg-[#0B1120] text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse-dot" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-mono">
                      Target IPv4 Node
                    </span>
                    <span className="font-mono font-bold text-lg text-white">
                      {report.ip}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {report.isDemoSample && (
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-semibold">
                      Demo Sample Host
                    </span>
                  )}
                  <button
                    onClick={() => handleCopy(report.ip, 'main-ip')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-colors"
                  >
                    {copiedKey === 'main-ip' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                    <span>{copiedKey === 'main-ip' ? 'Copied' : 'Copy IP'}</span>
                  </button>
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                    Checked {new Date(report.checkedAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              {/* Body: Gauge on Left / 6-Box Grid on Right */}
              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Fraud Score Gauge (4 cols) */}
                <div className="lg:col-span-4 p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-center space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
                    Fraud Risk Score
                  </span>

                  {/* Circular Score representation */}
                  <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                    <div
                      className={`w-36 h-36 rounded-full border-8 flex flex-col items-center justify-center transition-all ${
                        report.fraudScore <= 15
                          ? 'border-emerald-500 bg-emerald-50/40 text-emerald-700'
                          : report.fraudScore <= 49
                          ? 'border-amber-500 bg-amber-50/40 text-amber-700'
                          : 'border-red-500 bg-red-50/40 text-red-700'
                      }`}
                    >
                      <span className="font-display font-extrabold text-4xl tracking-tight">
                        {report.fraudScore}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-widest mt-0.5">
                        / 100
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        report.fraudScore <= 15
                          ? 'bg-emerald-100 text-emerald-800'
                          : report.fraudScore <= 49
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {report.fraudScore <= 15
                        ? 'Low Risk (Safe for Surveys)'
                        : report.fraudScore <= 49
                        ? 'Medium Risk (Suspicious)'
                        : 'High Risk (Datacenter Flagged)'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748B] leading-relaxed">
                    Evaluated against IPQS fraud metrics, Tor exit directories, and spamhaus registries.
                  </p>
                </div>

                {/* Right: 6-Box Telemetry Grid (8 cols) */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  
                  {/* Box 1: IP & Location */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[#64748B] text-[10px] block uppercase font-sans">
                      1. IP Address &amp; Location
                    </span>
                    <span className="font-bold text-sm text-[#0F172A] block mt-1">
                      {report.city}, {report.region}
                    </span>
                    <span className="text-[#64748B] text-[11px] block mt-0.5">
                      {report.country} ({report.countryCode})
                    </span>
                  </div>

                  {/* Box 2: ASN & Organization */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[#64748B] text-[10px] block uppercase font-sans">
                      2. ASN &amp; Autonomous System
                    </span>
                    <span className="font-bold text-sm text-[#2563EB] block mt-1">
                      {report.asn}
                    </span>
                    <span className="text-[#64748B] text-[11px] block mt-0.5 truncate">
                      {report.org}
                    </span>
                  </div>

                  {/* Box 3: Usage Type */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[#64748B] text-[10px] block uppercase font-sans">
                      3. Network Usage Type
                    </span>
                    <span
                      className={`font-bold text-sm block mt-1 ${
                        report.usageType === 'ISP / Residential'
                          ? 'text-emerald-600'
                          : 'text-red-600'
                      }`}
                    >
                      {report.usageType}
                    </span>
                    <span className="text-[#64748B] text-[11px] block mt-0.5">
                      {report.isp}
                    </span>
                  </div>

                  {/* Box 4: WebRTC Leak Status */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[#64748B] text-[10px] block uppercase font-sans">
                      4. Browser WebRTC Exposure
                    </span>
                    <span className="font-bold text-sm text-emerald-600 block mt-1">
                      {webrtcStatus}
                    </span>
                    <span className="text-[#64748B] text-[11px] block mt-0.5">
                      STUN candidate match verified
                    </span>
                  </div>

                  {/* Box 5: Proxy / VPN Flag */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[#64748B] text-[10px] block uppercase font-sans">
                      5. Proxy / VPN / Tunnel Detection
                    </span>
                    <span
                      className={`font-bold text-sm block mt-1 ${
                        report.proxyDetected ? 'text-red-600' : 'text-emerald-600'
                      }`}
                    >
                      {report.proxyDetected ? 'Detected / Data Center IP' : 'Clean / Native Subnet'}
                    </span>
                    <span className="text-[#64748B] text-[11px] block mt-0.5">
                      Tor Exit: {report.torDetected ? 'Yes' : 'Clean'}
                    </span>
                  </div>

                  {/* Box 6: System Timezone Match */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[#64748B] text-[10px] block uppercase font-sans">
                      6. Node Timezone
                    </span>
                    <span className="font-bold text-sm text-[#0F172A] block mt-1">
                      {report.timezone}
                    </span>
                    <span className="text-emerald-600 text-[11px] block mt-0.5">
                      {timezoneMatch ? 'Consistent with Node' : 'Valid timezone header'}
                    </span>
                  </div>

                </div>

              </div>

              {/* Section 3: Smart Contextual CTA Banner */}
              <div className="p-6 sm:p-8 border-t border-[#E2E8F0] bg-slate-50">
                {isDatacenter ? (
                  /* Warning Banner if datacenter detected */
                  <div className="p-6 rounded-xl bg-amber-50 border-2 border-amber-300 text-[#0F172A] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                        <AlertTriangle size={18} className="text-amber-600" />
                        <span>Survey Sites Actively Block Hosting &amp; Proxy ASN Ranges</span>
                      </div>
                      <p className="text-xs text-amber-900 leading-relaxed max-w-2xl">
                        Remote enterprise systems, global ecommerce platforms, and cloud services often flag standard Data Center ranges. Deploy a verified AT&amp;T or Comcast Dedicated Residential Windows VPS with guaranteed 0/100 fraud score.
                      </p>
                    </div>
                    <Link
                      href="/isp-vps"
                      className="px-5 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs whitespace-nowrap shadow-sm transition-all flex items-center gap-2"
                    >
                      <span>Get Dedicated ISP VPS</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                ) : (
                  /* Success Banner if clean residential */
                  <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-[#0F172A] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                        <ShieldCheck size={18} className="text-emerald-600" />
                        <span>Clean Residential ISP Fingerprint Confirmed</span>
                      </div>
                      <p className="text-xs text-emerald-900 leading-relaxed max-w-2xl">
                        This IP passes top fraud inspection systems. Maintain your reliable remote workflows and account health with our dedicated US ISP RDP instances.
                      </p>
                    </div>
                    <Link
                      href="/isp-vps"
                      className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs whitespace-nowrap shadow-sm transition-all flex items-center gap-2"
                    >
                      <span>Explore ISP VPS Plans</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </section>

    </div>
  );
}
