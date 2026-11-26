import type { Metadata } from "next";

export const SITE_URL = "https://primavps.com";
export const SITE_NAME = "primavps";
export const SITE_LOCALE = "en_US";
export const TWITTER_HANDLE = "@primavps";

export const DEFAULT_TITLE =
  "Residential ISP VPS Bangladesh | Static Clean IP Hosting — primavps";

export const DEFAULT_DESCRIPTION =
  "Buy clean residential ISP VPS in Bangladesh from ৳2,999/mo. AT&T, Comcast and Verizon IPs, Windows 11 RDP, bKash payment and 90-second deployment.";

export const DEFAULT_KEYWORDS = [
  "ISP VPS Bangladesh",
  "residential ISP VPS",
  "buy residential ISP VPS",
  "residential RDP Bangladesh",
  "AT&T residential IP VPS",
  "Comcast VPS",
  "Windows RDP bKash",
  "cloud VPS Bangladesh",
  "clean IP VPS",
  "static residential RDP",
];

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  /** Skip the "| primavps" template, e.g. for long article headlines. */
  absoluteTitle?: boolean;
};

/**
 * Builds a complete Metadata object for a single route: canonical URL,
 * Open Graph and Twitter data, plus robots directives for private pages.
 */
export function pageSeo({
  title,
  description,
  path,
  keywords,
  noIndex,
  absoluteTitle,
}: PageSeoInput): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      url,
      title: socialTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title: socialTitle,
      description,
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: true,
            googleBot: { index: false, follow: true },
          },
        }
      : {}),
  };
}

/** Truncates meta descriptions to the ~160 character display limit. */
export function clampDescription(text: string, max = 158): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : cut.length)}…`;
}
