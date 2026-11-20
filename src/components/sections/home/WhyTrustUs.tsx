"use client";

import { Reveal } from "@/components/ui/reveal";
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  Check,
  Headphones,
  Laptop,
  MessageCircle,
  MousePointerClick,
  Router,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface TrustCardData {
  id: string;
  title: string;
  desc: string;
  linkText: string;
  linkHref?: string;
  actionType?: "link" | "chat";
  illustration: "isp" | "calendar" | "delivery" | "support";
}

const TRUST_CARDS: TrustCardData[] = [
  {
    id: "card-isp",
    title: "Real Home ISP",
    desc: "AT&T ও BT খাঁটি হোম ব্রডব্যান্ড আইপি। সার্ভে প্যানেলে ০% ডেটাসেন্টার ফ্ল্যাগ ঝুঁকি।",
    linkText: "IP চেকার টুল",
    linkHref: "/tools/ip-checker",
    actionType: "link",
    illustration: "isp",
  },
  {
    id: "card-swap",
    title: "৭-দিনের ফ্রি IP Swap",
    desc: "আইপিতে সমস্যা হলে ৩ মিনিটে ফ্রেশ আইপি রিপ্লেসমেন্ট। কোনো প্রশ্ন বা বাড়তি চার্জ ছাড়াই।",
    linkText: "রিপ্লেসমেন্ট পলিসি",
    linkHref: "/legal/ip-replacement",
    actionType: "link",
    illustration: "calendar",
  },
  {
    id: "card-activation",
    title: "Instant অটো-ডেলিভারি",
    desc: "বিকাশ বা নগদে পেমেন্ট নিশ্চিত হতেই ৬০–৯০ সেকেন্ডে ফুল অ্যাডমিন RDP লগইন ইনবক্সে।",
    linkText: "রেসিডেন্সিয়াল প্ল্যান",
    linkHref: "#pricing",
    actionType: "link",
    illustration: "delivery",
  },
  {
    id: "card-support",
    title: "AI + বনানী সাপোর্ট",
    desc: "ইনস্ট্যান্ট AI গাইডেন্স এবং জটিল সেটআপে বনানী ইঞ্জিনিয়ারিং টিম WhatsApp-এ ৩ মিনিটে প্রস্তুত।",
    linkText: "লাইভ চ্যাটে কথা বলুন",
    actionType: "chat",
    illustration: "support",
  },
];

const STATS = [
  { icon: Users, value: "850+", label: "সন্তুষ্ট ইউজার" },
  { icon: Zap, value: "<90s", label: "অটো-ডেলিভারি" },
  { icon: ShieldCheck, value: "0/100", label: "IPQS Fraud Score" },
  { icon: MessageCircle, value: "<3 মিনিট", label: "WhatsApp রেসপন্স" },
];

export function WhyTrustUs() {
  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent("open-chat"));
  };

  return (
    <section className="border-b border-slate-200/80 bg-slate-50/40 py-18 sm:py-24">
      <div className="shell">
        {/* Header - Minimal, punchy */}
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1 text-xs font-bold text-blue-700 shadow-2xs">
            <ShieldCheck size={14} className="text-blue-600" />
            <span>কেন আমাদের বিশ্বাস করবেন</span>
          </div>
          <h2 className="mt-3.5 font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            আপনার পেইন-পয়েন্টের জন্য তৈরি
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            সাধারণ ভিপিএসের একাউন্ট ব্যান ও স্পিড ড্রপ দূর করতে ১০০% খাঁটি হোম ব্রডব্যান্ড নেটওয়ার্ক।
          </p>
        </Reveal>

        {/* 4 Clean Reference-Identical Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {TRUST_CARDS.map((card, idx) => (
            <Reveal
              key={card.id}
              delay={0.05 * (idx + 1)}
              className="group flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* ─── Top Illustration Canvas (Reference Image Style) ─── */}
                <div className="relative mb-4 flex h-38 w-full items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/60 border border-slate-100/80 transition-colors group-hover:from-blue-50/30 group-hover:to-slate-100/70">
                  {/* Subtle orbital dots */}
                  <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />

                  {/* 1. Real Home ISP (Reference "Partners" orbital node style) */}
                  {card.illustration === "isp" && (
                    <div className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-300 group-hover:scale-105">
                      {/* Left ISP Pill */}
                      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white px-2.5 py-1.5 shadow-2xs">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <Router size={13} />
                        </div>
                        <span className="mt-1 text-[9px] font-bold text-slate-800">AT&T ISP</span>
                      </div>

                      {/* Animated Connector */}
                      <div className="flex flex-col items-center">
                        <div className="flex items-center">
                          <span className="h-0.5 w-2.5 bg-slate-300" />
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xs">
                            <Check size={8} strokeWidth={3} />
                          </span>
                          <span className="h-0.5 w-2.5 bg-slate-300" />
                        </div>
                        <span className="mt-1 rounded-full bg-emerald-50 px-1.5 py-0.2 text-[8px] font-bold text-emerald-700 border border-emerald-200/80">
                          0/100 Safe
                        </span>
                      </div>

                      {/* Right Platform Pill */}
                      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white px-2.5 py-1.5 shadow-2xs">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                          <Laptop size={13} />
                        </div>
                        <span className="mt-1 text-[9px] font-bold text-slate-800">Surveys</span>
                      </div>
                    </div>
                  )}

                  {/* 2. 7-Day Swap (Reference "Function diary" calendar widget style) */}
                  {card.illustration === "calendar" && (
                    <div className="relative z-10 flex flex-col w-[180px] rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-2xs transition-transform duration-300 group-hover:scale-105">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1 text-[9px] font-bold text-slate-700">
                        <span className="flex items-center gap-1 text-emerald-600">
                          <CalendarCheck size={11} /> Day 1
                        </span>
                        <span className="text-slate-400">Day 4</span>
                        <span className="rounded bg-emerald-100 px-1 text-[8px] font-extrabold text-emerald-800">
                          Day 7 Free
                        </span>
                      </div>

                      <div className="mt-1.5 flex flex-col gap-1">
                        <div className="flex items-center justify-between rounded-md bg-emerald-50 px-2 py-0.5 text-[8px] font-semibold text-emerald-800 border border-emerald-200/60">
                          <span>✓ Free IP Swap</span>
                          <span className="font-bold text-emerald-600">0৳</span>
                        </div>
                        <div className="flex items-center justify-between rounded-md bg-blue-50 px-2 py-0.5 text-[8px] font-semibold text-blue-800 border border-blue-200/60">
                          <span>⏱️ Turnaround</span>
                          <span className="font-bold text-blue-600">&lt;3 Min</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. Instant Activation (Reference "Order management" dropdown style) */}
                  {card.illustration === "delivery" && (
                    <div className="relative z-10 flex flex-col w-[190px] rounded-xl border border-slate-200/90 bg-white p-2 shadow-2xs transition-transform duration-300 group-hover:scale-105">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between rounded bg-slate-50 px-2 py-0.5 text-[8px]">
                          <span className="flex items-center gap-1 font-semibold text-slate-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> bKash/Nagad
                          </span>
                          <span className="font-bold text-emerald-600">Confirmed</span>
                        </div>
                        <div className="flex items-center justify-between rounded bg-slate-50 px-2 py-0.5 text-[8px]">
                          <span className="flex items-center gap-1 font-semibold text-slate-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" /> Auto-Deploy
                          </span>
                          <span className="font-bold text-blue-600">Active</span>
                        </div>
                        <div className="flex items-center justify-between rounded bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 text-[8px]">
                          <span className="flex items-center gap-1 font-bold text-emerald-900">
                            <Zap size={9} className="text-amber-500 fill-amber-500" /> RDP Ready
                          </span>
                          <span className="font-extrabold text-emerald-700">&lt;90s</span>
                        </div>
                      </div>

                      {/* Cursor click indicator */}
                      <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
                        <MousePointerClick size={10} />
                      </div>
                    </div>
                  )}

                  {/* 4. Dual-Tier Support (Reference "Venue Sales / Control toggle" style) */}
                  {card.illustration === "support" && (
                    <div className="relative z-10 flex flex-col w-[180px] rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-2xs transition-transform duration-300 group-hover:scale-105">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                        <div className="flex items-center gap-1 text-[9px] font-bold text-slate-800">
                          <Bot size={11} className="text-violet-600" />
                          <span>AI Chatbot</span>
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-1.5 py-0.2 text-[7px] font-bold text-emerald-800">
                          <span className="h-1 w-1 rounded-full bg-emerald-600 animate-ping" /> Instant
                        </span>
                      </div>

                      <div className="mt-1 flex items-center justify-between pt-0.5">
                        <div className="flex items-center gap-1 text-[9px] font-bold text-slate-800">
                          <Headphones size={11} className="text-blue-600" />
                          <span>বনানী ডেস্ক</span>
                        </div>
                        <span className="rounded-full bg-blue-50 border border-blue-200/60 px-1.5 py-0.2 text-[7px] font-bold text-blue-700">
                          ~৩ মিনিট
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Minimal Content */}
                <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {/* Bottom Learn More link */}
              <div className="mt-4 border-t border-slate-100 pt-2.5">
                {card.actionType === "chat" ? (
                  <button
                    type="button"
                    onClick={handleOpenChat}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-all cursor-pointer"
                  >
                    <span>{card.linkText}</span>
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <Link
                    href={card.linkHref || "#"}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-all"
                  >
                    <span>{card.linkText}</span>
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Compact Stat Strip */}
        <Reveal
          className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white px-6 py-4 shadow-xs sm:flex-row sm:px-8"
          delay={0.12}
        >
          <div className="flex flex-wrap justify-center gap-6 sm:justify-start">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Icon size={14} />
                </div>
                <div>
                  <p className="font-display text-base font-extrabold text-slate-900 leading-none">
                    {value}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleOpenChat}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <MessageCircle size={14} />
            <span>লাইভ চ্যাট হেল্পডেস্ক</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
