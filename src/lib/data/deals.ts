export interface HotDeal {
  id: string;
  category: string;
  badge: string;
  title: string;
  subtitle: string;
  discountPercent: number;
  originalPriceBdt: number;
  discountedPriceBdt: number;
  couponCode: string;
  headerTheme: 'blue' | 'amber' | 'cyan' | 'emerald';
  targetUrl: string;
  specs: {
    label: string;
    value: string;
  }[];
}

export const HOT_DEALS_LIST: HotDeal[] = [
  {
    id: 'vps-starter',
    category: 'VPS Hosting',
    badge: '35% OFF',
    title: 'upto 35% OFF on first month for VPS Hosting',
    subtitle: 'High performance NVMe Cloud VPS tailored for fast workloads.',
    discountPercent: 35,
    originalPriceBdt: 950,
    discountedPriceBdt: 615,
    couponCode: 'HOTVPS35',
    headerTheme: 'blue',
    targetUrl: '/cloud-vps',
    specs: [
      { label: 'CPU', value: '1 vCPU' },
      { label: 'RAM', value: '2 GB DDR4' },
      { label: 'Storage', value: '30 GB NVMe' },
      { label: 'Network', value: '1 Gbps Port' },
    ],
  },
  {
    id: 'residential-isp',
    category: 'Residential ISP',
    badge: '30% OFF',
    title: 'upto 30% OFF on first month for Residential VPS',
    subtitle: 'Clean 100% genuine US ISP IPs with AT&T and Comcast ASN.',
    discountPercent: 30,
    originalPriceBdt: 3799,
    discountedPriceBdt: 2659,
    couponCode: 'RESISP30',
    headerTheme: 'amber',
    targetUrl: '/survey-vps',
    specs: [
      { label: 'CPU', value: '4 vCPU' },
      { label: 'RAM', value: '6 GB RAM' },
      { label: 'Storage', value: '60 GB NVMe' },
      { label: 'ISP Trust', value: 'Virgin Residential' },
    ],
  },
  {
    id: 'virgin-isp',
    category: 'Virgin ASN Server',
    badge: '25% OFF',
    title: 'upto 25% OFF on first month for Virgin US IP',
    subtitle: 'Never-recycled pure residential IP dedicated exclusively to you.',
    discountPercent: 25,
    originalPriceBdt: 4999,
    discountedPriceBdt: 3749,
    couponCode: 'VIRGIN25',
    headerTheme: 'cyan',
    targetUrl: '/survey-vps',
    specs: [
      { label: 'CPU', value: '4 vCPU' },
      { label: 'RAM', value: '8 GB RAM' },
      { label: 'Storage', value: '80 GB NVMe' },
      { label: 'IP Warranty', value: '7-Day Replacement' },
    ],
  },
  {
    id: 'reseller-pack',
    category: 'Reseller Cluster',
    badge: '20% OFF',
    title: 'upto 20% OFF on first month for Reseller Bulk',
    subtitle: 'Bulk fleet management with custom sub-accounts and wholesale rates.',
    discountPercent: 20,
    originalPriceBdt: 18750,
    discountedPriceBdt: 15000,
    couponCode: 'RESELL20',
    headerTheme: 'emerald',
    targetUrl: '/resellers',
    specs: [
      { label: 'Nodes', value: '10+ Instances' },
      { label: 'Control', value: 'Centralized API' },
      { label: 'IPs', value: 'Dedicated Subnets' },
      { label: 'Support', value: 'Priority VIP 24/7' },
    ],
  },
];

export interface FlashPreviewItem {
  id: string;
  name: string;
  discountPercent: number;
  originalUsd: string;
  saleUsd: string;
  originalBdt: number;
  saleBdt: number;
  bgHex: string;
  targetUrl: string;
}

export const FLASH_PREVIEW_ITEMS: FlashPreviewItem[] = [
  {
    id: 'vps',
    name: 'VPS Hosting',
    discountPercent: 35,
    originalUsd: '$2/mo',
    saleUsd: '$1.35',
    originalBdt: 245,
    saleBdt: 165,
    bgHex: 'bg-[#3b82f6]', // vibrant solid blue
    targetUrl: '/cloud-vps',
  },
  {
    id: 'dedicated',
    name: 'Dedication server',
    discountPercent: 30,
    originalUsd: '$50/mo',
    saleUsd: '$35',
    originalBdt: 6100,
    saleBdt: 4270,
    bgHex: 'bg-[#fbb034]', // vibrant solid warm yellow
    targetUrl: '/cloud-vps',
  },
  {
    id: 'colocation',
    name: 'Colocation',
    discountPercent: 20,
    originalUsd: '$80/mo',
    saleUsd: '$64',
    originalBdt: 9760,
    saleBdt: 7800,
    bgHex: 'bg-[#00c8db]', // vibrant solid cyan
    targetUrl: '/survey-vps',
  },
  {
    id: 'hybrid',
    name: 'Hybrid server',
    discountPercent: 35,
    originalUsd: '$40/mo',
    saleUsd: '$26',
    originalBdt: 4880,
    saleBdt: 3170,
    bgHex: 'bg-[#00c06a]', // vibrant solid green
    targetUrl: '/resellers',
  },
];
