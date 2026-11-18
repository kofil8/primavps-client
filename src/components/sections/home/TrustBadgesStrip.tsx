import { Reveal } from "@/components/ui/reveal";
import { Lock, RefreshCw, ShieldCheck, Zap } from "lucide-react";
// import {
//   BkashLogo,
//   NagadLogo,
//   VisaLogo,
//   UsdtLogo,
// } from "@/components/ui/PaymentLogos";

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
        {/* <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mr-1">
            পেমেন্ট:
          </span>
          <BkashLogo className="h-8 w-auto" />
          <NagadLogo className="h-8 w-auto" />
          <VisaLogo className="h-7 w-auto" />
          <UsdtLogo className="h-8 w-auto" />
        </div> */}
      </Reveal>
    </section>
  );
}
