import { Reveal } from "@/components/ui/reveal";
import {
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

const DESK_FEATURES = [
  {
    icon: MessageCircle,
    color: "bg-emerald-100 text-emerald-700",
    border: "border-emerald-200",
    title: "WhatsApp হেল্পডেস্ক",
    subtitle: "গড় রেসপন্স সময় ৩ মিনিট",
    desc: "যেকোনো সমস্যায়—সার্ভার সেটআপ, পেমেন্ট বা আইপি ইস্যু—সরাসরি মেসেজ করুন। আমাদের টিম সাধারণত ৩ মিনিটের মধ্যে উত্তর দেয়।",
    cta: "WhatsApp করুন",
    href: "https://wa.me/8801960677463?text=Hello%20primevpsbd",
    ctaStyle: "bg-emerald-600 text-white hover:bg-emerald-700",
  },
  {
    icon: MapPin,
    color: "bg-blue-100 text-blue-700",
    border: "border-blue-200",
    title: "বনানী, ঢাকা অফিস",
    subtitle: "রোড ১১, বনানী, ঢাকা-১২১৩",
    desc: "আমরা বাংলাদেশ-ভিত্তিক একটি রিয়েল টেক কোম্পানি। আমাদের ইঞ্জিনিয়াররা আপনার মতোই ঢাকায় থেকে কাজ করে—রিমোট বট নয়।",
    cta: "ফোন করুন: 9606-PRIME",
    href: "tel:+8809606PRIME",
    ctaStyle: "bg-blue-600 text-white hover:bg-blue-700",
  },
  {
    icon: Zap,
    color: "bg-amber-100 text-amber-700",
    border: "border-amber-200",
    title: "ইনস্ট্যান্ট অ্যাক্টিভেশন",
    subtitle: "পেমেন্ট কনফার্মের পর ৯০ সেকেন্ড",
    desc: "bKash বা Nagad পেমেন্ট কনফার্ম হওয়ার ৯০ সেকেন্ডের মধ্যে আপনার RDP লগইন ক্রেডেনশিয়াল অটোমেটিকভাবে ডেলিভার করা হয়।",
    cta: "প্ল্যান দেখুন",
    href: "/survey-vps",
    ctaStyle: "bg-slate-900 text-white hover:bg-slate-800",
  },
];

const TRUST_STATS = [
  { icon: Users, value: "850+", label: "Active Clients" },
  { icon: ShieldCheck, value: "99.98%", label: "Network Uptime" },
  { icon: Clock, value: "< 3 min", label: "Support Reply" },
  { icon: Zap, value: "< 90s", label: "Provisioning" },
];

export function DhakaOperationsDesk() {
  return (
    <section className="section border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white py-20 sm:py-24">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow flex items-center gap-1.5">
            <Phone size={13} /> সরাসরি আমাদের সাথে যোগাযোগ করুন
          </p>
          <h2 className="section-title mt-2 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            রোবট বা AI নয়—আপনার পাশে আছে
            <br className="hidden sm:block" />
            <span className="text-blue-600"> বনানী, ঢাকার রিয়েল টিম।</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed">
            primevpsbd পরিচালনা করে একটি বাংলাদেশি ইঞ্জিনিয়ারিং টিম। আমরা
            আপনার ভাষায় কথা বলি, আপনার সময়ে কাজ করি এবং আপনার স্থানীয়
            পেমেন্ট পদ্ধতি সাপোর্ট করি।
          </p>
        </Reveal>

        {/* Three Feature Cards */}
        <Reveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" delay={0.1}>
          {DESK_FEATURES.map((f) => (
            <div
              key={f.title}
              className={`flex flex-col rounded-2xl border ${f.border} bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${f.color}`}>
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
                className={`mt-5 inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-xs font-bold transition-colors ${f.ctaStyle}`}
              >
                {f.cta}
              </Link>
            </div>
          ))}
        </Reveal>

        {/* Trust Stats Row */}
        <Reveal
          className="mt-14 grid grid-cols-2 gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-4 sm:p-8"
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
          className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row"
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
            className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
          >
            আরো বিস্তারিত
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
