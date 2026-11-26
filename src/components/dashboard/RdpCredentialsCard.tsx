"use client";

import { downloadRdpFile } from "@/lib/utils/rdp-file";
import {
  Check,
  Copy,
  Download,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

interface RdpCredentialsCardProps {
  serverName: string;
  ipAddress: string;
  rdpPort?: number;
  username: string;
  password: string;
  ispLabel: string;
}

export function RdpCredentialsCard({
  serverName,
  ipAddress,
  rdpPort = 3389,
  username,
  password,
  ispLabel,
}: RdpCredentialsCardProps) {
  const [revealed, setRevealed] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 1600);
  };

  const rows = [
    { key: "ip", label: "IP Address", value: ipAddress },
    { key: "port", label: "RDP Port", value: String(rdpPort) },
    { key: "user", label: "Username", value: username },
  ];

  return (
    <section className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-blue-600">
            <Lock size={17} />
          </span>
          <div>
            <h2 className="font-display text-base font-extrabold text-slate-900">
              RDP কানেকশন ক্রেডেনশিয়াল
            </h2>
            <p className="text-xs text-emerald-700">{ispLabel}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            downloadRdpFile({
              ipAddress,
              rdpPort,
              username,
              serverLabel: serverName,
            })
          }
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-800"
        >
          <Download size={14} />
          <span>.RDP ফাইল ডাউনলোড</span>
        </button>
      </div>

      <dl className="mt-3 divide-y divide-slate-100 text-xs sm:text-sm">
        {rows.map((row) => (
          <div key={row.key} className="flex items-center justify-between py-3">
            <dt className="font-medium text-slate-500">{row.label}</dt>
            <dd className="flex items-center gap-2 font-mono font-bold text-slate-900">
              <span>{row.value}</span>
              <button
                type="button"
                onClick={() => copyText(row.key, row.value)}
                aria-label={`Copy ${row.label}`}
                className="cursor-pointer rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              >
                {copiedKey === row.key ? (
                  <Check size={13} className="text-emerald-600" />
                ) : (
                  <Copy size={13} />
                )}
              </button>
            </dd>
          </div>
        ))}

        {/* Password Row */}
        <div className="flex items-center justify-between py-3">
          <dt className="font-medium text-slate-500">Password</dt>
          <dd className="flex items-center gap-2 font-mono font-bold text-slate-900">
            <span>{revealed ? password : "••••••••••••••••"}</span>
            <button
              type="button"
              onClick={() => setRevealed((v) => !v)}
              aria-label={revealed ? "Hide password" : "Reveal password"}
              className="cursor-pointer rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            >
              {revealed ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
            <button
              type="button"
              onClick={() => copyText("password", password)}
              aria-label="Copy password"
              className="cursor-pointer rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            >
              {copiedKey === "password" ? (
                <Check size={13} className="text-emerald-600" />
              ) : (
                <Copy size={13} />
              )}
            </button>
          </dd>
        </div>
      </dl>

      <p className="mt-3 flex items-center gap-1.5 rounded-xl bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
        <ShieldCheck size={14} className="shrink-0 text-emerald-600" />
        <span>
          নিরাপত্তার স্বার্থে আপনার প্রথম লগইনের পর Windows Administrator পাসওয়ার্ড
          পরিবর্তন করে নিন।
        </span>
      </p>
    </section>
  );
}