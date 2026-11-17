'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useCurrency } from '@/lib/currency';

export function HeroSection() {
  const { formatPrice } = useCurrency();

  return (
    <section
      aria-labelledby="home-hero-title"
      className="border-b border-[#e2e8f0] bg-[#f5f7ff] text-[#18212b]"
    >
      <div className="mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#4c5f8f] sm:text-sm">
            <span className="size-2 rounded-full bg-[#365fe8]" />
            US hosting · Dhaka-based support
          </p>
          <h1
            id="home-hero-title"
            className="mx-auto mt-5 max-w-5xl font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-[#17212b] sm:text-5xl lg:text-6xl"
          >
            Your server is in the US.
            <span className="block text-[#365fe8]">
              Our team is in Dhaka.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#526172] sm:text-lg sm:leading-8">
            Choose a residential ISP server or NVMe cloud compute. If you are
            unsure which fits, tell us what you need to run and we will help you
            choose.
          </p>
        </div>

        <h2 className="mt-9 text-center font-display text-lg font-bold text-[#334155] sm:mt-11 sm:text-xl">
          What do you need?
        </h2>
        <div className="mx-auto mt-6 grid max-w-4xl gap-4 text-left sm:grid-cols-2">
          <Link
            href="/survey-vps"
            className="group flex min-h-48 flex-col rounded-2xl border border-[#dce3f3] bg-white p-5 transition-colors hover:border-[#9db3f4] hover:bg-[#fcfdff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#365fe8] focus-visible:ring-offset-2 sm:p-6"
          >
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#365fe8]">
              Residential ISP
            </span>
            <span className="mt-2 font-display text-xl font-bold text-[#17212b]">
              A consistent US connection
            </span>
            <span className="mt-1 text-sm leading-5 text-[#647184]">
              A Windows server with a static AT&amp;T or Comcast residential IP.
            </span>
            <span className="mt-auto flex items-end justify-between gap-3 pt-5">
              <span className="text-sm font-semibold text-[#334155]">
                From {formatPrice(2999)} / month
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2459bc]">
                See plans
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </span>
          </Link>

          <Link
            href="/cloud-vps"
            className="group flex min-h-48 flex-col rounded-2xl border border-[#dce3f3] bg-white p-5 transition-colors hover:border-[#9db3f4] hover:bg-[#fcfdff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#365fe8] focus-visible:ring-offset-2 sm:p-6"
          >
            <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#365fe8]">
              Cloud VPS
            </span>
            <span className="mt-2 font-display text-xl font-bold text-[#17212b]">
              Compute for your apps
            </span>
            <span className="mt-1 text-sm leading-5 text-[#647184]">
              NVMe instances for websites, services, and databases.
            </span>
            <span className="mt-auto flex items-end justify-between gap-3 pt-5">
              <span className="text-sm font-semibold text-[#334155]">
                From {formatPrice(950)} / month
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2459bc]">
                See plans
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </span>
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[#526172]">
          <span>Pay with bKash, Nagad, or card</span>
          <span className="hidden size-1 rounded-full bg-[#aab4c2] sm:inline-block" />
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-semibold text-[#2459bc] hover:text-[#173f92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#365fe8] focus-visible:ring-offset-2"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Talk to our team
          </Link>
        </div>
      </div>
    </section>
  );
}
