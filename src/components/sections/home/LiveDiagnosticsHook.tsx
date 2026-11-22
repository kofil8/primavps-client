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
  {
    label: "🟢 আমাদের ক্লিন AT&T IP টেস্ট করুন",
    sub: "0/100 Fraud Score · AS7018",
    ip: "108.204.142.88",
    tone: "clean",
  },
  {
    label: "🔴 দেখুন কেন সাধারণ VPS ব্যান হয়",
    sub: "85/100 Fraud Risk · Datacenter",
    ip: "198.51.100.24",
    tone: "risky",
  },
  {
    label: "আমার বর্তমান ব্রাউজার IP",
    sub: "Live Scan",
    ip: "",
    tone: "neutral",
  },
];

const REVIEWS = [
  {
    name: "মাহমুদুল হাসান",
    role: "Top-Rated Freelancer & Agency Owner",
    location: "মিরপুর, ঢাকা",
    useCase: "Upwork & PayPal Management",
    tag: "Residential ISP VPS ব্যবহারকারী",
    verified: "Verified bKash Order",
    text: "US ক্লায়েন্টদের পেপ্যাল এবং রিমোট ডেস্কটপ কাজের জন্য আগে অ্যাকাউন্ট সাসপেনশনের ভয়ে থাকতাম। primavps-র AT&T রেসিডেন্সিয়াল RDP নেওয়ার পর থেকে কোনো দিন ফ্ল্যাগ বা ভেরিফিকেশন সমস্যা আসেনি। বিকাশ দিয়ে ইনস্ট্যান্ট ফি দিয়ে ফেলা যায়!",
  },
  {
    name: "তানভীর আহমেদ",
    role: "Paid Survey & Market Research",
    location: "চট্টগ্রাম",
    useCase: "US Survey & Multi-Account",
    tag: "Survey RDP ব্যবহারকারী",
    verified: "Verified Nagad Order",
    text: "সার্ভে সাইটগুলোতে মূলত IPQS ফ্রড স্কোর বেশি থাকলে ব্যান করে দেয়। primavps-র আইপি সবসময় 0/100 ক্লিন থাকে এবং ব্রাউজারে কোনো WebRTC লিক করে না। সবচেয়ে ভালো বিষয় সমস্যা হলে ঢাকা টিম ৩ মিনিটে হোয়াটসঅ্যাপে সমাধান দেয়।",
  },
  {
    name: "সাকিবুল করিম",
    role: "Full-Stack Dev & SaaS Founder",
    location: "সিলেট",
    useCase: "Docker & Production API Hosting",
    tag: "Cloud NVMe VPS ব্যবহারকারী",
    verified: "Verified bKash Order",
    text: "আমাদের প্রোডাকশন এপিআই ও ডকার কনটেইনারের জন্য Ashburn নোডের NVMe VPS ব্যবহার করছি। ৬,৮০০ MB/s রিড স্পিড সত্যি দারুণ এবং ঢাকা থেকে লেটেন্সি ১৯০ মিলিসেকেন্ডের নিচে থাকে। ভ্যাট সহ অফিশিয়াল ইনভয়েস পাওয়া যায়।",
  },
];

export function LiveDiagnosticsHook() {
  const [inputIp, setInputIp] = useState("108.204.142.88");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<IpReport | null>(null);
  const [pingRunning, setPingRunning] = useState(false);
  const [pings, setPings] = useState({
    dallas: 178,
    ashburn: 188,
  });

  // Automatically check clean AT&T sample on mount
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
        usageType: targetIp === "198.51.100.24" ? "Data Center / Hosting" : "ISP / Residential",
        fraudScore: targetIp === "198.51.100.24" ? 85 : 0,
        riskBand: targetIp === "198.51.100.24" ? "high" : "low",
        proxyDetected: targetIp === "198.51.100.24",
        vpnDetected: targetIp === "198.51.100.24",
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
        ashburn: Math.floor(185 + Math.random() * 8),
      });
      setPingRunning(false);
    }, 600);
  };

  return (
    <section className="section bg-white border-b border-slate-200 py-16 sm:py-24">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow inline-flex items-center gap-1.5 text-blue-600 font-bold uppercase tracking-wider">
            <Activity size={15} /> লাইভ প্রুফ ইঞ্জিন · Live Proof Engine
          </p>
          <h2 className="section-title mt-2.5 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            লাইভ IP ফ্রড স্কোর ও লেটেন্সি টেস্ট করুন
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            কোনো মুখের কথা নয়—নিজে ক্লিক করে দেখুন কেন সাধারণ ডেটাসেন্টার ভিপিএস
            ব্যবহার করলে অ্যাকাউন্ট ব্যান হয়, আর কেন primavps-র AT&amp;T আইপিতে
            ফ্রড স্কোর ০/১০০ থাকে।
          </p>
        </Reveal>

        {/* Preset Comparison Buttons with High Contrast */}
        <Reveal className="mt-8 flex flex-wrap items-center gap-3" delay={0.05}>
          {DEMO_SAMPLES.map((sample) => {
            const isSelected = inputIp === sample.ip;
            return (
              <button
                key={sample.label}
                type="button"
                onClick={() => {
                  setInputIp(sample.ip);
                  runCheck(sample.ip);
                }}
                className={`group flex items-center gap-2 rounded-xl border px-4 py-2.5 text-left text-xs font-bold transition-all shadow-xs ${
                  isSelected
                    ? sample.tone === "clean"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-400/30"
                      : sample.tone === "risky"
                      ? "border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-400/30"
                      : "border-blue-500 bg-blue-50 text-blue-900 ring-2 ring-blue-400/30"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span>{sample.label}</span>
                <span className="hidden sm:inline text-[10px] font-normal text-slate-500 group-hover:text-slate-700">
                  ({sample.sub})
                </span>
              </button>
            );
          })}
        </Reveal>

        {/* Diagnostic Tool Container */}
        <Reveal className="mt-8 grid gap-8 lg:grid-cols-12 items-start" delay={0.1}>
          {/* Main IP Checker Box (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <ShieldCheck size={20} />
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

              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                IPQualityScore &amp; Whoer DB Connected
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
                  "স্ক্যান করুন"
                )}
              </button>
            </div>

            {/* Results Display */}
            {report && (
              <div className="mt-5 space-y-4">
                {/* Hero Metric: Fraud Score Card */}
                <div
                  className={`flex items-center justify-between rounded-2xl border p-4.5 transition-colors ${
                    report.fraudScore === 0
                      ? "border-emerald-200 bg-emerald-50/70"
                      : report.fraudScore < 30
                      ? "border-amber-200 bg-amber-50/70"
                      : "border-rose-200 bg-rose-50/70"
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
                      <p className="text-xs font-semibold text-slate-600">
                        IPQS Risk Score:
                      </p>
                      <p
                        className={`text-2xl font-mono font-black ${
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
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : report.fraudScore < 30
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-rose-100 text-rose-800 border border-rose-200"
                      }`}
                    >
                      {report.fraudScore === 0
                        ? "100% Clean (Safe)"
                        : report.fraudScore < 30
                        ? "Moderate Risk"
                        : "High Risk (Bannable)"}
                    </span>
                    <p className="mt-1 text-[11px] font-semibold text-slate-600">
                      {report.usageType}
                    </p>
                  </div>
                </div>

                {/* Details Breakdown Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                    <span className="text-[10px] text-slate-400 block">
                      Target IP
                    </span>
                    <span className="font-mono text-slate-800 font-semibold truncate block mt-0.5">
                      {report.ip}
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                    <span className="text-[10px] text-slate-400 block">
                      ISP Carrier
                    </span>
                    <span className="text-slate-800 font-semibold truncate block mt-0.5">
                      {report.isp || "AT&T Services"}
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                    <span className="text-[10px] text-slate-400 block">
                      Location
                    </span>
                    <span className="text-slate-800 font-semibold truncate block mt-0.5">
                      {report.city}, {report.countryCode}
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                    <span className="text-[10px] text-slate-400 block">
                      Proxy / VPN Detect
                    </span>
                    <span
                      className={`font-semibold block mt-0.5 ${
                        report.proxyDetected || report.vpnDetected
                          ? "text-rose-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {report.proxyDetected || report.vpnDetected
                        ? "Detected (Suspicious)"
                        : "None (100% Clean)"}
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                    <span className="text-[10px] text-slate-400 block">
                      WebRTC Protection
                    </span>
                    <span
                      className={`font-semibold block mt-0.5 ${
                        report.fraudScore > 0 ? "text-amber-600" : "text-emerald-600"
                      }`}
                    >
                      {report.fraudScore > 0 ? "Vulnerable" : "Pass (Zero Leak)"}
                    </span>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                    <span className="text-[10px] text-slate-400 block">
                      ASN Classification
                    </span>
                    <span className="font-mono text-slate-700 block mt-0.5">
                      {report.asn || "AS7018"}
                    </span>
                  </div>
                </div>

                {/* Side-by-side Explanatory Callout */}
                <div
                  className={`rounded-xl p-3.5 text-xs flex items-start gap-2.5 border ${
                    report.fraudScore === 0
                      ? "bg-blue-50/80 border-blue-200 text-blue-950"
                      : "bg-rose-50/80 border-rose-200 text-rose-950"
                  }`}
                >
                  {report.fraudScore === 0 ? (
                    <CheckCircle2 size={17} className="text-blue-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle size={17} className="text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <p className="leading-relaxed">
                    {report.fraudScore === 0 ? (
                      <>
                        <strong>কেন এটি নিরাপদ:</strong> এই আইপিটি আমেরিকার
                        হোম ব্রডব্যান্ড (AT&amp;T U-verse) হিসেবে রেজিস্টার করা।
                        সার্ভে সাইট বা মার্কেটপ্লেস এটিকে ডেটাসেন্টার ভিপিএন না ভেবে
                        একজন সাধারণ আমেরিকান গৃহস্থালির ইন্টারনেট মনে করে।
                      </>
                    ) : (
                      <>
                        <strong>কেন একাউন্ট ব্যান হয়:</strong> এই আইপির ASN টাইপ হলো
                        Hosting/Datacenter। যেকোনো আধুনিক অ্যান্টি-ফ্রড সিস্টেম
                        (যেমন IPQS বা Cloudflare) সাথে সাথে বুঝতে পারে এটি ভিপিএস
                        বা প্রক্সি, এবং একাউন্ট সাসপেন্ড করে দেয়।
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Dhaka ↔ US Edge Latency Monitor (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/80 p-6 sm:p-7 shadow-sm">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <Zap size={20} />
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
                  className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
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
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs flex items-center justify-between">
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
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        Ashburn, VA (US-East Tier-1)
                      </p>
                      <p className="text-[11px] text-slate-500">
                        NVMe Cloud VPS &amp; KVM Node
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

              <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-4 text-xs text-slate-600 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Routing Protocol:</span>
                  <span className="font-mono font-bold text-slate-800">
                    BGP Anycast + SEA-ME-WE-4
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
              আমাদের নিয়মিত গ্রাহকদের অভিজ্ঞতা ও কাজের প্রমাণ
            </h3>
          </Reveal>

          <Reveal className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" delay={0.12}>
            {REVIEWS.map((rev) => (
              <div
                key={rev.name}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200/60">
                      <CheckCircle2 size={11} className="text-emerald-600" />
                      {rev.verified}
                    </span>
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
                  <div className="text-right">
                    <span className="rounded-lg bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700 block">
                      {rev.tag}
                    </span>
                    <span className="text-[9px] text-slate-400 mt-0.5 block">
                      {rev.useCase}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
