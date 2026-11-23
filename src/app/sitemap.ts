import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/data/blog";
import { SITE_URL } from "@/lib/seo";

const PUBLIC_ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/survey-vps", priority: 0.9, changeFrequency: "weekly" },
  { path: "/cloud-vps", priority: 0.8, changeFrequency: "weekly" },
  { path: "/hot-deals", priority: 0.8, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/resellers", priority: 0.6, changeFrequency: "monthly" },
  { path: "/tools/ip-checker", priority: 0.6, changeFrequency: "monthly" },
  { path: "/tools/webrtc-test", priority: 0.5, changeFrequency: "monthly" },
  { path: "/tools/looking-glass", priority: 0.5, changeFrequency: "monthly" },
  { path: "/status", priority: 0.4, changeFrequency: "daily" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/legal/ip-replacement", priority: 0.4, changeFrequency: "yearly" },
  { path: "/legal/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = PUBLIC_ROUTES.map((route) => ({
    url: new URL(route.path, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const posts: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
