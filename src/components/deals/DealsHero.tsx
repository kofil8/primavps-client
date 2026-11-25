"use client";

import { useCurrency } from "@/lib/currency";
import { FLASH_PREVIEW_ITEMS, MAX_DISCOUNT_PERCENT } from "@/lib/data/deals";
import { ArrowDown, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

function getTimeRemaining() {
  const cycleMs = 5 * 24 * 60 * 60 * 1000;
  const remainingMs = cycleMs - (Date.now() % cycleMs);
  return {
    days: Math.floor(remainingMs / (1000 * 60 * 60 * 24)),
    hours: Math.floor((remainingMs / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((remainingMs / (1000 * 60)) % 60),
    seconds: Math.floor((remainingMs / 1000) % 60),
  };
}

export function DealsHero() {
  const { formatPrice } = useCurrency();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToOffers = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .getElementById("coupons-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-[#5b16d0] py-12 text-white sm:py-16 lg:py-20">
      {/* Custom Graphic Background */}
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
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-amber-200 backdrop-blur-md">
              <Sparkles size={14} className="text-amber-300" />
              Limited Time Prime Flash Sale
            </div>

            <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Huge Discount <br />
              <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-white bg-clip-text text-transparent">
                Up to {MAX_DISCOUNT_PERCENT}% off
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-base text-purple-100/90 sm:text-lg">
              Unlock supreme cloud performance and virgin residential ISP IPs
              at discounted first-month rates. Instant provisioning with zero
              setup fees.
            </p>

            {/* Countdown timer */}
            <div className="mt-7 flex items-center gap-2.5 sm:gap-3.5">
              {[
                {
                  val: timeLeft.days,
                  label: "Days",
                  fallback: "04",
                  accent: false,
                },
                {
                  val: timeLeft.hours,
                  label: "Hours",
                  fallback: "12",
                  accent: false,
                },
                {
                  val: timeLeft.minutes,
                  label: "Min",
                  fallback: "38",
                  accent: false,
                },
                {
                  val: timeLeft.seconds,
                  label: "Sec",
                  fallback: "45",
                  accent: true,
                },
              ].map((unit, idx) => (
                <div
                  key={unit.label}
                  className="flex items-center gap-2.5 sm:gap-3.5"
                >
                  <div className="flex flex-col items-center justify-center rounded-xl border border-white/20 bg-black/25 px-3 py-2.5 backdrop-blur-md sm:min-w-[70px] sm:px-4 sm:py-3">
                    <span
                      className={`font-mono text-2xl font-black sm:text-3xl ${
                        unit.accent ? "text-amber-300" : "text-white"
                      }`}
                    >
                      {mounted
                        ? String(unit.val).padStart(2, "0")
                        : unit.fallback}
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider sm:text-xs ${
                        unit.accent ? "text-amber-200" : "text-purple-200"
                      }`}
                    >
                      {unit.label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <span className="text-xl font-bold text-white/50">:</span>
                  )}
                </div>
              ))}
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
                href="/isp-vps"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                Browse All Servers
              </Link>
            </div>
          </div>

          {/* Right Column: Promotional Graphic */}
          <div className="flex items-center justify-center lg:col-span-5">
            <div className="group relative max-w-sm sm:max-w-md lg:max-w-none">
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

        {/* Bottom Ribbon: 4 Colorful Flash Deal Cards (Original Design + Synced Prices) */}
        <div className="mt-14 grid grid-cols-1 gap-4 pt-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {FLASH_PREVIEW_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={`#deal-${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(`deal-${item.id}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="group relative block transition-transform duration-200 hover:-translate-y-1"
            >
              <div
                className={`relative flex min-h-[96px] items-center justify-between rounded-sm px-4 py-3.5 shadow-lg transition-shadow duration-200 group-hover:shadow-xl sm:px-5 sm:py-4 ${item.bgHex}`}
              >
                <div className="pr-16">
                  <h4 className="font-display text-sm font-bold leading-tight tracking-tight text-slate-950 sm:text-base">
                    {item.name}
                  </h4>

                  <p className="mt-1 text-[11px] font-semibold text-slate-900/80 sm:text-xs">
                    From{" "}
                    <span className="line-through decoration-slate-900/70">
                      {formatPrice(item.originalBdt)}
                    </span>
                  </p>

                  <div className="mt-1 flex items-baseline leading-none">
                    <span className="font-display text-2xl font-black tracking-tight text-slate-950 sm:text-[26px]">
                      {formatPrice(item.saleBdt)}
                    </span>
                    <span className="ml-0.5 text-[11px] font-bold text-slate-950/80 sm:text-xs">
                      /1st mo
                    </span>
                  </div>
                </div>

                {/* Folded Ribbon Bookmark Badge */}
                <div className="absolute -top-3.5 right-3 z-20 flex w-15 flex-col items-center justify-center bg-[#ff0a6c] py-2 text-white shadow-md sm:right-4 sm:w-18">
                  <div className="absolute top-0 -right-2 h-0 w-0 border-b-[12px] border-r-[8px] border-b-[#9e003a] border-r-transparent" />
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
