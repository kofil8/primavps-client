export type DealProductScope = "isp" | "cloud" | "reseller";

export interface DealSpec {
  label: string;
  value: string;
}

export interface HotDeal {
  id: string;
  title: string;
  shortName: string;
  category: string;
  badge?: string;
  subtitle: string;
  originalPriceBdt: number;
  discountPercent: number;
  discountedPriceBdt: number;
  savingsBdt: number;
  couponCode: string;
  applicableTo?: DealProductScope[];
  accent: "blue" | "indigo" | "amber" | "emerald";
  ribbonBg?: string;
  targetUrl: string;
  specs: DealSpec[];
  featured?: boolean;
}

type RawDeal = Omit<HotDeal, "discountedPriceBdt" | "savingsBdt">;

function buildDeal(raw: RawDeal): HotDeal {
  const discountedPriceBdt = Math.round(
    raw.originalPriceBdt * (1 - raw.discountPercent / 100),
  );
  return {
    ...raw,
    discountedPriceBdt,
    savingsBdt: raw.originalPriceBdt - discountedPriceBdt,
  };
}

export const HOT_DEALS_LIST: HotDeal[] = [
  buildDeal({
    id: "vps-starter",
    category: "KVM Cloud VPS",
    shortName: "Cloud NVMe",
    badge: "15% OFF",
    title: "Cloud NVMe VPS",
    subtitle:
      "ওয়েব অ্যাপ, বট ও ডেভেলপার প্রজেক্টের জন্য হাই-স্পিড NVMe সার্ভার।",
    discountPercent: 15,
    originalPriceBdt: 950,
    couponCode: "CLOUD15",
    accent: "blue",
    ribbonBg: "bg-[#3b82f6]",
    targetUrl: "/cloud-vps?coupon=CLOUD15",
    specs: [
      { label: "CPU / RAM", value: "1 vCPU · 2 GB" },
      { label: "Storage", value: "30 GB NVMe" },
      { label: "Network", value: "1 Gbps Port" },
      { label: "Delivery", value: "৬০–৯০ সেকেন্ড" },
    ],
  }),
  buildDeal({
    id: "residential-isp",
    category: "Most Popular",
    shortName: "Popular Pro RDP",
    badge: "সবচেয়ে জনপ্রিয়",
    title: "Popular Pro ISP RDP",
    subtitle:
      "AT&T, Comcast ও Verizon-এর খাঁটি ডেডিকেটেড US রেসিডেন্সিয়াল IP।",
    discountPercent: 10,
    originalPriceBdt: 3799,
    couponCode: "LAUNCH10",
    accent: "blue",
    ribbonBg: "bg-[#fbb034]",
    targetUrl: "/isp-vps?plan=pro&country=us&coupon=LAUNCH10",
    featured: true,
    specs: [
      { label: "CPU / RAM", value: "4 vCPU · 6 GB" },
      { label: "Storage", value: "60 GB NVMe" },
      { label: "ISP Trust", value: "Static Home ISP" },
      { label: "Swap Policy", value: "৭-দিন ফ্রি Swap" },
    ],
  }),
  buildDeal({
    id: "virgin-isp",
    category: "Virgin ASN Server",
    shortName: "VIP Fresh ASN",
    badge: "Virgin ASN",
    title: "VIP Fresh (Virgin ASN)",
    subtitle: "হাই-পারফরম্যান্স গ্লোবাল অপারেশনসের জন্য সম্পূর্ণ আনটাচড ফ্রেশ US IP।",
    discountPercent: 12,
    originalPriceBdt: 4999,
    couponCode: "VIRGIN12",
    accent: "amber",
    ribbonBg: "bg-[#00c8db]",
    targetUrl: "/isp-vps?plan=vip&country=us&coupon=VIRGIN12",
    specs: [
      { label: "CPU / RAM", value: "4 vCPU · 8 GB" },
      { label: "Storage", value: "80 GB NVMe" },
      { label: "Network", value: "Virgin US ASN" },
      { label: "Swap Policy", value: "৭-দিন ফ্রি Swap" },
    ],
  }),
  buildDeal({
    id: "reseller-pack",
    category: "Reseller Cluster",
    shortName: "Reseller Bulk",
    badge: "8% OFF",
    title: "Reseller Bulk Pack",
    subtitle:
      "এজেন্সি ও টিমের জন্য ১০+ ইনস্ট্যান্স, সাব-অ্যাকাউন্ট ও হোলসেল রেট।",
    discountPercent: 8,
    originalPriceBdt: 18750,
    couponCode: "RESELL8",
    accent: "emerald",
    ribbonBg: "bg-[#00c06a]",
    targetUrl: "/resellers?coupon=RESELL8",
    specs: [
      { label: "Nodes", value: "10+ Instances" },
      { label: "Control", value: "Centralized API" },
      { label: "IPs", value: "Dedicated Subnets" },
      { label: "Support", value: "প্রায়োরিটি VIP ২৪/৭" },
    ],
  }),
];

export const MAX_DISCOUNT_PERCENT = Math.max(
  ...HOT_DEALS_LIST.map((deal) => deal.discountPercent),
);

export const FLASH_PREVIEW_ITEMS = HOT_DEALS_LIST.map((deal) => ({
  id: deal.id,
  name: deal.shortName,
  discountPercent: deal.discountPercent,
  originalBdt: deal.originalPriceBdt,
  saleBdt: deal.discountedPriceBdt,
  bgHex: deal.ribbonBg,
  targetUrl: deal.targetUrl,
}));
