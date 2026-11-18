import { CheckCircle2, Headphones, MessageSquare, PhoneCall, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function DealsSupportBanner() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-20">
      {/* Background radial accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(79,70,229,0.18),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(234,88,12,0.12),transparent_40%)]" />

      <div className="shell relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-3.5 py-1 text-xs font-semibold text-blue-400">
            <Headphones size={14} />
            Human Assistance 24/7/365
          </div>

          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Need Help? Our Experts Are Available 24/7
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
            Whether you need assistance choosing the right ISP tier, configuring your proxy
            settings, or applying custom flash discount codes, our engineering team is here
            to help you round the clock.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-500 hover:shadow-xl"
            >
              <MessageSquare size={16} />
              Start Live Chat
            </Link>
            <a
              href="https://wa.me/8801700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <PhoneCall size={16} />
              WhatsApp Helpdesk
            </a>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="mt-14 grid gap-6 border-t border-slate-800/80 pt-10 sm:grid-cols-3">
          <div className="flex items-start gap-3.5">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24/7 Live Support</h4>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                Direct tickets, live chat, and WhatsApp support with real engineers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free Setup & Config</h4>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                We handle OS installation, pre-hardening, and clean network bind.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">7-Day Guarantee</h4>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                100% satisfaction assurance or swift replacement on virgin IPs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
