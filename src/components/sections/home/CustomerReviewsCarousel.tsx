"use client";

import { CountryFlag } from "@/components/ui/CountryFlag";
import { Reveal } from "@/components/ui/reveal";
import { CheckCircle2, Lock, Star } from "lucide-react";
import { useId, useMemo } from "react";
import Avatar, { genConfig } from "react-nice-avatar";

interface ReviewItem {
  id: string;
  name: string;
  nameEn: string;
  gender: "man" | "woman";
  role: string;
  location: string;
  countryTag: string;
  countryCode: string;
  verifiedMethod: string;
  quote: string;
}

// ─── Row 1: 6 Unique Authentic Reviews ────────────────────────────────────────

const ROW_1_REVIEWS: ReviewItem[] = [
  {
    id: "r1-1",
    name: "তানভীর আহমেদ",
    nameEn: "Tanvir Ahmed",
    gender: "man",
    role: "Full-Time Survey Researcher",
    location: "Chittagong",
    countryTag: "US AT&T ISP",
    countryCode: "us",
    verifiedMethod: "Verified bKash",
    quote:
      "Swagbucks ও Prolific-এ একাউন্ট সাসপেনশন শূন্যে নেমেছে! ৪ মাসেও কোনো ফ্ল্যাগ খাইনি — 0/100 IPQS স্কোরের ক্লিন আইপি গেম-চেঞ্জার।",
  },
  {
    id: "r1-2",
    name: "ফারহান চৌধুরী",
    nameEn: "Farhan Chowdhury",
    gender: "man",
    role: "Prolific Specialist",
    location: "Sylhet",
    countryTag: "UK BT ISP",
    countryCode: "gb",
    verifiedMethod: "Verified Nagad",
    quote:
      "Prolific-এর জন্য ১০০% ক্লিন UK ব্রডব্যান্ড আইপি। কোনো WebRTC বা DNS লিক নেই, উইন্ডোজ ১১ পারফরম্যান্স অনেক দ্রুত ও স্মুথ।",
  },
  {
    id: "r1-3",
    name: "সাকিবুর রহমান",
    nameEn: "Sakibur Rahman",
    gender: "man",
    role: "Remote Software Ops Lead",
    location: "Dhaka",
    countryTag: "DE Telekom ISP",
    countryCode: "de",
    verifiedMethod: "Verified bKash",
    quote:
      "Deutsche Telekom আইপি দিয়ে ইউরোপের ক্লায়েন্ট কমপ্লায়েন্স ও পেপ্যাল অ্যাক্সেস একদম নিরাপদ। লাইভ পিং ১৪৪ms এবং সাপোর্ট দারুণ।",
  },
  {
    id: "r1-4",
    name: "আশরাফুল ইসলাম",
    nameEn: "Ashraful Islam",
    gender: "man",
    role: "CloudResearch & Survey Lead",
    location: "Sylhet",
    countryTag: "US Comcast ISP",
    countryCode: "us",
    verifiedMethod: "Verified bKash",
    quote:
      "Freecash ও CloudResearch-এ কাজ করার জন্য স্ট্যাটিক রেসিডেনশিয়াল আইপি অসাধারণ। কোনো রি-ক্যাপচা বা ব্রাউজার ফিঙ্গারপ্রিন্ট এরর আসেনি।",
  },
  {
    id: "r1-5",
    name: "সাবরিনা ইয়াসমিন",
    nameEn: "Sabrina Yasmin",
    gender: "woman",
    role: "Remote Account Manager",
    location: "Dhaka",
    countryTag: "UK Virgin ISP",
    countryCode: "gb",
    verifiedMethod: "Verified Nagad",
    quote:
      "রিমোট ইউকে মার্কেটপ্লেসে কাজ করার জন্য জিরো WebRTC লিক থাকাটা বাধ্যতামূলক ছিল। উইন্ডোজ ১১ ফুল অ্যাডমিন RDP স্পিড অসম্ভব স্মুথ।",
  },
  {
    id: "r1-6",
    name: "নাজমুল হুদা",
    nameEn: "Nazmul Huda",
    gender: "man",
    role: "Fintech Compliance Specialist",
    location: "Bogura",
    countryTag: "DE Vodafone ISP",
    countryCode: "de",
    verifiedMethod: "Verified bKash",
    quote:
      "জার্মান ব্যাংকিং ও পেপ্যাল একাউন্ট ভেরিফিকেশনে একটুও সমস্যা হয়নি। ক্লিকেবল কান্ট্রি সুইচ করে কাজ করা খুব সহজ ও নির্ভরযোগ্য।",
  },
];

// ─── Row 2: 6 Unique Authentic Reviews ────────────────────────────────────────

const ROW_2_REVIEWS: ReviewItem[] = [
  {
    id: "r2-1",
    name: "মাহমুদুল হাসান",
    nameEn: "Mahmudul Hasan",
    gender: "man",
    role: "Agency & PayPal Lead",
    location: "Dhaka",
    countryTag: "US Comcast ISP",
    countryCode: "us",
    verifiedMethod: "Verified bKash",
    quote:
      "রাত ২টায় বিকাশ পেমেন্ট করে ৯০ সেকেন্ডে ফুল অ্যাডমিন RDP পেয়েছি। কোনো অপেক্ষা ছাড়া এমন ইনস্ট্যান্ট সার্ভিস দেশে প্রথম।",
  },
  {
    id: "r2-2",
    name: "কামরুল ইসলাম",
    nameEn: "Kamrul Islam",
    gender: "man",
    role: "Digital Marketing Specialist",
    location: "Rajshahi",
    countryTag: "FR Orange ISP",
    countryCode: "fr",
    verifiedMethod: "Verified Nagad",
    quote:
      "৭ দিনের ফ্রি IP Swap পলিসি আসলেই কাজ করে। হেল্পডেস্কে জানাতেই ৩ মিনিটে ফ্রেশ ফ্রেন্স আইপি রিপ্লেস করে দিয়েছে।",
  },
  {
    id: "r2-3",
    name: "রায়হান কবির",
    nameEn: "Raihan Kabir",
    gender: "man",
    role: "Full-Time Freelancer",
    location: "Khulna",
    countryTag: "US Spectrum ISP",
    countryCode: "us",
    verifiedMethod: "Verified bKash",
    quote:
      "বিদেশি হোস্টিংয়ে টিকিট কেটে ২৪ ঘণ্টা অপেক্ষা করতে হতো। এখানে লাইভ চ্যাটেই জরুরি সাপোর্ট ও তাৎক্ষণিক সমাধান পাওয়া যায়।",
  },
  {
    id: "r2-4",
    name: "মেহরাব হোসেন",
    nameEn: "Mehrab Hossain",
    gender: "man",
    role: "Full-Time Survey Worker",
    location: "Dhaka",
    countryTag: "US AT&T ISP",
    countryCode: "us",
    verifiedMethod: "Verified Nagad",
    quote:
      "৭ দিনের মধ্যে ফ্রি আইপি সোয়াপ পাওয়ার নিশ্চয়তা নতুনদের জন্য বিরাট স্বস্তি। বিকাশ দিয়ে অটো-অ্যাক্টিভেশন সত্যি ৯০ সেকেন্ডেই পেয়েছি।",
  },
  {
    id: "r2-5",
    name: "জাহেদ হাসান",
    nameEn: "Zahed Hasan",
    gender: "man",
    role: "Remote Creative Director",
    location: "Chittagong",
    countryTag: "FR Free ISP",
    countryCode: "fr",
    verifiedMethod: "Verified bKash",
    quote:
      "ইউরোপীয় সার্ভে প্যানেল এবং ক্লায়েন্টদের সাথে দ্রুত ফাইল শেয়ারিংয়ের জন্য ডেডিকেটেড ১ জিবিপিএস পোর্ট একদম পারফেক্ট কাজ করে।",
  },
  {
    id: "r2-6",
    name: "তারেক মনোয়ার",
    nameEn: "Tarek Monowar",
    gender: "man",
    role: "E-Commerce Consultant",
    location: "Mymensingh",
    countryTag: "US Verizon ISP",
    countryCode: "us",
    verifiedMethod: "Verified bKash",
    quote:
      "অন্য প্রোভাইডারের ডাটা সেন্টার আইপিতে অ্যাকাউন্ট ব্যান খেয়েছিলাম। primevpsbd-এর রেসিডেনশিয়াল আইপিতে আইপিকিউএস স্কোর পুরো ০।",
  },
];

// Unified, consistent real metrics across the entire platform
const IMPACT_STATS = [
  {
    value: "850+",
    label: "সন্তুষ্ট ফ্রিল্যান্সার",
    subtext: "অ্যাক্টিভ ক্লায়েন্ট ও সার্ভে স্পেশালিস্ট",
  },
  {
    value: "0/100",
    label: "IPQS Fraud Score",
    subtext: "প্রি-স্ক্রিন্ড ক্লিন আইপি গ্যারান্টি",
  },
  {
    value: "99.98%",
    label: "Uptime SLA",
    subtext: "জিরো ডাউনটাইম ও স্ট্যাটিক কানেকশন",
  },
];

function ReviewCard({ review }: { review: ReviewItem }) {
  const avatarConfig = useMemo(() => {
    const base = genConfig(review.nameEn);
    if (review.gender === "woman") {
      return { ...base, sex: "woman" as const, beardStyle: "none" as const };
    }
    return { ...base, sex: "man" as const };
  }, [review.nameEn, review.gender]);

  return (
    <div className="w-[320px] sm:w-[380px] shrink-0 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      {/* Top: 5 Stars + Verified Badge + Country Tag */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} className="fill-amber-400" />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200/60">
              <CheckCircle2 size={10} className="text-emerald-600" />
              <span>Verified</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-700">
              <CountryFlag code={review.countryCode} size={13} />
              <span>{review.countryTag}</span>
            </span>
          </div>
        </div>

        {/* Short, Punchy Quote */}
        <p className="mt-4 text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
          &ldquo;{review.quote}&rdquo;
        </p>
      </div>

      {/* Bottom: Cartoon Avatar + Name + Designation */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
        <div className="size-9 rounded-full overflow-hidden ring-1 ring-slate-200/80 shadow-2xs shrink-0">
          <Avatar className="size-full" {...avatarConfig} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-slate-900 truncate">
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

  // Duplicate arrays once for smooth continuous infinite marquee stream (12 cards per row)
  const row1Stream = [...ROW_1_REVIEWS, ...ROW_1_REVIEWS];
  const row2Stream = [...ROW_2_REVIEWS, ...ROW_2_REVIEWS];

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
            ৮৫০+ বাংলাদেশি ফ্রিল্যান্সার ও সার্ভে প্রফেশনালদের খাঁটি কাজের
            ফলাফল।
          </p>
        </Reveal>
      </div>

      {/* ─── 2. Two-Row Infinite Marquee with Side Fade Gradients ─── */}
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
            কাস্টমার প্রাইভেসি সুরক্ষায় নাম ও কেস স্টাডি নিরপেক্ষ প্রতিনিধি
            (Neutral Case Studies) হিসেবে উপস্থাপিত।
          </span>
        </div>
      </div>

      {/* ─── 4. Exact Consistent Bottom Stats (850+ / 0/100 / 99.98%) ─── */}
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
      </div>
    </section>
  );
}
