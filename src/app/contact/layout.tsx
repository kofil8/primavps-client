import { pageSeo } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageSeo({
  title: "Contact Support — 24/7 Dhaka Team & WhatsApp",
  description:
    "Contact primavps support in Dhaka 24/7 by WhatsApp, email or phone for residential ISP VPS, billing and IP replacement. Average reply under 15 minutes.",
  path: "/contact",
  keywords: ["primavps support", "VPS support Bangladesh", "bKash VPS help"],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
