"use client";

import { CloudOs } from "@/lib/data/plans";
import { Info } from "lucide-react";
import {
  FaCentos,
  FaDocker,
  FaFedora,
  FaLinux,
  FaUbuntu,
  FaWindows,
} from "react-icons/fa";
import { SiAlmalinux, SiDebian, SiRockylinux } from "react-icons/si";

export function OsBrandIcon({ os, size = 22 }: { os: CloudOs; size?: number }) {
  const key = `${os.id} ${os.name}`.toLowerCase();

  if (key.includes("ubuntu"))
    return <FaUbuntu size={size} className="text-[#E95420]" />;
  if (key.includes("windows"))
    return <FaWindows size={size} className="text-[#0078D4]" />;
  if (key.includes("debian"))
    return <SiDebian size={size} className="text-[#A81D33]" />;
  if (key.includes("alma"))
    return <SiAlmalinux size={size} className="text-[#0F4266]" />;
  if (key.includes("rocky"))
    return <SiRockylinux size={size} className="text-[#10B981]" />;
  if (key.includes("centos"))
    return <FaCentos size={size} className="text-[#932279]" />;
  if (key.includes("fedora"))
    return <FaFedora size={size} className="text-[#51A2DA]" />;
  if (key.includes("docker"))
    return <FaDocker size={size} className="text-[#2496ED]" />;

  return <FaLinux size={size} className="text-slate-700" />;
}

interface CloudOsStepProps {
  options: CloudOs[];
  selected: CloudOs;
  onSelect: (os: CloudOs) => void;
}

export function CloudOsStep({ options, selected, onSelect }: CloudOsStepProps) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:p-6">
      <div className="flex items-center gap-2.5">
        <span className="grid size-6 place-items-center rounded-md bg-blue-600 font-mono text-xs font-bold text-white">
          2
        </span>
        <h2 className="font-display text-base font-extrabold text-slate-900 sm:text-lg">
          অপারেটিং সিস্টেম (OS Image)
        </h2>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        {options.map((item) => {
          const active = selected.id === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item)}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                active
                  ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/15"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60"
              }`}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200/70 bg-slate-50">
                <OsBrandIcon os={item} size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-slate-900">
                  {item.name}
                </span>
                <span className="mt-0.5 block truncate text-[11px] text-slate-500">
                  {item.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {selected.family === "windows" && (
        <p className="mt-3.5 flex items-center gap-1.5 rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-2 text-xs font-medium text-blue-800">
          <Info size={14} className="shrink-0 text-blue-600" />
          <span>
            Windows OS-এর স্মুথ পারফরম্যান্সের জন্য ন্যূনতম ৪ GB RAM সেট করা
            হয়েছে।
          </span>
        </p>
      )}
    </div>
  );
}