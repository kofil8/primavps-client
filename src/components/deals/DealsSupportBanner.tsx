"use client";

import {
  CheckCircle2,
  Headphones,
  MessageSquare,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";

export function DealsSupportBanner() {
  const whatsappNumber = (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801960677463"
  ).replace(/[^0-9]/g, "");

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "হ্যালো primavps, আমি Hot Deals অফার ও কুপন কোড নিয়ে একটু সাহায্য চাচ্ছি।",
  )}`;

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent("open-chat"));
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 py-14 text-white sm:py-18">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(37,99,235,0.18),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.12),transparent_45%)]"
      />

      <div className="shell relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3.5 py-1 text-xs font-semibold text-sky-400">
            <Headphones size={14} aria-hidden="true" />
            ২৪/৭ বনানী ইঞ্জিনিয়ারিং সাপোর্ট
          </div>

          <h2 className="mt-4 font-display text-2xl font-extrabold leading-[1.22] tracking-tight sm:text-4xl">
            কোন প্ল্যানটি আপনার কাজের জন্য সেরা বুঝতে পারছেন না?
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
            সার্ভে, পেপ্যাল বা রিমোট কাজের জন্য সঠিক ISP ও কুপন কোড বেছে নিতে
            আমাদের টিমের সাথে সরাসরি কথা বলুন—গড়ে ৩ মিনিটেই উত্তর পাবেন।
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleOpenChat}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 active:scale-[0.98]"
            >
              <MessageSquare size={16} aria-hidden="true" />
              <span>লাইভ চ্যাট শুরু করুন</span>
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800 hover:text-white"
            >
              <PhoneCall
                size={15}
                className="text-emerald-400"
                aria-hidden="true"
              />
              <span>WhatsApp হেল্পডেস্ক</span>
            </a>
          </div>
        </div>

        {/* 3 Trust Pillars */}
        <div className="mt-12 grid gap-6 border-t border-slate-800/80 pt-9 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                গড়ে ৩ মিনিটে রেসপন্স
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                লাইভ চ্যাট ও WhatsApp-এ সরাসরি বাংলাদেশি সাপোর্ট টিম।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-400">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                ফ্রি সেটআপ গাইডেন্স
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                OS রেডি করা, টাইমজোন ও ক্লিন ব্রাউজার সেটআপে পূর্ণ সহায়তা।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">৭-দিনের IP Swap</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">
                আইপিতে সমস্যা হলে প্রথম ৭ দিনের মধ্যে ফ্রি রিপ্লেসমেন্ট।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
