import {
  getAdminState,
  saveAdminState,
  type AdminUser,
} from "@/lib/services/admin-store";

export type ExtendedUserRole = "USER" | "RESELLER" | "SUPPORT" | "ADMIN";
export type UserSortField =
  | "newest"
  | "spend_desc"
  | "wallet_desc"
  | "vms_desc"
  | "name_asc";

export interface ManagedUser extends Omit<AdminUser, "role"> {
  role: ExtendedUserRole;
  emailVerified?: boolean;
  // Reseller-specific
  agencyName?: string;
  resellerDiscount?: number;
  customDomain?: string;
  // Support-specific
  department?: "Technical Ops" | "Billing & Payments" | "IP & Abuse";
  permissions?: string[];
  // Admin-specific
  adminLevel?: "OPS_ADMIN" | "SUPER_ADMIN";
}

export interface GetUsersParams {
  search?: string;
  role?: "ALL" | ExtendedUserRole;
  status?: "ALL" | "ACTIVE" | "SUSPENDED";
  sort?: UserSortField;
  page?: number;
  limit?: number;
}

export interface PaginatedUsersResponse {
  items: ManagedUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  stats: {
    totalUsers: number;
    resellers: number;
    suspended: number;
    totalWalletBdt: number;
  };
}

export interface CreateUserInput {
  name: string;
  email: string;
  phone: string;
  role: ExtendedUserRole;
  resellerDiscount?: number;
  walletBalanceBdt?: number;
  emailVerified?: boolean;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  phone?: string;
  role?: ExtendedUserRole;
  resellerDiscount?: number;
  status?: "ACTIVE" | "SUSPENDED";
  emailVerified?: boolean;
}

function readAllUsers(): ManagedUser[] {
  return getAdminState().users as ManagedUser[];
}

function writeAllUsers(users: ManagedUser[]) {
  const current = getAdminState();
  saveAdminState({
    ...current,
    users: users as AdminUser[],
  });
}

/**
 * GET /api/v1/admin/users?search=&role=&status=&sort=&page=&limit=
 */
export function getUsers(params: GetUsersParams = {}): PaginatedUsersResponse {
  const {
    search = "",
    role = "ALL",
    status = "ALL",
    sort = "newest",
    page = 1,
    limit = 10,
  } = params;

  const all = readAllUsers();

  // Global stats (independent of active filters)
  const stats = {
    totalUsers: all.length,
    resellers: all.filter((u) => u.role === "RESELLER").length,
    suspended: all.filter((u) => u.status === "SUSPENDED").length,
    totalWalletBdt: all.reduce((sum, u) => sum + u.walletBalanceBdt, 0),
  };

  // 1. Filter + Search
  const q = search.trim().toLowerCase();
  let filtered = all.filter((u) => {
    const matchRole = role === "ALL" || u.role === role;
    const matchStatus = status === "ALL" || u.status === status;
    const matchQuery =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.phone.toLowerCase().includes(q) ||
      u.id.toLowerCase().includes(q);
    return matchRole && matchStatus && matchQuery;
  });

  // 2. Sort
  filtered = [...filtered].sort((a, b) => {
    switch (sort) {
      case "spend_desc":
        return b.totalSpentBdt - a.totalSpentBdt;
      case "wallet_desc":
        return b.walletBalanceBdt - a.walletBalanceBdt;
      case "vms_desc":
        return b.activeVms - a.activeVms;
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "newest":
      default:
        return 0; // preserve insertion order (newest first)
    }
  });

  // 3. Paginate
  const total = filtered.length;
  const safeLimit = Math.max(1, limit);
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * safeLimit;

  return {
    items: filtered.slice(start, start + safeLimit),
    total,
    page: safePage,
    limit: safeLimit,
    totalPages,
    stats,
  };
}

/**
 * GET /api/v1/admin/users/:id
 */
export function getUserById(id: string): ManagedUser | null {
  return readAllUsers().find((u) => u.id === id) ?? null;
}

/**
 * POST /api/v1/admin/users
 */
export function createUser(input: CreateUserInput): ManagedUser {
  const all = readAllUsers();
  const normalizedEmail = input.email.trim().toLowerCase();

  if (all.some((u) => u.email.toLowerCase() === normalizedEmail)) {
    throw new Error("A user with this email already exists.");
  }

  const created: ManagedUser = {
    id: `usr-${Date.now().toString().slice(-5)}`,
    name: input.name.trim(),
    email: normalizedEmail,
    phone: input.phone.trim(),
    role: input.role,
    resellerDiscount:
      input.role === "RESELLER" ? Number(input.resellerDiscount ?? 10) : 0,
    emailVerified: input.emailVerified ?? true,
    activeVms: 0,
    walletBalanceBdt: Math.max(0, Number(input.walletBalanceBdt ?? 0)),
    totalSpentBdt: 0,
    status: "ACTIVE",
    joinedAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  };

  writeAllUsers([created, ...all]);
  return created;
}

/**
 * PATCH /api/v1/admin/users/:id
 */
export function updateUser(
  id: string,
  input: UpdateUserInput,
): ManagedUser | null {
  const all = readAllUsers();
  const target = all.find((u) => u.id === id);
  if (!target) return null;

  if (input.email) {
    const normalizedEmail = input.email.trim().toLowerCase();
    const duplicate = all.some(
      (u) => u.id !== id && u.email.toLowerCase() === normalizedEmail,
    );
    if (duplicate) {
      throw new Error("Another user already uses this email.");
    }
  }

  const updated: ManagedUser = {
    ...target,
    ...(input.name !== undefined ? { name: input.name.trim() } : {}),
    ...(input.email !== undefined
      ? { email: input.email.trim().toLowerCase() }
      : {}),
    ...(input.phone !== undefined ? { phone: input.phone.trim() } : {}),
    ...(input.role !== undefined ? { role: input.role } : {}),
    ...(input.resellerDiscount !== undefined
      ? { resellerDiscount: Number(input.resellerDiscount) }
      : {}),
    ...(input.status !== undefined ? { status: input.status } : {}),
    ...(input.emailVerified !== undefined
      ? { emailVerified: input.emailVerified }
      : {}),
  };

  writeAllUsers(all.map((u) => (u.id === id ? updated : u)));
  return updated;
}

/**
 * DELETE /api/v1/admin/users/:id
 */
export function deleteUser(id: string): boolean {
  const all = readAllUsers();
  const exists = all.some((u) => u.id === id);
  if (!exists) return false;
  writeAllUsers(all.filter((u) => u.id !== id));
  return true;
}

/**
 * POST /api/v1/admin/users/:id/wallet
 */
export function adjustUserWallet(
  id: string,
  amountBdt: number,
  type: "CREDIT" | "DEBIT",
): ManagedUser | null {
  const all = readAllUsers();
  const target = all.find((u) => u.id === id);
  if (!target) return null;

  const delta = Math.abs(Number(amountBdt));
  const nextBalance =
    type === "CREDIT"
      ? target.walletBalanceBdt + delta
      : Math.max(0, target.walletBalanceBdt - delta);

  const updated: ManagedUser = {
    ...target,
    walletBalanceBdt: nextBalance,
  };

  writeAllUsers(all.map((u) => (u.id === id ? updated : u)));
  return updated;
}