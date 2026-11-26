import {
  DEMO_INVOICES,
  DEMO_SERVICES,
  DEMO_TICKETS,
  type PortalInvoice,
  type PortalService,
  type PortalTicket,
} from "@/lib/data/client-demo";

const KEYS = {
  services: "primavps_portal_services_v1",
  invoices: "primavps_portal_invoices_v1",
  tickets: "primavps_portal_tickets_v1",
  profile: "primavps_portal_profile_v1",
} as const;

export interface PortalProfile {
  name: string;
  phone: string;
  email: string;
}

const DEFAULT_PROFILE: PortalProfile = {
  name: "Ariful Islam",
  phone: "+8801712-345678",
  email: "client@primavps.com",
};

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWrite<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors in private browsing
  }
}

export function getStoredServices(): PortalService[] {
  return safeRead<PortalService[]>(KEYS.services, DEMO_SERVICES);
}

export function saveStoredServices(services: PortalService[]): void {
  safeWrite(KEYS.services, services);
}

export function updateStoredService(
  id: string,
  updater: (srv: PortalService) => PortalService,
): PortalService[] {
  const next = getStoredServices().map((srv) =>
    srv.id === id ? updater(srv) : srv,
  );
  saveStoredServices(next);
  return next;
}

export function getStoredInvoices(): PortalInvoice[] {
  return safeRead<PortalInvoice[]>(KEYS.invoices, DEMO_INVOICES);
}

export function saveStoredInvoices(invoices: PortalInvoice[]): void {
  safeWrite(KEYS.invoices, invoices);
}

export function markInvoicePaid(invoiceId: string): PortalInvoice[] {
  const next = getStoredInvoices().map((inv) =>
    inv.id === invoiceId ? { ...inv, status: "paid" as const } : inv,
  );
  saveStoredInvoices(next);
  return next;
}

export function getStoredTickets(): PortalTicket[] {
  return safeRead<PortalTicket[]>(KEYS.tickets, DEMO_TICKETS);
}

export function saveStoredTickets(tickets: PortalTicket[]): void {
  safeWrite(KEYS.tickets, tickets);
}

export function getStoredProfile(): PortalProfile {
  return safeRead<PortalProfile>(KEYS.profile, DEFAULT_PROFILE);
}

export function saveStoredProfile(profile: PortalProfile): void {
  safeWrite(KEYS.profile, profile);
}

export function addProvisionedOrder(input: {
  orderRef: string;
  orderType: "isp" | "cloud";
  planName: string;
  country: string;
  carrier: string;
  os: string;
  location: string;
  vcpu: number;
  ram: number;
  nvme: number;
  totalBdt: number;
}): void {
  const existingServices = getStoredServices();
  const shortId = `${input.country}-${input.orderType}-${Math.floor(10 + Math.random() * 89)}`;
  const newService: PortalService = {
    id: shortId,
    name: shortId,
    plan: input.planName,
    country: input.country.toUpperCase(),
    carrier: input.carrier,
    os: input.os,
    location: input.location,
    ip: input.country === "uk" ? "51.89.144.76" : "108.204.142.88",
    specs: {
      vcpu: input.vcpu,
      ram: input.ram,
      nvme: input.nvme,
      bandwidth: "1 Gbps Unmetered",
    },
    status: "running",
    monthlyBdt: input.totalBdt,
    monthlyUsd: Math.max(5, Math.round(input.totalBdt / 120)),
    renewsOn: "Dec 25, 2026",
    ipqsScore: 0,
  };
  saveStoredServices([newService, ...existingServices]);

  const existingInvoices = getStoredInvoices();
  const newInvoice: PortalInvoice = {
    id: `INV-${input.orderRef.replace("PV-", "")}`,
    item: `${input.planName} — Initial Deployment`,
    date: "Today",
    amountBdt: input.totalBdt,
    amountUsd: Math.max(5, Math.round(input.totalBdt / 120)),
    status: "paid",
  };
  saveStoredInvoices([newInvoice, ...existingInvoices]);
}
