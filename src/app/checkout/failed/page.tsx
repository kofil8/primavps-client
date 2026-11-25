"use client";

import { FocusedHeader } from "@/components/layout/FocusedHeader";
import { RotateCcw, XCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FaWhatsapp } from "react-icons/fa";

function CheckoutFailedContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason") || "failed";

  const whatsappNumber = (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801700000000"
  ).replace(/[^0-9]/g, "");

  return (
    <>
      <FocusedHeader
        step={2}
        showSteps
        backHref="/checkout"
        backLabel="চেকআউটে ফিরে যান"
      />

      <main className="shell flex min-h-[calc(100vh-3.75rem)] items-center justify-center py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200/90 bg-white p-6 text-center shadow-sm sm:p-8">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-red-50 text-red-600">
            <XCircle size={30} />
          </div>

          <h1 className="mt-4 font-display text-2xl font-extrabold text-slate-900">
            {reason === "cancelled"
              ? "পেমেন্ট বাতিল করা হয়েছে"
              : "পেমেন্ট সম্পন্ন হয়নি"}
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
            আপনার অ্যাকাউন্ট থেকে কোনো টাকা কাটা হয়নি। নিচের বাটনে ক্লিক করে
            আবার বিকাশ, নগদ বা কার্ডে পেমেন্ট করতে পারেন।
          </p>

          <div className="mt-6 space-y-2.5">
            <Link
              href="/checkout"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700"
            >
              <RotateCcw size={15} />
              <span>আবার পেমেন্ট চেষ্টা করুন</span>
            </Link>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "Hello primavps, my payment failed during checkout. Need assistance.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              <FaWhatsapp size={15} className="text-emerald-600" />
              <span>WhatsApp-এ সাপোর্টে কথা বলুন</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export default function CheckoutFailedPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
          লোড হচ্ছে…
        </div>
      }
    >
      <CheckoutFailedContent />
    </Suspense>
  );
}