"use client";

import { Reveal } from "@/components/ui/reveal";
import { ChevronDown, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// ─── Survey & Residential ISP FAQs ───────────────────────────────────────────

const FAQS = [
  {
    q: "বিকাশ বা নগদে পেমেন্ট করার পর RDP পেতে কতক্ষণ লাগবে?",
    a: "পেমেন্ট নিশ্চিত হওয়ার ৬০–৯০ সেকেন্ডের মধ্যে আমাদের অটোমেটেড সিস্টেম আপনার Windows 11 RDP লগইন তৈরি করে সরাসরি ড্যাশবোর্ড ও ইমেইলে পাঠিয়ে দেবে। কোনো ম্যানুয়াল অপেক্ষার প্রয়োজন নেই।",
  },
  {
    q: "কোন কোন দেশের ও কোন ISP-এর রেসিডেন্সিয়াল আইপি পাওয়া যাবে?",
    a: "আমাদের কাছে যুক্তরাষ্ট্র (US: AT&T, Comcast, Verizon, COX, Spectrum, Frontier, RCN), যুক্তরাজ্য (UK: BT, Virgin Media), জার্মানি (DE: Deutsche Telekom) এবং ফ্রান্সের (FR: Orange, Free) ডেডিকেটেড রেসিডেন্সিয়াল আইপি রয়েছে।",
  },
  {
    q: "আমি কি নির্দিষ্ট কোনো US ক্যারিয়ার বা স্টেট বেছে নিতে পারব?",
    a: "চেকআউটের সময় আপনি আপনার পছন্দের US ক্যারিয়ার (যেমন AT&T, Comcast বা Verizon) বেছে নিতে পারবেন। আমাদের কোর সার্ভার Ashburn ও Dallas-এ হোস্টেড এবং আইপিগুলো যুক্তরাষ্ট্রের জনপ্রিয় স্টেটগুলোর (CA, FL, GA, IL, VA, TX ইত্যাদি) মাল্টি-স্টেট জিওলোকেশন থেকে অ্যাসাইন করা হয়।",
  },
  {
    q: "আইপিটি কি শেয়ার্ড নাকি ডেডিকেটেড?",
    a: "১০০% ডেডিকেটেড ও স্ট্যাটিক। আপনার সাবস্ক্রিপশন চলাকালীন এই আইপিটি শুধুমাত্র আপনার অ্যাকাউন্টের জন্য বরাদ্দ থাকবে—অন্য কোনো ব্যবহারকারীর সাথে কখনোই শেয়ার করা হয় না।",
  },
  {
    q: "সার্ভে সাইটে আইপি ফ্ল্যাগ হলে কী করব?",
    a: "কেনার ৭ দিনের মধ্যে আইপিতে কোনো সমস্যা দেখা দিলে আমাদের বনানী সাপোর্ট টিমকে লাইভ চ্যাট বা WhatsApp-এ জানান—বিনামূল্যে ফ্রেশ IP রিপ্লেসমেন্ট করে দেওয়া হবে। প্রতিটি আইপি হ্যান্ডওভারের আগে IPQS ও WebRTC লিক টেস্ট করা হয়।",
  },
  {
    q: "পরবর্তী মাসে রিনিউ করব কীভাবে?",
    a: "মেয়াদ শেষ হওয়ার ৩ দিন আগে ইমেইলে রিমাইন্ডার পাবেন। বিকাশ, নগদ, কার্ড বা USDT-এর মাধ্যমে পেমেন্ট করলেই আপনার বর্তমান আইপি ও ডেটা অক্ষুণ্ণ রেখে সাবস্ক্রিপশন রিনিউ হয়ে যাবে।",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function SurveyFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="border-b border-slate-200 bg-slate-50/70 py-12 sm:py-16 lg:py-24"
    >
      <div className="shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-12">
        {/* Left: Header & CTAs */}
        <Reveal className="lg:sticky lg:top-28">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            কেনার আগে যা জানা জরুরি
          </p>
          <h2 className="mt-2 font-display text-2xl font-extrabold leading-[1.2] tracking-tight text-slate-900 sm:text-4xl">
            সাধারণ প্রশ্নোত্তর
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            আপনার প্রশ্নের উত্তর এখানে না পেলে আমাদের বনানী ইঞ্জিনিয়ারিং টিম
            লাইভ চ্যাট ও WhatsApp-এ গড়ে ৩ মিনিটে সাড়া দেয়।
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
            >
              <MessageCircle size={15} />
              <span>লাইভ চ্যাটে প্রশ্ন করুন</span>
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 shadow-2xs transition-colors hover:border-slate-400 hover:bg-slate-50"
            >
              অন্যান্য মাধ্যম
            </Link>
          </div>
        </Reveal>

        {/* Right: Smooth Accordion */}
        <Reveal
          className="divide-y divide-slate-200/80 border border-slate-200 bg-white p-6 shadow-xs rounded-2xl p-4 sm:rounded-3xl sm:p-6 lg:p-8"
          delay={0.08}
        >
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.q} className="py-4 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 text-left text-sm font-bold text-slate-900 transition-colors hover:text-blue-600 sm:w-auto"
                >
                  <span className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold transition-colors ${
                        isOpen
                          ? "bg-blue-600 text-white"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="leading-snug">{faq.q}</span>
                  </span>
                  <ChevronDown
                    size={17}
                    className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {/* Smooth CSS Grid Expand/Collapse */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pt-3 pl-8 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
