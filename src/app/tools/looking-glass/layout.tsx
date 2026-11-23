import { pageSeo } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageSeo({
  title: "Looking Glass — Ping, Traceroute & MTR Tests",
  description:
    "Run ping, traceroute and MTR from Dallas, Ashburn and Chicago to test latency to your residential VPS or cloud server before you deploy.",
  path: "/tools/looking-glass",
  keywords: [
    "looking glass",
    "VPS latency test",
    "ping traceroute test",
    "US network test",
  ],
});

export default function LookingGlassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
