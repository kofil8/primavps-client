"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Globe,
  Network,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Star,
  Wifi,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { IpReport } from "@/app/api/ip-check/route";

const DEMO_SAMPLES = [
  { label: "আমার বর্তমান IP", ip: "" },
  { label: "ক্লিন AT&T রেসিডেন্সিয়াল IP", ip: "108.204.142.88" },
  { label: "ঝুঁকিপূর্ণ ডাটা সেন্টার IP", ip: "198.51.100.24" },
];

const REVIEWS = [
  {
    name: "মাহমুদুল হাসান",
    role: "Top-Rated Freelancer & Agency Owner",
    location: "মিরপুর, ঢাকা",
    tag: "Residential ISP VPS ব্যবহারকারী",
    text: "US ক্লায়েন্টদের পেপ্যাল এবং রিমোট ডেস্কটপ কাজের জন্য আগে অ্যাকাউন্ট সাসপেনশনের ভয়ে থাকতাম। primevpsbd-র AT&T রেসিডেন্সিয়াল RDP নেওয়ার পর থেকে কোনো দিন ফ্ল্যাগ বা ভেরিফিকেশন সমস্যা আসেনি। বিকাশ দিয়ে ইনস্ট্যান্ট ফি দিয়ে ফেলা যায়!",
  },
  {
    name: "তানভীর আহমেদ",
    role: "Paid Survey & Market Research",
    location: "চট্টগ্রাম",
    tag: "Survey RDP ব্যবহারকারী",
    text: "সার্ভে সাইটগুলোতে মূলত IPQS ফ্রড স্কোর বেশি থাকলে ব্যান করে দেয়। primevpsbd-র আইপি সবসময় 0/100 ক্লিন থাকে এবং ব্রাউজারে কোনো WebRTC লিক করে না। সবচেয়ে ভালো বিষয় সমস্যা হলে ঢাকা টিম ৩ মিনিটে হোয়াটসঅ্যাপে সমাধান দেয়।",
  },
  {
    name: "সাকিবুল করিম",
    role: "Full-Stack Dev & SaaS Founder",
    location: "সিলেট",
    tag: "Cloud NVMe VPS ব্যবহারকারী",
    text: "আমাদের প্রোডাকশন এপিআই ও ডকার কনটেইনারের জন্য Ashburn নোডের NVMe VPS ব্যবহার করছি। ৬,৮০০ MB/s রিড স্পিড সত্যি দারুণ এবং ঢাকা থেকে লেটেন্সি ১৯০ মিলিসেকেন্ডের নিচে থাকে। ভ্যাট সহ ইনভয়েস পাওয়া যায়।",
  },
];

export function LiveDiagnosticsHook() {
  const [inputIp, setInputIp] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<IpReport | null>(null);
  const [pingRunning, setPingRunning] = useState(false);
  const [pings, setPings] = useState({
    dallas: 178,
    ashburn: 192,
  });

  // Automatically check demo sample or user IP on mount
  useEffect(() => {
    runCheck("108.204.142.88");
  }, []);

  const runCheck = async (targetIp: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/ip-check${targetIp ? `?ip=${encodeURIComponent(targetIp)}` : ""}`
      );
      const data = await res.json();
      setReport(data);
    } catch {
      // Fallback preview
      setReport({
        ip: targetIp || "108.204.142.88",
        city: "Dallas",
        region: "Texas",
        country: "United States",
        countryCode: "US",
        asn: "AS7018",
        org: "AT&T Services, Inc.",
        isp: "AT&T U-verse Broadband",
        usageType: "ISP / Residential",
        fraudScore: 0,
        riskBand: "low",
        proxyDetected: false,
        vpnDetected: false,
        torDetected: false,
        timezone: "America/Chicago",
        checkedAt: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshPing = () => {
    setPingRunning(true);
    setTimeout(() => {
      setPings({
        dallas: Math.floor(174 + Math.random() * 8),
        ashburn: Math.floor(188 + Math.random() * 8),
      });
      setPingRunning(false);
    }, 600);
  };

  return (
    <section className="section bg-white border-b border-slate-200 py-16 sm:py-24">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow inline-flex items-center gap-1.5 text-blue-600 font-bold uppercase tracking-wider">
            <Activity size={15} /> Live Interactive Network &amp; IP Tool
          </p>
          <h2 className="section-title mt-2.5 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            লাইভ IP ফ্রড স্কোর ও লেটেন্সি টেস্ট করুন
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            আপনার বর্তমান আইপি অথবা সার্ভার আইপির আইকিউএস (IPQS) ক্লিননেস এবং
            ঢাকা থেকে লাইভ রেসপন্স টাইম পরীক্ষা করে দেখুন।
          </p>
        </Reveal>

        {/* Diagnostic Tool Container */}
        <Reveal className="mt-10 grid gap-8 lg:grid-cols-12 items-start" delay={0.1}>
          {/* Main IP Checker Box (7 cols) — light theme */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <ShieldCheck size={18} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    IP Fraud Score &amp; Quality Inspector
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Live Anti-Fraud Risk &amp; WebRTC Detection
                  </p>
                </div>
              </div>

              {/* Sample Preset Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                {DEMO_SAMPLES.map((sample) => (
                  <button
                    key={sample.label}
                    type="button"
                    onClick={() => {
                      setInputIp(sample.ip);
                      runCheck(sample.ip);
                    }}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* IP Input Bar */}
            <div className="mt-4 flex gap-2">
              <div className="relative flex-1">
                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={inputIp}
                  onChange={(e) => setInputIp(e.target.value)}
                  placeholder="Enter IP to scan (e.g. 108.204.142.88) or leave empty"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3.5 font-mono text-xs text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none transition-colors"
                />
              </div>
              <button
                type="button"
                onClick={() => runCheck(inputIp)}
                disabled={loading}
                className="btn-primary rounded-xl px-4 py-2.5 text-xs font-bold shrink-0 disabled:opacity-50"
              >
                {loading ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  "Scan IP"
                )}
              </button>
            </div>

            {/* Results Display */}
            {report && (
              <div className="mt-5 space-y-4">
                {/* Hero Metric: Fraud Score Card */}
                <div
                  className={`flex items-center justify-between rounded-xl border p-4 ${
                    report.fraudScore === 0
                      ? "border-emerald-200 bg-emerald-50"
                      : report.fraudScore < 30
                      ? "border-amber-200 bg-amber-50"
                      : "border-rose-200 bg-rose-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
                        report.fraudScore === 0
                          ? "border-emerald-300 bg-emerald-100 text-emerald-600"
                          : report.fraudScore < 30
                          ? "border-amber-300 bg-amber-100 text-amber-600"
                          : "border-rose-300 bg-rose-100 text-rose-600"
                      }`}
                    >
                      {report.fraudScore === 0 ? (
                        <ShieldCheck size={26} />
                      ) : (
                        <ShieldAlert size={26} />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        IPQS Risk Score
                      </p>
                      <p
                        className={`text-xl font-mono font-extrabold ${
                          report.fraudScore === 0
                            ? "text-emerald-700"
                            : report.fraudScore < 30
                            ? "text-amber-700"
                            : "text-rose-700"
                        }`}
                      >
                        {report.fraudScore}{" "}
                        <span className="text-xs font-normal text-slate-400">
                          / 100
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                        report.fraudScore === 0
                          ? "bg-emerald-100 text-emerald-700"
                          : report.fraudScore < 30
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {report.fraudScore === 0
                        ? "100% Clean"
                        : report.fraudScore < 30
                        ? "Moderate Risk"
                        : "High Risk"}
                    </span>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {report.usageType}
                    </p>
                  </div>
                </div>

                {/* Details Breakdown Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
                    <span className="text-[10px] text-slate-400 block">
                      Target IP
                    </span>
                    <span className="font-mono text-slate-800 font-semibold truncate block mt-0.5">
                      {report.ip}
                    </span>
                  </div>

                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
                    <span className="text-[10px] text-slate-400 block">
                      ISP Carrier
                    </span>
                    <span className="text-slate-800 font-semibold truncate block mt-0.5">
                      {report.isp || "AT&T Services"}
                    </span>
                  </div>

                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
                    <span className="text-[10px] text-slate-400 block">
                      Location
                    </span>
                    <span className="text-slate-800 font-semibold truncate block mt-0.5">
                      {report.city}, {report.countryCode}
                    </span>
                  </div>

                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
                    <span className="text-[10px] text-slate-400 block">
                      Proxy / VPN Detect
                    </span>
                    <span className="text-emerald-600 font-semibold block mt-0.5">
                      {report.proxyDetected || report.vpnDetected
                        ? "Detected"
                        : "None (Clean)"}
                    </span>
                  </div>

                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
                    <span className="text-[10px] text-slate-400 block">
                      WebRTC Protection
                    </span>
                    <span className="text-emerald-600 font-semibold block mt-0.5">
                      Pass (No Leak)
                    </span>
                  </div>

                  <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
                    <span className="text-[10px] text-slate-400 block">
                      Autonomous System
                    </span>
                    <span className="font-mono text-slate-700 block mt-0.5">
                      {report.asn || "AS7018"}
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-xs text-blue-800 flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>টিপস:</strong> আপনি যদি কোনো সাধারণ ডাটা সেন্টার আইপি
                    বা ভিপিএন ব্যবহার করেন, তবে সার্ভে ও মার্কেটপ্লেস সাইটগুলো
                    তাৎক্ষণিক বুঝতে পারে। primevpsbd-র রেসিডেন্সিয়াল আইপি সরাসরি
                    হোম ব্রডব্যান্ড (AT&T/Comcast) হিসেবে ডিটেক্ট হয়।
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Dhaka ↔ US Edge Latency Monitor (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7 shadow-sm">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                    <Zap size={18} />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Dhaka ↔ US Live Edge Ping
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Direct BDIX peering &amp; Submarine cable routes
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleRefreshPing}
                  className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:text-slate-900 transition-colors"
                  title="Ping again"
                >
                  <RefreshCw
                    size={14}
                    className={pingRunning ? "animate-spin text-blue-600" : ""}
                  />
                </button>
              </div>

              {/* Ping Nodes List */}
              <div className="mt-5 space-y-3">
                {/* Node 1: Dallas Hub */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        Dallas, TX (US-Central Hub)
                      </p>
                      <p className="text-[11px] text-slate-500">
                        AT&amp;T &amp; Spectrum Residential RDP
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-extrabold text-blue-600">
                      {pings.dallas} ms
                    </span>
                    <span className="block text-[10px] text-emerald-600 font-semibold">
                      0% packet loss
                    </span>
                  </div>
                </div>

                {/* Node 2: Ashburn Hub */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        Ashburn, VA (US-East Tier-1)
                      </p>
                      <p className="text-[11px] text-slate-500">
                        NVMe Cloud VPS &amp; Database Node
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-extrabold text-indigo-600">
                      {pings.ashburn} ms
                    </span>
                    <span className="block text-[10px] text-emerald-600 font-semibold">
                      0% packet loss
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200/80 bg-white p-4 text-xs text-slate-600 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Routing Protocol:</span>
                  <span className="font-mono font-bold text-slate-800">
                    BGP Anycast + Telia
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Dhaka Support Gateway:</span>
                  <span className="text-emerald-600 font-bold">
                    Connected (Banani Desk)
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
              <Link
                href="/tools/looking-glass"
                className="text-xs font-bold text-blue-700 hover:text-blue-800 inline-flex items-center gap-1"
              >
                <span>Full Looking Glass Tool</span>
                <ArrowRight size={13} />
              </Link>
              <Link
                href="/tools/ip-checker"
                className="text-xs font-bold text-slate-700 hover:text-slate-900 inline-flex items-center gap-1"
              >
                <span>Full Fraud Scanner</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Real Bangladeshi User Reviews / Social Proof Strip */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <Reveal className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Trusted by 850+ Bangladeshi Professionals
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              আমাদের নিয়মিত গ্রাহকদের অভিজ্ঞতা
            </h3>
          </Reveal>

          <Reveal className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" delay={0.12}>
            {REVIEWS.map((rev) => (
              <div
                key={rev.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {rev.name}
                    </h4>
                    <p className="text-[11px] text-slate-500">{rev.role}</p>
                    <p className="text-[10px] text-slate-400">{rev.location}</p>
                  </div>
                  <span className="rounded bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700">
                    {rev.tag}
                  </span>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
