import { pageSeo } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = pageSeo({
  title: "Survey VPS in Bangladesh — Clean Residential IPs",
  description:
    "Buy survey VPS in Bangladesh with clean AT&T, Comcast, Verizon and BT residential IPs. Windows 11 RDP from ৳2,999/mo with a 7-day free IP swap.",
  path: "/survey-vps",
  keywords: [
    "survey VPS Bangladesh",
    "buy VPS for survey",
    "residential RDP Bangladesh",
    "AT&T residential IP VPS",
    "Comcast residential VPS",
    "Windows 11 RDP bKash",
    "virgin ISP IP VPS",
  ],
});

export default function SurveyVpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
