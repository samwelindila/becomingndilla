import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeader from "../Common/SectionHeader";
import Reveal from "../Common/Reveal";
import PostCard from "../blog/PostCard";
import useContent from "../../hooks/useContent";
import { posts as fallbackPosts } from "../../data/content";
import { sortPosts } from "../../utils/blog";

export default function LatestPosts() {
  // Loads from the API and re-checks every 30 seconds, so new posts appear without a reload.
  // Shows content.js data only if the server has never been reachable.
  const { data: posts } = useContent("/posts", fallbackPosts, { refreshMs: 30000 });

  // Newest first (works for API posts and for the fallback data)
  const latest = sortPosts(posts).slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <section className="section !py-8 md:!py-12">
      <div className="container">
        {/* Same width wrapper as VenturesTeaser */}
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SectionHeader
              label="From the blog"
              title="Latest posts & videos"
              text="Short writing and videos on building, design and the journey."
            />

            {/* Desktop/tablet only: button beside the header */}
            <div className="mb-8 hidden md:block">
              <Link to="/blog" className="btn-outline group !px-4 !py-2 !text-sm">
                View all
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3 lg:gap-5">
          {latest.map((p, i) => (
            <Reveal key={p._id || p.slug} delay={i * 0.08} className="h-full">
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>

        {/* Mobile only: button at the bottom */}
        <div className="mt-6 flex justify-center md:hidden">
          <Link to="/blog" className="btn-outline !px-4 !py-2 !text-sm">
            View all <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}