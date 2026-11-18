import { Reveal } from "@/components/ui/reveal";

const STATS = [
  { value: "99.98%", label: "Uptime SLA" },
  { value: "90s", label: "Average deploy" },
  { value: "3 min", label: "First support reply" },
  { value: "850+", label: "Servers online" },
];

export function MetricBar() {
  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="shell grid grid-cols-2 gap-8 py-10 sm:grid-cols-4">
        {STATS.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.07}>
            <p className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
