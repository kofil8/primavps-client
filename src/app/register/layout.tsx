import { pageSeo } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageSeo({
  title: "Create an Account",
  description:
    "Create a primavps account to deploy residential ISP VPS and cloud servers, manage IP swaps and pay with bKash or Nagad.",
  path: "/register",
  noIndex: true,
});

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
