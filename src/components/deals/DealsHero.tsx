"use client";

import { useCurrency } from "@/lib/currency";
import { FLASH_PREVIEW_ITEMS } from "@/lib/data/deals";
import { ArrowDown, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function DealsHero() {
  const { currency, formatPrice } = useCurrency();
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 12,
    minutes: 38,
    seconds: 45,
  });

  useEffect(() => {
    setMounted(true);

    // Calculate a recurring countdown target (e.g. cycles every 5 days from epoch or stored baseline)
    const cycleMs = 5 * 24 * 60 * 60 * 1000;
    const updateCountdown = () => {
      const now = Date.now();
      const remainingMs = cycleMs - (now % cycleMs);

      const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (remainingMs % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToOffers = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const elem = document.getElementById("coupons-section");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden py-12 text-white sm:py-16 lg:py-20 bg-[#5b16d0]">
      {/* Custom Graphic Background: /public/Hot deals bg.webp */}
      <Image
        src="/hot-deals-bg.webp"
        alt="Hot Deals Background"
        fill
        priority
        className="pointer-events-none object-cover object-center"
      />

      <div className="shell relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Headlines & Countdown */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-amber-200 uppercase backdrop-blur-md">
              <Sparkles size={14} className="text-amber-300" />
              Limited Time Prime Flash Sale
            </div>

            <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Huge Discount <br />
              <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-white bg-clip-text text-transparent">
                Up to 50% off
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-base text-purple-100/90 sm:text-lg">
              Unlock supreme cloud performance and virgin residential survey IPs
              at record low introductory rates. Instant provisioning with zero setup fees.
            </p>

            {/* Countdown timer */}
            <div className="mt-7 flex items-center gap-2.5 sm:gap-3.5">
              <div className="flex flex-col items-center justify-center rounded-xl border border-white/20 bg-black/25 px-3 py-2.5 backdrop-blur-md sm:min-w-[70px] sm:px-4 sm:py-3">
                <span className="font-mono text-2xl font-black sm:text-3xl">
                  {mounted ? String(timeLeft.days).padStart(2, "0") : "04"}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-200 sm:text-xs">
                  Days
                </span>
              </div>
              <span className="text-xl font-bold text-white/50">:</span>

              <div className="flex flex-col items-center justify-center rounded-xl border border-white/20 bg-black/25 px-3 py-2.5 backdrop-blur-md sm:min-w-[70px] sm:px-4 sm:py-3">
                <span className="font-mono text-2xl font-black sm:text-3xl">
                  {mounted ? String(timeLeft.hours).padStart(2, "0") : "12"}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-200 sm:text-xs">
                  Hours
                </span>
              </div>
              <span className="text-xl font-bold text-white/50">:</span>

              <div className="flex flex-col items-center justify-center rounded-xl border border-white/20 bg-black/25 px-3 py-2.5 backdrop-blur-md sm:min-w-[70px] sm:px-4 sm:py-3">
                <span className="font-mono text-2xl font-black sm:text-3xl">
                  {mounted ? String(timeLeft.minutes).padStart(2, "0") : "38"}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-200 sm:text-xs">
                  Min
                </span>
              </div>
              <span className="text-xl font-bold text-white/50">:</span>

              <div className="flex flex-col items-center justify-center rounded-xl border border-white/20 bg-black/25 px-3 py-2.5 backdrop-blur-md sm:min-w-[70px] sm:px-4 sm:py-3">
                <span className="font-mono text-2xl font-black text-amber-300 sm:text-3xl">
                  {mounted ? String(timeLeft.seconds).padStart(2, "0") : "45"}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-200 sm:text-xs">
                  Sec
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#coupons-section"
                onClick={scrollToOffers}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-500/25 transition-transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/35"
              >
                Claim Coupons
                <ArrowDown size={16} />
              </a>
              <Link
                href="/cloud-vps"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                Browse All Servers
              </Link>
            </div>
          </div>

          {/* Right Column: Promotional Graphic */}
          <div className="flex items-center justify-center lg:col-span-5">
            <div className="relative group max-w-sm sm:max-w-md lg:max-w-none">
              <div className="absolute -inset-4 rounded-3xl bg-amber-400/20 blur-2xl transition duration-500 group-hover:bg-amber-400/30" />
              <Image
                src="/promotion.webp"
                alt="PrimaVPS Flash Sale Badge"
                width={500}
                height={333}
                priority
                className="relative z-10 w-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Bottom Ribbon: Quick Flash Deal Cards (Refactored 1:1 to Reference Design) */}
        <div className="mt-14 grid grid-cols-1 gap-4 pt-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
          {FLASH_PREVIEW_ITEMS.map((item) => (
            <Link
              key={item.id}
              href="#coupons-section"
              onClick={scrollToOffers}
              className="group relative block transition-transform duration-200 hover:-translate-y-1"
            >
              {/* Card Container */}
              <div
                className={`relative flex min-h-[96px] items-center justify-between rounded-sm px-4 py-3.5 sm:px-5 sm:py-4 shadow-lg transition-shadow duration-200 group-hover:shadow-xl ${item.bgHex}`}
              >
                {/* Left: Info & Pricing */}
                <div className="pr-16">
                  <h4 className="font-display text-sm font-bold tracking-tight text-slate-950 sm:text-base leading-tight">
                    {item.name}
                  </h4>

                  <p className="mt-1 text-[11px] sm:text-xs font-semibold text-slate-900/80">
                    From{" "}
                    <span className="line-through decoration-slate-900/70">
                      {currency === "BDT"
                        ? formatPrice(item.originalBdt)
                        : item.originalUsd}
                    </span>
                  </p>

                  <div className="mt-1 flex items-baseline leading-none">
                    <span className="font-display text-2xl font-black tracking-tight text-slate-950 sm:text-[26px]">
                      {currency === "BDT"
                        ? formatPrice(item.saleBdt)
                        : item.saleUsd}
                    </span>
                    <span className="ml-0.5 text-[11px] sm:text-xs font-bold text-slate-950/80">
                      /Month
                    </span>
                  </div>
                </div>

                {/* Right: Folded Ribbon Bookmark Badge */}
                <div className="absolute -top-3.5 right-3 sm:right-4 z-20 flex w-15 sm:w-18 flex-col items-center justify-center bg-[#ff0a6c] py-2 text-white shadow-md">
                  {/* 3D Fold flap top-right corner */}
                  <div className="absolute top-0 -right-2 h-0 w-0 border-b-[12px] border-b-[#9e003a] border-r-[8px] border-r-transparent" />

                  <span className="font-display text-xl font-black leading-none tracking-tight sm:text-2xl">
                    {item.discountPercent}%
                  </span>
                  <span className="mt-1 text-[10px] font-black uppercase tracking-wider text-white sm:text-[11px]">
                    OFF
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
