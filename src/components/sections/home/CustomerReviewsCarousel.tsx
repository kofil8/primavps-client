"use client";

import { useId } from "react";
import { Reveal } from "@/components/ui/reveal";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  MessageCircle,
  Star,
  Zap,
} from "lucide-react";
import Link from "next/link";

interface ReviewItem {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  location: string;
  countryTag: string;
  countryFlag: string;
  verifiedMethod: string;
  quote: string;
  avatarGradient: string;
  initials: string;
}

const ROW_1_REVIEWS: ReviewItem[] = [
  {
    id: "r1-1",
    name: "তানভীর আহমেদ",
    nameEn: "Tanvir Ahmed",
    role: "Full-Time Survey Researcher",
    location: "Chittagong",
    countryTag: "US AT&T ISP",
    countryFlag: "🇺🇸",
    verifiedMethod: "Verified bKash",
    quote: "Swagbucks ও Prolific-এ একাউন্ট সাসপেনশন শূন্যে নেমেছে! ৪ মাসেও কোনো ফ্ল্যাগ খাইনি — 0/100 IPQS স্কোরের ক্লিন আইপি গেম-চেঞ্জার।",
    avatarGradient: "from-blue-600 to-indigo-600",
    initials: "TA",
  },
  {
    id: "r1-2",
    name: "ফারহান চৌধুরী",
    nameEn: "Farhan Chowdhury",
    role: "Prolific Specialist",
    location: "Sylhet",
    countryTag: "UK BT ISP",
    countryFlag: "🇬🇧",
    verifiedMethod: "Verified Nagad",
    quote: "Prolific-এর জন্য ১০০% ক্লিন UK ব্রডব্যান্ড আইপি। কোনো WebRTC বা DNS লিক নেই, উইন্ডোজ ১১ পারফরম্যান্স অনেক দ্রুত ও স্মুথ।",
    avatarGradient: "from-emerald-600 to-teal-600",
    initials: "FC",
  },
  {
    id: "r1-3",
    name: "সাকিবুর রহমান",
    nameEn: "Sakibur Rahman",
    role: "Remote Software Ops Lead",
    location: "Dhaka",
    countryTag: "DE Telekom ISP",
    countryFlag: "🇩🇪",
    verifiedMethod: "Verified bKash",
    quote: "Deutsche Telekom আইপি দিয়ে ইউরোপের ক্লায়েন্ট কমপ্লায়েন্স ও পেপ্যাল অ্যাক্সেস একদম নিরাপদ। লাইভ পিং ১৪৪ms এবং সাপোর্ট দারুণ।",
    avatarGradient: "from-amber-600 to-orange-600",
    initials: "SR",
  },
];

const ROW_2_REVIEWS: ReviewItem[] = [
  {
    id: "r2-1",
    name: "মাহমুদুল হাসান",
    nameEn: "Mahmudul Hasan",
    role: "Agency & PayPal Lead",
    location: "Dhaka",
    countryTag: "US Comcast ISP",
    countryFlag: "🇺🇸",
    verifiedMethod: "Verified bKash",
    quote: "রাত ২টায় বিকাশ পেমেন্ট করে ৯০ সেকেন্ডে ফুল অ্যাডমিন RDP পেয়েছি। কোনো অপেক্ষা ছাড়া এমন ইনস্ট্যান্ট সার্ভিস দেশে প্রথম।",
    avatarGradient: "from-violet-600 to-purple-600",
    initials: "MH",
  },
  {
    id: "r2-2",
    name: "কামরুল ইসলাম",
    nameEn: "Kamrul Islam",
    role: "Digital Marketing Specialist",
    location: "Rajshahi",
    countryTag: "FR Orange ISP",
    countryFlag: "🇫🇷",
    verifiedMethod: "Verified Nagad",
    quote: "৭ দিনের ফ্রি IP Swap পলিসি আসলেই কাজ করে। হেল্পডেস্কে জানাতেই ৩ মিনিটে ফ্রেশ ফ্রেন্স আইপি রিপ্লেস করে দিয়েছে।",
    avatarGradient: "from-sky-600 to-blue-700",
    initials: "KI",
  },
  {
    id: "r2-3",
    name: "রায়হান কবির",
    nameEn: "Raihan Kabir",
    role: "Full-Time Freelancer",
    location: "Khulna",
    countryTag: "US Spectrum ISP",
    countryFlag: "🇺🇸",
    verifiedMethod: "Verified bKash",
    quote: "বিদেশি হোস্টিংয়ে টিকিট কেটে ২৪ ঘণ্টা অপেক্ষা করতে হতো। এখানে লাইভ চ্যাটেই জরুরি সাপোর্ট ও তাৎক্ষণিক সমাধান পাওয়া যায়।",
    avatarGradient: "from-rose-600 to-pink-600",
    initials: "RK",
  },
];

// Exact Lunera-style bottom impact stats (10k+ / 99.9% / 500M+)
const IMPACT_STATS = [
  { value: "10k+", label: "Happy Users", subtext: "সন্তুষ্ট ফ্রিল্যান্সার ও টিম" },
  { value: "99.9%", label: "Pure ISP Uptime", subtext: "রিয়েল ব্রডব্যান্ড কানেকশন" },
  { value: "0/100", label: "Fraud Score", subtext: "জিরো প্রক্সি ও ব্লকলিস্ট ফ্ল্যাগ" },
];

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div className="w-[320px] sm:w-[380px] shrink-0 rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between select-none">
      <div>
        {/* Top: 5 Golden Stars + Country Pill */}
        <div className="flex items-center justify-between">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200/60">
              <CheckCircle2 size={10} className="text-emerald-600" />
              <span>Verified</span>
            </span>
            <span className="inline-flex items-center gap-0.5 rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-700">
              <span>{review.countryFlag}</span>
              <span>{review.countryTag}</span>
            </span>
          </div>
        </div>

        {/* Short, Punchy Quote (2-3 lines max like Lunera screenshot) */}
        <p className="mt-4 text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
          &ldquo;{review.quote}&rdquo;
        </p>
      </div>

      {/* Bottom: Avatar + Name + Designation */}
      <div className="mt-5 border-t border-slate-100 pt-3.5 flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${review.avatarGradient} text-white font-bold text-xs shadow-2xs ring-2 ring-white`}
        >
          {review.initials}
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
            {review.name}{" "}
            <span className="text-[11px] font-normal text-slate-400">
              ({review.nameEn})
            </span>
          </p>
          <p className="text-[11px] text-slate-500 truncate">
            {review.role}, {review.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CustomerReviewsCarousel() {
  const baseId = useId();

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent("open-chat"));
  };

  // Duplicate arrays to create continuous infinite marquee stream
  const row1Stream = [...ROW_1_REVIEWS, ...ROW_1_REVIEWS, ...ROW_1_REVIEWS];
  const row2Stream = [...ROW_2_REVIEWS, ...ROW_2_REVIEWS, ...ROW_2_REVIEWS];

  return (
    <section
      id="reviews"
      aria-labelledby={`${baseId}-heading`}
      className="border-b border-slate-200/80 bg-white py-20 sm:py-28 overflow-hidden"
    >
      {/* ─── 1. Header (Centered Pill + Big Headline) ─── */}
      <div className="shell">
        <Reveal className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center rounded-full border border-slate-200/90 bg-white px-4 py-1 text-xs font-semibold text-slate-700 shadow-2xs">
            Reviews
          </div>

          <h2
            id={`${baseId}-heading`}
            className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Real Stories, Real Results
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-md">
            ৮৫০+ বাংলাদেশি ফ্রিল্যান্সার ও সার্ভে প্রফেশনালদের খাঁটি কাজের ফলাফল।
          </p>
        </Reveal>
      </div>

      {/* ─── 2. Two-Row Infinite Marquee with Side Fade Gradients (Lunera Screenshot Style) ─── */}
      <div className="relative mt-12 w-full overflow-hidden">
        {/* Left & Right Soft Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-36 lg:w-48 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-36 lg:w-48 bg-gradient-to-l from-white via-white/80 to-transparent" />

        <div className="flex flex-col gap-5 sm:gap-6">
          {/* Row 1 (Moves Left smoothly, pauses on hover) */}
          <div className="flex w-max gap-5 sm:gap-6 animate-marquee hover:[animation-play-state:paused]">
            {row1Stream.map((rev, idx) => (
              <ReviewCard key={`r1-${rev.id}-${idx}`} review={rev} />
            ))}
          </div>

          {/* Row 2 (Moves Right smoothly, pauses on hover) */}
          <div className="flex w-max gap-5 sm:gap-6 animate-marquee-reverse hover:[animation-play-state:paused]">
            {row2Stream.map((rev, idx) => (
              <ReviewCard key={`r2-${rev.id}-${idx}`} review={rev} />
            ))}
          </div>
        </div>
      </div>

      {/* ─── 3. Minimal Neutral Transparency Disclaimer ─── */}
      <div className="shell mt-6">
        <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-400">
          <Lock size={11} className="text-slate-400 shrink-0" />
          <span>
            কাস্টমার প্রাইভেসি সুরক্ষায় নাম ও কেস স্টাডি নিরপেক্ষ প্রতিনিধি (Neutral Case Studies) হিসেবে উপস্থাপিত।
          </span>
        </div>
      </div>

      {/* ─── 4. Exact Lunera Screenshot Bottom Stats (10k+ / 99.9% / 500M+) ─── */}
      <div className="shell">
        <Reveal
          className="mt-14 pt-12 border-t border-slate-200/80 grid grid-cols-3 gap-6 sm:gap-12 text-center max-w-4xl mx-auto"
          delay={0.1}
        >
          {IMPACT_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
                {stat.value}
              </span>
              <span className="mt-2 text-xs sm:text-sm font-bold text-slate-800">
                {stat.label}
              </span>
              <span className="mt-0.5 text-[10px] text-slate-400 font-medium">
                {stat.subtext}
              </span>
            </div>
          ))}
        </Reveal>

        {/* ─── 5. Quick CTA Bar ─── */}
        <Reveal
          className="mt-12 flex flex-col items-center justify-between gap-3.5 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5 sm:flex-row max-w-4xl mx-auto"
          delay={0.15}
        >
          <div className="text-center sm:text-left">
            <p className="text-xs sm:text-sm font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-1">
              <Zap size={14} className="text-amber-500 fill-amber-500" />
              আপনার সার্ভে বা রিমোট প্রজেক্টের জন্য ফ্রেশ ISP আইপি দরকার?
            </p>
            <p className="text-[11px] text-slate-500">
              বিকাশ বা নগদে সরাসরি অর্ডার — ৯০ সেকেন্ডে অটো-অ্যাক্টিভেশন।
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="#pricing"
              className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
            >
              <span>প্ল্যান দেখুন</span>
              <ArrowRight size={12} />
            </Link>

            <button
              type="button"
              onClick={handleOpenChat}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <MessageCircle size={13} className="text-blue-600" />
              <span>পরামর্শ নিন</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
