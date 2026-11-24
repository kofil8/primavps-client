import { JsonLd } from "@/components/seo/JsonLd";
import { blogPostSchema, breadcrumbSchema } from "@/lib/schema";
import { clampDescription, pageSeo } from "@/lib/seo";
import {
  getBlogPostBySlug,
  getBlogPosts,
  getRelatedBlogPosts,
} from "@/lib/services/blog";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  List,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u0980-\u09FF\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-slate-800"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Guide not found",
      robots: { index: false, follow: false },
    };
  }

  return pageSeo({
    title: post.metaTitle ?? post.title,
    description: clampDescription(post.metaDescription ?? post.summary),
    path: `/blog/${post.slug}`,
    absoluteTitle: true,
    keywords: [post.category, "residential ISP IP", "VPS guide Bangladesh"],
  });
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = await getRelatedBlogPosts(post.slug, post.category, 3);
  const articleSchema = blogPostSchema(post.slug);

  const blocks = post.content.split("\n\n");
  const tocHeadings = blocks
    .filter((b) => b.startsWith("## "))
    .map((b) => {
      const text = b.replace("## ", "").trim();
      return { text, id: slugifyHeading(text) };
    });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {articleSchema && <JsonLd data={articleSchema} />}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      {/* Article Header */}
      <section className="border-b border-slate-200 bg-white py-8 sm:py-12">
        <div className="shell">
          <Link
            href="/blog"
            className="mb-5 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft size={14} />
            <span>সব গাইডে ফিরে যান</span>
          </Link>

          <div className="max-w-3xl">
            <span className="inline-block rounded-md border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-blue-700">
              {post.category}
            </span>
            <h1 className="mt-3 font-display text-2xl font-extrabold leading-[1.22] tracking-tight text-slate-900 sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              {post.summary}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs text-slate-500">
              <span className="inline-flex items-center gap-1">
                <Clock size={13} />
                {post.readTime}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Calendar size={13} />
                {post.date}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content + Sticky Sidebar */}
      <section className="py-10 sm:py-12">
        <div className="shell grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Article Body */}
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs sm:p-9 lg:col-span-8">
            <div className="space-y-5 text-sm leading-relaxed text-slate-700 sm:text-base">
              {blocks.map((paragraph, idx) => {
                const trimmed = paragraph.trim();

                if (trimmed.startsWith("## ")) {
                  const text = trimmed.replace("## ", "").trim();
                  return (
                    <h2
                      key={idx}
                      id={slugifyHeading(text)}
                      className="scroll-mt-24 border-t border-slate-100 pt-5 font-display text-lg font-extrabold text-slate-900 first:border-t-0 first:pt-0 sm:text-2xl"
                    >
                      {text}
                    </h2>
                  );
                }

                if (trimmed.startsWith("### ")) {
                  return (
                    <h3
                      key={idx}
                      className="pt-2 font-display text-base font-bold text-slate-900 sm:text-lg"
                    >
                      {trimmed.replace("### ", "")}
                    </h3>
                  );
                }

                if (trimmed.startsWith("> ")) {
                  return (
                    <blockquote
                      key={idx}
                      className="rounded-xl border-l-4 border-blue-600 bg-blue-50/70 p-4 text-xs font-medium text-slate-800 sm:text-sm"
                    >
                      {renderInline(trimmed.replace(/^>\s?/, ""))}
                    </blockquote>
                  );
                }

                if (trimmed.startsWith("```")) {
                  const cleanCode = trimmed
                    .replace(/```[a-z]*\n?/g, "")
                    .replace(/```/g, "");
                  return (
                    <pre
                      key={idx}
                      className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-100"
                    >
                      <code>{cleanCode}</code>
                    </pre>
                  );
                }

                if (trimmed.startsWith("- ")) {
                  const items = trimmed
                    .split(/\n-\s+|\s+-\s+(?=\*\*)/)
                    .map((s) => s.replace(/^-\s+/, "").trim())
                    .filter(Boolean);
                  return (
                    <ul key={idx} className="list-disc space-y-2 pl-5">
                      {items.map((item, i) => (
                        <li key={i}>{renderInline(item)}</li>
                      ))}
                    </ul>
                  );
                }

                return <p key={idx}>{renderInline(trimmed)}</p>;
              })}
            </div>
          </article>

          {/* Right Sticky Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24 lg:col-span-4">
            {/* Auto Table of Contents */}
            {tocHeadings.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
                <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900">
                  <List className="shrink-0 text-blue-600" size={14} />
                  <span>এই গাইডে যা আছে</span>
                </p>
                <ul className="mt-3 space-y-2 text-xs">
                  {tocHeadings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="block text-slate-600 transition-colors hover:text-blue-600"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Realistic Product Promo Card */}
            <div className="rounded-2xl bg-slate-950 p-6 text-white shadow-lg">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-sky-400">
                <ShieldCheck className="shrink-0" size={15} />
                <span>Static Residential ISP</span>
              </div>
              <h2 className="mt-2 font-display text-lg font-extrabold text-white">
                ক্লিন রেসিডেন্সিয়াল VPS খুঁজছেন?
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                AT&amp;T, Comcast, Verizon ও ইউরোপীয় ডেডিকেটেড হোম IP সহ
                Windows 11 RDP। ৭-দিনের ফ্রি IP Swap ও ৯০ সেকেন্ডে অটো-ডেলিভারি।
              </p>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="font-display text-2xl font-black text-white">
                  ৳২,৯৯৯
                </span>
                <span className="text-xs text-slate-400">/মাস থেকে শুরু</span>
              </div>
              <Link
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white transition-colors hover:bg-blue-500"
                href="/isp-vps"
              >
                <span>প্ল্যান দেখুন</span>
                <ArrowRight className="shrink-0" size={14} />
              </Link>
            </div>

            {/* Free Diagnostic Tools Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
              <p className="text-xs font-bold text-slate-900">
                ফ্রি IP ও লিক চেকার টুলস
              </p>
              <p className="mt-1 text-xs text-slate-600">
                কাজ শুরু করার আগে আপনার কানেকশনের IP রিস্ক ও WebRTC লিক টেস্ট
                করুন।
              </p>
              <div className="mt-3.5 flex flex-col gap-2">
                <Link
                  className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:border-blue-300 hover:bg-blue-50/40"
                  href="/tools/ip-checker"
                >
                  <span>IP Fraud Checker</span>
                  <ArrowRight className="shrink-0 text-slate-400" size={13} />
                </Link>
                <Link
                  className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-800 transition-colors hover:border-blue-300 hover:bg-blue-50/40"
                  href="/tools/webrtc-test"
                >
                  <span>WebRTC Leak Test</span>
                  <ArrowRight className="shrink-0 text-slate-400" size={13} />
                </Link>
              </div>
            </div>

            {/* Related Guides */}
            {relatedPosts.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  সম্পর্কিত গাইড
                </p>
                <div className="mt-3 space-y-3 divide-y divide-slate-100">
                  {relatedPosts.map((rel) => (
                    <Link
                      className="group block pt-3 first:pt-0"
                      href={`/blog/${rel.slug}`}
                      key={rel.slug}
                    >
                      <h3 className="line-clamp-2 text-xs font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                        {rel.title}
                      </h3>
                      <span className="mt-1 block font-mono text-[11px] text-slate-500">
                        {rel.readTime}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
