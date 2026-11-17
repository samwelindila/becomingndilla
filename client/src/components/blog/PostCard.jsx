import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, FileText, ArrowRight } from "lucide-react";
import { getThumb, formatDate } from "../../utils/blog";

const isVideoPost = (post) => post?.type === "video";

function Thumb({ post }) {
  const src = getThumb(post);
  const [failed, setFailed] = useState(false);
  const video = isVideoPost(post);

  return (
    <div className="relative aspect-[3/2] overflow-hidden bg-gradient-to-br from-[var(--navy)] to-[var(--accent)]">
      {src && !failed ? (
        <img
          src={src}
          alt={post.title}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        !video && (
          <FileText
            size={48}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/25"
          />
        )
      )}

      {/* Soft shade at the bottom edge for depth */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background: "linear-gradient(to top, rgba(15,23,42,0.25), rgba(15,23,42,0))",
        }}
      />

      {video && (
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--navy)] shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play size={22} fill="currentColor" className="ml-0.5" />
        </span>
      )}
    </div>
  );
}

export default function PostCard({ post }) {
  const video = isVideoPost(post);
  const date = formatDate(post.date);
  const label = video ? "Video" : post.category;

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="card group flex h-full flex-col overflow-hidden bg-white transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent)] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      {/* key makes the thumbnail reset if the post changes */}
      <Thumb key={post._id || post.slug} post={post} />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          {label ? <span className="tag">{label}</span> : <span />}
          {date && <time className="text-xs text-[var(--text-muted)]">{date}</time>}
        </div>

        <h3 className="mt-3 text-lg font-semibold leading-snug text-[var(--navy)]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
          {post.excerpt}
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 border-t border-[var(--border)] pt-3 text-xs font-semibold text-[var(--accent)]">
          {video ? "Watch video" : "Read article"}
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}