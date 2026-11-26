import { HOT_DEALS_LIST } from "@/lib/data/deals";
import { ISP_PLANS, calculateCloudPrice } from "@/lib/data/plans";

export const USE_LIVE_API = false;
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

export async function fetchIspPlans() {
  if (!USE_LIVE_API) return ISP_PLANS;
  const res = await fetch(`${API_BASE}/catalog/plans?productType=ISP_VPS`, {
    next: { revalidate: 300 },
  });
  return res.json();
}

export async function validatePromoCode(
  code: string,
  productType: "isp" | "cloud",
  subtotalBdt: number,
) {
  if (!USE_LIVE_API) {
    const deal = HOT_DEALS_LIST.find(
      (d) => d.couponCode.toUpperCase() === code.trim().toUpperCase(),
    );
    if (!deal) return { valid: false, discountBdt: 0 };
    return {
      valid: true,
      discountBdt: Math.round((subtotalBdt * deal.discountPercent) / 100),
    };
  }
  const res = await fetch(`${API_BASE}/coupons/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, productType, subtotalBdt }),
  });
  return res.json();
}

export { calculateCloudPrice };