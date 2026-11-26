"use client";

import {
  deleteBlogPost,
  getAdminState,
  upsertBlogPost,
  type AdminBlogPost,
} from "@/lib/services/admin-store";
import { Edit3, Plus, Search, Star, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const EMPTY_FORM: Omit<AdminBlogPost, "id"> = {
  title: "",
  slug: "",
  category: "GUIDES",
  summary: "",
  content: "",
  readTime: "6 min read",
  date: new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }),
  featured: false,
  published: true,
};

function toSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function AdminBlogCmsPage() {
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [form, setForm] = useState<Omit<AdminBlogPost, "id">>(EMPTY_FORM);

  useEffect(() => {
    const sync = () => setPosts(getAdminState().blogPosts);
    sync();
    window.addEventListener("admin-store-updated", sync);
    return () => window.removeEventListener("admin-store-updated", sync);
  }, []);

  const filtered = posts.filter((p) => {
    const q = query.trim().toLowerCase();
    return (
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  const openCreate = () => {
    setEditingId(undefined);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (post: AdminBlogPost) => {
    setEditingId(post.id);
    const { id: _id, ...rest } = post;
    setForm(rest);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) return;
    upsertBlogPost({ ...form, id: editingId });
    setModalOpen(false);
    toast.success(editingId ? "Guide updated." : "New guide published.");
  };

  return (
    <div className="space-y-5">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-xs">
          <Search
            size={14}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides…"
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pr-3 pl-9 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-blue-600"
        >
          <Plus size={14} /> New Guide
        </button>
      </div>

      {/* Articles Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3">Article</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50/60">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{post.title}</span>
                    {post.featured && (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                        <Star size={10} /> Featured
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 font-mono text-[11px] text-slate-400">
                    /blog/{post.slug} · {post.readTime}
                  </p>
                </td>
                <td className="px-4 py-3.5">
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                    {post.category}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <button
                    type="button"
                    onClick={() => {
                      upsertBlogPost({ ...post, published: !post.published });
                      toast.success(
                        post.published ? "Moved to Draft" : "Published live",
                      );
                    }}
                    className={`cursor-pointer rounded-full px-2.5 py-0.5 text-[10.5px] font-bold ${
                      post.published
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </button>
                </td>
                <td className="px-4 py-3.5 font-mono text-slate-500">
                  {post.date}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => openEdit(post)}
                      className="grid size-7 cursor-pointer place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                      title="Edit"
                    >
                      <Edit3 size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteBlogPost(post.id);
                        toast.success("Guide deleted.");
                      }}
                      className="grid size-7 cursor-pointer place-items-center rounded-lg border border-slate-200 text-rose-600 hover:bg-rose-50"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
          onClick={() => setModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-display text-sm font-extrabold text-slate-900">
                {editingId ? "Edit Guide" : "Create New Guide"}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="grid size-7 cursor-pointer place-items-center rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700">Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                      slug: editingId ? form.slug : toSlug(e.target.value),
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700">Slug</label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: toSlug(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value as AdminBlogPost["category"],
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
                  >
                    <option value="GUIDES">GUIDES</option>
                    <option value="IP SECURITY">IP SECURITY</option>
                    <option value="CLOUD & DEVOPS">CLOUD &amp; DEVOPS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700">Read Time</label>
                  <input
                    type="text"
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Summary</label>
                <textarea
                  rows={2}
                  required
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">
                  Markdown Content (supports ## headings, **bold**, code blocks)
                </label>
                <textarea
                  rows={6}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-xs text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-1 text-xs font-semibold text-slate-700">
                <label className="inline-flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  />
                  <span>Set as Featured Hero Guide</span>
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  />
                  <span>Published Live</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
                >
                  {editingId ? "Save Changes" : "Publish Guide"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}