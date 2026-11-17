'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const PERSONAS = [
  {
    title: 'Remote work',
    sub: 'Residential ISP server',
    detailTitle: 'A consistent US connection for your remote work',
    description:
      'Use a dedicated Windows environment with a static US residential ISP connection. If you are unsure about setup, our Dhaka team can walk you through it.',
    bullets: [
      'Static residential IP',
      'Windows 10/11 environment',
      '7-day IP replacement policy',
    ],
    cta: 'View residential ISP plans',
    href: '/survey-vps',
    imgUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
    imageAlt: 'People working together around a laptop',
  },
  {
    title: 'Agency teams',
    sub: 'Team and reseller plans',
    detailTitle: 'A steady setup for a growing team',
    description:
      'Give your team a consistent environment for client work, with separate RDP sessions and options to expand as you grow.',
    bullets: [
      'Isolated RDP sessions',
      'Static ISP options',
      'Volume plans for agencies',
    ],
    cta: 'Talk about agency plans',
    href: '/resellers',
    imgUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80',
    imageAlt: 'A team discussing work together at a table',
  },
  {
    title: 'Developers',
    sub: 'NVMe cloud VPS',
    detailTitle: 'Room to build, test, and ship',
    description:
      'Run websites, databases, and services on configurable NVMe cloud instances, with root access for the tools you already use.',
    bullets: [
      'Configurable CPU and memory',
      'NVMe storage',
      'Root access and VNC console',
    ],
    cta: 'Explore cloud VPS',
    href: '/cloud-vps',
    imgUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
    imageAlt: 'A developer working at a computer',
  },
];

export function BuiltForPersonas() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePersona = PERSONAS[activeIndex];

  return (
    <section className="border-b border-[#E2E8F0] bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#365FE8]">
              A good place to start
            </p>
            <h2 className="max-w-lg font-display text-3xl font-extrabold leading-tight tracking-tight text-[#17212B] sm:text-4xl">
              Find the setup that fits your work
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#647184] sm:text-base sm:leading-7">
              Different work needs different servers. Choose what sounds most
              like you.
            </p>

            <div
              role="group"
              aria-label="Choose a type of work"
              className="mt-7 space-y-2"
            >
              {PERSONAS.map((persona, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={persona.title}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveIndex(index)}
                    className={`flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-3.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#365FE8] focus-visible:ring-offset-2 ${
                      isActive
                        ? 'border-[#cbd7fb] bg-[#f5f7ff]'
                        : 'border-transparent bg-white hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>
                      <span className="block font-display text-sm font-bold text-[#17212B]">
                        {persona.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-[#647184]">
                        {persona.sub}
                      </span>
                    </span>
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className={`shrink-0 transition-transform ${
                        isActive
                          ? 'translate-x-0.5 text-[#365FE8]'
                          : 'text-[#94A0B1]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <article
            className="overflow-hidden rounded-3xl border border-[#E2E8F0] bg-[#F8FAFC]"
            aria-live="polite"
          >
            <div className="relative h-56 overflow-hidden bg-slate-100 sm:h-72 lg:h-80">
              <Image
                src={activePersona.imgUrl}
                alt={activePersona.imageAlt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-5 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#365FE8]">
                {activePersona.sub}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-[#17212B] sm:text-2xl">
                {activePersona.detailTitle}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#526172]">
                {activePersona.description}
              </p>

              <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                {activePersona.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2 text-xs leading-5 text-[#334155]"
                  >
                    <CheckCircle2
                      size={15}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={activePersona.href}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#2459BC] hover:text-[#173F92] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#365FE8] focus-visible:ring-offset-2"
              >
                {activePersona.cta}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
