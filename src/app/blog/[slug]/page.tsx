import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/data/blog';
import { Clock, Calendar, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related posts
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Article Header */}
      <section className="bg-white border-b border-[#E2E8F0] pt-10 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#2563EB] mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to all guides</span>
          </Link>

          <div className="max-w-3xl space-y-3">
            <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-[#2563EB] border border-blue-200">
              {post.category}
            </span>
            <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[#0F172A] tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              {post.summary}
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-[#64748B] font-mono">
              <span className="flex items-center gap-1">
                <Clock size={13} />
                <span>{post.readTime}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                <span>{post.date}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout (70% Article / 30% Sticky Sidebar) */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Article Body (8 cols ≈ 70%) */}
            <article className="lg:col-span-8 bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 shadow-xs space-y-6 text-[#0F172A] text-sm sm:text-base leading-relaxed">
              
              {/* Formatted Content Blocks */}
              <div className="space-y-6 prose prose-slate max-w-none">
                {post.content.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={idx} className="font-display font-extrabold text-xl sm:text-2xl text-[#0F172A] pt-4 border-t border-slate-100">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={idx} className="font-display font-bold text-lg text-[#0F172A] pt-2">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('> ')) {
                    return (
                      <div key={idx} className="p-4 rounded-xl bg-blue-50 border-l-4 border-[#2563EB] text-[#0F172A] font-medium text-xs sm:text-sm">
                        {paragraph.replace('> ', '').replace(/\*\*/g, '')}
                      </div>
                    );
                  }
                  if (paragraph.startsWith('```')) {
                    const cleanCode = paragraph.replace(/```[a-z]*\n?/g, '').replace(/```/g, '');
                    return (
                      <pre key={idx} className="p-4 rounded-xl bg-[#0B1120] text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800">
                        <code>{cleanCode}</code>
                      </pre>
                    );
                  }
                  return (
                    <p key={idx} className="text-[#334155] leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Checklist verification box */}
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3 mt-8">
                <div className="font-display font-bold text-sm text-[#0F172A]">
                  Key Engineering Takeaways:
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-[#334155]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    <span>Always verify that memory allocation accounts for anti-detect browser overhead.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    <span>Never mix survey accounts with shared proxy or datacenter ASN pools.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    <span>Run regular WebRTC leak checks to verify STUN ICE candidate encapsulation.</span>
                  </div>
                </div>
              </div>

            </article>

            {/* Right Sticky Sidebar (4 cols ≈ 30%) */}
            <aside className="lg:col-span-4 sticky top-24 space-y-6">
              
              {/* Product Promo Card */}
              <div className="rounded-2xl bg-[#0F172A] text-white p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck size={16} />
                  <span>Verified US Residential IP</span>
                </div>
                <h3 className="font-display font-bold text-lg text-white">
                  Need a Clean Static ISP VPS?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  AT&amp;T and Comcast residential nodes with 0/100 fraud score and sub-90s automated deployment.
                </p>
                <div className="pt-1 flex items-baseline gap-2">
                  <span className="text-xs text-slate-400">Starting at</span>
                  <span className="font-display font-extrabold text-2xl text-white">৳2,999</span>
                  <span className="text-xs text-slate-400">/ mo</span>
                </div>
                <Link
                  href="/survey-vps"
                  className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Deploy ISP VPS</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Free Tool Widget */}
              <div className="rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0F172A]">Free IP Inspector</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-[#2563EB]">
                    Live Tool
                  </span>
                </div>
                <p className="text-xs text-[#64748B]">
                  Test your current internet connection for proxy detection and WebRTC exposure.
                </p>
                <Link
                  href="/tools/ip-checker"
                  className="w-full py-2.5 rounded-lg border border-[#E2E8F0] hover:border-slate-300 text-[#0F172A] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 bg-slate-50"
                >
                  <span>Open IP Fraud Checker</span>
                  <ArrowRight size={13} className="text-[#64748B]" />
                </Link>
              </div>

              {/* Related Guides */}
              <div className="rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-xs space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] block">
                  Related Guides
                </span>
                <div className="space-y-3">
                  {relatedPosts.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/blog/${rel.slug}`}
                      className="block group"
                    >
                      <h4 className="font-semibold text-xs text-[#0F172A] group-hover:text-[#2563EB] transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <span className="text-[11px] text-[#64748B] font-mono mt-0.5 block">
                        {rel.readTime}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

            </aside>

          </div>
        </div>
      </section>

    </div>
  );
}
