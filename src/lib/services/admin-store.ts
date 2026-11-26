export type AdminOrderStatus =
  | "PROVISIONING"
  | "ACTIVE"
  | "PENDING_PAYMENT"
  | "SUSPENDED"
  | "CANCELLED";

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerRole: "USER" | "RESELLER";
  productType: "ISP_VPS" | "CLOUD_VPS";
  planName: string;
  country: "us" | "uk" | "de" | "fr";
  carrier: string;
  os: string;
  totalBdt: number;
  gateway: "bKash" | "SSLCommerz" | "Nagad" | "Wallet";
  gatewayTranId: string;
  status: AdminOrderStatus;
  ipAddress?: string;
  rdpPort?: number;
  username?: string;
  password?: string;
  createdAt: string;
}

export interface AdminIpSwap {
  id: string;
  instanceName: string;
  customerName: string;
  customerEmail: string;
  country: "us" | "uk" | "de" | "fr";
  carrier: string;
  oldIp: string;
  newIp?: string;
  reason: string;
  isFree: boolean;
  feeBdt: number;
  status: "PENDING" | "COMPLETED" | "REJECTED";
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "USER" | "RESELLER";
  activeVms: number;
  walletBalanceBdt: number;
  totalSpentBdt: number;
  status: "ACTIVE" | "SUSPENDED";
  joinedAt: string;
}

export interface AdminCoupon {
  id: string;
  code: string;
  discountPercent: number;
  scope: "ALL" | "ISP_VPS" | "CLOUD_VPS";
  usedCount: number;
  maxUses: number | null;
  expiresAt: string;
  active: boolean;
}

export interface AdminTicket {
  id: string;
  subject: string;
  customerName: string;
  customerEmail: string;
  priority: "HIGH" | "NORMAL";
  status: "OPEN" | "ANSWERED" | "CLOSED";
  lastMessage: string;
  updatedAt: string;
}

export interface AdminIspPlan {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  vcpu: number;
  ramGb: number;
  nvmeGb: number;
  priceBdt: number;
  priceFreshBdt: number;
  stockCount: number;
  isPopular: boolean;
  isActive: boolean;
}

export interface AdminCloudRegion {
  id: string;
  city: string;
  state: string;
  location: string;
  online: boolean;
}

export interface AdminCloudOs {
  id: string;
  name: string;
  subtitle: string;
  minRamGb: number;
  active: boolean;
}

export interface AdminCloudConfig {
  unitRates: {
    perVcpuBdt: number;
    perGbRamBdt: number;
    per10GbNvmeBdt: number;
    residentialIpAddonBdt: number;
  };
  regions: AdminCloudRegion[];
  osImages: AdminCloudOs[];
}

export interface AdminBlogPost {
  id: string;
  slug: string;
  title: string;
  category: "GUIDES" | "IP SECURITY" | "CLOUD & DEVOPS";
  summary: string;
  content: string;
  readTime: string;
  date: string;
  featured: boolean;
  published: boolean;
}

export interface AdminState {
  orders: AdminOrder[];
  ipSwaps: AdminIpSwap[];
  users: AdminUser[];
  coupons: AdminCoupon[];
  tickets: AdminTicket[];
  ispPlans: AdminIspPlan[];
  cloudConfig: AdminCloudConfig;
  blogPosts: AdminBlogPost[];
}

const STORAGE_KEY = "primavps_admin_ops_store_v1";

export const DEFAULT_ADMIN_STATE: AdminState = {
  orders: [
    {
      id: "ord-101",
      orderNumber: "PVPS-2026-0412",
      customerName: "Tanvir Ahmed",
      customerEmail: "tanvir@surveyops.bd",
      customerRole: "USER",
      productType: "ISP_VPS",
      planName: "Popular Pro ISP (4C / 6G)",
      country: "us",
      carrier: "AT&T Residential",
      os: "Windows 11 Pro",
      totalBdt: 3799,
      gateway: "bKash",
      gatewayTranId: "BKX8921044A",
      status: "PROVISIONING",
      createdAt: "4 mins ago",
    },
    {
      id: "ord-102",
      orderNumber: "PVPS-2026-0411",
      customerName: "Dhaka Digital Agency",
      customerEmail: "reseller@primavps.com",
      customerRole: "RESELLER",
      productType: "ISP_VPS",
      planName: "VIP Fresh ASN (4C / 8G)",
      country: "us",
      carrier: "Comcast Xfinity",
      os: "Windows 11 Pro",
      totalBdt: 4499,
      gateway: "Wallet",
      gatewayTranId: "WLT-9048",
      status: "PROVISIONING",
      createdAt: "18 mins ago",
    },
    {
      id: "ord-103",
      orderNumber: "PVPS-2026-0410",
      customerName: "Nusrat Jahan",
      customerEmail: "nusrat@ecomscale.io",
      customerRole: "USER",
      productType: "CLOUD_VPS",
      planName: "Cloud NVMe 4C / 8G",
      country: "de",
      carrier: "Frankfurt KVM",
      os: "Ubuntu 24.04 LTS",
      totalBdt: 2200,
      gateway: "SSLCommerz",
      gatewayTranId: "SSL9941208",
      status: "ACTIVE",
      ipAddress: "80.153.24.90",
      rdpPort: 22,
      username: "root",
      createdAt: "2 hours ago",
    },
    {
      id: "ord-104",
      orderNumber: "PVPS-2026-0409",
      customerName: "Rafiqul Islam",
      customerEmail: "rafiq@remoteqa.net",
      customerRole: "USER",
      productType: "ISP_VPS",
      planName: "Starter ISP (2C / 4G)",
      country: "uk",
      carrier: "BT Broadband",
      os: "Windows 11 Pro",
      totalBdt: 2999,
      gateway: "Nagad",
      gatewayTranId: "NGD773192",
      status: "ACTIVE",
      ipAddress: "86.142.19.44",
      rdpPort: 3389,
      username: "Administrator",
      createdAt: "Yesterday",
    },
  ],
  ipSwaps: [
    {
      id: "swp-201",
      instanceName: "us-att-pro-01",
      customerName: "Mehedi Hasan",
      customerEmail: "mehedi@gmail.com",
      country: "us",
      carrier: "AT&T Residential",
      oldIp: "108.204.142.88",
      reason: "Prolific account flag on Day 3 — requesting clean replacement",
      isFree: true,
      feeBdt: 0,
      status: "PENDING",
      createdAt: "12 mins ago",
    },
    {
      id: "swp-202",
      instanceName: "uk-bt-starter-04",
      customerName: "Rafiqul Islam",
      customerEmail: "rafiq@remoteqa.net",
      country: "uk",
      carrier: "BT Broadband",
      oldIp: "86.142.19.44",
      reason: "Day 14 paid swap — need fresh UK residential range",
      isFree: false,
      feeBdt: 350,
      status: "PENDING",
      createdAt: "47 mins ago",
    },
  ],
  users: [
    {
      id: "usr-01",
      name: "Dhaka Digital Agency",
      email: "reseller@primavps.com",
      phone: "+8801711002233",
      role: "RESELLER",
      activeVms: 14,
      walletBalanceBdt: 48500,
      totalSpentBdt: 184000,
      status: "ACTIVE",
      joinedAt: "Sep 14, 2026",
    },
    {
      id: "usr-02",
      name: "Tanvir Ahmed",
      email: "tanvir@surveyops.bd",
      phone: "+8801711223344",
      role: "USER",
      activeVms: 2,
      walletBalanceBdt: 0,
      totalSpentBdt: 14596,
      status: "ACTIVE",
      joinedAt: "Oct 12, 2026",
    },
    {
      id: "usr-03",
      name: "Nusrat Jahan",
      email: "nusrat@ecomscale.io",
      phone: "+8801812334455",
      role: "USER",
      activeVms: 1,
      walletBalanceBdt: 0,
      totalSpentBdt: 6600,
      status: "ACTIVE",
      joinedAt: "Nov 02, 2026",
    },
  ],
  coupons: [
    {
      id: "cpn-1",
      code: "LAUNCH10",
      discountPercent: 10,
      scope: "ISP_VPS",
      usedCount: 42,
      maxUses: 100,
      expiresAt: "Dec 31, 2026",
      active: true,
    },
    {
      id: "cpn-2",
      code: "PRO12",
      discountPercent: 12,
      scope: "ISP_VPS",
      usedCount: 19,
      maxUses: 50,
      expiresAt: "Dec 31, 2026",
      active: true,
    },
    {
      id: "cpn-3",
      code: "CLOUD15",
      discountPercent: 15,
      scope: "CLOUD_VPS",
      usedCount: 11,
      maxUses: null,
      expiresAt: "Jan 31, 2027",
      active: true,
    },
  ],
  tickets: [
    {
      id: "TKT-882",
      subject: "Need Windows Defender exception for browser profile",
      customerName: "Tanvir Ahmed",
      customerEmail: "tanvir@surveyops.bd",
      priority: "HIGH",
      status: "OPEN",
      lastMessage: "Can you guide me on adding an exclusion folder on my US RDP?",
      updatedAt: "9 mins ago",
    },
    {
      id: "TKT-881",
      subject: "Bulk 10x US AT&T subnet inquiry",
      customerName: "Dhaka Digital Agency",
      customerEmail: "reseller@primavps.com",
      priority: "NORMAL",
      status: "OPEN",
      lastMessage: "We need 10 fresh US IPs from different /24 blocks this week.",
      updatedAt: "1 hour ago",
    },
  ],
  ispPlans: [
    {
      id: "isp-starter",
      slug: "starter",
      name: "Starter ISP VPS",
      tagline: "Entry plan for focused workloads and single accounts.",
      vcpu: 2,
      ramGb: 4,
      nvmeGb: 45,
      priceBdt: 2999,
      priceFreshBdt: 3699,
      stockCount: 8,
      isPopular: false,
      isActive: true,
    },
    {
      id: "isp-pro",
      slug: "pro",
      name: "Pro ISP VPS",
      tagline: "Balanced compute and high-trust residential routing.",
      vcpu: 4,
      ramGb: 6,
      nvmeGb: 60,
      priceBdt: 3799,
      priceFreshBdt: 4499,
      stockCount: 5,
      isPopular: true,
      isActive: true,
    },
    {
      id: "isp-vip",
      slug: "vip",
      name: "VIP Fresh ISP VPS",
      tagline: "100% Brand New Virgin ISP IP with free 7-day replacement.",
      vcpu: 4,
      ramGb: 8,
      nvmeGb: 80,
      priceBdt: 4999,
      priceFreshBdt: 4999,
      stockCount: 3,
      isPopular: false,
      isActive: true,
    },
  ],
  cloudConfig: {
    unitRates: {
      perVcpuBdt: 400,
      perGbRamBdt: 180,
      per10GbNvmeBdt: 40,
      residentialIpAddonBdt: 1200,
    },
    regions: [
      { id: "us-dallas", city: "Dallas", state: "TX", location: "US-Central", online: true },
      { id: "us-ashburn", city: "Ashburn", state: "VA", location: "US-East", online: true },
      { id: "us-chicago", city: "Chicago", state: "IL", location: "US-Midwest", online: true },
    ],
    osImages: [
      { id: "ubuntu-24", name: "Ubuntu 24.04 LTS", subtitle: "Standard cloud image", minRamGb: 1, active: true },
      { id: "debian-12", name: "Debian 12 Bookworm", subtitle: "Minimal footprint", minRamGb: 1, active: true },
      { id: "alma-9", name: "AlmaLinux 9", subtitle: "RHEL-binary compatible", minRamGb: 1, active: true },
      { id: "win-2022", name: "Windows Server 2022", subtitle: "License included", minRamGb: 4, active: true },
      { id: "win-10", name: "Windows 10 Pro", subtitle: "Pre-activated", minRamGb: 4, active: true },
    ],
  },
  blogPosts: [
    {
      id: "post-1",
      slug: "how-to-choose-the-right-vps",
      title: "How to Choose the Right VPS for Your Workload",
      category: "GUIDES",
      summary: "A practical framework for sizing compute, memory, storage, and residential IP requirements before buying.",
      content: "## Sizing Your Workload\n\nStart with RAM requirements first, then match vCPU and residential IP trust.",
      readTime: "8 min read",
      date: "Nov 16, 2026",
      featured: true,
      published: true,
    },
    {
      id: "post-2",
      slug: "understanding-residential-isp-ips",
      title: "Understanding Residential ISP IPs: ASN, Fraud Scores & BGP",
      category: "IP SECURITY",
      summary: "Why datacenter proxies fail anti-fraud checks and how authentic ISP subnets maintain 0/100 risk scores.",
      content: "## ASN Reputation\n\nResidential ISPs like AT&T and Comcast carry consumer ASN trust.",
      readTime: "7 min read",
      date: "Nov 12, 2026",
      featured: false,
      published: true,
    },
    {
      id: "post-3",
      slug: "cloud-server-security-basics",
      title: "Cloud Server Security Basics for Production Instances",
      category: "CLOUD & DEVOPS",
      summary: "Essential hardening steps: SSH key authentication, UFW firewall rules, and automated security patches.",
      content: "## Hardening Checklist\n\nDisable root password login and enforce UFW allowlists.",
      readTime: "5 min read",
      date: "Nov 10, 2026",
      featured: false,
      published: true,
    },
  ],
};

function notify() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("admin-store-updated"));
  }
}

export function getAdminState(): AdminState {
  if (typeof window === "undefined") return DEFAULT_ADMIN_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_ADMIN_STATE;
    return { ...DEFAULT_ADMIN_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_ADMIN_STATE;
  }
}

export function saveAdminState(next: AdminState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  notify();
}

export function provisionAdminOrder(
  orderId: string,
  payload: { ipAddress: string; rdpPort: number; username: string; password: string },
) {
  const current = getAdminState();
  saveAdminState({
    ...current,
    orders: current.orders.map((o) =>
      o.id === orderId ? { ...o, status: "ACTIVE", ...payload } : o,
    ),
  });
}

export function resolveIpSwap(
  swapId: string,
  action: "COMPLETED" | "REJECTED",
  newIp?: string,
) {
  const current = getAdminState();
  saveAdminState({
    ...current,
    ipSwaps: current.ipSwaps.map((s) =>
      s.id === swapId ? { ...s, status: action, ...(newIp ? { newIp } : {}) } : s,
    ),
  });
}

export function toggleUserStatus(userId: string) {
  const current = getAdminState();
  saveAdminState({
    ...current,
    users: current.users.map((u) =>
      u.id === userId
        ? { ...u, status: u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" }
        : u,
    ),
  });
}

export function creditUserWallet(userId: string, amountBdt: number) {
  const current = getAdminState();
  saveAdminState({
    ...current,
    users: current.users.map((u) =>
      u.id === userId
        ? { ...u, walletBalanceBdt: u.walletBalanceBdt + amountBdt }
        : u,
    ),
  });
}

export function toggleCouponActive(couponId: string) {
  const current = getAdminState();
  saveAdminState({
    ...current,
    coupons: current.coupons.map((c) =>
      c.id === couponId ? { ...c, active: !c.active } : c,
    ),
  });
}

export function createAdminCoupon(input: {
  code: string;
  discountPercent: number;
  scope: "ALL" | "ISP_VPS" | "CLOUD_VPS";
  maxUses: number | null;
  expiresAt: string;
}) {
  const current = getAdminState();
  const next: AdminCoupon = {
    id: `cpn-${Date.now().toString().slice(-4)}`,
    code: input.code.toUpperCase().trim(),
    discountPercent: input.discountPercent,
    scope: input.scope,
    usedCount: 0,
    maxUses: input.maxUses,
    expiresAt: input.expiresAt,
    active: true,
  };
  saveAdminState({
    ...current,
    coupons: [next, ...current.coupons],
  });
}

export function replyAdminTicket(ticketId: string, replyText: string) {
  const current = getAdminState();
  saveAdminState({
    ...current,
    tickets: current.tickets.map((t) =>
      t.id === ticketId
        ? {
            ...t,
            status: "ANSWERED",
            lastMessage: `Ops: ${replyText}`,
            updatedAt: "Just now",
          }
        : t,
    ),
  });
}

export function updateIspPlan(planId: string, patch: Partial<AdminIspPlan>) {
  const current = getAdminState();
  saveAdminState({
    ...current,
    ispPlans: current.ispPlans.map((p) =>
      p.id === planId ? { ...p, ...patch } : p,
    ),
  });
}

export function updateCloudConfig(nextConfig: AdminCloudConfig) {
  const current = getAdminState();
  saveAdminState({ ...current, cloudConfig: nextConfig });
}

export function upsertBlogPost(post: Omit<AdminBlogPost, "id"> & { id?: string }) {
  const current = getAdminState();
  const exists = Boolean(
    post.id && current.blogPosts.some((b) => b.id === post.id),
  );
  const nextList = exists
    ? current.blogPosts.map((b) =>
        b.id === post.id ? { ...b, ...post, id: b.id } : b,
      )
    : [
        { ...post, id: `post-${Date.now().toString().slice(-4)}` },
        ...current.blogPosts,
      ];

  const normalized = post.featured
    ? nextList.map((b) => ({
        ...b,
        featured: b.slug === post.slug,
      }))
    : nextList;

  saveAdminState({ ...current, blogPosts: normalized });
}

export function deleteBlogPost(postId: string) {
  const current = getAdminState();
  saveAdminState({
    ...current,
    blogPosts: current.blogPosts.filter((b) => b.id !== postId),
  });
}