import { CalendarCheck, Cpu, Globe, Shield, Zap } from "lucide-react";

const FEATURES = [
  {
    title: "৬০–৯০ সেকেন্ডে অটো-ডেলিভারি",
    desc: "বিকাশ, নগদ বা কার্ডে পেমেন্ট কনফার্ম হতেই ড্যাশবোর্ড ও ইমেইলে ফুল অ্যাডমিন RDP লগইন পেয়ে যাবেন।",
    icon: Zap,
  },
  {
    title: "১০০% ডেডিকেটেড হোম ISP IP",
    desc: "AT&T, Comcast, Verizon, BT ও Deutsche Telekom-এর স্ট্যাটিক রেসিডেন্সিয়াল IP—অন্য কারো সাথে শেয়ার্ড নয়।",
    icon: Globe,
  },
  {
    title: "৭-দিনের ফ্রি IP Swap গ্যারান্টি",
    desc: "প্রথম ৭ দিনের মধ্যে আইপিতে কোনো ফ্রড-স্কোর বা ডেলিভারি সমস্যা হলে বিনা খরচে ফ্রেশ আইপি রিপ্লেস করে দেওয়া হয়।",
    icon: CalendarCheck,
  },
  {
    title: "জিরো লিক ও DDoS প্রোটেকশন",
    desc: "প্রি-কনফিগার্ড WebRTC/DNS লিক সুরক্ষা এবং এন্টারপ্রাইজ DDoS ফিল্টারিং সহ নিরবচ্ছিন্ন কানেক্টিভিটি।",
    icon: Shield,
  },
];

export function DealsFeatures() {
  return (
    <section className="border-t border-slate-200/80 bg-slate-50/70 py-14 sm:py-20">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: Clean Infrastructure Summary Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs sm:p-7">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-2xl bg-blue-600 text-white shadow-sm shadow-blue-600/20">
                    <Cpu size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">
                      primavps Infrastructure
                    </p>
                    <p className="text-xs text-slate-500">
                      Ashburn, VA · Dallas, TX · EU Nodes
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  99.98%
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  { k: "Processor", v: "AMD EPYC™ Gen4" },
                  { k: "Storage", v: "Enterprise NVMe" },
                  { k: "Protocols", v: "RDP · SOCKS5 · HTTP" },
                  { k: "Uplink", v: "10 Gbps Redundant" },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="rounded-xl border border-slate-200/70 bg-slate-50/70 px-3.5 py-2.5"
                  >
                    <p className="text-[10.5px] font-medium text-slate-500">
                      {row.k}
                    </p>
                    <p className="mt-0.5 text-xs font-bold text-slate-900">
                      {row.v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: 2x2 Feature Grid */}
          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              ডিসকাউন্টের সাথেও পূর্ণ সার্ভিস কোয়ালিটি
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold leading-[1.22] tracking-tight text-slate-900 sm:text-3xl">
              অফার প্ল্যানেও কোনো স্পিড বা ফিচার কাটছাঁট নেই
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              প্রোমো কোড ব্যবহার করলেও আপনি আমাদের রেগুলার সার্ভারের মতোই একই
              ডেডিকেটেড হার্ডওয়্যার, ক্লিন রেসিডেন্সিয়াল IP এবং ২৪/৭ বনানী
              সাপোর্ট পাবেন।
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {FEATURES.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs transition-shadow hover:shadow-sm"
                >
                  <div className="inline-flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <item.icon size={19} />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
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
