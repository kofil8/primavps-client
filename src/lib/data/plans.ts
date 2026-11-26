export interface IspPlan {
  id: string;
  tier: 'starter' | 'pro' | 'vip';
  name: string;
  tagline: string;
  priceBdt: number;
  priceFreshBdt: number;
  specs: {
    vcpu: number;
    ram: number;
    nvme: number;
    bandwidth: string;
  };
  os: string;
  badge?: string;
  stockCount: number;
  carriers: string[];
}

export const ISP_PLANS: IspPlan[] = [
  {
    id: 'starter',
    tier: 'starter',
    name: 'Starter ISP VPS',
    tagline: 'Entry plan for focused workloads and single accounts.',
    priceBdt: 2999,
    priceFreshBdt: 3499,
    specs: {
      vcpu: 2,
      ram: 4,
      nvme: 45,
      bandwidth: '1 Gbps',
    },
    os: 'Windows 10 Pro (Pre-hardened)',
    stockCount: 8,
    carriers: ['AT&T', 'Comcast', 'Verizon', 'Spectrum'],
  },
  {
    id: 'pro',
    tier: 'pro',
    name: 'Pro ISP VPS',
    tagline: 'Balanced compute and high-trust residential routing.',
    priceBdt: 3799,
    priceFreshBdt: 4299,
    specs: {
      vcpu: 4,
      ram: 6,
      nvme: 60,
      bandwidth: '1 Gbps',
    },
    os: 'Windows 10 Pro (Pre-hardened)',
    badge: 'Most Popular',
    stockCount: 5,
    carriers: ['AT&T', 'Comcast'],
  },
  {
    id: 'vip',
    tier: 'vip',
    name: 'VIP Fresh ISP VPS',
    tagline: '100% Brand New Virgin ISP IP with free 7-day replacement.',
    priceBdt: 4999,
    priceFreshBdt: 4999,
    specs: {
      vcpu: 4,
      ram: 8,
      nvme: 80,
      bandwidth: '1 Gbps',
    },
    os: 'Windows 10/11 Pro',
    badge: 'Virgin ASN',
    stockCount: 3,
    carriers: ['AT&T', 'Comcast', 'Verizon'],
  },
];

export const CARRIERS = ['All', 'AT&T', 'Comcast', 'Verizon', 'Spectrum'];

export interface CloudPreset {
  id: string;
  label: string;
  vcpu: number;
  ram: number;
  nvme: number;
}

export const CLOUD_PRESETS: CloudPreset[] = [
  { id: 'starter', label: 'Starter 1/2/30', vcpu: 1, ram: 2, nvme: 30 },
  { id: 'web', label: 'Web 2/4/80', vcpu: 2, ram: 4, nvme: 80 },
  { id: 'app', label: 'App 4/8/160', vcpu: 4, ram: 8, nvme: 160 },
  { id: 'database', label: 'Database 8/32/320', vcpu: 8, ram: 32, nvme: 320 },
];

export interface CloudOs {
  id: string;
  name: string;
  family: 'linux' | 'windows';
  desc: string;
}

export const CLOUD_OS_LIST: CloudOs[] = [
  { id: 'ubuntu-24', name: 'Ubuntu 24.04 LTS', family: 'linux', desc: 'Standard cloud image' },
  { id: 'debian-12', name: 'Debian 12 Bookworm', family: 'linux', desc: 'Minimal footprint' },
  { id: 'almalinux-9', name: 'AlmaLinux 9', family: 'linux', desc: 'RHEL-binary compatible' },
  { id: 'win-2022', name: 'Windows Server 2022', family: 'windows', desc: 'License included (min 4GB RAM)' },
  { id: 'win-10', name: 'Windows 10 Pro', family: 'windows', desc: 'Pre-activated (min 4GB RAM)' },
];

export interface CloudRegion {
  id: string;
  city: string;
  state: string;
  ping: number;
  location: string;
}

export const CLOUD_REGIONS: CloudRegion[] = [
  { id: 'dfw', city: 'Dallas', state: 'TX', ping: 18, location: 'US-Central' },
  { id: 'iad', city: 'Ashburn', state: 'VA', ping: 22, location: 'US-East' },
  { id: 'ord', city: 'Chicago', state: 'IL', ping: 25, location: 'US-Midwest' },
];

export function calculateCloudPrice(vcpu: number, ram: number, nvme: number, addResidentialIp: boolean): number {
  // Base 1 vCPU, 2GB RAM, 30GB NVMe = 950 BDT
  let price = 950;
  
  if (vcpu > 1) {
    price += (vcpu - 1) * 350;
  }
  if (ram > 2) {
    price += (ram - 2) * 160;
  }
  if (nvme > 30) {
    price += Math.floor((nvme - 30) / 10) * 45;
  }
  if (addResidentialIp) {
    price += 1200;
  }

  return price;
}
