"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ShieldCheck,
  Star,
} from "lucide-react";
import Link from "next/link";

interface Review {
  id: string;
  name: string;
  role: string;
  location: string;
  country: string;
  countryFlag: string;
  plan: string;
  verifiedMethod: string;
  headline: string;
  comment: string;
}

const REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "তানভীর আহমেদ",
    role: "Paid Survey & Research",
    location: "আগ্রাবাদ, চট্টগ্রাম",
    country: "US (AT&T)",
    countryFlag: "🇺🇸",
    plan: "Popular Pro ISP",
    verifiedMethod: "Verified bKash Order",
    headline: "৪ মাসেও Swagbucks বা Qmee-তে কোনো অ্যাকাউন্ট ব্যান হয়নি",
    comment:
      "আগে নরমাল ভিপিএস বা ভিপিএন দিয়ে কাজ করতাম, ২-৩ দিন পর পরই ফ্ল্যাগ করত। primevpsbd-র AT&T রেসিডেন্সিয়াল RDP নেওয়ার পর IPQS স্কোরে সবসময় 0/100 পাই। বিকাশ দিয়ে পেমেন্টের ১ মিনিটের মধ্যে লগইন পেয়েছি।",
  },
  {
    id: "rev-2",
    name: "ফারহান চৌধুরী",
    role: "Prolific & UK Survey Specialist",
    location: "জিন্দাবাজার, সিলেট",
    country: "UK (BT)",
    countryFlag: "🇬🇧",
    plan: "Starter UK ISP",
    verifiedMethod: "Verified Nagad Order",
    headline: "UK BT ব্রডব্যান্ড আইপি দিয়ে Prolific-এ প্রথম দিনেই অ্যাকাউন্ট সেফ",
    comment:
      "Prolific-এর জন্য ১০০% ক্লিন UK রেসিডেন্সিয়াল আইপি দরকার ছিল। এদের BT ISP RDP-তে WebRTC বা DNS লিকের কোনো চিহ্ন নেই। স্পিড ও উইন্ডোজ ১১ পারফরম্যান্স অনেক স্মুথ।",
  },
  {
    id: "rev-3",
    name: "মাহমুদুল হাসান",
    role: "Freelance Agency & PayPal Ops",
    location: "মিরপুর-১০, ঢাকা",
    country: "US (Comcast)",
    countryFlag: "🇺🇸",
    plan: "VIP Fresh RDP",
    verifiedMethod: "Verified bKash Order",
    headline: "রাত ২টায় বিকাশ পেমেন্ট করে ৯০ সেকেন্ডে অটো-ডেলিভারি পেয়েছি",
    comment:
      "কোনো ম্যানুয়াল অপেক্ষার ঝামেলা নেই। পেমেন্ট কনফার্মেশনের সাথে সাথেই ইনবক্সে ফুল অ্যাডমিনিস্ট্রেটর RDP ক্রেডেনশিয়ালস পেয়ে গেছি। US ক্লায়েন্টদের পেপ্যাল হ্যান্ডলিংয়ে কোনো সমস্যা হয় না।",
  },
  {
    id: "rev-4",
    name: "সাকিবুর রহমান",
    role: "Remote Software Developer",
    location: "ধানমন্ডি, ঢাকা",
    country: "DE (Telekom)",
    countryFlag: "🇩🇪",
    plan: "Popular Pro DE",
    verifiedMethod: "Verified bKash Order",
    headline: "Deutsche Telekom আইপি দিয়ে জার্মানির রিমোট ওয়ার্ক নির্বিঘ্নে চলছে",
    comment:
      "জার্মান ক্লায়েন্টের কমপ্লায়েন্সের জন্য ক্লিন ইউরোপিয়ান আইপি লাগত। লাইভ পিং ১৪৪ মিলিসেকেন্ড এবং বাফার ছাড়াই রিমোট ডেস্কটপ চলে। সাপোর্ট টিমের বনানী ইঞ্জিনিয়াররা হোয়াটসঅ্যাপে খুব ফ্রেন্ডলি।",
  },
  {
    id: "rev-5",
    name: "কামরুল ইসলাম",
    role: "Multi-Account Manager",
    location: "বোয়ালিয়া, রাজশাহী",
    country: "FR (Orange)",
    countryFlag: "🇫🇷",
    plan: "Starter FR ISP",
    verifiedMethod: "Verified Nagad Order",
    headline: "৭ দিনের ফ্রি IP Swap পলিসি আমার অ্যাকাউন্ট বাঁচিয়েছে",
    comment:
      "একবার সাইটের নিজস্ব সার্ভার ডাউন ইস্যু হয়েছিল, সাথে সাথে বনানী হেল্পডেস্কে নক দিতেই ৩ মিনিটের মধ্যে একটা ফ্রেশ ফ্রেন্স আইপি রিপ্লেস করে দেয়। কাস্টমার সার্ভিস আসলেই রিয়েল মানুষ চালায়।",
  },
  {
    id: "rev-6",
    name: "রায়হান কবির",
    role: "Upwork & Survey Operator",
    location: "খালিশপুর, খুলনা",
    country: "US (AT&T)",
    countryFlag: "🇺🇸",
    plan: "Popular Pro ISP",
    verifiedMethod: "Verified bKash Order",
    headline: "ঢাকা বনানী টিমের ৩ মিনিটের হোয়াটসঅ্যাপ সাপোর্ট সবচেয়ে বড় ভরসা",
    comment:
      "বিদেশি হোস্টিংয়ে টিকিট কেটে ২৪ ঘণ্টা অপেক্ষা করতে হতো। এখানে যেকোনো সেটিং বা RDP কানেকশন ইস্যুতে হোয়াটসঅ্যাপেই সরাসরি ইঞ্জিনিয়াররা গাইড করে সমাধান দেয়। ফুল টাকা উসুল।",
  },
];

export function CustomerReviewsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const scrollStep = 0.75; // subtle smooth drift speed

    const autoScroll = () => {
      if (!isPaused && container) {
        // If reached end, loop back smoothly
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 2
        ) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += scrollStep;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const handleScrollManual = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 360;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="border-b border-slate-200 bg-white py-20 sm:py-28 overflow-hidden">
      <div className="shell">
        {/* Section Header with Average Rating Summary */}
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
              <ShieldCheck size={14} className="text-emerald-600" />
              100% Verified Customer Reviews
            </div>
            <h2 className="section-title mt-2.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              কাস্টমারদের বাস্তব কাজের অভিজ্ঞতা ও ফলাফল
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              বিকাশ ও নগদে অর্ডার করা ৮৫০+ বাংলাদেশি ফ্রিল্যান্সার ও সার্ভে ওয়ার্কার
              কেন আমাদের সার্ভারে ভরসা রাখেন দেখুন।
            </p>
          </div>

          {/* Carousel Arrows & Rating badge */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>
              <span>4.9 / 5.0 (850+ রিভিউ)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleScrollManual("left")}
                aria-label="Previous review"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-2xs transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => handleScrollManual("right")}
                aria-label="Next review"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-2xs transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Horizontal Carousel Track */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="mt-10 flex gap-6 overflow-x-auto pb-4 pt-1 scrollbar-none"
          style={{ scrollBehavior: "auto" }}
        >
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="flex w-[320px] sm:w-[380px] shrink-0 flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm transition-all duration-300 hover:border-blue-300 hover:bg-white hover:shadow-md"
            >
              <div>
                {/* Top Row: Stars + Verified Badge + Country */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200/60">
                      <CheckCircle2 size={11} className="text-emerald-600" />
                      {review.verifiedMethod}
                    </span>
                    <span className="rounded-md bg-blue-100 px-1.5 py-0.5 text-[10px] font-extrabold text-blue-800">
                      {review.countryFlag} {review.country}
                    </span>
                  </div>
                </div>

                {/* Outcome Headline */}
                <h3 className="mt-4 font-display text-base font-bold text-slate-900 leading-snug">
                  &ldquo;{review.headline}&rdquo;
                </h3>

                {/* Body Comment */}
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {review.comment}
                </p>
              </div>

              {/* Bottom Author Row */}
              <div className="mt-6 border-t border-slate-200/80 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">
                    {review.name}
                  </p>
                  <p className="text-[11px] text-slate-500">{review.role}</p>
                  <p className="text-[10px] text-slate-400">{review.location}</p>
                </div>
                <span className="rounded-xl border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                  {review.plan}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Micro-CTA Bar under Carousel */}
        <Reveal
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row"
          delay={0.1}
        >
          <div className="text-center sm:text-left">
            <p className="text-xs sm:text-sm font-bold text-slate-900">
              সার্ভে বা রিমোট কাজের জন্য সঠিক আইপি দরকার?
            </p>
            <p className="text-[11px] sm:text-xs text-slate-500">
              বিকাশ বা নগদে ইনস্ট্যান্ট অর্ডার করুন — ৬০–৯০ সেকেন্ডে অটো-ডেলিভারি।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="#pricing"
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <span>ISP Plans দেখুন</span>
              <ArrowRight size={13} />
            </Link>
            <Link
              href="https://wa.me/8801960677463?text=হ্যালো,%20আমি%20Residential%20RDP%20কেনার%20আগে%20কিছু%20পরামর্শ%20নিতে%20চাচ্ছি"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle size={14} className="text-emerald-600" />
              <span>WhatsApp হেল্পলাইন</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
