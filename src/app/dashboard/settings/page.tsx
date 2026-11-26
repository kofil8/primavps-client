"use client";

import {
  getStoredProfile,
  saveStoredProfile,
} from "@/lib/services/portal-store";
import { CheckCircle2, Lock, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function DashboardSettingsPage() {
  const router = useRouter();
  const initialProfile = getStoredProfile();
  const [name, setName] = useState(initialProfile.name);
  const [phone, setPhone] = useState(initialProfile.phone);
  const [savedProfile, setSavedProfile] = useState(false);

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [savedPass, setSavedPass] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredProfile({ ...initialProfile, name, phone });
    setSavedProfile(true);
    toast.success("প্রোফাইল তথ্য সংরক্ষণ করা হয়েছে।");
    window.setTimeout(() => setSavedProfile(false), 2500);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 8) {
      toast.error("নতুন পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }
    setCurrentPass("");
    setNewPass("");
    setSavedPass(true);
    toast.success("পাসওয়ার্ড সফলভাবে আপডেট হয়েছে।");
    window.setTimeout(() => setSavedPass(false), 2500);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("সাইন আউট সম্পন্ন হয়েছে।");
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
          অ্যাকাউন্ট সেটিংস
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          আপনার প্রোফাইল তথ্য, WhatsApp অ্যালার্ট নম্বর ও পাসওয়ার্ড পরিচালনা
          করুন।
        </p>
      </div>

      {/* Profile Form */}
      <form
        onSubmit={handleSaveProfile}
        className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:p-6"
      >
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-blue-600">
            <User size={17} />
          </span>
          <h2 className="font-display text-base font-extrabold text-slate-900">
            প্রোফাইল ও যোগাযোগ
          </h2>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="set-name"
              className="mb-1 block text-xs font-bold text-slate-800"
            >
              পূর্ণ নাম
            </label>
            <input
              id="set-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="set-email"
              className="mb-1 block text-xs font-bold text-slate-800"
            >
              ইমেইল (ভেরিফাইড)
            </label>
            <input
              id="set-email"
              value="ariful@example.com"
              disabled
              className="field bg-slate-50 text-sm text-slate-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="set-phone"
              className="mb-1 block text-xs font-bold text-slate-800"
            >
              মোবাইল / WhatsApp নম্বর (সার্ভার ও বিলিং অ্যালার্টের জন্য)
            </label>
            <input
              id="set-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="field text-sm"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          {savedProfile ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <CheckCircle2 size={14} /> প্রোফাইল আপডেট হয়েছে
            </span>
          ) : (
            <span />
          )}
          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
          >
            পরিবর্তন সংরক্ষণ করুন
          </button>
        </div>
      </form>

      {/* Password Form */}
      <form
        onSubmit={handleSavePassword}
        className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:p-6"
      >
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <span className="grid size-9 place-items-center rounded-xl bg-slate-100 text-slate-700">
            <Lock size={17} />
          </span>
          <h2 className="font-display text-base font-extrabold text-slate-900">
            পাসওয়ার্ড পরিবর্তন
          </h2>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="cur-pass"
              className="mb-1 block text-xs font-bold text-slate-800"
            >
              বর্তমান পাসওয়ার্ড
            </label>
            <input
              id="cur-pass"
              type="password"
              required
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              className="field text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="new-pass-set"
              className="mb-1 block text-xs font-bold text-slate-800"
            >
              নতুন পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)
            </label>
            <input
              id="new-pass-set"
              type="password"
              required
              minLength={8}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="field text-sm"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          {savedPass ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              <CheckCircle2 size={14} /> পাসওয়ার্ড পরিবর্তিত হয়েছে
            </span>
          ) : (
            <span />
          )}
          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
          >
            পাসওয়ার্ড আপডেট করুন
          </button>
        </div>
      </form>

      {/* Sign Out Card */}
      <div className="flex items-center justify-between rounded-2xl border border-red-200/80 bg-red-50/40 p-5">
        <div>
          <p className="text-sm font-bold text-slate-900">সেশন সাইন আউট</p>
          <p className="text-xs text-slate-600">
            এই ব্রাউজার থেকে আপনার ক্লায়েন্ট পোর্টাল লগআউট করুন।
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-xs font-bold text-red-700 hover:bg-red-50"
        >
          <LogOut size={14} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}