import { Eye, Repeat, Lightbulb } from "lucide-react";
import SectionHeader from "../Common/SectionHeader";
import Reveal from "../Common/Reveal";
import { values } from "../../data/content";

// One icon and one color per value, in the same order as `values` in content.js:
// 1 Build in public, 2 Discipline over motivation, 3 Solve real problems.
const STYLES = [
  { Icon: Eye, color: "#0ea5e9" },
  { Icon: Repeat, color: "#8b5cf6" },
  { Icon: Lightbulb, color: "#f97316" },
];

export default function Values() {
  return (
    <section className="section !py-8 md:!py-12">
      <div className="container mx-auto max-w-5xl">
        <SectionHeader label="Values" title="What I stand for" />

        <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
          {values.map((v, i) => {
            const { Icon, color } = STYLES[i % STYLES.length];

            return (
              <Reveal key={v.title} delay={i * 0.08} className="h-full">
                <article
                  className="card group relative flex h-full flex-col overflow-hidden bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:shadow-md"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${color}12 0%, transparent 55%)`,
                  }}
                >
                  {/* Icon tile in the value's own color */}
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: `${color}1a`, color }}
                  >
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-4 text-base font-semibold leading-snug text-[var(--navy)]">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    {v.text}
                  </p>

                  {/* Accent line draws in along the bottom on hover */}
                  <span
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{ backgroundColor: color }}
                  />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}