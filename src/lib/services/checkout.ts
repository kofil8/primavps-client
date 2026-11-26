export const USE_LIVE_API = false;
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export interface CreateOrderPayload {
  productType: "isp" | "cloud";
  planSlug?: string;
  country: string;
  carrier?: string;
  isFreshIp: boolean;
  cycle: "monthly" | "quarterly" | "annual";
  couponCode?: string;
  gateway: "bkash" | "nagad" | "sslcommerz";
}

export async function createOrderAndInitPayment(payload: CreateOrderPayload) {
  if (!USE_LIVE_API) {
    const orderRef = `PV-${Math.floor(100000 + Math.random() * 900000)}`;
    return { orderId: orderRef, redirectUrl: `/checkout/success?order=${orderRef}` };
  }
  const orderRes = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const order = await orderRes.json();

  const payRes = await fetch(`${API_BASE}/payments/init`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ invoiceId: order.invoiceId, gateway: payload.gateway }),
  });
  return payRes.json();
}