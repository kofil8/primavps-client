import Link from "next/link";
import { MapPin, Phone, ShieldCheck } from "lucide-react";

const COLUMNS = [
  {
    title: "Servers",
    links: [
      { href: "/hot-deals", label: "🔥 Hot Deals" },
      { href: "/cloud-vps", label: "Cloud VPS" },
      { href: "/survey-vps", label: "Residential ISP" },
      { href: "/resellers", label: "Reseller program" },
      { href: "/status", label: "Network status" },
    ],
  },
  {
    title: "Tools",
    links: [
      { href: "/tools/ip-checker", label: "IP fraud checker" },
      { href: "/tools/webrtc-test", label: "WebRTC leak test" },
      { href: "/tools/looking-glass", label: "Looking glass" },
      { href: "/blog", label: "Guides" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/contact", label: "Contact & support" },
      { href: "/login", label: "Client area" },
      { href: "/legal/terms", label: "Terms of service" },
      { href: "/legal/privacy", label: "Privacy policy" },
    ],
  },
];

import {
  BkashLogo,
  NagadLogo,
  VisaLogo,
  UsdtLogo,
} from "@/components/ui/PaymentLogos";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-400">
      <div className="shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link
              href="/"
              className="font-display text-lg font-extrabold text-white"
            >
              primevpsbd
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6">
              US-based cloud and residential ISP servers, run by a Bangladeshi
              team. Pay in taka, get support in your time zone.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <MapPin size={15} className="text-slate-500" />
                Banani, Dhaka 1213
              </p>
              <p className="flex items-center gap-2">
                <Phone size={15} className="text-slate-500" />
                +880 9606-PRIME
              </p>
            </div>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold text-white">
                {column.title}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-semibold text-slate-400">
              We accept:
            </span>
            <span className="inline-flex items-center rounded-lg bg-gray-700 px-2 py-1">
              <BkashLogo className="h-8 w-auto" />
            </span>
            <span className="inline-flex items-center rounded-lg bg-gray-700 px-2 py-1">
              <NagadLogo className="h-8 w-auto" />
            </span>
            <span className="inline-flex items-center rounded-lg bg-gray-700 px-2 py-1">
              <VisaLogo className="h-7 w-auto" />
            </span>
            <span className="inline-flex items-center rounded-lg bg-gray-700 px-2 py-1">
              <UsdtLogo className="h-8 w-auto" />
            </span>
          </div>
          <p className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck size={14} className="text-emerald-500" />
            99.98% network SLA · VAT invoices on request
          </p>
        </div>

        <p className="mt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} primevpsbd.com · Banani, Dhaka · Dallas,
          TX
        </p>
      </div>
    </footer>
  );
}
