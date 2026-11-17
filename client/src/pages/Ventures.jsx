import { useState } from "react";
import { ArrowUpRight, Rocket } from "lucide-react";
import PageHero from "../components/Common/PageHero";
import Reveal from "../components/Common/Reveal";
import useContent from "../hooks/useContent";
import { ventures as fallbackVentures } from "../data/content";

// Fallback cover images go in client/public/ventures/ (16:9, e.g. 1200 x 675 px).
// The file name is the venture name in lowercase with no spaces or symbols,
// e.g. "Brand Kazi" -> /ventures/brandkazi.jpg
// An image uploaded in the admin area always takes priority over these.
const nameSlug = (name = "") => name.toLowerCase().replace(/[^a-z0-9]/g, "");

function VentureImage({ src, alt, status }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[var(--navy)] to-[var(--accent)]">
      {/* Placeholder icon, only visible if the image is missing */}
      <Rocket
        size={36}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/25"
      />
      {src && !failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}

      {/* Soft shade at the bottom edge for depth */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background: "linear-gradient(to top, rgba(15,23,42,0.25), rgba(15,23,42,0))",
        }}
      />

      {/* Status badge on the image */}
      {status && (
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[var(--navy)] shadow-sm backdrop-blur-sm">
          {status}
        </span>
      )}
    </div>
  );
}

export default function Ventures() {
  // Loads from the API; shows content.js data if the server is unreachable
  const { data: ventures } = useContent("/ventures", fallbackVentures);

  return (
    <>
      <PageHero
        label="Entrepreneurship"
        title="Ventures"
        text="The businesses I'm building and the ones I'm preparing to start."
      />

      <section className="section !py-8 md:!py-12">
        <div className="container mx-auto grid max-w-5xl gap-4 md:grid-cols-2 lg:gap-5">
          {ventures.map((v, i) => (
            <Reveal key={v.slug || v.name} delay={(i % 2) * 0.08} className="h-full">
              <article className="card group flex h-full flex-col overflow-hidden bg-white transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent)] hover:shadow-lg">
                <VentureImage
                  src={v.image || `/ventures/${nameSlug(v.name)}.jpg`}
                  alt={`${v.name} preview`}
                  status={v.status}
                />

                <div className="flex flex-1 flex-col p-5">
                  <span className="section-label !text-[10px]">{v.type}</span>
                  <h3 className="mt-2 text-lg font-semibold leading-snug text-[var(--navy)]">
                    {v.name}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
                    {v.description}
                  </p>
                </div>

                {/* Link strip: pinned to the bottom so cards line up.
                    Ventures without a link (e.g. Planned) show a calm note instead. */}
                <div className="border-t border-[var(--border)] bg-[var(--bg-soft)]/50 px-5 py-3 text-xs font-semibold">
                  {v.link ? (
                    <a
                      href={v.link}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link inline-flex items-center gap-1.5 text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                    >
                      Visit {v.name}
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      />
                    </a>
                  ) : (
                    <span className="font-medium text-[var(--text-muted)]">Coming soon</span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}