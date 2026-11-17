'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BLOG_POSTS, BlogPost } from '@/lib/data/blog';
import { Search, Clock, Calendar, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

const CATEGORIES = ['All', 'Guides', 'Cloud & DevOps', 'IP Security'];

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Header */}
      <section className="bg-white border-b border-[#E2E8F0] pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2563EB] text-xs font-semibold mb-3">
              <BookOpen size={14} />
              <span>Engineering Knowledge Base</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
              primevpsbd Engineering Blog
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] mt-2 leading-relaxed">
              Practical guides for VPS sizing, residential IP security, WebRTC leakage prevention, and cloud infrastructure.
            </p>
          </div>

          {/* Search bar & Category Filter */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative max-w-md w-full">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:border-[#2563EB]"
              />
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'bg-slate-100 text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Featured Post (Wide Card) */}
          {selectedCategory === 'All' && !searchQuery && (
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="block rounded-2xl bg-[#0B1120] text-white p-8 sm:p-10 border border-slate-800 shadow-xl hover:border-slate-700 transition-all group"
            >
              <div className="max-w-3xl space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {featuredPost.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Sparkles size={12} className="text-amber-400" />
                    <span>Featured Guide</span>
                  </span>
                </div>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white group-hover:text-blue-400 transition-colors tracking-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {featuredPost.summary}
                </p>
                <div className="pt-2 flex items-center gap-4 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    <span>{featuredPost.readTime}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={13} />
                    <span>{featuredPost.date}</span>
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* 3-Column Grid of Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#2563EB] border border-blue-100">
                    {post.category}
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#64748B] line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs text-[#64748B]">
                  <span className="font-mono">{post.readTime}</span>
                  <span className="font-semibold text-[#2563EB] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Read Guide</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
