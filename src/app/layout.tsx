import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ChatWidget } from "@/components/ChatWidget";
import { StickySocialBar } from "@/components/ui/StickySocialBar";
import { CurrencyProvider } from "@/lib/currency";
import { bodyFont, displayFont, monoFont } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default:
      "primevpsbd — Enterprise Cloud VPS & Clean Residential ISP Servers",
    template: "%s | primevpsbd",
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
  authors: [{ name: "primevpsbd Infrastructure" }],
  metadataBase: new URL("https://primevpsbd.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://primevpsbd.com",
    siteName: "primevpsbd",
    title: "primevpsbd — Enterprise Cloud VPS & Clean Residential ISP Servers",
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
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
        <CurrencyProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickySocialBar />
          <ChatWidget />
        </CurrencyProvider>
      </body>
    </html>
  );
}
