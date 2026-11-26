"use client";

import {
  getAdminState,
  updateCloudConfig,
  type AdminCloudConfig,
} from "@/lib/services/admin-store";
import { Cpu, Globe, HardDrive, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminCloudVpsPage() {
  const [config, setConfig] = useState<AdminCloudConfig | null>(null);
  const [tab, setTab] = useState<"rates" | "regions" | "os">("rates");

  useEffect(() => {
    const sync = () => setConfig(getAdminState().cloudConfig);
    sync();
    window.addEventListener("admin-store-updated", sync);
    return () => window.removeEventListener("admin-store-updated", sync);
  }, []);

  if (!config) return null;

  const saveRates = (e: React.FormEvent) => {
    e.preventDefault();
    updateCloudConfig(config);
    toast.success("Cloud VPS unit pricing rates saved.");
  };

  const toggleRegion = (id: string) => {
    const next: AdminCloudConfig = {
      ...config,
      regions: config.regions.map((r) =>
        r.id === id ? { ...r, online: !r.online } : r,
      ),
    };
    updateCloudConfig(next);
    toast.success("Datacenter region status updated.");
  };

  const toggleOs = (id: string) => {
    const next: AdminCloudConfig = {
      ...config,
      osImages: config.osImages.map((o) =>
        o.id === id ? { ...o, active: !o.active } : o,
      ),
    };
    updateCloudConfig(next);
    toast.success("OS image availability updated.");
  };

  return (
    <div className="space-y-5">
      {/* Sub-Tabs */}
      <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 text-xs font-bold">
        {[
          { id: "rates", label: "Slider Unit Rates", icon: Cpu },
          { id: "regions", label: "Datacenter Regions", icon: Globe },
          { id: "os", label: "OS Images", icon: HardDrive },
        ].map((item) => {
          const Icon = item.icon;
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id as "rates" | "regions" | "os")}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3.5 py-2 transition-colors ${
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon size={14} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Slider Unit Rates */}
      {tab === "rates" && (
        <form
          onSubmit={saveRates}
          className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs sm:p-6"
        >
          <h2 className="font-display text-sm font-extrabold text-slate-900">
            Custom Cloud Builder Unit Pricing (BDT / Month)
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Controls the live slider calculator on <span className="font-mono">/cloud-vps</span> and server-side checkout totals.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              { key: "perVcpuBdt", label: "Per 1 vCPU (AMD EPYC)" },
              { key: "perGbRamBdt", label: "Per 1 GB DDR5 RAM" },
              { key: "per10GbNvmeBdt", label: "Per 10 GB NVMe Gen4" },
              { key: "residentialIpAddonBdt", label: "Residential IP Add-on" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-bold text-slate-700">
                  {field.label}
                </label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 font-mono text-xs font-bold text-slate-400">
                    ৳
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={
                      config.unitRates[
                        field.key as keyof AdminCloudConfig["unitRates"]
                      ]
                    }
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        unitRates: {
                          ...config.unitRates,
                          [field.key]: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 py-2 pr-3 pl-7 font-mono text-sm font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-end border-t border-slate-100 pt-4">
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
            >
              <Save size={14} /> Save Unit Rates
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Regions */}
      {tab === "regions" && (
        <div className="grid gap-4 sm:grid-cols-3">
          {config.regions.map((region) => (
            <div
              key={region.id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs"
            >
              <div>
                <p className="text-sm font-extrabold text-slate-900">
                  {region.city}, {region.state}
                </p>
                <p className="text-xs text-slate-500">{region.location}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleRegion(region.id)}
                className={`cursor-pointer rounded-full px-3 py-1 text-[11px] font-bold ${
                  region.online
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {region.online ? "Online" : "Maintenance"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: OS Images */}
      {tab === "os" && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
          <div className="divide-y divide-slate-100">
            {config.osImages.map((os) => (
              <div
                key={os.id}
                className="flex items-center justify-between gap-4 px-5 py-3.5"
              >
                <div>
                  <p className="text-sm font-bold text-slate-900">{os.name}</p>
                  <p className="text-xs text-slate-500">
                    {os.subtitle} · Min {os.minRamGb} GB RAM
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleOs(os.id)}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold ${
                    os.active
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {os.active ? "Enabled" : "Disabled"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}