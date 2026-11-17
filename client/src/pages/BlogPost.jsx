
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import VideoPlayer from "../components/blog/VideoPlayer";
import CallToAction from "../components/home/CallToAction";

import { posts } from "../data/content";
import api from "../lib/api";

import {
  formatDate,
  readingTime,
  getVideoData,
} from "../utils/blog";

// Support both MongoDB and existing static content
const getBodyLines = (post) => {
  const content = post?.content ?? post?.body;

  if (Array.isArray(content)) {
    return content.map((line) => String(line));
  }

  if (typeof content === "string") {
    return content.split(/\r?\n/).filter((line) => line.trim());
  }

  return [];
};

export default function BlogPost() {
  const { slug } = useParams();

  const staticPost = posts.find((p) => p.slug === slug);

  const [post, setPost] = useState(staticPost || null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchPost = async () => {
      setLoading(true);
      setLoadError(false);

      // Keep static content available as a fallback
      const fallback = posts.find((p) => p.slug === slug);

      try {
        const response = await api.get(
          `/posts/${encodeURIComponent(slug)}`
        );

        if (!cancelled) {
          setPost(response.data);
        }
      } catch (error) {
        console.error(
          "Failed to load blog post:",
          error.response?.data || error.message
        );

        if (!cancelled) {
          setPost(fallback || null);
          setLoadError(!fallback);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchPost();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading && !post) {
    return (
      <section className="section pt-28 md:pt-32">
        <div className="container mx-auto max-w-2xl text-center">
          <p className="text-sm text-[var(--text-muted)]">
            Loading article...
          </p>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="section pt-28 md:pt-32">
        <div className="container mx-auto max-w-xl text-center">
          <h1 className="text-2xl md:text-3xl">
            Post not found
          </h1>

          <p className="mt-3 text-sm">
            {loadError
              ? "Could not load this post. Please try again."
              : "This post doesn't exist or was moved."}
          </p>

          <Link
            to="/blog"
            className="btn-primary mt-5 !px-5 !py-2.5 !text-sm"
          >
            Back to blog
          </Link>
        </div>
      </section>
    );
  }

  const bodyLines = getBodyLines(post);
  const bodyText = bodyLines.join(" ");

  const isVideo =
    post.type === "video" ||
    Boolean(post.videoUrl) ||
    Boolean(post.video?.kind);

  // Support both static video objects and admin video URLs
  const video = post.video?.kind
    ? post.video
    : getVideoData(post);

  const cover = post.image || post.cover || "";

  return (
    <>
      <article className="pb-8 pt-24 md:pb-10 md:pt-28">
        <div className="container mx-auto max-w-2xl">

          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent)]"
          >
            <ArrowLeft size={14} />
            All posts
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
            <span className="tag !text-[11px]">
              {isVideo ? "Video" : post.category}
            </span>

            <time>
              {formatDate(post.date)}
            </time>

            {!isVideo && bodyText && (
              <span>· {readingTime(bodyText)}</span>
            )}
          </div>

          <h1 className="mt-3 text-2xl leading-tight md:text-4xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-3 text-base">
              {post.excerpt}
            </p>
          )}

          {/* VIDEO PLAYER */}
          {isVideo && (
            <div className="mt-6">
              {video ? (
                <VideoPlayer
                  video={video}
                  title={post.title}
                  vertical={post.vertical}
                />
              ) : (
                <div className="flex aspect-video items-center justify-center rounded-2xl bg-black p-6 text-center text-white">
                  <p className="text-sm">
                    This video URL is invalid or unsupported.
                    Please check the video link.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ARTICLE COVER */}
          {!isVideo && cover && (
            <img
              src={cover}
              alt={post.title}
              loading="lazy"
              className="mt-6 max-h-72 w-full rounded-xl border border-[var(--border)] object-cover"
            />
          )}

          {/* ARTICLE CONTENT */}
          {bodyLines.length > 0 && (
            <div className="mt-6 space-y-3 text-[15px] leading-relaxed">
              {bodyLines.map((line, index) =>
                line.startsWith("## ") ? (
                  <h3
                    key={index}
                    className="pt-2 text-lg md:text-xl"
                  >
                    {line.slice(3)}
                  </h3>
                ) : (
                  <p key={index}>
                    {line}
                  </p>
                )
              )}
            </div>
          )}

        </div>
      </article>

      <CallToAction />
    </>
  );
}
