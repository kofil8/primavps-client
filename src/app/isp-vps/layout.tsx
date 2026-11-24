import { pageSeo } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageSeo({
  title: "Dedicated ISP VPS & RDP in Bangladesh — Clean Residential IPs",
  description:
    "Buy high-speed Dedicated Residential ISP VPS in Bangladesh with genuine AT&T, Comcast, Verizon, BT & Orange static IPs. Full Admin Windows 11 RDP for remote development, QA testing and business operations.",
  path: "/isp-vps",
  keywords: [
    "dedicated ISP VPS Bangladesh",
    "residential ISP VPS",
    "static residential IP RDP",
    "AT&T residential VPS",
    "Comcast residential VPS",
    "Windows 11 RDP bKash",
    "remote desktop VPS Bangladesh",
  ],
});

export default function IspVpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
