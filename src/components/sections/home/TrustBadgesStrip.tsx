import { Reveal } from "@/components/ui/reveal";
import { Lock, RefreshCw, ShieldCheck, Zap } from "lucide-react";
import {
  BkashLogo,
  NagadLogo,
  VisaLogo,
  MastercardLogo,
  UsdtLogo,
} from "@/components/ui/PaymentLogos";

export function TrustBadgesStrip() {
  return (
    <section className="border-b border-slate-200 bg-white shadow-sm">
      <Reveal className="shell flex flex-col gap-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
        {/* Trust guarantees */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <ShieldCheck size={15} className="text-emerald-600 shrink-0" />
            0/100 IPQS Clean IP
          </span>
          <span className="hidden sm:block h-4 w-px bg-slate-200" />
          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <RefreshCw size={14} className="text-blue-600 shrink-0" />
            7-Day IP Swap SLA
          </span>
          <span className="hidden sm:block h-4 w-px bg-slate-200" />
          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <Zap size={14} className="text-amber-600 shrink-0" />
            &lt;90s অটো-অ্যাক্টিভেশন
          </span>
          <span className="hidden sm:block h-4 w-px bg-slate-200" />
          <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <Lock size={14} className="text-slate-500 shrink-0" />
            Secure Payment Gateway
          </span>
        </div>

        {/* Payment Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mr-1">
            পেমেন্ট:
          </span>
          <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 shadow-xs hover:border-pink-300 transition-colors">
            <BkashLogo className="h-3.5 w-3.5" />
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 shadow-xs hover:border-orange-300 transition-colors">
            <NagadLogo className="h-3.5 w-3.5" />
          </div>
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 shadow-xs">
            <VisaLogo className="h-3 w-auto" />
            <span className="h-3 w-px bg-slate-200" />
            <MastercardLogo className="h-3.5 w-auto" />
          </div>
          <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 shadow-xs">
            <UsdtLogo className="h-3.5 w-3.5" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
