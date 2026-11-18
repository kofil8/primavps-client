"use client";

import { Reveal } from "@/components/ui/reveal";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const FAQS = [
  {
    q: "How fast is setup?",
    a: "Payment confirmation to server credentials takes under 90 seconds, automatically.",
  },
  {
    q: "Can I pay in taka?",
    a: "Yes. bKash, Nagad, cards and USDT are supported, with VAT invoices on request.",
  },
  {
    q: "Are the residential IPs really clean?",
    a: "Every IP is screened before handover. If the score rises, one free swap is included within 7 days.",
  },
  {
    q: "Do I get root or administrator access?",
    a: "Yes. Every server is a dedicated KVM slice with full administrator access.",
  },
];

export function ProofAndFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section bg-slate-50">
      <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2 className="section-title mt-3">Good to know</h2>
          <p className="lede max-w-sm">
            Still unsure? Our team answers on WhatsApp, usually within a few
            minutes.
          </p>
          <Link href="/contact" className="btn-outline mt-6">
            Ask a question
          </Link>
        </Reveal>

        <Reveal
          className="divide-y divide-slate-200 border-y border-slate-200"
          delay={0.12}
        >
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-slate-900"
                >
                  {faq.q}
                  <ChevronDown
                    size={17}
                    className={`shrink-0 text-slate-400 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="pb-4 text-sm leading-6 text-slate-600">
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
