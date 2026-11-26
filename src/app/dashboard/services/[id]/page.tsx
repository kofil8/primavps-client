"use client";

import { IpSwapModal } from "@/components/dashboard/IpSwapModal";
import { RdpCredentialsCard } from "@/components/dashboard/RdpCredentialsCard";
import { StatusPill } from "@/components/dashboard/StatusPill";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { useCurrency } from "@/lib/currency";
import {
  getStoredServices,
  updateStoredService,
} from "@/lib/services/portal-store";
import {
  ArrowLeft,
  Calendar,
  Cpu,
  HardDrive,
  MemoryStick,
  Play,
  Power,
  RefreshCw,
  RotateCw,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ServiceDetailPage() {
  const params = useParams<{ id: string }>();
  const { formatPrice } = useCurrency();

  const [services] = useState(getStoredServices);
  const baseService =
    services.find((s) => s.id === params.id) ?? services[0];

  const [powerState, setPowerState] = useState<"running" | "stopped">(
    baseService.status === "stopped" ? "stopped" : "running",
  );
  const [powerBusy, setPowerBusy] = useState<string | null>(null);
  const [ipAddress, setIpAddress] = useState(baseService.ip);
  const [freeSwapUsed, setFreeSwapUsed] = useState(false);
  const [swapModalOpen, setSwapModalOpen] = useState(false);

  const handlePowerAction = async (action: "start" | "stop" | "reboot") => {
    setPowerBusy(action);
    await new Promise((r) => setTimeout(r, 800));
    const nextStatus = action === "stop" ? "stopped" : "running";
    setPowerState(nextStatus);
    updateStoredService(baseService.id, (srv) => ({
      ...srv,
      status: nextStatus,
    }));
    setPowerBusy(null);
    toast.success(
      action === "reboot"
        ? "সার্ভার সফলভাবে রিবুট হয়েছে।"
        : action === "stop"
          ? "সার্ভার শাটডাউন করা হয়েছে।"
          : "সার্ভার চালু হয়েছে।",
    );
  };

  const handleConfirmSwap = () => {
    if (!freeSwapUsed) {
      const nextIp = "108.204.189.44";
      setIpAddress(nextIp);
      setFreeSwapUsed(true);
      updateStoredService(baseService.id, (srv) => ({
        ...srv,
        ip: nextIp,
      }));
      toast.success("ফ্রি IP Swap সম্পন্ন! নতুন ক্লিন IP অ্যাসাইন করা হয়েছে।");
    } else {
      toast.info("৳৩৫০ IP Swap ইনভয়েস তৈরি হয়েছে — Invoices থেকে পেমেন্ট করুন।");
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Back */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/dashboard/services"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft size={14} />
          <span>সব সার্ভারে ফিরে যান</span>
        </Link>
      </div>

      {/* Server Header Card */}
      <section className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3.5">
            <div className="mt-0.5 shrink-0">
              <CountryFlag
                code={baseService.country.toLowerCase()}
                size={28}
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {baseService.name}
                </h1>
                <StatusPill status={powerState} />
              </div>
              <p className="mt-1 font-mono text-xs text-slate-500">
                {ipAddress} · {baseService.carrier} · {baseService.os}
              </p>
            </div>
          </div>

          {/* Power Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {powerState === "stopped" ? (
              <button
                type="button"
                disabled={Boolean(powerBusy)}
                onClick={() => handlePowerAction("start")}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                <Play size={13} />
                <span>{powerBusy === "start" ? "চালু হচ্ছে…" : "Start"}</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  disabled={Boolean(powerBusy)}
                  onClick={() => handlePowerAction("reboot")}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  <RotateCw
                    size={13}
                    className={powerBusy === "reboot" ? "animate-spin" : ""}
                  />
                  <span>Reboot</span>
                </button>
                <button
                  type="button"
                  disabled={Boolean(powerBusy)}
                  onClick={() => handlePowerAction("stop")}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-red-200 bg-red-50/70 px-3.5 py-2 text-xs font-bold text-red-700 hover:bg-red-100 disabled:opacity-50"
                >
                  <Power size={13} />
                  <span>{powerBusy === "stop" ? "বন্ধ হচ্ছে…" : "Stop"}</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Resource Specs Strip */}
        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-4">
          <div className="rounded-xl bg-slate-50 p-3">
            <dt className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <Cpu size={13} className="text-blue-600" /> CPU
            </dt>
            <dd className="mt-1 font-display text-sm font-extrabold text-slate-900">
              {baseService.specs.vcpu} vCPU
            </dd>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <dt className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <MemoryStick size={13} className="text-blue-600" /> RAM
            </dt>
            <dd className="mt-1 font-display text-sm font-extrabold text-slate-900">
              {baseService.specs.ram} GB DDR5
            </dd>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <dt className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <HardDrive size={13} className="text-blue-600" /> NVMe
            </dt>
            <dd className="mt-1 font-display text-sm font-extrabold text-slate-900">
              {baseService.specs.nvme} GB Gen4
            </dd>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <dt className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <Calendar size={13} className="text-blue-600" /> পরবর্তী রিনিউয়াল
            </dt>
            <dd className="mt-1 font-display text-sm font-extrabold text-slate-900">
              {baseService.renewsOn} ({formatPrice(baseService.monthlyBdt)})
            </dd>
          </div>
        </dl>
      </section>

      {/* Main Grid: RDP Credentials + 7-Day IP Swap Card */}
      <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
        <RdpCredentialsCard
          serverName={baseService.name}
          ipAddress={ipAddress}
          username="Administrator"
          password="Pv#94kLm!2026xR"
          ispLabel={`${baseService.carrier} Static Residential · IPQS 0/100`}
        />

        {/* IP Swap & Protection Card */}
        <section className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:p-6">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                <ShieldCheck size={18} />
              </span>
              <div>
                <h2 className="font-display text-base font-extrabold text-slate-900">
                  IP রিপ্লেসমেন্ট ও সুরক্ষা
                </h2>
                <p className="text-xs text-slate-500">
                  ৭-দিনের ফ্রি গ্যারান্টি পলিসি
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-xs leading-relaxed text-slate-600">
              {!freeSwapUsed ? (
                <>
                  আপনার এই সার্ভারে{" "}
                  <strong className="text-emerald-700">
                    ১টি ফ্রি IP Swap (৫ দিন বাকি)
                  </strong>{" "}
                  সক্রিয় আছে। ফ্রি উইন্ডো শেষে নতুন IP নিতে ৳৩৫০ ফি প্রযোজ্য।
                </>
              ) : (
                <>
                  আপনার ফ্রি IP Swap ব্যবহৃত হয়েছে। পুনরায় নতুন IP পরিবর্তন
                  করতে <strong className="text-slate-900">৳৩৫০</strong> ইনভয়েস
                  প্রযোজ্য হবে।
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSwapModalOpen(true)}
            className="mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-900 transition-colors hover:border-blue-600 hover:bg-blue-50/40 hover:text-blue-700 sm:text-sm"
          >
            <RefreshCw size={15} />
            <span>
              {!freeSwapUsed ? "ফ্রি IP Swap অনুরোধ করুন" : "নতুন IP কিনুন (৳৩৫০)"}
            </span>
          </button>
        </section>
      </div>

      <IpSwapModal
        open={swapModalOpen}
        onClose={() => setSwapModalOpen(false)}
        currentIp={ipAddress}
        carrier={baseService.carrier}
        isFreeEligible={!freeSwapUsed}
        daysRemaining={5}
        onConfirmSwap={handleConfirmSwap}
      />
    </div>
  );
}