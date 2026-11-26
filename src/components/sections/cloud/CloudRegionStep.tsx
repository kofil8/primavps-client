"use client";

import { CountryFlag } from "@/components/ui/CountryFlag";
import { CloudRegion } from "@/lib/data/plans";

export function getRegionCountryCode(region: CloudRegion): string {
  const text =
    `${region.id} ${region.location} ${region.city} ${region.state}`.toLowerCase();
  if (
    text.includes("uk") ||
    text.includes("london") ||
    text.includes("manchester")
  )
    return "uk";
  if (
    text.includes("germany") ||
    text.includes("frankfurt") ||
    text.includes("berlin") ||
    text.includes("de")
  )
    return "de";
  if (text.includes("france") || text.includes("paris") || text.includes("fr"))
    return "fr";
  if (
    text.includes("netherlands") ||
    text.includes("amsterdam") ||
    text.includes("nl")
  )
    return "nl";
  if (text.includes("singapore") || text.includes("sg")) return "sg";
  return "us";
}

interface CloudRegionStepProps {
  regions: CloudRegion[];
  selected: CloudRegion;
  onSelect: (region: CloudRegion) => void;
}

export function CloudRegionStep({
  regions,
  selected,
  onSelect,
}: CloudRegionStepProps) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs sm:p-6">
      <div className="flex items-center gap-2.5">
        <span className="grid size-6 place-items-center rounded-md bg-blue-600 font-mono text-xs font-bold text-white">
          1
        </span>
        <h2 className="font-display text-base font-extrabold text-slate-900 sm:text-lg">
          ডেটাসেন্টার লোকেশন বেছে নিন
        </h2>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {regions.map((item) => {
          const active = selected.id === item.id;
          const flagCode = getRegionCountryCode(item);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item)}
              className={`group relative flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${
                active
                  ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/15"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                <CountryFlag code={flagCode} size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="truncate text-sm font-bold text-slate-900">
                    {item.city}
                  </span>
                  <span
                    className="size-2 shrink-0 rounded-full bg-emerald-500"
                    title="Online"
                  />
                </div>
                <span className="mt-0.5 block truncate text-xs text-slate-500">
                  {item.state} · {item.location}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}