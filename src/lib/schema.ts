import { BLOG_POSTS } from "@/lib/data/blog";
import { ISP_PLANS } from "@/lib/data/plans";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const SOCIAL_PROFILES = [
  "https://facebook.com/primavps",
  "https://youtube.com/@primavps",
  "https://linkedin.com/company/primavps",
  "https://twitter.com/primavps",
];

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/brand/icon-512.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/brand/icon-512.png`,
    description:
      "Bangladesh-based provider of clean residential ISP VPS, static residential RDP and NVMe cloud servers with bKash and Nagad payment.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Banani C/A",
      addressLocality: "Dhaka",
      postalCode: "1213",
      addressCountry: "BD",
    },
    areaServed: [
      { "@type": "Country", name: "Bangladesh" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@primavps.com",
      availableLanguage: ["Bengali", "English"],
      areaServed: "BD",
    },
    sameAs: SOCIAL_PROFILES,
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "en",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function siteGraphSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema()],
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function ispPlansSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Residential ISP VPS plans",
    itemListElement: ISP_PLANS.map((plan, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: plan.name,
        description: plan.tagline,
        brand: { "@type": "Brand", name: SITE_NAME },
        category: "Residential ISP VPS",
        offers: {
          "@type": "Offer",
          url: `${SITE_URL}/isp-vps?plan=${plan.id}`,
          price: plan.priceBdt,
          priceCurrency: "BDT",
          availability: "https://schema.org/InStock",
          priceValidUntil: new Date(
            Date.now() + 1000 * 60 * 60 * 24 * 180,
          ).toISOString(),
          seller: { "@id": ORGANIZATION_ID },
        },
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}

export function blogPostSchema(slug: string) {
  const post = BLOG_POSTS.find((entry) => entry.slug === slug);
  if (!post) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    articleSection: post.category,
    inLanguage: "en",
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}
