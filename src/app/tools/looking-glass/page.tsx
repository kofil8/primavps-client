'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, RefreshCw, Terminal, Globe, ArrowRight } from 'lucide-react';

export default function LookingGlassPage() {
  const [target, setTarget] = useState('8.8.8.8');
  const [region, setRegion] = useState('Dallas, TX (US-Central)');
  const [probe, setProbe] = useState<'ping' | 'traceroute' | 'mtr'>('ping');
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const runTest = () => {
    setRunning(true);
    setLogs([`Connecting to ${region} looking glass daemon...`]);

    setTimeout(() => {
      setLogs((prev) => [...prev, `[INFO] Initializing ${probe.toUpperCase()} to ${target} (56 data bytes)...`]);
    }, 400);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `64 bytes from ${target}: icmp_seq=1 ttl=118 time=18.42 ms`,
        `64 bytes from ${target}: icmp_seq=2 ttl=118 time=18.15 ms`,
        `64 bytes from ${target}: icmp_seq=3 ttl=118 time=18.30 ms`,
        `64 bytes from ${target}: icmp_seq=4 ttl=118 time=18.22 ms`,
      ]);
    }, 1000);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `--- ${target} ping statistics ---`,
        `4 packets transmitted, 4 received, 0% packet loss, time 3004ms`,
        `rtt min/avg/max/mdev = 18.150/18.272/18.420/0.098 ms`,
        `[STATUS] Test finished successfully.`,
      ]);
      setRunning(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-white border-b border-[#E2E8F0] pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
              Looking Glass
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] mt-2 leading-relaxed">
              Network diagnostics for route, peering, and latency verification directly from our US core edge routers.
            </p>
          </div>
        </div>
      </section>

      {/* Main Diagnostic Area */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Controls Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
                  Target Host / IP
                </label>
                <input
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:border-[#2563EB]"
                  placeholder="e.g. 1.1.1.1"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
                  Probe Region
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#2563EB] bg-white"
                >
                  <option value="Dallas, TX (US-Central)">Dallas, TX (US-Central)</option>
                  <option value="Ashburn, VA (US-East)">Ashburn, VA (US-East)</option>
                  <option value="Chicago, IL (US-Midwest)">Chicago, IL (US-Midwest)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wider block">
                  Command
                </label>
                <div className="flex rounded-xl border border-[#E2E8F0] overflow-hidden p-0.5 bg-slate-50">
                  {(['ping', 'traceroute', 'mtr'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setProbe(p)}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        probe === p ? 'bg-white text-[#0F172A] shadow-xs' : 'text-[#64748B]'
                      }`}
                    >
                      {p.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={runTest}
                disabled={running}
                className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-sm active:scale-[0.98] disabled:opacity-75"
              >
                {running ? (
                  <>
                    <RefreshCw size={15} className="animate-spin" />
                    <span>Executing Probe...</span>
                  </>
                ) : (
                  <>
                    <Play size={15} />
                    <span>Run Looking Glass Test</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Terminal Results Card */}
          <div className="rounded-2xl bg-[#0B1120] border border-slate-800 text-slate-100 p-6 sm:p-8 font-mono text-xs shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[#2563EB]" />
                <span className="uppercase tracking-widest text-[10px]">Console Output</span>
              </div>
              <span>{region}</span>
            </div>

            {logs.length > 0 ? (
              <div className="space-y-1.5 pt-2 text-slate-200">
                {logs.map((line, idx) => (
                  <div key={idx} className={line.includes('[STATUS]') ? 'text-emerald-400 font-bold' : ''}>
                    {line}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-slate-500">
                Waiting for diagnostic command execution...
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
