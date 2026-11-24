"use client";

import { Reveal } from "@/components/ui/reveal";
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  Check,
  Clock,
  Headphones,
  Laptop,
  MousePointerClick,
  Router,
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
    desc: "AT&T, Comcast, Verizon ও ইউরোপীয় খাঁটি হোম ব্রডব্যান্ড IP। রিমোট প্ল্যাটফর্মে ডেটাসেন্টার ব্লকেজ ছাড়া নিরবচ্ছিন্ন কাজের নিশ্চয়তা।",
    linkText: "IP চেকার টুল",
    linkHref: "/tools/ip-checker",
    actionType: "link",
    illustration: "isp",
  },
  {
    id: "card-swap",
    title: "৭-দিনের ফ্রি IP Swap",
    desc: "আইপিতে কোনো প্রযুক্তিগত সমস্যা হলে তাৎক্ষণিক ফ্রেশ আইপি রিপ্লেসমেন্ট। কোনো প্রশ্ন বা বাড়তি চার্জ ছাড়াই।",
    linkText: "রিপ্লেসমেন্ট পলিসি",
    linkHref: "/refund-policy",
    actionType: "link",
    illustration: "calendar",
  },
  {
    id: "card-activation",
    title: "Instant অটো-ডেলিভারি",
    desc: "বিকাশ বা নগদে পেমেন্ট নিশ্চিত হতেই ৬০–৯০ সেকেন্ডে ফুল অ্যাডমিন RDP লগইন সরাসরি ইনবক্সে।",
    linkText: "রেসিডেন্সিয়াল প্ল্যান",
    linkHref: "#pricing",
    actionType: "link",
    illustration: "delivery",
  },
  {
    id: "card-support",
    title: "AI + বনানী সাপোর্ট",
    desc: "তাৎক্ষণিক AI গাইডেন্স এবং জটিল সেটআপে বনানী ইঞ্জিনিয়ারিং টিম WhatsApp-এ গড়ে ৩ মিনিটে প্রস্তুত।",
    linkText: "লাইভ চ্যাটে কথা বলুন",
    actionType: "chat",
    illustration: "support",
  },
];

export function WhyTrustUs() {
  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent("open-chat"));
  };

  return (
    <section className="border-b border-slate-200/80 bg-slate-50/50 py-12 sm:py-16 lg:py-24">
      <div className="shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            কেন primavps বেছে নেবেন
          </p>
          <h2 className="mt-2 font-display text-2xl font-extrabold leading-[1.2] tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            অপারেশনের ৪টি নিশ্চয়তা
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
            আনস্ট্যাবিলিটি দূর করতে ১০০% খাঁটি হোম ব্রডব্যান্ড ও গ্লোবাল ক্লাউড
            নেটওয়ার্ক।
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-5 xl:gap-6">
          {TRUST_CARDS.map((card, idx) => (
            <Reveal
              key={card.id}
              delay={0.05 * (idx + 1)}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:rounded-3xl sm:p-5"
            >
              <div>
                {/* Responsive Illustration Canvas — never clips at 1024px */}
                <div className="relative mb-4 flex h-34 w-full items-center justify-center overflow-hidden rounded-xl border border-slate-100/80 bg-gradient-to-b from-slate-50 to-slate-100/60 px-3 transition-colors group-hover:from-blue-50/30 group-hover:to-slate-100/70 sm:h-36 sm:rounded-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />

                  {card.illustration === "isp" && (
                    <div className="relative z-10 flex items-center justify-center gap-1.5 transition-transform duration-300 group-hover:scale-105 lg:scale-90 xl:scale-100">
                      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white px-2 py-1.5 shadow-2xs">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <Router size={13} />
                        </div>
                        <span className="mt-1 whitespace-nowrap text-[9px] font-bold text-slate-800">
                          Home ISP
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="flex items-center">
                          <span className="h-0.5 w-2 bg-slate-300" />
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xs">
                            <Check size={8} strokeWidth={3} />
                          </span>
                          <span className="h-0.5 w-2 bg-slate-300" />
                        </div>
                        <span className="mt-1 whitespace-nowrap rounded-full border border-emerald-200/80 bg-emerald-50 px-1.5 py-0.5 text-[8px] font-bold text-emerald-700">
                          0/100 Safe
                        </span>
                      </div>

                      <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white px-2 py-1.5 shadow-2xs">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                          <Laptop size={13} />
                        </div>
                        <span className="mt-1 whitespace-nowrap text-[9px] font-bold text-slate-800">
                          Surveys
                        </span>
                      </div>
                    </div>
                  )}

                  {card.illustration === "calendar" && (
                    <div className="relative z-10 flex w-full max-w-[180px] flex-col rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-2xs transition-transform duration-300 group-hover:scale-105">
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
                        <div className="flex items-center justify-between rounded-md border border-emerald-200/60 bg-emerald-50 px-2 py-0.5 text-[8px] font-semibold text-emerald-800">
                          <span>✓ Free IP Swap</span>
                          <span className="font-bold text-emerald-600">0৳</span>
                        </div>
                        <div className="flex items-center justify-between rounded-md border border-blue-200/60 bg-blue-50 px-2 py-0.5 text-[8px] font-semibold text-blue-800">
                          <span className="inline-flex items-center gap-1">
                            <Clock size={9} className="text-blue-600" />
                            Turnaround
                          </span>
                          <span className="font-bold text-blue-600">
                            &lt;3 Min
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {card.illustration === "delivery" && (
                    <div className="relative z-10 flex w-full max-w-[185px] flex-col rounded-xl border border-slate-200/90 bg-white p-2 shadow-2xs transition-transform duration-300 group-hover:scale-105">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between rounded bg-slate-50 px-2 py-0.5 text-[8px]">
                          <span className="flex items-center gap-1 font-semibold text-slate-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            bKash / Nagad
                          </span>
                          <span className="font-bold text-emerald-600">
                            Confirmed
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded bg-slate-50 px-2 py-0.5 text-[8px]">
                          <span className="flex items-center gap-1 font-semibold text-slate-700">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
                            Auto-Deploy
                          </span>
                          <span className="font-bold text-blue-600">
                            Active
                          </span>
                        </div>
                        <div className="flex items-center justify-between rounded border border-emerald-200/70 bg-emerald-50 px-2 py-0.5 text-[8px]">
                          <span className="flex items-center gap-1 font-bold text-emerald-900">
                            <Zap
                              size={9}
                              className="fill-amber-500 text-amber-500"
                            />
                            RDP Ready
                          </span>
                          <span className="font-extrabold text-emerald-700">
                            &lt;90s
                          </span>
                        </div>
                      </div>

                      <div className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
                        <MousePointerClick size={10} />
                      </div>
                    </div>
                  )}

                  {card.illustration === "support" && (
                    <div className="relative z-10 flex w-full max-w-[180px] flex-col rounded-xl border border-slate-200/90 bg-white p-2.5 shadow-2xs transition-transform duration-300 group-hover:scale-105">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                        <div className="flex items-center gap-1 text-[9px] font-bold text-slate-800">
                          <Bot size={11} className="text-violet-600" />
                          <span>AI Chatbot</span>
                        </div>
                        <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[7px] font-bold text-emerald-800">
                          <span className="h-1 w-1 animate-ping rounded-full bg-emerald-600" />
                          Instant
                        </span>
                      </div>

                      <div className="mt-1 flex items-center justify-between pt-0.5">
                        <div className="flex items-center gap-1 text-[9px] font-bold text-slate-800">
                          <Headphones size={11} className="text-blue-600" />
                          <span>বনানী ডেস্ক</span>
                        </div>
                        <span className="rounded-full border border-blue-200/60 bg-blue-50 px-1.5 py-0.5 text-[7px] font-bold text-blue-700">
                          ~৩ মিনিট
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <h3 className="font-display text-base font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  {card.desc}
                </p>
              </div>

              <div className="mt-4 border-t border-slate-100 pt-2.5">
                {card.actionType === "chat" ? (
                  <button
                    type="button"
                    onClick={handleOpenChat}
                    className="inline-flex cursor-pointer items-center gap-1 text-xs font-bold text-blue-600 transition-all hover:text-blue-700"
                  >
                    <span>{card.linkText}</span>
                    <ArrowRight
                      size={12}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                ) : (
                  <Link
                    href={card.linkHref || "#"}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 transition-all hover:text-blue-700"
                  >
                    <span>{card.linkText}</span>
                    <ArrowRight
                      size={12}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
