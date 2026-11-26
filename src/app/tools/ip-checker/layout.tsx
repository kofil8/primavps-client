import { pageSeo } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageSeo({
  title: "IP Fraud Score Checker — Free IPQS Lookup",
  description:
    "Free IP fraud checker: test any IPv4 or IPv6 for IPQS fraud score, proxy and VPN flags, ASN and residential usage before buying an ISP VPS.",
  path: "/tools/ip-checker",
  keywords: [
    "IP fraud checker",
    "IPQS score check",
    "residential IP test",
    "proxy detection test",
  ],
});

export default function IpCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
