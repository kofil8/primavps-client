"use client";

import {
  createResellerApiKey,
  DEFAULT_RESELLER_STATE,
  getResellerState,
  revokeResellerApiKey,
  updateWhiteLabelSettings,
} from "@/lib/services/reseller-store";
import {
  Check,
  Copy,
  Globe,
  KeyRound,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ResellerApiPage() {
  const [state, setState] = useState(DEFAULT_RESELLER_STATE);

  const [keyLabel, setKeyLabel] = useState("");
  const [newSecret, setNewSecret] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [agencyName, setAgencyName] = useState(DEFAULT_RESELLER_STATE.agencyName);
  const [supportEmail, setSupportEmail] = useState(
    DEFAULT_RESELLER_STATE.supportEmail,
  );
  const [customDomain, setCustomDomain] = useState(
    DEFAULT_RESELLER_STATE.customDomain,
  );

  useEffect(() => {
    const sync = () => {
      const next = getResellerState();
      setState(next);
      setAgencyName(next.agencyName);
      setSupportEmail(next.supportEmail);
      setCustomDomain(next.customDomain);
    };
    sync();
    window.addEventListener("reseller-store-updated", sync);
    return () => window.removeEventListener("reseller-store-updated", sync);
  }, []);

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyLabel.trim()) return;
    const { fullSecret } = createResellerApiKey(keyLabel.trim());
    setNewSecret(fullSecret);
    setKeyLabel("");
    toast.success("নতুন API কী তৈরি হয়েছে — সিক্রেটটি নিরাপদে সংরক্ষণ করুন।");
  };

  const handleCopySecret = async () => {
    if (!newSecret) return;
    try {
      await navigator.clipboard.writeText(newSecret);
      setCopied(true);
      toast.success("API সিক্রেট ক্লিপবোর্ডে কপি হয়েছে।");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("ক্লিপবোর্ডে কপি করা যায়নি — সিক্রেট ম্যানুয়ালি কপি করুন।");
    }
  };

  const handleRevokeKey = (id: string) => {
    revokeResellerApiKey(id);
    toast.success("API কী বাতিল করা হয়েছে।");
  };

  const handleSaveWhiteLabel = (e: React.FormEvent) => {
    e.preventDefault();
    updateWhiteLabelSettings({
      agencyName: agencyName.trim() || state.agencyName,
      supportEmail: supportEmail.trim(),
      customDomain: customDomain.trim(),
    });
    toast.success("হোয়াইট-লেবেল সেটিংস সেভ হয়েছে।");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
          REST API ও হোয়াইট-লেবেল সেটিংস
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          অটোমেটেড প্রোভিশনিংয়ের জন্য API কী তৈরি করুন এবং আপনার এজেন্সির ব্র্যান্ডিং কনফিগার করুন।
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* API Keys Card */}
        <section className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:p-6">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
              <KeyRound size={17} />
            </span>
            <div>
              <h2 className="font-display text-base font-extrabold text-slate-900">
                API কী ম্যানেজমেন্ট
              </h2>
              <p className="text-xs text-slate-500">
                Bearer Token হিসেবে <code className="font-mono">/api/v1/reseller/*</code>-এ ব্যবহার করুন
              </p>
            </div>
          </div>

          <form onSubmit={handleGenerateKey} className="mt-4 flex gap-2">
            <input
              value={keyLabel}
              onChange={(e) => setKeyLabel(e.target.value)}
              placeholder="কী লেবেল (যেমন: WHMCS Module)"
              className="field !h-10 !rounded-xl text-xs sm:text-sm"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white hover:bg-indigo-700"
            >
              <Plus size={14} />
              <span>নতুন কী</span>
            </button>
          </form>

          {newSecret && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs">
              <p className="font-bold text-emerald-900">
                নতুন API Secret তৈরি হয়েছে (এখনই কপি করে রাখুন):
              </p>
              <div className="mt-2 flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2 font-mono text-[11px] font-bold text-slate-900 ring-1 ring-emerald-200">
                <span className="truncate">{newSecret}</span>
                <button
                  type="button"
                  onClick={handleCopySecret}
                  className="inline-flex shrink-0 cursor-pointer items-center gap-1 text-emerald-700"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>
          )}

          <ul className="mt-5 divide-y divide-slate-100">
            {state.apiKeys.map((k) => (
              <li
                key={k.id}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900 sm:text-sm">
                    {k.label}
                  </p>
                  <p className="font-mono text-[11px] text-slate-500">
                    {k.prefix} · Last used: {k.lastUsed}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRevokeKey(k.id)}
                  aria-label="Revoke API key"
                  className="cursor-pointer rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* White-Label Branding Card */}
        <section className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:p-6">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-blue-600">
              <Globe size={17} />
            </span>
            <div>
              <h2 className="font-display text-base font-extrabold text-slate-900">
                হোয়াইট-লেবেল ব্র্যান্ডিং
              </h2>
              <p className="text-xs text-slate-500">
                আপনার ক্লায়েন্ট ইনভয়েস ও পোর্টালে প্রদর্শিত তথ্য
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveWhiteLabel} className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-slate-800">
                এজেন্সি / ব্র্যান্ডের নাম
              </label>
              <input
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                className="field !h-10 !rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-slate-800">
                ক্লায়েন্ট সাপোর্ট ইমেইল
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="field !h-10 !rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-slate-800">
                কাস্টম পোর্টাল ডোমেইন (CNAME)
              </label>
              <input
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="portal.youragency.com"
                className="field !h-10 !rounded-xl font-mono text-sm"
              />
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
              >
                <Save size={14} />
                <span>পরিবর্তন সেভ করুন</span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}