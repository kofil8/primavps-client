"use client";

import { useCurrency } from "@/lib/currency";
import { CloudPreset, calculateCloudPrice } from "@/lib/data/plans";
import { Cpu, HardDrive, Minus, Plus } from "lucide-react";

interface CloudResourceSlidersProps {
  presets: CloudPreset[];
  vcpu: number;
  ram: number;
  nvme: number;
  minRam: number;
  residentialIp: boolean;
  onApplyPreset: (preset: CloudPreset) => void;
  onChangeVcpu: (val: number) => void;
  onChangeRam: (val: number) => void;
  onChangeNvme: (val: number) => void;
}

const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, val));

export function CloudResourceSliders({
  presets,
  vcpu,
  ram,
  nvme,
  minRam,
  residentialIp,
  onApplyPreset,
  onChangeVcpu,
  onChangeRam,
  onChangeNvme,
}: CloudResourceSlidersProps) {
  const { formatPrice } = useCurrency();

  const sliderClass =
    "h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-blue-600";

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:p-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="grid size-6 place-items-center rounded-md bg-blue-600 font-mono text-xs font-bold text-white">
            3
          </span>
          <h2 className="font-display text-base font-extrabold text-slate-900 sm:text-lg">
            সার্ভার সাইজ ও রিসোর্স
          </h2>
        </div>
        <span className="hidden rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 sm:inline">
          প্রিসেট অথবা কাস্টম
        </span>
      </div>

      {/* Preset Cards */}
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {presets.map((preset) => {
          const effectiveRam = Math.max(preset.ram, minRam);
          const active =
            vcpu === preset.vcpu &&
            ram === effectiveRam &&
            nvme === preset.nvme;
          const presetPrice = calculateCloudPrice(
            preset.vcpu,
            effectiveRam,
            preset.nvme,
            residentialIp,
          );

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset)}
              className={`flex cursor-pointer flex-col justify-between rounded-xl border p-3 text-left transition-all ${
                active
                  ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/15"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60"
              }`}
            >
              <div>
                <span className="block text-xs font-extrabold text-slate-900">
                  {preset.label}
                </span>
                <span className="mt-1 block font-mono text-[11px] text-slate-500">
                  {preset.vcpu} vCPU · {effectiveRam} GB
                </span>
                <span className="block font-mono text-[11px] text-slate-500">
                  {preset.nvme} GB NVMe
                </span>
              </div>
              <p className="mt-2.5 border-t border-slate-100 pt-2 font-display text-sm font-black text-blue-700">
                {formatPrice(presetPrice)}
                <span className="text-[10px] font-medium text-slate-400">
                  /mo
                </span>
              </p>
            </button>
          );
        })}
      </div>

      {/* Custom Fine-Tune Sliders */}
      <div className="mt-6 space-y-5 border-t border-slate-100 pt-5">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          অথবা স্লাইডার দিয়ে কাস্টমাইজ করুন
        </p>

        {/* CPU */}
        <div>
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700">
              <Cpu size={14} className="text-blue-600" />
              <span>vCPU কোর</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease vCPU"
                onClick={() => onChangeVcpu(clamp(vcpu - 1, 1, 16))}
                className="grid size-7 cursor-pointer place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
              >
                <Minus size={13} />
              </button>
              <span className="min-w-[66px] text-center font-mono text-sm font-bold text-slate-900">
                {vcpu} vCPU
              </span>
              <button
                type="button"
                aria-label="Increase vCPU"
                onClick={() => onChangeVcpu(clamp(vcpu + 1, 1, 16))}
                className="grid size-7 cursor-pointer place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
              >
                <Plus size={13} />
              </button>
            </div>
          </div>
          <input
            type="range"
            min={1}
            max={16}
            value={vcpu}
            aria-label="vCPU cores"
            onChange={(e) => onChangeVcpu(Number(e.target.value))}
            className={`mt-2.5 ${sliderClass}`}
          />
          <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-400">
            <span>1 vCPU</span>
            <span>16 vCPU</span>
          </div>
        </div>

        {/* RAM */}
        <div>
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="font-semibold text-slate-700">
              মেমোরি (DDR5 RAM)
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease RAM"
                onClick={() => onChangeRam(clamp(ram - 2, minRam, 64))}
                className="grid size-7 cursor-pointer place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
              >
                <Minus size={13} />
              </button>
              <span className="min-w-[66px] text-center font-mono text-sm font-bold text-slate-900">
                {ram} GB
              </span>
              <button
                type="button"
                aria-label="Increase RAM"
                onClick={() => onChangeRam(clamp(ram + 2, minRam, 64))}
                className="grid size-7 cursor-pointer place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
              >
                <Plus size={13} />
              </button>
            </div>
          </div>
          <input
            type="range"
            min={minRam}
            max={64}
            step={2}
            value={ram}
            aria-label="Memory in GB"
            onChange={(e) => onChangeRam(Number(e.target.value))}
            className={`mt-2.5 ${sliderClass}`}
          />
          <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-400">
            <span>{minRam} GB</span>
            <span>64 GB</span>
          </div>
        </div>

        {/* NVMe */}
        <div>
          <div className="flex items-center justify-between gap-2 text-sm">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700">
              <HardDrive size={14} className="text-blue-600" />
              <span>NVMe Gen4 স্টোরেজ</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease NVMe"
                onClick={() => onChangeNvme(clamp(nvme - 10, 30, 500))}
                className="grid size-7 cursor-pointer place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
              >
                <Minus size={13} />
              </button>
              <span className="min-w-[66px] text-center font-mono text-sm font-bold text-slate-900">
                {nvme} GB
              </span>
              <button
                type="button"
                aria-label="Increase NVMe"
                onClick={() => onChangeNvme(clamp(nvme + 10, 30, 500))}
                className="grid size-7 cursor-pointer place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
              >
                <Plus size={13} />
              </button>
            </div>
          </div>
          <input
            type="range"
            min={30}
            max={500}
            step={10}
            value={nvme}
            aria-label="NVMe storage in GB"
            onChange={(e) => onChangeNvme(Number(e.target.value))}
            className={`mt-2.5 ${sliderClass}`}
          />
          <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-400">
            <span>30 GB</span>
            <span>500 GB</span>
          </div>
        </div>
      </div>
    </div>
  );
}