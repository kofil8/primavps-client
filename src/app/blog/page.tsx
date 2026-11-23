import { BlogListClient } from "@/components/blog/BlogListClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { pageSeo } from "@/lib/seo";
import { getBlogPosts } from "@/lib/services/blog";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = pageSeo({
  title: "VPS, Residential IP & Survey Guides — primavps",
  description:
    "বাংলাদেশি ফ্রিল্যান্সার ও ডেভেলপারদের জন্য রেসিডেন্সিয়াল ISP IP, WebRTC লিক প্রোটেকশন, সার্ভে VPS সেটআপ এবং ক্লাউড সার্ভার গাইড।",
  path: "/blog",
  keywords: [
    "survey VPS guide Bangladesh",
    "residential IP tutorial",
    "WebRTC leak fix RDP",
    "VPS setup guide Bangla",
  ],
});

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "primavps Guides & Tutorials",
    description:
      "Practical guides on residential ISP IPs, survey VPS setup, WebRTC leak prevention, and cloud servers.",
    url: "https://primavps.com/blog",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://primavps.com/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <JsonLd data={collectionSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/blog" },
        ])}
      />
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center text-sm text-slate-500">
            গাইড লোড হচ্ছে…
          </div>
        }
      >
        <BlogListClient posts={posts} postsPerPage={6} />
      </Suspense>
    </main>
  );
}
