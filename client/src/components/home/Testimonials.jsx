
import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

import SectionHeader from "../Common/SectionHeader";
import useContent from "../../hooks/useContent";
import { testimonials as fallbackTestimonials } from "../../data/content";

const SLIDE_MS = 4000;

// Development preview only
const SAMPLE = [
  {
    quote: "Sample text to check the layout.",
    name: "Sample Name",
    role: "Sample role",
  },
  {
    quote:
      "Another sample line, longer, to see how two lines of text look inside a card.",
    name: "Sample Two",
    role: "Sample business",
  },
  {
    quote: "A third sample card.",
    name: "Sample Three",
    role: "Sample role",
  },
  {
    quote: "A fourth sample card to test the loop.",
    name: "Sample Four",
    role: "Sample role",
  },
];

// Customer avatar
function Avatar({ photo, name, big }) {
  const [failed, setFailed] = useState(false);

  const size = big ? "h-12 w-12" : "h-11 w-11";

  // Reset error when photo URL changes
  useEffect(() => {
    setFailed(false);
  }, [photo]);

  if (photo && !failed) {
    return (
      <img
        key={photo}
        src={photo}
        alt={name || "Customer"}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`${size} rounded-full object-cover`}
      />
    );
  }

  return (
    <span
      className={`flex ${size} shrink-0 items-center justify-center rounded-full bg-[var(--navy)] text-sm font-bold text-white`}
    >
      {(name || "?").charAt(0).toUpperCase()}
    </span>
  );
}

// Responsive carousel size
function getPerView() {
  if (typeof window === "undefined") return 3;

  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;

  return 1;
}

export default function Testimonials() {
  // Load testimonials from the backend
  const { data: testimonials = [] } = useContent(
    "/testimonials",
    fallbackTestimonials
  );

  const real = testimonials.filter(
    (t) => t.quote && t.name
  );

  // Show samples only during development
  const preview = import.meta.env.DEV && real.length === 0;

  const list = preview ? SAMPLE : real;

  const [perView, setPerView] = useState(getPerView);
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const [paused, setPaused] = useState(false);

  const canSlide = list.length > 1;
  const zoomCenter = perView === 3;

  // Reset carousel when testimonials change
  useEffect(() => {
    setIndex(0);
  }, [list.length]);

  // Responsive layout
  useEffect(() => {
    const onResize = () => {
      setPerView(getPerView());
      setInstant(true);
      setIndex(0);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Restore animation after instant transition
  useEffect(() => {
    if (!instant) return;

    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setInstant(false))
    );

    return () => cancelAnimationFrame(id);
  }, [instant]);

  // Automatic carousel movement
  useEffect(() => {
    if (paused || !canSlide) return;

    const id = setInterval(() => {
      setIndex((i) => i + 1);
    }, SLIDE_MS);

    return () => clearInterval(id);
  }, [paused, canSlide]);

  // Handle infinite carousel transition
  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;

    if (index >= list.length) {
      setInstant(true);
      setIndex(0);
    }
  };

  if (list.length === 0) return null;

  const track = canSlide
    ? [...list, ...list.slice(0, perView)]
    : list;

  const activeDot = index % list.length;
  const centerIndex = index + 1;

  // Card positioning and animation
  const cardStyle = (i) => {
    const base = {
      flexBasis: `${100 / perView}%`,
    };

    if (!zoomCenter) return base;

    const pos = i - index;

    let transform =
      "perspective(1000px) scale(0.86) rotateY(0deg)";

    let opacity = 0.7;

    if (pos === 1) {
      transform =
        "perspective(1000px) scale(1.12) rotateY(0deg) translateY(-6px)";
      opacity = 1;
    } else if (pos === 0) {
      transform =
        "perspective(1000px) scale(0.88) rotateY(14deg)";
    } else if (pos === 2) {
      transform =
        "perspective(1000px) scale(0.88) rotateY(-14deg)";
    }

    return {
      ...base,
      transform,
      opacity,
      transition: instant
        ? "none"
        : "transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 600ms ease",
    };
  };

  return (
    <section className="section section-soft !py-12 md:!py-16">

      {/* Carousel animations */}
      <style>{`
        @keyframes tFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @keyframes tQuotePop {
          0% { transform: scale(0.4) rotate(-25deg); opacity: 0; }
          60% { transform: scale(1.3) rotate(8deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        @keyframes tTextUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes tProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      <div className="container">

        {/* Development preview notice */}
        {preview && (
          <p className="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-medium text-amber-800">
            PREVIEW ONLY: these are sample cards, visible on your
            computer and hidden on the live site. Add real
            testimonials in your admin dashboard to replace them.
          </p>
        )}

        {/* Section heading */}
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            label="Testimonials"
            title="What people say"
            text="Kind words from people I've worked with."
          />
        </div>

        {/* Testimonial carousel */}
        <div
          className="mx-auto max-w-5xl overflow-hidden py-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div
            className={`flex items-stretch ${
              canSlide ? "" : "justify-center"
            }`}
            style={{
              transform: canSlide
                ? `translateX(-${index * (100 / perView)}%)`
                : "none",
              transition: instant
                ? "none"
                : "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {track.map((t, i) => {
              const isCenter =
                zoomCenter && i === centerIndex;

              return (
                <div
                  key={`${t._id || t.name}-${i}`}
                  className={`shrink-0 px-2.5 ${
                    isCenter ? "relative z-10" : ""
                  }`}
                  style={cardStyle(i)}
                >
                  <figure
                    className={`card flex h-full flex-col p-6 hover:!transform-none ${
                      isCenter
                        ? "shadow-2xl ring-2 ring-[var(--accent)]/60"
                        : "shadow-md"
                    }`}
                    style={
                      isCenter
                        ? {
                            animation:
                              "tFloat 3s ease-in-out infinite",
                          }
                        : undefined
                    }
                  >
                    {/* Quote icon */}
                    <Quote
                      key={isCenter ? `c-${index}` : "n"}
                      size={isCenter ? 32 : 26}
                      className="text-[var(--accent)]"
                      style={{
                        opacity: isCenter ? 1 : 0.4,
                        animation: isCenter
                          ? "tQuotePop 700ms cubic-bezier(0.34, 1.56, 0.64, 1)"
                          : "none",
                      }}
                    />

                    {/* Testimonial text */}
                    <blockquote
                      key={isCenter ? `b-${index}` : "bn"}
                      className={`mt-3 flex-1 leading-relaxed text-[var(--navy)] ${
                        isCenter ? "text-base" : "text-[15px]"
                      }`}
                      style={
                        isCenter
                          ? {
                              animation:
                                "tTextUp 600ms ease-out 150ms both",
                            }
                          : undefined
                      }
                    >
                      {t.quote}
                    </blockquote>

                    {/* Customer information */}
                    <figcaption className="mt-5 flex items-center gap-3 border-t border-[var(--border)] pt-4">
                      <Avatar
                        photo={
                          t.photo ||
                          t.image ||
                          t.avatar ||
                          ""
                        }
                        name={t.name}
                        big={isCenter}
                      />

                      <div>
                        <p className="text-sm font-semibold text-[var(--navy)]">
                          {t.name}
                        </p>

                        {t.role && (
                          <p className="text-xs text-[var(--text-muted)]">
                            {t.role}
                          </p>
                        )}
                      </div>
                    </figcaption>
                  </figure>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel dots and progress bar */}
        {canSlide && (
          <div className="flex flex-col items-center gap-3">

            <div className="flex justify-center gap-2">
              {list.map((item, i) => (
                <button
                  key={item._id || item.name}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === activeDot
                      ? "w-8 bg-[var(--accent)]"
                      : "w-2 bg-[var(--navy)] opacity-25"
                  }`}
                />
              ))}
            </div>

            {/* Four-second progress timer */}
            <div className="h-1 w-40 overflow-hidden rounded-full bg-[var(--navy)]/10">
              <div
                key={index}
                className="h-full rounded-full bg-[var(--accent)]"
                style={{
                  animation: `tProgress ${SLIDE_MS}ms linear forwards`,
                  animationPlayState: paused
                    ? "paused"
                    : "running",
                }}
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
