import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeader from "../Common/SectionHeader";
import Reveal from "../Common/Reveal";
import { projects } from "../../data/content";

export default function FeaturedProjects() {
  return (
    <section className="section !py-8 md:!py-12">
      <div className="container">
        {/* Same width wrapper as the cards, so the left edges line up */}
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SectionHeader label="Selected work" title="Projects I'm proud of" />

            {/* Desktop/tablet only: button beside the header */}
            <div className="mb-8 hidden md:block">
              <Link to="/projects" className="btn-outline group !px-4 !py-2 !text-sm">
                All projects
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 lg:gap-5">
          {projects.slice(0, 2).map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article
                className="card flex h-full flex-col overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent)] hover:shadow-md"
                style={{ borderRight: "3px solid var(--accent)" }}
              >
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="section-label !text-[10px]">{p.category}</span>
                    <span className="tag !text-[11px]">{p.status}</span>
                  </div>

                  <h3 className="mt-3 text-lg font-semibold leading-snug text-[var(--navy)]">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    {p.description}
                  </p>
                </div>

                {/* Tech stack: pinned to the bottom so both cards line up */}
                <div className="flex flex-wrap gap-1.5 border-t border-[var(--border)] bg-[var(--bg-soft)]/50 px-5 py-3">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-[var(--border)] bg-white px-2 py-0.5 text-[11px] font-medium text-[var(--navy)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Mobile only: button at the bottom, below the cards */}
        <div className="mt-6 flex justify-center md:hidden">
          <Link to="/projects" className="btn-outline !px-4 !py-2 !text-sm">
            All projects <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}