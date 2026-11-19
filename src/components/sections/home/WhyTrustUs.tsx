"use client";

import { Reveal } from "@/components/ui/reveal";
import {
  MessageCircle,
  RefreshCw,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

// ─── 4 trust points ───────────────────────────────────────────────────────────

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    color: "bg-blue-50 text-blue-600",
    title: "Real ISP IP — ডেটাসেন্টার নয়",
    desc: "ইউএস, ইউকে, জার্মানি ও ফ্রান্সের রিয়েল হোম ব্রডব্যান্ড আইপি (AT&T, BT, Telekom, Orange)। সার্ভে প্যানেল বা PayPal-এর কাছে ডেটাসেন্টার হিসেবে দেখায় না, তাই ব্লক বা ফ্ল্যাগের ঝুঁকি নেই।",
  },
  {
    icon: RefreshCw,
    color: "bg-emerald-50 text-emerald-600",
    title: "৭ দিনের ফ্রি IP Swap",
    desc: "কেনার ৭ দিনের মধ্যে আইপিতে কোনো সমস্যা হলে বিনামূল্যে ফ্রেশ IP রিপ্লেসমেন্ট পাবেন। কোনো প্রশ্ন নেই, কোনো ঝামেলা নেই।",
  },
  {
    icon: Zap,
    color: "bg-amber-50 text-amber-600",
    title: "Instant bKash / Nagad Activation",
    desc: "আন্তর্জাতিক কার্ড ছাড়াই বিকাশ, নগদ বা রকেটে পেমেন্ট করুন। পেমেন্ট নিশ্চিত হওয়ার ৯০ সেকেন্ডের মধ্যে RDP লগইন তথ্য ইমেইলে পাবেন।",
  },
  {
    icon: MessageCircle,
    color: "bg-violet-50 text-violet-600",
    title: "AI Bot + বনানী টিম — দুই স্তরের সাপোর্ট",
    desc: "সাধারণ প্রশ্নে AI চ্যাটবট তাৎক্ষণিক সাহায্য করবে। জটিল বিষয়ে আমাদের বনানী ইঞ্জিনিয়ারিং টিম WhatsApp-এ গড় ৩ মিনিটে সাড়া দেয়।",
  },
];

// ─── Stat strip ───────────────────────────────────────────────────────────────

const STATS = [
  { icon: Users, value: "850+",    label: "সন্তুষ্ট কাস্টমার" },
  { icon: Zap,   value: "<90s",    label: "অটো-ডেলিভারি" },
  { icon: ShieldCheck, value: "0/100", label: "IPQS Fraud Score" },
  { icon: MessageCircle, value: "<3 মিনিট", label: "WhatsApp রেসপন্স" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function WhyTrustUs() {
  return (
    <section className="border-b border-slate-200 bg-slate-50/60 py-20 sm:py-28">
      <div className="shell">
        {/* Header */}
        <Reveal className="max-w-2xl">
          <p className="eyebrow inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-blue-600">
            <ShieldCheck size={15} />
            কেন সার্ভে ইউজাররা আমাদের বিশ্বাস করেন
          </p>
          <h2 className="section-title mt-2.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            আপনার পেইন-পয়েন্টের জন্য তৈরি
          </h2>
        </Reveal>

        {/* 4 trust points */}
        <Reveal className="mt-10 grid gap-5 sm:grid-cols-2" delay={0.1}>
          {TRUST_POINTS.map(({ icon: Icon, color, title, desc }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}>
                <Icon size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{desc}</p>
              </div>
            </div>
          ))}
        </Reveal>

        {/* Compact stat strip + Live Chat CTA */}
        <Reveal
          className="mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm sm:flex-row sm:px-8"
          delay={0.15}
        >
          <div className="flex flex-wrap justify-center gap-6 sm:justify-start">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="flex items-center gap-1.5">
                  <Icon size={15} className="text-blue-600" />
                  <span className="font-display text-xl font-extrabold text-slate-900">{value}</span>
                </div>
                <span className="mt-0.5 text-xs text-slate-500">{label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 hover:-translate-y-0.5 cursor-pointer"
            >
              <MessageCircle size={16} />
              লাইভ চ্যাট হেল্পডেস্ক
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
