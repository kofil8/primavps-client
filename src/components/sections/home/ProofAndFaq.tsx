"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";

const FAQS = [
  {
    q: "বিকাশ বা নগদে পেমেন্ট করার পর সার্ভার পেতে কতক্ষণ লাগবে?",
    a: "পেমেন্ট সফল হওয়ার ৬০ থেকে ৯০ সেকেন্ডের মধ্যে আমাদের অটোমেটেড সিস্টেম আপনার উইন্ডোজ RDP বা লিনাক্স রুট ক্রেডেনশিয়াল তৈরি করে সরাসরি আপনার ইমেইলে পাঠিয়ে দেবে। কোনো ম্যানুয়াল অপেক্ষার প্রয়োজন নেই।",
  },
  {
    q: "আপনাদের আইপি কি অন্য কারও সাথে শেয়ার করা হয়?",
    a: "কখনোই না। আমাদের প্রতিটি রেসিডেন্সিয়াল আইপি ১০০% ডেডিকেটেড এবং স্ট্যাটিক। অর্থাৎ আপনার সাবস্ক্রিপশন চলাকালীন এই আইপিটি শুধুই আপনার অ্যাকাউন্টের জন্য বরাদ্দ থাকে, অন্য কোনো ব্যবহারকারীর সাথে শেয়ার করা হয় না।",
  },
  {
    q: "সার্ভে অ্যাকাউন্টে কোনো সমস্যা হলে বা আইপি ফ্ল্যাগ হলে পলিসি কী?",
    a: "আমরা প্রতিটি আইপি হ্যান্ডওভার করার আগে IPQS ফ্রড স্কোর এবং WebRTC লিক টেস্ট করি। তবুও কোনো কারণে কেনার ৭ দিনের মধ্যে আইপিতে কোনো অসঙ্গতি দেখা দিলে আমাদের বনানী সাপোর্ট টিমে এক ক্লিকেই ফ্রি ফ্রেশ আইপি সোয়াপ করে নেওয়া যায়।",
  },
  {
    q: "পরবর্তী মাসে রিনিউ করার নিয়ম কী এবং রিনিউয়ালের সময় কি দাম বাড়বে?",
    a: "না, আপনি যে রেটে সার্ভার অর্ডার করবেন, যতদিন রিনিউ চালু রাখবেন সেই একই প্রাইস লক থাকবে। বিকাশ, নগদ বা যেকোনো কার্ডে ড্যাশবোর্ড থেকেই ১-ক্লিকে রিনিউ করা যায়।",
  },
  {
    q: "সার্ভারে কি ফুল অ্যাডমিনিস্ট্রেটর বা রুট অ্যাক্সেস পাওয়া যাবে?",
    a: "অবশ্যই। আমাদের প্রতিটি সার্ভার ট্রু KVM ভার্চুয়ালাইজেশনে চালিত। উইন্ডোজ RDP-তে ফুল Administrator প্রিভিলেজ থাকবে (যেকোনো সফটওয়্যার ইনস্টল করতে পারবেন) এবং লিনাক্স ক্লাউড ভিপিএস-এ ফুল Root অ্যাক্সেস ও ব্রাউজার VNC ইমার্জেন্সি কনসোল পাবেন।",
  },
  {
    q: "এজেন্সি বা ব্যবসার জন্য ভ্যাট চালান বা অফিস ভিজিটের সুযোগ আছে কি?",
    a: "হ্যাঁ, primavps একটি নিবন্ধিত বাংলাদেশি প্রযুক্তি প্রতিষ্ঠান। আমাদের হেড অফিস ঢাকার বনানী ১১ নম্বর রোডে। আমরা যেকোনো এজেন্সি ও ফ্রিল্যান্সার টিমকে অফিশিয়াল ভ্যাট ইনভয়েস প্রদান করি।",
  },
];

export function ProofAndFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section bg-slate-50/70 border-b border-slate-200 py-20 sm:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] items-start">
        <Reveal>
          <p className="eyebrow inline-flex items-center gap-1.5 text-blue-600 font-bold uppercase tracking-wider">
            <HelpCircle size={15} /> সাধারণ প্রশ্নোত্তর · FAQ
          </p>
          <h2 className="section-title mt-2.5 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            কেনার আগে যা জানা জরুরি
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            কোনো প্রশ্ন বা কনফিউশন আছে? আমাদের বনানী ইঞ্জিনিয়ারিং টিম
            হোয়াটসঅ্যাপে সক্রিয় থাকে—গড়ে ৩ মিনিটের মধ্যে সরাসরি উত্তর পেয়ে যাবেন।
          </p>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              href="https://wa.me/8801960677463?text=হ্যালো,%20আমি%20primavps%20সার্ভার%20সম্পর্কে%20কিছু%20জানতে%20চাচ্ছি"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp-এ প্রশ্ন করুন
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              অন্যান্য মাধ্যম
            </Link>
          </div>
        </Reveal>

        <Reveal
          className="divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"
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
                  className="flex w-full items-center justify-between gap-4 text-left text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span className="flex items-center gap-2">
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
                  <p className="mt-3 pl-7 text-xs sm:text-sm leading-relaxed text-slate-600">
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
