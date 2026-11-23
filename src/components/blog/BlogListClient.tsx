"use client";

import type { BlogPost } from "@/lib/data/blog";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";

interface BlogListClientProps {
  posts: BlogPost[];
  postsPerPage?: number;
}

type SortOrder = "newest" | "oldest";

function getPaginationRange(
  current: number,
  total: number,
): (number | "...")[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | "...")[] = [1];
  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

export function BlogListClient({
  posts,
  postsPerPage = 6,
}: BlogListClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const listTopRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("q") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    () => searchParams.get("category") || "All",
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(() =>
    searchParams.get("sort") === "oldest" ? "oldest" : "newest",
  );
  const [currentPage, setCurrentPage] = useState(() => {
    const p = Number(searchParams.get("page"));
    return Number.isFinite(p) && p >= 1 ? Math.floor(p) : 1;
  });

  // Shallow-sync filter/pagination state to URL without full reload
  const syncUrl = (next: {
    q: string;
    category: string;
    sort: SortOrder;
    page: number;
  }) => {
    const params = new URLSearchParams();
    if (next.q.trim()) params.set("q", next.q.trim());
    if (next.category !== "All") params.set("category", next.category);
    if (next.sort !== "newest") params.set("sort", next.sort);
    if (next.page > 1) params.set("page", String(next.page));

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  // Dynamic categories with counts
  const categoryStats = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) {
      counts.set(post.category, (counts.get(post.category) || 0) + 1);
    }
    return [
      { name: "All", count: posts.length },
      ...Array.from(counts.entries()).map(([name, count]) => ({ name, count })),
    ];
  }, [posts]);

  const featuredPost = posts.find((p) => p.featured) || posts[0];

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const matched = posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    return sortOrder === "oldest" ? [...matched].reverse() : matched;
  }, [posts, selectedCategory, searchQuery, sortOrder]);

  const isFiltered =
    selectedCategory !== "All" ||
    Boolean(searchQuery.trim()) ||
    sortOrder !== "newest";

  const showFeatured =
    Boolean(featuredPost) && !isFiltered && currentPage === 1;

  // Exclude featured post from grid only when it's displayed above
  const listSource = useMemo(() => {
    if (!isFiltered && featuredPost) {
      return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
    }
    return filteredPosts;
  }, [filteredPosts, isFiltered, featuredPost]);

  const totalPages = Math.max(1, Math.ceil(listSource.length / postsPerPage));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedPosts = useMemo(() => {
    const start = (safePage - 1) * postsPerPage;
    return listSource.slice(start, start + postsPerPage);
  }, [listSource, safePage, postsPerPage]);

  const startItem =
    listSource.length === 0 ? 0 : (safePage - 1) * postsPerPage + 1;
  const endItem = Math.min(safePage * postsPerPage, listSource.length);

  // Handlers
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
    syncUrl({ q: value, category: selectedCategory, sort: sortOrder, page: 1 });
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    syncUrl({ q: searchQuery, category: cat, sort: sortOrder, page: 1 });
  };

  const handleSortChange = (nextSort: SortOrder) => {
    setSortOrder(nextSort);
    setCurrentPage(1);
    syncUrl({
      q: searchQuery,
      category: selectedCategory,
      sort: nextSort,
      page: 1,
    });
  };

  const handlePageChange = (nextPage: number) => {
    const clamped = Math.min(Math.max(1, nextPage), totalPages);
    setCurrentPage(clamped);
    syncUrl({
      q: searchQuery,
      category: selectedCategory,
      sort: sortOrder,
      page: clamped,
    });
    listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleResetAll = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortOrder("newest");
    setCurrentPage(1);
    syncUrl({ q: "", category: "All", sort: "newest", page: 1 });
  };

  return (
    <>
      {/* 1. Header + Search, Filter & Sort Controls */}
      <section className="border-b border-slate-200 bg-white py-10 sm:py-14">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Guides &amp; Knowledge Base
            </p>
            <h1 className="mt-2 font-display text-2xl font-extrabold leading-[1.2] tracking-tight text-slate-900 sm:text-4xl">
              VPS, Residential IP ও সার্ভে গাইড
            </h1>
            <p className="mt-2.5 text-xs leading-relaxed text-slate-600 sm:text-base">
              ক্লিন রেসিডেন্সিয়াল IP, WebRTC লিক প্রোটেকশন এবং Windows RDP
              নিরাপদে ব্যবহারের প্র্যাকটিক্যাল টিউটোরিয়াল।
            </p>
          </div>

          {/* Search + Sort Bar */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search
                size={15}
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="গাইড খুঁজুন (যেমন: WebRTC, AT&T, RDP)…"
                aria-label="গাইড খুঁজুন"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pr-9 pl-10 text-xs text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-600 focus:bg-white focus:outline-none sm:text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  aria-label="সার্চ মুছুন"
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <SlidersHorizontal size={14} className="text-slate-400" />
              <label htmlFor="blog-sort" className="sr-only">
                সাজান
              </label>
              <select
                id="blog-sort"
                value={sortOrder}
                onChange={(e) => handleSortChange(e.target.value as SortOrder)}
                className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:border-blue-600 focus:outline-none"
              >
                <option value="newest">নতুন প্রথম</option>
                <option value="oldest">পুরোনো প্রথম</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills with Post Counts */}
          <div className="-mx-4 mt-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:px-0">
            {categoryStats.map(({ name, count }) => {
              const active = selectedCategory === name;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleCategoryChange(name)}
                  className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                  }`}
                >
                  <span>{name === "All" ? "সব গাইড" : name}</span>
                  <span
                    className={`rounded-md px-1.5 py-0.2 font-mono text-[10px] ${
                      active
                        ? "bg-white/15 text-slate-200"
                        : "bg-white text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Articles Feed + Pagination */}
      <section ref={listTopRef} className="scroll-mt-20 py-10 sm:py-14">
        <div className="shell space-y-8 sm:space-y-10">
          {/* Active Filter Status Bar */}
          {isFiltered && (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs">
              <p className="text-slate-600">
                মোট{" "}
                <strong className="font-bold text-slate-900">
                  {filteredPosts.length}টি
                </strong>{" "}
                গাইড পাওয়া গেছে
                {selectedCategory !== "All" && (
                  <>
                    {" "}
                    · ক্যাটাগরি:{" "}
                    <strong className="text-slate-900">
                      {selectedCategory}
                    </strong>
                  </>
                )}
                {searchQuery.trim() && (
                  <>
                    {" "}
                    · সার্চ:{" "}
                    <strong className="text-slate-900">
                      &ldquo;{searchQuery.trim()}&rdquo;
                    </strong>
                  </>
                )}
              </p>
              <button
                type="button"
                onClick={handleResetAll}
                className="cursor-pointer font-bold text-blue-600 hover:underline"
              >
                ফিল্টার মুছুন
              </button>
            </div>
          )}

          {/* Featured Post (Only on Page 1 with no active filter) */}
          {showFeatured && (
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block rounded-2xl border border-slate-800 bg-slate-950 p-6 text-white shadow-lg transition-all hover:border-blue-500/50 sm:rounded-3xl sm:p-9"
            >
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5 text-xs">
                  <span className="rounded-md border border-blue-400/30 bg-blue-500/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-blue-300">
                    {featuredPost.category}
                  </span>
                  <span className="font-semibold text-slate-400">
                    Featured Guide
                  </span>
                </div>

                <h2 className="mt-3.5 font-display text-xl font-extrabold leading-snug tracking-tight text-white transition-colors group-hover:text-sky-300 sm:text-3xl">
                  {featuredPost.title}
                </h2>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
                  {featuredPost.summary}
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-4 text-xs text-slate-400">
                  <div className="flex items-center gap-3 font-mono">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={13} />
                      {featuredPost.readTime}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={13} />
                      {featuredPost.date}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 font-bold text-sky-400 transition-transform group-hover:translate-x-1">
                    <span>সম্পূর্ণ পড়ুন</span>
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Articles Grid or Empty State */}
          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {paginatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs transition-all hover:border-slate-300 hover:shadow-md sm:p-6"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-block rounded-md border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-blue-700">
                          {post.category}
                        </span>
                        <span className="font-mono text-[11px] text-slate-400">
                          {post.date}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-base font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-blue-600 sm:text-lg">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-600">
                        {post.summary}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1 font-mono">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                      <span className="inline-flex items-center gap-1 font-bold text-blue-600 transition-transform group-hover:translate-x-0.5">
                        <span>পড়ুন</span>
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Clean Responsive Pagination Bar */}
              {totalPages > 1 && (
                <nav
                  aria-label="গাইড প্যাজিনেশন"
                  className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row"
                >
                  <p className="text-xs text-slate-500">
                    মোট{" "}
                    <span className="font-bold text-slate-800">
                      {listSource.length}
                    </span>
                    টির মধ্যে{" "}
                    <span className="font-bold text-slate-800">
                      {startItem}–{endItem}
                    </span>{" "}
                    দেখানো হচ্ছে
                  </p>

                  <div className="flex items-center gap-1.5">
                    {/* Prev */}
                    <button
                      type="button"
                      onClick={() => handlePageChange(safePage - 1)}
                      disabled={safePage === 1}
                      className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronLeft size={14} />
                      <span>আগের</span>
                    </button>

                    {/* Mobile Compact Page Indicator */}
                    <span className="px-2.5 font-mono text-xs font-bold text-slate-700 sm:hidden">
                      {safePage} / {totalPages}
                    </span>

                    {/* Desktop Numbered Pages with Ellipsis */}
                    <div className="hidden items-center gap-1 sm:flex">
                      {getPaginationRange(safePage, totalPages).map(
                        (item, idx) =>
                          item === "..." ? (
                            <span
                              key={`dots-${idx}`}
                              className="px-2 text-xs text-slate-400"
                            >
                              …
                            </span>
                          ) : (
                            <button
                              key={item}
                              type="button"
                              aria-current={
                                item === safePage ? "page" : undefined
                              }
                              onClick={() => handlePageChange(item)}
                              className={`grid size-9 cursor-pointer place-items-center rounded-xl font-mono text-xs font-bold transition-colors ${
                                item === safePage
                                  ? "bg-blue-600 text-white shadow-xs"
                                  : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              {item}
                            </button>
                          ),
                      )}
                    </div>

                    {/* Next */}
                    <button
                      type="button"
                      onClick={() => handlePageChange(safePage + 1)}
                      disabled={safePage === totalPages}
                      className="inline-flex cursor-pointer items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span>পরের</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </nav>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <p className="font-display text-base font-bold text-slate-900">
                কোনো গাইড পাওয়া যায়নি
              </p>
              <p className="mt-1 text-xs text-slate-500">
                অন্য কোনো কিওয়ার্ড দিয়ে খুঁজুন অথবা সব ক্যাটাগরি দেখুন।
              </p>
              <button
                type="button"
                onClick={handleResetAll}
                className="mt-4 cursor-pointer rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
              >
                সব ফিল্টার রিসেট করুন
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
