import { useState } from "react";
import { ExternalLink, ImageIcon } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import PageHero from "../components/Common/PageHero";
import Reveal from "../components/Common/Reveal";
import useContent from "../hooks/useContent";
import { projects as fallbackProjects } from "../data/content";

// Cover images in client/public/projects/ (1200 x 800 px, 3:2).
// To use a real screenshot later, set the project's image in the admin area,
// or change the path below.
const covers = {
  GrowthGuard: "/projects/growthguard.jpg",
  VibeKits: "/projects/vibekits.jpg",
  LevelUp: "/projects/levelup.jpg",
  BrandKazi: "/projects/brandkazi.jpg",
};

function ProjectImage({ src, alt, status }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[var(--navy)] to-[var(--accent)]">
      {/* Placeholder icon, only visible if the image is missing */}
      <ImageIcon
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

export default function Projects() {
  // Loads from the API; shows content.js data if the server is unreachable
  const { data: projects } = useContent("/projects", fallbackProjects);

  return (
    <>
      <PageHero
        label="Technology"
        title="Projects"
        text="Products I've built and am building, each solving a real problem."
      />

      <section className="section !py-8 md:!py-12">
        <div className="container mx-auto grid max-w-5xl gap-4 md:grid-cols-2 lg:gap-5">
          {projects.map((p, i) => {
            const demo = p.demo || p.link;
            const source = p.source || p.github;

            return (
              <Reveal key={p.slug || p.title} delay={(i % 2) * 0.08} className="h-full">
                <article className="card group flex h-full flex-col overflow-hidden bg-white transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent)] hover:shadow-lg">
                  <ProjectImage
                    src={p.image || covers[p.title]}
                    alt={`${p.title} preview`}
                    status={p.status}
                  />

                  <div className="flex flex-1 flex-col p-5">
                    <span className="section-label !text-[10px]">{p.category}</span>
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-[var(--navy)]">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
                      {p.description}
                    </p>
                  </div>

                  {/* Tech stack: its own strip, pinned to the bottom so cards line up */}
                  <div className="flex flex-wrap gap-1.5 border-t border-[var(--border)] bg-[var(--bg-soft)]/50 px-5 py-3">
                    {(p.stack || []).map((s) => (
                      <span
                        key={s}
                        className="rounded-md border border-[var(--border)] bg-white px-2 py-0.5 text-[11px] font-medium text-[var(--navy)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {(demo || source) && (
                    <div className="flex gap-3 border-t border-[var(--border)] px-5 py-3 text-xs font-semibold">
                      {demo && (
                        <a
                          href={demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--navy)] px-3.5 py-1.5 !text-white transition-colors duration-300 hover:bg-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                        >
                          <ExternalLink size={13} /> Live demo
                        </a>
                      )}
                      {source && (
                        <a
                          href={source}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3.5 py-1.5 text-[var(--navy)] transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                        >
                          <FaGithub size={13} /> Source
                        </a>
                      )}
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}