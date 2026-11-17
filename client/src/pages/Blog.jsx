import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import PageHero from "../components/Common/PageHero";
import PostCard from "../components/blog/PostCard";
import useContent from "../hooks/useContent";
import { posts as fallbackPosts, postCategories } from "../data/content";
import { sortPosts } from "../utils/blog";

// Same filter rules as before: "Videos" matches video posts, other tabs match the category
const matchesCategory = (p, category) => {
  if (category === "All") return true;
  if (category === "Videos") return p.type === "video";
  return p.category === category;
};

export default function Blog() {
  // Loads from the API; shows content.js data if the server is unreachable.
  // Hooks stay at the top of the component.
  const { data: posts, fromApi } = useContent("/posts", fallbackPosts);

  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  // The API already returns posts newest first, so only sort the fallback data
  const list = posts || [];
  const all = fromApi ? list : sortPosts(list);

  const shown = all.filter((p) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      (p.title || "").toLowerCase().includes(q) ||
      (p.excerpt || "").toLowerCase().includes(q);
    return matchesCategory(p, active) && matchesQuery;
  });

  return (
    <>
      <PageHero
        label="Blog"
        title="Thoughts, stories & videos"
        text="Writing and videos about technology, entrepreneurship, discipline, growth and lifestyle."
      />

      <section className="section !pt-4 md:!pt-6">
        <div className="container mx-auto max-w-5xl">
          {/* Introduction */}
          <div className="mb-8 border-b border-[var(--border)] pb-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                From the blog
              </span>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--navy)] md:text-3xl">
                Lessons from the journey.
              </h2>

              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)] md:text-base">
                I write and record what I learn while building software, brands and businesses.
                Read a story, watch a video, or pick a topic that matches where you are right now.
              </p>
            </div>
          </div>

          {/* Filters + search */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div
              className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0"
              role="group"
              aria-label="Filter posts by category"
            >
              {postCategories.map((category) => {
                const selected = active === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActive(category)}
                    aria-pressed={selected}
                    className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                      selected
                        ? "border-[var(--navy)] bg-[var(--navy)] text-white shadow-sm"
                        : "border-[var(--border)] bg-white text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <label className="relative w-full sm:w-60">
              <span className="sr-only">Search posts</span>
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts"
                className="w-full rounded-full border border-[var(--border)] bg-white py-2 pl-9 pr-3 text-xs shadow-sm outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
              />
            </label>
          </div>

          {/* Posts */}
          {shown.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[var(--border)] bg-white px-5 py-12 text-center">
              <p className="font-semibold text-[var(--navy)]">Nothing here yet</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Try another topic or a different search, or check back soon.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActive("All");
                  setQuery("");
                }}
                className="mt-3 text-sm font-semibold text-[var(--accent)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                View all posts
              </button>
            </div>
          ) : (
            <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              <AnimatePresence mode="popLayout">
                {shown.map((p, i) => (
                  <motion.div
                    key={p.slug}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: (i % 3) * 0.05 }}
                    className="h-full"
                  >
                    <PostCard post={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}