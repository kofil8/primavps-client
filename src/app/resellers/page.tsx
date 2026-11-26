"use client";

import { COMPANY_INFO } from "@/lib/config/company";
import { useCurrency } from "@/lib/currency";
import { ISP_PLANS } from "@/lib/data/plans";
import {
  ArrowRight,
  Award,
  Check,
  Cpu,
  FileText,
  KeyRound,
  Layers,
  Lock,
  Server,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const TIERS = [
  {
    id: "silver",
    name: "Silver Partner",
    badge: "শুরু করার জন্য সেরা",
    discount: 10,
    minVms: "১০–২৪টি সক্রিয় VM",
    minDepositBdt: 15000,
    features: [
      "সব ISP ও Cloud VPS-এ ফ্ল্যাট ১০% হোলসেল ছাড়",
      "প্রিপেইড ওয়ালেট থেকে ইনস্ট্যান্ট বাল্ক ডিপ্লয়",
      "সাব-ক্লায়েন্ট প্রোফাইল ও ফ্লিট ম্যানেজমেন্ট",
      "৭-দিনের ফ্রি IP Swap (AUP সাপেক্ষে)",
    ],
  },
  {
    id: "gold",
    name: "Gold Agency",
    badge: "জনপ্রিয়",
    featured: true,
    discount: 15,
    minVms: "২৫–৪৯টি সক্রিয় VM",
    minDepositBdt: 35000,
    features: [
      "সব ISP ও Cloud VPS-এ ফ্ল্যাট ১৫% হোলসেল ছাড়",
      "REST API কী ও অটোমেটেড প্রোভিশনিং অ্যাক্সেস",
      "প্রায়োরিটি WhatsApp ও বনানী ইঞ্জিনিয়ার ডেস্ক",
      "কাস্টম ইনভয়েস ও মাসিক কনসোলিডেটেড বিলিং",
    ],
  },
  {
    id: "platinum",
    name: "Platinum Cluster",
    badge: "হাই-ভলিউম",
    discount: 20,
    minVms: "৫০+ সক্রিয় VM",
    minDepositBdt: 75000,
    features: [
      "সর্বোচ্চ ২০% হোলসেল ডিসকাউন্ট + ডেডিকেটেড সাবনেট",
      "হোয়াইট-লেবেল পোর্টাল ও কাস্টম ব্র্যান্ডিং সাপোর্ট",
      "ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার (SLA < ৫ মিনিট)",
      "প্রিপেইড ব্যাংক/bKash মার্চেন্ট কাস্টম সেটেলমেন্ট",
    ],
  },
] as const;

const AVAILABLE_SERVICES = [
  {
    icon: ShieldCheck,
    title: "Dedicated Static ISP VPS",
    desc: "US (AT&T, Comcast, Verizon), UK (BT), DE ও FR রেসিডেন্সিয়াল IP সহ প্রি-হার্ডেন্ড Windows 11 RDP।",
  },
  {
    icon: Cpu,
    title: "Custom NVMe Cloud VPS",
    desc: "ক্লায়েন্টের প্রয়োজন অনুযায়ী vCPU, DDR5 RAM ও Gen4 NVMe স্টোরেজ স্কেল করার সুবিধা।",
  },
  {
    icon: Layers,
    title: "1-Click Bulk Deploy",
    desc: "প্রিপেইড ওয়ালেট থেকে একসাথে ১–২০টি সার্ভার ডিপ্লয় করে সরাসরি সাব-ক্লায়েন্টে অ্যাসাইন করুন।",
  },
  {
    icon: Wallet,
    title: "Prepaid Agency Wallet",
    desc: "বিকাশ, নগদ, রকেট বা ব্যাংক ট্রান্সফারে ব্যালেন্স টপ-আপ করে কোনো গেটওয়ে চার্জ ছাড়াই অর্ডার করুন।",
  },
  {
    icon: Users,
    title: "Sub-Client & Margin Tracking",
    desc: "প্রতিটি ক্লায়েন্টের সার্ভার, রিনিউয়াল তারিখ এবং আপনার মাসিক প্রফিট মার্জিন এক ড্যাশবোর্ডে দেখুন।",
  },
  {
    icon: KeyRound,
    title: "REST API & White-Label",
    desc: "নিজস্ব অটোমেশন বা হোয়াইট-লেবেল বিলিং প্যানেলের সাথে ইন্টিগ্রেশনের জন্য সিকিউর API কী।",
  },
];

const POLICY_ITEMS = [
  {
    title: "১. প্রিপেইড ওয়ালেট ও পেমেন্ট নীতিমালা",
    body: "রিসেলার ওয়ালেটে জমাকৃত ব্যালেন্স (bKash, Nagad, SSLCommerz বা ব্যাংক ট্রান্সফার) তাৎক্ষণিকভাবে নতুন সার্ভার ডিপ্লয় ও রিনিউয়ালে ব্যবহার করা যাবে। ওয়ালেট ব্যালেন্স নন-রিফান্ডেবল ক্রেডিট হিসেবে সংরক্ষিত থাকে এবং এর কোনো মেয়াদোত্তীর্ণ সময়সীমা নেই।",
  },
  {
    title: "২. IP Swap, SLA ও Acceptable Use Policy (AUP)",
    body: "প্রতিটি রেসিডেন্সিয়াল ISP সার্ভারে প্রথম ৭ দিন ফ্রি IP Swap (AUP সাপেক্ষে) এবং ৮ম দিন থেকে ৳৩৫০ ফি প্রযোজ্য। স্প্যামিং, DDoS, ফিশিং বা অবৈধ কার্যকলাপের কারণে IP ব্ল্যাকলিস্ট হলে ফ্রি রিপ্লেসমেন্ট প্রযোজ্য হবে না এবং সংশ্লিষ্ট VM সাসপেন্ড হতে পারে।",
  },
  {
    title: "৩. সাব-ক্লায়েন্ট ডেটা ও প্রাইভেসি সুরক্ষা",
    body: "আপনার সাব-ক্লায়েন্টদের ইমেইল, ফোন নম্বর ও সার্ভার ক্রেডেনশিয়াল সম্পূর্ণ এনক্রিপ্টেড অবস্থায় সংরক্ষিত থাকে। primavps কখনোই আপনার সাব-ক্লায়েন্টদের সাথে সরাসরি মার্কেটিং বা যোগাযোগ করে না—১০০% এজেন্সি প্রাইভেসি নিশ্চিত করা হয়।",
  },
  {
    title: "৪. অ্যাকাউন্ট অথেনটিকেশন ও সিকিউরিটি",
    body: "রিসেলার ড্যাশবোর্ড (/reseller), বাল্ক ডিপ্লয় এবং চেকআউট সম্পূর্ণ সেশন-প্রোটেক্টেড। অননুমোদিত অ্যাক্সেস রোধে প্রতিটি API কী ও RDP পাসওয়ার্ড অডিট লগের আওতায় থাকে।",
  },
];

export default function PublicResellersPage() {
  const { formatPrice } = useCurrency();
  const [selectedTierId, setSelectedTierId] =
    useState<(typeof TIERS)[number]["id"]>("gold");

  const activeTier =
    TIERS.find((t) => t.id === selectedTierId) ?? TIERS[1];

  const pricingRows = [
    ...ISP_PLANS.map((plan) => ({
      name: `${plan.name} (ISP RDP)`,
      specs: `${plan.specs.vcpu} vCPU · ${plan.specs.ram} GB RAM · ${plan.specs.nvme} GB NVMe`,
      retailBdt: plan.priceBdt,
    })),
    {
      name: "Cloud NVMe Starter",
      specs: "2 vCPU · 4 GB RAM · 80 GB NVMe · 1 Gbps",
      retailBdt: 1950,
    },
    {
      name: "Cloud NVMe Pro",
      specs: "4 vCPU · 8 GB RAM · 150 GB NVMe · 1 Gbps",
      retailBdt: 3600,
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-900">
      {/* 1. Hero Section */}
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,0.28),transparent_50%),radial-gradient(circle_at_85%_15%,rgba(37,99,235,0.2),transparent_45%)]"
        />

        <div className="shell relative z-10 py-14 sm:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/15 px-3 py-1 text-xs font-bold text-indigo-300">
              <Award size={14} aria-hidden="true" />
              Partner &amp; Agency Reseller Program · Up to 20% OFF
            </span>

            <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.18] tracking-tight text-white sm:text-5xl">
              নিজের ব্র্যান্ডে রেসিডেন্সিয়াল ISP ও Cloud VPS রিসেল করুন
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              এজেন্সি, টিম ও হোস্টিং রিসেলারদের জন্য ১০%–২০% হোলসেল ডিসকাউন্ট,
              প্রিপেইড ওয়ালেট, ১-ক্লিক বাল্ক ডিপ্লয় এবং সম্পূর্ণ সাব-ক্লায়েন্ট
              ম্যানেজমেন্ট পোর্টাল।
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/register?next=/reseller-portal"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                <span>রিসেলার অ্যাকাউন্ট খুলুন</span>
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/login?next=/reseller-portal"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-xs transition-colors hover:bg-white/15"
              >
                <Lock size={14} />
                <span>রিসেলার পোর্টাল লগইন</span>
              </Link>

              <a
                href={COMPANY_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-3 text-sm font-bold text-emerald-200 transition-colors hover:bg-emerald-500/25"
              >
                <FaWhatsapp size={15} />
                <span>কাস্টম কোটেশন</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Wholesale Tiers */}
      <section className="py-12 sm:py-16">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Volume Discount Tiers
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
              হোলসেল টিয়ার ও প্রিপেইড ওয়ালেট প্রাইসিং
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              সক্রিয় সার্ভারের সংখ্যা বাড়ার সাথে সাথে আপনার ডিসকাউন্ট টিয়ার
              স্বয়ংক্রিয়ভাবে আপগ্রেড হবে।
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {TIERS.map((tier) => (
              <article
                key={tier.id}
                className={`flex flex-col rounded-3xl bg-white p-6 transition-all ${
                  "featured" in tier && tier.featured
                    ? "ring-2 ring-indigo-600 shadow-xl shadow-indigo-600/10"
                    : "border border-slate-200 shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-extrabold text-slate-900">
                    {tier.name}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      "featured" in tier && tier.featured
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>

                <div className="mt-4 border-y border-slate-100 py-4">
                  <p className="font-display text-3xl font-black text-slate-900">
                    {tier.discount}% OFF
                    <span className="text-xs font-semibold text-slate-500">
                      {" "}
                      সব প্ল্যানে
                    </span>
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-600">
                    {tier.minVms} · ন্যূনতম ওয়ালেট টপ-আপ{" "}
                    <strong className="text-slate-900">
                      {formatPrice(tier.minDepositBdt)}
                    </strong>
                  </p>
                </div>

                <ul className="mt-4 flex-1 space-y-2.5 text-xs text-slate-700 sm:text-sm">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <Check
                        size={15}
                        className="mt-0.5 shrink-0 text-emerald-600"
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/register?next=/reseller-portal&tier=${tier.id}`}
                  className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                    "featured" in tier && tier.featured
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border border-slate-300 bg-white text-slate-900 hover:border-indigo-600 hover:bg-indigo-50/40 hover:text-indigo-700"
                  }`}
                >
                  <span>{tier.name} শুরু করুন</span>
                  <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </div>

          {/* Interactive Wholesale Rate Table */}
          <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
              <div>
                <h3 className="font-display text-base font-extrabold text-slate-900 sm:text-lg">
                  রিসেলার হোলসেল রেট চার্ট ({activeTier.name} —{" "}
                  {activeTier.discount}% OFF)
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  টিয়ার সিলেক্ট করে প্রতিটি সার্ভারে আপনার আনুমানিক মাসিক প্রফিট
                  দেখুন।
                </p>
              </div>

              <div className="inline-flex self-start rounded-xl bg-slate-100 p-1 text-xs font-bold">
                {TIERS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTierId(t.id)}
                    className={`cursor-pointer rounded-lg px-3 py-1.5 transition-colors ${
                      selectedTierId === t.id
                        ? "bg-white text-indigo-700 shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {t.discount}% ({t.id.toUpperCase()})
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-3.5">সার্ভিস ও প্ল্যান</th>
                    <th className="px-6 py-3.5">স্পেসিফিকেশন</th>
                    <th className="px-6 py-3.5">রিটেইল রেট</th>
                    <th className="px-6 py-3.5">আপনার হোলসেল রেট</th>
                    <th className="px-6 py-3.5 text-right">মাসিক মার্জিন / VM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pricingRows.map((row) => {
                    const wholesale = Math.round(
                      row.retailBdt * (1 - activeTier.discount / 100),
                    );
                    const profit = row.retailBdt - wholesale;
                    return (
                      <tr key={row.name} className="hover:bg-slate-50/60">
                        <td className="px-6 py-4 font-bold text-slate-900">
                          {row.name}
                        </td>
                        <td className="px-6 py-4 text-slate-600">{row.specs}</td>
                        <td className="px-6 py-4 font-mono text-slate-500 line-through">
                          {formatPrice(row.retailBdt)}
                        </td>
                        <td className="px-6 py-4 font-mono font-extrabold text-slate-900">
                          {formatPrice(wholesale)}
                          <span className="font-sans text-xs font-normal text-slate-500">
                            {" "}
                            /মাস
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-mono font-bold text-emerald-700">
                          +{formatPrice(profit)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Available Services for Resellers */}
      <section className="border-y border-slate-200 bg-white py-12 sm:py-16">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Available Reseller Services
            </p>
            <h2 className="mt-1.5 font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
              রিসেলার পোর্টালে যা যা পাচ্ছেন
            </h2>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {AVAILABLE_SERVICES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200/90 bg-slate-50/60 p-5"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Icon size={19} />
                </span>
                <h3 className="mt-3.5 font-display text-base font-extrabold text-slate-900">
                  {title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Reseller Terms, Privacy & Policy */}
      <section className="py-12 sm:py-16">
        <div className="shell">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-slate-100 text-slate-700">
                  <FileText size={19} />
                </span>
                <div>
                  <h2 className="font-display text-lg font-extrabold text-slate-900 sm:text-xl">
                    রিসেলার টার্মস, প্রাইভেসি ও সার্ভিস পলিসি
                  </h2>
                  <p className="text-xs text-slate-500">
                    স্বচ্ছ বিলিং, ডেটা প্রাইভেসি এবং AUP গাইডলাইন
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs font-bold text-blue-600">
                <Link href="/terms" className="hover:underline">
                  Terms &amp; Conditions
                </Link>
                <span className="text-slate-300">·</span>
                <Link href="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
                <span className="text-slate-300">·</span>
                <Link href="/refund-policy" className="hover:underline">
                  Refund &amp; IP Swap Policy
                </Link>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {POLICY_ITEMS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
                >
                  <h3 className="text-sm font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Auth-Gated CTA */}
            <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl bg-slate-950 p-6 text-white sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-lg font-extrabold">
                  রিসেলার ড্যাশবোর্ডে প্রবেশ করতে প্রস্তুত?
                </h3>
                <p className="mt-1 text-xs text-slate-300 sm:text-sm">
                  অ্যাকাউন্টে সাইন ইন বা রেজিস্ট্রেশন করলেই সরাসরি{" "}
                  <span className="font-mono text-indigo-300">/reseller</span>{" "}
                  পোর্টালে প্রবেশ করতে পারবেন।
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2.5">
                <Link
                  href="/login?next=/reseller-portal"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-900 hover:bg-slate-100 sm:text-sm"
                >
                  <Lock size={14} />
                  <span>সাইন ইন</span>
                </Link>
                <Link
                  href="/register?next=/reseller-portal"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 sm:text-sm"
                >
                  <Server size={14} />
                  <span>পার্টনার অ্যাকাউন্ট খুলুন</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}