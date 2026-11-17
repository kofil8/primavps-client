export interface SystemComponent {
  id: string;
  name: string;
  category: 'core' | 'network' | 'billing';
  uptime90d: number;
  status: 'operational' | 'degraded' | 'outage';
  latencyMs: number;
}

export const SYSTEM_COMPONENTS: SystemComponent[] = [
  { id: 'website', name: 'Marketing Site & Public API', category: 'core', uptime90d: 99.99, status: 'operational', latencyMs: 24 },
  { id: 'isp-nodes', name: 'Dallas & Ashburn ISP Hypervisors', category: 'network', uptime90d: 99.98, status: 'operational', latencyMs: 18 },
  { id: 'cloud-nvme', name: 'Cloud NVMe Storage Fabric', category: 'core', uptime90d: 99.95, status: 'operational', latencyMs: 0.8 },
  { id: 'ip-pool', name: 'AT&T / Comcast / Verizon IP Pool', category: 'network', uptime90d: 100.0, status: 'operational', latencyMs: 12 },
  { id: 'ip-checker-api', name: 'IP Fraud & Diagnostic Engine', category: 'core', uptime90d: 99.96, status: 'operational', latencyMs: 45 },
  { id: 'billing-bkash', name: 'bKash / Nagad Instant Gateway', category: 'billing', uptime90d: 99.92, status: 'operational', latencyMs: 150 },
  { id: 'billing-cards', name: 'Stripe International Card Checkout', category: 'billing', uptime90d: 99.99, status: 'operational', latencyMs: 80 },
];
