import { DEMO_INVOICES, DEMO_SERVICES, DEMO_TICKETS } from "@/lib/data/client-demo";

export const USE_LIVE_API = false;
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export async function getUserServices() {
  if (!USE_LIVE_API) return DEMO_SERVICES;
  const res = await fetch(`${API_BASE}/instances`, { credentials: "include" });
  return res.json();
}

export async function getUserInvoices() {
  if (!USE_LIVE_API) return DEMO_INVOICES;
  const res = await fetch(`${API_BASE}/invoices`, { credentials: "include" });
  return res.json();
}

export async function getUserTickets() {
  if (!USE_LIVE_API) return DEMO_TICKETS;
  const res = await fetch(`${API_BASE}/tickets`, { credentials: "include" });
  return res.json();
}