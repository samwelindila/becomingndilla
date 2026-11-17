import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Palette, X } from "lucide-react";
import SectionHeader from "../Common/SectionHeader";
import { graphics, graphicCategories } from "../../data/content";

// Shows the image, or a gradient with an icon if the file is missing
function Art({ src, alt }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy)] to-[var(--accent)]">
      <Palette
        size={30}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/25"
      />
      {src && !failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </div>
  );
}

function Lightbox({ item, onClose }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-full w-full max-w-2xl"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -right-2 -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[var(--navy)] shadow-lg transition-colors hover:bg-[var(--accent)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <X size={16} />
        </button>

        {item.image && !failed ? (
          <img
            src={item.image}
            alt={item.title}
            onError={() => setFailed(true)}
            className="mx-auto max-h-[78vh] w-auto max-w-full rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
          />
        ) : (
          <div className="flex aspect-square max-h-[60vh] w-full items-center justify-center rounded-xl bg-gradient-to-br from-[var(--navy)] to-[var(--accent)]">
            <Palette size={48} className="text-white/30" />
          </div>
        )}

        <div className="mt-3 text-center text-white">
          <p className="text-sm font-semibold">{item.title}</p>
          <p className="text-xs text-white/70">
            {item.category}
            {item.brand ? ` · ${item.brand}` : ""}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GraphicsShowcase() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);

  const shown =
    active === "All" ? graphics : graphics.filter((g) => g.category === active);

  return (
    <section className="section section-soft !py-8 md:!py-12">
      <div className="container">
        {/* Same width wrapper as the other sections, so the left edges line up */}
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            label="Design work"
            title="Graphics I've created"
            text="Logos, social media designs, posters and brand visuals, made with Adobe Photoshop and Canva."
          />

          <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter graphics">
            {graphicCategories.map((c) => (
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

          <motion.div layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {shown.map((g) => (
                <motion.button
                  key={g.title}
                  layout
                  type="button"
                  aria-label={`View ${g.title}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelected(g)}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-[var(--border)] bg-white text-left shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent)] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  <Art src={g.image} alt={g.title} />
                  {/* Caption: always visible on mobile, slides up on hover or keyboard focus on larger screens */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-2.5 pt-8 text-white transition-transform duration-300 sm:translate-y-full sm:group-hover:translate-y-0 sm:group-focus-visible:translate-y-0">
                    <p className="text-xs font-semibold leading-tight">{g.title}</p>
                    <p className="mt-0.5 text-[10px] text-white/70">{g.category}</p>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selected && <Lightbox item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}