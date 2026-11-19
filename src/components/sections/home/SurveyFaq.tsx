"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";

// ─── Survey-focused FAQs ──────────────────────────────────────────────────────

const FAQS = [
  {
    q: "বিকাশ বা নগদে পেমেন্ট করার পর RDP পেতে কতক্ষণ লাগবে?",
    a: "পেমেন্ট নিশ্চিত হওয়ার ৬০–৯০ সেকেন্ডের মধ্যে আমাদের অটোমেটেড সিস্টেম আপনার Windows RDP বা Linux SSH লগইন তৈরি করে সরাসরি ইমেইলে পাঠিয়ে দেবে। কোনো ম্যানুয়াল অপেক্ষার প্রয়োজন নেই।",
  },
  {
    q: "কোন কোন দেশের রেসিডেন্সিয়াল আইপি পাওয়া যাবে?",
    a: "আমরা যুক্তরাষ্ট্র (US: AT&T, Comcast), যুক্তরাজ্য (UK: BT, Virgin Media), জার্মানি (DE: Deutsche Telekom) এবং ফ্রান্সের (FR: Orange) ফ্রেশ রেসিডেন্সিয়াল আইপি প্রদান করি। প্ল্যান কার্ডের কান্ট্রি ড্রপডাউন থেকেই আপনার পছন্দের লোকেশন বেছে নিতে পারেন।",
  },
  {
    q: "আইপিটি কি শেয়ার্ড নাকি ডেডিকেটেড?",
    a: "১০০% ডেডিকেটেড ও স্ট্যাটিক। আপনার সাবস্ক্রিপশন চলাকালীন এই আইপিটি শুধুমাত্র আপনার অ্যাকাউন্টের জন্য বরাদ্দ — অন্য কোনো ব্যবহারকারীর সাথে শেয়ার করা হয় না।",
  },
  {
    q: "সার্ভে সাইটে আইপি ফ্ল্যাগ হলে কী করব?",
    a: "কেনার ৭ দিনের মধ্যে আইপিতে কোনো সমস্যা দেখা দিলে আমাদের বনানী সাপোর্ট টিমকে WhatsApp করুন — বিনামূল্যে ফ্রেশ IP রিপ্লেসমেন্ট করে দেওয়া হবে। প্রতিটি আইপি হ্যান্ডওভারের আগে IPQS ও WebRTC লিক টেস্ট করা হয়।",
  },
  {
    q: "পরবর্তী মাসে রিনিউ করব কীভাবে?",
    a: "মেয়াদ শেষ হওয়ার ৩ দিন আগে ইমেইলে রিমাইন্ডার পাবেন। একই বিকাশ/নগদ নম্বরে পেমেন্ট করে WhatsApp-এ স্ক্রিনশট পাঠালেই রিনিউ হয়ে যাবে। ভবিষ্যতে ক্লায়েন্ট পোর্টাল থেকে অটো-রিনিউও চালু হবে।",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function SurveyFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-b border-slate-200 bg-slate-50/70 py-20 sm:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        {/* Left: Header & CTAs */}
        <Reveal>
          <p className="eyebrow inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-blue-600">
            <HelpCircle size={15} />
            কেনার আগে যা জানা জরুরি
          </p>
          <h2 className="section-title mt-2.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            সাধারণ প্রশ্নোত্তর
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            উত্তর না পেলে আমাদের বনানী ইঞ্জিনিয়ারিং টিম WhatsApp-এ
            গড় ৩ মিনিটে সাড়া দেয়।
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="https://wa.me/8801960677463?text=হ্যালো,%20আমি%20primevpsbd%20সার্ভার%20সম্পর্কে%20কিছু%20জানতে%20চাচ্ছি"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-colors hover:bg-emerald-700"
            >
              <MessageCircle size={16} />
              WhatsApp-এ প্রশ্ন করুন
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50"
            >
              অন্যান্য মাধ্যম
            </Link>
          </div>
        </Reveal>

        {/* Right: Accordion */}
        <Reveal
          className="divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          delay={0.12}
        >
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.q} className={index === 0 ? "pb-4" : "py-4"}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 text-left text-sm font-bold text-slate-900 transition-colors hover:text-blue-600"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[11px] font-bold text-blue-700">
                      {index + 1}
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={17}
                    className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 pl-7 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
