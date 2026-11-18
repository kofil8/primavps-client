import { Cpu, HardDrive, RefreshCw, Shield, Zap } from "lucide-react";

export function DealsFeatures() {
  const features = [
    {
      title: "Instant Setup",
      desc: "Get your server provisioned and active automatically within minutes of completing your order.",
      icon: Zap,
    },
    {
      title: "Free Site Migration",
      desc: "Our expert engineers transfer your websites, databases, and cPanel accounts at no additional charge.",
      icon: RefreshCw,
    },
    {
      title: "99.99% Uptime Guarantee",
      desc: "Redundant enterprise hardware and Tier-1 carrier backbones ensure uninterrupted connectivity.",
      icon: HardDrive,
    },
    {
      title: "Free DDoS Protection",
      desc: "Multi-terabit volumetric traffic filtering defends your server against malicious web assaults.",
      icon: Shield,
    },
  ];

  return (
    <section className="section bg-slate-50/70 border-t border-slate-200">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left: Graphic illustration block */}
          <div className="flex items-center justify-center lg:col-span-5">
            <div className="relative flex size-72 items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl sm:size-84">
              <div className="absolute inset-4 rounded-2xl bg-gradient-to-tr from-blue-50 via-purple-50 to-amber-50" />
              
              {/* Central Server Stack Graphic */}
              <div className="relative flex flex-col items-center gap-3">
                <div className="grid size-16 place-items-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25">
                  <HardDrive size={32} />
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    Tier-4 USA Datacenter
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-xs">
                    <Cpu size={14} className="text-blue-600" />
                    AMD EPYC™ Gen4
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-xs">
                    <Shield size={14} className="text-emerald-600" />
                    Virgin US ASN
                  </div>
                </div>
              </div>

              {/* Decorative mini badges */}
              <div className="absolute -top-3 -right-3 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold text-blue-600 shadow-md">
                10 Gbps Uplink
              </div>
              <div className="absolute -bottom-3 -left-3 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold text-amber-600 shadow-md">
                NVMe Gen4
              </div>
            </div>
          </div>

          {/* Right: Content & 2x2 Feature Grid */}
          <div className="lg:col-span-7">
            <span className="eyebrow">Enterprise Hosting Foundation</span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Fast, Reliable & Scalable VPS Hosting by PrimeVPS BD
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              PrimeVPS BD offers high-performance hosting solutions backed by cutting-edge
              NVMe infrastructure and round-the-clock technical support. Whether powering
              survey research, remote desktop operations, or commercial websites, our servers
              are engineered to deliver supreme reliability.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-shadow hover:shadow-md"
                >
                  <div className="inline-flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <item.icon size={20} />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
