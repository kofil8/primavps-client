import { pageSeo } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageSeo({
  title: "VPS Reseller & Bulk Pricing for 10–50 Servers",
  description:
    "Bulk residential ISP VPS and cloud server pricing for teams and agencies in Bangladesh: 10–20% recurring discounts, private subnets and one invoice.",
  path: "/resellers",
  keywords: [
    "VPS reseller program Bangladesh",
    "bulk residential VPS",
    "wholesale VPS pricing",
  ],
});

export default function ResellersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
