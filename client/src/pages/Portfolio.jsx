import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ImageIcon, ArrowRight } from "lucide-react";
import PageHero from "../components/Common/PageHero";
import useContent from "../hooks/useContent";
import {
  portfolio as fallbackPortfolio,
  portfolioCategories,
} from "../data/content";

function Thumb({ src, alt }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[var(--navy)] to-[var(--accent)]">
      <ImageIcon
        size={40}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/25"
      />
      {src && !failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      )}
    </div>
  );
}

const itemKey = (p) => p._id || p.slug || p.title;

export default function Portfolio() {
  // Loads from the API; shows content.js data if the server is unreachable
  const { data: portfolio } = useContent("/portfolio", fallbackPortfolio);

  const [active, setActive] = useState("All");
  const [open, setOpen] = useState(null); // index inside `shown`

  // Only items that have an image are published
  const items = portfolio.filter((p) => p.image);
  const shown = items.filter((p) => active === "All" || p.category === active);
  const categories = portfolioCategories.filter(
    (c) => c === "All" || items.some((p) => p.category === c)
  );

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % shown.length)),
    [shown.length]
  );
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + shown.length) % shown.length)),
    [shown.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, next, prev]);

  const current = open !== null ? shown[open] : null;

  return (
    <>
      <PageHero
        label="Portfolio"
        title="Design & marketing work"
        text="Logos, posters, Instagram content and brand kits, each with the problem it solved and the result."
      />

      <section className="section !py-8 md:!py-12">
        <div className="container mx-auto max-w-5xl">
          {items.length === 0 ? (
            <div className="card mx-auto max-w-xl bg-white p-8 text-center hover:!transform-none">
              <h3 className="text-lg font-semibold text-[var(--navy)]">
                Work samples are coming soon
              </h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                I'm putting together my best design and marketing projects. Meanwhile, see my
                projects or ask me about a service.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Link to="/projects" className="btn-outline !px-4 !py-2 !text-sm">Projects</Link>
                <Link to="/services" className="btn-primary !px-4 !py-2 !text-sm">Services</Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter portfolio">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActive(c)}
                    aria-pressed={active === c}
                    className={`rounded-full border px-3.5 py-1 text-xs font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                      active === c
                        ? "border-[var(--navy)] bg-[var(--navy)] text-white shadow-sm"
                        : "border-[var(--border)] bg-white text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {shown.map((p, i) => (
                    <motion.div
                      key={itemKey(p)}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, delay: (i % 3) * 0.05 }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpen(i)}
                        className="card group flex h-full w-full flex-col overflow-hidden bg-white text-left transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent)] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                        aria-label={`Open ${p.title}`}
                      >
                        <Thumb src={p.image} alt={p.title} />
                        <div className="flex flex-1 flex-col p-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                            {p.category}
                          </span>
                          <h3 className="mt-1 text-base font-semibold leading-snug text-[var(--navy)]">
                            {p.title}
                          </h3>

                          {(p.problem || p.result) && (
                            <div className="mt-3 space-y-1.5 border-t border-[var(--border)] pt-3">
                              {p.problem && (
                                <p className="text-[13px] leading-snug text-[var(--text-muted)]">
                                  <b className="font-semibold text-[var(--navy)]">Problem:</b>{" "}
                                  {p.problem}
                                </p>
                              )}
                              {p.result && (
                                <p className="text-[13px] leading-snug text-[var(--text-muted)]">
                                  <b className="font-semibold text-[var(--navy)]">Result:</b>{" "}
                                  {p.result}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Viewer */}
      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--navy)]/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <div
              className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[var(--navy)] shadow transition-colors hover:bg-[var(--accent)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <X size={18} />
              </button>

              <div className="relative flex min-h-0 flex-1 items-center justify-center bg-[var(--bg-soft)]">
                <img
                  src={current.image}
                  alt={current.title}
                  className="max-h-[62vh] w-full object-contain"
                />
                {shown.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="Previous"
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--navy)] shadow transition-colors hover:bg-[var(--accent)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      aria-label="Next"
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--navy)] shadow transition-colors hover:bg-[var(--accent)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                    >
                      <ChevronRight size={20} />
                    </button>

                    {/* Position counter */}
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--navy)]/70 px-2.5 py-0.5 text-[11px] font-medium text-white">
                      {open + 1} / {shown.length}
                    </span>
                  </>
                )}
              </div>

              <div className="p-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                  {current.category}
                </span>
                <h3 className="mt-1 text-lg font-semibold text-[var(--navy)]">{current.title}</h3>

                {(current.problem || current.result) && (
                  <div className="mt-3 space-y-1 border-t border-[var(--border)] pt-3">
                    {current.problem && (
                      <p className="text-sm text-[var(--text-muted)]">
                        <b className="font-semibold text-[var(--navy)]">Problem:</b>{" "}
                        {current.problem}
                      </p>
                    )}
                    {current.result && (
                      <p className="text-sm text-[var(--text-muted)]">
                        <b className="font-semibold text-[var(--navy)]">Result:</b>{" "}
                        {current.result}
                      </p>
                    )}
                  </div>
                )}

                <Link
                  to="/services"
                  onClick={close}
                  className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  Want something like this?
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}