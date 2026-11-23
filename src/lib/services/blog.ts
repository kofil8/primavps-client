import { BLOG_POSTS, BlogPost } from "@/lib/data/blog";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const USE_LIVE_API = false; // ব্যাকএন্ড রেডি হলে true করে দেবেন

export interface BlogQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sort?: "newest" | "oldest";
}

export interface PaginatedBlogResponse {
  items: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (USE_LIVE_API && API_BASE) {
    const res = await fetch(`${API_BASE}/blog`, {
      next: { revalidate: 300 },
    });
    if (res.ok) return res.json();
  }
  return BLOG_POSTS;
}

/**
 * Backend-ready paginated fetcher.
 * Switch USE_LIVE_API = true once your backend supports ?page=&limit=&category=&q=
 */
export async function getPaginatedBlogPosts(
  params: BlogQueryParams = {},
): Promise<PaginatedBlogResponse> {
  const {
    page = 1,
    limit = 6,
    category = "All",
    search = "",
    sort = "newest",
  } = params;

  if (USE_LIVE_API && API_BASE) {
    const qs = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      sort,
    });
    if (category && category !== "All") qs.set("category", category);
    if (search.trim()) qs.set("q", search.trim());

    const res = await fetch(`${API_BASE}/blog?${qs.toString()}`, {
      next: { revalidate: 120 },
    });
    if (res.ok) return res.json();
  }

  // Fallback: Filter, sort & paginate dummy data locally
  const q = search.trim().toLowerCase();
  let filtered = BLOG_POSTS.filter((post) => {
    const matchesCat = category === "All" || post.category === category;
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.summary.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  if (sort === "oldest") {
    filtered = [...filtered].reverse();
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * limit;

  return {
    items: filtered.slice(start, start + limit),
    total,
    page: safePage,
    limit,
    totalPages,
  };
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  if (USE_LIVE_API && API_BASE) {
    const res = await fetch(`${API_BASE}/blog/${encodeURIComponent(slug)}`, {
      next: { revalidate: 300 },
    });
    if (res.ok) return res.json();
    if (res.status === 404) return null;
  }
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

export async function getRelatedBlogPosts(
  currentSlug: string,
  category: string,
  limit = 3,
): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  const sameCategory = posts.filter(
    (p) => p.slug !== currentSlug && p.category === category,
  );
  const others = posts.filter(
    (p) => p.slug !== currentSlug && p.category !== category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
