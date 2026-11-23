import { pageSeo } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageSeo({
  title: "VPS, Residential IP & Cloud Server Guides",
  description:
    "Practical guides on residential ISP IPs, WebRTC leaks, VPS sizing, NVMe storage and cloud security from the primavps engineering team in Dhaka.",
  path: "/blog",
  keywords: [
    "residential IP guide",
    "WebRTC leak test guide",
    "VPS sizing guide",
    "NVMe VPS performance",
  ],
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
