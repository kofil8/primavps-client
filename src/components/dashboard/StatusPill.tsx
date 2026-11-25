type Tone = "green" | "blue" | "amber" | "red" | "slate";

export type PillStatus =
  | "active"
  | "running"
  | "provisioning"
  | "stopped"
  | "paid"
  | "unpaid"
  | "due"
  | "overdue"
  | "open"
  | "resolved"
  | "closed";

const TONE_CLASSES: Record<Tone, string> = {
  green: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  blue: "bg-blue-50 text-blue-700 ring-blue-600/20",
  amber: "bg-amber-50 text-amber-700 ring-amber-600/20",
  red: "bg-red-50 text-red-700 ring-red-600/20",
  slate: "bg-slate-100 text-slate-600 ring-slate-500/15",
};

const STATUS_MAP: Record<PillStatus, { tone: Tone; label: string }> = {
  active: { tone: "green", label: "Active" },
  running: { tone: "green", label: "Running" },
  provisioning: { tone: "amber", label: "Provisioning" },
  stopped: { tone: "slate", label: "Stopped" },
  paid: { tone: "green", label: "Paid" },
  unpaid: { tone: "amber", label: "Unpaid" },
  due: { tone: "amber", label: "Due" },
  overdue: { tone: "red", label: "Overdue" },
  open: { tone: "blue", label: "Open" },
  resolved: { tone: "green", label: "Resolved" },
  closed: { tone: "slate", label: "Closed" },
};

export function StatusPill({
  tone,
  status,
  children,
}: {
  tone?: Tone;
  status?: PillStatus;
  children?: React.ReactNode;
}) {
  const mapped = status ? STATUS_MAP[status] : undefined;
  const resolvedTone = tone ?? mapped?.tone ?? "slate";
  const resolvedLabel = children ?? mapped?.label ?? status ?? "Unknown";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${TONE_CLASSES[resolvedTone]}`}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {resolvedLabel}
    </span>
  );
}
