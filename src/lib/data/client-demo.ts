export type ServiceStatus = "active" | "provisioning" | "running" | "stopped";

export interface PortalService {
  id: string;
  name: string;
  plan: string;
  country: string;
  carrier: string;
  os: string;
  location: string;
  ip: string;
  specs: {
    vcpu: number;
    ram: number;
    nvme: number;
    bandwidth: string;
  };
  status: "running" | "stopped" | "provisioning";
  monthlyBdt: number;
  monthlyUsd: number;
  renewsOn: string;
  ipqsScore: number;
}

export interface PortalInvoice {
  id: string;
  item: string;
  date: string;
  amountBdt: number;
  amountUsd: number;
  status: "paid" | "unpaid" | "overdue";
}

export interface PortalTicket {
  id: string;
  subject: string;
  department: string;
  status: "open" | "resolved" | "closed";
  updated: string;
}

export const DEMO_SERVICES: PortalService[] = [
  {
    id: "us-isp-pro-01",
    name: "us-isp-pro-01",
    plan: "Popular Pro",
    country: "US",
    carrier: "AT&T Residential",
    os: "Windows 11 Pro",
    location: "Ashburn, VA",
    ip: "108.204.142.88",
    specs: { vcpu: 4, ram: 6, nvme: 60, bandwidth: "Unmetered" },
    status: "running",
    monthlyBdt: 3799,
    monthlyUsd: 31,
    renewsOn: "Dec 18, 2026",
    ipqsScore: 0,
  },
  {
    id: "uk-isp-starter-02",
    name: "uk-isp-starter-02",
    plan: "Starter",
    country: "UK",
    carrier: "BT Broadband",
    os: "Windows 11 Pro",
    location: "London, UK",
    ip: "51.89.144.12",
    specs: { vcpu: 2, ram: 4, nvme: 45, bandwidth: "Unmetered" },
    status: "running",
    monthlyBdt: 2999,
    monthlyUsd: 25,
    renewsOn: "Dec 24, 2026",
    ipqsScore: 2,
  },
  {
    id: "de-cloud-03",
    name: "de-cloud-03",
    plan: "Cloud NVMe",
    country: "DE",
    carrier: "Frankfurt KVM",
    os: "Ubuntu 24.04 LTS",
    location: "Frankfurt, DE",
    ip: "80.153.24.90",
    specs: { vcpu: 2, ram: 4, nvme: 80, bandwidth: "1 Gbps Unmetered" },
    status: "stopped",
    monthlyBdt: 1250,
    monthlyUsd: 11,
    renewsOn: "Jan 02, 2027",
    ipqsScore: 0,
  },
];

export const DEMO_INVOICES: PortalInvoice[] = [
  {
    id: "INV-2412-0918",
    item: "Popular Pro (US AT&T) — Monthly Renewal",
    date: "Dec 03, 2026",
    amountBdt: 3799,
    amountUsd: 31,
    status: "unpaid",
  },
  {
    id: "INV-2411-0842",
    item: "Starter (UK BT) — Monthly Renewal",
    date: "Nov 24, 2026",
    amountBdt: 2999,
    amountUsd: 25,
    status: "paid",
  },
  {
    id: "INV-2410-0711",
    item: "Cloud NVMe (Frankfurt) — Initial Setup",
    date: "Nov 02, 2026",
    amountBdt: 1250,
    amountUsd: 11,
    status: "paid",
  },
];

export const DEMO_TICKETS: PortalTicket[] = [
  {
    id: "4821",
    subject: "Firewall port configuration on Windows 11 RDP",
    department: "Technical Support",
    status: "open",
    updated: "2 hours ago",
  },
  {
    id: "4788",
    subject: "7-Day free IP replacement verification",
    department: "IP Screening Desk",
    status: "resolved",
    updated: "3 days ago",
  },
];

export interface DemoService {
  id: string;
  name: string;
  plan: string;
  location: string;
  ip: string;
  specs: string;
  status: "active" | "provisioning";
  monthlyUsd: number;
  renewsOn: string;
  bandwidth: string;
}

export interface DemoInvoice {
  id: string;
  issuedOn: string;
  description: string;
  amountUsd: number;
  status: "paid" | "due";
  dueOn?: string;
}

export interface DemoTicket {
  id: string;
  subject: string;
  department: string;
  status: "open" | "resolved";
  updated: string;
}

export const demoAccount = {
  customerSince: "August 2025",
  nextInvoiceUsd: 44,
  nextInvoiceDue: "December 3, 2026",
  creditUsd: 12.5,
  services: [
    {
      id: "us-east-nvme-01",
      name: "us-east-nvme-01",
      plan: "NVMe Cloud 4",
      location: "Ashburn, US",
      ip: "198.51.100.24",
      specs: "4 vCPU · 8 GB RAM · 160 GB NVMe",
      status: "active",
      monthlyUsd: 24,
      renewsOn: "December 3, 2026",
      bandwidth: "8 TB / month",
    },
    {
      id: "res-isp-uk-02",
      name: "res-isp-uk-02",
      plan: "Residential ISP VPS",
      location: "London, UK",
      ip: "203.0.113.88",
      specs: "2 vCPU · 4 GB RAM · 80 GB NVMe",
      status: "active",
      monthlyUsd: 20,
      renewsOn: "December 11, 2026",
      bandwidth: "4 TB / month",
    },
    {
      id: "sg-edge-03",
      name: "sg-edge-03",
      plan: "NVMe Cloud 2",
      location: "Singapore",
      ip: "192.0.2.140",
      specs: "2 vCPU · 4 GB RAM · 80 GB NVMe",
      status: "provisioning",
      monthlyUsd: 12,
      renewsOn: "December 19, 2026",
      bandwidth: "4 TB / month",
    },
  ] satisfies DemoService[],
  invoices: [
    {
      id: "INV-2412-0918",
      issuedOn: "December 3, 2026",
      description: "NVMe Cloud 4 + Residential ISP VPS renewal",
      amountUsd: 44,
      status: "due",
      dueOn: "December 3, 2026",
    },
    {
      id: "INV-2411-0842",
      issuedOn: "November 3, 2026",
      description: "NVMe Cloud 4 + Residential ISP VPS renewal",
      amountUsd: 44,
      status: "paid",
    },
    {
      id: "INV-2410-0711",
      issuedOn: "October 3, 2026",
      description: "NVMe Cloud 4 + Residential ISP VPS renewal",
      amountUsd: 44,
      status: "paid",
    },
    {
      id: "INV-2409-0633",
      issuedOn: "September 3, 2026",
      description: "NVMe Cloud 4 + Residential ISP VPS renewal",
      amountUsd: 44,
      status: "paid",
    },
  ] satisfies DemoInvoice[],
  tickets: [
    {
      id: "#4821",
      subject: "IP replacement request — us-east-nvme-01",
      department: "IP Screening & Replacement",
      status: "open",
      updated: "2 hours ago",
    },
    {
      id: "#4788",
      subject: "Reverse DNS for 203.0.113.88",
      department: "Technical Support",
      status: "resolved",
      updated: "3 days ago",
    },
  ] satisfies DemoTicket[],
};

export const demoActivity = [
  {
    title: "sg-edge-03 is provisioning",
    detail: "Singapore · estimated ready in 4 minutes",
    when: "12 minutes ago",
  },
  {
    title: "Invoice INV-2411-0842 paid",
    detail: "$44.00 · Visa ending 4242",
    when: "November 3, 2026",
  },
  {
    title: "IP replacement completed",
    detail: "us-east-nvme-01 now on 198.51.100.24",
    when: "October 27, 2026",
  },
];

export function usd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
