"use client";

import { CountryFlag } from "@/components/ui/CountryFlag";
import { Reveal } from "@/components/ui/reveal";
import { CheckCircle2, Star } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";

export interface ReviewItem {
  id: string;
  name: string;
  nameEn: string;
  initials: string;
  avatarUrl: string;
  role: string;
  location: string;
  countryTag: string;
  countryCode: string;
  quote: string;
}

// ─── 8 Focused Reviews (Ready to swap with Backend API later) ─────────────────

const REVIEWS: ReviewItem[] = [
  {
    id: "r-1",
    name: "তানভীর আহমেদ",
    nameEn: "Tanvir Ahmed",
    initials: "TA",
    avatarUrl: "/man-1.webp",
    role: "Survey Researcher",
    location: "Chittagong",
    countryTag: "US AT&T ISP",
    countryCode: "us",
    quote:
      "Swagbucks ও Prolific-এ অ্যাকাউন্ট সাসপেনশন শূন্যে নেমেছে! ৪ মাসেও কোনো ফ্ল্যাগ খাইনি — 0/100 IPQS স্কোরের ক্লিন আইপি সত্যিই গেম-চেঞ্জার।",
  },
  {
    id: "r-2",
    name: "সাবরিনা ইয়াসমিন",
    nameEn: "Sabrina Yasmin",
    initials: "SY",
    avatarUrl: "/woman-1.webp",
    role: "Remote Account Manager",
    location: "Dhaka",
    countryTag: "UK Virgin ISP",
    countryCode: "gb",
    quote:
      "রিমোট ইউকে মার্কেটপ্লেসে কাজ করার জন্য জিরো WebRTC লিক থাকাটা বাধ্যতামূলক ছিল। উইন্ডোজ ১১ ফুল অ্যাডমিন RDP স্পিড অসম্ভব স্মুথ।",
  },
  {
    id: "r-3",
    name: "ফারহান চৌধুরী",
    nameEn: "Farhan Chowdhury",
    initials: "FC",
    avatarUrl: "/man-2.webp",
    role: "Prolific Specialist",
    location: "Sylhet",
    countryTag: "UK BT ISP",
    countryCode: "gb",
    quote:
      "Prolific-এর জন্য ১০০% ক্লিন UK ব্রডব্যান্ড আইপি। কোনো WebRTC বা DNS লিক নেই, উইন্ডোজ ১১ পারফরম্যান্স অনেক দ্রুত ও স্মুথ।",
  },
  {
    id: "r-4",
    name: "মাহমুদুল হাসান",
    nameEn: "Mahmudul Hasan",
    initials: "MH",
    avatarUrl: "/man-3.webp",
    role: "Agency & PayPal Lead",
    location: "Dhaka",
    countryTag: "US Comcast ISP",
    countryCode: "us",
    quote:
      "রাত ২টায় বিকাশ পেমেন্ট করে ৯০ সেকেন্ডে ফুল অ্যাডমিন RDP পেয়েছি। কোনো অপেক্ষা ছাড়া এমন ইনস্ট্যান্ট সার্ভিস দেশে প্রথম।",
  },
  {
    id: "r-5",
    name: "সাকিবুর রহমান",
    nameEn: "Sakibur Rahman",
    initials: "SR",
    avatarUrl: "/man-4.webp",
    role: "Remote Ops Lead",
    location: "Dhaka",
    countryTag: "DE Telekom ISP",
    countryCode: "de",
    quote:
      "Deutsche Telekom আইপি দিয়ে ইউরোপের ক্লায়েন্ট কমপ্লায়েন্স ও পেপ্যাল অ্যাক্সেস একদম নিরাপদ। লাইভ পিং ১৪৪ms এবং সাপোর্ট দারুণ।",
  },
  {
    id: "r-6",
    name: "কামরুল ইসলাম",
    nameEn: "Kamrul Islam",
    initials: "KI",
    avatarUrl: "/man-5.webp",
    role: "Digital Marketer",
    location: "Rajshahi",
    countryTag: "FR Orange ISP",
    countryCode: "fr",
    quote:
      "৭ দিনের ফ্রি IP Swap পলিসি আসলেই কাজ করে। হেল্পডেস্কে জানাতেই ৩ মিনিটে ফ্রেশ ফ্রেঞ্চ আইপি রিপ্লেস করে দিয়েছে।",
  },
  {
    id: "r-7",
    name: "আশরাফুল ইসলাম",
    nameEn: "Ashraful Islam",
    initials: "AI",
    avatarUrl: "/man-6.webp",
    role: "CloudResearch Lead",
    location: "Sylhet",
    countryTag: "US Verizon ISP",
    countryCode: "us",
    quote:
      "Freecash ও CloudResearch-এ কাজ করার জন্য স্ট্যাটিক রেসিডেন্সিয়াল আইপি অসাধারণ। কোনো রি-ক্যাপচা বা ব্রাউজার ফিঙ্গারপ্রিন্ট এরর আসেনি।",
  },
  {
    id: "r-8",
    name: "নুসরাত জাহান",
    nameEn: "Nusrat Jahan",
    initials: "NJ",
    avatarUrl: "/woman-2.webp",
    role: "Full-Time Freelancer",
    location: "Khulna",
    countryTag: "US Spectrum ISP",
    countryCode: "us",
    quote:
      "বিদেশি হোস্টিংয়ে টিকিট কেটে ২৪ ঘণ্টা অপেক্ষা করতে হতো। এখানে লাইভ চ্যাটেই জরুরি সাপোর্ট ও তাৎক্ষণিক সমাধান পাওয়া যায়।",
  },
];

function ReviewAvatar({
  src,
  alt,
  initials,
}: {
  src: string;
  alt: string;
  initials: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <div
        aria-hidden="true"
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700 ring-1 ring-blue-200/70"
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={36}
      height={36}
      loading="lazy"
      onError={() => setImgFailed(true)}
      className="size-9 shrink-0 rounded-full object-cover ring-1 ring-slate-200/80 shadow-2xs"
    />
  );
}

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <div className="flex w-[320px] shrink-0 flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-300 hover:border-slate-300 hover:shadow-md sm:w-[370px] sm:p-6">
      {/* Top: 5 Stars + Verified + ISP Tag */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-0.5 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} className="fill-amber-400" />
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-0.5 rounded-full border border-emerald-200/60 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
              <CheckCircle2 size={10} className="text-emerald-600" />
              <span>Verified</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
              <CountryFlag code={review.countryCode} size={12} />
              <span>{review.countryTag}</span>
            </span>
          </div>
        </div>

        {/* Quote */}
        <p className="mt-4 text-xs font-medium leading-relaxed text-slate-700 sm:text-sm">
          &ldquo;{review.quote}&rdquo;
        </p>
      </div>

      {/* Bottom: Real Human Avatar + Name + Role */}
      <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
        <ReviewAvatar
          src={review.avatarUrl}
          alt={review.nameEn}
          initials={review.initials}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-bold text-slate-900">
            {review.name}
          </p>
          <p className="truncate text-[11px] text-slate-500">
            {review.role} · {review.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CustomerReviewsCarousel() {
  const baseId = useId();
  const reviewStream = [...REVIEWS, ...REVIEWS];

  return (
    <section
      id="reviews"
      aria-labelledby={`${baseId}-heading`}
      className="overflow-hidden border-b border-slate-200/80 bg-white py-16 sm:py-24"
    >
      {/* Header */}
      <div className="shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            কাস্টমার রিভিউ
          </p>
          <h2
            id={`${baseId}-heading`}
            className="mt-2 font-display text-2xl font-extrabold leading-[1.2] tracking-tight text-slate-900 sm:text-4xl"
          >
            ৮৫০+ ফ্রিল্যান্সার ও সার্ভে প্রফেশনালদের অভিজ্ঞতা
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
            ইউএস, ইউকে, জার্মানি ও ফ্রান্সের ক্লিন রেসিডেন্সিয়াল IP
            ব্যবহারকারীদের বাস্তব ফিডব্যাক।
          </p>
        </Reveal>
      </div>

      {/* Single-Row Smooth Infinite Marquee */}
      <div className="relative mt-10 w-full overflow-hidden">
        {/* Side Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-32 lg:w-44" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-32 lg:w-44" />

        <div className="flex w-max gap-5 animate-marquee hover:[animation-play-state:paused] sm:gap-6">
          {reviewStream.map((rev, idx) => (
            <ReviewCard key={`${rev.id}-${idx}`} review={rev} />
          ))}
        </div>
      </div>
    </section>
  );
}
