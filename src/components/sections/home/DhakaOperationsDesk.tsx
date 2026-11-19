import { Reveal } from "@/components/ui/reveal";
import {
  CheckCircle2,
  Clock,
  FileCheck2,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DESK_FEATURES = [
  {
    icon: MessageCircle,
    color: "bg-emerald-100 text-emerald-700",
    border: "border-emerald-200",
    title: "সরাসরি WhatsApp হেল্পডেস্ক",
    subtitle: "গড় রেসপন্স সময় < ৩ মিনিট",
    desc: "যেকোনো সমস্যায়—সার্ভার সেটআপ, উইন্ডোজ RDP বা আইপি ভেরিফিকেশন—সরাসরি আমাদের বনানী ইঞ্জিনিয়ারিং টিমের সাথে কথা বলুন। কোনো বট নয়, রিয়েল মানুষ রিপ্লাই দেবে।",
    cta: "WhatsApp-এ ইঞ্জিনিয়ারের সাথে কথা বলুন",
    href: "https://wa.me/8801960677463?text=হ্যালো,%20আমি%20Residential%20RDP%20/%20KVM%20VPS%20কেনার%20আগে%20কিছু%20তথ্য%20জানতে%20চাচ্ছি",
    ctaStyle: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/20",
  },
  {
    icon: MapPin,
    color: "bg-blue-100 text-blue-700",
    border: "border-blue-200",
    title: "বনানী, ঢাকা হেড অফিস",
    subtitle: "রোড ১১, বনানী, ঢাকা-১২১৩",
    desc: "আমরা সরকার-নিবন্ধিত বাংলাদেশি কোম্পানি। আমাদের ফুলস্ট্যাক ইঞ্জিনিয়াররা ঢাকায় বসে সরাসরি ইউএস ক্লাউড নোডগুলো মনিটর ও পরিচালনা করে।",
    cta: "ফোন করুন: +880 9606-PRIME",
    href: "tel:+8809606PRIME",
    ctaStyle: "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20",
  },
  {
    icon: Zap,
    color: "bg-amber-100 text-amber-700",
    border: "border-amber-200",
    title: "অটো-প্রভিশনিং সিস্টেম",
    subtitle: "পেমেন্ট কনফার্মের ৬০-৯০ সেকেন্ডে",
    desc: "bKash, Nagad, Visa বা USDT পেমেন্ট ভেরিফাই হওয়ার সাথে সাথেই আপনার ইমেইলে RDP বা SSH রুট লগইন ক্রেডেনশিয়াল স্বয়ংক্রিয়ভাবে পৌঁছে যাবে।",
    cta: "প্ল্যান সিলেক্ট করুন",
    href: "/survey-vps",
    ctaStyle: "bg-slate-900 text-white hover:bg-slate-800",
  },
];

const TRUST_STATS = [
  { icon: Users, value: "850+", label: "সন্তুষ্ট ক্লায়েন্ট" },
  { icon: ShieldCheck, value: "99.98%", label: "নেটওয়ার্ক আপটাইম SLA" },
  { icon: Clock, value: "< ৩ মিনিট", label: "গড় সাপোর্ট রিপ্লাই" },
  { icon: Zap, value: "< ৯০ সে.", label: "অটো-অ্যাক্টিভেশন" },
];

export function DhakaOperationsDesk() {
  return (
    <section className="section border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28">
      <div className="shell">
        {/* Header & Live Engineer Badge */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <Reveal className="max-w-2xl">
            <p className="eyebrow flex items-center gap-1.5 text-blue-600 font-bold uppercase tracking-wider">
              <Phone size={13} /> স্থানীয় আস্থা ও রিয়েল ইঞ্জিনিয়ারিং সাপোর্ট
            </p>
            <h2 className="section-title mt-2 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              রোবট বা টিকিট কিউ নয়—আপনার পাশে আছে
              <br className="hidden sm:block" />
              <span className="text-blue-600"> বনানী, ঢাকার রিয়েল ইঞ্জিনিয়ারিং টিম।</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              বাংলাদেশি ফ্রিল্যান্সার ও ডেভেলপারদের সবচেয়ে বড় ভয় থাকে—&ldquo;টাকা দেওয়ার পর
              সাপোর্ট গায়েব হয়ে যাবে কি না&rdquo;। primevpsbd পরিচালনা করে একটি রেজিস্টার্ড
              বাংলাদেশি কোম্পানি। আমরা আপনার ভাষায় কথা বলি এবং আপনার সময়ে সাপোর্ট দিই।
            </p>
          </Reveal>

          {/* Live Badge */}
          <Reveal className="inline-flex" delay={0.08}>
            <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50/90 px-4 py-3 shadow-xs">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
              <div>
                <p className="text-xs font-bold text-emerald-900">
                  বর্তমানে ৩ জন সাপোর্ট ইঞ্জিনিয়ার অনলাইনে আছেন
                </p>
                <p className="text-[11px] text-emerald-700">
                  হোয়াটসঅ্যাপে গড় রিপ্লাই সময়: ২ মিনিট ৪৬ সেকেন্ড
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Support Team Visual & Authenticity Grid */}
        <Reveal className="mt-12 grid items-center gap-8 lg:grid-cols-12" delay={0.1}>
          {/* Team Photo Container (5 cols) */}
          <div className="relative h-72 sm:h-84 lg:col-span-5 overflow-hidden rounded-3xl border border-slate-200 shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=75"
              alt="The primevpsbd support and network engineering team in Dhaka"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            {/* Overlay badge */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-4 sm:p-5 text-white">
              <p className="text-xs font-bold">primevpsbd Dhaka Operations Desk</p>
              <p className="text-[11px] text-slate-300">
                রোড ১১, বনানী, ঢাকা · বিডিআইএক্স ও আন্তর্জাতিক গেটওয়ে মনিটরিং
              </p>
            </div>
          </div>

          {/* Corporate / Reliability Guarantee Highlights (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FileCheck2 size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    ট্রেড লাইসেন্স ও অফিশিয়াল ভ্যাট ইনভয়েস
                  </h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    এজেন্সি বা কর্পোরেট টিমের জন্য প্রতিটি কেনাকাটায় বৈধ ব্যবসায়িক ইনভয়েস
                    প্রদান করা হয়। দেশীয় আইন মেনে আমাদের সার্ভিস পরিচালিত।
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    ৭ দিনের ১০০% মানিব্যাক / আইপি সোয়াপ নিশ্চিন্ততা
                  </h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    আইপিতে কোনো জটিলতা বা কোয়ালিটি ড্রপ ঘটলে ৭ দিনের মধ্যে এক ক্লিকে
                    সম্পূর্ণ নতুন ফ্রেশ আইপি প্রদান করা হবে। কাস্টমার সন্তুষ্টি আমাদের শীর্ষ অগ্রাধিকার।
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Zap size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    বিকাশ, নগদ ও রকেট পেমেন্টে অটোমেশন
                  </h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    আন্তর্জাতিক ক্রেডিট কার্ডের ঝামেলা নেই। যেকোনো বাংলাদেশি ওয়ালেট থেকে
                    পেমেন্ট করেই সেকেন্ডের মধ্যে আপনার ইউএস ক্লাউড চালু করুন।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Three Feature Cards */}
        <Reveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" delay={0.15}>
          {DESK_FEATURES.map((f) => (
            <div
              key={f.title}
              className={`flex flex-col rounded-3xl border ${f.border} bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${f.color}`}>
                <f.icon size={22} />
              </div>

              <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
                {f.title}
              </h3>
              <p className="mt-0.5 text-xs font-semibold text-slate-500">
                {f.subtitle}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {f.desc}
              </p>

              <Link
                href={f.href}
                target={f.href.startsWith("http") ? "_blank" : undefined}
                rel={f.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`mt-5 inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${f.ctaStyle}`}
              >
                {f.cta}
              </Link>
            </div>
          ))}
        </Reveal>

        {/* Trust Stats Row */}
        <Reveal
          className="mt-12 grid grid-cols-2 gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-4 sm:p-8"
          delay={0.2}
        >
          {TRUST_STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon size={20} />
              </div>
              <p className="mt-2 font-display text-2xl font-extrabold text-slate-900">
                {value}
              </p>
              <p className="mt-0.5 text-xs font-medium text-slate-500">{label}</p>
            </div>
          ))}
        </Reveal>

        {/* Office / Contact Bar */}
        <Reveal
          className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row"
          delay={0.25}
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-blue-600 shrink-0" />
              রোড ১১, বনানী, ঢাকা-১২১৩
            </span>
            <span className="flex items-center gap-2">
              <Phone size={15} className="text-blue-600 shrink-0" />
              +880 9606-PRIME
            </span>
            <span className="flex items-center gap-2">
              <MessageCircle size={15} className="text-emerald-600 shrink-0" />
              WhatsApp: Reply in 3 min
            </span>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
          >
            অফিস ও হেল্পডেস্ক বিস্তারিত
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
