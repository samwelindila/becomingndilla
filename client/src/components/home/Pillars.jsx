import { useState } from "react";
import { Link } from "react-router-dom";
import { Code2, Rocket, PenLine, ArrowUpRight } from "lucide-react";
import SectionHeader from "../Common/SectionHeader";
import Reveal from "../Common/Reveal";
import { pillars } from "../../data/content";

const icons = { tech: Code2, biz: Rocket, content: PenLine };

// Put these files in client/public/pillars/
// "position" decides which part stays visible if the image is cropped
// (e.g. "center", "left", "right", "center 30%").
const images = {
  tech: { src: "/pillars/tech.jpg", position: "center" },
  biz: { src: "/pillars/business.jpg", position: "center" },
  content: { src: "/pillars/content.jpg", position: "center" },
};

function CardImage({ image, alt, Icon }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[var(--navy)] to-[var(--accent)]">
      {/* Placeholder icon, only visible if the image is missing */}
      <Icon
        size={44}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/25"
      />

      {!failed && (
        <img
          src={image.src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ objectPosition: image.position }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}
    </div>
  );
}

export default function Pillars() {
  return (
    <section className="section section-soft !py-8 md:!py-12">
      <div className="container">
        {/* Same width wrapper as the cards, so the left edges line up */}
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            label="Three pillars"
            title="One person, three connected identities"
            text="Everything on this site grows from these three areas."
          />
        </div>

        <div className="mx-auto mt-5 grid max-w-5xl gap-4 md:grid-cols-3 lg:gap-5">
          {pillars.map((p, i) => {
            const Icon = icons[p.icon];
            const image = p.image
              ? { src: p.image, position: p.imagePosition || "center" }
              : images[p.icon];

            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <Link
                  to={p.to}
                  aria-label={p.cta}
                  className="card group block h-[340px] overflow-hidden sm:h-[360px]"
                >
                  {/* Fixed card height split 70% image / 30% description */}
                  <div className="grid h-full grid-rows-[7fr_3fr]">
                    <CardImage image={image} alt={p.title} Icon={Icon} />

                    <div className="min-h-0 overflow-hidden border-t border-[var(--border)] px-4 py-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base leading-snug">{p.title}</h3>
                        <ArrowUpRight
                          size={16}
                          className="shrink-0 text-[var(--accent)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </div>
                      <p className="mt-1 line-clamp-3 text-xs leading-snug">
                        {p.text}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}