export interface ResellerClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: "active" | "suspended";
  createdAt: string;
}

export interface ResellerServer {
  id: string;
  hostname: string;
  clientId: string;
  clientName: string;
  productType: "isp" | "cloud";
  planName: string;
  country: string;
  carrier: string;
  ip: string;
  os: string;
  specs: { vcpu: number; ram: number; nvme: number };
  wholesaleMonthlyBdt: number;
  retailMonthlyBdt: number;
  status: "running" | "stopped" | "provisioning";
  renewsOn: string;
}

export interface WalletTransaction {
  id: string;
  type: "credit" | "debit" | "refund";
  description: string;
  method: string;
  amountBdt: number;
  balanceAfterBdt: number;
  date: string;
}

export interface ResellerApiKey {
  id: string;
  label: string;
  prefix: string;
  lastUsed: string;
  createdAt: string;
  active: boolean;
}

export interface ResellerState {
  agencyName: string;
  supportEmail: string;
  customDomain: string;
  walletBalanceBdt: number;
  clients: ResellerClient[];
  servers: ResellerServer[];
  transactions: WalletTransaction[];
  apiKeys: ResellerApiKey[];
}

export interface ResellerTier {
  name: "Silver" | "Gold" | "Platinum";
  discountPercent: number;
  minVms: number;
  nextTierName?: string;
  nextTierVms?: number;
}

export function getResellerTier(activeVmCount: number): ResellerTier {
  if (activeVmCount >= 50) {
    return { name: "Platinum", discountPercent: 20, minVms: 50 };
  }
  if (activeVmCount >= 25) {
    return {
      name: "Gold",
      discountPercent: 15,
      minVms: 25,
      nextTierName: "Platinum (20%)",
      nextTierVms: 50,
    };
  }
  return {
    name: "Silver",
    discountPercent: 10,
    minVms: 10,
    nextTierName: "Gold (15%)",
    nextTierVms: 25,
  };
}

const STORAGE_KEY = "primavps_reseller_store_v1";

export const DEFAULT_RESELLER_STATE: ResellerState = {
  agencyName: "Dhaka Digital Agency",
  supportEmail: "ops@dhakadigital.bd",
  customDomain: "portal.dhakadigital.bd",
  walletBalanceBdt: 48500,
  clients: [
    {
      id: "cli-01",
      name: "Tanvir Ahmed",
      email: "tanvir@surveyops.bd",
      phone: "+8801711223344",
      company: "SurveyOps BD",
      status: "active",
      createdAt: "Oct 12, 2026",
    },
    {
      id: "cli-02",
      name: "Nusrat Jahan",
      email: "nusrat@ecomscale.io",
      phone: "+8801812334455",
      company: "EcomScale Studio",
      status: "active",
      createdAt: "Nov 02, 2026",
    },
    {
      id: "cli-03",
      name: "Rafiqul Islam",
      email: "rafiq@remoteqa.net",
      phone: "+8801911445566",
      company: "RemoteQA Team",
      status: "active",
      createdAt: "Nov 15, 2026",
    },
  ],
  servers: [
    {
      id: "rsrv-101",
      hostname: "us-att-client01",
      clientId: "cli-01",
      clientName: "Tanvir Ahmed",
      productType: "isp",
      planName: "Popular Pro ISP",
      country: "us",
      carrier: "AT&T Residential",
      ip: "108.204.142.88",
      os: "Windows 11 Pro",
      specs: { vcpu: 4, ram: 6, nvme: 60 },
      wholesaleMonthlyBdt: 3419,
      retailMonthlyBdt: 3799,
      status: "running",
      renewsOn: "Dec 18, 2026",
    },
    {
      id: "rsrv-102",
      hostname: "us-comcast-client01",
      clientId: "cli-01",
      clientName: "Tanvir Ahmed",
      productType: "isp",
      planName: "VIP Fresh ASN",
      country: "us",
      carrier: "Comcast Xfinity",
      ip: "73.162.88.214",
      os: "Windows 11 Pro",
      specs: { vcpu: 4, ram: 8, nvme: 80 },
      wholesaleMonthlyBdt: 4499,
      retailMonthlyBdt: 4999,
      status: "running",
      renewsOn: "Dec 20, 2026",
    },
    {
      id: "rsrv-103",
      hostname: "uk-bt-ecom02",
      clientId: "cli-02",
      clientName: "Nusrat Jahan",
      productType: "isp",
      planName: "Starter ISP",
      country: "uk",
      carrier: "BT Broadband",
      ip: "86.142.19.44",
      os: "Windows 11 Pro",
      specs: { vcpu: 2, ram: 4, nvme: 45 },
      wholesaleMonthlyBdt: 2699,
      retailMonthlyBdt: 2999,
      status: "running",
      renewsOn: "Dec 24, 2026",
    },
    {
      id: "rsrv-104",
      hostname: "de-nvme-qa03",
      clientId: "cli-03",
      clientName: "Rafiqul Islam",
      productType: "cloud",
      planName: "Cloud 4C / 8G",
      country: "de",
      carrier: "Frankfurt KVM",
      ip: "80.153.24.90",
      os: "Ubuntu 24.04 LTS",
      specs: { vcpu: 4, ram: 8, nvme: 100 },
      wholesaleMonthlyBdt: 1980,
      retailMonthlyBdt: 2200,
      status: "stopped",
      renewsOn: "Jan 02, 2027",
    },
  ],
  transactions: [
    {
      id: "TXN-9041",
      type: "credit",
      description: "Wallet Top-up via bKash Merchant",
      method: "bKash",
      amountBdt: 50000,
      balanceAfterBdt: 56418,
      date: "Nov 22, 2026",
    },
    {
      id: "TXN-9042",
      type: "debit",
      description: "Bulk Deploy: 2× US ISP VPS (Tanvir Ahmed)",
      method: "Wallet",
      amountBdt: 7918,
      balanceAfterBdt: 48500,
      date: "Nov 24, 2026",
    },
  ],
  apiKeys: [
    {
      id: "key-01",
      label: "Production Provisioning Bot",
      prefix: "pv_live_9f8a••••••3c1e",
      lastUsed: "14 mins ago",
      createdAt: "Nov 05, 2026",
      active: true,
    },
  ],
};

function notifyUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("reseller-store-updated"));
  }
}

export function getResellerState(): ResellerState {
  if (typeof window === "undefined") return DEFAULT_RESELLER_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_RESELLER_STATE;
    return { ...DEFAULT_RESELLER_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_RESELLER_STATE;
  }
}

export function saveResellerState(next: ResellerState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  notifyUpdate();
}

export function topUpResellerWallet(amountBdt: number, method: string) {
  const current = getResellerState();
  const nextBalance = current.walletBalanceBdt + amountBdt;
  const txn: WalletTransaction = {
    id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
    type: "credit",
    description: `Wallet Top-up via ${method}`,
    method,
    amountBdt,
    balanceAfterBdt: nextBalance,
    date: "Today",
  };
  const next: ResellerState = {
    ...current,
    walletBalanceBdt: nextBalance,
    transactions: [txn, ...current.transactions],
  };
  saveResellerState(next);
  return next;
}

export function addResellerClient(input: {
  name: string;
  email: string;
  phone: string;
  company?: string;
}) {
  const current = getResellerState();
  const client: ResellerClient = {
    id: `cli-${Date.now().toString().slice(-4)}`,
    name: input.name,
    email: input.email,
    phone: input.phone,
    company: input.company,
    status: "active",
    createdAt: "Today",
  };
  const next: ResellerState = {
    ...current,
    clients: [client, ...current.clients],
  };
  saveResellerState(next);
  return client;
}

const COUNTRY_IP_PREFIX: Record<string, string> = {
  us: "108.204",
  uk: "86.142",
  de: "80.153",
  fr: "90.84",
};

export function bulkDeployServers(input: {
  productType: "isp" | "cloud";
  planName: string;
  country: string;
  carrier: string;
  os: string;
  specs: { vcpu: number; ram: number; nvme: number };
  quantity: number;
  clientId: string;
  hostnamePrefix: string;
  retailMonthlyBdt: number;
  wholesaleMonthlyBdt: number;
  totalWholesaleBdt: number;
}): { ok: true; created: ResellerServer[] } | { ok: false; error: string } {
  const current = getResellerState();
  if (current.walletBalanceBdt < input.totalWholesaleBdt) {
    return {
      ok: false,
      error: "ওয়ালেট ব্যালেন্স পর্যাপ্ত নয়। অনুগ্রহ করে প্রথমে ব্যালেন্স টপ-আপ করুন।",
    };
  }

  const client =
    current.clients.find((c) => c.id === input.clientId) ?? current.clients[0];
  const ipPrefix = COUNTRY_IP_PREFIX[input.country] ?? "108.204";

  const created: ResellerServer[] = Array.from(
    { length: input.quantity },
    (_, idx) => {
      const randA = Math.floor(10 + Math.random() * 220);
      const randB = Math.floor(10 + Math.random() * 240);
      const suffix = String(idx + 1).padStart(2, "0");
      return {
        id: `rsrv-${Date.now().toString().slice(-4)}-${idx + 1}`,
        hostname: `${input.hostnamePrefix}-${suffix}`,
        clientId: client?.id ?? "cli-01",
        clientName: client?.name ?? "Agency Pool",
        productType: input.productType,
        planName: input.planName,
        country: input.country,
        carrier: input.carrier,
        ip: `${ipPrefix}.${randA}.${randB}`,
        os: input.os,
        specs: input.specs,
        wholesaleMonthlyBdt: input.wholesaleMonthlyBdt,
        retailMonthlyBdt: input.retailMonthlyBdt,
        status: "running",
        renewsOn: "Dec 26, 2026",
      };
    },
  );

  const nextBalance = current.walletBalanceBdt - input.totalWholesaleBdt;
  const txn: WalletTransaction = {
    id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
    type: "debit",
    description: `Bulk Deploy: ${input.quantity}× ${input.planName} (${client?.name ?? "Pool"})`,
    method: "Wallet",
    amountBdt: input.totalWholesaleBdt,
    balanceAfterBdt: nextBalance,
    date: "Today",
  };

  saveResellerState({
    ...current,
    walletBalanceBdt: nextBalance,
    servers: [...created, ...current.servers],
    transactions: [txn, ...current.transactions],
  });

  return { ok: true, created };
}

export function updateResellerServerStatus(
  serverId: string,
  status: "running" | "stopped",
) {
  const current = getResellerState();
  const next: ResellerState = {
    ...current,
    servers: current.servers.map((s) =>
      s.id === serverId ? { ...s, status } : s,
    ),
  };
  saveResellerState(next);
}

export function createResellerApiKey(label: string) {
  const current = getResellerState();
  const secretSuffix = Math.random().toString(36).slice(2, 10);
  const fullSecret = `pv_live_${Math.random().toString(36).slice(2, 10)}${secretSuffix}`;
  const keyItem: ResellerApiKey = {
    id: `key-${Date.now().toString().slice(-4)}`,
    label,
    prefix: `${fullSecret.slice(0, 12)}••••••${fullSecret.slice(-4)}`,
    lastUsed: "Never",
    createdAt: "Today",
    active: true,
  };
  saveResellerState({
    ...current,
    apiKeys: [keyItem, ...current.apiKeys],
  });
  return { keyItem, fullSecret };
}

export function revokeResellerApiKey(keyId: string) {
  const current = getResellerState();
  saveResellerState({
    ...current,
    apiKeys: current.apiKeys.filter((k) => k.id !== keyId),
  });
}

export function updateWhiteLabelSettings(input: {
  agencyName: string;
  supportEmail: string;
  customDomain: string;
}) {
  const current = getResellerState();
  saveResellerState({
    ...current,
    agencyName: input.agencyName,
    supportEmail: input.supportEmail,
    customDomain: input.customDomain,
  });
}