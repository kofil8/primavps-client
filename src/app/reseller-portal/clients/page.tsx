"use client";

import { StatusPill } from "@/components/dashboard/StatusPill";
import { useCurrency } from "@/lib/currency";
import {
  addResellerClient,
  DEFAULT_RESELLER_STATE,
  getResellerState,
} from "@/lib/services/reseller-store";
import { Building2, Mail, Phone, Plus, UserPlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ResellerClientsPage() {
  const { formatPrice } = useCurrency();
  const [state, setState] = useState(DEFAULT_RESELLER_STATE);
  const [modalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    const sync = () => setState(getResellerState());
    sync();
    window.addEventListener("reseller-store-updated", sync);
    return () => window.removeEventListener("reseller-store-updated", sync);
  }, []);

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    addResellerClient({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || "+8801XXXXXXXXX",
      company: company.trim() || undefined,
    });
    toast.success(`${name.trim()} সাব-ক্লায়েন্ট হিসেবে যোগ হয়েছে।`);
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
            সাব-ক্লায়েন্ট ({state.clients.length})
          </h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            আপনার এজেন্সির ক্লায়েন্টদের প্রোফাইল ও অ্যাসাইন করা সার্ভার পরিচালনা করুন।
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
        >
          <Plus size={15} />
          <span>নতুন ক্লায়েন্ট যোগ করুন</span>
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {state.clients.map((client) => {
          const clientServers = state.servers.filter(
            (s) => s.clientId === client.id,
          );
          const monthlySpend = clientServers.reduce(
            (sum, s) => sum + s.wholesaleMonthlyBdt,
            0,
          );
          const monthlyMargin = clientServers.reduce(
            (sum, s) => sum + (s.retailMonthlyBdt - s.wholesaleMonthlyBdt),
            0,
          );

          return (
            <article
              key={client.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-display text-base font-extrabold text-slate-900">
                      {client.name}
                    </h2>
                    {client.company && (
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                        <Building2 size={12} />
                        {client.company}
                      </p>
                    )}
                  </div>
                  <StatusPill status={client.status} />
                </div>

                <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                  <p className="flex items-center gap-2">
                    <Mail size={13} className="text-slate-400" />
                    <span className="truncate">{client.email}</span>
                  </p>
                  <p className="flex items-center gap-2 font-mono">
                    <Phone size={13} className="text-slate-400" />
                    <span>{client.phone}</span>
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3.5 text-center">
                <div className="rounded-xl bg-slate-50 p-2">
                  <p className="font-display text-sm font-extrabold text-slate-900">
                    {clientServers.length}
                  </p>
                  <p className="text-[10px] text-slate-500">সার্ভার</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-2">
                  <p className="font-mono text-xs font-bold text-slate-900">
                    {formatPrice(monthlySpend)}
                  </p>
                  <p className="text-[10px] text-slate-500">খরচ/মাস</p>
                </div>
                <div className="rounded-xl bg-emerald-50/70 p-2">
                  <p className="font-mono text-xs font-bold text-emerald-700">
                    +{formatPrice(monthlyMargin)}
                  </p>
                  <p className="text-[10px] text-emerald-700">লাভ/মাস</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Add Sub-Client Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Add sub-client"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="grid size-9 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                  <UserPlus size={17} />
                </span>
                <h2 className="font-display text-base font-extrabold text-slate-900">
                  নতুন সাব-ক্লায়েন্ট যোগ করুন
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="cursor-pointer rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={handleAddClient} className="mt-4 space-y-3.5">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-800">
                  ক্লায়েন্টের নাম *
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: Hasan Mahmud"
                  className="field !h-10 !rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-800">
                  ইমেইল অ্যাড্রেস *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@company.com"
                  className="field !h-10 !rounded-xl text-sm"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-800">
                    ফোন / WhatsApp
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+88017..."
                    className="field !h-10 !rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-800">
                    কোম্পানি (ঐচ্ছিক)
                  </label>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Agency / Team"
                    className="field !h-10 !rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-outline px-4 py-2 text-xs"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                >
                  সেভ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}