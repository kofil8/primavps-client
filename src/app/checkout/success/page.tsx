"use client";

import { FocusedHeader } from "@/components/layout/FocusedHeader";
import { downloadRdpFile } from "@/lib/utils/rdp-file";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Eye,
  EyeOff,
  Loader2,
  RotateCcw,
  Server,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const uddoktaInvoiceId = searchParams.get("invoice_id");

  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [orderInfo, setOrderInfo] = useState<{
    invoiceId: string;
    orderId: string;
  } | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const verifiedOnce = useRef(false);

  useEffect(() => {
    if (!uddoktaInvoiceId) {
      setVerifyError("পেমেন্ট ইনভয়েস আইডি পাওয়া যায়নি।");
      return;
    }

    if (verifiedOnce.current) return;
    verifiedOnce.current = true;

    const verifyTransaction = async () => {
      const apiBase =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

      try {
        const res = await fetch(`${apiBase}/payments/verify/uddoktapay`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ invoice_id: uddoktaInvoiceId }),
        });

        const json = await res.json();
        const result = json?.data || json;

        if (
          !res.ok ||
          (result?.status !== "COMPLETED" && result?.status !== "ALREADY_PAID")
        ) {
          throw new Error(json?.message || "পেমেন্ট ভেরিফিকেশন সম্পন্ন হয়নি।");
        }

        setOrderInfo({
          invoiceId: result.invoiceId,
          orderId: result.orderId,
        });

        setStage(2);
        window.setTimeout(() => setStage(3), 1500);
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "পেমেন্ট যাচাই করতে সমস্যা হয়েছে।";
        setVerifyError(message);
      }
    };

    verifyTransaction();
  }, [uddoktaInvoiceId]);

  const displayRef = orderInfo?.orderId
    ? orderInfo.orderId.slice(0, 8).toUpperCase()
    : uddoktaInvoiceId?.slice(0, 8).toUpperCase() || "PROCESSING";

  const serverCreds = {
    ipAddress: "Pending IP Assignment",
    rdpPort: 3389,
    username: "Administrator",
    password: "Check Dashboard / Email",
    isp: "Static Residential ISP (IPQS Clean)",
  };

  const copyValue = async (key: string, val: string) => {
    try {
      await navigator.clipboard.writeText(val);
      setCopiedField(key);
      toast.success("ক্লিপবোর্ডে কপি হয়েছে");
      window.setTimeout(() => setCopiedField(null), 1600);
    } catch {
      toast.error("ক্লিপবোর্ডে কপি করা যায়নি — ম্যানুয়ালি কপি করুন।");
    }
  };

  const handleDownloadRdp = () => {
    downloadRdpFile({
      ipAddress: serverCreds.ipAddress,
      rdpPort: serverCreds.rdpPort,
      username: serverCreds.username,
      serverLabel: `primavps-${displayRef}`,
    });
    toast.success("RDP ফাইল ডাউনলোড শুরু হয়েছে।");
  };

  if (verifyError) {
    return (
      <>
        <FocusedHeader
          step={2}
          showSteps
          backHref="/checkout"
          backLabel="চেকআউটে ফিরে যান"
        />
        <main className="shell flex min-h-[calc(100vh-3.75rem)] items-center justify-center py-12">
          <div className="w-full max-w-md rounded-3xl border border-red-200/80 bg-white p-6 text-center shadow-sm sm:p-8">
            <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-red-50 text-red-600">
              <AlertCircle size={30} />
            </div>
            <h1 className="mt-4 font-display text-xl font-extrabold text-slate-900">
              পেমেন্ট ভেরিফিকেশন ব্যর্থ হয়েছে
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
              {verifyError}
            </p>
            <div className="mt-6">
              <Link
                href="/dashboard/billing"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700"
              >
                <RotateCcw size={15} />
                <span>বিলিং ড্যাশবোর্ড চেক করুন</span>
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  const steps = [
    {
      id: 1,
      title: "UddoktaPay পেমেন্ট ভেরিফাই হচ্ছে",
      desc: `ইনভয়েস #${uddoktaInvoiceId} যাচাই করা হচ্ছে।`,
    },
    {
      id: 2,
      title: "অর্ডার কনফার্ম ও প্রভিশনিং কিউতে যুক্ত",
      desc: "পেমেন্ট সফলভাবে গৃহীত হয়েছে এবং সার্ভার সেটআপ শুরু হয়েছে।",
    },
    {
      id: 3,
      title: "ক্লায়েন্ট ড্যাশবোর্ডে সার্ভার প্রস্তুত",
      desc: "৬০–৯০ সেকেন্ডের মধ্যে আপনার ড্যাশবোর্ড ও ইমেইলে RDP তথ্য পৌঁছে যাবে।",
    },
  ];

  return (
    <>
      <FocusedHeader
        step={3}
        showSteps
        backHref="/dashboard"
        backLabel="ড্যাশবোর্ডে যান"
      />

      <main className="shell py-10 sm:py-14">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 text-center shadow-sm sm:p-8">
            <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
              {stage < 3 ? (
                <Loader2 size={30} className="animate-spin text-blue-600" />
              ) : (
                <CheckCircle2 size={30} />
              )}
            </div>

            <p className="mt-4 font-mono text-xs font-bold uppercase tracking-wider text-blue-600">
              Ref #{displayRef}
            </p>
            <h1 className="mt-1 font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
              {stage < 3
                ? "পেমেন্ট যাচাই ও সার্ভার প্রস্তুত হচ্ছে…"
                : "পেমেন্ট সফল ও অর্ডার কনফার্ম হয়েছে!"}
            </h1>

            <ol className="mt-7 space-y-3 text-left">
              {steps.map((s) => {
                const done = stage >= s.id;
                const active = stage === s.id && stage < 3;
                return (
                  <li
                    key={s.id}
                    className={`flex items-start gap-3.5 rounded-2xl border p-3.5 transition-all ${
                      done
                        ? "border-emerald-200/80 bg-emerald-50/40"
                        : "border-slate-200/80 bg-slate-50/50 opacity-65"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${
                        done
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {active ? (
                        <Loader2 size={13} className="animate-spin" />
                      ) : done ? (
                        <Check size={13} />
                      ) : (
                        s.id
                      )}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-900 sm:text-sm">
                        {s.title}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-600">{s.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {stage === 3 && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <Server size={18} />
                  </span>
                  <div>
                    <h2 className="font-display text-base font-extrabold text-slate-900">
                      সার্ভার প্রভিশনিং স্ট্যাটাস
                    </h2>
                    <p className="text-xs text-emerald-700">
                      {serverCreds.isp}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadRdp}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-slate-800"
                >
                  <Download size={14} />
                  <span>.RDP ফাইল ডাউনলোড</span>
                </button>
              </div>

              <dl className="mt-4 divide-y divide-slate-100 text-xs sm:text-sm">
                {[
                  {
                    key: "ip",
                    label: "IP Address",
                    value: serverCreds.ipAddress,
                    copyVal: serverCreds.ipAddress,
                  },
                  {
                    key: "user",
                    label: "Username",
                    value: serverCreds.username,
                    copyVal: serverCreds.username,
                  },
                ].map((row) => (
                  <div
                    key={row.key}
                    className="flex items-center justify-between py-3"
                  >
                    <dt className="font-medium text-slate-500">{row.label}</dt>
                    <dd className="flex items-center gap-2 font-mono font-bold text-slate-900">
                      <span>{row.value}</span>
                      <button
                        type="button"
                        onClick={() => copyValue(row.key, row.copyVal)}
                        className="cursor-pointer rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      >
                        {copiedField === row.key ? (
                          <Check size={13} className="text-emerald-600" />
                        ) : (
                          <Copy size={13} />
                        )}
                      </button>
                    </dd>
                  </div>
                ))}

                <div className="flex items-center justify-between py-3">
                  <dt className="font-medium text-slate-500">Password</dt>
                  <dd className="flex items-center gap-2 font-mono font-bold text-slate-900">
                    <span>
                      {showPassword ? serverCreds.password : "••••••••••••••••"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="cursor-pointer rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    >
                      {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                <Link
                  href="/dashboard/services"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700"
                >
                  <span>ক্লায়েন্ট ড্যাশবোর্ডে যান</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck size={13} className="text-emerald-600" />
                প্রথম ৭ দিন ফ্রি IP Swap সুবিধা সক্রিয় রয়েছে।
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
          অর্ডার স্ট্যাটাস লোড হচ্ছে…
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
