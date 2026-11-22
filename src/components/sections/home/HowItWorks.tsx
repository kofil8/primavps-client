import { Reveal } from "@/components/ui/reveal";
import { ChevronRight, Globe, Smartphone, Zap } from "lucide-react";

const WORKFLOW_STEPS = [
  {
    step: "০১",
    title: "লোকেশন ও প্ল্যান বাছাই করুন",
    subtitle: "US, UK, DE বা FR — ডেডিকেটেড ISP",
    icon: Globe,
    accent: "bg-blue-50 text-blue-600 ring-blue-100",
  },
  {
    step: "০২",
    title: "বিকাশ বা নগদে পেমেন্ট করুন",
    subtitle: "ইনস্ট্যান্ট লোকাল পেমেন্ট · কোনো ঝামেলা নেই",
    icon: Smartphone,
    accent: "bg-pink-50 text-pink-600 ring-pink-100",
  },
  {
    step: "০৩",
    title: "৯০ সেকেন্ডে RDP লগইন পান",
    subtitle: "ড্যাশবোর্ড ও ইমেইলে অটো-ডেলিভারি",
    icon: Zap,
    accent: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  },
];

export function HowItWorks() {
  return (
    <section
      aria-label="How it works"
      className="border-y border-slate-200/80 bg-slate-50/70"
    >
      <Reveal className="shell py-4 sm:py-5">
        <ol className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-3.5 lg:gap-4">
          {WORKFLOW_STEPS.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === WORKFLOW_STEPS.length - 1;

            return (
              <li
                key={item.step}
                className="relative flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-3.5 py-3 shadow-2xs transition-colors hover:border-blue-200/80 lg:gap-3.5 lg:px-4"
              >
                <div
                  className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 lg:h-10 lg:w-10 ${item.accent}`}
                >
                  <Icon size={17} strokeWidth={2.2} />
                  <span className="absolute -top-1.5 -left-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-slate-900 px-1 font-mono text-[9.5px] font-bold text-white shadow-xs lg:h-5 lg:min-w-5 lg:text-[10px]">
                    {item.step}
                  </span>
                </div>

                {/* No truncation — reads cleanly on Mobile S & Tablet */}
                <div className="min-w-0 flex-1">
                  <p className="text-xs leading-snug font-bold text-slate-900 lg:text-[13px]">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug font-medium text-slate-500">
                    {item.subtitle}
                  </p>
                </div>

                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 -right-3 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-2xs md:flex lg:-right-3.5"
                  >
                    <ChevronRight size={13} strokeWidth={2.5} />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </Reveal>
    </section>
  );
}
