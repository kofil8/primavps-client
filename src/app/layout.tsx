import { Footer } from "@/components/layout/Footer";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LazyChatWidget } from "@/components/LazyChatWidget";
import { JsonLd } from "@/components/seo/JsonLd";
import { SessionUserProvider } from "@/lib/auth/client-session";
import { getDisplayName, getSession } from "@/lib/auth/current-session";
import { CurrencyProvider } from "@/lib/currency";
import { bodyFont, displayFont, monoFont } from "@/lib/fonts";
import { siteGraphSchema } from "@/lib/schema";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/lib/seo";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: "primavps Infrastructure", url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/brand/icon-512.png", sizes: "512x512" }],
  },
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const user = session
    ? {
        name: getDisplayName(session),
        email: session.email,
        role: session.role,
      }
    : null;

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-white text-slate-900 antialiased"
      >
        <JsonLd data={siteGraphSchema()} />
        <SessionUserProvider user={user}>
          <CurrencyProvider>
            <SiteHeader user={user} />
            <main className="flex-1">{children}</main>
            <Footer />
            <LazyChatWidget />
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{ className: "font-sans text-xs sm:text-sm" }}
            />
          </CurrencyProvider>
        </SessionUserProvider>
      </body>
    </html>
  );
}