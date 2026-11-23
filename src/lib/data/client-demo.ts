export type ServiceStatus = "active" | "provisioning";

export interface DemoService {
  id: string;
  name: string;
  plan: string;
  location: string;
  ip: string;
  specs: string;
  status: ServiceStatus;
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
