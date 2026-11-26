"use client";

import { UserFormModal } from "@/components/admin/UserFormModal";
import { useCurrency } from "@/lib/currency";
import { getAdminState, type AdminOrder } from "@/lib/services/admin-store";
import {
  adjustUserWallet,
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  type CreateUserInput,
  type ExtendedUserRole,
  type ManagedUser,
  type PaginatedUsersResponse,
  type UpdateUserInput,
  type UserSortField,
} from "@/lib/services/admin-users";
import {
  AlertTriangle,
  ArrowUpDown,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Eye,
  MessageCircle,
  Plus,
  Search,
  ShieldAlert,
  Trash2,
  UserCheck,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const ROLE_STYLES: Record<ExtendedUserRole, string> = {
  USER: "bg-blue-50 text-blue-700",
  RESELLER: "bg-indigo-50 text-indigo-700",
  SUPPORT: "bg-amber-50 text-amber-700",
  ADMIN: "bg-slate-900 text-amber-300",
};

export default function AdminUsersPage() {
  const { formatPrice } = useCurrency();

  // Query state (Search, Filter, Sort, Pagination)
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | ExtendedUserRole>("ALL");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "ACTIVE" | "SUSPENDED"
  >("ALL");
  const [sort, setSort] = useState<UserSortField>("newest");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // Data state
  const [data, setData] = useState<PaginatedUsersResponse | null>(null);
  const [allOrders, setAllOrders] = useState<AdminOrder[]>([]);

  // Modals & Drawer state
  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<ManagedUser | null>(null);

  const [inspectId, setInspectId] = useState<string | null>(null);
  const [walletTarget, setWalletTarget] = useState<ManagedUser | null>(null);
  const [walletType, setWalletType] = useState<"CREDIT" | "DEBIT">("CREDIT");
  const [walletAmount, setWalletAmount] = useState(5000);
  const [deleteTarget, setDeleteTarget] = useState<ManagedUser | null>(null);

  const refresh = useCallback(() => {
    setData(
      getUsers({
        search,
        role: roleFilter,
        status: statusFilter,
        sort,
        page,
        limit,
      }),
    );
    setAllOrders(getAdminState().orders);
  }, [search, roleFilter, statusFilter, sort, page, limit]);

  useEffect(() => {
    refresh();
    window.addEventListener("admin-store-updated", refresh);
    return () => window.removeEventListener("admin-store-updated", refresh);
  }, [refresh]);

  if (!data) return null;

  const inspectedUser = inspectId ? getUserById(inspectId) : null;
  const inspectedOrders = inspectedUser
    ? allOrders.filter(
        (o) =>
          o.customerEmail.toLowerCase() === inspectedUser.email.toLowerCase(),
      )
    : [];

  // Handlers
  const openCreateModal = () => {
    setEditingUser(null);
    setFormOpen(true);
  };

  const openEditModal = (user: ManagedUser) => {
    setEditingUser(user);
    setFormOpen(true);
  };

  const handleCreateUser = (input: CreateUserInput) => {
    try {
      createUser(input);
      toast.success(`Created ${input.role} account for ${input.name}`);
      setPage(1);
      setFormOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create user");
    }
  };

  const handleUpdateUser = (id: string, input: UpdateUserInput) => {
    try {
      updateUser(id, input);
      toast.success(`Updated ${input.name ?? "user"}`);
      setFormOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update user");
    }
  };

  const handleConfirmWallet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletTarget || walletAmount <= 0) return;
    adjustUserWallet(walletTarget.id, walletAmount, walletType);
    toast.success(
      `${walletType === "CREDIT" ? "Credited" : "Debited"} ${formatPrice(walletAmount)} ${walletType === "CREDIT" ? "to" : "from"} ${walletTarget.name}`,
    );
    setWalletTarget(null);
    setWalletAmount(5000);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    deleteUser(deleteTarget.id);
    toast.success(`Deleted user ${deleteTarget.name}`);
    if (inspectId === deleteTarget.id) setInspectId(null);
    setDeleteTarget(null);
  };

  const startItem = data.total === 0 ? 0 : (data.page - 1) * data.limit + 1;
  const endItem = Math.min(data.page * data.limit, data.total);

  return (
    <div className="space-y-5">
      {/* 1. Clean Uniform KPI Cards */}
      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Total Customers
            </span>
            <Users size={16} className="text-blue-600" />
          </div>
          <p className="mt-2 font-display text-2xl font-black text-slate-900">
            {data.stats.totalUsers}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Reseller Partners
            </span>
            <UserCheck size={16} className="text-indigo-600" />
          </div>
          <p className="mt-2 font-display text-2xl font-black text-slate-900">
            {data.stats.resellers}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">
              Wallet Liability
            </span>
            <Wallet size={16} className="text-emerald-600" />
          </div>
          <p className="mt-2 font-display text-2xl font-black text-slate-900">
            {formatPrice(data.stats.totalWalletBdt)}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Suspended</span>
            <ShieldAlert size={16} className="text-rose-600" />
          </div>
          <p className="mt-2 font-display text-2xl font-black text-rose-600">
            {data.stats.suspended}
          </p>
        </div>
      </div>

      {/* 2. Toolbar: Search, Role Filter, Status Filter, Sort & Add User */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search
              size={14}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search name, email, phone…"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 pr-3 pl-9 text-xs text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value as "ALL" | ExtendedUserRole);
              setPage(1);
            }}
            aria-label="Filter by role"
            className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none"
          >
            <option value="ALL">All Roles</option>
            <option value="USER">Client</option>
            <option value="RESELLER">Reseller</option>
            <option value="SUPPORT">Support</option>
            <option value="ADMIN">Admin</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as "ALL" | "ACTIVE" | "SUSPENDED");
              setPage(1);
            }}
            aria-label="Filter by status"
            className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="SUSPENDED">Suspended</option>
          </select>

          {/* Sort */}
          <div className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs">
            <ArrowUpDown size={13} className="text-slate-400" />
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as UserSortField);
                setPage(1);
              }}
              aria-label="Sort users"
              className="cursor-pointer bg-transparent font-semibold text-slate-700 focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="spend_desc">Highest Spend</option>
              <option value="wallet_desc">Highest Wallet</option>
              <option value="vms_desc">Most VMs</option>
              <option value="name_asc">Name (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Create User CTA */}
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-600"
        >
          <Plus size={14} /> Add User
        </button>
      </div>

      {/* 3. Clean Non-Wrapping Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[840px] text-left text-xs">
            <thead className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3">Customer</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Active VMs</th>
                <th className="px-4 py-3">Total Spend</th>
                <th className="px-4 py-3 whitespace-nowrap">Wallet</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.items.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-xs font-semibold text-slate-500"
                  >
                    No users found matching your filters.
                  </td>
                </tr>
              ) : (
                data.items.map((user) => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-extrabold text-white ${
                            user.role === "RESELLER"
                              ? "bg-indigo-600"
                              : user.role === "ADMIN"
                                ? "bg-slate-900"
                                : user.role === "SUPPORT"
                                  ? "bg-amber-600"
                                  : "bg-blue-600"
                          }`}
                        >
                          {user.name.slice(0, 2).toUpperCase()}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setInspectId(user.id)}
                              className="cursor-pointer truncate font-bold text-slate-900 hover:text-blue-600 hover:underline"
                            >
                              {user.name}
                            </button>
                            {user.emailVerified !== false && (
                              <BadgeCheck
                                size={13}
                                className="shrink-0 text-blue-500"
                              />
                            )}
                          </div>
                          <p className="truncate text-[11px] text-slate-500">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span
                        className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${
                          ROLE_STYLES[user.role]
                        }`}
                      >
                        {user.role === "USER" ? "CLIENT" : user.role}
                        {user.role === "RESELLER" && user.resellerDiscount
                          ? ` · ${user.resellerDiscount}%`
                          : ""}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 font-mono font-bold text-slate-700">
                      {user.activeVms}
                    </td>

                    <td className="px-4 py-3.5 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {formatPrice(user.totalSpentBdt)}
                    </td>

                    <td className="px-4 py-3.5 font-mono font-bold text-emerald-700 whitespace-nowrap">
                      {formatPrice(user.walletBalanceBdt)}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10.5px] font-bold ${
                          user.status === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            user.status === "ACTIVE"
                              ? "bg-emerald-500"
                              : "bg-rose-500"
                          }`}
                        />
                        {user.status}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setInspectId(user.id)}
                          title="Inspect User"
                          className="grid size-7 cursor-pointer place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEditModal(user)}
                          title="Edit User"
                          className="grid size-7 cursor-pointer place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                        >
                          <Edit3 size={13} />
                        </button>
                        {(user.role === "USER" || user.role === "RESELLER") && (
                          <button
                            type="button"
                            onClick={() => {
                              setWalletTarget(user);
                              setWalletType("CREDIT");
                              setWalletAmount(5000);
                            }}
                            title="Adjust Wallet"
                            className="grid size-7 cursor-pointer place-items-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          >
                            <Wallet size={13} />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(user)}
                          title="Delete User"
                          className="grid size-7 cursor-pointer place-items-center rounded-lg border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Pagination Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>
              Showing{" "}
              <strong className="text-slate-800">
                {startItem}–{endItem}
              </strong>{" "}
              of <strong className="text-slate-800">{data.total}</strong>
            </span>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              aria-label="Rows per page"
              className="cursor-pointer rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700"
            >
              <option value={5}>5 / page</option>
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={data.page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={13} /> Prev
            </button>
            <span className="px-2 font-mono text-xs font-bold text-slate-700">
              {data.page} / {data.totalPages}
            </span>
            <button
              type="button"
              disabled={data.page >= data.totalPages}
              onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
              className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Role-Based Create / Update User Modal */}
      <UserFormModal
        open={formOpen}
        editingUser={editingUser}
        onClose={() => setFormOpen(false)}
        onCreate={handleCreateUser}
        onUpdate={handleUpdateUser}
      />

      {/* Wallet Credit / Debit Modal */}
      {walletTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
          onClick={() => setWalletTarget(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="font-display text-sm font-extrabold text-slate-900">
                  Adjust Wallet Balance
                </h2>
                <p className="text-[11px] text-slate-500">
                  {walletTarget.name} · Balance:{" "}
                  {formatPrice(walletTarget.walletBalanceBdt)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setWalletTarget(null)}
                className="grid size-7 cursor-pointer place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleConfirmWallet} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setWalletType("CREDIT")}
                  className={`cursor-pointer rounded-lg py-1.5 ${
                    walletType === "CREDIT"
                      ? "bg-emerald-600 text-white"
                      : "text-slate-600"
                  }`}
                >
                  + Credit
                </button>
                <button
                  type="button"
                  onClick={() => setWalletType("DEBIT")}
                  className={`cursor-pointer rounded-lg py-1.5 ${
                    walletType === "DEBIT"
                      ? "bg-rose-600 text-white"
                      : "text-slate-600"
                  }`}
                >
                  − Debit
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700">
                  Amount (BDT)
                </label>
                <input
                  type="number"
                  min={100}
                  step={100}
                  required
                  value={walletAmount}
                  onChange={(e) => setWalletAmount(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm font-bold text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setWalletTarget(null)}
                  className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-bold text-white ${
                    walletType === "CREDIT"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-rose-600 hover:bg-rose-700"
                  }`}
                >
                  Confirm {walletType === "CREDIT" ? "Credit" : "Debit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-rose-50 text-rose-600">
                <AlertTriangle size={18} />
              </span>
              <div>
                <h2 className="font-display text-sm font-extrabold text-slate-900">
                  Delete {deleteTarget.name}?
                </h2>
                <p className="mt-1 text-xs text-slate-600">
                  This removes <strong>{deleteTarget.email}</strong> (
                  {deleteTarget.activeVms} active VMs) from the active
                  directory.
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="cursor-pointer rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inspect User Slide-Over Drawer (getUserById) */}
      {inspectedUser && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-xs"
          onClick={() => setInspectId(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-base font-extrabold text-slate-900">
                    {inspectedUser.name}
                  </h2>
                  <span
                    className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                      ROLE_STYLES[inspectedUser.role]
                    }`}
                  >
                    {inspectedUser.role}
                  </span>
                </div>
                <p className="font-mono text-[11px] text-slate-500">
                  {inspectedUser.id} · {inspectedUser.email}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setInspectId(null)}
                className="grid size-8 cursor-pointer place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              {/* Role-Specific Summary */}
              {inspectedUser.role === "RESELLER" && (
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-3.5 text-xs">
                  <p className="font-bold text-indigo-900">
                    Reseller Tier: {inspectedUser.resellerDiscount ?? 10}% Wholesale Discount
                  </p>
                  {inspectedUser.customDomain && (
                    <p className="mt-0.5 font-mono text-[11px] text-indigo-700">
                      Portal Domain: {inspectedUser.customDomain}
                    </p>
                  )}
                </div>
              )}

              {inspectedUser.role === "SUPPORT" && (
                <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-3.5 text-xs">
                  <p className="font-bold text-amber-900">
                    Department: {inspectedUser.department ?? "Technical Ops"}
                  </p>
                  {inspectedUser.permissions && inspectedUser.permissions.length > 0 && (
                    <p className="mt-1 font-mono text-[11px] text-amber-800">
                      Permissions: {inspectedUser.permissions.join(", ")}
                    </p>
                  )}
                </div>
              )}

              {inspectedUser.role === "ADMIN" && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs">
                  <p className="font-bold text-slate-900">
                    Access Level: {inspectedUser.adminLevel ?? "OPS_ADMIN"}
                  </p>
                </div>
              )}

              {/* Financial Stats (Clients & Resellers) */}
              {(inspectedUser.role === "USER" ||
                inspectedUser.role === "RESELLER") && (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      Wallet Balance
                    </span>
                    <p className="mt-1 font-mono text-base font-black text-emerald-700">
                      {formatPrice(inspectedUser.walletBalanceBdt)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      Total Spend
                    </span>
                    <p className="mt-1 font-mono text-base font-black text-slate-900">
                      {formatPrice(inspectedUser.totalSpentBdt)}
                    </p>
                  </div>
                </div>
              )}

              {/* WhatsApp Direct */}
              <a
                href={`https://wa.me/${inspectedUser.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-xs font-bold text-emerald-800 hover:bg-emerald-100/70"
              >
                <span className="flex items-center gap-2">
                  <MessageCircle size={15} />
                  WhatsApp: {inspectedUser.phone}
                </span>
                <span className="text-[11px] underline">Open Chat</span>
              </a>

              {/* Linked Orders */}
              {(inspectedUser.role === "USER" ||
                inspectedUser.role === "RESELLER") && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Recent Orders ({inspectedOrders.length})
                  </h3>
                  {inspectedOrders.length === 0 ? (
                    <p className="mt-2 rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-500">
                      No orders found for this user.
                    </p>
                  ) : (
                    <div className="mt-2 space-y-2">
                      {inspectedOrders.map((ord) => (
                        <div
                          key={ord.id}
                          className="rounded-xl border border-slate-200/80 p-3 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-slate-900">
                              {ord.orderNumber}
                            </span>
                            <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-700">
                              {ord.status}
                            </span>
                          </div>
                          <p className="mt-1 font-semibold text-slate-700">
                            {ord.planName} ({ord.country.toUpperCase()})
                          </p>
                          <p className="mt-0.5 font-mono text-[11px] text-slate-500">
                            {formatPrice(ord.totalBdt)} · {ord.gateway}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-slate-100 p-4">
              <button
                type="button"
                onClick={() => openEditModal(inspectedUser)}
                className="flex-1 cursor-pointer rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-blue-600"
              >
                Edit Profile
              </button>
              <button
                type="button"
                onClick={() => setDeleteTarget(inspectedUser)}
                className="cursor-pointer rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}