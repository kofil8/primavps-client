"use client";

import { Reveal } from "@/components/ui/reveal";
import {
  CheckCircle2,
  Cpu,
  Layers,
  Lock,
  RefreshCw,
  Server,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";

export function BentoGridArchitecture() {
  return (
    <section className="section border-b border-slate-200 bg-slate-50/70 py-20 sm:py-28">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow inline-flex items-center gap-1.5 text-blue-600 font-bold uppercase tracking-wider">
            <ShieldCheck size={15} /> কেন primavps আইপি কখনো ব্যান হয় না
          </p>
          <h2 className="section-title mt-2.5 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            হার্ডওয়্যার-লেভেল সিকিউরিটি ও
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}ট্রু KVM ক্লাউড আর্কিটেকচার
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            সাধারণ ডেটাসেন্টার প্রোভাইডারদের মতো আমরা রিসোর্স ওভারসেল করি না।
            সার্ভে একাউন্ট রক্ষা ও মিশন-ক্রিটিক্যাল প্রোডাকশন অ্যাপের জন্য আমাদের
            ৪-লেয়ার প্রোটেকশন সিস্টেম।
          </p>
        </Reveal>

        {/* 4-Box Bento Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-12">
          {/* Box 1: WebRTC & DNS Leak Shield (7 cols) */}
          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Lock size={24} />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Zero Leak Guarantee
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  হার্ডওয়্যার-লেভেল WebRTC ও DNS শিল্ড
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  ব্রাউজার বা যেকোনো অ্যাপলিকেশন থেকে আপনার বাংলাদেশি লোকাল
                  আইপি কখনোই লিক হবে না। আমরা সরাসরি কার্নেল লেভেলে কাস্টম
                  রাউটিং ও ডেডিকেটেড ইউএস ডিএনএস রিজলভার ব্যবহার করি, যা
                  whoer.net ও ipqualityscore-এ ১০০% ক্লিন থাকে।
                </p>
              </div>

              {/* Graphic snippet */}
              <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-900 p-4 font-mono text-xs text-slate-300 shadow-inner">
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Terminal size={12} className="text-emerald-400" /> DNS &amp; WebRTC Audit
                  </span>
                  <span className="text-emerald-400 font-bold">PASSED (0 LEAKS)</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Public IP:</span>
                    <span className="text-emerald-400 font-semibold">108.204.142.88 (Dallas AT&amp;T)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">WebRTC IPv4:</span>
                    <span className="text-emerald-400 font-semibold">108.204.142.88 (Matched)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">DNS Servers:</span>
                    <span className="text-slate-200">US Anycast (No BD DNS Leak)</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Box 2: True KVM Virtualization (5 cols) */}
          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Cpu size={24} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  ট্রু KVM ভার্চুয়ালাইজেশন (No Overselling)
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  ওপেনভিজেড (OpenVZ) বা শেয়ার্ড হোস্ট নয়—প্রতিটি ইনস্ট্যান্স পায়
                  ডেডিকেটেড র্যাম, AMD EPYC প্রসেসর এবং আল্ট্রাফাস্ট Gen4 NVMe ডিস্ক।
                  ডকার, নোড.জেএস কিংবা হাই-লোড মাইএসকিউএল ডাটাবেস চলবে ড্রপ ছাড়া।
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">NVMe Read Speed</p>
                  <p className="mt-1 text-base font-extrabold text-indigo-600">6,800 MB/s</p>
                  <p className="text-[10px] text-slate-500">PCIe Gen4 RAID-1</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Port Capacity</p>
                  <p className="mt-1 text-base font-extrabold text-blue-600">10 Gbps</p>
                  <p className="text-[10px] text-slate-500">Tier-1 Fiber Uplink</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Box 3: 7-Day Free IP Replacement SLA (5 cols) */}
          <Reveal className="lg:col-span-5" delay={0.15}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <RefreshCw size={24} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  ৭ দিনের ফ্রি IP রিপ্লেসমেন্ট SLA
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  কোনো কারণে আপনার সার্ভে বা ফ্রিল্যান্সিং একাউন্টে আইপি জটিলতা দেখা দিলে
                  অথবা আইপি ফ্ল্যাগ হলে, ৭ দিনের মধ্যে আমাদের বনানী হেল্পডেস্কে
                  মেসেজ দিলেই এক ক্লিকে সম্পূর্ণ নতুন ফ্রেশ আইপি সোয়াপ করে দেওয়া হবে।
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-amber-50/80 border border-amber-200/70 p-3.5">
                <CheckCircle2 size={18} className="text-amber-600 shrink-0" />
                <span className="text-xs font-semibold text-amber-900">
                  ১০০% জিরো-হ্যাসেল গ্যারান্টি · কোনো লুকানো চার্জ নেই
                </span>
              </div>
            </div>
          </Reveal>

          {/* Box 4: Automated Control Panel (7 cols) */}
          <Reveal className="lg:col-span-7" delay={0.2}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <Server size={24} />
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    Full Root &amp; VNC Console
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  অটোমেটেড সেলফ-সার্ভিস কন্ট্রোল প্যানেল
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  সাপোর্টের অপেক্ষায় বসে থাকতে হবে না। আমাদের ইউজার ড্যাশবোর্ড
                  থেকে যেকোনো সময় ১-ক্লিকে ওএস রিইনস্টল (Windows / Ubuntu / Debian),
                  রিবুট, লাইভ ট্রাফিকের গ্রাফ পর্যবেক্ষণ এবং জরুরি ব্রাউজার VNC রিমোট কনসোল অ্যাক্সেস করুন।
                </p>
              </div>

              {/* Mock Dashboard controls preview */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer">
                  <Zap size={16} className="mx-auto text-blue-600 mb-1" />
                  <span className="font-semibold text-slate-800">1-Click Reboot</span>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer">
                  <Layers size={16} className="mx-auto text-indigo-600 mb-1" />
                  <span className="font-semibold text-slate-800">Reinstall OS</span>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer">
                  <Terminal size={16} className="mx-auto text-emerald-600 mb-1" />
                  <span className="font-semibold text-slate-800">VNC Console</span>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer">
                  <RefreshCw size={16} className="mx-auto text-amber-600 mb-1" />
                  <span className="font-semibold text-slate-800">IP Swap</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
