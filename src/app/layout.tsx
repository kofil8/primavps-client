import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ChatWidget } from "@/components/ChatWidget";
import { CurrencyProvider } from "@/lib/currency";
import { bodyFont, displayFont, monoFont } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "primavps — Enterprise Cloud VPS & Clean Residential ISP Servers",
    template: "%s | primavps",
  },
  description:
    "Deploy isolated NVMe cloud instances or 100% clean AT&T, Comcast, and Verizon residential Windows VPS with zero WebRTC/DNS leaks. Sub-90s automated deployment with bKash and Cards.",
  keywords: [
    "Residential VPS",
    "ISP VPS",
    "Survey VPS",
    "AT&T ISP RDP",
    "Comcast VPS",
    "Cloud VPS Bangladesh",
    "bKash VPS hosting",
    "Clean Residential IP",
  ],
  authors: [{ name: "primavps Infrastructure" }],
  metadataBase: new URL("https://primavps.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://primavps.com",
    siteName: "primavps",
    title: "primavps — Enterprise Cloud VPS & Clean Residential ISP Servers",
    description:
      "Deploy isolated NVMe cloud instances or 100% clean AT&T, Comcast, and Verizon residential Windows VPS with zero WebRTC/DNS leaks.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-white text-slate-900 antialiased"
      >
        <CurrencyProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
        </CurrencyProvider>
      </body>
    </html>
  );
}
