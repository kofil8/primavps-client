"use client";

import type {
  CreateUserInput,
  ExtendedUserRole,
  ManagedUser,
  UpdateUserInput,
} from "@/lib/services/admin-users";
import {
  Briefcase,
  Headphones,
  ShieldAlert,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

interface UserFormModalProps {
  open: boolean;
  editingUser: ManagedUser | null;
  onClose: () => void;
  onCreate: (input: CreateUserInput) => void;
  onUpdate: (id: string, input: UpdateUserInput) => void;
}

const ROLE_TABS: {
  id: ExtendedUserRole;
  label: string;
  icon: typeof User;
  accent: string;
}[] = [
  { id: "USER", label: "Client", icon: User, accent: "bg-blue-600 text-white" },
  {
    id: "RESELLER",
    label: "Reseller",
    icon: Briefcase,
    accent: "bg-indigo-600 text-white",
  },
  {
    id: "SUPPORT",
    label: "Support",
    icon: Headphones,
    accent: "bg-amber-600 text-white",
  },
  {
    id: "ADMIN",
    label: "Admin",
    icon: ShieldAlert,
    accent: "bg-slate-900 text-amber-300",
  },
];

const SUPPORT_PERMS = [
  { id: "provision_orders", label: "Provision Orders" },
  { id: "approve_ip_swaps", label: "Approve IP Swaps" },
  { id: "reply_tickets", label: "Reply Tickets" },
  { id: "view_users", label: "View Customers" },
];

export function UserFormModal({
  open,
  editingUser,
  onClose,
  onCreate,
  onUpdate,
}: UserFormModalProps) {
  const [role, setRole] = useState<ExtendedUserRole>("USER");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+880");
  const [status, setStatus] = useState<"ACTIVE" | "SUSPENDED">("ACTIVE");
  const [emailVerified, setEmailVerified] = useState(true);

  // Client / Reseller
  const [walletBalanceBdt, setWalletBalanceBdt] = useState(0);

  // Reseller only
  const [agencyName, setAgencyName] = useState("");
  const [resellerDiscount, setResellerDiscount] = useState(10);
  const [customDomain, setCustomDomain] = useState("");

  // Support only
  const [department, setDepartment] = useState<
    "Technical Ops" | "Billing & Payments" | "IP & Abuse"
  >("Technical Ops");
  const [permissions, setPermissions] = useState<string[]>([
    "provision_orders",
    "reply_tickets",
  ]);

  // Admin only
  const [adminLevel, setAdminLevel] = useState<"OPS_ADMIN" | "SUPER_ADMIN">(
    "OPS_ADMIN",
  );

  useEffect(() => {
    if (!open) return;
    if (editingUser) {
      setRole(editingUser.role);
      setName(editingUser.name);
      setEmail(editingUser.email);
      setPhone(editingUser.phone);
      setStatus(editingUser.status);
      setEmailVerified(editingUser.emailVerified ?? true);
      setWalletBalanceBdt(editingUser.walletBalanceBdt);
      setAgencyName(editingUser.agencyName ?? editingUser.name);
      setResellerDiscount(editingUser.resellerDiscount ?? 10);
      setCustomDomain(editingUser.customDomain ?? "");
      setDepartment(editingUser.department ?? "Technical Ops");
      setPermissions(
        editingUser.permissions ?? ["provision_orders", "reply_tickets"],
      );
      setAdminLevel(editingUser.adminLevel ?? "OPS_ADMIN");
    } else {
      setRole("USER");
      setName("");
      setEmail("");
      setPhone("+880");
      setStatus("ACTIVE");
      setEmailVerified(true);
      setWalletBalanceBdt(0);
      setAgencyName("");
      setResellerDiscount(10);
      setCustomDomain("");
      setDepartment("Technical Ops");
      setPermissions(["provision_orders", "reply_tickets"]);
      setAdminLevel("OPS_ADMIN");
    }
  }, [open, editingUser]);

  if (!open) return null;

  const togglePerm = (permId: string) => {
    setPermissions((prev) =>
      prev.includes(permId)
        ? prev.filter((p) => p !== permId)
        : [...prev, permId],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName =
      role === "RESELLER" && agencyName.trim()
        ? agencyName.trim()
        : name.trim();

    if (editingUser) {
      onUpdate(editingUser.id, {
        name: displayName,
        email,
        phone,
        role,
        status,
        emailVerified,
        ...(role === "RESELLER"
          ? { agencyName: agencyName.trim(), resellerDiscount, customDomain }
          : {}),
        ...(role === "SUPPORT" ? { department, permissions } : {}),
        ...(role === "ADMIN" ? { adminLevel } : {}),
      });
    } else {
      onCreate({
        name: displayName,
        email,
        phone,
        role,
        emailVerified,
        ...(role === "USER" ? { walletBalanceBdt } : {}),
        ...(role === "RESELLER"
          ? {
              agencyName: agencyName.trim(),
              resellerDiscount,
              walletBalanceBdt,
              customDomain,
            }
          : {}),
        ...(role === "SUPPORT" ? { department, permissions } : {}),
        ...(role === "ADMIN" ? { adminLevel } : {}),
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="font-display text-sm font-extrabold text-slate-900">
              {editingUser
                ? `Update ${ROLE_TABS.find((t) => t.id === role)?.label} Account`
                : "Create New Account"}
            </h2>
            <p className="text-[11px] text-slate-500">
              {editingUser
                ? `Editing ${editingUser.email}`
                : "Select account role to load role-specific fields."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-7 cursor-pointer place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
          >
            <X size={16} />
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="mt-4 grid grid-cols-4 gap-1.5 rounded-xl bg-slate-100 p-1">
          {ROLE_TABS.map((t) => {
            const Icon = t.icon;
            const active = role === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setRole(t.id)}
                className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-bold transition-all ${
                  active ? t.accent : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Icon size={13} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Role-Based Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {/* ─── RESELLER: Agency Name ─── */}
          {role === "RESELLER" ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Agency / Company Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Dhaka Digital Agency"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Contact Person
                </label>
                <input
                  type="text"
                  required
                  placeholder="Owner / Manager name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-700">
                {role === "USER"
                  ? "Client Full Name"
                  : role === "SUPPORT"
                    ? "Support Staff Name"
                    : "Admin Full Name"}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
          )}

          {/* Common: Email & Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700">
                {role === "SUPPORT" || role === "ADMIN"
                  ? "Work Email"
                  : "Email Address"}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700">
                Phone / WhatsApp
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>

          {/* ─── ROLE-SPECIFIC BLOCK: CLIENT ─── */}
          {role === "USER" && !editingUser && (
            <div>
              <label className="block text-xs font-bold text-slate-700">
                Initial Wallet Credit (BDT, optional)
              </label>
              <input
                type="number"
                min={0}
                step={100}
                value={walletBalanceBdt}
                onChange={(e) => setWalletBalanceBdt(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
              />
            </div>
          )}

          {/* ─── ROLE-SPECIFIC BLOCK: RESELLER ─── */}
          {role === "RESELLER" && (
            <div className="space-y-3 rounded-xl border border-indigo-100 bg-indigo-50/40 p-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-indigo-900">
                    Wholesale Discount (%)
                  </label>
                  <select
                    value={resellerDiscount}
                    onChange={(e) =>
                      setResellerDiscount(Number(e.target.value))
                    }
                    className="mt-1 w-full rounded-xl border border-indigo-200 bg-white px-3 py-2 font-mono text-xs font-bold text-slate-900 focus:border-indigo-600 focus:outline-none"
                  >
                    <option value={10}>10% (Silver · 10+ VMs)</option>
                    <option value={15}>15% (Gold · 25+ VMs)</option>
                    <option value={20}>20% (Platinum · 50+ VMs)</option>
                  </select>
                </div>

                {!editingUser ? (
                  <div>
                    <label className="block text-xs font-bold text-indigo-900">
                      Initial Prepaid Wallet (BDT)
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={500}
                      value={walletBalanceBdt}
                      onChange={(e) =>
                        setWalletBalanceBdt(Number(e.target.value))
                      }
                      className="mt-1 w-full rounded-xl border border-indigo-200 bg-white px-3 py-2 font-mono text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-indigo-900">
                      White-Label Domain
                    </label>
                    <input
                      type="text"
                      placeholder="portal.agency.com"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-indigo-200 bg-white px-3 py-2 font-mono text-xs text-slate-900 focus:border-indigo-600 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── ROLE-SPECIFIC BLOCK: SUPPORT ─── */}
          {role === "SUPPORT" && (
            <div className="space-y-3 rounded-xl border border-amber-200/80 bg-amber-50/40 p-3.5">
              <div>
                <label className="block text-xs font-bold text-amber-900">
                  Support Department
                </label>
                <select
                  value={department}
                  onChange={(e) =>
                    setDepartment(
                      e.target.value as
                        | "Technical Ops"
                        | "Billing & Payments"
                        | "IP & Abuse",
                    )
                  }
                  className="mt-1 w-full rounded-xl border border-amber-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-amber-600 focus:outline-none"
                >
                  <option value="Technical Ops">Technical Ops</option>
                  <option value="Billing & Payments">Billing &amp; Payments</option>
                  <option value="IP & Abuse">IP &amp; Abuse</option>
                </select>
              </div>

              <div>
                <p className="text-[11px] font-bold text-amber-900">
                  Staff Permissions
                </p>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  {SUPPORT_PERMS.map((p) => (
                    <label
                      key={p.id}
                      className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={permissions.includes(p.id)}
                        onChange={() => togglePerm(p.id)}
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─── ROLE-SPECIFIC BLOCK: ADMIN ─── */}
          {role === "ADMIN" && (
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
              <label className="block text-xs font-bold text-slate-800">
                Admin Access Level
              </label>
              <select
                value={adminLevel}
                onChange={(e) =>
                  setAdminLevel(
                    e.target.value as "OPS_ADMIN" | "SUPER_ADMIN",
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-slate-900 focus:outline-none"
              >
                <option value="OPS_ADMIN">Operations Admin (No Billing Delete)</option>
                <option value="SUPER_ADMIN">Super Admin (Full System Access)</option>
              </select>
              <p className="text-[11px] text-slate-500">
                Admin accounts automatically enforce audit logging on all actions.
              </p>
            </div>
          )}

          {/* Status (Update Mode) + Verified */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={emailVerified}
                onChange={(e) => setEmailVerified(e.target.checked)}
              />
              <span>Email Verified</span>
            </label>

            {editingUser && (
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-slate-600">Status:</span>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as "ACTIVE" | "SUSPENDED")
                  }
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-800"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="SUSPENDED">Suspended</option>
                </select>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
            >
              {editingUser ? "Save Changes" : `Create ${ROLE_TABS.find((t) => t.id === role)?.label}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}