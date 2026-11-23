"use client";

import { Reveal } from "@/components/ui/reveal";
import { HOME_FAQS as FAQS } from "@/lib/data/faqs";
import { ChevronDown, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
