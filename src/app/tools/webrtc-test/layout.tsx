import { pageSeo } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageSeo({
  title: "Free WebRTC Leak Test — Check Real IP Leaks",
  description:
    "Free WebRTC leak test: see whether your browser exposes your real IP through STUN ICE candidates while using a VPS, proxy or residential RDP.",
  path: "/tools/webrtc-test",
  keywords: [
    "WebRTC leak test",
    "real IP leak check",
    "STUN IP leak",
    "browser IP leak",
  ],
});

export default function WebRtcTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
