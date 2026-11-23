import { pageSeo } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageSeo({
  title: "Cloud VPS with NVMe in Dallas, Ashburn & Chicago",
  description:
    "Build an NVMe cloud VPS in Dallas, Ashburn or Chicago: 1–16 vCPU, Linux or Windows, 1 Gbps unmetered port, from ৳950/mo with bKash or Nagad.",
  path: "/cloud-vps",
  keywords: [
    "cloud VPS Bangladesh",
    "NVMe VPS",
    "Windows Server VPS",
    "Linux VPS Dallas",
    "bKash cloud hosting",
  ],
});

export default function CloudVpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
