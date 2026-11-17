'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Globe2,
  Headset,
  MapPin,
  Move3D,
  Server,
  ShieldCheck,
  Zap,
} from 'lucide-react';

const InteractiveNetworkGlobe = dynamic(
  () => import('./InteractiveNetworkGlobe'),
  {
    ssr: false,
    loading: () => (
      <div className="relative flex aspect-[1.55/1] items-center justify-center overflow-hidden bg-[#F5F8FF] sm:aspect-[1.8/1] lg:aspect-[1.55/1] xl:aspect-[1.7/1]">
        <div className="size-[58%] rounded-full border border-blue-100 bg-[radial-gradient(circle_at_35%_30%,white,#E6EEFC_70%)] shadow-[inset_-18px_-18px_36px_rgba(80,110,180,0.12),0_0_40px_rgba(59,130,246,0.12)]" />
      </div>
    ),
  },
);

interface NetworkLocation {
  id: string;
  city: string;
  region: string;
  facility: string;
  type: string;
  latency: string;
  details: string;
  latitude: number;
  longitude: number;
}

const LOCATIONS: NetworkLocation[] = [
  {
    id: 'dallas',
    city: 'Dallas',
    region: 'Texas, United States',
    facility: 'Infomart Facility · Stemmons Fwy',
    type: 'US carrier hotel',
    latency: '18ms US edge',
    details: 'AT&T and Comcast static ISP routing',
    latitude: 32.8,
    longitude: -96.8,
  },
  {
    id: 'ashburn',
    city: 'Ashburn',
    region: 'Virginia, United States',
    facility: 'Data Center Alley · Equinix hub',
    type: 'Tier-1 compute',
    latency: '22ms US edge',
    details: 'AMD EPYC · NVMe RAID-1 · 10 Gbps BGP',
    latitude: 39,
    longitude: -77.5,
  },
  {
    id: 'dhaka',
    city: 'Dhaka',
    region: 'Bangladesh',
    facility: 'Banani operations & edge point',
    type: 'Operations / BDIX hub',
    latency: '< 5ms local BDIX',
    details: 'Local engineering support and provisioning',
    latitude: 23.8,
    longitude: 90.4,
  },
];

export function GlobalNetworkMap() {
  const [activeLocationId, setActiveLocationId] = useState(LOCATIONS[0].id);
  const activeLocation =
    LOCATIONS.find((location) => location.id === activeLocationId) ?? LOCATIONS[0];

  return (
    <section className="border-b border-[#E2E8F0] bg-[#F8FAFC] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-semibold text-[#2563EB] shadow-sm">
              <Globe2 size={14} />
              Global network
              <span className="h-1 w-1 rounded-full bg-emerald-500" />
              3 active locations
            </div>

            <h2 className="max-w-lg font-display text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
              Global reach.
              <span className="block text-[#4F46E5]">Local support.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#64748B] sm:text-base">
              Explore our US network facilities and Dhaka operations hub. Select a location
              to see its role, route, and facility details.
            </p>

            <div className="mt-7 space-y-2" aria-label="Select a network location">
              {LOCATIONS.map((location) => {
                const isActive = location.id === activeLocationId;
                return (
                  <button
                    key={location.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveLocationId(location.id)}
                    className={`group flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                      isActive
                        ? 'border-blue-200 bg-white shadow-sm'
                        : 'border-transparent bg-transparent hover:border-slate-200 hover:bg-white/70'
                    }`}
                  >
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${
                        isActive
                          ? 'bg-blue-50 text-[#2563EB]'
                          : 'bg-white text-slate-400 group-hover:text-[#2563EB]'
                      }`}
                    >
                      <MapPin size={17} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="font-display text-sm font-bold text-[#0F172A]">
                          {location.city}
                        </span>
                        <span className="truncate text-[11px] text-slate-500">
                          {location.type}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-xs text-[#64748B]">
                        {location.region}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full bg-slate-50 px-2 py-1 font-mono text-[10px] text-slate-500">
                      {location.latency}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className="mt-5 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-sm"
              aria-live="polite"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB]">
                  <Server size={16} />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#2563EB]">
                    {activeLocation.type}
                  </p>
                  <h3 className="mt-1 font-display text-sm font-bold text-[#0F172A]">
                    {activeLocation.facility}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[#64748B]">
                    {activeLocation.details}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-[#E2E8F0] bg-white shadow-[0_20px_60px_-32px_rgba(15,23,42,0.22)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Interactive network map
                </p>
                <p className="mt-1 font-display text-sm font-bold text-[#0F172A]">
                  Explore the network globe
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Network online
              </span>
            </div>

            <div className="relative aspect-[1.55/1] overflow-hidden bg-[#F5F8FF] sm:aspect-[1.8/1] lg:aspect-[1.55/1] xl:aspect-[1.7/1]">
              <InteractiveNetworkGlobe
                locations={LOCATIONS}
                activeLocationId={activeLocationId}
                onSelectLocation={setActiveLocationId}
              />
              <div className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg border border-white/80 bg-white/85 px-3 py-2 text-[10px] font-medium text-slate-500 shadow-sm backdrop-blur-sm sm:bottom-4 sm:left-4">
                <Move3D size={13} className="text-[#2563EB]" />
                Drag to rotate · Scroll to zoom
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 border-t border-[#E2E8F0] pt-7 sm:grid-cols-3 sm:gap-6">
          <div className="flex gap-3">
            <Zap size={17} className="mt-0.5 shrink-0 text-[#2563EB]" />
            <div>
              <h3 className="text-xs font-bold text-[#0F172A]">Local-time support</h3>
              <p className="mt-1 text-xs leading-5 text-[#64748B]">
                Dhaka operations desk, available while you work.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <ShieldCheck size={17} className="mt-0.5 shrink-0 text-emerald-600" />
            <div>
              <h3 className="text-xs font-bold text-[#0F172A]">Local BDT checkout</h3>
              <p className="mt-1 text-xs leading-5 text-[#64748B]">
                Pay with bKash or Nagad and receive automated invoices.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Headset size={17} className="mt-0.5 shrink-0 text-violet-600" />
            <div>
              <h3 className="text-xs font-bold text-[#0F172A]">Bilingual technical help</h3>
              <p className="mt-1 text-xs leading-5 text-[#64748B]">
                Native Bengali and English support from our local team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
