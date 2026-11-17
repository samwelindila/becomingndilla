import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "../Common/SectionHeader";
import Reveal from "../Common/Reveal";
import { brands } from "../../data/content";

const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

// Shows the logo, or the brand's initials if there is no logo file
function Logo({ brand }) {
  const [failed, setFailed] = useState(false);

  if (brand.logo && !failed) {
    return (
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-white p-1">
        <img
          src={brand.logo}
          alt={`${brand.name} logo`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      </span>
    );
  }
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--navy)] text-sm font-bold text-white">
      {initials(brand.name)}
    </span>
  );
}

export default function BrandsWorkedWith() {
  return (
    <section className="section !py-8 md:!py-12">
      <div className="container">
        {/* Same width wrapper as the other sections, so the left edges line up */}
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            label="Trusted by"
            title="Brands I've worked with"
            text="Businesses and brands I've designed for, marketed and helped grow."
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {brands.map((b, i) => {
              const inner = (
                <>
                  <Logo brand={b} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[var(--navy)]">{b.name}</p>
                    <p className="line-clamp-2 text-xs leading-snug text-[var(--text-muted)]">
                      {b.work}
                    </p>
                  </div>
                  {b.link && (
                    <ArrowUpRight
                      size={14}
                      className="shrink-0 text-[var(--accent)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  )}
                </>
              );
              const cls =
                "card group flex h-full items-center gap-3 bg-white p-3.5 transition-[border-color,box-shadow] duration-300 hover:!transform-none";

              return (
                <Reveal key={b.name} delay={(i % 3) * 0.06} className="h-full">
                  {b.link ? (
                    <a
                      href={b.link}
                      target="_blank"
                      rel="noreferrer"
                      className={`${cls} hover:border-[var(--accent)] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}